import { HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'EmployeeFrontEndAngular';

  public employees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;
  



  constructor(private employeeService: EmployeeService)
  { }
  ngOnInit()
  {
  // this.getEmployees(); 
  }

  public searchEmployees(key: string) : void
  {
     const results: Employee[] = [];
     for(const employee of this.employees)
     {
       if(employee.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !==-1
       || employee.email.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !==-1
       || employee.phone.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !==-1
       || employee.jobTitle.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !==-1
       
       )
       {
          results.push(employee);
       }
     
     }

     this.employees = results;
     if(results.length===0 || !key)
     {
       this.getEmployees();
     }
  }

  public getEmployees(): void
  {
    
        this.employeeService.getEmployees().subscribe(

          
          (response: Employee[]) => {
            this.employees = response;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
      );
  }

 // BIND METHOD TO UI ONCLICK
  public onAddEmployee(addForm: NgForm): void
  {

    //PROGRAMMATICALLY CLOSE THE MODAL
    document.getElementById('add-employee-form').click();

      //CALL THE SERVICE TO SUBMIT THE EMPLOYEE
      this.employeeService.saveEmployee(addForm.value).subscribe(

          (response: Employee) =>{
            console.log(response);
            this.getEmployees();
            addForm.reset();
          },
          (error:HttpErrorResponse) =>{
            alert(error.message);
            addForm.reset();
          }
      );


  }

   // BIND METHOD TO UI ONCLICK
  public onUpdateEmployee(employee: Employee): void
  {

    this.employeeService.updateEmployee(employee).subscribe(
      (response:Employee)=>{
        console.log(response);
        this.getEmployees();
        
      },
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
    );
  }

  // BIND METHOD TO UI ONCLICK
  public onDeleteEmployee(employeeId: number):void
  {
    this.employeeService.deleteEmployee(employeeId).subscribe(
        (response:void) =>
        {
          this.getEmployees();
        },
        (error:HttpErrorResponse) =>
        {
          alert(error.message);
        }
    );
  }
  //CREATE THE METHOD FOR ONCLICK

  public onOpenModal(employee: Employee,mode: string)
  {
    const container = document.getElementById('main-container');
    //CREATING A BUTTON PROGRAMMATICALLY
    const button = document.createElement('button');

    //CHANGE BUTTON TYPE
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal'); //OPEN MODAL
    if(mode === 'add')
    {
      button.setAttribute('data-target','#addEmployeeModal'); //WHICH MODAL
    }

    if(mode ==='edit')
    { 
      this.editEmployee=employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }

    if(mode == 'delete')
    {
      this.deleteEmployee=employee; 
      button.setAttribute('data-target','#deleteEmployeeModal');
    }

    container.appendChild(button);

    button.click();

  }
 

}