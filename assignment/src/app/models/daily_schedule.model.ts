export interface DailySchedule{
  employeeId:string;
  workLocation:string;
  workHours:string;
  workReport:string;
  date: Date;
  comment:string;
  isEditMode: Boolean;
}
