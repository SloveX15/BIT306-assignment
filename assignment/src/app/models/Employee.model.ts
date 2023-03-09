import { Department } from "./Department.model";

export interface Employee {
    employeeId: number;
    password: string;
    name: string;
    position: string;
    email: string;
    FWAstatus: string;
    supervisorID:string;
    department:Department;
   }