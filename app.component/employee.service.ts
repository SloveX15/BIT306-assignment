import { Injectable } from '@angular/core';
import { Employee } from './employee.model';

@Injectable({providedIn: 'root'})

export class EmployeeServices{
  private employees: Employee[]=[
    {
      employeeID: 'E001',
      password: 'password1',
      name: 'John Doe',
      position: 'Manager',
      email: 'johndoe@example.com',
      FWAStatus: 'Full-time',
      deptID: 'D001'
    },
    {
      employeeID: 'E002',
      password: 'password2',
      name: 'Jane Smith',
      position: 'Developer',
      email: 'janesmith@example.com',
      FWAStatus: 'Part-time',
      deptID: 'D002'
    },
    {
      employeeID: 'E003',
      password: 'password3',
      name: 'Bob Johnson',
      position: 'Designer',
      email: 'bobjohnson@example.com',
      FWAStatus: 'Full-time',
      deptID: 'D003'
    },
    {
      employeeID: 'E004',
      password: 'password4',
      name: 'Sara Lee',
      position: 'Marketing Manager',
      email: 'saralee@example.com',
      FWAStatus: 'Full-time',
      deptID: 'D004'
    },
    {
      employeeID: 'E005',
      password: 'password5',
      name: 'Mike Brown',
      position: 'Sales Representative',
      email: 'mikebrown@example.com',
      FWAStatus: 'Part-time',
      deptID: 'D005'
    }
  ];

  getEmployees(){
    return this.employees;
  }

}
