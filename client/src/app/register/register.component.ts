import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model :any ={};
  @Output() cancelRegister = new EventEmitter();

  constructor(private accountService : AccountService, 
            private toaster:ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe (respose => {
      console.log(respose);
      this.cancel();
    },
    error =>{
      this.toaster.error(error.error);
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
