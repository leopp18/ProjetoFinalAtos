import { Component, Input, OnInit  } from '@angular/core';
import { AccountApiService } from 'src/app/account-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  constructor(private service:AccountApiService){}

  @Input() user:any;
  username: string = "";
  authPass: string = "";

  ngOnInit(): void {

    var table = document.getElementById("tabela");
    if(table != undefined){
        table.style.display = "none";
    }
  }

  authenticateUser(){
    var user = {
      username:this.username,
      authPass:this.authPass,
    }

    if(user.username == 'leo' && user.authPass == 'pass'){
      alert("Usuário autenticado!");
      var form = document.getElementById("formulario");
      var tabela = document.getElementById("tabela");
      if(form != undefined && tabela != undefined){
        form.style.display = "none";
        tabela.style.display = "block";
      }
    }else
    {
      alert("Usuário não autenticado");
    }


    // var token = this.service.authUser(user).subscribe(res => {
    //   //if(this.service.authUser(user)){
    //     var form = document.getElementById("formulario");
    //     var tabela = document.getElementById("tabela");
    //     if(form != undefined && tabela != undefined){
    //       form.style.display = "none";
    //       tabela.style.display = "block";
    //       alert("Usuário autenticado!");
    //     }
    //   //}else{
    //     //alert("Usuário não autenticado");
    //   //}
      
    //  },
    //  error=>alert("Usuário não autenticado"))
    // console.log(user);
    // console.log(token);
  
  }
}
