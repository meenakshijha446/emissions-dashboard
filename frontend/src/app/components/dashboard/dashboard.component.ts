import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { EmissionsService } from '../../services/emissions.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h2>📊 Emissions Analytics</h2>
        <div class="filter-controls">
          <select [(ngModel)]="selectedYear" (change)="loadData()">
            <option value="all">All Years</option>
            <option *ngFor="let year of years" [value]="year">{{ year }}</option>
          </select>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">🏭</div>
          <div class="stat-content">
            <h3>{{ totalEmissions | number:'1.2-2' }}</h3>
            <p>Total Emissions (Mt CO₂)</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <h3>{{ industries.length }}</h3>
            <p>Industries Tracked</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🌐</div>
          <div class="stat-content">
            <h3>{{ sectors.length }}</h3>
            <p>Sectors Monitored</p>
          </div>
        </div>
      </div>

      <div class="charts-grid">
        <div class="chart-card">
          <h3>Emissions by Industry</h3>
          <canvas baseChart
            [data]="industryChartData"
            [type]="industryChartType"
            [options]="chartOptions">
          </canvas>
        </div>

        <div class="chart-card">
          <h3>Emissions by Sector</h3>
          <canvas baseChart
            [data]="sectorChartData"
            [type]="sectorChartType"
            [options]="chartOptions">
          </canvas>
        </div>

        <div class="chart-card full-width">
          <h3>Emissions Trend Over Years</h3>
          <canvas baseChart
            [data]="yearChartData"
            [type]="yearChartType"
            [options]="lineChartOptions">
          </canvas>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .dashboard-header h2 {
      margin: 0;
      font-size: 1.8rem;
      color: #333;
    }
    .filter-controls select {
      padding: 0.5rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    .stat-icon {
      font-size: 2.5rem;
    }
    .stat-content h3 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
    }
    .stat-content p {
      margin: 0.25rem 0 0 0;
      opacity: 0.9;
      font-size: 0.9rem;
    }
    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }
    .chart-card {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    .chart-card.full-width {
      grid-column: 1 / -1;
    }
    .chart-card h3 {
      margin: 0 0 1rem 0;
      color: #333;
      font-size: 1.2rem;
    }
    @media (max-width: 768px) {
      .charts-grid {
        grid-template-columns: 1fr;
      }
      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  selectedYear: string = 'all';
  years: number[] = [];
  industries: string[] = [];
  sectors: string[] = [];
  totalEmissions: number = 0;

  industryChartType: ChartType = 'doughnut';
  sectorChartType: ChartType = 'bar';
  yearChartType: ChartType = 'line';

  industryChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#667eea', '#764ba2', '#f093fb', '#4facfe',
        '#00f2fe', '#43e97b', '#fa709a', '#fee140'
      ]
    }]
  };

  sectorChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      label: 'Emissions (Mt CO₂)',
      data: [],
      backgroundColor: '#667eea'
    }]
  };

  yearChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{
      label: 'Total Emissions (Mt CO₂)',
      data: [],
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(private emissionsService: EmissionsService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.emissionsService.getIndustrySummary().subscribe(data => {
      this.industries = Object.keys(data);
      this.industryChartData = {
        labels: Object.keys(data),
        datasets: [{
          data: Object.values(data),
          backgroundColor: [
            '#667eea', '#764ba2', '#f093fb', '#4facfe',
            '#00f2fe', '#43e97b', '#fa709a', '#fee140'
          ]
        }]
      };
      this.totalEmissions = Object.values(data).reduce((a, b) => a + b, 0);
    });

    this.emissionsService.getSectorSummary().subscribe(data => {
      this.sectors = Object.keys(data);
      this.sectorChartData = {
        labels: Object.keys(data),
        datasets: [{
          label: 'Emissions (Mt CO₂)',
          data: Object.values(data),
          backgroundColor: '#667eea'
        }]
      };
    });

    this.emissionsService.getYearSummary().subscribe(data => {
      const sortedYears = Object.keys(data).map(Number).sort();
      this.years = sortedYears;
      this.yearChartData = {
        labels: sortedYears.map(String),
        datasets: [{
          label: 'Total Emissions (Mt CO₂)',
          data: sortedYears.map(year => data[year]),
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          tension: 0.4,
          fill: true
        }]
      };
    });
  }
}

