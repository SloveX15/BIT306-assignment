import { HttpInterceptor, HttpRequest, HttpHandler} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminLoginService } from "../services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AdminLoginService){}

  intercept (req : HttpRequest <any>, next: HttpHandler) {

    const authToken = this.authService.getToken();

    const authRequest = req.clone( {
      headers:req.headers.set('Authorization', 'Bearer ' + authToken)
    });

    return next.handle(authRequest);
  }

}
