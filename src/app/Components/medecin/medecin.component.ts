import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medecin } from 'src/app/Models/Medecin';
import { MedecinService } from 'src/app/Services/MedecinService/medecin.service';

@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.scss'],

  providers: [MedecinService]
})

export class MedecinComponent implements OnInit{

  medecins!: Medecin[];
  filteredMedecins: Medecin[] = [];
  searchTerm: string = '';

  constructor(private medecinService: MedecinService,
              private router: Router) { }

  ngOnInit(): void {
    this.getMedecins();
  }

  getMedecins(): void {
    this.medecinService.getMedecins()
      .subscribe(medecins => {
        this.medecins = medecins;
        this.filteredMedecins = medecins;
      });

  }

  filterMedecins(): void {
    if (!this.searchTerm) {
      this.filteredMedecins = this.medecins; // Si la barre de recherche est vide, afficher tous les medecins
      return;
    }

    // Filtrer les medecins en fonction du terme de recherche
    this.filteredMedecins = this.medecins.filter(medecin =>
      (medecin.nom && medecin.nom.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      (medecin.prenom && medecin.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  DisplayAllMedecins(): void {
    this.searchTerm = '';
    this.filteredMedecins = this.medecins;
  }

  goToSingleMedecin(medecinId: number): void {
    this.router.navigate(['medecins', medecinId]);
  }

  
}
