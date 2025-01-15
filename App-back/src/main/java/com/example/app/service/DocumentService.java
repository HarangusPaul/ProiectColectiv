package com.example.app.service;


import com.example.app.controller.request.DocumentRequest;
import com.example.app.domain.AccountCredentials;
import com.example.app.domain.CompanyAccount;
import com.example.app.domain.Document;
import com.example.app.domain.UserToPositionCorelation;
import com.example.app.repository.AccountCredentialsRepository;
import com.example.app.repository.CompanyRepository;
import com.example.app.repository.DocumentRepository;
import com.example.app.repository.UserToPositionCorelationRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
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
        // Remove the surrounding brackets and extra whitespace
        input = input.trim();
        input = input.substring(1, input.length() - 1); // Remove outer square brackets

        // Split by closing square brackets, indicating the end of a list
        String[] rows = input.split("\\],\\[");

        List<List<String>> result = new ArrayList<>();

        // Iterate through each row and split by commas to separate the elements
        for (String row : rows) {
            // Split by commas, making sure to handle commas in the string correctly
            String[] elements = row.split("\",\"");

            // Remove any quotes surrounding the elements
            for (int i = 0; i < elements.length; i++) {
                elements[i] = elements[i].replace("\"", "");
            }

            // Add the row to the result as a list of strings
            List<String> innerList = new ArrayList<>();
            for (String element : elements) {
                innerList.add(element);
            }

            result.add(innerList);
        }

        return result;
    }
    private void analyzeData(Document document) {
        var all_company = companyRepository.findAll().stream().map(CompanyAccount::getAccountID).toList();
        var all_users_data = this.documentRepository.findAll().stream().filter(user -> all_company.contains(user.getUser().returnId())).map(Document::getUser).toList();
        var preparedData = parseStringToList(document.getData());


        for(var userData:all_users_data){
            var data = returnUserData(userData.getEmail());
            int index = 0;
            for(var position:preparedData){
                /// user data ii in "data" si "position" e descrierea pozitiei
                var score = "0";///todo:Gummy adauga o functie de genul extractskills cu prompt-ul dat de ale functia template o gasesti in PDFDecoder
                userToPositionCorelationRepository.save(new UserToPositionCorelation(userData.returnId(),document.getUser().returnId(),index, Float.valueOf(score)));
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
        var document = documentRepository.findByUser(user);
        this.documentRepository.delete(document);
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

            // Extract category, technologies (as comma-separated string), and experience
            String category = obj.getString("category");
            List<String> technologiesList = obj.getJSONArray("technologies").toList().stream()
                    .map(String::valueOf)  // Convert each object to a String
                    .collect(Collectors.toList());
            String technologies = String.join(",", technologiesList);
            int experience = obj.getInt("experience");

            // Add the formatted data to the result list
            resultList.add(String.format("[%s,%s,%d]", category, technologies, experience));
        }

        return resultList;
    }
}
