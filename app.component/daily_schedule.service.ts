import { DailySchedule } from './daily_schedule.model';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class DailyScheduleServices{
  private dSchedules: DailySchedule[]=[];



  getDShedule(){
    return this.dSchedules;
  }


  addDSchedule(employeeID:string,workHours: string, workLocation: string,workReport:string,date:Date,comment:string,isEditMode:boolean){
    const dSchedule: DailySchedule = {employeeID:employeeID,workHours: workHours,workLocation: workLocation,workReport:workReport,date:date,comment:comment,isEditMode:isEditMode};
    this.dSchedules.push(dSchedule);
  }

  setHeaderMessage(msg:String){
    //set the header component message
    return msg;
  }

  updateDSchedule(employeeID: string, workHours: string, workLocation: string, workReport: string, date: Date, comment: string,isEditMode:boolean) {
    const dsIndex = this.dSchedules.findIndex(ds => ds.employeeID === employeeID);
    if (dsIndex >= 0) {
      this.dSchedules[dsIndex] = { employeeID, workHours, workLocation, workReport, date, comment,isEditMode};
      // You can also save the updated data to the database using an HTTP request
    }
  }

}
