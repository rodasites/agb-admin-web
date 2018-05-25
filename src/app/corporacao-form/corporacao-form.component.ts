import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { UserServiceService } from '../user-service.service';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';


@Component({
  selector: 'app-corporacao-form',
  templateUrl: './corporacao-form.component.html',
  styleUrls: ['./corporacao-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CorporacaoFormComponent implements OnInit {

  public maskCnpj = [/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'/', /\d/, /\d/, /\d/, /\d/ ,'-', /\d/, /\d/]; 
  public maskCep = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  corporacao = {
    isActive: undefined,
    nome: undefined,
    usuario: undefined,
    senha: undefined,
    confSenha: undefined,
    mantenedora: undefined,
    cnpj: undefined,
    nome_responsavel_mantenedora: undefined,
    cep: undefined,
    cidade: undefined,
    bairro: undefined,
    endereco: undefined,
    coordenador: undefined,
    tel_coordenador: undefined,
    regente: undefined,
    telefone_regente: undefined
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
          this.loadCorporacao(this.paramId);
          this.isNew = false;
        }
      });
  }

  loadCorporacao(id) {
    this.http.get(`${environment.urlServicos}/corporacoes/findById.php?id=${this.paramId}`)
    .map(res => res.json())
    .subscribe((dados) => {
      this.corporacao.nome= dados.records[0].nome;
      this.corporacao.usuario= dados.records[0].usuario;
      this.corporacao.senha= dados.records[0].senha;
      this.corporacao.confSenha= dados.records[0].senha;
      this.corporacao.mantenedora= dados.records[0].mantenedora;
      this.corporacao.cnpj= dados.records[0].cnpj;
      this.corporacao.nome_responsavel_mantenedora= dados.records[0].nome_responsavel_mantenedora;
      this.corporacao.cep= dados.records[0].cep;
      this.corporacao.cidade= dados.records[0].cidade;
      this.corporacao.bairro= dados.records[0].bairro;
      this.corporacao.endereco= dados.records[0].endereco;
      this.corporacao.coordenador= dados.records[0].coordenador;
      this.corporacao.tel_coordenador= dados.records[0].tel_coordenador;
      this.corporacao.regente= dados.records[0].regente;
      this.corporacao.telefone_regente= dados.records[0].telefone_regente;
    },
   );
  }

  salvarCorporacao(response){
   
    
    let body={
      id: undefined,
      is_active: "1",
      nome: response.nome,
      usuario: response.usuario,
      senha: response.senha,
      mantenedora: response.mantenedora,
      cnpj: response.cnpj,
      nome_responsavel_mantenedora: response.nome_responsavel_mantenedora,
      cep: response.cep,
      cidade: response.cidade,
      bairro: response.bairro,
      endereco: response.endereco,
      coordenador: response.coordenador,
      tel_coordenador: response.tel_coordenador,
      regente: response.regente,
      telefone_regente: response.telefone_regente
    }
    body.cnpj = response.cnpj.replace(/\D/g, ''); 

    if (this.verificaCampos()){
      if (this.isNew) {
        this.http.post(`${environment.urlServicos}/corporacoes/create.php`, body)
          .map(res => res.json())
          .subscribe(dados => {
            alert(dados.message)
            this.router.navigate(['/corporacao']);
          },
        (err) => {
          if(err.status >= 401 && err.status <= 403){
            alert("Não foi possivel adicionar");
          }
        });
          
       }else {
        body.id = this.paramId;
        this.http.put(`${environment.urlServicos}/corporacoes/update.php`, body)
          .map(res => res)
          .subscribe(dados => {
            this.router.navigate(['/corporacao']);
            alert("Corporação alterada alterado")
          },
        (err) => {
          if(err.status >= 401 && err.status <= 403){
            alert("Erro para alterar corporacao")
          }
        });
      }
    }
  }

  verificaCampos()
  {
    return true
  }

  consultaCep(cep) {
    cep = cep.replace(/\D/g, '');

    if (cep != "") {
      var validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cep)) {
        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .map(res => res.json())
          .subscribe(dados => {
            this.corporacao.endereco = dados.logradouro;
            this.corporacao.bairro = dados.bairro;
            this.corporacao.cidade = dados.localidade;

          }
          );
      }
    }
  }

}
