import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-conferencia-form',
  templateUrl: './conferencia-form.component.html',
  styleUrls: ['./conferencia-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConferenciaFormComponent implements OnInit {

  public mensagemPendencias = []

  public integrantesConferidos = []

  public integrantesInscritos = []

  public corporacao = {}

  public categoria = {
    nome: undefined
  }

  public modalidade = {
    id:undefined
  }

  public evento = {
    data: undefined
  }

  public validacao = false

  public idadeMaxima = undefined

  public funcao = {
    componentesInscritos: 0,
    percursao: 0,
    iMelodico: 0,
    pelotaoDeBandeiras: 0,
    baliza: 0,
    mor: 0,
    corpoCoreografico: 0,
  }

  public isPercursao = undefined

  private paramId = undefined

  public inscricao = {
    id: undefined,
    is_active: undefined,
    corporacoes: undefined,
    eventos: undefined,
    categorias: undefined,
    modalidades: undefined
  }


  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.paramId = params['id'];
    });
    this.carregarIntegrantes()
    this.getInscricao()

  }

  carregarIntegrantes() {
    this.http.get(`${environment.urlServicos}/integrantes/findByIdInscricao.php?id=${this.paramId}`)
      .map(res => res.json())
      .subscribe((dados) => {
        this.integrantesConferidos = []
        this.integrantesInscritos = []
        for (let dado of dados.records) {
          if (dado.conferido == 1) {
            this.integrantesConferidos.push(dado)
          } else {
            this.integrantesInscritos.push(dado)
          }
        }
        this.atualizaContador()
      },
      (err) => {
      });

  }

  updateConfirmado(isActive, integrante) {
    let body = {
      integrantes_id: integrante.id,
      inscricoes_id: this.paramId,
      is_active: isActive
    }
    let tmpAnoEvento = this.evento.data.split('-');
    let tmpAnoNascimento = integrante.data_nascimento.split('-')

    let idade = tmpAnoEvento[0] - tmpAnoNascimento[0]

    if (idade <= this.idadeMaxima) {
      this.http.put(`${environment.urlServicos}/integrantes/updateConfirmado.php`, body)
       .map(res => res)
       .subscribe(dados => {
         this.carregarIntegrantes()
       },
       (err) => {
         if (err.status >= 401 && err.status <= 403) {
           alert("Erro para alterar")
         }
       }); 
     }else{
       alert("Idade acima da permitida")
     }
  }

  getInscricao() {
    this.http.get(`${environment.urlServicos}/inscricoes/findById.php?id=${this.paramId}`)
      .map(res => res.json())
      .subscribe(dados => {
        this.inscricao = dados.records[0]
        this.getCorporacao(this.inscricao.corporacoes)
        this.verificaIdadeMaxima(this.inscricao.categorias)
        this.getModalidade(this.inscricao.modalidades)
        this.getEvento(this.inscricao.eventos)
      });
  }

  verificaPercursao() {

    if (this.inscricao.modalidades == "Banda de Percussão"
      || this.inscricao.modalidades == "Banda de Percussão Marcial"
      || this.inscricao.modalidades == "Banda de Percussão com Instrumentos Melódicos Simples"
      || this.inscricao.modalidades == "Banda de Percussão Sinfônica"
      || this.inscricao.modalidades == "Fanfarra Simples Tradicional"
      || this.inscricao.modalidades == "Fanfarra Simples Marcial") {
      this.isPercursao = true;
    } else {
      this.isPercursao = false;
    }
  }

  getCorporacao(id) {
    this.http.get(`${environment.urlServicos}/corporacoes/findById.php?id=${id}`)
      .map(res => res.json())
      .subscribe(dados => {
        this.corporacao = dados.records[0]
      });
  }

  getModalidade(id) {
    this.http.get(`${environment.urlServicos}/modalidades/findById.php?id=${id}`)
      .map(res => res.json())
      .subscribe(dados => {
        this.modalidade = dados.records[0]
        console.log(this.modalidade)
      });
    }
    
    getEvento(id) {
      this.http.get(`${environment.urlServicos}/eventos/findById.php?id=${id}`)
      .map(res => res.json())
      .subscribe(dados => {
        this.evento = dados.records[0]
        console.log(this.evento)
      });
  }

  atualizaContador() {
    this.funcao = {
      componentesInscritos: 0,
      percursao: 0,
      iMelodico: 0,
      pelotaoDeBandeiras: 0,
      baliza: 0,
      mor: 0,
      corpoCoreografico: 0,
    }
    for (let integrante of this.integrantesConferidos) {
      this.funcao.componentesInscritos++
      switch (integrante.funcao) {
        case "Percussão": {
          this.funcao.percursao++
          break;
        }
        case "I. Melódico": {
          this.funcao.iMelodico++
          break;
        }

        case "Pelotão de Bandeiras": {
          this.funcao.pelotaoDeBandeiras++
          break;
        }

        case "Baliza": {
          this.funcao.baliza++
          break;
        }

        case "Mor": {
          this.funcao.mor++
          break;
        }

        case "Corpo Coreográfico": {
          this.funcao.corpoCoreografico++
          break;
        }


        default: {
          break;
        }
      }
      this.validador()
    }
  }

  validador() {
    this.mensagemPendencias = []
    this.validacao = true
    if (this.funcao.baliza <=0 && this.funcao.baliza > 2) {
      this.mensagemPendencias.push(`- Baliza deve conter no máximo 1 componente</b>, atualmente contém ${this.funcao.baliza}`)
      this.validacao = false
    }
    if (this.funcao.mor  <=0 &&  this.funcao.mor > 2) {
      this.mensagemPendencias.push(`- Mor deve conter no máximo 1  componente, atualmente contém ${this.funcao.mor}`)
      this.validacao = false
    }
    if (this.funcao.corpoCoreografico < 12) {
      this.mensagemPendencias.push(`- Corpo coreográfico deve conter no mínimo 12 componentes, atualmente contém ${this.funcao.corpoCoreografico}`)
    }
    if (this.funcao.percursao > this.funcao.iMelodico) {
      this.mensagemPendencias.push(`- Instrumento melódico não pode ser menor que a Percursão, atualmente I.melódico: ${this.funcao.iMelodico}, Percursão ${this.funcao.percursao} `)
      this.validacao = false
    }

    // Um componente pode participar de 2 ou mais corporações desde que seja de categoria tecnica diferente
    // pelotão de bandeiras não pode ser maior que o numero de componentes da banda(i melodico percursão)
  }

  verificaIdadeMaxima(modalidade) {

    switch (modalidade) {
      case "1": {
        this.idadeMaxima = 15
        this.categoria.nome = "Infantil"
        break;
      }
      case "2": {
        this.idadeMaxima = 18
        this.categoria.nome = "Infanto Juvenil"
        break;
      }

      case "3": {
        this.idadeMaxima = 21
        this.categoria.nome = "Juvenil"
        break;
      }

      case "4": {
        this.idadeMaxima = 120
        this.categoria.nome = "Senior"
        break;
      }

      default: {
        break;
      }
    }

  }
}
