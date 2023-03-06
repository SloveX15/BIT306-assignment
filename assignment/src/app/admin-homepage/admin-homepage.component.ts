import { Component, OnInit, Input } from "@angular/core";
import { DepartmentService } from "src/app/services/department.service";
import { Department } from "../models/Department.model";
import { MatTableDataSource } from "@angular/material/table";


@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit{
  
  @Input() tableData: unknown[] | undefined;
  @Input() columnHeader: any;
  objectKeys = Object.keys;
  dataSource!: MatTableDataSource<unknown>;

  departments: Department[] = [];

  constructor(public departmentService: DepartmentService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

}
