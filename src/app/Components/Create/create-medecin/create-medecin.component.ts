import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Centre } from 'src/app/Models/Centre';
import { Medecin } from 'src/app/Models/Medecin';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { CentreService } from 'src/app/Services/CentreService/centre.service';
import { MedecinService } from 'src/app/Services/MedecinService/medecin.service';
import { UtilisateurService } from 'src/app/Services/UtilisateurService/utilisateur.service';

@Component({
  selector: 'app-create-medecin',
  templateUrl: './create-medecin.component.html',
  styleUrls: ['./create-medecin.component.scss']
})
export class CreateMedecinComponent implements OnInit {

  medecin: Medecin = new Medecin();
  centres: Centre[] = [];

  constructor(private router: Router,
              private medecinService: MedecinService,
              private centreService: CentreService,
              private utilisateurService: UtilisateurService){              
  }

  ngOnInit(): void {
    this.getCentres();
  }

  getCentres(): void {
    this.centreService.getCentres()
      .subscribe(centres => {
        this.centres = centres;
      });
  }

    // Fonction pour réinitialiser les champs du formulaire après l'ajout du patient
  resetForm() {
    this.medecin = new Medecin();
  }


  saveMedecin(): void {
    this.medecinService.addMedecin(this.medecin).subscribe(
      (medecin: Medecin) => {
        console.log('Medecin ajouté avec succès :', medecin);
        this.resetForm();
        this.utilisateurService.getUtilisateur().setNom(medecin.prenom);
        this.utilisateurService.getUtilisateur().setRole(RoleUtilisateur.medecin);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du medecin :', error);
      }
    );

    this.router.navigate(['tableau-de-bord']);
  }

}
