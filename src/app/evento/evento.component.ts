import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventoComponent implements OnInit {

private eventos = []

  constructor(
    private http: Http,
    private userservice: UserServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.carregaEventos()
  }

  carregaEventos(){
    this.http.get(`${environment.urlServicos}/eventos/read.php`)
    .map(res => res.json()) 
    .subscribe(dados => {
      this.eventos = dados.records
    }
    );
  }

}
