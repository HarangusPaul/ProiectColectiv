package com.example.app.controller.request;

import com.example.app.domain.AccountCredentials;
import com.example.app.domain.Document;
import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class DocumentRequest {
    @NonNull
    private String name;

    @NonNull
    private String date;

    @NonNull
    private String data;

    @NonNull
    private String base64;

    @NonNull
    private String emailUser;


    public Document returnDocumentEntity(AccountCredentials user) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");

        LocalDate localDate = LocalDate.parse(date, formatter);

        // If needed, convert LocalDate to LocalDateTime (e.g., add default time)
        LocalDateTime localDateTime = localDate.atStartOfDay();
        return new Document(name,localDateTime,data,base64,user);
    }
}
