import { Injectable } from '@angular/core';
import { Department } from './department.model';
import { Employee } from './employee.model';

@Injectable({providedIn: 'root'})

export class EmployeeServices{
  private employees: Employee[]=[
    {
      employeeID: 'E001',
      password: 'password1',
      name: 'John Doe',
      position: 'supervisor',
      email: 'johndoe@example.com',
      FWAStatus: 'Full-time',
      department: {deptID: 'D001',deptName: 'Sales',flexiHours: 5,workFromHome: 7,hybrid: 2}
    },
    {
      employeeID: 'E002',
      password: 'password2',
      name: 'Jane Smith',
      position: 'employee',
      email: 'janesmith@example.com',
      FWAStatus: 'Part-time',
      department: {deptID: 'D002',deptName: 'IT',flexiHours: 5,workFromHome: 7,hybrid: 2}
    },
    {
      employeeID: 'E003',
      password: 'password3',
      name: 'Bob Johnson',
      position: 'supervisor',
      email: 'bobjohnson@example.com',
      FWAStatus: 'Full-time',
      department: {deptID: 'D003',deptName: 'Marketing',flexiHours: 5,workFromHome: 7,hybrid: 2}
    },
    {
      employeeID: 'E004',
      password: 'password4',
      name: 'Sara Lee',
      position: 'admin',
      email: 'saralee@example.com',
      FWAStatus: 'Full-time',
      department: {deptID: 'D004',deptName: 'Product',flexiHours: 5,workFromHome: 7,hybrid: 2}
    },
    {
      employeeID: 'E005',
      password: 'password5',
      name: 'Mike Brown',
      position: 'Sales Representative',
      email: 'mikebrown@example.com',
      FWAStatus: 'Part-time',
      department: {deptID: 'D005',deptName: 'Manage',flexiHours: 5,workFromHome: 7,hybrid: 2}
    }
  ];
  private employee!:Employee;

  getEmployees(){
    return this.employees;
  }

  getEmployee(empID:string){
    return this.employees.find(e => e.employeeID === empID)!;
  }

  storeCurrentEmployee(empID:string){
    this.employee = this.employees.find(e => e.employeeID === empID)!;
  }
  currentEmployee(){
    return this.employee;
  }
}
