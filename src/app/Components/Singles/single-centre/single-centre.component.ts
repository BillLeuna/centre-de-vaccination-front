import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Centre } from 'src/app/Models/Centre';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { CentreService } from 'src/app/Services/CentreService/centre.service';
import { UtilisateurService } from 'src/app/Services/UtilisateurService/utilisateur.service';

@Component({
  selector: 'app-single-centre',
  templateUrl: './single-centre.component.html',
  styleUrls: ['./single-centre.component.scss']
})
export class SingleCentreComponent implements OnInit{

  centreId!: number;
  centre: Centre = new Centre();
  utilisateur!: Utilisateur;

  constructor(private route: ActivatedRoute,
              private centreService: CentreService,
              private router: Router,
              private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.centreId = +idParam;
        this.loadCentreDetails();
        console.log(this.centre.getAdresseToString());
        
      }
    });
    this.utilisateur = this.utilisateurService.getUtilisateur();
  }

  loadCentreDetails(): void {
    this.centreService.getCentreById(this.centreId).subscribe(centre => {
      this.centre = centre;
    });
  }

  isPatient(): Boolean {
    if(this.utilisateur.getRole() == RoleUtilisateur.patient)
      return true;
    else
      return false;
  }

  inscriptionAuCentre(): void {
    console.log(this.isPatient());
    
  }

  supprimerCentre(): void {
    // Logique pour supprimer le centre
  }

  goBack(): void {
    this.router.navigate(['centres']);
  }
}
