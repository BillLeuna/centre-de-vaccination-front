import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministrateurCentre } from 'src/app/Models/AdministrateurCentre';
import { Centre } from 'src/app/Models/Centre';
import { StatutAdmin } from 'src/app/Models/StatutAdmin';
import { AdministrateurService } from 'src/app/Services/AdministrateurService/administrateur.service';
import { CentreService } from 'src/app/Services/CentreService/centre.service';

@Component({
  selector: 'app-create-admin-centre',
  templateUrl: './create-admin-centre.component.html',
  styleUrls: ['./create-admin-centre.component.scss']
})
export class CreateAdminCentreComponent implements OnInit {

  admin: AdministrateurCentre = new AdministrateurCentre();
  centres: Centre[] = [];

  constructor(
    private administrateurService: AdministrateurService,
    private router: Router,
    private centreService: CentreService
  ) { }

  ngOnInit(): void {
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

  saveAdminCentre(): void {
    this.admin.statut = StatutAdmin.administrateurCentre;
    this.admin.medecins = this.admin.centre.medecins;
    this.administrateurService.addAdminCentre(this.admin).subscribe(
      (admin: AdministrateurCentre) => {
        console.log('AdminCentre ajouté avec succès :', admin);
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout da l\' admin :', error);
      }
    );
    this.router.navigate(['tableau-de-bord']);
  }

}