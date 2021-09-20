import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { RestserviceService } from 'src/app/restservice.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  public sidenavShow: String = '';
  public user: any;
  public userName = '';
  currentPass: boolean = true;
  rePass: boolean = true;
  newPass: boolean = true;
  changePasswordForm: FormGroup;
  constructor(public rest: RestserviceService, private router:Router, private fb: FormBuilder,private notifier: NotifierService,) {
    this.user = this.rest.populateData();
    if(this.user){
      this.userName = this.user.userName;
    }else{
      this.router.navigateByUrl('/')
    }
    this.changePasswordForm =this.fb.group({
      currentPassword:['',Validators.required],
      newPassword:['',[Validators.required,checkingPasswordPattern]],
      rePassword:['',[Validators.required,checkingPassword]]
    })
   }

  ngOnInit(): void {
   
  }
  onLogout(){
    this.rest.adminLogout();
  }
  onSubmit(){
    console.log(this.changePasswordForm)
    // return;
    const params = this.changePasswordForm.value;
    params.id = this.user.id;
    console.log(params);
    this.rest.ChangePassword(params).subscribe(
      (res: any)=>{
        if(res.success){
          this.notifier.notify('success',res.message);
          this.rest.adminLogout();
          // document.getElementById('close').click();
        }else{
          this.notifier.notify('error',res.message)
        }
      },
      (err: any)=>{
        this.notifier.notify('error','Some thing is wrong');
      }
    );
  }
  showsideBar() {
    this.sidenavShow = (this.sidenavShow == '')? 'shownavrm' : '';
  }
}

function checkingPassword(control: AbstractControl): {[key: string]: any} | null{
  console.log(control);
  if(control.value && control.root.get('newPassword').value){
    if(control.value != control.root.get('newPassword').value){
      return {'confirmpassword':true};
    }else{
      return null
    }
  }else{
    return null
  }
}

function checkingPasswordPattern(control: AbstractControl): {[key: string]: any} | null{
  console.log(control);
  if(control.value){
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if(regex.test(control.value)){
      return null;
    }else{
      return {'pattern':true};
    }
  }else{
    return null
  }
}

 
