import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdministrateurComponent } from './Components/administrateur/administrateur.component';
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { CentreComponent } from './Components/centre/centre.component';
import { MedecinComponent } from './Components/medecin/medecin.component';
import { MenuComponent } from './Components/menu/menu.component';
import { PatientComponent } from './Components/patient/patient.component';
import { VaccinationComponent } from './Components/vaccination/vaccination.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableauDeBordComponent } from './Components/tableau-de-bord/tableau-de-bord.component';
import { MonCompteComponent } from './Components/mon-compte/mon-compte.component';
import { PatientService } from './Services/PatientService/patient.service';
import { HttpClientModule } from '@angular/common/http';
import { SinglePatientComponent } from './Components/Singles/single-patient/single-patient.component';
import { CreatePatientComponent } from './Components/Create/create-patient/create-patient.component';
import { SingleMedecinComponent } from './Components/Singles/single-medecin/single-medecin.component';
import { SingleCentreComponent } from './Components/Singles/single-centre/single-centre.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateMedecinComponent } from './Components/Create/create-medecin/create-medecin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { CreateAdminCentreComponent } from './Components/Create/create-admin-centre/create-admin-centre.component';
import { CreateSuperAdminComponent } from './Components/Create/create-super-admin/create-super-admin.component';
import { AdministrateursComponent } from './Components/administrateurs/administrateurs.component';

@NgModule({
  declarations: [
    AppComponent,
    AdministrateurComponent,
    AuthentificationComponent,
    CentreComponent,
    MedecinComponent,
    MenuComponent,
    PatientComponent,
    VaccinationComponent,
    TableauDeBordComponent,
    MonCompteComponent,
    SinglePatientComponent,
    CreatePatientComponent,
    SingleMedecinComponent,
    SingleCentreComponent,
    CreateMedecinComponent,
    CreateAdminCentreComponent,
    CreateSuperAdminComponent,
    AdministrateursComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    FormsModule, 
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
    
  ],
  providers: [PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
