import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model :any = {}
  //loggedin :  boolean;
  constructor(public accountservice : AccountService, private router:Router,
              private toaster :ToastrService) { }

  ngOnInit(): void {
    //this.getCurrentUser();
  }

  Login(){
    this.accountservice.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');
      console.log(response);
    },error => {
      this.toaster.error(error.error);      
    });
  }

  logout(){
    this.accountservice.logout();
    this.router.navigateByUrl('/')
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
