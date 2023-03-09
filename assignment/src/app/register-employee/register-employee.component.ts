import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/Employee.model';
import { Department } from '../models/Department.model';
import { registerEmployeeServices } from '../services/register-employee.service';
import { DepartmentService } from '../services/department.service';
import { NgForm } from '@angular/forms';





@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
  export class RegisterEmployeeComponent implements OnInit{
    employeeID!: number;
  
    employeeName!: string;
  position!: string;
  email!: string;
  FWAstatus!: string;
  supervisorID!: string;
  department!: Department;

  constructor(private registerEmployeeServices: registerEmployeeServices,
    public departmentService: DepartmentService,
    private router: Router) { }

  addEmployee() {
    const newEmployee: Employee = {
      employeeId: this.employeeID,
      password: this.generatePassword(),
      name: this.employeeName,
      position: this.position,
      email: this.email,
      FWAstatus: this.FWAstatus,
      supervisorID:this.supervisorID,
      department: this.departmentService.getDepartment(this.selectedDepartment)
    };
    this.registerEmployeeServices.addEmployee(newEmployee.employeeId, newEmployee.password, 
      newEmployee.name, newEmployee.position, newEmployee.email, newEmployee.FWAstatus, newEmployee.supervisorID,
       newEmployee.department);

       alert("Employee registered successfully!");
    this.router.navigate(['admin-homepage']);
    
  }
    selectedDepartment: string = '';
    
   
    departments : Department[] =[];
    
    

    

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
  }
}

