package com.example.app.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "positions")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserToPositionCorelation extends BaseEntity {
    private UUID UserId;

    private UUID companyId;

    private Integer positionIndex;

    private Float score;
}
