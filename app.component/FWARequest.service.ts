import {Injectable} from '@angular/core';
import { FWARequest } from './FWARequest.model';

@Injectable({providedIn: 'root'})

export class FWARequestServices{
  private fwaRequests: FWARequest[]=[];

  getFWARequests(){
    return this.fwaRequests;
  }
}
