import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedecinService } from 'src/app/Services/MedecinService/medecin.service';

@Component({
  selector: 'app-create-medecin',
  templateUrl: './create-medecin.component.html',
  styleUrls: ['./create-medecin.component.scss']
})
export class CreateMedecinComponent implements OnInit {

  email: string = "";
  prenom: String = "";
  nom: String = "";
  tel: String = "";
  centre: String = "";
  creer_un_compte: string = 'Créer un compte';
  centres: string[] = ['centre1', 'centre12', 'centre21', 'centre321', 'centre651', 'centre1765'];

  constructor(private router: Router,
              private medecinService: MedecinService){              
  }

  ngOnInit(): void {

  }

}
