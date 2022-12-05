package com.summercamp.charger.models;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class Booking {
   @Id
   @GeneratedValue(strategy= GenerationType.IDENTITY)
   @Column(name="id",nullable = false)
    private Long id;

   @Column(name="startDateTime")
    private LocalDateTime startDateTime;

   @Column(name="endDateTime")
   private LocalDateTime endDateTime;


   @Column(name="name")
    private String name;

   @Column(name="carLicense")
    private String carLicense;

   @ManyToOne
   @JoinColumn(name="stationId")
   private Station station;

}



