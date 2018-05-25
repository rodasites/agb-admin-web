import { Http } from '@angular/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  public autenticado = false;

  private adminUser

  constructor(
    private router: Router,
    private http: Http
  ) { }

  fazerLogin(resposta) {

    this.http.get(`${environment.urlServicos}autenticacoes/userAdmin.php`, resposta)
    .map(res => res.json())
    .subscribe((dados) => {
      this.autentica(dados)
    },
    (err) => {
      alert('Usuário ou senha Inválidos')
    });

  }

  autentica(dados){
   /*  if ((dados.usuario === this.corporacao[0].usuario) && (resposta.senha === this.corporacao[0].senha )) {
      this.autenticado = true;
      this.router.navigate(['eventos'])
    } else {
      this.autenticado = false;
      alert('Usuário ou senha Inválidos')
    } */
  }

}
