package com.summercamp.charger.repos;

import com.summercamp.charger.models.StationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StationTypeRepository extends JpaRepository<StationType,Long> {
}
