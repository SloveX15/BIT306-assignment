import { Employee } from "../models/Employee.model";
import {Injectable} from '@angular/core';
import { Department } from "../models/Department.model";

@Injectable({providedIn: 'root'})

export class registerEmployeeServices{
    private empList : Employee  [] = [
        { employeeId: "E001",password:"", name: 'John Smith',position:"employee", email:"johm@gmail.com", FWAstatus:"new", supervisorID:"S1001",department: { deptID: 'IT', deptName: 'Sales' ,flexiHours:0,workFromHome:0,hybrid:0} },
        { employeeId: "E002",password:"", name: 'Jane Doe',position:"employee",email:"jane@gmail.com",FWAstatus:"new", supervisorID:"S1001",department: { deptID: 'IT', deptName: 'Marketing' ,flexiHours:0,workFromHome:0,hybrid:0} },
        { employeeId: "E003",password:"", name: 'Bob Johnson', position:"supervisor",email:"bob@gmail.com",FWAstatus:"new",supervisorID:"S1001",department: { deptID: 'MKT', deptName: 'HR' ,flexiHours:0,workFromHome:0,hybrid:0} },
        { employeeId: "E004",password:"", name: 'Megan Chris', position:"supervisor",email:"megan@gmail.com",FWAstatus:"new",supervisorID:"S1001",department: { deptID: 'MKT', deptName: 'HR' ,flexiHours:0,workFromHome:0,hybrid:0} },
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