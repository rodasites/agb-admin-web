import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Component({
  selector: 'app-integrantes-impressao',
  templateUrl: './integrantes-impressao.component.html',
  styleUrls: ['./integrantes-impressao.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IntegrantesImpressaoComponent implements OnInit {

  public integrantes = []

  constructor(
    private http: Http,
  ) { }

  ngOnInit() {
    this.carregarIntegrantes()
  }

  carregarIntegrantes() {
    this.http.get(`${environment.urlServicos}/integrantes/read.php`)
      .map(res => res.json())
      .subscribe((dados) => {
        this.integrantes = dados.records;
      },
      (err) => {
      });
  }

}
