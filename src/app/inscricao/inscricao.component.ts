import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InscricaoComponent implements OnInit {

  public inscricoes = []

  public eventos = []

  public evento =  undefined

  constructor(
    private http: Http,
    private userservice: UserServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.carregaEventos()
  }

  carregaInscricoes() {
    this.http.get(`${environment.urlServicos}/inscricoes/findByIdEvento.php?id=${this.evento}`)
      .map(res => res.json())
      .subscribe(dados => {
        this.inscricoes = dados.records 
      });
  }

  carregaEventos() {
    this.http.get(`${environment.urlServicos}/eventos/read.php`)
      .map(res => res.json())
      .subscribe(dados => {
        this.eventos = dados.records
      });
  }

}
