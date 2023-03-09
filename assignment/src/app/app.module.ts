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


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register-employee', component: RegisterEmployeeComponent },
  { path: 'submit-request', component: SubmitRequestComponent },
  { path: 'review-request', component: ReviewRequestComponent },
  { path: 'admin-homepage', component: AdminHomepageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterEmployeeComponent,
    SubmitRequestComponent,
    ReviewRequestComponent,
    AdminHomepageComponent,
    ConfirmDialogComponent
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
