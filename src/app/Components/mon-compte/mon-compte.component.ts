import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrateurCentre } from 'src/app/Models/AdministrateurCentre';
import { Authentification } from 'src/app/Models/Authentification';
import { Medecin } from 'src/app/Models/Medecin';
import { Patient } from 'src/app/Models/Patient';
import { RoleUtilisateur } from 'src/app/Models/RoleUtilisateur';
import { SuperAdmin } from 'src/app/Models/SuperAdmin';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { AdministrateurService } from 'src/app/Services/AdministrateurService/administrateur.service';
import { AuthentificationService } from 'src/app/Services/AuthentificationService/authentification.service';
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
  medecin: Medecin = new Medecin();
  patient: Patient = new Patient();
  adminCentre: AdministrateurCentre = new AdministrateurCentre();
  superAdmin: SuperAdmin = new SuperAdmin();
  modifierCompte!: boolean;
  authentification: Authentification = new Authentification();
  ancienMotDePasse: string = '';
  nouveauMotDePasse: string = '';
  confirmationNouveauMotDePasse: string = '';
  nomCentre: string = '';

  constructor(
    private route: ActivatedRoute,
    private medecinService: MedecinService,
    private utilisateurService: UtilisateurService,
    private patientService: PatientService,
    private adminService: AdministrateurService,
    private router: Router,
    private authentificationService: AuthentificationService,
  ) { }

  ngOnInit(): void {
    this.modifierCompte = false;
    this.utilisateur = this.utilisateurService.getUtilisateur();
    this.chargerLesModeles();
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

  chargerLesModeles() {
    if (this.isMedecin()) {
      this.medecinService.getMedecinByEmail(this.utilisateur.getEmail()).subscribe(medecinByEmail => {
        this.medecinService.getMedecinById(medecinByEmail.id).subscribe(medecin => {
          this.medecin = medecin;
        });
      });
      
    } else if (this.isPatient()) {
      this.patientService.getPatientByEmail(this.utilisateur.getEmail()).subscribe(patientByEmail => {
        this.patientService.getPatientById(patientByEmail.id).subscribe(patient => {
          this.patient = patient;
        });
      });
      
    } else if (this.isAdminCentre()) {          
      this.adminService.getAdministrateurCentreByEmail(this.utilisateur.getEmail()).subscribe(adminCentreByEmail => {
        this.adminService.getAdministrateurCentreById(adminCentreByEmail.id).subscribe(adminCentre => {
          this.adminCentre = adminCentre;
          this.nomCentre = adminCentre.centre.nom;
        });
      });
      
    }  else if (this.isSuperAdmin()) {
      this.adminService.getSuperAdminByEmail(this.utilisateur.getEmail()).subscribe(superAdminByEmail => {
        this.adminService.getSuperAdminById(superAdminByEmail.id).subscribe(superAdmin => {
          this.superAdmin = superAdmin;
        });
      });
    } 
  }

  modifierMotDePasse(): void {
    this.modifierCompte = true;
    this.authentification.email = this.utilisateur.getEmail();
  }

  seDeconnecter(): void {
    this.utilisateurService.setUtilisateur(new Utilisateur());
    this.router.navigate(['']);
  }

  onSubmit() {
    this.authentification.email = this.utilisateur.getEmail();
    this.authentification.motDePasse = this.ancienMotDePasse;
    
    if (this.utilisateur.getRole() == RoleUtilisateur.adminCentre)
      this.authentification.roleUtilisateur = 'adminCentre';
    if (this.utilisateur.getRole() == RoleUtilisateur.superAdmin)
      this.authentification.roleUtilisateur = 'superAdmin'; 
    if (this.utilisateur.getRole() == RoleUtilisateur.patient)
      this.authentification.roleUtilisateur = 'patient';
    if (this.utilisateur.getRole() == RoleUtilisateur.medecin)
      this.authentification.roleUtilisateur = 'medecin';

    this.authentificationService.authenticateUser(this.authentification)
        .subscribe({
            next: (auth) => {
                this.authentification.id = auth.id;
                this.authentification.motDePasse = (this.nouveauMotDePasse === this.confirmationNouveauMotDePasse) ? this.nouveauMotDePasse : '';
                this.authentificationService.updateAuthentification(this.authentification)
                    .subscribe({
                        next: () => {
                            console.log('Modification de mot de passe réussie');
                            alert('Modification de mot de passe réussie');
                            this.router.navigate(['tableau-de-bord']);
                        },
                        error: () => this.handlePasswordUpdateError()
                    });
            },
            error: () => this.handleAuthenticationError()
        });
  }

  handleAuthenticationError() {
    console.error('Une erreur est survenue lors de l\'authentification');
    alert('Veillez vérifier l\'ancien mot de passe');
    this.resetForm();
  }

  handlePasswordUpdateError() {
    console.error('Une erreur est survenue lors de la mise à jour du mot de passe');
    alert('Une erreur est survenue lors de la mise à jour du mot de passe');
  }


  resetForm() {
    this.authentification.email = this.utilisateur.getEmail();
    this.ancienMotDePasse = '';
    this.nouveauMotDePasse = '';
    this.confirmationNouveauMotDePasse = '';
  }
}
