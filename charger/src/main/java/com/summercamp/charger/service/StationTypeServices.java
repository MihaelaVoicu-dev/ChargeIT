package com.summercamp.charger.service;

import com.summercamp.charger.dtos.StationTypeDto;
import com.summercamp.charger.models.StationType;
import com.summercamp.charger.repos.StationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@Service
public class StationTypeServices {
    @Autowired
    private StationTypeRepository stationTypeRepository;

    public List<StationType> getStationTypes() {
        return stationTypeRepository.findAll();
    }
  public StationType getStationTypeById(@PathVariable Long id ){
        StationType stationType = stationTypeRepository.findById(id)
              .orElseThrow(() -> new RuntimeException("Error while retrieving station."));
      return stationType;
  }
    public StationType saveStationType(@RequestBody StationType stationType){
        return stationTypeRepository.save(stationType);
    }


    public StationType updateStationType(@PathVariable Long id, @RequestBody StationTypeDto stationTypeDto) {
        StationType stationType = stationTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error while retrieving station."));
        stationType.setPower(stationTypeDto.getPower());
        stationType.setName(stationType.getName());
        stationType.setPlugType(stationType.getPlugType());
        return stationTypeRepository.save(stationType);
    }

    public void deleteById(@PathVariable Long id){
        stationTypeRepository.deleteById(id);
    }
}
