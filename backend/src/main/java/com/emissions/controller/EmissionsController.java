package com.emissions.controller;

import com.emissions.model.EmissionsData;
import com.emissions.service.EmissionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/emissions")
@CrossOrigin(origins = "https://incredible-vacherin-0032d7.netlify.app")
public class EmissionsController {
    
    @Autowired
    private EmissionsService emissionsService;
    
    @GetMapping
    public ResponseEntity<List<EmissionsData>> getAllEmissions() {
        return ResponseEntity.ok(emissionsService.getAllEmissions());
    }
    
    @GetMapping("/industry/{industry}")
    public ResponseEntity<List<EmissionsData>> getByIndustry(@PathVariable String industry) {
        return ResponseEntity.ok(emissionsService.getEmissionsByIndustry(industry));
    }
    
    @GetMapping("/sector/{sector}")
    public ResponseEntity<List<EmissionsData>> getBySector(@PathVariable String sector) {
        return ResponseEntity.ok(emissionsService.getEmissionsBySector(sector));
    }
    
    @GetMapping("/year/{year}")
    public ResponseEntity<List<EmissionsData>> getByYear(@PathVariable Integer year) {
        return ResponseEntity.ok(emissionsService.getEmissionsByYear(year));
    }
    
    @GetMapping("/industries")
    public ResponseEntity<List<String>> getAllIndustries() {
        return ResponseEntity.ok(emissionsService.getAllIndustries());
    }
    
    @GetMapping("/sectors")
    public ResponseEntity<List<String>> getAllSectors() {
        return ResponseEntity.ok(emissionsService.getAllSectors());
    }
    
    @GetMapping("/summary/industry")
    public ResponseEntity<Map<String, Double>> getIndustrySummary() {
        return ResponseEntity.ok(emissionsService.getEmissionsByIndustrySummary());
    }
    
    @GetMapping("/summary/sector")
    public ResponseEntity<Map<String, Double>> getSectorSummary() {
        return ResponseEntity.ok(emissionsService.getEmissionsBySectorSummary());
    }
    
    @GetMapping("/summary/year")
    public ResponseEntity<Map<Integer, Double>> getYearSummary() {
        return ResponseEntity.ok(emissionsService.getEmissionsByYearSummary());
    }
}


