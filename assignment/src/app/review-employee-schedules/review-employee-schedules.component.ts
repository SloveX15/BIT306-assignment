import { Component,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DailyScheduleServices } from '../services/daily_schedule.service';
import { DailySchedule } from '../models/daily_schedule.model';
import { ActivatedRoute } from "@angular/router";
import { AdminLoginService } from '../services/login.service';
import { Employee } from '../models/Employee.model';
@Component({
  selector: 'app-review-employee-schedules',
  templateUrl: './review-employee-schedules.component.html',
  styleUrls: ['./review-employee-schedules.component.css']
})
export class ReviewEmployeeSchedulesComponent implements OnInit{
  selectedDate! :Date;
  id!:string;
  filteredSchedules: DailySchedule[]=[];
  dailySchedules : DailySchedule[]=[];
  isEditing: boolean = false;
  isEditMode!: boolean;
  employee!:Employee;
  empID!:string;

  private dSchedulesSub! : Subscription;

  constructor(public dailyScheduleService: DailyScheduleServices,public route: ActivatedRoute,public authenticateService:AdminLoginService){

  }

  ngOnInit() {
    this.dailyScheduleService.getDShedule();
    this.dSchedulesSub = this.dailyScheduleService.getDSchedulesUpdateListener()
      .subscribe((dSchedules:DailySchedule[])=> {
        this.dailySchedules = dSchedules;
      });
      this.route.params.subscribe(params => {
        this.empID = params['employeeId'];
        this.employee = this.authenticateService.getUser();
      })
      console.log(this.employee);
    this.id = this.employee.id;
  }


  onSaveSupervisorComments(ds: DailySchedule) {
    this.dailyScheduleService.updateDSchedule(ds.id,ds.employeeId, ds.workHours, ds.workLocation, ds.workReport, ds.date, ds.comment,true);
    this.isEditing = false; // toggle off editing mode after save
    alert("Schedule update successfully!");
  }

  onDateSelected() {
    if (this.selectedDate) {
      this.filteredSchedules = this.dailySchedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date); // create a new Date object from the date string
        return scheduleDate.toDateString() === this.selectedDate.toDateString();
      });
    }
  }


  ngOnDestroy() {
    this.dSchedulesSub.unsubscribe();
  }

  onLogout(){
    this.authenticateService.logout();
  }



}

