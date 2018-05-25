import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { UserServiceService } from '../user-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-inscricao-form',
  templateUrl: './inscricao-form.component.html',
  styleUrls: ['./inscricao-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InscricaoFormComponent implements OnInit {

  private evento = {
    nome: undefined,
    id: undefined
  };

  public eventos = []

  public corporacoes = [];

  public inscricao ={
    id: undefined,
    is_active: "1",
    corporacoes: undefined,
    eventos: undefined,
    categorias: undefined,
    modalidades: undefined 
  }

  public isNew = true;

  constructor(
    private route: ActivatedRoute,
    private http: Http,
    private userservice: UserServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.inscricao.id = params['id'];
      if(this.inscricao.id != undefined){
        this.isNew = false;
        this.getInscricao()
      }
    });
    this.getCorporacoes()
    this.getEventos()
  }

  getEventos(){
    this.http.get(`${environment.urlServicos}/eventos/read.php`)
    .map(res => res.json()) 
    .subscribe(dados => {
      this.eventos = dados.records
    }
    );
  }

  getCorporacoes() {
    this.http.get(`${environment.urlServicos}/corporacoes/read.php`)
      .map(res => res.json()) 
      .subscribe(dados => {
        this.corporacoes = dados.records
      }
      );
  }

  getInscricao(){
    this.http.get(`${environment.urlServicos}/inscricoes/findById.php?id=${this.inscricao.id}` )
    .map(res => res.json()) 
    .subscribe(dados => {
      this.inscricao = dados.records[0]
    }
    );
  }


  adicionarModalidade(){
    this.http.post(`${environment.urlServicos}/inscricoes/create.php`, this.inscricao)
    .map(res => res.json())
    .subscribe(dados => {
      alert(dados.message)
      this.router.navigate(['/inscricao']);
    },
  (err) => {
    if(err.status >= 401 && err.status <= 403){
      alert("Não foi possivel adicionar");
    }
  });
  }
  salvarModalidade(){
    this.inscricao.is_active = "1"
    this.http.post(`${environment.urlServicos}/inscricoes/update.php`, this.inscricao)
    .map(res => res.json())
    .subscribe(dados => {
      alert('Inscrição atualizada')
      this.router.navigate(['/inscricao']);
    },
  (err) => {
    if(err.status >= 401 && err.status <= 403){
      alert("Não foi possivel salvar");
    }
  });
  }
}
