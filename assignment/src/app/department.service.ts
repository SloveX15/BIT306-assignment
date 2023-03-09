import {Injectable} from '@angular/core';
import { Department } from './department.model';

@Injectable({providedIn: 'root'})

export class departmentServices{
  private departments: Department[]=[
    {deptID: 'D001',deptName: 'Sales',flexiHours: 5,workFromHome: 7,hybrid: 2},
    {deptID: 'D002',deptName: 'IT',flexiHours: 4,workFromHome: 3,hybrid: 2},
    {deptID: 'D003',deptName: 'Marketing',flexiHours: 5,workFromHome: 0,hybrid: 3},
    {deptID: 'D004',deptName: 'Product',flexiHours: 4,workFromHome: 5,hybrid: 9},
    {deptID: 'D005',deptName: 'Manage',flexiHours: 2,workFromHome: 3,hybrid: 2},
  ];

  getDepartments(){
    return this.departments;
  }

  updateWorkType(deptID: string, deptName: string, flexiHours:number, workFromHome:number, hybrid:number) {
    const dIndex = this.departments.findIndex(d => d.deptID === deptID);
    if (dIndex >= 0) {
      this.departments[dIndex] = {deptID, deptName, flexiHours, workFromHome, hybrid};
      // You can also save the updated data to the database using an HTTP request
    }
  }

  getDepartment(departmentName: string): Department {
    return this.departments.find(dept => dept.deptName === departmentName)!;
  }

}
