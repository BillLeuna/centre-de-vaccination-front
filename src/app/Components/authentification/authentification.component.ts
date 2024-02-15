import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { AdministrateurService } from 'src/app/Services/AdministrateurService/administrateur.service';
import { AuthentificationService } from 'src/app/Services/AuthentificationService/authentification.service';
import { MedecinService } from 'src/app/Services/MedecinService/medecin.service';
import { PatientService } from 'src/app/Services/PatientService/patient.service';
import { UtilisateurService } from 'src/app/Services/UtilisateurService/utilisateur.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  email: string = "";
  motDePasse: String = "";
  creer_un_compte: string = 'Créer un compte';
  se_connecter: string = 'Se connecter';
  submitButtonText: string = this.se_connecter;
  selectedStatut: string = 'patient';
  selectedAdminType: string = 'adminCentre'; // Valeur par défaut pour l'administrateur
  statuts: string[] = ['patient', 'medecin', 'admin'];
  typesAdmin: string[] = ['adminCentre', 'superAdmin'];

  constructor(private router: Router, 
              private authentificationService: AuthentificationService,
              private utilisateurService: UtilisateurService,
              private patientService: PatientService,
              private medecinService: MedecinService,
              private administrateurService: AdministrateurService) {
                
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.authentificationService.setAuthentifie(true);

    
    if (this.submitButtonText === this.se_connecter) {

      this.updateUtilisateur();
      this.router.navigate(['centres']);
    } else {
      if (this.selectedStatut == 'patient'){
        this.router.navigate(['create-patient']);
      }else if (this.selectedStatut == 'medecin'){
        this.router.navigate(['create-medecin']);
      }
    }
  }

  resetForm() {
    this.motDePasse = ''; 
    this.selectedStatut = 'patient'; // Réinitialiser le statut à patient
    this.selectedAdminType = 'adminCentre'; // Réinitialiser le type d'administrateur
    if (this.submitButtonText === this.se_connecter) {
      this.submitButtonText = this.creer_un_compte;
    } else {
      this.submitButtonText = this.se_connecter;
    }
  }

  updateUtilisateur() {
    if(this.selectedStatut === 'patient') {
      this.patientService.getPatientByEmail(this.email)
        .subscribe(patient => {
          this.utilisateurService.getUtilisateur().setNom(patient.nom);
          this.utilisateurService.getUtilisateur().setRole(RoleUtilisateur.patient);
        });
    }

    if (this.selectedStatut === 'medecin') {
      this.medecinService.getMedecinByEmail(this.email)
        .subscribe(medecin => {
          this.utilisateurService.getUtilisateur().setNom(medecin.nom);
          this.utilisateurService.getUtilisateur().setRole(RoleUtilisateur.medecin);
        });
    }

    if (this.selectedStatut === 'admin' && this.selectedAdminType === 'adminCentre') {
      this.administrateurService.getAdministrateurCentreByEmail(this.email)
        .subscribe(adminCentre => {
          this.utilisateurService.getUtilisateur().setNom(adminCentre.nom);
          this.utilisateurService.getUtilisateur().setRole(RoleUtilisateur.adminCentre);
        });
    }
    
    if (this.selectedStatut === 'admin' && this.selectedAdminType === 'superAdmin') {
      this.administrateurService.getSuperAdminByEmail(this.email)
        .subscribe(superAdmin => {
          this.utilisateurService.getUtilisateur().setNom(superAdmin.nom);
          this.utilisateurService.getUtilisateur().setRole(RoleUtilisateur.superAdmin);
        });
    }
    
  }
}

