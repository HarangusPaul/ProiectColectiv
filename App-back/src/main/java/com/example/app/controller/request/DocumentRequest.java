package com.example.app.controller.request;

import com.example.app.domain.AccountCredentials;
import com.example.app.domain.Document;
import com.example.app.service.pdf.PDFDecoder;
import jakarta.persistence.Column;
import lombok.*;
import org.json.JSONObject;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;

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


    public Document returnDocumentEntity(AccountCredentials user, Boolean company) throws IOException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");

        LocalDate localDate = LocalDate.parse(date, formatter);

        try {
            if (!company) {
                data = PDFDecoder.decodeBase64PdfToText(base64);
                data = PDFDecoder.extractSkills(data);
                data = PDFDecoder.sendPostRequest(data);
                JSONObject jsonObject = new JSONObject(data);

                // Extract the "response" value
                String response = jsonObject.getString("response");
                data = response;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        // If needed, convert LocalDate to LocalDateTime (e.g., add default time)
        LocalDateTime localDateTime = localDate.atStartOfDay();
        return new Document(name, localDateTime, data, base64, user);
    }
}
