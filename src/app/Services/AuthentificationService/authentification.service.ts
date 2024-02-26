import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Authentification } from 'src/app/Models/Authentification';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private baseUrl = 'http://localhost:8083/authentifications';

  authentifie: boolean = false;

  constructor(private http: HttpClient) { }

  getAuthetifie(): boolean {
    return this.authentifie; 
  }

  setAuthentifie(value: boolean): void {
    this.authentifie = value;
  }

  getAuthentificationById(id: number): Observable<Authentification> {
    return this.http.get<Authentification>(`${this.baseUrl}/get/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createAuthentification(authentification: Authentification): Observable<Authentification> {
    return this.http.post<Authentification>(`${this.baseUrl}/create`, authentification);
  }

  updateAuthentification(authentification: Authentification): Observable<Authentification> {
    return this.http.put<Authentification>(`${this.baseUrl}/update`, authentification)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteAuthentification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  authenticateUser(authentification: Authentification): Observable<Authentification> {
    return this.http.post<Authentification>(`${this.baseUrl}/login`, authentification)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}
