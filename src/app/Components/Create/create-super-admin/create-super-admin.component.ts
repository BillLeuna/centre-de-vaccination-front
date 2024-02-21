import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { StatutAdmin } from 'src/app/Models/StatutAdmin';
import { SuperAdmin } from 'src/app/Models/SuperAdmin';
import { AdministrateurService } from 'src/app/Services/AdministrateurService/administrateur.service';
import { UtilisateurService } from 'src/app/Services/UtilisateurService/utilisateur.service';

@Component({
  selector: 'app-create-super-admin',
  templateUrl: './create-super-admin.component.html',
  styleUrls: ['./create-super-admin.component.scss']
})
export class CreateSuperAdminComponent implements OnInit {

  superAdmin: SuperAdmin = new SuperAdmin();

  constructor(
    private administrateurService: AdministrateurService,
    private router: Router,
    private utilisateurService: UtilisateurService
  ) { }

  ngOnInit(): void {
  }

  resetForm() {
    this.superAdmin = new SuperAdmin();
  }

  saveSuperAdmin(): void {
    this.superAdmin.statut = StatutAdmin.superAdmin;
    this.administrateurService.addSuperAdmin(this.superAdmin).subscribe(
      (admin: SuperAdmin) => {
        console.log('SuperAdmin ajouté avec succès :', admin);
        this.utilisateurService.getUtilisateur().setNom(admin.prenom);
        this.utilisateurService.getUtilisateur().setRole(RoleUtilisateur.superAdmin);
        this.utilisateurService.getUtilisateur().setEmail(admin.email);
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du superAdmin :', error);
      }
    );
    this.router.navigate(['tableau-de-bord']);
  }

}
