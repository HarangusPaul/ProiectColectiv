package com.example.app.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "company_account")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CompanyAccount extends BaseEntity{
    @Column
    private UUID accountID;

    @Column
    private String companyName;


    @Column
    private Integer openPositions;
}
