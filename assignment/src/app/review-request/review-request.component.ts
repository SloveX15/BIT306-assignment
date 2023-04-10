import { Component, OnInit } from '@angular/core';
import { Request } from '../models/Request.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { submitRequestServices } from '../services/request.service';
import { ConfirmDialogComponent } from '../templates/confirm-dialog.componenet';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-review-request',
  templateUrl: './review-request.component.html',
  styleUrls: ['./review-request.component.css']
})
export class ReviewRequestComponent implements OnInit {
  selectedRequest!: Request;
  requests: Request[] = [];
  commentText: string = '';

  private requestSub! : Subscription;

  constructor(private router: Router, private submitRequestService: submitRequestServices,
    public dialog:MatDialog, ) { }

  onSelect(request: Request) {
    this.selectedRequest = request;
  }

  ngOnInit(): void {
    this.submitRequestService.getRequests();
    this.requestSub = this.submitRequestService.getDRequestUpdateListener()
      .subscribe((request:Request[])=> {
        this.requests = request;
      });
  }

  approveRequest() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data:{title:"Confirmation",message:"Are you sure you want to approve this request?"}});

    dialogRef.afterClosed().subscribe(result =>{
      if(result=='true'){
        alert("Request status has been updated to approve!")

        this.submitRequestService.updateRequest("6434257d2a26b50aa268a31c" ,this.selectedRequest.requestId, 'approved', this.commentText,
        this.selectedRequest.requestDate,this.selectedRequest.workType, this.selectedRequest.description,
        this.selectedRequest.reason,this.selectedRequest.employeeID);
      }
    })


  }

  rejectRequest() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data:{title:"Confirmation",message:"Are you sure you want to reject this request?"}});
    dialogRef.afterClosed().subscribe(result =>{
      if(result=='true'){
        alert("Request status has been updated to reject!")
      this.submitRequestService.updateRequest(this.selectedRequest._id ,this.selectedRequest.requestId, 'rejected', this.commentText,
      this.selectedRequest.requestDate,this.selectedRequest.workType, this.selectedRequest.description,
      this.selectedRequest.reason,this.selectedRequest.employeeID);
      }
    })

  }
}
  // approveRequest() {
  //   if (!this.selectedRequest) {
  //     console.error('No request selected.');
  //     return;
  //   }

  //   const message = 'Are you sure you want to approve this request?';
  //   this.confirmAction('Approve Request', message, () => {
  //     alert('Request has been approved!');
  //     this.submitRequestService.updateRequest(
  //       this.selectedRequest.requestId,
  //       'approved',
  //       ''
  //     );
  //   });
  // }

  // rejectRequest() {
  //   if (!this.selectedRequest) {
  //     console.error('No request selected.');
  //     return;
  //   }

  //   const message = 'Are you sure you want to reject this request?';
  //   this.confirmAction('Reject Request', message, () => {
  //     alert('Request has been rejected!');
  //       this.submitRequestService.updateRequest(
  //         this.selectedRequest.requestId,
  //         'rejected',
  //         ''
  //       );
  //   });
  // }

  // isRequestPending(): boolean {
  //   if (!this.selectedRequest) {
  //     console.error('No request selected.');
  //     return false;
  //   }

  //   if (this.selectedRequest.status !== 'pending') {
  //     const message =
  //       'This request is no longer pending. Do you want to proceed anyway?';
  //     return this.confirmAction('Confirm Action', message);
  //   }

  //   return true;
  // }

  // confirmAction(title: string, message: string, callback?: () => void): boolean {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     data: { title, message },
  //   });

  //   let returnValue = false;

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       if (callback) {
  //         callback();
  //       }
  //       returnValue = true;
  //     }
  //   });

  //   return returnValue;
  // }


