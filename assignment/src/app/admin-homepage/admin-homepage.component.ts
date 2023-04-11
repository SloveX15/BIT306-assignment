import { Component, OnInit, Input } from "@angular/core";
import { Employee } from "../models/Employee.model";
import { registerEmployeeServices } from "../services/register-employee.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit{
  private employeeSub!: Subscription;

  displayedColumns: string[] = ['position', 'name', 'email', 'department'];

  constructor(private employeeService: registerEmployeeServices ) { }
  empList : Employee  [] = [];




  ngOnInit() {
    this.employeeService.getEmployees();
    this.employeeSub = this.employeeService.getEmpListUpdateListener()
      .subscribe((emp:Employee[])=> {
        this.empList = emp;
      });
  }


}
