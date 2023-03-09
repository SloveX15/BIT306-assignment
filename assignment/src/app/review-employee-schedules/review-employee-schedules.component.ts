import { Component,OnInit } from '@angular/core';
import { DailyScheduleServices } from '../services/daily_schedule.service';
import { DailySchedule } from '../models/daily_schedule.model';
@Component({
  selector: 'app-review-employee-schedules',
  templateUrl: './review-employee-schedules.component.html',
  styleUrls: ['./review-employee-schedules.component.css']
})
export class ReviewEmployeeSchedulesComponent implements OnInit{
  selectedDate! :Date;
  filteredSchedules: DailySchedule[]=[];
  dailySchedules : DailySchedule[]=[];
  isEditing: boolean = false;

  constructor(public dailyScheduleService: DailyScheduleServices){

  }

  ngOnInit() {
    this.dailySchedules = this.dailyScheduleService.getDShedule();
  }

  onSaveSupervisorComments(ds: DailySchedule) {
    this.dailyScheduleService.updateDSchedule(ds.employeeId, ds.workHours, ds.workLocation, ds.workReport, ds.date, ds.comment,true);
    this.isEditing = false; // toggle off editing mode after save
  }

  onDateSelected() {
    if (this.selectedDate) {
      this.filteredSchedules = this.dailySchedules.filter(schedule => {
        return schedule.date.toDateString() === this.selectedDate.toDateString();
      });
    }
  }



}

