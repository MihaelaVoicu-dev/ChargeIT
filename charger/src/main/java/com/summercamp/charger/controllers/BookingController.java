package com.summercamp.charger.controllers;

import com.summercamp.charger.dtos.BookingDto;
import com.summercamp.charger.dtos.StationDto;
import com.summercamp.charger.models.Booking;

import com.summercamp.charger.models.Location;
import com.summercamp.charger.models.Station;
import com.summercamp.charger.models.StationType;
import com.summercamp.charger.repos.BookingRepository;
import com.summercamp.charger.repos.StationRepository;
import com.summercamp.charger.service.BookingService;
import org.hibernate.annotations.SQLUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.summercamp.charger.service.BookingService;
import javax.persistence.PostUpdate;
import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<Booking> getBooking() {
      return bookingService.getBooking();
    }

    @GetMapping(path="/find/{id}")
    public BookingDto getBookingById(@PathVariable Long id){
        return bookingService.getBookingById(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public BookingDto updateBooking(@PathVariable Long id, @RequestBody BookingDto bookingDto){
        return bookingService.updateBooking(id, bookingDto);
    }

    @PostMapping
    public BookingDto saveBooking(@RequestBody BookingDto bookingDto){
     return bookingService.saveBooking(bookingDto);
    }

    //Delete-DEL
    @DeleteMapping(path = "/{id}")
    public void deleteBookingById(@PathVariable Long id){
        bookingService.deleteBookingById(id);
    }
}
