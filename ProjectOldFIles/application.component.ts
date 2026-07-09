import { Component } from '@angular/core';
import { ApplicationService } from '../application.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface ApplicationLinks {
  DBName: string;
  Application_Name: string;
  Application_Route: string;
  PowerBI: string;
}

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent {

  applications: ApplicationLinks[] = [];
  selectedAppRoute: string | null = null;

  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadApplications();

    this.route.paramMap.subscribe(params => {
      this.selectedAppRoute = params.get('appRoute');
      if (this.selectedAppRoute) {
        console.log('Navigated to:', this.selectedAppRoute);
        // You can filter applications or load specific content here
      }
    });
  }

  loadApplications(): void {

    this.applicationService.getCurrentToken().subscribe({
      next: (tokenResponse: any) => {

        this.applicationService.getUserApplications(tokenResponse).subscribe({
          next: (appResponse: any) => {
            this.applications = appResponse;

          },
          error: (err) => console.error('App Error', err)
        });

      },
      error: (err) => console.error('Token Error', err)
    });
  }

  onAppNavigate(applicationLink: string, appname: string) {
    if (appname == "GNOVA-C") {
      window.open(applicationLink, '_blank', 'noopener,noreferrer');
    }
    const url = `${window.location.origin}/${applicationLink}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
