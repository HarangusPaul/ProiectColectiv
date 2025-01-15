package com.example.app.controller;


import com.example.app.controller.request.AccountCredentialsRequest;
import com.example.app.controller.request.AccountCredentialsRequestValidation;
import com.example.app.controller.request.AccountDetailsRequest;
import com.example.app.domain.AccountCredentials;
import com.example.app.domain.CompanyAccount;
import com.example.app.domain.Interview;
import com.example.app.models.TokenDTO;
import com.example.app.service.AccountCredentialsService;
import com.example.app.service.AccountDetailsService;
import com.example.app.service.CompanyAccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/app/v1/accounts") ///every admin
public class AccountManageController {
    private final AccountCredentialsService accountCredentialsService;

    private final AccountDetailsService accountDetailsService;

    private final CompanyAccountService companyAccountService;

    public AccountManageController(AccountCredentialsService accountCredentialsService, AccountDetailsService accountDetailsService, CompanyAccountService companyAccountService) {
        this.accountCredentialsService = accountCredentialsService;
        this.accountDetailsService = accountDetailsService;
        this.companyAccountService = companyAccountService;
    }


    // Endpoint to add an interview
    @PostMapping("/addInterview")
    public ResponseEntity<String> addInterview(@RequestBody Interview interview) {
        accountCredentialsService.addInterview(interview);
        return new ResponseEntity<>("Interview added successfully", HttpStatus.CREATED);
    }

    // Endpoint to get all interviews for a given email
    @GetMapping("/emailInterview/{email}")
    public ResponseEntity<List<String>> getAllFor(@PathVariable String email) {
        List<Interview> interviews = accountCredentialsService.getAllFor(email);
        if (interviews.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content if no interviews found
        }
        return new ResponseEntity<>(interviews.stream().map(Interview::getCompany).toList(), HttpStatus.OK); // 200 OK with interview list
    }

    @PostMapping("/register")
    public ResponseEntity<String> createAccount(@RequestBody AccountCredentialsRequest request) {
        try {
            accountCredentialsService.create(request);
            accountDetailsService.create(new AccountDetailsRequest(request.getEmail(), request.getLocation()));
            return ResponseEntity.ok().build();
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> logIn(@RequestBody AccountCredentialsRequestValidation requestValidation) {
        try {
            var value = accountCredentialsService.logIn(requestValidation);

            if (value == null) {
                throw new Exception("Invalid!");
            }

            return ResponseEntity.ok().body(value);
        } catch (Exception exception) {
            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping("/valid-token")
    public ResponseEntity validToken() {
        try {
            return ResponseEntity.ok().build();
        } catch (Exception exception) {
            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping("/get-all-non-company")
    public ResponseEntity<List<String>> getAllNonCompany() {
        try {
            var allCompany = companyAccountService.getAllCompanyAccounts().stream().map(CompanyAccount::getAccountID).toList();

            var allNonCompany = accountCredentialsService.returnAll().stream()
                    .filter(acc -> !allCompany.contains(acc.returnId())).toList()
                    .stream().map(AccountCredentials::getEmail).toList();

            return ResponseEntity.ok().body(allNonCompany);
        } catch (Exception exception) {
            return ResponseEntity.badRequest().build();
        }
    }
}
