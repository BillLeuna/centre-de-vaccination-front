import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/Models/Patient';
import { PatientService } from 'src/app/Services/PatientService/patient.service'
import { Adresse } from 'src/app/Models/Adresse';
import { UtilisateurService } from 'src/app/Services/UtilisateurService/utilisateur.service';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { AdresseService } from 'src/app/Services/AdresseService/adresse.service';
import { Utilisateur } from 'src/app/Models/Utilisateur';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss']
})
export class CreatePatientComponent implements OnInit{

  patient: Patient = new Patient();
  adresse: Adresse = new Adresse();
  utilisateur!: Utilisateur;

  constructor(private patientService: PatientService,
              private router: Router,
              private utilisateurService: UtilisateurService,
              private adresseService: AdresseService) {

  }

  ngOnInit(): void {
    this.utilisateur = this.utilisateurService.getUtilisateur();
    this.patient.email = this.isNotAdminCentre() ? this.utilisateur.getEmail() : '';
    this.patient.dateDInscription = new Date();
  }

  resetForm() {
    this.patient = new Patient();
    this.adresse = new Adresse();
  }

  savePatient(): void {
    this.adresseService.createAdresse(this.adresse).subscribe(
      adresse => {
        this.patient.adresse = adresse;
        this.patientService.addPatient(this.patient).subscribe(
        (patient: Patient) => {
          console.log('Patient ajouté avec succès :', patient);
          if (this.utilisateur.getRole() != RoleUtilisateur.adminCentre) {
            this.utilisateurService.getUtilisateur().setNom(patient.prenom);
            this.utilisateurService.getUtilisateur().setRole(RoleUtilisateur.patient);
            this.utilisateurService.getUtilisateur().setEmail(patient.email);
          }
          this.resetForm();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du patient :', error);
        }
      );
      this.router.navigate(['centres']);
    });
  }

  isNotAdminCentre() : boolean {
    return this.utilisateur.getRole() === RoleUtilisateur.adminCentre? false : true;
  }
}
