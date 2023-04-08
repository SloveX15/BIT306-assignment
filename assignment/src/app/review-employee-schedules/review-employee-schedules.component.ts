import { Component,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  private dSchedulesSub! : Subscription;

  constructor(public dailyScheduleService: DailyScheduleServices){

  }

  ngOnInit() {
    this.dailyScheduleService.getDShedule();
    this.dSchedulesSub = this.dailyScheduleService.getDSchedulesUpdateListener()
      .subscribe((dSchedules:DailySchedule[])=> {
        this.dailySchedules = dSchedules;
      });
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



}

