import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public employeeCount: number;

  constructor(private employeeService: EmployeeService)
   {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  public getAllEmployees():void
  {
    this.employeeService.getEmployees().subscribe(
      (response:Employee[]) =>{
        this.employeeCount=response.length;
      },
      (error:HttpErrorResponse) =>{
        console.log(error);
        this.employeeCount=0;
      }
    );
  }

}
