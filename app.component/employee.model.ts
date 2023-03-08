import { Department } from "./department.model";
export interface Employee{
  employeeID:string;
  password:string;
  name:string;
  position:string;
  email:string;
  FWAStatus:string;
  department:Department;
}
