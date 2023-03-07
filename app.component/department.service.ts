import {Injectable} from '@angular/core';
import { Department } from './department.model';

@Injectable({providedIn: 'root'})

export class departmentServices{
  private departments: Department[]=[];




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
