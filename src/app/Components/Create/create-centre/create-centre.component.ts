import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Adresse } from 'src/app/Models/Adresse';
import { Centre } from 'src/app/Models/Centre';
import { CentreService } from 'src/app/Services/CentreService/centre.service';

@Component({
  selector: 'app-create-centre',
  templateUrl: './create-centre.component.html',
  styleUrls: ['./create-centre.component.scss']
})
export class CreateCentreComponent {

  centre: Centre = new Centre();
  adresse: Adresse = new Adresse();

  constructor(
    private router: Router,
    private centreService: CentreService,
  ) { }

  resetForm() {
    this.adresse = new Adresse();
    this.centre = new Centre();
  }

  saveCentre(): void {
    this.centre.adresse = this.adresse;
    this.centreService.addCentre(this.centre).subscribe(
      (centre: Centre) => {
        console.log('Centre ajouté avec succès :', centre);
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du centre :', error);
      }
    );
    this.router.navigate(['centres']);
  }

}