import { Component } from '@angular/core';

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
  employeeName: string='';
  employeeID: string='';
  position: string='';
  email: string='';
  employeeStatus = 'new';

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
