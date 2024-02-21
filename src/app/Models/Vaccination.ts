import { Centre } from "./Centre";
import { Medecin } from "./Medecin";
import { Patient } from "./Patient";
import { StatutDossierPatient } from "./StatutDossierPatient";

export class Vaccination {

    id!:number;
    patient!: Patient;
    medecin!: Medecin;
    centre!: Centre;
    dateReservation!: Date;
    dateVaccination!: Date;
    statutDossierPatient!: StatutDossierPatient; 

}