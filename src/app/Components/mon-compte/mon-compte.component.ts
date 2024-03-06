import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrateurCentre } from 'src/app/Models/AdministrateurCentre';
import { Medecin } from 'src/app/Models/Medecin';
import { Patient } from 'src/app/Models/Patient';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { AdministrateurService } from 'src/app/Services/AdministrateurService/administrateur.service';
import { MedecinService } from 'src/app/Services/MedecinService/medecin.service';
import { PatientService } from 'src/app/Services/PatientService/patient.service';
import { UtilisateurService } from 'src/app/Services/UtilisateurService/utilisateur.service';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.scss']
})
export class MonCompteComponent {

  utilisateur!: Utilisateur;
  medecinId!: number;
  medecin!: Medecin;
  patientId!: number;
  patient!: Patient;
  adminCentreId!: number;
  adminCentre!: AdministrateurCentre;

  constructor(
    private route: ActivatedRoute,
    private medecinService: MedecinService,
    private utilisateurService: UtilisateurService,
    private patientService: PatientService,
    private adminService: AdministrateurService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.utilisateur = this.utilisateurService.getUtilisateur();
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null && this.utilisateur.getRole() === RoleUtilisateur.medecin) {
        this.medecinId = +idParam;
        this.medecinService.getMedecinById(this.medecinId).subscribe(medecin => {
          this.medecin = medecin;
        });
      }else if (idParam !== null && this.utilisateur.getRole() === RoleUtilisateur.medecin) {
        this.patientId = +idParam;
        this.patientService.getPatientById(this.patientId).subscribe(patient => {
          this.patient = patient;
        });
      }else if (idParam !== null) {
        this.adminCentreId = +idParam;
        this.adminService.getAdministrateurCentreById(this.adminCentreId).subscribe(adminCentre => {
          this.adminCentre = adminCentre;
        });
      }
    });
  }

  isMedecin() : Boolean {
    if (this.utilisateur.getRole() === RoleUtilisateur.medecin)
      return true;
    else
      return false;
  }

  isPatient() : Boolean {
    if (this.utilisateur.getRole() === RoleUtilisateur.patient)
      return true;
    else
      return false;
  }

  isAdminCentre() : Boolean {
    if (this.utilisateur.getRole() === RoleUtilisateur.adminCentre)
      return true;
    else
      return false;
  }

  isSuperAdmin() : Boolean {
    if (this.utilisateur.getRole() === RoleUtilisateur.superAdmin)
      return true;
    else
      return false;
  }

}
