import { Component, OnInit } from '@angular/core';
import { submitRequestServices } from '../services/request.service';
import { Request } from '../models/Request.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.component.html',
  styleUrls: ['./request-history.component.css']
})
export class RequestHistoryComponent implements OnInit {
  passedRequests: Request[] = [];

  constructor(private router: Router, private submitRequestService: submitRequestServices,
    public dialog:MatDialog,) { }

  ngOnInit(): void {
    this.submitRequestService.getRequests();
    this.requestSub = this.submitRequestService.getDRequestUpdateListener()
      .subscribe((request:Request[])=> {
        this.passedRequests = request.filter(request => request.status !== 'pending');
      });
  }

  selectedRequest!: Request;
  
  
  

  private requestSub! : Subscription;



  onSelect(request: Request) {
    this.selectedRequest = request;
  }

}


