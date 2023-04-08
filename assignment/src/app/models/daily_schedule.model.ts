export interface DailySchedule{
  id:string;
  workLocation:string;
  workHours:string;
  workReport:string;
  date: Date;
  comment:string;
  isEditMode: Boolean;
  employeeId:string;
}
