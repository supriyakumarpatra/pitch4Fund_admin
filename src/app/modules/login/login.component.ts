import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { RestserviceService } from 'src/app/restservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  constructor(private fb: FormBuilder, private rest: RestserviceService, private notifier: NotifierService, private router:Router) { 
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.loginForm.value);
    const params = this.loginForm.value;
    this.rest.adminLogin(params).subscribe(
      (res: any)=>{
        console.log(res)
        if(res.success){
          this.notifier.notify('success',res.message);
          localStorage.setItem('adminUser',JSON.stringify(res.response));
          this.rest.adminUser.next(res.response);
          this.router.navigateByUrl('/pages/dashboard');
        }else{
          this.notifier.notify('error',res.message);
        }
        
      },
      (err: any)=>{
        console.log(err);
        this.notifier.notify('error','Some thing is wrong');
      }
    );
    
  }

}
