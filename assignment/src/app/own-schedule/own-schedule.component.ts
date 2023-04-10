import { Component } from '@angular/core';
import { DailySchedule } from '../models/daily_schedule.model';
import { Employee } from '../models/Employee.model';
import { DailyScheduleServices } from '../services/daily_schedule.service';
import { registerEmployeeServices } from '../services/register-employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-own-schedule',
  templateUrl: './own-schedule.component.html',
  styleUrls: ['./own-schedule.component.css']
})
export class OwnScheduleComponent {
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


  onDateSelected() {
    if (this.selectedDate) {
      this.filteredSchedules = this.dailySchedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        return scheduleDate.toDateString() === this.selectedDate.toDateString();
      });
    }
  }

  ngOnDestroy() {
    this.dSchedulesSub.unsubscribe();
  }


}
