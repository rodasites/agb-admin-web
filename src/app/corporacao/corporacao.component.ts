import { UserServiceService } from './../user-service.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-corporacao',
  templateUrl: './corporacao.component.html',
  styleUrls: ['./corporacao.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CorporacaoComponent implements OnInit {


  private corporacoes = []

  constructor(
    private http: Http,
    private userservice: UserServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
/*     if(!this.userservice.getAutenticado()){
      this.router.navigate(["/login"]);
    }else{
      this.getProducts();
    } */
    this.getCorporacoes();
  }

  getCorporacoes() {
    this.http.get(`${environment.urlServicos}/corporacoes/read.php`)
      .map(res => res.json()) 
      .subscribe(dados => {
        this.corporacoes = dados.records
      }
      );
  }

}
