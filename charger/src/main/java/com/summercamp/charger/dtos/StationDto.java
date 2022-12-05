package com.summercamp.charger.dtos;

import com.summercamp.charger.models.StationType;
import lombok.Data;

@Data
public class StationDto {
   private Long id;

   private boolean isOpen;

   private Long stationTypeId;

   private Long locationId;

   private  String name;

}
