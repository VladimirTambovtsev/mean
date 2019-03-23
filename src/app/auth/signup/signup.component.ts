import { FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import { AuthService } from "./../auth.service";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent {
  isLoading = false;

  constructor(public AuthService: AuthService) {}
  onSignup(form: FormControl) {
    if (form.invalid) {
      return;
    }
    this.AuthService.createUser(form.value.email, form.value.password);
  }
}
