import { Component, OnInit } from '@angular/core';
import { Request } from '../Request.model';
import { Router } from '@angular/router';

@Component({
selector: 'app-review-request',
templateUrl: './review-request.component.html',
styleUrls: ['./review-request.component.css']
})
export class ReviewRequestComponent implements OnInit {
requests: Request[] = [
{
requestId: 1,
requestDate: '2023-02-25T16:36:01.000Z',
workType: 'Type 1',
description: 'Description 1',
reason: 'Reason 1',
status: 'pending'
},
{
requestId: 2,
requestDate: '2023-02-24T10:05:22.000Z',
workType: 'Type 2',
description: 'Description 2',
reason: 'Reason 2',
status: 'approved'
}
];
constructor(private router: Router) { }


ngOnInit(): void {
}

submitRequest(workType: string, description: string, reason: string) {
const newRequest: Request = {
requestId: this.requests.length + 1,
requestDate: new Date().toISOString(),
workType: workType,
description: description,
reason: reason,
status: 'pending'
};
this.requests.push(newRequest);
}

}




