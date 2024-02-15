import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/Models/Patient';
import { PatientService } from 'src/app/Services/PatientService/patient.service'
import { Adresse } from 'src/app/Models/Adresse';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss']
})
export class CreatePatientComponent implements OnInit{

  patient: Patient = new Patient();
  adresse: Adresse = new Adresse();

  constructor(private patientService: PatientService,
              private router: Router,) {

  }

  ngOnInit(): void {
  }

    // Fonction pour réinitialiser les champs du formulaire après l'ajout du patient
  resetForm() {
    this.patient = new Patient();
  }


  savePatient(): void {
    this.patient.adresse = this.adresse;
    // Appeler la méthode addPatient du service PatientService pour ajouter le patient
    this.patientService.addPatient(this.patient).subscribe(
      (patient: Patient) => {
        console.log('Patient ajouté avec succès :', patient);
        // Réinitialiser les champs du formulaire après l'ajout du patient
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du patient :', error);
        // Gérer l'erreur, par exemple afficher un message à l'utilisateur
      }
    );
    this.router.navigate(['centres']);
  }
}
