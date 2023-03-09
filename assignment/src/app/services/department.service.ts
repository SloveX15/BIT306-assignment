import { Injectable } from '@angular/core';
import { Department } from '../models/Department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  private departments: Department[] = [
    {deptID: 'IT', deptName: ' IT',flexiHours:0,workFromHome:0,hybrid:0},
    {deptID: 'MKT', deptName: 'Marketing',flexiHours:0,workFromHome:0,hybrid:0},
    {deptID: 'SLS', deptName: 'Sales',flexiHours:0,workFromHome:0,hybrid:0},
    {deptID: 'DSG', deptName: 'Design',flexiHours:0,workFromHome:0,hybrid:0},
    {deptID: 'OP', deptName: 'Operation',flexiHours:0,workFromHome:0,hybrid:0},

  ];



  getDepartments() {
    return this.departments;
  }

  getDepartment(deptID: string): Department {
    return this.departments.find(dept => dept.deptID === deptID)!;
  }

}
