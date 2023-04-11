import { Department } from "./Department.model";

export interface Employee {
    id:string;
    employeeId: string;
    password: string;
    name: string;
    position: string;
    email: string;
    FWAstatus: string;
    supervisorID:string;
    department:Department;
   }
