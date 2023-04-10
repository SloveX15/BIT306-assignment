import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from '../models/Request.model';
import { Employee } from '../models/Employee.model';
import { submitRequestServices } from '../services/request.service';
import { registerEmployeeServices } from '../services/register-employee.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent implements OnInit {
  requests: Request [] = [];
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
    public employeeService: registerEmployeeServices
  ) { }

  ngOnInit(): void
  {
    this.employee = this.employeeService.currentEmployee();
    this.employeeID = this.employee.employeeId;
    this.submitRequestService.getRequests();
    this.requestSub = this.submitRequestService.getDRequestUpdateListener()
      .subscribe((request:Request[])=> {
        this.requests = request;
      });
  }


  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out all required fields.');
      return;
    }


    const requestId = this.requests.length+1;
    const requestDate = new Date();
    const workType = form.value.workType;
    const description = form.value.description;
    const reason = form.value.reason;
    const status = 'pending';

    this.submitRequestService.addRequest(
      requestId.toString(),
      requestDate,
      workType,
      description,
      reason,
      status,
      '',
      this.employeeID
    );
    alert("Request have been submitted")
    // navigate to requests page
    //this.router.navigate(['/review-request']);
  }
}
