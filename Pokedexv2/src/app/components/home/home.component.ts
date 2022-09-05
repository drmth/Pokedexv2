import { Component, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  userResearch: string = '';
  constructor() {}

  onUserResearch(userInputValue: string) {
    this.userResearch = userInputValue;
  }
}
