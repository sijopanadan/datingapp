import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model :any = {}
  //loggedin :  boolean;
  constructor(public accountservice : AccountService) { }

  ngOnInit(): void {
    //this.getCurrentUser();
  }

  Login(){
    this.accountservice.login(this.model).subscribe(response => {
      //this.loggedin = true;
      console.log(response);
    },error => {
      console.log(error);
    });
  }

  logout(){
    this.accountservice.logout();
    //this.loggedin = false;
  }

  getCurrentUser(){
    this.accountservice.currentuser$.subscribe(user => {
      //this.loggedin = !!user;
    },
    error => {
      console.log(error);
    })
  }

}
