import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [

  { path: 'login',component: LoginComponent},
  { path: '',redirectTo:'/login',pathMatch:'full'},
  { path: 'dashboard',component: DashboardComponent},
  { path: 'employee-list',component: EmployeeListComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
