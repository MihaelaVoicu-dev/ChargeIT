package com.summercamp.charger.dtos;

import com.summercamp.charger.models.Station;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
@Data
public class BookingDto {

    private Long id;

    private LocalDateTime startDateTime;

    private int duration;

    private String name;

    private String carLicense;

    private Long stationId;

}
