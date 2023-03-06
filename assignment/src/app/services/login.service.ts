import { Injectable } from '@angular/core';

import { Admin } from '../models/Admin.model';

@Injectable({providedIn: 'root'})

@Injectable({
  providedIn: 'root'
})

export class adminLoginService {
  constructor() { }

  private hradmins: Admin[] = [
    {username: 'a', password:'p',fullname:' Alice'},
    {username: 'b', password:'p',fullname:' Zara'},
    ];

    private loggedinAdmin: Admin | undefined ;
     //loggedinAdmin : Admin = { username:'', password:'', fullname:''};

    authenticateLogin(username: string, password: string) : boolean {

    const hr = this.hradmins.find(x => x.username == username && x.password == password);
    // find will return undefined in case no matches found
    if(hr != undefined) {
      // set logedinAdmin to currently logged in user/hr
      this.loggedinAdmin = hr;
      return true;
    }
    return false;
  }

  whoseLoggedIn(){
    return this.loggedinAdmin;
  }

  logout(){
    this.loggedinAdmin = undefined;
  }

}
