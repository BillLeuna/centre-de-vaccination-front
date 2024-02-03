import { Adresse } from "./Adresse";
import { Medecin } from "./Medecin";

export class Patient {

    id!:number;
    nom!: string;
    prenom!: string;
    email!: string;
    dateDeNaissance!: Date;
    dateDInscription!: Date;
    telephone!: number;
    adresse!: Adresse;
    docteur!: Medecin;

}