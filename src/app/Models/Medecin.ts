import { Centre } from "./Centre";

export class Medecin {

    id!:number;
    nom!: string;
    prenom!: string;
    email!: string;
    telephone!: number;
    centre!: Centre;

    getNomCentre(): String {
        return this.centre.nom;
    }
    
}