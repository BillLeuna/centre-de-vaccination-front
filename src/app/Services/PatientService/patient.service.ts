import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/Models/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'http://localhost:8083/patients';

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl + '/get');
  }

  getPatientById(patientId: number): Observable<Patient> {
    return this.http.get<Patient>(this.apiUrl + '/get/' + patientId);
  }

  getPatientByEmail(email: string): Observable<Patient> {
    return this.http.get<Patient>(this.apiUrl + '/getByEmail/' + email);
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl + '/create', patient);
  }
}
