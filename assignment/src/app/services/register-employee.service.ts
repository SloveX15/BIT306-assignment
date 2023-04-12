import { Employee } from "../models/Employee.model";
import {Injectable} from '@angular/core';
import { Department } from "../models/Department.model";
import { HttpClient } from "@angular/common/http";
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import { response } from "express";
@Injectable({providedIn: 'root'})

export class registerEmployeeServices{
    private empList : Employee  [] = [];
    private empListUpdated = new Subject<Employee[]>();
    constructor(private http:HttpClient, private router : Router){}
    private employeeUpdated = new Subject<Employee[]>();

    addEmployee(
      id:string,
      employeeId: string,
        password: string,
        name: string,
        position: string,
        email: string,
        FWAstatus: string,
        supervisorID:string,
        deptID:string){
        const empsList: Employee = {id:'null',employeeId:employeeId, password:password, name:name,
         position:position,email:email, 
        FWAstatus:FWAstatus, supervisorID:supervisorID, deptID:deptID};
        this.http.post<{message:string,reqId: string}>('http://localhost:3001/api/users',empsList)
      .subscribe((responseData)=>{
        // console.log(responseData.message);
        const id = responseData.reqId;
        empsList.id = id;
        this.empList.push(empsList);
        this.empListUpdated.next([...this.empList]);
        this.router.navigate(['/']);
        console.log("Employee added sucessfulyy " ,empsList);
      })
        this.empList.push(empsList);
      }

      private employee!:Employee;

      getEmployees(){
        this.http.get<{ message: String, users: any }>('http://localhost:3001/api/users')
    .pipe(map((UData)=>{
      console.log(UData);
      if(UData.users){
        return UData.users.map((dRequests: { _id: any; employeeId: any; password: any; name: any; position: any; email: any; FWAstatus: any; supervisorID: any; deptID: any; })=>{
          return{
            id: dRequests._id,
            employeeId: dRequests.employeeId,
            password : dRequests.password,
            name : dRequests.name,
            position : dRequests.position,
            email : dRequests.email,
            FWAstatus : dRequests.FWAstatus,
            supervisorID : dRequests.supervisorID,
            deptID: dRequests.deptID

          }
        });
      }else{
        return [];
      }
    }))
    .subscribe(transformedU => {
      console.log('Response:', transformedU);
      this.empList = transformedU;
      this.employeeUpdated.next([...this.empList]);
      console.log(this.empList);
    },
    error => {
        console.log('Error:', error);
    }
  );
        return this.empList;
      }

      getEmpListUpdateListener(){
        return this.empListUpdated.asObservable();
      }


      storeCurrentEmployee(empID:string){
        this.employee = this.empList.find(e => e.employeeId === empID)!;
      }
      currentEmployee(){
        return this.employee;
      }

}
