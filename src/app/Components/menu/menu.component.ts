import { Component } from '@angular/core';
import 'bootstrap/dist/js/bootstrap.js';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  sections = [
    { label: 'Patients', route: '/patients' },
    { label: 'Médecins', route: '/medecins' },
    { label: 'Centres de vaccination', route: '/centres' },
    { label: 'Vaccinations', route: '/vaccinations' },
    { label: 'Administrateurs', route: '/administrateurs' },
    { label: 'Tableau de bord', route: '/tableau-de-bord' },
    { label: 'Mon Compte', route: '/mon-compte' }
  ];
}
