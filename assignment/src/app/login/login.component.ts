import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AdminLoginService } from '../services/login.service';
import { registerEmployeeServices } from '../services/register-employee.service';
import { Employee } from '../models/Employee.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  employeeId = '';
  password = '';
  error = false;



  constructor(private loginService: AdminLoginService, private router: Router,private employeeService:registerEmployeeServices) { }

  ngOnInit(): void {
  }

  loginStatus = false;

  login(form: NgForm): void {
    this.loginService.authenticateLogin(form.value.employeeId, form.value.password);
  }
}


 // if (this.username === 'admin' && this.password === 'admin123') {
    //   // Navigate to the home page or do something else on successful login
    //   console.log('Login successful');
    //   this.router.navigate(['/register-employee']);
    // } else if(this.username === 'employee' && this.password === 'employee123') {
    //   console.log( 'Login successful');
    //   this.router.navigate(['/submit-request']);
    // }
    // else if(this.username === 'supervisor' && this.password === 'supervisor123') {
    //   console.log('Login successful');
    //   this.router.navigate(['/review-request']);
    // }
    // else {
    //   // Show error message or do something else on failed login
    //   this.error = true;
    //   console.log('Login failed');
    // }
