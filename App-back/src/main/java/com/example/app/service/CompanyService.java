package com.example.app.service;


import com.example.app.domain.CompanyAccount;
import com.example.app.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CompanyAccountService {

    @Autowired
    private CompanyRepository companyAccountRepository;

    public List<CompanyAccount> getAllCompanyAccounts() {
        return companyAccountRepository.findAll();
    }

    public Optional<CompanyAccount> getCompanyAccountById(UUID id) {
        return companyAccountRepository.findById(id);
    }

    public CompanyAccount createCompanyAccount(CompanyAccount companyAccount) {
        return companyAccountRepository.save(companyAccount);
    }


    public void deleteCompanyAccount(UUID id) {
        companyAccountRepository.deleteById(id);
    }
}
