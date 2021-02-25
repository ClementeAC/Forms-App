import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.page.html",
  styleUrls: ["./log-in.page.scss"],
})
export class LogInPage implements OnInit {
  credentials: FormGroup;
  user: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async (res) => {

        this.user = res[0];
        localStorage.setItem("user", JSON.stringify(this.user));

        await loading.dismiss();
        this.router.navigateByUrl("/prueba");
        this.router.navigateByUrl("/profile", { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: "Login failed",
          message: res.error.error,
          buttons: ["OK"],
        });
        await alert.present();
      }
    );
  }
  get username() {
    return this.credentials.get("username");
  }

  get password() {
    return this.credentials.get("password");
  }

  register() {
    this.router.navigate(["./sign-in"]);
  }
}
