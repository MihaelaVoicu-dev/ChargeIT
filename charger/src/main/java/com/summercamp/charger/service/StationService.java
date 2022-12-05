package com.summercamp.charger.service;

import com.summercamp.charger.dtos.StationDto;
import com.summercamp.charger.models.Location;
import com.summercamp.charger.models.Station;
import com.summercamp.charger.models.StationType;
import com.summercamp.charger.repos.LocationRepository;
import com.summercamp.charger.repos.StationRepository;
import com.summercamp.charger.repos.StationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.List;
import java.util.Optional;

@Service
public class StationService {
    @Autowired
    private StationRepository stationRepository;

    @Autowired
    private StationTypeRepository stationTypeRepository;
    @Autowired
    private LocationRepository locationRepository;


    public List<Station> getStation() {
        return stationRepository.findAll();
    }


   public StationDto getStationById(@PathVariable Long id){
       Station station= stationRepository.findById(id)
               .orElseThrow(() -> new RuntimeException("Error while retrieving station."));
       return convertToDTO(station);
   }
    public StationDto updateStation(@PathVariable Long id, @RequestBody StationDto stationDto){
        Station station= stationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error while retrieving station."));
        station.setOpen(stationDto.isOpen());
        StationType stationType = stationTypeRepository.findById(stationDto.getStationTypeId())
                .orElseThrow(() -> new RuntimeException("Error while retrieving stationDto type."));
        Location location = locationRepository.findById(stationDto.getLocationId())
                .orElseThrow(() -> new RuntimeException("Error while retrieving location id."));
        station.setStationType(stationType);
        station.setLocation(location);
        station.setName(stationDto.getName());
         stationRepository.save(station);
         return convertToDTO(station);
    }

    public StationDto saveStation(@RequestBody StationDto stationDto){
        StationType stationType = stationTypeRepository.findById(stationDto.getStationTypeId())
                .orElseThrow(() -> new RuntimeException("Error while retrieving stationDto type."));
        Location location = locationRepository.findById(stationDto.getLocationId())
                .orElseThrow(() -> new RuntimeException("Error while retrieving location id."));
        Station station = new Station();
        station.setStationType(stationType);
        station.setName(stationDto.getName());
        station.setLocation(location);
        station.setOpen(stationDto.isOpen());
         stationRepository.save(station);
         return convertToDTO(station);
    }

    public void deleteStationById(@PathVariable Long id){
        stationRepository.deleteById(id);
    }

 public StationDto convertToDTO(Station station ){
        StationDto stationDto=new StationDto();
        stationDto.setId(station.getId());
        stationDto.setName(station.getName());
        stationDto.setOpen(station.isOpen());
    stationDto.setStationTypeId(station.getStationType().getId());
    stationDto.setLocationId(station.getLocation().getId());
    return stationDto;
    }
    public  List<Station> sortByField(Long fieldId) {
        return stationRepository.findAll(Sort.by(Sort.Direction.ASC, String.valueOf(fieldId)));
    }

    public  List<Station> getStationsByName(@PathVariable String name) {
       return stationRepository.findByNameContaining(name);

    }
}




