import { Component, OnInit } from '@angular/core';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { Vaccination } from 'src/app/Models/Vaccination';
import { MedecinService } from 'src/app/Services/MedecinService/medecin.service';
import { UtilisateurService } from 'src/app/Services/UtilisateurService/utilisateur.service';
import { VaccinationService } from 'src/app/Services/VaccinationService/vaccination.service';

@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.scss']
})
export class TableauDeBordComponent implements OnInit{

  utilisateur!: Utilisateur;
  mesVaccinations!: Vaccination[];
  maVaccination!: Vaccination;

  constructor(private utilisateurService: UtilisateurService,
              private vaccinnationService: VaccinationService) { 
    
  }

  ngOnInit(): void {
    this.utilisateur = this.utilisateurService.getUtilisateur();
  }

  isMedecin() : Boolean {
    return this.utilisateur.getRole() == RoleUtilisateur.medecin;
  }
  isPatient() : Boolean {
    return this.utilisateur.getRole() == RoleUtilisateur.patient;
  }
  isAdminCentre() : Boolean {
    return this.utilisateur.getRole() == RoleUtilisateur.adminCentre;
  }
  isSuperAdmin() : Boolean {
    return this.utilisateur.getRole() == RoleUtilisateur.superAdmin;
  }

  getMesVaccinnations(): void {
    const medecinEmail = this.utilisateur.getEmail(  );
    this.vaccinnationService.getAllVaccinationsByMedecinEmail(medecinEmail)
      .subscribe((vaccinations: Vaccination[]) => {
        this.mesVaccinations = vaccinations;
      });
  }

  getMaVaccinnation(): void {
    const patientEmail = this.utilisateur.getEmail();
    this.vaccinnationService.getVaccinationByPatientEmail(patientEmail)
      .subscribe((vaccination: Vaccination) => {
        this.maVaccination = vaccination;
      });
  }
}
