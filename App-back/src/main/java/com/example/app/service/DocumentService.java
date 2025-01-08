package com.example.app.service;


import com.example.app.controller.request.DocumentRequest;
import com.example.app.domain.Document;
import com.example.app.repository.AccountCredentialsRepository;
import com.example.app.repository.DocumentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;

    private final AccountCredentialsRepository accountCredentialsRepository;

    public DocumentService(DocumentRepository documentRepository, AccountCredentialsRepository accountCredentialsRepository) {
        this.documentRepository = documentRepository;
        this.accountCredentialsRepository = accountCredentialsRepository;
    }


    public void addDocument(DocumentRequest document){
        var user = accountCredentialsRepository.findByEmail(document.getEmailUser());

        documentRepository.save(document.returnDocumentEntity(user));
    }

    public List<Document> returnAll(){
        return documentRepository.findAll();
    }

    public Document returnUserDocument(String email){
        var user = accountCredentialsRepository.findByEmail(email);
        return documentRepository.findByUser(user);
    }
}
