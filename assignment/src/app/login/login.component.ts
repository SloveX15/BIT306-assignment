import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { adminLoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';

  password: string = '';
  error: boolean = false;

  
  constructor(
    private loginService: adminLoginService,
    private router: Router
    ) { }
  ngOnInit(): void {}

  loginStatus = false;

  login(form: NgForm) {
    if(form.invalid){
      return alert("Invalid username or password!");
    }
    this.loginStatus = this.loginService.authenticateLogin(form.value.username,form.value.password);

    if(this.loginStatus) {
      this.router.navigate(['admin-homepage']);
    }
   
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