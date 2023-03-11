import { Employee } from "../models/Employee.model";
import {Injectable} from '@angular/core';
import { Department } from "../models/Department.model";

@Injectable({providedIn: 'root'})

export class registerEmployeeServices{
    private empList : Employee  [] = [
        { employeeId: "a",password:"", name: 'John Smith',position:"", email:"", FWAstatus:"new", supervisorID:"S1001",department: { deptID: '1', deptName: 'Sales' ,flexiHours:0,workFromHome:0,hybrid:0} },
        { employeeId: "b",password:"", name: 'Jane Doe',position:"",email:"",FWAstatus:"new", supervisorID:"S1001",department: { deptID: '2', deptName: 'Marketing' ,flexiHours:0,workFromHome:0,hybrid:0} },
        { employeeId: "c",password:"", name: 'Bob Johnson', position:"",email:"",FWAstatus:"new",supervisorID:"S1001",department: { deptID: '3', deptName: 'HR' ,flexiHours:0,workFromHome:0,hybrid:0} },
      ];

    
    
    addEmployee( employeeId: string,
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
    
      private employee!:Employee;

      getEmployees(){
        return this.empList;
      }
    
      getEmployeeById(empID:string){
        return this.empList.find(e => e.employeeId === empID)!;
      }
    
      storeCurrentEmployee(empID:string){
        this.employee = this.empList.find(e => e.employeeId === empID)!;
      }
      currentEmployee(){
        return this.employee;
      }

}