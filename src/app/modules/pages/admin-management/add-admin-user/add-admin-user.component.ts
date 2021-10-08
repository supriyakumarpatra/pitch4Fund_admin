import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { DeleteDialogComponent } from 'src/app/modules/shared';
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
  limit = 20;
  offset = 0;
  searchTerm = ''
  filter = {
    userId:1,
    limit:this.limit,
    offset:this.offset,
    searchTerm: this.searchTerm
  };
  count: number = 0;
  
  constructor( private fb: FormBuilder, private rest: RestserviceService, private notifier: NotifierService, public dialog: MatDialog) { 
    this.rest.authGuard();
    this.adminForm = this.fb.group({
      'userName':['',Validators.required],
      'email':['',[Validators.required,Validators.email]],
      'password':['',[
                      Validators.required,
                      checkingPasswordPattern
                    ]
                  ]
    });

  }

  ngOnInit(): void {
    this.onAdminList();
    this.adminForm.get('password').valueChanges.subscribe(
      (res)=>{
        console.log(this.adminForm);
      }
      
    );
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
    this.filter.limit = this.limit;
    this.filter.offset = this.offset;
    this.rest.getAllAdmin(this.filter).subscribe(
      (res:any)=>{
        if(res.success){
          console.log(res);
          this.adminList = res.response;
          this.countAllData();
        }
      }
    )
  }

  openDeleteDialog(id:number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
        width: '300px',
        disableClose: true
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
        console.log(result)
        if(result){
            console.log('delete it');
            this.onDelete(id);
        }
      console.log(`Dialog result: ${result}`);
    });
  }

  countAllData(): void{
    const cardParam = {userId: 1, searchTerm: this.searchTerm};
    this.rest.countAllAdminData(cardParam).subscribe(
        (res:any)=>{
            if(res.success){
                this.count = res.response?.totalData;
                console.log(this.count)
            }
        }
    );
  }

  onNext(){
    if((this.offset+this.limit) > this.count || (this.offset+this.limit) == this.count){
      return;
    } 
    this.offset +=  this.limit;  
    this.onAdminList();
  }

  onPrevious(){
    if (this.offset != 0){
      this.offset -= this.limit;
      this.onAdminList();
    }

      
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
          this.notifier.notify('error',res.message);
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

  onSearch(){
    this.filter.searchTerm = this.searchTerm;
    this.onAdminList();
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
