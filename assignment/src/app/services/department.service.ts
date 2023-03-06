import { Injectable } from '@angular/core';
import { Department } from '../models/Department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  private deptList: Department[] = [
    {deptID: 'HUFDCT', deptName: 'Digital Technology'},
    {deptID: 'HUFDCT', deptName: 'Digital Technology'},
    {deptID: 'HUFDCT', deptName: 'Digital Technology'},
    {deptID: 'HUFDCT', deptName: 'Digital Technology'},
    {deptID: 'HUFDCT', deptName: 'Digital Technology'},

  ];



  getDepartments() {
    return this.deptList;
  }

}
