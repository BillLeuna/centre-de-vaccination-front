import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medecin } from 'src/app/Models/Medecin';
import { Patient } from 'src/app/Models/Patient';
import { Vaccination } from 'src/app/Models/Vaccination';
import { VaccinationService } from 'src/app/Services/VaccinationService/vaccination.service';

@Component({
  selector: 'app-single-vaccination',
  templateUrl: './single-vaccination.component.html',
  styleUrls: ['./single-vaccination.component.scss']
})
export class SingleVaccinationComponent {

  vaccinationId!: number;
  patient!: Patient;
  medecin!: Medecin;
  vaccination: Vaccination = new Vaccination();

  constructor(private route: ActivatedRoute,
    private vaccinationService: VaccinationService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.vaccinationId = +idParam;
        this.loadVaccinationDetails();
      }
    });
  }

  loadVaccinationDetails(): void {
    this.vaccinationService.getVaccinationById(this.vaccinationId).subscribe(vaccin => {
      this.vaccination = vaccin;
      this.patient = this.vaccination.patient;
      this.medecin = this.vaccination.medecin;
    });
  }

}
