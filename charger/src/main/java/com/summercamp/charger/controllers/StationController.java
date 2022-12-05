package com.summercamp.charger.controllers;


import com.summercamp.charger.dtos.StationDto;


import com.summercamp.charger.models.Station;
import com.summercamp.charger.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/api/stations")
public class StationController {
    @Autowired
    private StationService stationService;

    //READ-GET
    @GetMapping
    public List<Station> getStation() {
        return stationService.getStation();
    }

    @GetMapping(path = "/find/{id}")
    public StationDto getStationById(@PathVariable Long id) {

        return stationService.getStationById(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public StationDto updateStation(@PathVariable Long id, @RequestBody StationDto stationDto) {
        return stationService.updateStation(id, stationDto);
    }

    //CREATE-POST
    @PostMapping
    public StationDto saveStation(@RequestBody StationDto stationDto) {
        return stationService.saveStation(stationDto);
    }

    //Delete-DEL
    @DeleteMapping(path = "/{id}")
    public void deleteStationById(@PathVariable Long id) {
        stationService.deleteStationById(id);
    }

    @GetMapping(path = "/name/{name}")
    public List<Station> getStationsByName(@PathVariable String name) {
        return stationService.getStationsByName(name);
    }

    @GetMapping(path = "/sort/{fieldId}")
    public List<Station> sortByField(@PathVariable Long fieldId) {
        return stationService.sortByField(fieldId);
    }

}
