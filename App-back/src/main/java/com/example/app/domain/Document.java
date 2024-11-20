package com.example.app.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "documents")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Document extends BaseEntity{
    @Column
    private String name;

    @Column
    private LocalDateTime date;

    @Column(length = 100000)
    private String data;

    @Column(length = 100000)
    private String base64;

    @OneToOne(cascade = CascadeType.ALL)
    private AccountCredentials user;
}

