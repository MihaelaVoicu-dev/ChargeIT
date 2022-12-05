package com.summercamp.charger.service;

import com.summercamp.charger.controllers.BookingController;
import com.summercamp.charger.dtos.LocationDto;
import com.summercamp.charger.models.Location;
import com.summercamp.charger.repos.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Service
public class LocationService {
    @Autowired
    private LocationRepository locationRepository;


    public List<Location> getLocation() {
        return locationRepository.findAll();
    }

    public Location findLocationByID(@PathVariable Long id){
        return locationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error while retrieving location id"));
    }

    public Location saveLocation(@RequestBody Location location){return locationRepository.save(location);}

    public Location updateLocation(@PathVariable Long id, @RequestBody LocationDto locationDto){
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error while retrieving location id."));
        location.setLongitude(locationDto.getLongitude());
        location.setLatitude(locationDto.getLatitude());
        location.setCountry(locationDto.getCountry());
        location.setCity(locationDto.getCity());
        return locationRepository.save(location);
    }

    public void deleteLocationById(@PathVariable Long id){
        locationRepository.deleteById(id);
    }
}
