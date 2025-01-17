package com.example.app.service;


import com.example.app.controller.request.DocumentRequest;
import com.example.app.controller.request.JobsResponse;
import com.example.app.controller.request.PositionResponse;
import com.example.app.domain.AccountCredentials;
import com.example.app.domain.CompanyAccount;
import com.example.app.domain.Document;
import com.example.app.domain.UserToPositionCorelation;
import com.example.app.repository.AccountCredentialsRepository;
import com.example.app.repository.CompanyRepository;
import com.example.app.repository.DocumentRepository;
import com.example.app.repository.UserToPositionCorelationRepository;
import com.example.app.service.pdf.PDFDecoder;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;

    private final AccountCredentialsRepository accountCredentialsRepository;

    private final CompanyRepository companyRepository;

    private final UserToPositionCorelationRepository userToPositionCorelationRepository;

    public DocumentService(DocumentRepository documentRepository, AccountCredentialsRepository accountCredentialsRepository, CompanyRepository companyRepository, UserToPositionCorelationRepository userToPositionCorelationRepository) {
        this.documentRepository = documentRepository;
        this.accountCredentialsRepository = accountCredentialsRepository;
        this.companyRepository = companyRepository;
        this.userToPositionCorelationRepository = userToPositionCorelationRepository;
    }


    public void addDocument(DocumentRequest document) throws IOException {
        var user = accountCredentialsRepository.findByEmail(document.getEmailUser());
        var company = companyRepository.findAll().stream().filter(companyAccount -> companyAccount.getAccountID().equals(user.returnId())).toList();
        updateData(user);
        var documentData = document.returnDocumentEntity(user, !company.isEmpty());
        documentRepository.save(documentData);

        analyzeData(documentData);
    }

    public static List<List<String>> parseStringToList(String input) {
        // Split the data into individual entries
        // Split the data into individual entries
        List<String> entries = Arrays.asList(input.split("(?<=\\]),\\s*(?=\\[)")); // Split by "], [" but keep brackets

        // Parse each entry into a List<List<String>> using streams
        List<List<String>> parsedData = entries.stream()
                .map(item -> item.replaceAll("[\\[\\]]", "")) // Remove square brackets
                .map(item -> Arrays.stream(item.split("\",\\s*\"")) // Split only between fields enclosed in quotes
                        .map(str -> str.replaceAll("^\"|\"$", "")) // Remove leading and trailing quotes
                        .collect(Collectors.toList()))
                .collect(Collectors.toList());
        return parsedData;
    }


    public static JsonNode mapStringToJson(String jsonString) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // Parse the JSON string into a JsonNode
            return objectMapper.readTree(jsonString);
        } catch (JsonProcessingException e) {
            // Handle parsing exceptions
            e.printStackTrace();
            return null;
        }
    }

    public List<JobsResponse> getAllUsersJobs(String Email) {
        List<JobsResponse> listOfCurrentJobUsers = new ArrayList<>();
        var company = accountCredentialsRepository.findByEmail(Email);
        var documentDataCompany = documentRepository.findAll().stream().filter(c -> c.getUser().returnId().equals(company.returnId())).toList().get(0);
        var documentDataCompanyPositions = parseStringToList(documentDataCompany.getData());
        var jobsAnlyzed = userToPositionCorelationRepository.findAll().stream().filter(pos -> pos.getCompanyId().equals(company.returnId()) && pos.getScore() > 50).toList();
        for (var job : jobsAnlyzed) {
            var user = accountCredentialsRepository.findAll().stream().filter(accountCredentials -> accountCredentials.returnId().equals(job.getUserId())).toList().get(0);
            listOfCurrentJobUsers.add(new JobsResponse(user.getEmail(), documentDataCompanyPositions.get(job.getPositionIndex()).get(1), job.getScore(), documentDataCompanyPositions.get(job.getPositionIndex()).get(0)));
        }

        return listOfCurrentJobUsers;
    }

    public List<PositionResponse> getAllUserJobs(String email) {
        List<PositionResponse> positionResponses = new ArrayList<>();
        var user = accountCredentialsRepository.findByEmail(email);
        var allJobs = userToPositionCorelationRepository.findAll().stream().filter(p -> p.getUserId().equals(user.returnId())).toList();
        for (var job : allJobs) {
            var company = parseStringToList(documentRepository.findAll().stream().filter(document -> document.getUser().returnId().equals(job.getCompanyId())).toList().get(0).getData()).get(job.getPositionIndex());
            positionResponses.add(new PositionResponse(company.get(0), company.get(1), job.getScore()));
        }
        return positionResponses;
    }

    private void analyzeData(Document document) {
        var all_company = companyRepository.findAll().stream().map(CompanyAccount::getAccountID).toList();

        for(var companyId:all_company){
            var companyDocument = documentRepository.findAll().stream().filter(document1 -> document1.getUser().returnId().equals(companyId)).toList().get(0);
            var companyDocumentData = parseStringToList(companyDocument.getData());
            int index = 0;
            for(var position:companyDocumentData){
                String score = null;
                try {
                    score = PDFDecoder.getUserSkillOnPosition(position, document.getData());
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
                userToPositionCorelationRepository.save(new UserToPositionCorelation(document.getUser().returnId(), companyId, index, Float.valueOf(score)));
                index++;
            }
        }

    }


    public List<Document> returnAll() {
        return documentRepository.findAll();
    }

    public Document returnUserDocument(String email) {
        var user = accountCredentialsRepository.findByEmail(email);
        return documentRepository.findByUser(user);
    }


    private void updateData(AccountCredentials user) {
//        var document = documentRepository.findByUser(user);
//        this.documentRepository.delete(document);
    }

    public List<String> returnUserData(String email) {
        var userAcc = this.accountCredentialsRepository.findByEmail(email);

        return extractData(this.documentRepository.findByUser(userAcc).getData());
    }

    public String returnCompanyData(String email) {
        var userAcc = this.accountCredentialsRepository.findByEmail(email);

        return this.documentRepository.findByUser(userAcc).getData();
    }

    public static List<String> extractData(String jsonString) {
        // Remove the "```json" and "```" wrapping from the string
        jsonString = jsonString.replace("```json", "").replace("```", "").trim();

        // Parse the string as a JSONArray
        JSONArray jsonArray = new JSONArray(jsonString);

        // Create a list to store the result
        List<String> resultList = new ArrayList<>();

        // Iterate over each object in the JSONArray
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject obj = jsonArray.getJSONObject(i);
            List<String> technologiesList = null;
            // Extract category, technologies (as comma-separated string), and experience
            String category = obj.getString("category");
            try {
                technologiesList = List.of(obj.getString("technologies").split(","));
            } catch (Exception e) {
                try {
                    technologiesList = obj.getJSONArray("technologies").toList().stream()
                            .map(String::valueOf)  // Convert each object to a String
                            .collect(Collectors.toList());
                } catch (Exception ex) {

                }
            }

            String technologies = String.join(",", technologiesList);
            Integer experience = null;
            try {
                experience = obj.getInt("experience");
            } catch (Exception e) {
                try {
                    var experienceS = obj.getString("experience");
                    experience = Integer.parseInt(experienceS.replace("%",""));
                } catch (Exception ex) {
                }
            }


            // Add the formatted data to the result list
            resultList.add(String.format("[%s,%s,%d]", category, technologies, experience));
        }

        return resultList;
    }
}
