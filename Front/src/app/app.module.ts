import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { AddEditComponent } from './account/add-edit/add-edit.component';
import { AccountApiService } from './account-api.service';
import { ShowAccountsComponent } from './show-accounts/show-accounts.component';


@NgModule({
  declarations: [	
    AppComponent,
    AccountComponent,
    AddEditComponent,
    ShowAccountsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AccountApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
