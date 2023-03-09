import { Component, OnInit } from '@angular/core';
import { Request } from '../models/Request.model';
import { Router } from '@angular/router';
import { submitRequestServices } from '../services/request.service';
@Component({
selector: 'app-review-request',
templateUrl: './review-request.component.html',
styleUrls: ['./review-request.component.css']
})
export class ReviewRequestComponent implements OnInit {
selectedRequest!: Request;
requests: Request[] = [
    
];
constructor(private router: Router, private submitRequestService: submitRequestServices) { }

onSelect(request: Request) {
    this.selectedRequest = request;
  }

ngOnInit(): void {
    this.requests = this.submitRequestService.getRequests();
}

approveRequest() {
    alert("Request have been updated!")
    this.submitRequestService.updateRequest(this.selectedRequest.requestId, 'approved', '');
  }
  
  rejectRequest() {
    alert("Request have been updated!")
    this.submitRequestService.updateRequest(this.selectedRequest.requestId, 'rejected', '');
  }

}




