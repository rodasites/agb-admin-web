import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Usuario } from '../usuario';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  private usuario: Usuario = new Usuario(); 
  
    constructor(
      private router: Router,
      private authService: AuthService
    ) { }
  
    ngOnInit() {
    }
  
    autentica(resposta){
      this.authService.fazerLogin(resposta.value);
    }

}
