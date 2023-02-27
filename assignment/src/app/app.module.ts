import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { SubmitRequestComponent } from './submit-request/submit-request.component';
import { ReviewRequestComponent } from './review-request/review-request.component';



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
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'register-employee', component: RegisterEmployeeComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
