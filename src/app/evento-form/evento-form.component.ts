import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventoFormComponent implements OnInit {

  public maskData = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]; 

  public evento = {
    id: undefined,
    isActive: undefined,
    nome: undefined,
    data: undefined
  }

  private paramId = undefined;

  private isNew = true;

  constructor(
    private route: ActivatedRoute,
    private http: Http,
    private router: Router,
    private userservice: UserServiceService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.paramId = params['id'];
      if (this.paramId && this.paramId != null) {
        this.loadEventos(this.paramId);
        this.isNew = false;
      }
    });
  }

  loadEventos(id) {
    this.http.get(`${environment.urlServicos}/eventos/findById.php?id=${this.paramId}`)
      .map(res => res.json())
      .subscribe((dados) => {
        let tmpOpeningDate = dados.records[0].data.split('-');
        this.evento.data  = tmpOpeningDate[2] + '/' + tmpOpeningDate[1] + '/' + tmpOpeningDate[0];

        this.evento.nome = dados.records[0].nome;
        this.evento.isActive = Number(dados.records[0].is_active);
        this.evento.id = dados.records[0].id;
      },
    );
  }

  salvarEvento(response) {
    let tmpOpeningDate = response.data.split('/');
    response.data = tmpOpeningDate[2] + '-' + tmpOpeningDate[1] + '-' + tmpOpeningDate[0];
    let body = {
      id: this.evento.id,
      isActive: response.isActive,
      nome: response.nome,
      data: response.data
    }

    if(body.isActive == true){
      body.isActive = 1
    }else{
      body.isActive = 0
    }

    if (this.isNew) {
      this.http.post(`${environment.urlServicos}/eventos/create.php`, body)
        .map(res => res.json())
        .subscribe(dados => {
          alert(dados.message)
          this.router.navigate(['/evento']);
        },
        (err) => {
          if (err.status >= 401 && err.status <= 403) {
            alert("Não foi possivel adicionar");
          }
        });

    } else {
      this.http.put(`${environment.urlServicos}/eventos/update.php`, body)
        .map(res => res)
        .subscribe(dados => {
          this.router.navigate(['/evento']);
          alert("Evento alterado com sucesso")
        },
        (err) => {
          if (err.status >= 401 && err.status <= 403) {
            alert("Erro para alterar evento")
          }
        });
    }
  }

}
