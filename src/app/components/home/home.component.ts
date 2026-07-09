import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { ApplicationLinks, PowerBIDashboard } from '../../models/application.model';
import { PORTAL } from '../../app.constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  readonly portal = PORTAL;
  readonly mailtoLink = `mailto:${PORTAL.SUPPORT_EMAIL}?subject=AppHub%20Support%20Request`;

  applications: ApplicationLinks[] = [];
  dashboards: PowerBIDashboard[] = [];

  loadingApps = true;
  loadingDashboards = true;
  loadError = false;

  searchTerm = '';
  userName = '';

  /** Accent palette cycled across app tiles (professional, muted tones). */
  private readonly accents = ['#e31837', '#0e5fa8', '#0f766e', '#7c3aed', '#b45309', '#334155'];

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.loadEverything();
  }

  loadEverything(): void {
    this.loadingApps = true;
    this.loadingDashboards = true;
    this.loadError = false;

    this.applicationService.getCurrentToken().subscribe({
      next: (tokenResponse: any) => {
        this.userName = tokenResponse?.userName ?? '';

        this.applicationService.getUserApplications(tokenResponse).subscribe({
          next: (apps) => {
            this.applications = apps ?? [];
            this.loadingApps = false;
          },
          error: (err) => {
            console.error('App Error', err);
            this.loadingApps = false;
            this.loadError = true;
          }
        });

        this.applicationService.getPowerBIDashboards(tokenResponse).subscribe({
          next: (dashboards) => {
            this.dashboards = dashboards ?? [];
            this.loadingDashboards = false;
          },
          error: (err) => {
            console.error('PowerBI Error', err);
            this.loadingDashboards = false;
          }
        });
      },
      error: (err) => {
        console.error('Token Error', err);
        this.loadingApps = false;
        this.loadingDashboards = false;
        this.loadError = true;
      }
    });
  }

  get filteredApplications(): ApplicationLinks[] {
    const q = this.searchTerm.trim().toLowerCase();
    if (!q) return this.applications;
    return this.applications.filter(a =>
      a.Application_Name.toLowerCase().includes(q) ||
      a.DBName.toLowerCase().includes(q)
    );
  }

  get filteredDashboards(): PowerBIDashboard[] {
    const q = this.searchTerm.trim().toLowerCase();
    if (!q) return this.dashboards;
    return this.dashboards.filter(d =>
      d.Dashboard_Name.toLowerCase().includes(q) ||
      d.Description.toLowerCase().includes(q) ||
      d.Workspace.toLowerCase().includes(q)
    );
  }

  /** Same navigation rules as the old application. */
  onAppNavigate(applicationLink: string, appName: string): void {
    if (appName === 'GNOVA-C') {
      window.open(applicationLink, '_blank', 'noopener,noreferrer');
      return;
    }
    const url = `${window.location.origin}/${applicationLink}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /** Two-letter monogram for the app tile. */
  initials(name: string): string {
    const words = name.replace(/[^a-zA-Z0-9 ]/g, ' ').trim().split(/\s+/);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  }

  accentFor(index: number): string {
    return this.accents[index % this.accents.length];
  }

  trackByApp(_: number, item: ApplicationLinks): string {
    return item.DBName;
  }

  trackByDashboard(_: number, item: PowerBIDashboard): string {
    return item.Dashboard_Url;
  }
}
