/**
 * Shape returned by the User-Applications API.
 * (Kept identical to the old application so the real API plugs in as-is.)
 */
export interface ApplicationLinks {
  DBName: string;
  Application_Name: string;
  Application_Route: string;
  PowerBI: string;
}

/**
 * Shape returned by the Power BI Dashboards API.
 * Adjust field names here if the backend contract differs.
 */
export interface PowerBIDashboard {
  Dashboard_Name: string;
  Dashboard_Url: string;
  Description: string;
  Workspace: string;
}
