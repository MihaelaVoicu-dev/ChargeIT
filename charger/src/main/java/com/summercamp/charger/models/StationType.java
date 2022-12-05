package com.summercamp.charger.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class StationType {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id",nullable = false)
    private Long id;

    @Column(name="power")
    private int power;

    @Column(name="name")
    private String name;

    @Column(name="plugType")
    private String plugType;

    }