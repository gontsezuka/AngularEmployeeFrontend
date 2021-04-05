import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

     private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


  public getEmployees(): Observable<Employee[]>
  {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees/find-all`)
  }

  public updateEmployee(employee: Employee): Observable<Employee>
  {
    return this.http.put<Employee>(`${this.apiUrl}/employees/update-employee-return`,employee);
  }

  public deleteEmployee(employeeId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiUrl}/employees/delete-employee/${employeeId}`);
  }

  public saveEmployee(employee: Employee): Observable<Employee>
  {
    return this.http.post<Employee>(`${this.apiUrl}/employees/save-employee`,employee);
  }



}
