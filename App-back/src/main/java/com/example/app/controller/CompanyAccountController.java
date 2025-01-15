package com.example.app.controller;


import com.example.app.controller.request.AccountCredentialsRequest;
import com.example.app.domain.AccountCredentials;
import com.example.app.domain.CompanyAccount;
import com.example.app.service.CompanyAccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/app/v1/accounts/company-accounts")
public class CompanyAccountController {


    private final CompanyAccountService companyAccountService;

    public CompanyAccountController(CompanyAccountService companyAccountService) {
        this.companyAccountService = companyAccountService;
    }

    @GetMapping("/all")
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

    @PostMapping("/associate-company")
    public ResponseEntity<CompanyAccount> createCompanyAccount(@RequestBody CompanyAccount companyAccount) {
        CompanyAccount created = companyAccountService.createCompanyAccount(companyAccount);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PostMapping("/find")
    public ResponseEntity<CompanyAccount> createCompany(@RequestBody AccountCredentialsRequest request) {
        // Create AccountCredentials from request DTO
        AccountCredentials accountCredentials = new AccountCredentials(request);

        // Find corresponding Company Account by credentials
        return companyAccountService.findCompanyByCredentials(accountCredentials)
                .map(company -> new ResponseEntity<>(company, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)); // Return NOT_FOUND if no matching account is found
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompanyAccount(@PathVariable UUID id) {
        companyAccountService.deleteCompanyAccount(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
