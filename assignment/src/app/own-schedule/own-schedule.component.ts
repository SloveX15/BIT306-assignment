import { Component } from '@angular/core';
import { DailySchedule } from '../models/daily_schedule.model';
import { Employee } from '../models/Employee.model';
import { DailyScheduleServices } from '../services/daily_schedule.service';
import { registerEmployeeServices } from '../services/register-employee.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { AdminLoginService } from '../services/login.service';

@Component({
  selector: 'app-own-schedule',
  templateUrl: './own-schedule.component.html',
  styleUrls: ['./own-schedule.component.css']
})
export class OwnScheduleComponent {
  id!:String;
  empID!:String;
  employee!:Employee;
  selectedDate! :Date;
  filteredSchedules: DailySchedule[]=[];
  dailySchedules : DailySchedule[]=[];
  isEditing: boolean = false;
  private dSchedulesSub! : Subscription;

  constructor(public dailyScheduleService: DailyScheduleServices,public employeeServices: registerEmployeeServices,
    public route: ActivatedRoute,public authenticateService:AdminLoginService){

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


  onDateSelected() {
    if (this.selectedDate) {
      this.filteredSchedules = this.dailySchedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        return scheduleDate.toDateString() === this.selectedDate.toDateString()
        && this.employee.employeeId === schedule.employeeId;
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
