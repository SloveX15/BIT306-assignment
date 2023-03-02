import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { SubmitRequestComponent } from './submit-request/submit-request.component';
import { ReviewRequestComponent } from './review-request/review-request.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register-employee', component: RegisterEmployeeComponent },
  { path: 'submit-request', component: SubmitRequestComponent },
  { path: 'review-request', component: ReviewRequestComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterEmployeeComponent,
    SubmitRequestComponent,
    ReviewRequestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
