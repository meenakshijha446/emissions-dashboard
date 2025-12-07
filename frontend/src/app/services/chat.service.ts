import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ChatMessage {
  role: string;
  content: string;
  timestamp?: string;
  searchResults?: string;
}

export interface ChatRequest {
  message: string;
  searchInternet: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = `${environment.apiUrl}/chat`;

  constructor(private http: HttpClient) {}

  sendMessage(request: ChatRequest): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(this.apiUrl, request);
  }
}


