package com.emissions.model;

import java.time.LocalDateTime;

public class ChatMessage {
    private String role; // "user" or "assistant"
    private String content;
    private LocalDateTime timestamp;
    private String searchResults; // For internet search results
    
    public ChatMessage() {
        this.timestamp = LocalDateTime.now();
    }
    
    public ChatMessage(String role, String content) {
        this.role = role;
        this.content = content;
        this.timestamp = LocalDateTime.now();
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    public String getSearchResults() {
        return searchResults;
    }
    
    public void setSearchResults(String searchResults) {
        this.searchResults = searchResults;
    }
}


