import { Component } from '@angular/core';
import { DailySchedule } from '../models/daily_schedule.model';
import { Employee } from '../models/Employee.model';
import { DailyScheduleServices } from '../services/daily_schedule.service';
import { registerEmployeeServices } from '../services/register-employee.service';

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

  constructor(public dailyScheduleService: DailyScheduleServices){

  }

  ngOnInit() {
     this.dailyScheduleService.getDShedule();
  }


  onDateSelected() {
    if (this.selectedDate) {
      this.filteredSchedules = this.dailySchedules.filter(schedule => {
        return schedule.date.toDateString() === this.selectedDate.toDateString();
      });
    }
  }


}
