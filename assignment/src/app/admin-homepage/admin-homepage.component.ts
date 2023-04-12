import { Component, OnInit, Input } from "@angular/core";
import { Employee } from "../models/Employee.model";
import { registerEmployeeServices } from "../services/register-employee.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { AdminLoginService } from '../services/login.service';
@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit{
  private employeeSub!: Subscription;

  displayedColumns: string[] = ['position', 'name', 'email', 'department'];

  constructor(private employeeService: registerEmployeeServices,public route: ActivatedRoute,
    public authenticateService:AdminLoginService, ) { }
  empList : Employee  [] = [];
  employee!:Employee;
  empID!:string;
  id!:string;




  ngOnInit() {
    this.employeeService.getEmployees();
    this.employeeSub = this.employeeService.getEmpListUpdateListener()
      .subscribe((emp:Employee[])=> {
        this.empList = emp;
      });
      this.route.params.subscribe(params => {
        console.log(params['employeeId']);
          this.empID = params['employeeId'];
          this.employee = this.authenticateService.getUser();
      });
      console.log(this.employee);
      this.id = this.employee.id;
  }


}
