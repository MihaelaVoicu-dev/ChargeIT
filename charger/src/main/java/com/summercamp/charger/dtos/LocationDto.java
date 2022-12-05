package com.summercamp.charger.dtos;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Data
public class LocationDto {

    private Long id;

    private int longitude;

    private int latitude;

    private String city;

    private String country;

    public int getLongitude() {
        return longitude;
    }

    public String getCity() {
        return city;
    }

    public String getCountry() {
        return country;
    }

    public int getLatitude() {
        return latitude;
    }
}


