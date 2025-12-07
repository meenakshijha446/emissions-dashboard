import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EmissionsData {
  id: number;
  industry: string;
  sector: string;
  emissionsMt: number;
  year: number;
  country: string;
  region: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmissionsService {
  private apiUrl = `${environment.apiUrl}/emissions`;

  constructor(private http: HttpClient) {}

  getAllEmissions(): Observable<EmissionsData[]> {
    return this.http.get<EmissionsData[]>(`${this.apiUrl}`);
  }

  getEmissionsByIndustry(industry: string): Observable<EmissionsData[]> {
    return this.http.get<EmissionsData[]>(`${this.apiUrl}/industry/${industry}`);
  }

  getEmissionsBySector(sector: string): Observable<EmissionsData[]> {
    return this.http.get<EmissionsData[]>(`${this.apiUrl}/sector/${sector}`);
  }

  getEmissionsByYear(year: number): Observable<EmissionsData[]> {
    return this.http.get<EmissionsData[]>(`${this.apiUrl}/year/${year}`);
  }

  getAllIndustries(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/industries`);
  }

  getAllSectors(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/sectors`);
  }

  getIndustrySummary(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiUrl}/summary/industry`);
  }

  getSectorSummary(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiUrl}/summary/sector`);
  }

  getYearSummary(): Observable<Record<number, number>> {
    return this.http.get<Record<number, number>>(`${this.apiUrl}/summary/year`);
  }
}


