import { Component, OnInit, ViewChild} from '@angular/core';
import { Request } from '../FWARequest.model';
import { FWARequestServices } from '../FWARequest.service';
import { DailyScheduleServices } from '../daily_schedule.service';
import { DailySchedule } from '../daily_schedule.model';
import { departmentServices } from '../department.service';
import { Department } from '../department.model';
import { EmployeeServices } from '../employee.service';
import { Employee } from '../employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-fwa-analytics',
  templateUrl: './view-fwa-analytics.component.html',
  styleUrls: ['./view-fwa-analytics.component.css']
})
export class ViewFWAAnalyticsComponent implements OnInit{
  selectedDepartment!: string;
  startDate!: Date;
  endDate!: Date;
  showDetails!:boolean;
  showSchedule!:boolean;

  dateKeys: string[] = [];
  dateCounts: {[date: string]: number} = {};
  employeeData:Employee[]=[];
  filteredEmployees:Employee[]=[];
  departmentData: Department[] = [];
  fwaData: Request[] = [];
  filteredScheduleData: DailySchedule[]=[];
  scheduleData: DailySchedule[] = [];

  constructor(public dailyScheduleService: DailyScheduleServices,
    public departmentService:departmentServices,
    public fwaRequestService:FWARequestServices,
    public employeeService:EmployeeServices,
    private router:Router){

  }

  ngOnInit(): void {
    this.employeeData = this.employeeService.getEmployees();
    this.fwaData = this.fwaRequestService.getFWARequests();
    this.scheduleData = this.dailyScheduleService.getDShedule();
    this.departmentData = this.departmentService.getDepartments();
  }

  viewSchedule() {
    this.filteredScheduleData = this.scheduleData.filter(schedule => {
      // Check if the schedule employee is in the filteredEmployees array
      let employee = this.filteredEmployees.find(emp => emp.employeeID === schedule.employeeID);
      if (employee) {
        return true; // Keep this schedule in the filteredScheduleData array
      }
      return false; // Exclude this schedule from the filteredScheduleData array
    });
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      this.filteredScheduleData = this.filteredScheduleData.filter(data => {
        const date = new Date(data.date);
        return date >= start && date <= end;
      });
    }

    this.showSchedule = true;
  }

  viewDetails(): void {
    const selectedDept = this.departmentData.find(dept => dept.deptID === this.selectedDepartment);

    // Filter the employees by the selected department
    this.filteredEmployees = this.employeeData.filter(emp => emp.department.deptID === selectedDept?.deptID);

    // Iterate through the FWARequest array
    for (let fwaRequest of this.fwaData) {
      // Check if the request employee is in the filteredEmployees array
      let employee = this.filteredEmployees.find(emp => emp.employeeID === fwaRequest.employeeID);
      if (employee) {
        // Get the date of the request
        let requestDate = fwaRequest.requestDate.toISOString().substr(0, 10); // convert to YYYY-MM-DD format
        // Increment the count for the date in the object
        this.dateCounts[requestDate] = (this.dateCounts[requestDate] || 0) + 1;
      }
    }

    // Create an array of objects with date and count properties
    // let dateCountsArray = Object.keys(this.dateCounts).map(date => {
    //   return { date: new Date(date), count: this.dateCounts[date] };
    // });

    Object.keys(this.dateCounts).forEach(key => {
      this.dateKeys.push(key);
    });

    // Set showDetails to true to show the date range input fields
    this.showDetails = true;
    }

}

