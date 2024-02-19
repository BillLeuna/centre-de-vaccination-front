import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medecin } from 'src/app/Models/Medecin';
import { Vaccination } from 'src/app/Models/Vaccination';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {

  private apiUrl = 'http://localhost:8083/vaccinations';

  constructor(private http: HttpClient) { }

  getAllVaccinations(): Observable<Vaccination[]> {
    return this.http.get<Vaccination[]>(`${this.apiUrl}/get`);
  }

  getVaccinationById(vaccinationId: number): Observable<Vaccination> {
    return this.http.get<Vaccination>(`${this.apiUrl}/get/${vaccinationId}`);
  }

  createVaccination(vaccination: Vaccination): Observable<Vaccination> {
    return this.http.post<Vaccination>(`${this.apiUrl}/create`, vaccination);
  }

  updateVaccination(vaccination: Vaccination): Observable<Vaccination> {
    return this.http.put<Vaccination>(`${this.apiUrl}/update`, vaccination);
  }

  deleteVaccination(vaccinationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${vaccinationId}`);
  }

  vaccinate(vaccination: Vaccination, medecin: Medecin): Observable<Vaccination> {
    return this.http.put<Vaccination>(`${this.apiUrl}/vaccinate`, { vaccination, medecin });
  }
}
