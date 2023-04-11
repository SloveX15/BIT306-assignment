import { Employee } from "../models/Employee.model";
import {Injectable} from '@angular/core';
import { Department } from "../models/Department.model";
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})

export class registerEmployeeServices {
    private empList : Employee  [] = [];
      private empUpdated = new Subject<Request[]>();


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
        const empsList: Employee = {id:id,employeeId:employeeId, password:password, name:name, position:position,email:email, FWAstatus:FWAstatus, supervisorID:supervisorID, department:department};
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

      getDEmpuestUpdateListener(){
        return this.empUpdated.asObservable();
      }

}
