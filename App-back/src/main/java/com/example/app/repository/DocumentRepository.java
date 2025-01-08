package com.example.app.repository;

import com.example.app.domain.AccountCredentials;
import com.example.app.domain.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DocumentRepository extends JpaRepository<Document, UUID> {
    Document findByUser(AccountCredentials user);
}
