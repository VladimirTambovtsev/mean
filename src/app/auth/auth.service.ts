import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Auth } from "./auth.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}
  createUser(email: string, password: string) {
    const auth: Auth = { email, password };
    this.http
      .post("http://localhost:8080/api/users/signup", auth)
      .subscribe(res => console.log(res));
  }
}
