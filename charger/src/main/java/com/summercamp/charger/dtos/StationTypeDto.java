package com.summercamp.charger.dtos;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Data
public class StationTypeDto {
    private Long id;

    private int power;

    private String name;

    private String plugType;

    public String getName() {
        return name;
    }
    public String getPlugType(){
        return plugType;
    }
    public int getPower(){
        return power;
    }
}
