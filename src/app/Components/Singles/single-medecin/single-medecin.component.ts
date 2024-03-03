import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medecin } from 'src/app/Models/Medecin';
import { MedecinService } from 'src/app/Services/MedecinService/medecin.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { UtilisateurService } from 'src/app/Services/UtilisateurService/utilisateur.service';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { AdministrateurService } from 'src/app/Services/AdministrateurService/administrateur.service';

@Component({
  selector: 'app-single-medecin',
  templateUrl: './single-medecin.component.html',
  styleUrls: ['./single-medecin.component.scss']
})
export class SingleMedecinComponent implements OnInit{

  medecinId!: number;
  utilisateur!: Utilisateur;
  medecin: Medecin = new Medecin();
  afficherBoutonSupprimer!: boolean;

  constructor(private route: ActivatedRoute,
              private medecinService: MedecinService,
              private utilisateurService: UtilisateurService,              
              private administrateurService: AdministrateurService,
              private router: Router) { }

  ngOnInit(): void {
    this.utilisateur = this.utilisateurService.getUtilisateur();
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.medecinId = +idParam;
        this.medecinService.getMedecinById(this.medecinId).subscribe(medecin => {
          this.medecin = medecin;
          this.isAdminOfThisCentre().subscribe(result => {
            this.afficherBoutonSupprimer = result;
            console.log('isAdminOfThisCentre result:', result);
          });
        });
      }
    });
  }

  isAdminOfThisCentre(): Observable<boolean> {
    if (this.utilisateur.getRole() === RoleUtilisateur.adminCentre) {
      return this.administrateurService.getAdministrateurCentreByEmail(this.utilisateur.getEmail()).pipe(
        map(admin => admin.centre.id === this.medecin.centre.id),
        catchError(error => {
          console.error('Erreur lors de la récupération de l\'admin: ', error);
          return of(false); // Retourne un observable de false en cas d'erreur
        })
      );
    } else {
      return of(false); // Retourne un observable de false si l'utilisateur n'est pas un adminCentre
    }
  }

  supprimerMedecin(): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce médecin ?');
    if (confirmation) {
      this.medecinService.deleteMedecin(this.medecin.id).subscribe({
        next: () => {
          console.log('Médecin supprimé');          
          this.goBack();
        },
        error: (error) => {
          console.error('Une erreur s\'est produite lors de la suppression du médecin : ', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['medecins']);
  }
}
