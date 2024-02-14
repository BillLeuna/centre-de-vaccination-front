import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/Models/Patient';
import { PatientService } from 'src/app/Services/PatientService/patient.service';

@Component({
  selector: 'app-single-patient',
  templateUrl: './single-patient.component.html',
  styleUrls: ['./single-patient.component.scss']
})
export class SinglePatientComponent implements OnInit{

  patientId!: number;
  patient: Patient = new Patient();

  constructor(private route: ActivatedRoute,
              private patientService: PatientService,
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

  validerVaccination(): void {
    // Logique pour valider la vaccination
  }

  supprimerPatient(): void {
    // Logique pour supprimer le patient
  }

  goBack(): void {
    this.router.navigate(['patients']);
  }
}
