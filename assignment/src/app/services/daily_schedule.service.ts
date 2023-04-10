import { DailySchedule } from '../models/daily_schedule.model';
import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import { response } from "express";

@Injectable({providedIn: 'root'})

export class DailyScheduleServices{
  private dSchedules: DailySchedule[]=[];
  private dailyScheduleUpdated = new Subject<DailySchedule[]>();

  constructor(private http:HttpClient, private router : Router){}

  getDShedule() {
    this.http.get<{ message: String, dailySchedules: any }>('http://localhost:3001/api/dailySchedules')
      .pipe(map((dScheduleData) => {
        console.log(dScheduleData);
        if (dScheduleData.dailySchedules) {
          return dScheduleData.dailySchedules.map((dSchedule: { _id: any;
            employeeId: any; workLocation: any; workHours: any; workReport: any; date: any; comment: any; isEditMode: any; })=> {
            return {
              id: dSchedule._id,
              employeeId: dSchedule.employeeId,
              workLocation: dSchedule.workLocation,
              workHours: dSchedule.workHours,
              workReport: dSchedule.workReport,
              date: dSchedule.date,
              comment: dSchedule.comment,
              isEditMode: dSchedule.isEditMode
            }
          });
        } else {
          return [];
        }
      }))
      .subscribe(transformedDailySchedules => {
        console.log('Response:', transformedDailySchedules);
        this.dSchedules = transformedDailySchedules;
        this.dailyScheduleUpdated.next([...this.dSchedules]);
        console.log(this.dSchedules);
      },
      error => {
          console.log('Error:', error);
      }
    );
  }



  getDSchedulesUpdateListener(){
    return this.dailyScheduleUpdated.asObservable();
  }


  addDSchedule(employeeID:string,workHours: string, workLocation: string,workReport:string,date:Date,comment:string,isEditMode:boolean){
    const dSchedule: DailySchedule = {id:'null',employeeId:employeeID,workHours: workHours,workLocation: workLocation,workReport:workReport,date:date,comment:comment,isEditMode:isEditMode};
    this.http.post<{message:string,dScheduleId: string}>('http://localhost:3001/api/dailySchedules',dSchedule)
      .subscribe((responseData)=>{
        // console.log(responseData.message);
        const id = responseData.dScheduleId;
        dSchedule.id = id;
        this.dSchedules.push(dSchedule);
        this.dailyScheduleUpdated.next([...this.dSchedules]);
        this.router.navigate(['/']);
        console.log("Daily Schedule added sucessfulyy " , dSchedule);
      })
    this.dSchedules.push(dSchedule);
  }

  // updateDSchedule(id:string, employeeId: string, workHours: string, workLocation: string, workReport: string, date: Date, comment: string,isEditMode:boolean) {
  //   const dsIndex = this.dSchedules.findIndex(ds => ds.employeeId === employeeId);
  //   if (dsIndex >= 0) {
  //     this.dSchedules[dsIndex] = { id:id ,employeeId, workHours, workLocation, workReport, date, comment,isEditMode};
  //     // You can also save the updated data to the database using an HTTP request
  //   }
  // }

  updateDSchedule(id:string, employeeId: string, workHours: string, workLocation: string, workReport: string, date: Date, comment: string,isEditMode:boolean){
    const d : DailySchedule = { id:id, employeeId: employeeId, workHours:workHours,workLocation:workLocation,workReport:workReport,date:date,comment:comment,isEditMode:isEditMode};
    this.http.put('http://localhost:3001/api/dailySchedules/' + id , d)
    .subscribe(response => console.log (response));
  }

}
