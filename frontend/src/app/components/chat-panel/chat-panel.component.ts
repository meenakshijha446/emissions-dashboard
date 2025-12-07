import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatMessage } from '../../services/chat.service';

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-panel">
      <div class="chat-header">
        <h2>💬 Ask About Emissions</h2>
        <p>Get insights or search the web</p>
      </div>
      
      <div class="chat-messages" #chatContainer>
        <div *ngFor="let message of messages" 
             [class]="'message ' + message.role">
          <div class="message-content">
            <div class="message-role">
              <span *ngIf="message.role === 'user'">👤 You</span>
              <span *ngIf="message.role === 'assistant'">🤖 Assistant</span>
            </div>
            <div class="message-text">{{ message.content }}</div>
            <div *ngIf="message.searchResults" class="search-results">
              <strong>🌐 Internet Search Results:</strong>
              <div class="search-content">{{ message.searchResults }}</div>
            </div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>
        <div *ngIf="isLoading" class="message assistant">
          <div class="message-content">
            <div class="message-role">🤖 Assistant</div>
            <div class="loading-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>

      <div class="chat-input-container">
        <div class="input-options">
          <label class="checkbox-label">
            <input type="checkbox" [(ngModel)]="searchInternet">
            <span>🔍 Search Internet</span>
          </label>
        </div>
        <div class="input-wrapper">
          <input 
            type="text" 
            [(ngModel)]="currentMessage"
            (keyup.enter)="sendMessage()"
            placeholder="Ask about emissions data or search the web..."
            class="chat-input"
            [disabled]="isLoading">
          <button 
            (click)="sendMessage()" 
            class="send-button"
            [disabled]="!currentMessage.trim() || isLoading">
            <span *ngIf="!isLoading">Send</span>
            <span *ngIf="isLoading">...</span>
          </button>
        </div>
        <div class="suggestions">
          <span class="suggestion-label">Try asking:</span>
          <button *ngFor="let suggestion of suggestions" 
                  (click)="useSuggestion(suggestion)"
                  class="suggestion-btn">
            {{ suggestion }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chat-panel {
      background: white;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      height: 800px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .chat-header {
      padding: 1.5rem;
      border-bottom: 2px solid #f0f0f0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 16px 16px 0 0;
    }
    .chat-header h2 {
      margin: 0;
      font-size: 1.5rem;
    }
    .chat-header p {
      margin: 0.5rem 0 0 0;
      opacity: 0.9;
      font-size: 0.9rem;
    }
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .message {
      display: flex;
      margin-bottom: 0.5rem;
    }
    .message.user {
      justify-content: flex-end;
    }
    .message.assistant {
      justify-content: flex-start;
    }
    .message-content {
      max-width: 80%;
      padding: 1rem;
      border-radius: 12px;
      word-wrap: break-word;
    }
    .message.user .message-content {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .message.assistant .message-content {
      background: #f0f0f0;
      color: #333;
    }
    .message-role {
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    .message-text {
      white-space: pre-wrap;
      line-height: 1.5;
    }
    .message-time {
      font-size: 0.75rem;
      opacity: 0.7;
      margin-top: 0.5rem;
    }
    .search-results {
      margin-top: 1rem;
      padding: 1rem;
      background: rgba(102, 126, 234, 0.1);
      border-radius: 8px;
      border-left: 3px solid #667eea;
    }
    .search-results strong {
      display: block;
      margin-bottom: 0.5rem;
      color: #667eea;
    }
    .search-content {
      white-space: pre-wrap;
      line-height: 1.6;
    }
    .loading-dots {
      display: flex;
      gap: 0.5rem;
    }
    .loading-dots span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #667eea;
      animation: bounce 1.4s infinite ease-in-out both;
    }
    .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
    .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
    .chat-input-container {
      padding: 1.5rem;
      border-top: 2px solid #f0f0f0;
      background: #fafafa;
    }
    .input-options {
      margin-bottom: 0.75rem;
    }
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-size: 0.9rem;
      color: #666;
    }
    .checkbox-label input[type="checkbox"] {
      cursor: pointer;
    }
    .input-wrapper {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .chat-input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.3s;
    }
    .chat-input:focus {
      border-color: #667eea;
    }
    .send-button {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .send-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
    .send-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
    }
    .suggestion-label {
      font-size: 0.85rem;
      color: #666;
      margin-right: 0.5rem;
    }
    .suggestion-btn {
      padding: 0.4rem 0.8rem;
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 20px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .suggestion-btn:hover {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }
  `]
})
export class ChatPanelComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  
  messages: ChatMessage[] = [];
  currentMessage: string = '';
  searchInternet: boolean = false;
  isLoading: boolean = false;
  
  suggestions: string[] = [
    'Show emissions by industry',
    'What are the emissions by sector?',
    'Search latest emissions news',
    'Show emissions trend'
  ];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.addWelcomeMessage();
  }

  addWelcomeMessage() {
    this.messages.push({
      role: 'assistant',
      content: 'Hello! I can help you explore emissions data. You can ask me about:\n\n• Emissions by industry or sector\n• Emissions trends over years\n• Specific industries\n• Or search the internet for latest information\n\nTry asking a question or use one of the suggestions below!',
      timestamp: new Date().toISOString()
    });
  }

  sendMessage() {
    if (!this.currentMessage.trim() || this.isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: this.currentMessage,
      timestamp: new Date().toISOString()
    };
    
    this.messages.push(userMessage);
    const messageToSend = this.currentMessage;
    this.currentMessage = '';
    this.isLoading = true;

    this.chatService.sendMessage({
      message: messageToSend,
      searchInternet: this.searchInternet
    }).subscribe({
      next: (response) => {
        response.timestamp = new Date().toISOString();
        this.messages.push(response);
        this.isLoading = false;
        this.scrollToBottom();
      },
      error: (error) => {
        this.messages.push({
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again later.',
          timestamp: new Date().toISOString()
        });
        this.isLoading = false;
        this.scrollToBottom();
      }
    });
  }

  useSuggestion(suggestion: string) {
    this.currentMessage = suggestion;
    this.sendMessage();
  }

  formatTime(timestamp?: string): string {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = 
          this.chatContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }
}


