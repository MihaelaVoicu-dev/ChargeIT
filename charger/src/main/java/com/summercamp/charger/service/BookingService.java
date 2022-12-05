package com.summercamp.charger.service;

import com.summercamp.charger.controllers.BookingController;
import com.summercamp.charger.dtos.BookingDto;
import com.summercamp.charger.models.Booking;
import com.summercamp.charger.models.Station;
import com.summercamp.charger.repos.BookingRepository;
import com.summercamp.charger.repos.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private StationRepository stationRepository;


    public List<Booking> getBooking() {
        return bookingRepository.findAll();
    }

    public BookingDto updateBooking(@PathVariable Long id, @RequestBody BookingDto bookingDto) {
        Booking bookingToUpdate = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error while retrieving station."));
        bookingToUpdate.setEndDateTime(bookingDto.getStartDateTime().plusMinutes(bookingDto.getDuration()));
        Station station = stationRepository.findById(bookingDto.getStationId())
                .orElseThrow(() -> new RuntimeException("Error while retrieving station."));
        bookingToUpdate.setStation(station);
        bookingToUpdate.setName(bookingDto.getName());
        bookingToUpdate.setCarLicense(bookingDto.getCarLicense());
        bookingDto.setStartDateTime(bookingDto.getStartDateTime());
         bookingRepository.save(bookingToUpdate);
         BookingDto bookingDt=convertToDto(bookingToUpdate);
         return bookingDto;
    }

    public BookingDto getBookingById(@PathVariable Long id){
        Booking booking= bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error while retrieving station."));
        return convertToDto(booking);
    }
    public BookingDto saveBooking(@RequestBody BookingDto bookingDto) {
        Station station = stationRepository.findById(bookingDto.getStationId())
                .orElseThrow(() -> new RuntimeException("Error while retrieving station."));
        Booking booking = new Booking();
        booking.setCarLicense(bookingDto.getCarLicense());
        booking.setName(bookingDto.getName());
        booking.setStartDateTime(bookingDto.getStartDateTime());
        booking.setEndDateTime(bookingDto.getStartDateTime().plusMinutes(bookingDto.getDuration()));
        List<Booking> bookingList = bookingRepository.findByEndDateTimeAfterAndStartDateTimeBeforeAndStation(
                bookingDto.getStartDateTime(),
                bookingDto.getStartDateTime().plusMinutes(bookingDto.getDuration()), station);
        if (bookingList.size() > 0) {
            throw new RuntimeException("Error interval is overlapping");

        }
        if (station != null) {
            booking.setStation(station);
        }
         bookingRepository.save(booking);
        return convertToDto(booking);
    }
     public BookingDto convertToDto(Booking booking){
        BookingDto bookingDto=new BookingDto();
        bookingDto.setId(booking.getId());
        int duration=(int) Duration.between(booking.getStartDateTime(),booking.getEndDateTime()).toMinutes();

        bookingDto.setDuration(duration);
        bookingDto.setName(booking.getName());
        bookingDto.setCarLicense(booking.getCarLicense());
        bookingDto.setStationId(booking.getStation().getId());
        bookingDto.setStartDateTime(booking.getStartDateTime());
         System.out.println("convert "+ bookingDto);
         return bookingDto;
     }
    public void deleteBookingById(@PathVariable Long id) {
        bookingRepository.deleteById(id);
    }

}
