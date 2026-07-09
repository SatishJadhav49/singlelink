import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApplicationLinks, PowerBIDashboard } from '../models/application.model';

/**
 * =====================================================================
 *  ApplicationService
 *  ---------------------------------------------------------------
 *  DUMMY DATA MODE — every method currently returns mock data via
 *  `of(...)` so the UI can be developed / demoed without the backend.
 *
 *  TO GO LIVE: set `USE_DUMMY_DATA = false` and fill in the API
 *  endpoints below. The method signatures match the old application,
 *  so the existing backend contract plugs in unchanged.
 * =====================================================================
 */
@Injectable({ providedIn: 'root' })
export class ApplicationService {

  private readonly USE_DUMMY_DATA = true;

  /** TODO: point these at the real endpoints when integrating. */
  private readonly API_BASE = '/api';
  private readonly TOKEN_URL = `${this.API_BASE}/auth/current-token`;
  private readonly APPS_URL = `${this.API_BASE}/user/applications`;
  private readonly POWERBI_URL = `${this.API_BASE}/user/powerbi-dashboards`;

  constructor(private http: HttpClient) { }

  // ------------------------------------------------------------------
  // 1. Token
  // ------------------------------------------------------------------
  getCurrentToken(): Observable<any> {
    if (this.USE_DUMMY_DATA) {
      return of({ token: 'dummy-jwt-token', userName: 'Satish Jadhav' }).pipe(delay(300));
    }
    return this.http.get<any>(this.TOKEN_URL);
  }

  // ------------------------------------------------------------------
  // 2. Applications the logged-in user can access
  // ------------------------------------------------------------------
  getUserApplications(tokenResponse: any): Observable<ApplicationLinks[]> {
    if (this.USE_DUMMY_DATA) {
      return of(this.DUMMY_APPLICATIONS).pipe(delay(600));
    }
    return this.http.post<ApplicationLinks[]>(this.APPS_URL, tokenResponse);
  }

  // ------------------------------------------------------------------
  // 3. Power BI dashboards the user can access
  //    (separate call — access logic handled in the backend)
  // ------------------------------------------------------------------
  getPowerBIDashboards(tokenResponse: any): Observable<PowerBIDashboard[]> {
    if (this.USE_DUMMY_DATA) {
      return of(this.DUMMY_DASHBOARDS).pipe(delay(800));
    }
    return this.http.post<PowerBIDashboard[]>(this.POWERBI_URL, tokenResponse);
  }

  // ==================================================================
  //  DUMMY DATA — remove once the real APIs are wired up
  // ==================================================================
  private readonly DUMMY_APPLICATIONS: ApplicationLinks[] = [
    { DBName: 'GNOVA', Application_Name: 'GNOVA-C', Application_Route: 'https://gnova.mahindra.com/', PowerBI: 'https://app.powerbi.com/view?r=gnova' },
    { DBName: 'EQMS', Application_Name: 'eQMS', Application_Route: 'eqms', PowerBI: 'https://app.powerbi.com/view?r=eqms' },
    { DBName: 'CAPA', Application_Name: 'CAPA Tracker', Application_Route: 'capa-tracker', PowerBI: '' },
    { DBName: 'SUPQ', Application_Name: 'Supplier Quality Portal', Application_Route: 'supplier-quality', PowerBI: 'https://app.powerbi.com/view?r=supq' },
    { DBName: 'LINEINSP', Application_Name: 'Line Inspection', Application_Route: 'line-inspection', PowerBI: '' },
    { DBName: 'WARRANTY', Application_Name: 'Warranty Analytics', Application_Route: 'warranty-analytics', PowerBI: 'https://app.powerbi.com/view?r=warranty' },
    { DBName: 'PAINTQC', Application_Name: 'Paint Shop QC', Application_Route: 'paint-shop-qc', PowerBI: '' },
    { DBName: 'VEHAUDIT', Application_Name: 'Vehicle Audit System', Application_Route: 'vehicle-audit', PowerBI: '' },
    { DBName: 'FIELDQ', Application_Name: 'Field Quality Reports', Application_Route: 'field-quality', PowerBI: 'https://app.powerbi.com/view?r=fieldq' },
    { DBName: 'CALIB', Application_Name: 'Calibration Manager', Application_Route: 'calibration', PowerBI: '' },
    { DBName: 'DOCC', Application_Name: 'Document Control', Application_Route: 'document-control', PowerBI: '' },
    { DBName: 'TRNG', Application_Name: 'Training & Skill Matrix', Application_Route: 'training-matrix', PowerBI: '' },
  ];

  private readonly DUMMY_DASHBOARDS: PowerBIDashboard[] = [
    { Dashboard_Name: 'Plant Quality Overview', Dashboard_Url: 'https://app.powerbi.com/view?r=plant-quality', Description: 'Daily quality KPIs across all plants', Workspace: 'PQ Drona' },
    { Dashboard_Name: 'Defect Trend Analysis', Dashboard_Url: 'https://app.powerbi.com/view?r=defect-trend', Description: 'Rolling 12-month defect trends by line & model', Workspace: 'PQ Drona' },
    { Dashboard_Name: 'Supplier Performance', Dashboard_Url: 'https://app.powerbi.com/view?r=supplier-perf', Description: 'PPM, rejections and supplier scorecards', Workspace: 'Supplier Quality' },
    { Dashboard_Name: 'Warranty Cost Monitor', Dashboard_Url: 'https://app.powerbi.com/view?r=warranty-cost', Description: 'Warranty spend and top failure modes', Workspace: 'After Sales' },
    { Dashboard_Name: 'Audit Compliance', Dashboard_Url: 'https://app.powerbi.com/view?r=audit-compliance', Description: 'Internal & external audit compliance status', Workspace: 'PQ Drona' },
  ];
}
