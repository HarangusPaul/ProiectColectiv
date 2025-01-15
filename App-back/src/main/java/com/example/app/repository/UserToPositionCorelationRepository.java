package com.example.app.repository;

import com.example.app.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserToPositionCorelationRepository extends JpaRepository<com.example.app.domain.UserToPositionCorelation, UUID> {
}
