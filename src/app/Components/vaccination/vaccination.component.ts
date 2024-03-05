import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Centre } from 'src/app/Models/Centre';
import { Medecin } from 'src/app/Models/Medecin';
import { Patient } from 'src/app/Models/Patient';
import { Vaccination } from 'src/app/Models/Vaccination';
import { VaccinationService } from 'src/app/Services/VaccinationService/vaccination.service';

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.scss']
})
export class VaccinationComponent implements OnInit {

  vaccinations!: Vaccination[];
  searchTerm: string = '';

  constructor(private vaccinationService: VaccinationService,
              private router: Router) { }

  ngOnInit(): void {
      this.getVaccinations();
  }

  getVaccinations(): void {
    this.vaccinationService.getAllVaccinations()
      .subscribe(vaccinations => {
        this.vaccinations = vaccinations;
      });

  }

  DisplayAllVaccinations(): void {
    this.searchTerm = '';
  }

  goToSingleVaccination(vaccinationId: number): void {
    this.router.navigate(['vaccinations', vaccinationId]);
  }

  getPatientToString(vaccination: Vaccination) : string {
    let patient: Patient = vaccination.patient;
    return `${patient.prenom} ${patient.nom}`;
  }

  getMedecinToString(vaccination: Vaccination) : string {
    let medecin: Medecin = vaccination.medecin;
    return `${medecin.prenom} ${medecin.nom}`;
  }

  getCentreToString(vaccination: Vaccination) : string {
    let centre: Centre = vaccination.centre;
    return `${centre.nom} - ${centre.adresse.zipCode} ${centre.adresse.rue} ${centre.adresse.ville}`;
  }
  
}
