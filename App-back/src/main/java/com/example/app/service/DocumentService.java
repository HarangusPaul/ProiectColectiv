package com.example.app.service;


import com.example.app.controller.request.DocumentRequest;
import com.example.app.domain.Document;
import com.example.app.repository.AccountCredentialsRepository;
import com.example.app.repository.CompanyRepository;
import com.example.app.repository.DocumentRepository;
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

    public DocumentService(DocumentRepository documentRepository, AccountCredentialsRepository accountCredentialsRepository, CompanyRepository companyRepository) {
        this.documentRepository = documentRepository;
        this.accountCredentialsRepository = accountCredentialsRepository;
        this.companyRepository = companyRepository;
    }


    public void addDocument(DocumentRequest document) throws IOException {
        var user = accountCredentialsRepository.findByEmail(document.getEmailUser());
        var company = companyRepository.findAll().stream().filter(companyAccount -> companyAccount.getAccountID().equals(user.returnId())).toList();
        documentRepository.save(document.returnDocumentEntity(user,!company.isEmpty()));
    }

    public List<Document> returnAll(){
        return documentRepository.findAll();
    }

    public Document returnUserDocument(String email){
        var user = accountCredentialsRepository.findByEmail(email);
        return documentRepository.findByUser(user);
    }


    public List<String> returnUserData(String email){
        var userAcc = this.accountCredentialsRepository.findByEmail(email);

        return extractData(this.documentRepository.findByUser(userAcc).getData());
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
