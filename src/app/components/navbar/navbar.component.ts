import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public routes: string[] = ['home', 'about', 'contact'];
  private router = inject(Router);

  goToRoute(route: string): void {
    this.router.navigate([route]);
  }
}
