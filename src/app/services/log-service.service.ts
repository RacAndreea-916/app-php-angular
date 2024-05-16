import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LogServiceService {
  private readonly baseUrl = 'http://localhost/temaPHPAngular/';
  
  constructor(private http: HttpClient) {}

  getLogs(page: number): Observable<any> {
    const url = `${this.baseUrl}viewAll.php?page=${page}`; 
    return this.http.get(url); 
  }

  deleteLog(logRequestId: number): Observable<any> {
    const url = `${this.baseUrl}deleteLog.php?LogRequestId=${logRequestId}`; 
    return this.http.delete(url); 
  }

  getFilteredLogs(page: number, type: string, severity: string): Observable<any> {
    const url = `${this.baseUrl}filteredLogs.php`; // Endpoint for filtered logs
    let params = new HttpParams()
                  .set('page', String(page))
                  .set('type', type)
                  .set('severity', severity);
    return this.http.get(url, { params });
  }

  getUserLogs(): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log({token}) 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    });
    console.log({headers})
    
    const url = `${this.baseUrl}myLogs.php`; 
    return this.http.get(url, {headers});
  }

  addLog(logData:{id: number, type: string, severity: string, date: string, message:string}):Observable<any>{
    const url = `${this.baseUrl}add_log_handler.php`;
    const token = localStorage.getItem('authToken');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Include the JWT token
    });
    return this.http.post(url, logData, {headers});
  }
}
