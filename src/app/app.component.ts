import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  ngOnInit() {
    AOS.init();
    window.addEventListener('load', AOS.refresh);
  }
}
