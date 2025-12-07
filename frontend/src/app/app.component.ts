import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatPanelComponent } from './components/chat-panel/chat-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent, ChatPanelComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>🌍 Emissions Dashboard</h1>
        <p>Track and analyze carbon emissions across industries and sectors</p>
      </header>
      <main class="app-main">
        <app-dashboard></app-dashboard>
        <app-chat-panel></app-chat-panel>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .app-header {
      background: rgba(255, 255, 255, 0.95);
      padding: 2rem;
      text-align: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .app-header h1 {
      margin: 0;
      font-size: 2.5rem;
      color: #333;
      font-weight: 700;
    }
    .app-header p {
      margin: 0.5rem 0 0 0;
      color: #666;
      font-size: 1.1rem;
    }
    .app-main {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 2rem;
      padding: 2rem;
      max-width: 1800px;
      margin: 0 auto;
    }
    @media (max-width: 1200px) {
      .app-main {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AppComponent {
  title = 'emissions-dashboard';
}


