import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModelComponent } from '../../components/model/model.component';
import { ContactComponent } from '../contact/contact.component';
import { ContactMeComponent } from '../../components/contact-me/contact-me.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';
import { AboutComponent } from '../about/about.component';
import { OurCollectionComponent } from '../../components/our-collection/our-collection.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ModelComponent,
    ContactMeComponent,
    AboutUsComponent,
    AboutComponent,
    OurCollectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  url =
    'https://github.com/srivastavaanurag79/angular-three/blob/main/src/app/model/model.component.ts';
}
