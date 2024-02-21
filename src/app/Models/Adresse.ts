import { Centre } from "./Centre";
import { Medecin } from "./Medecin";
import { Patient } from "./Patient";

export class Adresse {

    id!: number;
    ville!: string;
    rue!: string;
    zipCode!: number;
    medecins!: Medecin[];
    patient!: Patient;
    centre!: Centre;

}