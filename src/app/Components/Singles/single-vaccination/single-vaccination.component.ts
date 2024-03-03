import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrateurCentre } from 'src/app/Models/AdministrateurCentre';
import { Centre } from 'src/app/Models/Centre';
import { Medecin } from 'src/app/Models/Medecin';
import { Patient } from 'src/app/Models/Patient';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { Vaccination } from 'src/app/Models/Vaccination';
import { AdministrateurService } from 'src/app/Services/AdministrateurService/administrateur.service';
import { MedecinService } from 'src/app/Services/MedecinService/medecin.service';
import { PatientService } from 'src/app/Services/PatientService/patient.service';
import { UtilisateurService } from 'src/app/Services/UtilisateurService/utilisateur.service';
import { VaccinationService } from 'src/app/Services/VaccinationService/vaccination.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StatutDossierPatient } from 'src/app/Models/StatutDossierPatient';

@Component({
  selector: 'app-single-vaccination',
  templateUrl: './single-vaccination.component.html',
  styleUrls: ['./single-vaccination.component.scss']
})
export class SingleVaccinationComponent {

  vaccinationId!: number;
  vaccination: Vaccination = new Vaccination();
  utilisateur!: Utilisateur;
  afficherBoutonValider!: boolean;
  afficherBoutonSupprimer!: boolean;

  constructor(private route: ActivatedRoute,
              private medecinService: MedecinService,
              private vaccinationService: VaccinationService,
              private utilisateurService: UtilisateurService,
              private administrateurService: AdministrateurService,
              private router: Router) { }

  ngOnInit(): void {
    this.utilisateur = this.utilisateurService.getUtilisateur();
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.vaccinationId = +idParam;
        this.vaccinationService.getVaccinationById(this.vaccinationId).subscribe(vaccin => {
          this.vaccination = vaccin;
          this.isAdminOfThisCentre().subscribe(result => {
            this.afficherBoutonSupprimer = result;
            console.log('isAdminOfThisCentre result:', result);
          });
          this.isMedecinOfThisCentre().subscribe(result => {
            this.afficherBoutonValider = this.vaccination.statutDossierPatient.toString() === StatutDossierPatient[StatutDossierPatient.reservation]? result: false;
            console.log('isMedecinOfThisCentre result:', result);
          });       
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['vaccinations']);
  }

  getPatientToString() : string {
    let patient: Patient = this.vaccination.patient;
    return `${patient.prenom} ${patient.nom}`;
  }

  getMedecinToString() : string {
    let medecin: Medecin = this.vaccination.medecin;
    return `${medecin.prenom} ${medecin.nom}`;
  }

  getCentreToString() : string {
    let centre: Centre = this.vaccination.centre;
    return `${centre.nom} - ${centre.adresse.zipCode} ${centre.adresse.rue} ${centre.adresse.ville}`;
  }

  isAdminOfThisCentre(): Observable<boolean> {
    if (this.utilisateur.getRole() === RoleUtilisateur.adminCentre) {
      return this.administrateurService.getAdministrateurCentreByEmail(this.utilisateur.getEmail()).pipe(
        map(admin => admin.centre.id === this.vaccination.centre.id),
        catchError(error => {
          console.error('Erreur lors de la récupération de l\'admin: ', error);
          return of(false); // Retourne un observable de false en cas d'erreur
        })
      );
    } else {
      return of(false); // Retourne un observable de false si l'utilisateur n'est pas un adminCentre
    }
  }

  isMedecinOfThisCentre(): Observable<boolean> {
    if (this.utilisateur.getRole() === RoleUtilisateur.medecin) {
      return this.medecinService.getMedecinByEmail(this.utilisateur.getEmail()).pipe(
        map(medecin => medecin.centre.id === this.vaccination.centre.id),
        catchError(error => {
          console.error('Erreur lors de la récupération du medecin: ', error);
          return of(false); // Retourne un observable de false en cas d'erreur
        })
      );
    } else {
      return of(false); // Retourne un observable de false si l'utilisateur n'est pas un adminCentre
    }
  }
  
  validerVaccination() : void {
    this.vaccination.dateVaccination = new Date();
    this.vaccination.statutDossierPatient = StatutDossierPatient.vaccination;
    this.medecinService.getMedecinByEmail(this.utilisateur.getEmail()).subscribe(medecin => {
      this.vaccination.medecin = medecin;      
      console.log(medecin);
      this.vaccinationService.updateVaccination(this.vaccination).subscribe({
        next: () => {
          console.log('Vaccination validée avec succès');          
          this.goBack();
        },
        error: (error) => {
          console.error('Une erreur s\'est produite lors de la validation de la vaccination : ', error);
        }
      });
    });
  }

  supprimerVaccination() : void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette vaccination ?');
    if (confirmation) {
      this.vaccinationService.deleteVaccination(this.vaccination.id).subscribe({
        next: () => {
          console.log('Validation supprimée');          
          this.goBack();
        },
        error: (error) => {
          console.error('Une erreur s\'est produite lors de la suppression de la vaccination : ', error);
        }
      });
    }
  }
}
