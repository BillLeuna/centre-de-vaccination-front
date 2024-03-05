import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministrateurCentre } from 'src/app/Models/AdministrateurCentre';
import { Centre } from 'src/app/Models/Centre';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { StatutAdmin } from 'src/app/Models/StatutAdmin';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { AdministrateurService } from 'src/app/Services/AdministrateurService/administrateur.service';
import { CentreService } from 'src/app/Services/CentreService/centre.service';
import { UtilisateurService } from 'src/app/Services/UtilisateurService/utilisateur.service';

@Component({
  selector: 'app-update-admin-centre',
  templateUrl: './update-admin-centre.component.html',
  styleUrls: ['./update-admin-centre.component.scss']
})
export class UpdateAdminCentreComponent {


  constructor(
    private administrateurService: AdministrateurService,
    private router: Router,
    private centreService: CentreService,
    private utilisateurService: UtilisateurService
  ) { }

  admin: AdministrateurCentre = new AdministrateurCentre();
  centres: Centre[] = [];
  utilisateur!: Utilisateur;

  ngOnInit(): void {
    this.getCentres();
    this.utilisateur = this.utilisateurService.getUtilisateur();
  }

  resetForm() {
    this.admin = new AdministrateurCentre();
  }

  getCentres(): void {
    this.centreService.getCentres()
      .subscribe(centres => {
        this.centres = centres;
      });
  }

  updateAdminCentre(): void {
    this.admin.statut = StatutAdmin.administrateurCentre;
    this.admin.medecins = this.admin.centre.medecins;
    console.log(this.admin);
    

    this.administrateurService.updateAdminCentre(this.admin).subscribe(
      (admin: AdministrateurCentre) => {
        console.log('AdminCentre modifié avec succès :', admin);
        if (this.utilisateur.getRole() != RoleUtilisateur.superAdmin) {
          this.utilisateurService.getUtilisateur().setNom(admin.prenom);
          this.utilisateurService.getUtilisateur().setRole(RoleUtilisateur.adminCentre);
          this.utilisateurService.getUtilisateur().setEmail(admin.email);
        }
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout da l\' admin :', error);
      }
    );
    this.router.navigate(['tableau-de-bord']);
  }

  centretoString(centre: Centre): string {
    return centre.adresse.zipCode.toString() + ' ' + centre.adresse.rue + ' ' + centre.adresse.ville;
  }

}
