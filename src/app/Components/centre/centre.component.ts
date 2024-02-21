import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Centre } from 'src/app/Models/Centre';
import { CentreService } from 'src/app/Services/CentreService/centre.service';

@Component({
  selector: 'app-centre',
  templateUrl: './centre.component.html',
  styleUrls: ['./centre.component.scss'],

  providers: [CentreService]
})

export class CentreComponent implements OnInit{

  centres!: Centre[];
  filteredCentres: Centre[] = [];
  searchTerm: string = '';

  constructor(private centreService: CentreService,
              private router: Router) { }

  ngOnInit(): void {
    this.getCentres();
  }

  getCentres(): void {
    this.centreService.getCentres()
      .subscribe(centres => {
        this.centres = centres;
        this.filteredCentres = centres;
      });

  }

  filterCentres(): void {
    if (!this.searchTerm) {
      this.filteredCentres = this.centres;
      return;
    }

    this.filteredCentres = this.centres.filter(
      (centre) =>
        (centre.nom &&
          centre.nom.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (centre.adresse &&
          centre.adresse.ville
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()))
    );
  }

  DisplayAllCentres(): void {
    this.searchTerm = '';
    this.filteredCentres = this.centres;
  }

  goToSingleCentre(centreId: number): void {
    this.router.navigate(['centres', centreId]);
  }

  getAdresseToString(centre: Centre) : string {
    return centre.adresse.zipCode + ' ' + centre.adresse.rue + ' ' + centre.adresse.ville;
  }
}
