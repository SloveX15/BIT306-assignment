import { Employee } from "../models/Employee.model";
import {Injectable} from '@angular/core';
import { Department } from "../models/Department.model";

@Injectable({providedIn: 'root'})

export class registerEmployeeServices{
    private empList : Employee  [] = [
        { employeeId: 1,password:"", name: 'John Smith',position:"", email:"", FWAstatus:"new", supervisorID:"S1001",department: { deptID: '1', deptName: 'Sales' ,flexiHours:0,workFromHome:0,hybrid:0} },
        { employeeId: 2,password:"", name: 'Jane Doe',position:"",email:"",FWAstatus:"new", supervisorID:"S1001",department: { deptID: '2', deptName: 'Marketing' ,flexiHours:0,workFromHome:0,hybrid:0} },
        { employeeId: 3,password:"", name: 'Bob Johnson', position:"",email:"",FWAstatus:"new",supervisorID:"S1001",department: { deptID: '3', deptName: 'HR' ,flexiHours:0,workFromHome:0,hybrid:0} },
      ];

    getEmployee(){
        return this.empList;
    }
    
    addEmployee( employeeId: number,
        password: string,
        name: string,
        position: string,
        email: string,
        FWAstatus: string,
        supervisorID:string,
        department:Department){
        const empsList: Employee = {employeeId:employeeId, password:password, name:name, position:position,email:email, FWAstatus:FWAstatus, supervisorID:supervisorID, department:department};
        this.empList.push(empsList);
      }
    
    

}