import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public onLogin(loginForm: NgForm): void{

    if(loginForm.value.username==='zuka' && loginForm.value.password==='zuka')
    {
      this.navigateToDashboard();
    }else{
      alert("INVALID LOGINS");
    }
  }

  public navigateToDashboard():void{
    this.router.navigateByUrl("/dashboard");
  }

}
