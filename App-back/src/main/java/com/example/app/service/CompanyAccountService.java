package com.example.app.service;


import com.example.app.domain.AccountCredentials;
import com.example.app.domain.CompanyAccount;
import com.example.app.repository.AccountCredentialsRepository;
import com.example.app.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CompanyAccountService {


    private final CompanyRepository companyAccountRepository;

    private final AccountCredentialsRepository accountCredentialsRepository;

    public CompanyAccountService(CompanyRepository companyAccountRepository, AccountCredentialsRepository accountCredentialsRepository) {
        this.companyAccountRepository = companyAccountRepository;
        this.accountCredentialsRepository = accountCredentialsRepository;
    }

    public List<CompanyAccount> getAllCompanyAccounts() {
        return companyAccountRepository.findAll();
    }

    public Optional<CompanyAccount> getCompanyAccountById(UUID id) {
        return companyAccountRepository.findById(id);
    }

    public CompanyAccount createCompanyAccount(CompanyAccount companyAccount) {
        return companyAccountRepository.save(companyAccount);
    }

    public Optional<CompanyAccount> findCompanyByCredentials(AccountCredentials accountCredentials) {
        var account = accountCredentialsRepository.findByEmail(accountCredentials.getEmail());

        return companyAccountRepository.findAll().stream()
                .filter(company -> company.getAccountID().equals(account.returnId()))
                .findFirst();
    }

    public void deleteCompanyAccount(UUID id) {
        companyAccountRepository.deleteById(id);
    }
}
