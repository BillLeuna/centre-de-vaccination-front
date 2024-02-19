import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministrateurCentre } from 'src/app/Models/AdministrateurCentre';
import { SuperAdmin } from 'src/app/Models/SuperAdmin';
import { AdministrateurService } from 'src/app/Services/AdministrateurService/administrateur.service';

@Component({
  selector: 'app-administrateurs',
  templateUrl: './administrateurs.component.html',
  styleUrls: ['./administrateurs.component.scss']
})
export class AdministrateursComponent implements OnInit {

  allAdminCentre!: AdministrateurCentre[];
  filtredAdminCentre!: AdministrateurCentre[];
  allSuperAdmin!: SuperAdmin[];
  filtredSuperAdmin!: SuperAdmin[];
  searchTerm: string = '';

  constructor(
    private administrateurService: AdministrateurService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAdminCentre();
    this.getAdminCentre();
  }

  getAdminCentre(): void {
    this.administrateurService.getAdministrateursCentres()
      .subscribe(allAdminCentre => {
        this.allAdminCentre = allAdminCentre;
      });
  }

  getSuperAdmin(): void {
    this.administrateurService.getSuperAdmins()
      .subscribe(allSuperAdmin => {
        this.allSuperAdmin = allSuperAdmin;
      });
  }

  filterAdmin(): void {
    if (!this.searchTerm) {
      this.filtredSuperAdmin = this.allSuperAdmin;
      this.filtredAdminCentre = this.allAdminCentre;
      return;
    }
    this.filtredSuperAdmin = this.allSuperAdmin.filter(superAdmin =>
      (superAdmin.nom && superAdmin.nom.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      (superAdmin.prenom && superAdmin.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
    this.filtredAdminCentre = this.allAdminCentre.filter(adminCentre =>
      (adminCentre.nom && adminCentre.nom.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      (adminCentre.prenom && adminCentre.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  DisplayAllAdmin(): void {
    this.searchTerm = '';
    this.filtredAdminCentre = this.allAdminCentre;
    this.filtredAdminCentre = this.allAdminCentre;
  }

  deleteAdmininistrateurCentre(adminId: number): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cet administrateur de centre ?');
    if (confirmation) {
      this.administrateurService.deleteAdminCentre(adminId);
      console.log('Suppression effectuée');
    }
  }

  deleteSuperAdmininistrateur(adminId: number): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cet administrateur de centre ?');
    if (confirmation) {
      this.administrateurService.deleteSuperAdmin(adminId);
      console.log('Suppression effectuée');
    }
  }

}
