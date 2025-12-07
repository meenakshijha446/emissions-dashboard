package com.emissions.model;

public class ChatRequest {
    private String message;
    private boolean searchInternet;
    
    public ChatRequest() {}
    
    public ChatRequest(String message, boolean searchInternet) {
        this.message = message;
        this.searchInternet = searchInternet;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public boolean isSearchInternet() {
        return searchInternet;
    }
    
    public void setSearchInternet(boolean searchInternet) {
        this.searchInternet = searchInternet;
    }
}


