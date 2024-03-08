import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { Adresse } from 'src/app/Models/Adresse';
import { Centre } from 'src/app/Models/Centre';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { AdministrateurService } from 'src/app/Services/AdministrateurService/administrateur.service';
import { AdresseService } from 'src/app/Services/AdresseService/adresse.service';
import { CentreService } from 'src/app/Services/CentreService/centre.service';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-update-centre',
  templateUrl: './update-centre.component.html',
  styleUrls: ['./update-centre.component.scss']
})
export class UpdateCentreComponent {

  centre: Centre = new Centre();
  adresse: Adresse = new Adresse();
  route: any;
  centreId!: number;
  adresseToString!: string;
  afficherOptionReserver: any;
  afficherModifierEtSupprimer: any;
  utilisateur: any;
  utilisateurService: any;

  constructor(
    private router: Router,
    private centreService: CentreService,
    private adresseService: AdresseService,
    private adminService: AdministrateurService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params : ParamMap) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.centreId = +idParam;
        this.centreService.getCentreById(this.centreId).subscribe(centre => {
          this.centre = centre;
          this.adresseToString  = centre.adresse.zipCode.toString() + ' ' + centre.adresse.rue + ' ' + centre.adresse.ville;
          this.isAdminOfThisCenterORSuperAdmin().subscribe(result => {
            this.afficherModifierEtSupprimer = result;
            console.log('isAdminOfThisCenterORSuperAdmin', result);
          });
        });
      }
    });
    
    this.utilisateur = this.utilisateurService.getUtilisateur();    
  }
  isPatientAndHasNoReservation() {
    throw new Error('Method not implemented.');
  }

  isAdminOfThisCenterORSuperAdmin(): Observable<boolean> {
    if (this.utilisateur.getRole() === RoleUtilisateur.superAdmin) {
      return of(true);
    }
    if (this.utilisateur.getRole() === RoleUtilisateur.adminCentre) {
      return this.adminService.getAdministrateurCentreByEmail(this.utilisateur.getEmail()).pipe(
        map(administrateurCentre => {
          return administrateurCentre.centre.id === this.centre.id;
        })
      );
    }
    return of(false);
  }

  resetForm() {
    this.adresse = new Adresse();
    this.centre = new Centre();
  }

  updateCentre(): void {
    this.centre.adresse = this.adresse;
    this.adresseService.updateAdresse(this.adresse).subscribe(
      (adresse: Adresse) => {
        this.centreService.updateCentre(this.centre).subscribe(
          (centre: Centre) => {
            console.log('Centre modifié avec succès :', centre);
            this.resetForm();
          },
          (error) => {
            console.error('Erreur lors de la modification du centre :', error);
          }
        );
      }
    );
    this.router.navigate(['centres']);
  }
}
