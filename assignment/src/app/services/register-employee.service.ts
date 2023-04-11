import { Employee } from "../models/Employee.model";
import {Injectable} from '@angular/core';
import { Department } from "../models/Department.model";
import { HttpClient } from "@angular/common/http";
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
@Injectable({providedIn: 'root'})

export class registerEmployeeServices{
    private empList : Employee  [] = [];
    private empListUpdated = new Subject<Employee[]>();
    constructor(private http:HttpClient, private router : Router){}


    addEmployee(
      id:string, 
      employeeId: string,
        password: string,
        name: string,
        position: string,
        email: string,
        FWAstatus: string,
        supervisorID:string,
        department:Department){
        const empsList: Employee = {id:'null',employeeId:employeeId, password:password, name:name, position:position,email:email, FWAstatus:FWAstatus, supervisorID:supervisorID, department:department};
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
