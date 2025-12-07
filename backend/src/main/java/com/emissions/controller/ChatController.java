package com.emissions.controller;

import com.emissions.model.ChatMessage;
import com.emissions.model.ChatRequest;
import com.emissions.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {
    
    @Autowired
    private ChatService chatService;
    
    @PostMapping
    public ResponseEntity<ChatMessage> sendMessage(@RequestBody ChatRequest request) {
        ChatMessage response = chatService.processMessage(request);
        return ResponseEntity.ok(response);
    }
}


