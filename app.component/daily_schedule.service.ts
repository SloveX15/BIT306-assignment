import { DailySchedule } from './daily_schedule.model';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class DailyScheduleServices{
  private dSchedules: DailySchedule[]=[
    { date: new Date('2023-03-01'), employeeID: 'E001', workLocation: 'Work from Home', workHours: '8:00 AM - 5:00 PM', workReport: 'Finished project A on time', comment: 'Great job!', isEditMode: false },
    { date: new Date('2023-03-02'), employeeID: 'E002', workLocation: 'Office', workHours: '9:00 AM - 6:00 PM', workReport: 'Attended meetings', comment: '', isEditMode: false },
    { date: new Date('2023-03-03'), employeeID: 'E003', workLocation: 'Hybrid', workHours: '10:00 AM - 7:00 PM', workReport: 'Worked on project B', comment: 'Need to improve time management', isEditMode: false },
    { date: new Date('2023-03-04'), employeeID: 'E004', workLocation: 'Office', workHours: '8:30 AM - 5:30 PM', workReport: 'Completed training program', comment: 'Well done!', isEditMode: false }
  ];



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
