import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/Employee.model';
import { Department } from '../models/Department.model';
import { registerEmployeeServices } from '../services/register-employee.service';
import { DepartmentService } from '../services/department.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { AdminLoginService } from '../services/login.service';



@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
  export class RegisterEmployeeComponent implements OnInit{
    id!:string;
    empID!: string;
    employeeName!: string;
    employee!:Employee;
  position!: string;
  email!: string;
  FWAstatus!: string;
  supervisorID!: string;

  department!: string;

  //empList : Employee []=[];
  private employeeSub! : Subscription;


  constructor(private registerEmployeeServices: registerEmployeeServices,
    public departmentService: DepartmentService,
    private router: Router, public authenticateService: AdminLoginService,public route: ActivatedRoute,) { }

  addEmployee() {
    if (!this.selectedDepartment || !this.employeeName || !this.empID || !this.position || !this.email) {
      alert('Please fill out all required fields');
      return;
    }
    const newEmployee: Employee = {
      id: "null",
      employeeId: this.empID,
      password: "tiong123",
      name: this.employeeName,
      position: this.position,
      email: this.email,
      FWAstatus: this.FWAstatus,
      supervisorID:this.supervisorID,
      deptID: this.selectedDepartment
    };
    this.registerEmployeeServices.addEmployee(newEmployee.id,newEmployee.employeeId, newEmployee.password,
      newEmployee.name, newEmployee.position, newEmployee.email, newEmployee.FWAstatus, newEmployee.supervisorID,
       newEmployee.deptID);

       alert("Employee registered successfully!");
    this.router.navigate(['admin-homepage']);

  }
    selectedDepartment: string = '';


    departments : Department[] =[];


    checkSupervisorID(supervisorID: string): boolean {
      const employees = this.registerEmployeeServices.getEmployees();
      return employees.some((employee) => employee.employeeId === supervisorID && employee.position === 'Supervisor');
    }



  generatePassword() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }



  ngOnInit(): void {
    this.departments = this.departmentService.getDepartments();
    this.route.params.subscribe(params => {
      console.log(params['employeeId']);
        this.empID = params['employeeId'];
        this.employee = this.authenticateService.getUser();
    });
    console.log(this.employee);
    this.id = this.employee.id;

  }

  onLogout(){
    this.authenticateService.logout();
  }
}

