import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'mail' },
    { title: 'Gastos', url: '/expenses', icon: 'paper-plane' },
    { title: 'Categorías', url: '/categories', icon: 'heart' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public labels = [];
  constructor() {}
}
