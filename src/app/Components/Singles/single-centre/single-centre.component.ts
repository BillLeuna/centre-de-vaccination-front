import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Centre } from 'src/app/Models/Centre';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { StatutDossierPatient } from 'src/app/Models/StatutDossierPatient';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { Vaccination } from 'src/app/Models/Vaccination';
import { CentreService } from 'src/app/Services/CentreService/centre.service';
import { PatientService } from 'src/app/Services/PatientService/patient.service';
import { UtilisateurService } from 'src/app/Services/UtilisateurService/utilisateur.service';
import { VaccinationService } from 'src/app/Services/VaccinationService/vaccination.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AdministrateurService } from 'src/app/Services/AdministrateurService/administrateur.service';

@Component({
  selector: 'app-single-centre',
  templateUrl: './single-centre.component.html',
  styleUrls: ['./single-centre.component.scss']
})
export class SingleCentreComponent implements OnInit{

  centreId!: number;
  centre: Centre = new Centre();
  utilisateur!: Utilisateur;
  vaccination: Vaccination = new Vaccination();
  adresseToString!: string;
  afficherOptionReserver!: boolean;
  afficherModifierEtSupprimer!: boolean;

  constructor(private route: ActivatedRoute,
              private centreService: CentreService,
              private router: Router,
              private utilisateurService: UtilisateurService,
              private vaccinationService: VaccinationService,
              private adminService: AdministrateurService,
              private patientService: PatientService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.centreId = +idParam;
        this.centreService.getCentreById(this.centreId).subscribe(centre => {
          this.centre = centre;
          this.adresseToString  = centre.adresse.zipCode.toString() + ' ' + centre.adresse.rue + ' ' + centre.adresse.ville;
          this.isPatientAndHasNoReservation().subscribe(result => {
            this.afficherOptionReserver = result;
            console.log('isPatientAndHasNoReservation', result);
          });
          this.isAdminOfThisCenterORSuperAdmin().subscribe(result => {
            this.afficherModifierEtSupprimer = result;
            console.log('isAdminOfThisCenterORSuperAdmin', result);
          });
        });
      }
    });
    this.utilisateur = this.utilisateurService.getUtilisateur();    
  }

  isPatientAndHasNoReservation(): Observable<boolean> {
    if (this.utilisateur.getRole() === RoleUtilisateur.patient) {
      return this.patientService.getPatientByEmail(this.utilisateur.getEmail()).pipe(
        switchMap(patient => {
          return this.vaccinationService.getAllVaccinations().pipe(
            map(vaccinations => {
              // Vérifier si le patient se trouve dans la liste des patients de l'une des vaccinations
              const patientFoundInVaccinations = vaccinations.some(vaccination => {
                return vaccination.patient.id === patient.id;
              });
      
              // Si le patient n'est pas trouvé dans les vaccinations, retourner true
              return !patientFoundInVaccinations;
            })
          );
        })
      );
    } else {
      return of(false); // Retourne un observable de false si le rôle n'est pas patient
    }
  }

  isAdminOfThisCenterORSuperAdmin(): Observable<boolean> {
    if (this.utilisateur.getRole() === RoleUtilisateur.superAdmin) {
      return of(true);
    }
    if (this.utilisateur.getRole() === RoleUtilisateur.adminCentre) {
      return this.adminService.getAdministrateurCentreByEmail(this.utilisateur.getEmail()).pipe(
        map(administrateurCentre => {
          return administrateurCentre.centre.id === this.centre.id;
        })
      );
    }
    return of(false);
  }

  reserverVaccination() : void {
    console.log(this.centre);
    console.log(this.centre.adresse);
    
    this.vaccination.centre = this.centre;
    this.vaccination.statutDossierPatient = StatutDossierPatient.reservation;
    this.patientService.getPatientByEmail(this.utilisateur.getEmail())
      .subscribe(patient => {
        this.vaccination.patient = patient;
        this.vaccination.dateReservation = new Date();

        this.vaccinationService.createVaccination(this.vaccination)
          .subscribe(vaccination => {
            console.log(vaccination);
        });
    });
    this.router.navigate(['tableau-de-bord']);
  }

  supprimerCentre(): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce centre ?');
    if (confirmation) {
      this.centreService.deleteCentre(this.centre.id).subscribe({
        next: () => {
          console.log('Le centre a été supprimé avec succès.');
          this.goBack();
        },
        error: (error) => {
          console.error('Une erreur s\'est produite lors de la suppression du centre : ', error);
        }
      });
    }
  }

  modifierCentre(): void {
    this.router.navigate(['update-centre'], this.centreId)
  }
 
  
  goBack(): void {
    this.router.navigate(['centres']);
  }


}
