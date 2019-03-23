import { FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import { AuthService } from "./../auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  isLoading = false;

  constructor(public AuthService: AuthService) {}
  onLogin(form: FormControl) {
    if (form.invalid) {
      return;
    }
    this.AuthService.loginUser(form.value.email, form.value.password);
  }
}
