import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Adresse } from 'src/app/Models/Adresse';
import { Centre } from 'src/app/Models/Centre';
import { AdresseService } from 'src/app/Services/AdresseService/adresse.service';
import { CentreService } from 'src/app/Services/CentreService/centre.service';

@Component({
  selector: 'app-update-centre',
  templateUrl: './update-centre.component.html',
  styleUrls: ['./update-centre.component.scss']
})
export class UpdateCentreComponent {

  centre: Centre = new Centre();
  adresse: Adresse = new Adresse();

  constructor(
    private router: Router,
    private centreService: CentreService,
    private adresseService: AdresseService
  ) { }

  resetForm() {
    this.adresse = new Adresse();
    this.centre = new Centre();
  }

  updateCentre(): void {    
    this.adresseService.createAdresse(this.adresse).subscribe(adresse => {
      console.log(adresse);
      this.centre.adresse = adresse;
      this.centreService.updateCentre(this.centre).subscribe(
        (centre: Centre) => {
          console.log('Centre ajouté avec succès :', centre);
          
          this.resetForm();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du centre :', error);
        }
      );
    });
    
    this.router.navigate(['centres']);
  }

}
