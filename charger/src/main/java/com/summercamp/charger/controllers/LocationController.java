package com.summercamp.charger.controllers;

import com.summercamp.charger.dtos.LocationDto;
import com.summercamp.charger.dtos.StationDto;
import com.summercamp.charger.dtos.StationTypeDto;
import com.summercamp.charger.models.Booking;
import com.summercamp.charger.models.Location;
import com.summercamp.charger.models.Station;
import com.summercamp.charger.models.StationType;
import com.summercamp.charger.repos.BookingRepository;
import com.summercamp.charger.repos.LocationRepository;
import com.summercamp.charger.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping
    public List<Location> getLocation() {
        return locationService.getLocation();
    }

    @PostMapping
    public Location saveLocation(@RequestBody Location location){return locationService.saveLocation(location);}

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Location updateLocation(@PathVariable Long id, @RequestBody LocationDto locationDto){
      return locationService.updateLocation(id, locationDto);
    }
    @GetMapping(path="/find/{id}")
    public Location findLocationByID(@PathVariable Long id){
        return locationService.findLocationByID(id);
    }
    //Delete -Del
    @DeleteMapping(path = "/{id}")
    public void deleteLocationById(@PathVariable Long id){
         locationService.deleteLocationById(id);
    }
}


