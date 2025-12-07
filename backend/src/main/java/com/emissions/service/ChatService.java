package com.emissions.service;

import com.emissions.model.ChatMessage;
import com.emissions.model.ChatRequest;
import com.emissions.model.EmissionsData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ChatService {
    
    @Autowired
    private EmissionsService emissionsService;
    
    private final RestTemplate restTemplate = new RestTemplate();
    
    public ChatMessage processMessage(ChatRequest request) {
        String message = request.getMessage().toLowerCase();
        ChatMessage response = new ChatMessage("assistant", "");
        
        if (request.isSearchInternet() || message.contains("search") || message.contains("internet") || 
            message.contains("latest") || message.contains("news")) {
            String searchQuery = extractSearchQuery(request.getMessage());
            String searchResults = performInternetSearch(searchQuery);
            response.setContent("Here's what I found about emissions:\n\n" + searchResults);
            response.setSearchResults(searchResults);
        } else {
            String answer = generateAnswerFromData(message);
            response.setContent(answer);
        }
        
        return response;
    }
    
    private String generateAnswerFromData(String message) {
        StringBuilder answer = new StringBuilder();
        
        if (message.contains("industry") || message.contains("industries")) {
            Map<String, Double> byIndustry = emissionsService.getEmissionsByIndustrySummary();
            answer.append("Emissions by Industry:\n");
            byIndustry.entrySet().stream()
                    .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                    .forEach(entry -> 
                        answer.append(String.format("- %s: %.2f million tonnes\n", entry.getKey(), entry.getValue()))
                    );
        }
        
        else if (message.contains("sector") || message.contains("sectors")) {
            Map<String, Double> bySector = emissionsService.getEmissionsBySectorSummary();
            answer.append("Emissions by Sector:\n");
            bySector.entrySet().stream()
                    .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                    .forEach(entry -> 
                        answer.append(String.format("- %s: %.2f million tonnes\n", entry.getKey(), entry.getValue()))
                    );
        }
        
        else if (message.contains("year") || message.contains("2020") || message.contains("2021") || 
                 message.contains("2022") || message.contains("2023") || message.contains("2024")) {
            int year = extractYear(message);
            if (year > 0) {
                List<EmissionsData> yearData = emissionsService.getEmissionsByYear(year);
                double total = yearData.stream().mapToDouble(EmissionsData::getEmissionsMt).sum();
                answer.append(String.format("Total emissions in %d: %.2f million tonnes\n", year, total));
            } else {
                Map<Integer, Double> byYear = emissionsService.getEmissionsByYearSummary();
                answer.append("Emissions by Year:\n");
                byYear.entrySet().stream()
                        .sorted(Map.Entry.comparingByKey())
                        .forEach(entry -> 
                            answer.append(String.format("- %d: %.2f million tonnes\n", entry.getKey(), entry.getValue()))
                        );
            }
        }
        
        else {
            String[] industries = {"energy", "manufacturing", "transportation", "agriculture", 
                                  "construction", "waste", "mining", "chemical"};
            for (String industry : industries) {
                if (message.contains(industry)) {
                    List<EmissionsData> industryData = emissionsService.getEmissionsByIndustry(
                        industry.substring(0, 1).toUpperCase() + industry.substring(1)
                    );
                    double total = industryData.stream().mapToDouble(EmissionsData::getEmissionsMt).sum();
                    answer.append(String.format("Total emissions from %s industry: %.2f million tonnes\n", 
                                              industry, total));
                    break;
                }
            }
        }
        
        if (answer.length() == 0) {
            answer.append("I can help you with information about emissions data. ");
            answer.append("You can ask me about:\n");
            answer.append("- Emissions by industry\n");
            answer.append("- Emissions by sector\n");
            answer.append("- Emissions by year\n");
            answer.append("- Specific industries (energy, manufacturing, transportation, etc.)\n");
            answer.append("- Or ask me to search the internet for latest information");
        }
        
        return answer.toString();
    }
    
    private int extractYear(String message) {
        for (int year = 2015; year <= 2024; year++) {
            if (message.contains(String.valueOf(year))) {
                return year;
            }
        }
        return 0;
    }
    
    private String extractSearchQuery(String message) {
        String query = message.replaceAll("(?i)(search|find|about|for|the|internet|latest|news)", "").trim();
        if (query.isEmpty()) {
            query = "carbon emissions climate change";
        }
        return query + " emissions";
    }
    
    private String performInternetSearch(String query) {
        try {
            String url = "https://api.duckduckgo.com/?q=" + query.replace(" ", "+") + "&format=json&no_html=1&skip_disambig=1";
            
            return simulateSearchResults(query);
        } catch (Exception e) {
            return "I encountered an issue searching the internet. Here's some general information:\n\n" +
                   "Carbon emissions are a major contributor to climate change. " +
                   "Key sectors include energy production, transportation, manufacturing, and agriculture. " +
                   "Many countries are working towards net-zero emissions targets by 2050.";
        }
    }
    
    private String simulateSearchResults(String query) {
        return "Based on recent information about " + query + ":\n\n" +
               "1. Global carbon emissions continue to be a critical concern, with energy and transportation sectors being major contributors.\n\n" +
               "2. Many countries have committed to reducing emissions through renewable energy adoption and carbon capture technologies.\n\n" +
               "3. The industrial sector, particularly manufacturing and construction, accounts for a significant portion of global emissions.\n\n" +
               "4. Agricultural emissions, primarily from livestock and fertilizer use, also contribute substantially to greenhouse gases.\n\n" +
               "Note: For real-time data, consider integrating with a search API like SerpAPI or Google Custom Search API.";
    }
}


