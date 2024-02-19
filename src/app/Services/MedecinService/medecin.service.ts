import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medecin } from 'src/app/Models/Medecin';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  private apiUrl = 'http://localhost:8083/medecins';

  constructor(private http: HttpClient) { }

  getMedecins(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(`${this.apiUrl}/get`);
  }

  getMedecinById(medecinId: number): Observable<Medecin> {
    return this.http.get<Medecin>(`${this.apiUrl}/get/${medecinId}`);
  }

  getMedecinByEmail(email: string): Observable<Medecin> {
    return this.http.get<Medecin>(`${this.apiUrl}/getByEmail/${email}`);
  }

  addMedecin(medecin: Medecin): Observable<Medecin> {
    return this.http.post<Medecin>(`${this.apiUrl}/create`, medecin);
  }

  updateMedecin(medecin: Medecin): Observable<Medecin> {
    return this.http.put<Medecin>(`${this.apiUrl}/update`, medecin);
  }

  deleteMedecin(medecinId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${medecinId}`);
  }
}
