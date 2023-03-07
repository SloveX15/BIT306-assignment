import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
import { ReviewEmployeeSchedulesComponent } from './review-employee-schedules/review-employee-schedules.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewFWAAnalyticsComponent } from './view-fwa-analytics/view-fwa-analytics.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {path:'update', component: DailyScheduleComponent},
  {path:'review', component: ReviewEmployeeSchedulesComponent},
  {path:'fwaAnalytics', component: ViewFWAAnalyticsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DailyScheduleComponent,
    ReviewEmployeeSchedulesComponent,
    ViewFWAAnalyticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    RouterModule.forRoot(appRoutes),
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
