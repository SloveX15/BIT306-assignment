import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from '../models/Request.model';
import { Employee } from '../models/Employee.model';
import { submitRequestServices } from '../services/request.service';
import { registerEmployeeServices } from '../services/register-employee.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { AdminLoginService } from '../services/login.service';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent implements OnInit {
  id!:String;
  empID!:String;
  Requests: Request [] = [];
  employee!:Employee;
  employeeID! :string;
  workTypes = ['flexi-hour', 'work-from-home', 'hybrid'];
  selectedWorkType: string = '';
  description: string = '';
  reason: string = '';
  requestId: number =  1;
  requestDate: string = new Date().toISOString();

  // Set status to 'pending'
  status: string = 'pending';

  private requestSub! : Subscription;

  constructor(
    private router: Router,
    public submitRequestService: submitRequestServices,
    public employeeService: registerEmployeeServices,
    public authenticateService: AdminLoginService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void
  {
    this.route.params.subscribe(params => {
      console.log(params['employeeId']);
        this.empID = params['employeeId'];
        this.employee = this.authenticateService.getUser();
    });
    console.log("Submit request",this.employee);
    this.submitRequestService.getRequests();
    this.requestSub = this.submitRequestService.getDRequestUpdateListener()
      .subscribe((request:Request[])=> {
        this.Requests = request;
      });
    this.id = this.employee.id;
  }


  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out all required fields.');
      return;
    }


    const reqId = this.Requests.length+1;
    const reqDate = new Date();
    const workType = form.value.workType;
    const description = form.value.description;
    const reason = form.value.reason;
    const status = 'pending';

    this.submitRequestService.addRequest(
      reqId.toString(),
      reqDate,
      workType,
      description,
      reason,
      'pending',
      '',
      this.employeeID
    );
    alert("Request have been submitted")
    // navigate to requests page
    //this.router.navigate(['/review-request']);
  }

  onLogout(){
    this.authenticateService.logout();
  }
}
