package com.example.app.controller.request;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class PositionResponse {
    private String position;
    private String skills;
    private Float score;
}
