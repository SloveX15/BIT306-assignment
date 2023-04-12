import { Injectable } from '@angular/core';
import { Department } from '../models/Department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  private departments: Department[] = [
    {deptID: 'IT', deptName: 'IT',flexiHours:2,workFromHome:0,hybrid:0},
    {deptID: 'MKT', deptName: 'Marketing',flexiHours:0,workFromHome:0,hybrid:1},
    {deptID: 'SLS', deptName: 'Sales',flexiHours:0,workFromHome:0,hybrid:0},
    {deptID: 'DSG', deptName: 'Design',flexiHours:0,workFromHome:0,hybrid:0},
    {deptID: 'OP', deptName: 'Operation',flexiHours:0,workFromHome:0,hybrid:0},

  ];



  getDepartments() {
    return this.departments;
  }

  getDepartmentID(deptID: string): Department {
    return this.departments.find(dept => dept.deptID === deptID)!;
  }




  updateWorkType(deptID: string, deptName: string, flexiHours:number, workFromHome:number, hybrid:number) {
    const dIndex = this.departments.findIndex(d => d.deptID === deptID);
    if (dIndex >= 0) {
      this.departments[dIndex] = {deptID, deptName, flexiHours, workFromHome, hybrid};
      // You can also save the updated data to the database using an HTTP request
    }
  }

  getDepartmentName(departmentName: string): Department {
    return this.departments.find(dept => dept.deptName === departmentName)!;
  }

}
