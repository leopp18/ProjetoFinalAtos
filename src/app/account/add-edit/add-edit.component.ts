import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountApiService } from 'src/app/account-api.service';
//import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
  //providers: [DatePipe]
})

export class AddEditComponent implements OnInit {

  accountList$!: Observable<any[]>;

  constructor(private service:AccountApiService,
    //private datePipe:DatePipe
    ) {}


  @Input() account:any;
  id:number = 0;
  software: string = "";
  login: string = "";
  password: string = "";
  lastdate = new Date();
  //lastdate = this.datePipe.transform((new Date), 'dd/MM/YYYY hh:mm');

  ngOnInit(): void {
    this.id = this.account.id;
    this.software = this.account.software;
    this.login = this.account.login;
    this.password = this.account.password;
    this.accountList$ = this.service.getAccountList();
  }

  addAccount(){
      var account = {
        software:this.software,
        login:this.login,
        password:this.password,
        lastdate:this.lastdate,
      }
      this.service.addAccount(account).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn){
          closeModalBtn.click();
        }

        var showAddSuccess = document.getElementById('add-success-alert');
        if(showAddSuccess){
          showAddSuccess.style.display = 'block';
        }
        setTimeout(function(){
          if(showAddSuccess){
            showAddSuccess.style.display = 'none';
          }
        },4000)
      })
  }

  updateAccount(){
    var account = {
      id:this.id,
      software:this.software,
      login:this.login,
      password:this.password,
      lastdate:this.lastdate,
    }
    var id:number = this.id;
    this.service.updateAccount(id,account).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess){
        showUpdateSuccess.style.display = 'block';
      }
      setTimeout(function(){
        if(showUpdateSuccess){
          showUpdateSuccess.style.display = 'none';
        }
      },4000)
    })
  }
}
