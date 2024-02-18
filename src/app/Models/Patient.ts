import { Adresse } from "./Adresse";
import { Centre } from "./Centre";
import { Medecin } from "./Medecin";

export class Patient {

    id!:number;
    nom!: string;
    prenom!: string;
    email!: string;
    dateDeNaissance!: Date;
    dateDInscription!: Date;
    telephone!: string;
    adresse!: Adresse;
    medecins!: Medecin[];
    centres!: Centre[];

}