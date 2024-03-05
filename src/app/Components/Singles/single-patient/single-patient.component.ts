import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/Models/Patient';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { Vaccination } from 'src/app/Models/Vaccination';
import { PatientService } from 'src/app/Services/PatientService/patient.service';

@Component({
  selector: 'app-single-patient',
  templateUrl: './single-patient.component.html',
  styleUrls: ['./single-patient.component.scss']
})
export class SinglePatientComponent implements OnInit{

  vaccinationId!: number;
  vaccination!: Vaccination;
  patientId!: number;
  patient: Patient = new Patient();
  afficherBoutonSupprimer!: boolean;
  utilisateur!: Utilisateur;

  constructor(private route: ActivatedRoute,
              private patientService: PatientService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.patientId = +idParam;
        this.patientService.getPatientById(this.patientId).subscribe(patient => {
          this.patient = patient;
          this.afficherBoutonSupprimer = this.utilisateur.getRole() == RoleUtilisateur.superAdmin ? true : false;
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['patients']);
  }
  
  supprimerPatient(): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce patient ?');
    if (confirmation) {
      this.patientService.deletePatient(this.patient.id).subscribe({
        next: () => {
          console.log('Patient supprimé');          
          this.goBack();
        },
        error: (error) => {
          console.error('Une erreur s\'est produite lors de la suppression du patient : ', error);
        }
      });
    }
  }
}
