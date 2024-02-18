import { Centre } from "./Centre";
import { Patient } from "./Patient";

export class Medecin {

    id!:number;
    nom!: string;
    prenom!: string;
    email!: string;
    telephone!: string;
    centre!: Centre;
    patients!: Patient[];

    getNomCentre(): String {
        return this.centre.nom;
    }
    
}