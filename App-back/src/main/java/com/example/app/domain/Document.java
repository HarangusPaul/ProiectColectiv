package com.example.app.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "documents")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Document extends BaseEntity {

    @Column
    private String name;

    @Column
    private Date date;

    @Column
    private String data;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String base64;

    public UUID returnId() {
        return this.id;
    }
}
