import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from '../models/Request.model';
import { submitRequestServices } from '../services/request.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent implements OnInit {
  workTypes = ['flexi-hour', 'work-from-home', 'hybrid'];
  selectedWorkType: string = '';
  description: string = '';
  reason: string = '';
  requestId: number = Math.floor(Math.random() * 1000) + 1;
  requestDate: string = new Date().toISOString();
    
  // Set status to 'pending'
  status: string = 'pending';

  constructor(
    private router: Router,
    public submitRequestService: submitRequestServices
  ) { }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
  
    const requestId = Math.floor(Math.random() * 1000) + 1;
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
      ''
    );
    alert("Request have been submitted")
    // navigate to requests page
    this.router.navigate(['/review-request']);
  }
}
