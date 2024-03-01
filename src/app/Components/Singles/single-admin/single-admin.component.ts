import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrateurCentre } from 'src/app/Models/AdministrateurCentre';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { AdministrateurService } from 'src/app/Services/AdministrateurService/administrateur.service';
import { UtilisateurService } from 'src/app/Services/UtilisateurService/utilisateur.service';

@Component({
  selector: 'app-single-admin',
  templateUrl: './single-admin.component.html',
  styleUrls: ['./single-admin.component.scss']
})
export class SingleAdminComponent implements OnInit {

  adminCentreId!: number;
  adminCentre: AdministrateurCentre = new AdministrateurCentre();
  utilisateur!: Utilisateur;
  nomCentre: string = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adminservice: AdministrateurService,
              private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.adminCentreId = +idParam;
        this.loadAdminDetails();
      }
    });
    this.utilisateur = this.utilisateurService.getUtilisateur();
  }
  
  loadAdminDetails(): void {
    // if (this.utilisateur.getRole() == RoleUtilisateur.superAdmin) {
      this.adminservice.getAdministrateurCentreById(this.adminCentreId).subscribe(adminCentre => {
        this.adminCentre = adminCentre;
        this.nomCentre = adminCentre.centre.nom; 
      });
    //}
  }

  isAdminCentre(): boolean {
    if(this.utilisateur.getRole() == RoleUtilisateur.adminCentre) 
      return true;
    else
      return false;
  }

  isSuperAdmin(): boolean {
    if(this.utilisateur.getRole() == RoleUtilisateur.superAdmin) 
      return true;
    else
      return false;
  }

  modifierAdminCentre() : void {

  }

  SupprimerAdminCentre(): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cet administrateur de centre ?');
    if (confirmation) {
      this.adminservice.deleteAdminCentre(this.adminCentre.id).subscribe({
        next: () => {
          console.log('Suppression effectuée');
          this.goBack();
        },
        error: (error) => {
          console.error('Une erreur s\'est produite lors de la suppression de l\'admin :', error);
        }
        
      });
    }
  }

  goBack(): void {
    this.router.navigate(['administrateurs']);
  }
}
