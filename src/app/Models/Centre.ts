import { Adresse } from "./Adresse";

export class Centre {

    id!:number;
    nom!: String;
    adresse!: Adresse;

    toString(): String {
        return this.nom
    }

    getAdresseToString(): String {
        return this.adresse.toString();
    }
}