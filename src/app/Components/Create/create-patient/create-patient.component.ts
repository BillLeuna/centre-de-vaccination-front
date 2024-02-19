import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/Models/Patient';
import { PatientService } from 'src/app/Services/PatientService/patient.service'
import { Adresse } from 'src/app/Models/Adresse';
import { UtilisateurService } from 'src/app/Services/UtilisateurService/utilisateur.service';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss']
})
export class CreatePatientComponent implements OnInit{

  patient: Patient = new Patient();
  adresse: Adresse = new Adresse();

  constructor(private patientService: PatientService,
              private router: Router,
              private utilisateurService: UtilisateurService) {

  }

  ngOnInit(): void {
  }

  resetForm() {
    this.patient = new Patient();
    this.adresse = new Adresse();
  }

  savePatient(): void {
    this.patient.adresse = this.adresse;
    this.patientService.addPatient(this.patient).subscribe(
      (patient: Patient) => {
        console.log('Patient ajouté avec succès :', patient);
        this.resetForm();
        this.utilisateurService.getUtilisateur().setNom(patient.prenom);
        this.utilisateurService.getUtilisateur().setRole(RoleUtilisateur.patient);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du patient :', error);
      }
    );
    this.router.navigate(['centres']);
  }
}
