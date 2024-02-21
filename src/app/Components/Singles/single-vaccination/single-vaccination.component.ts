import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccination } from 'src/app/Models/Vaccination';
import { VaccinationService } from 'src/app/Services/VaccinationService/vaccination.service';

@Component({
  selector: 'app-single-vaccination',
  templateUrl: './single-vaccination.component.html',
  styleUrls: ['./single-vaccination.component.scss']
})
export class SingleVaccinationComponent {

  vaccinationId!: Number;
  nom!: String;
  prenom!: String; 
  vaccination: Vaccination = new Vaccination();

  constructor(private route: ActivatedRoute,
    private vaccinationService: VaccinationService,
    private router: Router) { }


}
