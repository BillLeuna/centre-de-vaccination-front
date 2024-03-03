import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Centre } from 'src/app/Models/Centre';
import { Medecin } from 'src/app/Models/Medecin';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { AdministrateurService } from 'src/app/Services/AdministrateurService/administrateur.service';
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
  utilisateur!: Utilisateur;

  constructor(private router: Router,
              private medecinService: MedecinService,
              private centreService: CentreService,
              private adminCentreService: AdministrateurService,
              private utilisateurService: UtilisateurService){              
  }

  ngOnInit(): void {
    this.utilisateur = this.utilisateurService.getUtilisateur();
    this.getCentres();
  }

  getCentres(): void {
    if (this.utilisateur.getRole() == RoleUtilisateur.adminCentre) {
      this.adminCentreService.getAdministrateurCentreByEmail(this.utilisateur.getEmail())
        .subscribe( adminCentre => {
          this.centres = [];
          this.centres.push(adminCentre.centre);
      });
    } else {
      this.centreService.getCentres()
        .subscribe(centres => {
          this.centres = centres;
      });
    }
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
        if (this.utilisateur.getRole() != RoleUtilisateur.adminCentre) {
          this.utilisateurService.getUtilisateur().setNom(medecin.prenom);
          this.utilisateurService.getUtilisateur().setRole(RoleUtilisateur.medecin);
          this.utilisateurService.getUtilisateur().setEmail(medecin.email);
        }
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du medecin :', error);
      }
    );

    this.router.navigate(['tableau-de-bord']);
  }

  centretoString(centre: Centre): string {
    return centre.adresse.zipCode.toString() + ' ' + centre.adresse.rue + ' ' + centre.adresse.ville;
  }

}
