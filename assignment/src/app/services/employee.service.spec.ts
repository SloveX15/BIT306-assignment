// import { TestBed } from '@angular/core/testing';
// import { EmployeeService } from './employee.service';


// describe('EmployeeService', () => {
//   let service: EmployeeService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(EmployeeService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should return a list of employees', () => {
//     const employees = service.getEmployees();
//     expect(employees.length).toBeGreaterThan(0);
//   });

//   it('should add a new employee to the list', () => {
//     const newEmployee = { name: 'Sara Johnson', department: { deptID: '1', deptName: 'Sales' } };
//     service.addEmployee(newEmployee);
//     const employees = service.getEmployees();
//     expect(employees).toContain(newEmployee);
//   });
// });
