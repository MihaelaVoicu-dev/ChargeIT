package com.summercamp.charger.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Station {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id",nullable = false)
    private Long id;

    @Column(name="isOpen")
    private boolean isOpen;

    @Column(name="name")
    private String name;

    @OneToOne
    @JoinColumn(name="locationId")
    private Location location;

    @ManyToOne
    @JoinColumn(name="stationTypeId")
    private StationType stationType;

}
