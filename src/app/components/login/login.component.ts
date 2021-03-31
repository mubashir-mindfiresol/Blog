import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private toastr: ToastrService) { }

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
    
//SignIn Code
if (this.tokenStorage.getToken()) {
  this.isLoggedIn = true;
  this.roles = this.tokenStorage.getUser().roles;

  }

}

showSuccess() {
  this.toastr.success('Hello world!', 'Toastr fun!',
  {timeOut: 2000});;
  return true;
}
showError() {
this.toastr.error('everything is broken', 'Major Error', {
timeOut: 3000
})
console.log("showerror() is called");
return false;
}

  onSignUp(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  onSignIn(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.toastr.success('Logged In Successfully', 'SUCCESS!!', {
          timeOut: 3000
          });
        window.location.href="/profile"
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.toastr.error('Check Credentials', this.errorMessage, {
          timeOut: 3000
          })
      }
    );
    }

  reloadPage(): void {
    window.location.reload();
  }
  
  }
