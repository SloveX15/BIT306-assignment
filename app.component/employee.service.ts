import { Injectable } from '@angular/core';
import { Employee } from './employee.model';

@Injectable({providedIn: 'root'})

export class EmployeeServices{
  private employees: Employee[]=[];

  getEmployees(){
    return this.employees;
  }

}
