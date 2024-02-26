import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medecin } from 'src/app/Models/Medecin';
import { Patient } from 'src/app/Models/Patient';
import { StatutDossierPatient } from 'src/app/Models/StatutDossierPatient';
import { Vaccination } from 'src/app/Models/Vaccination';
import { MedecinService } from 'src/app/Services/MedecinService/medecin.service';
import { PatientService } from 'src/app/Services/PatientService/patient.service';
import { UtilisateurService } from 'src/app/Services/UtilisateurService/utilisateur.service';
import { VaccinationService } from 'src/app/Services/VaccinationService/vaccination.service';

@Component({
  selector: 'app-single-patient',
  templateUrl: './single-patient.component.html',
  styleUrls: ['./single-patient.component.scss']
})
export class SinglePatientComponent implements OnInit{

  vaccinationId!: number;
  vaccination!: Vaccination;
  medecin!: Medecin;
  patientId!: number;
  patient: Patient = new Patient();

  constructor(private route: ActivatedRoute,
              private patientService: PatientService,
              private vaccinationService: VaccinationService,
              private utilisateurService: UtilisateurService,
              private medecinService: MedecinService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.patientId = +idParam;
        this.loadPatientDetails();
      }
    });
  }

  loadPatientDetails(): void {
    this.patientService.getPatientById(this.patientId).subscribe(patient => {
      this.patient = patient;
    });
  }

  loadMedecinDetails(): Medecin {
    // email: string = this.utilisateurService.getUtilisateur().getEmail();
    this.medecinService.getMedecinByEmail(this.utilisateurService.getUtilisateur().getEmail()).subscribe(medecin => {
      this.medecin = medecin;
    });
    return this.medecin;
  }

  validerVaccination(): void {    
    this.vaccination.statutDossierPatient = StatutDossierPatient.vaccination;
    this.vaccination.medecin = this.loadMedecinDetails();
    this.router.navigate(['tableau-de-bord']);
  }

  supprimerPatient(): void {
    // Logique pour supprimer le patient
  }

  goBack(): void {
    this.router.navigate(['patients']);
  }
}
