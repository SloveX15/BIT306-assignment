import { Request } from "../models/Request.model";
import { Injectable } from '@angular/core';
//import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})

export class submitRequestServices {
  private requests: Request[] = [{
    requestId: 1,
    requestDate: '2023-02-25T16:36:01.000Z',
    workType: 'Type 1',
    description: 'Description 1',
    reason: 'Reason 1',
    status: 'pending',
    comment: '',
    employeeID: "EMP101"
    },
    {
    requestId: 2,
    requestDate: '2023-02-24T10:05:22.000Z',
    workType: 'Type 2',
    description: 'Description 2',
    reason: 'Reason 2',
    status: 'approved',
    comment:'',
    employeeID: "EMP102"
    }];

  //onstructor(private authService: AuthService) {}

  getRequests() {
    return this.requests;
  }

  addRequest(
    requestId: number,
    requestDate: string,
    workType: string,
    description: string,
    reason: string,
    status: string,
    comment: string,
    employeeID: string,
  ) {
    // Get the current user's employee ID
    //const employeeID = this.authService.getCurrentUser().employeeID;

    const request: Request = {
      requestId: requestId,
      requestDate: requestDate,
      workType: workType,
      description: description,
      reason: reason,
      status: status,
      comment: comment,
      employeeID: employeeID
    };
    this.requests.push(request);
  }

  updateRequest(requestId: number, newStatus: string, newCommnet:string) {
    const index = this.requests.findIndex(request => request.requestId === requestId);
    if (index !== -1) {
      this.requests[index].status = newStatus;
      this.requests[index].comment = newCommnet;
    }
  }
}

