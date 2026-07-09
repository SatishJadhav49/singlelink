import { Component } from '@angular/core';
import { PORTAL } from '../../app.constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly portal = PORTAL;
  readonly year = new Date().getFullYear();
  readonly mailtoLink = `mailto:${PORTAL.SUPPORT_EMAIL}?subject=AppHub%20Support%20Request`;
}
