package com.summercamp.charger.repos;
import com.summercamp.charger.models.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StationRepository extends JpaRepository<Station,Long> {
    List<Station> findByNameContaining(String name);
}
