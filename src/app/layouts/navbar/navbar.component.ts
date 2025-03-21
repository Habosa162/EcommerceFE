import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  profileBtnClicked: boolean = false;

  profileBtn() {
    this.profileBtnClicked = !this.profileBtnClicked;
    console.log(this.profileBtnClicked);
  }
}
