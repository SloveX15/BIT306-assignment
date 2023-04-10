import { Component,OnInit,ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';

import { DailyScheduleServices } from '../services/daily_schedule.service';

import { DailySchedule } from '../models/daily_schedule.model';

import { Employee } from '../models/Employee.model';

import { registerEmployeeServices } from '../services/register-employee.service';
import { Subscription } from 'rxjs';

import { Subscription } from 'rxjs';




@Component({

  selector: 'app-daily-schedule',

  templateUrl: './daily-schedule.component.html',

  styleUrls: ['./daily-schedule.component.css']

})

export class DailyScheduleComponent implements OnInit{

  employee!:Employee;

  employeeID! :string;

  showForm! : boolean;

  selectedDate!:Date;

  dailySchedules : DailySchedule []=[];

  selectedSchedule: DailySchedule | null = null;

  private dSchedulesSub! : Subscription;

  private dSchedulesSub! : Subscription;

  @ViewChild('postForm', { static: false, read: NgForm }) form!: NgForm;




  constructor(public dailyScheduleService : DailyScheduleServices,

    public employeeService: registerEmployeeServices,

    ){




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

    this.dailyScheduleService.getDShedule();
    this.dSchedulesSub = this.dailyScheduleService.getDSchedulesUpdateListener()
      .subscribe((dSchedules:DailySchedule[])=> {
        this.dailySchedules = dSchedules;
      });

    this.employee = this.employeeService.currentEmployee();

    this.employeeID = this.employee.employeeId;

  }




  onDateSelected() {

    const matchingSchedule = this.dailySchedules.find(schedule =>{
      const scheduleDate = new Date(schedule.date);
      scheduleDate.toDateString() === this.selectedDate.toDateString() &&
      schedule.employeeId === this.employeeID
  });


    const matchingSchedule = this.dailySchedules.find(schedule =>{

      const scheduleDate = new Date(schedule.date);

      scheduleDate.toDateString() === this.selectedDate.toDateString() &&

      schedule.employeeId === this.employeeID

  });

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

    this.showForm = true;

  }




  ngOnDestroy() {

    this.dSchedulesSub.unsubscribe();

  }

}
