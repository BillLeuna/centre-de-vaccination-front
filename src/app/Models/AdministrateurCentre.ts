import { Administrateur } from "./Administrateur";
import { Centre } from "./Centre";
import { Medecin } from "./Medecin";
import { StatutAdmin } from "./StatutAdmin";


export class AdministrateurCentre implements Administrateur {
    
    id!:number;
    nom!: string;
    prenom!: string;
    email!: string;
    statut!: StatutAdmin.administrateurCentre;
    centre!: Centre;
    medecins!: Medecin[];
    
}