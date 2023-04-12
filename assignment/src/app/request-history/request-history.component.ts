import { Component, OnInit } from '@angular/core';
import { submitRequestServices } from '../services/request.service';
import { Request } from '../models/Request.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminLoginService } from '../services/login.service';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '../models/Employee.model';
@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.component.html',
  styleUrls: ['./request-history.component.css']
})
export class RequestHistoryComponent implements OnInit {
  id!:string;
  empID!:string;
  employee!:Employee;
  passedRequests: Request[] = [];

  constructor(private router: Router, private submitRequestService: submitRequestServices,
    public dialog:MatDialog,public route: ActivatedRoute, public authenticateService:AdminLoginService) { }

  ngOnInit(): void {
    this.submitRequestService.getRequests();
    this.requestSub = this.submitRequestService.getDRequestUpdateListener()
      .subscribe((request:Request[])=> {
        this.passedRequests = request.filter(request => request.status !== 'pending');
      });
      this.route.params.subscribe(params => {
        console.log(params['employeeId']);
          this.empID = params['employeeId'];
          this.employee = this.authenticateService.getUser();
      });
      console.log(this.employee);
      this.id = this.employee.id;
  }

  selectedRequest!: Request;




  private requestSub! : Subscription;



  onSelect(request: Request) {
    this.selectedRequest = request;
  }

  onLogout(){
    this.authenticateService.logout();
  }

}


