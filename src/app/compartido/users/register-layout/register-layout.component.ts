import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services';

@Component({
  selector: 'app-register-layout',
  templateUrl: './register-layout.component.html',
  styleUrls: ['./register-layout.component.css']
})
export class RegisterLayoutComponent implements OnInit {

  constructor(private router: Router, user :UsersService) { }

  ngOnInit(): void {
  }

}
