import { Component } from '@angular/core';
import { PORTAL } from '../../app.constants';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly portal = PORTAL;
  readonly mailtoLink = `mailto:${PORTAL.SUPPORT_EMAIL}?subject=AppHub%20Support%20Request`;
}
