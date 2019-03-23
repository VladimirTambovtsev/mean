import { FormControl } from "@angular/forms";
import { Component } from "@angular/core";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  isLoading = false;

  onLogin(form: FormControl) {
    console.log(form.value);
  }
}
