import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadVideoDialogComponent } from '.';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { SelectStartupComponent } from './dialog/select-startup/select-startup.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      FormsModule,
      MatDialogModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MatSlideToggleModule,
    
    MatTabsModule,
    MatSelectModule,
    TextFieldModule,
    
    MatFormFieldModule,
    MatIconModule,
    MatNativeDateModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule
    ],
    declarations: [
        UploadVideoDialogComponent,
        SelectStartupComponent,
        
    ],
    exports: [
        UploadVideoDialogComponent
    ]
  })
  export class SharedModule { }