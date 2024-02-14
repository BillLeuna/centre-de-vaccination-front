import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { CentreComponent } from './Components/centre/centre.component';
import { PatientComponent } from './Components/patient/patient.component';
import { MedecinComponent } from './Components/medecin/medecin.component';
import { AdministrateurComponent } from './Components/administrateur/administrateur.component';
import { TableauDeBordComponent } from './Components/tableau-de-bord/tableau-de-bord.component';
import { MonCompteComponent } from './Components/mon-compte/mon-compte.component';
import { SinglePatientComponent } from './Components/Singles/single-patient/single-patient.component';
import { CreatePatientComponent } from './Components/Create/create-patient/create-patient.component';
import { SingleMedecinComponent } from './Components/Singles/single-medecin/single-medecin.component';
import { SingleCentreComponent } from './Components/Singles/single-centre/single-centre.component';

const routes: Routes = [
  { path: '', component: AuthentificationComponent },
  { path: 'centres', component: CentreComponent },
  { path: 'patients', component: PatientComponent },
  { path: 'medecins', component: MedecinComponent },
  { path: 'centres', component: CentreComponent },
  { path: 'admin', component: AdministrateurComponent },
  { path: 'tableau-de-bord', component: TableauDeBordComponent },
  { path: 'mon-compte', component: MonCompteComponent },
  { path: 'patients/:id', component: SinglePatientComponent },
  { path: 'medecins/:id', component: SingleMedecinComponent },
  { path: 'centres/:id', component: SingleCentreComponent },
  { path: 'create-patient', component: CreatePatientComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
