package com.summercamp.charger.repos;

import com.summercamp.charger.models.Booking;
import com.summercamp.charger.models.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
   List<Booking> findByEndDateTimeAfterAndStartDateTimeBeforeAndStation(LocalDateTime startDate, LocalDateTime endDate, Station station);

}

