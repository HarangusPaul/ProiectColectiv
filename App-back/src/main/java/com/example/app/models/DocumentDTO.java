package com.example.app.models;


import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@AllArgsConstructor
@Builder
public class DocumentDTO {
    private String data;

    private LocalDateTime date;
}
