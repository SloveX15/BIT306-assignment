import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/Employee.model';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent {
  selectedDepartment: string = '';
  departments = [
    { id: '1', name: 'Department 1' },
    { id: '2', name: 'Department 2' },
    { id: '3', name: 'Department 3' }
  ];
  // onSubmit() {
  //   // call the employeeService to add the new employee to the array
  //   this.employeeService.addEmployee(this.employee);
  //   // reset the form and employee object
  //   this.employee = new Employee();
  // }
    


  employeeName: string='';
  employeeID: string='';
  position: string='';
  email: string='';
  supervisorID: string='';
  employeeStatus = 'new';
  constructor(private router: Router) { }
  registerEmployee() {
    const selectedDepartment = this.departments.find(department => department.id === this.selectedDepartment);
    const departmentName = selectedDepartment ? selectedDepartment.name : undefined;

const employee = {
  department: departmentName,
  name: this.employeeName,
  id: this.employeeID,
  position: this.position,
  email: this.email,
  status: this.employeeStatus
};



    // TODO: Send the employee data to the server or perform any other necessary actions
    console.log(employee);
  }
}
