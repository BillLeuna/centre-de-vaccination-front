import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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

  adminCentreId!: number;
  adminCentre!: AdministrateurCentre;

  constructor(
    private administrateurService: AdministrateurService,
    private router: Router,
    private route: ActivatedRoute,
    private centreService: CentreService,
    private utilisateurService: UtilisateurService
  ) { }

  admin: AdministrateurCentre = new AdministrateurCentre();
  centres: Centre[] = [];
  utilisateur!: Utilisateur;

  ngOnInit(): void {
    this.getCentres();
    this.route.paramMap.subscribe((params : ParamMap) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.adminCentreId = +idParam;
        this.administrateurService.getAdministrateurCentreById(this.adminCentreId).subscribe(adminCentre => {
          this.adminCentre = adminCentre;
        });
      }
    });

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
