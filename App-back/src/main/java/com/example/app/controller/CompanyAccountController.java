package com.example.app.controller;


import com.example.app.domain.CompanyAccount;
import com.example.app.service.CompanyAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/app/v1/company-accounts")
public class CompanyAccountController {

    @Autowired
    private CompanyAccountService companyAccountService;

    @GetMapping
    public ResponseEntity<List<CompanyAccount>> getAllCompanyAccounts() {
        List<CompanyAccount> accounts = companyAccountService.getAllCompanyAccounts();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyAccount> getCompanyAccountById(@PathVariable UUID id) {
        return companyAccountService.getCompanyAccountById(id)
                .map(account -> new ResponseEntity<>(account, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<CompanyAccount> createCompanyAccount(@RequestBody CompanyAccount companyAccount) {
        CompanyAccount created = companyAccountService.createCompanyAccount(companyAccount);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompanyAccount(@PathVariable UUID id) {
        companyAccountService.deleteCompanyAccount(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
