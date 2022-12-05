package com.summercamp.charger.repos;

import com.summercamp.charger.models.Location;
import com.summercamp.charger.models.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  LocationRepository extends JpaRepository<Location,Long> {
}
