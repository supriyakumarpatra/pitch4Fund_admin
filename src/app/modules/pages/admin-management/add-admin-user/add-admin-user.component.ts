import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { RestserviceService } from 'src/app/restservice.service';

@Component({
  selector: 'app-add-admin-user',
  templateUrl: './add-admin-user.component.html',
  styleUrls: ['./add-admin-user.component.css']
})
export class AddAdminUserComponent implements OnInit {
  adminForm: FormGroup;
  edit=false;
  adminList: any;
  onShow = true;
  constructor( private fb: FormBuilder, private rest: RestserviceService, private notifier: NotifierService) { 
    this.rest.authGuard();
    this.adminForm = this.fb.group({
      'userName':['',Validators.required],
      'email':['',[Validators.required,Validators.email]],
      'password':['',Validators.required]
    });

  }

  ngOnInit(): void {
    this.onAdminList();
  }

  onSubmit(adminDetails:NgForm){
    const params = this.adminForm.value;
    if(!params.id){
      this.rest.addNewAdmin(params).subscribe(
        (res:any)=>{
          console.log(res);
          if(res.success){
            this.notifier.notify('success','User added Successfully');
            this.onReset(adminDetails);
            this.onAdminList();
          }else{
            this.notifier.notify('error',res.message);
          }
        },
        (err:any)=>{
          console.log(err)
        }
      );
    }else{
      this.rest.updateAdmin(params).subscribe(
        (res:any)=>{
          console.log(res);
          if(res.success){
            this.notifier.notify('success','User updated Successfully');
            this.onReset(adminDetails);
            this.onAdminList();
          }else{
            this.notifier.notify('error',res.message);
          }
        },
        (err:any)=>{
          console.log(err)
        }
      );
    }
  }

  onAdminList(){
    const params = {
      limit:50,offset:0
    }
    this.rest.getAllAdmin(params).subscribe(
      (res:any)=>{
        if(res.success){
          console.log(res);
          this.adminList = res.response;
        }
      }
    )
  }

  onReset(adminDetails:NgForm){
    adminDetails.resetForm();
    this.edit=false;
    this.adminForm.removeControl('id');
    this.adminForm.get('password').setValidators([Validators.required]);
    this.adminForm.get('password').updateValueAndValidity();

  }

  onEdit(item: any){
    this.edit=true;
    // this.adminForm.removeControl('retypePassword');
    this.adminForm.addControl('id',new FormControl());
    this.adminForm.get('password').clearValidators();
    this.adminForm.get('password').updateValueAndValidity();
    this.adminForm.patchValue(item);

  }

  onDelete(id: number){
    const params = {id:id}
    this.rest.deleteAdmin(params).subscribe(
      (res:any)=>{
        console.log(res);
        if(res.success){
          this.notifier.notify('success',res.message);
          this.onAdminList();
        }else{
          this.notifier.notify('error',res.message);
        }
      },
      (err:any)=>{
        console.log(err)
      }
    );
  }





}
