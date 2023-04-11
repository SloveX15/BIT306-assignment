import { Component, OnInit } from '@angular/core';
import { submitRequestServices } from '../services/request.service';
import { Request } from '../models/Request.model';

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.component.html',
  styleUrls: ['./request-history.component.css']
})
export class RequestHistoryComponent implements OnInit {
  requests: Request[] = [];

  constructor(private submitRequestService: submitRequestServices) { }

  ngOnInit(): void {
    // Get the current user's employee ID
    const employeeID = '12345'; // Replace with actual employee ID

    // Retrieve the user's request history
    this.submitRequestService.getRequestsByEmployee(employeeID);

    // Subscribe to changes in the requests array
    this.submitRequestService.getDRequestUpdateListener()
      .subscribe((requests: Request[]) => {
        this.requests = requests;
      });
  }
}
