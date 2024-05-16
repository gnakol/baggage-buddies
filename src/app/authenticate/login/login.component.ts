import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginFormGroup! : FormGroup;

  constructor(private fb : FormBuilder, private authService : AuthService, private router : Router){}

  ngOnInit(): void {
      this.loginFormGroup = this.fb.group({
        username : ['', Validators.required],
        password : ['', Validators.required]
      });
  }

  login() {

    let username = this.loginFormGroup.value.username;

    let pwd = this.loginFormGroup.value.password;

    this.authService.login(username, pwd).subscribe({
      next : data => {
        //console.log(data);
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/dashboard")
      },
      error : err => {
        console.log(err);
      }
    })
  }

}
