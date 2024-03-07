import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { CentreComponent } from './Components/centre/centre.component';
import { PatientComponent } from './Components/patient/patient.component';
import { MedecinComponent } from './Components/medecin/medecin.component';
import { TableauDeBordComponent } from './Components/tableau-de-bord/tableau-de-bord.component';
import { MonCompteComponent } from './Components/mon-compte/mon-compte.component';
import { SinglePatientComponent } from './Components/Singles/single-patient/single-patient.component';
import { CreatePatientComponent } from './Components/Create/create-patient/create-patient.component';
import { SingleMedecinComponent } from './Components/Singles/single-medecin/single-medecin.component';
import { SingleCentreComponent } from './Components/Singles/single-centre/single-centre.component';
import { CreateMedecinComponent } from './Components/Create/create-medecin/create-medecin.component';
import { AdministrateursComponent } from './Components/administrateurs/administrateurs.component';
import { CreateAdminCentreComponent } from './Components/Create/create-admin-centre/create-admin-centre.component';
import { CreateSuperAdminComponent } from './Components/Create/create-super-admin/create-super-admin.component';
import { CreateCentreComponent } from './Components/Create/create-centre/create-centre.component';
import { VaccinationComponent } from './Components/vaccination/vaccination.component';
import { SingleAdminComponent } from './Components/Singles/single-admin/single-admin.component';
import { SingleVaccinationComponent } from './Components/Singles/single-vaccination/single-vaccination.component';
import { UpdateAdminCentreComponent } from './Components/Updates/update-admin-centre/update-admin-centre.component';
import { UpdateCentreComponent } from './Components/Updates/update-centre/update-centre.component';
import { UpdateMedecinComponent } from './Components/Updates/update-medecin/update-medecin.component';

const routes: Routes = [
  { path: '', component: AuthentificationComponent },
  { path: 'centres', component: CentreComponent },
  { path: 'patients', component: PatientComponent },
  { path: 'medecins', component: MedecinComponent },
  { path: 'centres', component: CentreComponent },
  { path: 'tableau-de-bord', component: TableauDeBordComponent },
  { path: 'mon-compte', component: MonCompteComponent },
  { path: 'patients/:id', component: SinglePatientComponent },
  { path: 'medecins/:id', component: SingleMedecinComponent },
  { path: 'centres/:id', component: SingleCentreComponent },
  { path: 'create-patient', component: CreatePatientComponent },
  { path: 'create-admin-centre', component:  CreateAdminCentreComponent},
  { path: 'create-super-admin', component: CreateSuperAdminComponent },
  { path: 'create-medecin', component: CreateMedecinComponent },
  { path: 'create-centre', component: CreateCentreComponent },
  { path: 'administrateurs', component: AdministrateursComponent },
  { path: 'create-admin-centre', component: CreateAdminCentreComponent },
  { path: 'create-super-admin', component: CreateSuperAdminComponent },
  { path: 'vaccinations', component: VaccinationComponent },
  { path: 'administrateurs/:id', component: SingleAdminComponent },
  { path: 'vaccinations/:id', component: SingleVaccinationComponent },
  { path: 'update-admin-centre/:id', component: UpdateAdminCentreComponent },
  { path: 'update-centre/:id', component: UpdateCentreComponent },
  { path: 'update-medecin/:id', component: UpdateMedecinComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }