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

  constructor(private route: ActivatedRoute,
              private centreService: CentreService,
              private router: Router,
              private utilisateurService: UtilisateurService,
              private vaccinationService: VaccinationService,
              private patientService: PatientService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.centreId = +idParam;
        this.loadCentreDetails();
        
      }
    });
    this.utilisateur = this.utilisateurService.getUtilisateur();    
  }

  loadCentreDetails(): void {
    this.centreService.getCentreById(this.centreId).subscribe(centre => {
      this.centre = centre;
      this.adresseToString  = centre.adresse.zipCode.toString() + ' ' + centre.adresse.rue + ' ' + centre.adresse.ville;
    });
  }

  isPatient(): Boolean {
    if(this.utilisateur.getRole() == RoleUtilisateur.patient)
      return true;
    else
      return false;
  }

  isAdminOfThisCenterORSuperAdmin(): boolean {
    if (this.utilisateur.getRole() === RoleUtilisateur.superAdmin) {
      return true;
    }
    if (this.utilisateur.getRole() === RoleUtilisateur.adminCentre) {
      // Utilisation de find pour vérifier si l'utilisateur est un médecin du centre
      const isMedecinDuCentre = this.centre.medecins.find(medecin => this.utilisateur.getNom() === medecin.nom);
      // Si isMedecinDuCentre n'est pas undefined, cela signifie que l'utilisateur est un médecin du centre
      if (isMedecinDuCentre !== undefined) {
        return true;
      }
    }
    return false;
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
    // Logique pour supprimer le centre
  }

  modifierCentre(): void {

  }
 
  
  goBack(): void {
    this.router.navigate(['centres']);
  }


}
