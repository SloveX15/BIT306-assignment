import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent implements OnInit {
  workTypes = ['Type 1', 'Type 2', 'Type 3'];
  selectedWorkType: string = '';
  description: string = '';
  reason: string = '';
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    // Generate request ID and date
    const requestId = Math.floor(Math.random() * 1000) + 1;
    const requestDate = new Date().toISOString();
    
    // Set status to 'pending'
    const status = 'pending';
    
    // Create request object
    const request = {
      requestId,
      requestDate,
      workType: this.selectedWorkType,
      description: this.description,
      reason: this.reason,
      status
    };
    
    console.log(request);
  }
}
