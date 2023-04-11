import { Component,OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DailyScheduleServices } from '../services/daily_schedule.service';
import { DailySchedule } from '../models/daily_schedule.model';
import { Employee } from '../models/Employee.model';
import { registerEmployeeServices } from '../services/register-employee.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { AdminLoginService } from '../services/login.service';
@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.css']
})
export class DailyScheduleComponent implements OnInit{
  empID!:string;
  employee!:Employee;
  showForm! : boolean;
  selectedDate!:Date;
  dailySchedules : DailySchedule []=[];
  selectedSchedule: DailySchedule | null = null;
  private dSchedulesSub! : Subscription;
  @ViewChild('postForm', { static: false, read: NgForm }) form!: NgForm;

  constructor(public dailyScheduleService : DailyScheduleServices,
    public employeeService : registerEmployeeServices,public route: ActivatedRoute,
    public authenticateService:AdminLoginService,
    ){

  }

  onAddSchedule(form: NgForm){
    if (form.invalid){
      return;
    }
    this.dailyScheduleService.addDSchedule(this.empID, form.value.workHours,form.value.workLocation,
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
      this.route.params.subscribe(params => {
        this.empID = params['employeeId'];
        this.employee = this.authenticateService.getUser();
      })
  }

  onDateSelected() {
    this.empID = this.employee.employeeId;
    const matchingSchedule = this.dailySchedules.find(schedule =>{
      const scheduleDate = new Date(schedule.date);
      scheduleDate.toDateString() === this.selectedDate.toDateString() &&
      schedule.employeeId === this.empID
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
