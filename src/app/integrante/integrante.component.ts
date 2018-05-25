import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-integrante',
  templateUrl: './integrante.component.html',
  styleUrls: ['./integrante.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IntegranteComponent implements OnInit {

public integrantes = []

  constructor(
    private http: Http,
    private route: ActivatedRoute,
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
