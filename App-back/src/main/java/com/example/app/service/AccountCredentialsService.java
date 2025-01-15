package com.example.app.service;


import com.example.app.config.exceptions.CustomException;
import com.example.app.controller.request.AccountCredentialsRequest;
import com.example.app.controller.request.AccountCredentialsRequestValidation;
import com.example.app.domain.AccountCredentials;
import com.example.app.domain.Interview;
import com.example.app.models.TokenDTO;
import com.example.app.repository.AccountCredentialsRepository;
import com.example.app.repository.InterviewRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountCredentialsService {
    private final AccountCredentialsRepository accountCredentialsRepository;
    private final TokenService tokenService;

    private final InterviewRepository interviewRepository;

    public AccountCredentialsService(AccountCredentialsRepository accountCredentialsRepository, TokenService tokenService, InterviewRepository interviewRepository) {
        this.accountCredentialsRepository = accountCredentialsRepository;
        this.tokenService = tokenService;
        this.interviewRepository = interviewRepository;
    }


    public void addInterview(Interview interview){
        interviewRepository.save(interview);
    }

    public List<Interview> getAllFor(String email){
        return interviewRepository.findAll().stream().filter(interview -> interview.getEmail().equals(email)).toList();
    }

    public void create(AccountCredentialsRequest request) throws CustomException {
        AccountCredentials value = new AccountCredentials(request);
        if(accountCredentialsRepository.findByEmail(request.getEmail()) != null){
            throw new CustomException("Already Existent Email!");
        }
        accountCredentialsRepository.save(value);
    }

    public TokenDTO logIn(AccountCredentialsRequestValidation requestValidation) {
        var account = accountCredentialsRepository.findByEmail(requestValidation.getEmail());
        return account.getPassword().equals(requestValidation.getPassword()) ? getToken(account) : null;
    }


    private TokenDTO getToken(AccountCredentials accountCredentials) {
        var token = tokenService.getTokenByUserId(accountCredentials.returnId());
        if (token != null) {
            return new TokenDTO(token.getToken());
        }
        return new TokenDTO(this.tokenService.generateToken(accountCredentials));
    }

    public AccountCredentials returnByEmail(String email) {
        return accountCredentialsRepository.findByEmail(email);
    }

    public List<AccountCredentials> returnAll() {
        return accountCredentialsRepository.findAll();
    }
}
