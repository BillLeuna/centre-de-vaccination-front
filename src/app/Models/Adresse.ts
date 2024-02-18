import { Centre } from "./Centre";
import { Medecin } from "./Medecin";
import { Patient } from "./Patient";

export class Adresse {

    id!: number;
    ville!: String;
    rue!: String;
    zipCode!: number;
    medecins!: Medecin[];
    patient!: Patient;
    centre!: Centre;

    toString(): String {
        return this.zipCode + ' ' + this.rue + ' ' + this.ville; 
    }
}