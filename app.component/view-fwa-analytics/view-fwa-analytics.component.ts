import { Component, OnInit, ViewChild} from '@angular/core';
import { FWARequest } from '../FWARequest.model';
import { FWARequestServices } from '../FWARequest.service';
import { DailyScheduleServices } from '../daily_schedule.service';
import { DailySchedule } from '../daily_schedule.model';
import { departmentServices } from '../department.service';
import { Department } from '../department.model';
import { EmployeeServices } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-view-fwa-analytics',
  templateUrl: './view-fwa-analytics.component.html',
  styleUrls: ['./view-fwa-analytics.component.css']
})
export class ViewFWAAnalyticsComponent implements OnInit{
  selectedDepartment!: string;
  dateKeys: string[] = [];
  dateCounts: {[date: string]: number} = {};
  startDate!: Date;
  endDate!: Date;
  showDetails!:boolean;
  showSchedule!:boolean;
  employeeData:Employee[]=[];
  filteredEmployees:Employee[]=[];
  departmentData: Department[] = [
  //   {deptID: 'dept1',deptName: 'Sales',flexiHours: 5,workFromHome: 7,hybrid: 2,
  // }
  ];
  fwaData: FWARequest[] = [
    // { requestID: 'req1', requestDate: new Date('2023-03-01'), workType: 'Flexi Hours', description: 'Working 8 hours', reason: 'Doctor appointment', status: 'Approved', comment: '', employeeID: 'emp1' },
    // { requestID: 'req2', requestDate: new Date('2023-03-02'), workType: 'Work from Home', description: 'Working on project A', reason: 'Childcare', status: 'Pending', comment: '', employeeID: 'emp2' },
    // { requestID: 'req3', requestDate: new Date('2023-03-03'), workType: 'Hybrid', description: 'Working on project B', reason: 'Travel', status: 'Declined', comment: '', employeeID: 'emp3' },
    // { requestID: 'req4', requestDate: new Date('2023-03-04'), workType: 'Work from Home', description: 'Working on project C', reason: 'Feeling unwell', status: 'Approved', comment: '', employeeID: 'emp4' },
    // { requestID: 'req5', requestDate: new Date('2023-03-05'), workType: 'Flexi Hours', description: 'Working 6 hours', reason: 'Personal appointment', status: 'Pending', comment: '', employeeID: 'emp5' },
  ];
  filteredScheduleData: DailySchedule[]=[];

  scheduleData: DailySchedule[] = [
    // { date: new Date('2023-03-01'), employeeID: 'emp1', workLocation: 'Work from Home', workHours: '8:00 AM - 5:00 PM', workReport: 'Finished project A on time', comment: 'Great job!', isEditMode: false },
    //   { date: new Date('2023-03-02'), employeeID: 'emp2', workLocation: 'Office', workHours: '9:00 AM - 6:00 PM', workReport: 'Attended meetings', comment: '', isEditMode: false },
    //   { date: new Date('2023-03-03'), employeeID: 'emp3', workLocation: 'Hybrid', workHours: '10:00 AM - 7:00 PM', workReport: 'Worked on project B', comment: 'Need to improve time management', isEditMode: false },
    //   { date: new Date('2023-03-04'), employeeID: 'emp4', workLocation: 'Office', workHours: '8:30 AM - 5:30 PM', workReport: 'Completed training program', comment: 'Well done!', isEditMode: false }
  ];

  // viewFWARequests() {
  //   // Call API to retrieve FWA request data based on selectedDepartment
  //   // Assume the API returns an array of FWARequest objects
  //   this.scheduleData = []; // Clear schedule data
  //   const fwaRequests = this.fwaData.filter(request => request.employeeID === this.selectedDepartment.deptID);
  //   this.scheduleData = fwaRequests.map(request => ({
  //     date: request.requestDate,
  //     employeeID: request.employeeID,
  //     workLocation: request.workType,
  //     workHours: '',
  //     workReport: request.description,
  //     comment: request.comment,
  //     isEditMode: false,
  //   }));
  // }

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

  constructor(public dailyScheduleService: DailyScheduleServices,public departmentService:departmentServices,public fwaRequestService:FWARequestServices,public employeeService:EmployeeServices){

  }

  ngOnInit(): void {
    this.employeeData = this.employeeService.getEmployees();
    this.fwaData = this.fwaRequestService.getFWARequests();
    this.scheduleData = this.dailyScheduleService.getDShedule();
    this.departmentData = this.departmentService.getDepartments();
  }

  viewDetails(): void {
    const selectedDept = this.departmentData.find(dept => dept.deptID === this.selectedDepartment);

    // Filter the employees by the selected department
    this.filteredEmployees = this.employeeData.filter(emp => emp.deptID === selectedDept?.deptID);



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

