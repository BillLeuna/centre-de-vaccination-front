import { Adresse } from "./Adresse";
import { Medecin } from "./Medecin";
import { Patient } from "./Patient";

export class Centre {

    id!:number;
    nom!: string;
    adresse!: Adresse;
    medecins!: Medecin[];
    patients!: Patient[];

}