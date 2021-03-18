import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials={
    username:'',
    password:''
  }

  constructor(private loginService: LoginService) { }

  ngOnInit(): void{
    const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
    
  }

  onSubmit() {
    if ((this.credentials.username!='' && this.credentials.password!='') && (this.credentials.username!=null && this.credentials.password!=null)) {
      console.log("Field are FILLED!!");
      //token generate
      this.loginService.generateToken(this.credentials).subscribe(
        (response:any)=>{
          //success
          console.log(response.token);

          this.loginService.loginUser(response.token);
          window.location.href="/profile"
        },
        error=>{
          //error
          console.log(error);
        }
      );
    } else {
      console.log("Fields are Empty!!");
    }
  }
}
