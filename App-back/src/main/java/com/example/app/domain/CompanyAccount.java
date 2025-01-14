package com.example.app.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "company_account")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CompanyAccount extends BaseEntity{
    @Column
    @OneToOne(cascade = CascadeType.ALL)
    private AccountCredentials accountCredentials;

    @Column
    private String companyName;


    @Column
    private Integer openPositions;
}
