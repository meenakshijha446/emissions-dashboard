package com.emissions.model;

import java.time.LocalDate;

public class EmissionsData {
    private Long id;
    private String industry;
    private String sector;
    private Double emissionsMt; // Emissions in million tonnes
    private Integer year;
    private String country;
    private String region;
    
    public EmissionsData() {}
    
    public EmissionsData(Long id, String industry, String sector, Double emissionsMt, 
                        Integer year, String country, String region) {
        this.id = id;
        this.industry = industry;
        this.sector = sector;
        this.emissionsMt = emissionsMt;
        this.year = year;
        this.country = country;
        this.region = region;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getIndustry() {
        return industry;
    }
    
    public void setIndustry(String industry) {
        this.industry = industry;
    }
    
    public String getSector() {
        return sector;
    }
    
    public void setSector(String sector) {
        this.sector = sector;
    }
    
    public Double getEmissionsMt() {
        return emissionsMt;
    }
    
    public void setEmissionsMt(Double emissionsMt) {
        this.emissionsMt = emissionsMt;
    }
    
    public Integer getYear() {
        return year;
    }
    
    public void setYear(Integer year) {
        this.year = year;
    }
    
    public String getCountry() {
        return country;
    }
    
    public void setCountry(String country) {
        this.country = country;
    }
    
    public String getRegion() {
        return region;
    }
    
    public void setRegion(String region) {
        this.region = region;
    }
}


