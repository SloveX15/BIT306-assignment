import {Injectable} from '@angular/core';
import { FWARequest } from './FWARequest.model';

@Injectable({providedIn: 'root'})

export class FWARequestServices{
  private fwaRequests: FWARequest[]=[
    { requestID: 'req1', requestDate: new Date('2023-03-01'), workType: 'Flexi Hours', description: 'Working 8 hours', reason: 'Doctor appointment', status: 'Approved', comment: '', employeeID: 'E001' },
    { requestID: 'req2', requestDate: new Date('2023-03-02'), workType: 'Work from Home', description: 'Working on project A', reason: 'Childcare', status: 'Pending', comment: '', employeeID: 'E002' },
    { requestID: 'req3', requestDate: new Date('2023-03-03'), workType: 'Hybrid', description: 'Working on project B', reason: 'Travel', status: 'Declined', comment: '', employeeID: 'E003' },
    { requestID: 'req4', requestDate: new Date('2023-03-04'), workType: 'Work from Home', description: 'Working on project C', reason: 'Feeling unwell', status: 'Approved', comment: '', employeeID: 'E004' },
    { requestID: 'req5', requestDate: new Date('2023-03-05'), workType: 'Flexi Hours', description: 'Working 6 hours', reason: 'Personal appointment', status: 'Pending', comment: '', employeeID: 'E005' },
  ];

  getFWARequests(){
    return this.fwaRequests;
  }
}
