import { Component,OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DailyScheduleServices } from '../daily_schedule.service';
import { DailySchedule } from '../daily_schedule.model';

@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.css']
})
export class DailyScheduleComponent implements OnInit{
  employeeID :string = "E001";
  showForm! : boolean;
  selectedDate!:Date;
  dailySchedules : DailySchedule []=[];
  selectedSchedule: DailySchedule | null = null;
  @ViewChild('postForm', { static: false, read: NgForm }) form!: NgForm;

  constructor(public dailyScheduleService : DailyScheduleServices){

  }

  onAddSchedule(form: NgForm){
    if (form.invalid){
      return;
    }
    this.dailyScheduleService.addDSchedule(this.employeeID, form.value.workHours,form.value.workLocation,
      form.value.workReport,form.value.date,'',false);
    alert("Schedule update successfully!");
    form.reset();
  }

  ngOnInit(): void {
    this.dailySchedules = this.dailyScheduleService.getDShedule();
  }

  onDateSelected() {
    const matchingSchedule = this.dailySchedules.find(schedule =>
      schedule.date.toDateString() === this.selectedDate.toDateString() &&
      schedule.employeeID === this.employeeID
    );
    if (matchingSchedule) {
      setTimeout(() => {
        this.form.setValue({
          date: matchingSchedule.date,
          workLocation: matchingSchedule.workLocation,
          workHours: matchingSchedule.workHours,
          workReport: matchingSchedule.workReport,
        });
        this.showForm = true;
      });
    }
    this.form.reset();
    this.showForm = true;
  }
}
