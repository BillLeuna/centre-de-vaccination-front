import { RoleUtilisateur } from "./RoleUtilisateur";

export class Utilisateur {

  private _nom: string;
  private _role: RoleUtilisateur;
  private _email: string;

  constructor(nom: string = '',
              role: RoleUtilisateur = RoleUtilisateur.patient,
              email: string = '') {
    this._nom = nom;
    this._role = role;
    this._email = email;
  }

  getNom(): string {
    return this._nom;
  }

  setNom(value: string) {
    this._nom = value;
  }

  getRole(): RoleUtilisateur {
    return this._role;
  }

  setRole(value: RoleUtilisateur) {
    this._role = value;
  }

  getEmail(): string {
    return this._email;
  }

  setEmail(value: string) {
    this._email = value;
  }
}
