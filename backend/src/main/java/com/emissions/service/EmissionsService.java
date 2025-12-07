package com.emissions.service;

import com.emissions.model.EmissionsData;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmissionsService {
    
    private final List<EmissionsData> emissionsData;
    
    public EmissionsService() {
        this.emissionsData = initializeSampleData();
    }
    
    public List<EmissionsData> getAllEmissions() {
        return new ArrayList<>(emissionsData);
    }
    
    public List<EmissionsData> getEmissionsByIndustry(String industry) {
        return emissionsData.stream()
                .filter(e -> e.getIndustry().equalsIgnoreCase(industry))
                .collect(Collectors.toList());
    }
    
    public List<EmissionsData> getEmissionsBySector(String sector) {
        return emissionsData.stream()
                .filter(e -> e.getSector().equalsIgnoreCase(sector))
                .collect(Collectors.toList());
    }
    
    public List<EmissionsData> getEmissionsByYear(Integer year) {
        return emissionsData.stream()
                .filter(e -> e.getYear().equals(year))
                .collect(Collectors.toList());
    }
    
    public List<String> getAllIndustries() {
        return emissionsData.stream()
                .map(EmissionsData::getIndustry)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
    
    public List<String> getAllSectors() {
        return emissionsData.stream()
                .map(EmissionsData::getSector)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
    
    public Map<String, Double> getEmissionsByIndustrySummary() {
        return emissionsData.stream()
                .collect(Collectors.groupingBy(
                    EmissionsData::getIndustry,
                    Collectors.summingDouble(EmissionsData::getEmissionsMt)
                ));
    }
    
    public Map<String, Double> getEmissionsBySectorSummary() {
        return emissionsData.stream()
                .collect(Collectors.groupingBy(
                    EmissionsData::getSector,
                    Collectors.summingDouble(EmissionsData::getEmissionsMt)
                ));
    }
    
    public Map<Integer, Double> getEmissionsByYearSummary() {
        return emissionsData.stream()
                .collect(Collectors.groupingBy(
                    EmissionsData::getYear,
                    Collectors.summingDouble(EmissionsData::getEmissionsMt)
                ));
    }
    
    private List<EmissionsData> initializeSampleData() {
        List<EmissionsData> data = new ArrayList<>();
        Random random = new Random();
        
        String[] industries = {
            "Energy", "Manufacturing", "Transportation", "Agriculture", 
            "Construction", "Waste Management", "Mining", "Chemical"
        };
        
        String[] sectors = {
            "Power Generation", "Steel Production", "Aviation", "Livestock",
            "Building Materials", "Landfill", "Coal Mining", "Petrochemicals"
        };
        
        String[] countries = {
            "United States", "China", "India", "Russia", "Japan", 
            "Germany", "Brazil", "United Kingdom", "Canada", "Australia"
        };
        
        String[] regions = {
            "North America", "Asia", "Europe", "South America", "Oceania"
        };
        
        int id = 1;
        for (int year = 2015; year <= 2024; year++) {
            for (int i = 0; i < industries.length; i++) {
                double baseEmissions = 50 + random.nextDouble() * 200;
                data.add(new EmissionsData(
                    (long) id++,
                    industries[i],
                    sectors[i],
                    Math.round(baseEmissions * 100.0) / 100.0,
                    year,
                    countries[random.nextInt(countries.length)],
                    regions[random.nextInt(regions.length)]
                ));
            }
        }
        
        return data;
    }
}


