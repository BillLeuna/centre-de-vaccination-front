import { Adresse } from "./Adresse";
import { Medecin } from "./Medecin";
import { Patient } from "./Patient";

export class Centre {

    id!:number;
    nom!: String;
    adresse!: Adresse;
    medecins!: Medecin[];
    patients!: Patient[];

    toString(): String {
        return this.nom
    }

    getAdresseToString(): String {
        return this.adresse.toString();
    }
}