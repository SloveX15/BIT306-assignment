import { Injectable } from '@angular/core';

import { Admin } from '../models/Admin.model';

@Injectable({ providedIn: 'root' })
export class AdminLoginService {
  constructor() { }

  private admins: Admin[] = [
    { username: 'a', password: 'p', fullname: 'Alice', userType: 'HR' },
    { username: 'b', password: 'p', fullname: 'Zara', userType: 'HR' },
    { username: 'c', password: 'p', fullname: 'John', userType: 'Employee' },
    { username: 'd', password: 'p', fullname: 'Mary', userType: 'Supervisor' }
  ];

  private loggedInAdmin: Admin | undefined;

  authenticateLogin(username: string, password: string): boolean {
    const admin = this.admins.find(x => x.username === username && x.password === password);

    if (admin) {
      this.loggedInAdmin = admin;
      return true;
    }

    return false;
  }

  whoseLoggedIn(): Admin | undefined {
    return this.loggedInAdmin;
  }

  logout(): void {
    this.loggedInAdmin = undefined;
  }

  isAdmin(): boolean {
    return this.loggedInAdmin?.userType === 'HR';
  }

  isEmployee(): boolean {
    return this.loggedInAdmin?.userType === 'Employee';
  }

  isSupervisor(): boolean {
    return this.loggedInAdmin?.userType === 'Supervisor';
  }
}
