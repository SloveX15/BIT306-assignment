export interface DailySchedule{
  employeeID:string;
  workLocation:string;
  workHours:string;
  workReport:string;
  date: Date;
  comment:string;
  isEditMode: Boolean;
}
