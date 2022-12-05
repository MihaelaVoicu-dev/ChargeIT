package com.summercamp.charger.controllers;


import com.summercamp.charger.dtos.StationDto;
import com.summercamp.charger.dtos.StationTypeDto;
import com.summercamp.charger.models.Location;
import com.summercamp.charger.models.Station;
import com.summercamp.charger.models.StationType;
import com.summercamp.charger.repos.StationTypeRepository;
import com.summercamp.charger.service.StationTypeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stationTypes")
public class StationTypeController {

   @Autowired
  private StationTypeRepository stationTypeRepository;
   @Autowired
   private StationTypeServices stationTypeServices;

   @GetMapping
  public List<StationType> getStationTypes() {
      return stationTypeServices.getStationTypes();
    }
    @GetMapping(path="/find/{id}")
    public StationType getStationTypeById(@PathVariable Long id ){
       return stationTypeServices.getStationTypeById(id);
    }

    @PostMapping
    public StationType saveStationType(@RequestBody StationType stationType){
      return stationTypeServices.saveStationType(stationType);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public StationType updateStationType(@PathVariable Long id, @RequestBody StationTypeDto stationTypeDto) {

        return stationTypeServices.updateStationType(id, stationTypeDto);
   }
   //Delete -Del
    @DeleteMapping(path = "/{id}")
    public void deleteById(@PathVariable Long id){
        stationTypeServices.deleteById(id);
    }
}