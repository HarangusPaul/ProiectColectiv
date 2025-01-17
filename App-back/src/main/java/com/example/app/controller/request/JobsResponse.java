package com.example.app.controller.request;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class JobsResponse {
    private String email;

    private String technologies;

    private Float score;

    private String possition;
}
