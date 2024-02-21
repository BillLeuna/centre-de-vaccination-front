import { Component, OnInit } from '@angular/core';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { UtilisateurService } from 'src/app/Services/UtilisateurService/utilisateur.service';

@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.scss']
})
export class TableauDeBordComponent implements OnInit{

  utilisateur!: Utilisateur;

  constructor(private utilisateurService: UtilisateurService) { 
    
  }

  ngOnInit(): void {
    this.utilisateur = this.utilisateurService.getUtilisateur();
  }

  isMedecin() : Boolean {
    return this.utilisateur.getRole() == RoleUtilisateur.medecin;
  }
  isPatient() : Boolean {
    return this.utilisateur.getRole() == RoleUtilisateur.patient;
  }
  isAdminCentre() : Boolean {
    return this.utilisateur.getRole() == RoleUtilisateur.adminCentre;
  }
  isSuperAdmin() : Boolean {
    return this.utilisateur.getRole() == RoleUtilisateur.superAdmin;
  }
}
