import { Request } from "../models/Request.model";
import { Injectable } from '@angular/core';
//import { AuthService } from '../auth/auth.service';
import {Subject} from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import * as e from "express";
@Injectable({providedIn: 'root'})

export class submitRequestServices {
  private dRequests: Request[] = [];
  private reqUpdated = new Subject<Request[]>();
  constructor(private http:HttpClient, private router : Router){}

  getRequests() {
    this.http.get<{ message: String, dRequests: any }>('http://localhost:3001/api/request')
    .pipe(map((dRequestData)=>{
      console.log(dRequestData);
      if(dRequestData.dRequests){
        return dRequestData.dRequests.map((dRequests: { _id: any; requestId: any; requestDate: any;
           workType: any; description: any; reason: any;
          status: any; comment: any; employeeId: any; })=>{
          return{
            _id: dRequests._id,
            reqId : dRequests.requestId,
          reqDate : dRequests.requestDate,
          workType : dRequests.workType,
          description : dRequests.description,
          reason : dRequests.reason,
          status : dRequests.status,
          comment :dRequests.comment,
          employeeId : dRequests.employeeId,

          }
        });
      }else{
        return [];
      }
    }))
    .subscribe(transformedRequest => {
      console.log('Response:', transformedRequest);
      this.dRequests = transformedRequest;
      this.reqUpdated.next([...this.dRequests]);
      console.log(this.dRequests);
    },
    error => {
        console.log('Error:', error);
    }
  );
  }

  getDRequestUpdateListener(){
    return this.reqUpdated.asObservable();
  }


  addRequest(
    requestId: string,
    requestDate: Date,
    workType: string,
    description: string,
    reason: string,
    status: string,
    comment: string,
    employeeID: string,
  ) {
    // Get the current user's employee ID
    //const employeeID = this.authService.getCurrentUser().employeeID;

    const dRequest: Request = {
      _id:'null',
      requestId: requestId,
      requestDate: requestDate,
      workType: workType,
      description: description,
      reason: reason,
      status: status,
      comment: comment,
      employeeID: employeeID
    };
    this.http.post<{message:string,dRequestId: string}>('http://localhost:3001/api/request',dRequest)
      .subscribe((responseData)=>{
        // console.log(responseData.message);
        const id = responseData.dRequestId;
        dRequest._id = id;
        this.dRequests.push(dRequest);
        this.reqUpdated.next([...this.dRequests]);
        console.log("Daily Schedule added sucessfulyy " ,dRequest);
      })

    this.dRequests.push(dRequest);
  }

  updateRequest(id:string, requestId: string, newStatus: string, newCommnet:string, reqDate:Date,
    workType:string, description: string, reason:string, employeeID:string) {
    const request : Request = {_id:id, requestId: requestId, status: newStatus,
       comment:newCommnet, requestDate:reqDate, workType:workType, description:description,
      reason:reason, employeeID:employeeID};
    this.http.put('http://localhost:3001/api/request/' + id , request)
    .subscribe(response => console.log (response));
  }
}

