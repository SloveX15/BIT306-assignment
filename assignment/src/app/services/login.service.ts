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


  constructor(public router:Router, private http: HttpClient, public employeeService:registerEmployeeServices) { }


  private loggedInAdmin: Admin | undefined;

  authenticateLogin(employeeId: string, password: string) {
    const authdata = {username: employeeId, password: password};
    this.http.post<{token: string, users: any}>('http://localhost:3001/api/users', authdata)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.authStatusListener.next(true);

        this.user = {
          id: response.users._id,
          employeeId: response.users.employeeId,
          password: response.users.password,
          name: response.users.name,
          position: response.users.position,
          email: response.users.email,
          FWAstatus: response.users.FWAstatus,
          supervisorID:response.users.supervisorID,
          department:response.users.department,
        }

        if(response.users.position == "Admin"){
            this.router.navigate(["admin-homepage"]);
        }else if (response.users.position == "Supervisor") {
          this.router.navigate(["review-request"]);
        } else {
          this.router.navigate(["schoolAdmin"]);
        }{
            this.router.navigate(["ownSchedule"]);
        }
      });
  }

  whoseLoggedIn(): Admin | undefined {
    return this.loggedInAdmin;
  }

  logout(): void {
    this.loggedInAdmin = undefined;
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
