import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule ,Router} from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  username: string | null = null;

  constructor(
    private authService: AuthService
  ) 
  { 
    this.username = this.authService.getUsername();
  }
  logout() {
    this.authService.logout();
  }

  toggleSidebar() {
    document.getElementById("sidebar")?.classList.toggle("collapsed");
  }
}
