import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdministrateurCentre } from 'src/app/Models/AdministrateurCentre';
import { SuperAdmin } from 'src/app/Models/SuperAdmin';

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {

  private apiUrl = 'http://localhost:8083';
  private administrateurCentre = '/administrateursCentres';
  private superAdminUrl = '/superAdmins';

  constructor(private http: HttpClient) { }

  // Administrateurs de centre
  getAdministrateursCentres(): Observable<AdministrateurCentre[]> {
    return this.http.get<AdministrateurCentre[]>(`${this.apiUrl}${this.administrateurCentre}/get`);
  }
  
  getAdministrateurCentreById(administrateurCentreId: number): Observable<AdministrateurCentre> {
    return this.http.get<AdministrateurCentre>(`${this.apiUrl}${this.administrateurCentre}/get/${administrateurCentreId}`);
  }
  
  getAdministrateurCentreByEmail(email: string): Observable<AdministrateurCentre> {
    return this.http.get<AdministrateurCentre>(`${this.apiUrl}${this.administrateurCentre}/getByEmail/${email}`);
  }

  addAdminCentre(admin: AdministrateurCentre): Observable<AdministrateurCentre> {
    return this.http.post<AdministrateurCentre>(`${this.apiUrl}${this.administrateurCentre}/create`, admin);
  }

  deleteAdminCentre(adminId: number): Observable<void> {
    const url = `${this.apiUrl}${this.administrateurCentre}/delete/${adminId}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError((error) => {
          console.error('Une erreur s\'est produite lors de la suppression de l\'administrateur de centre:', error);
          throw error;
        })
      );
  }

  // Super Admins
  getSuperAdmins(): Observable<SuperAdmin[]> {
    return this.http.get<SuperAdmin[]>(`${this.apiUrl}${this.superAdminUrl}/get`);
  }
  
  getSuperAdminById(superAdminId: number): Observable<SuperAdmin> {
    return this.http.get<SuperAdmin>(`${this.apiUrl}${this.superAdminUrl}/get/${superAdminId}`);
  }
  
  getSuperAdminByEmail(email: string): Observable<SuperAdmin> {
    return this.http.get<SuperAdmin>(`${this.apiUrl}${this.superAdminUrl}/getByEmail/${email}`);
  }
  
  addSuperAdmin(superAdmin: SuperAdmin): Observable<SuperAdmin> {
    return this.http.post<SuperAdmin>(`${this.apiUrl}${this.superAdminUrl}/create`, superAdmin);
  }

  deleteSuperAdmin(adminId: number): Observable<void> {
    const url = `${this.apiUrl}${this.superAdminUrl}/delete/${adminId}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError((error) => {
          console.error('Une erreur s\'est produite lors de la suppression du super administrateur:', error);
          throw error;
        })
      );
  }
}