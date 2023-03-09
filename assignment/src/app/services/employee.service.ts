import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/Employee.model'; 
import { Department } from '../models/Department.model'; 

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[] = [
 
    // add more employees here
  ];

  constructor() { }

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

 

  getEmployeesByDepartment(): { [key: string]: Employee[] } {
    const employeesByDepartment: { [key: string]: Employee[] } = {};
    for (const employee of this.employees) {
      const deptName = employee.department.deptName;
      if (!employeesByDepartment[deptName]) {
        employeesByDepartment[deptName] = [];
      }
      employeesByDepartment[deptName].push(employee);
    }
    return employeesByDepartment;
  }
}
