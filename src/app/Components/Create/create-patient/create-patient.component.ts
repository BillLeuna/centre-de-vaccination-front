import { Component, OnInit } from '@angular/core';
import { Medecin } from 'src/app/Models/Medecin';
import { Patient } from 'src/app/Models/Patient';
import { MedecinService } from 'src/app/Services/MedecinService/medecin.service';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss']
})
export class CreatePatientComponent implements OnInit{

  email: string = "";
  prenom: String = "";
  nom: String = "";
  tel: String = "";
  centre: String = "";
  creer_un_compte: string = 'Créer un compte';

  patient: Patient = new Patient();
  medecins: Medecin[] = [];

  constructor(
    private medecinService: MedecinService
  ) { }

  ngOnInit(): void {
    this.medecinService.getMedecins().subscribe((medecins) => {
      this.medecins = medecins;
    });
  }

  savePatient(): void {
    // Assurez-vous que votre backend est configuré pour gérer la création simultanée du patient et de son adresse.
    // Vous pouvez également appeler le service PatientService pour sauvegarder le patient.
  }
}
