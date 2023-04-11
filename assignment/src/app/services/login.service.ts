import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Admin } from '../models/Admin.model';
import { Router } from "@angular/router";
import { map, Subject } from "rxjs";
import { Employee } from '../models/Employee.model';
import { registerEmployeeServices } from './register-employee.service';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminLoginService{
  private token!: string;
  private authStatusListener = new Subject<boolean>();
  private user!: Employee;
  private userSub! : Subscription;
  private employees: Employee[] = [];
  private isAuthenticated! : boolean;


  constructor(public router:Router, private http: HttpClient, public employeeService:registerEmployeeServices) { }


  private loggedInAdmin: Admin | undefined;

  authenticateLogin(employeeId: string, password: string) {
    const authdata = {employeeId: employeeId, password: password};
    this.http.post<{token: string, user:any}>('http://localhost:3001/api/users/login', authdata)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token) {
          this.isAuthenticated = true;
          // emit new value after getting the token
          this.authStatusListener.next(true);

        }
        console.log("token" , response);
        console.log(response.user);
        this.user = {
          id: response.user._id,
          employeeId: response.user.employeeId,
          password: response.user.password,
          name: response.user.name,
          position: response.user.position,
          email: response.user.email,
          FWAstatus: response.user.FWAstatus,
          supervisorID:response.user.supervisorID,
          deptID:response.user.deptID,
        }
        console.log('this user:',this.user);

        if(response.user.position == "Admin"){
            this.router.navigate(["admin-homepage"]);
        }else if (response.user.position == "Supervisor") {
          this.router.navigate(["review-request"]);
        } else {
          this.router.navigate(["ownSchedule"]);
        }

      });
  }

  getToken(){
    return this.token;
  }

  getUser():Employee{
    return this.user;
  }



  whoseLoggedIn(): Admin | undefined {
    return this.loggedInAdmin;
  }

  logout(){
    this.authStatusListener.next(false);
    this.token = "null";
  }

  isAdmin(): boolean {
    return this.loggedInAdmin?.userType === 'HR';
  }

  isEmployee(): boolean {
    return this.loggedInAdmin?.userType === 'Employee';
  }

  isSupervisor(): boolean {
    return this.loggedInAdmin?.userType === 'Supervisor';
  }
}
