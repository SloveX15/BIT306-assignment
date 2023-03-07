import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DailyScheduleServices } from '../daily_schedule.service';

@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.css']
})
export class DailyScheduleComponent {

  constructor(public dailyScheduleService : DailyScheduleServices){

  }

  onAddSchedule(form: NgForm){

    // this.newPost = this.enteredValue;
    if (form.invalid){
      return;
    }
    this.dailyScheduleService.addDSchedule('', form.value.workHours,form.value.workLocation,form.value.workReport,form.value.date,'',false);
    alert("Schedule update successfully!");
    form.reset();
  }
}
