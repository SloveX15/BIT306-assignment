import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { SubmitRequestComponent } from './submit-request/submit-request.component';
import { ReviewRequestComponent } from './review-request/review-request.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { ConfirmDialogComponent } from './templates/confirm-dialog.componenet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';

import { MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

import { ReviewEmployeeSchedulesComponent } from './review-employee-schedules/review-employee-schedules.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewFWAAnalyticsComponent } from './view-fwa-analytics/view-fwa-analytics.component';

import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register-employee', component: RegisterEmployeeComponent },
  { path: 'submit-request', component: SubmitRequestComponent },
  { path: 'review-request', component: ReviewRequestComponent },
  { path: 'admin-homepage', component: AdminHomepageComponent},
  {path:'update', component: DailyScheduleComponent},
  {path:'review', component: ReviewEmployeeSchedulesComponent},
  {path:'fwaAnalytics', component: ViewFWAAnalyticsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterEmployeeComponent,
    SubmitRequestComponent,
    ReviewRequestComponent,
    AdminHomepageComponent,
    ConfirmDialogComponent,
    DailyScheduleComponent,
    ReviewEmployeeSchedulesComponent,
    ViewFWAAnalyticsComponent
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
