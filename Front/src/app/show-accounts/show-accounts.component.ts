import { Component, OnInit } from '@angular/core';
import { Observable, ObservedValueOf} from 'rxjs';
import { AccountApiService } from 'src/app/account-api.service';

@Component({
  selector: 'app-show-accounts',
  templateUrl: './show-accounts.component.html',
  styleUrls: ['./show-accounts.component.css']
})

export class ShowAccountsComponent implements OnInit {
  
  accountList$!:Observable<any[]>;

  constructor(private service:AccountApiService){}

  ngOnInit(): void {
    this.accountList$ = this.service.getAccountList();
  }

  modalTitle:string = '';
  activateAddEditComponent:boolean = false;
  account:any;

  modalAdd(){
    this.account = {
      id:0,
      software:null,
      login:null,
      password:null,
      //lastdate automatico
    }
    this.modalTitle = "Adicionar nova conta";
    this.activateAddEditComponent = true;
  }

  modalEdit(item:any){
    this.account = item;
    this.modalTitle = "Editar conta existente";
    this.activateAddEditComponent = true;
  }

  delete(item:any){
    if(confirm(`Realmente deseja excluir a conta ${item.id}?`)){
      this.service.deleteAccount(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn){
          closeModalBtn.click();
        }
  
        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if(showDeleteSuccess){
          showDeleteSuccess.style.display = 'block';
        }
        setTimeout(function(){
          if(showDeleteSuccess){
            showDeleteSuccess.style.display = 'none';
          }
        },4000)
      })
    }
    
    
  }

  modalClose(){
    this.activateAddEditComponent = false;
    this.accountList$ = this.service.getAccountList();
  }

}
