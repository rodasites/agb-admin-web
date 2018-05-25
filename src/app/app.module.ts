import { UserServiceService } from './user-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { CorporacaoComponent } from './corporacao/corporacao.component';
import { CorporacaoFormComponent } from './corporacao-form/corporacao-form.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FilterPipe } from './filter.pipe';
import { EventoComponent } from './evento/evento.component';
import { InscricaoComponent } from './inscricao/inscricao.component';
import { InscricaoFormComponent } from './inscricao-form/inscricao-form.component';
import { EventoFormComponent } from './evento-form/evento-form.component';
import { IntegranteComponent } from './integrante/integrante.component';
import { IntegranteFormComponent } from './integrante-form/integrante-form.component';
import { ConferenciaComponent } from './conferencia/conferencia.component';
import { ConferenciaFormComponent } from './conferencia-form/conferencia-form.component';
import { IntegrantesImpressaoComponent } from './integrantes-impressao/integrantes-impressao.component';
import { CrachaComponent } from './cracha/cracha.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    CorporacaoComponent,
    CorporacaoFormComponent,
    LoginComponent,
    HeaderComponent,
    MenuComponent,
    FilterPipe,
    EventoComponent,
    InscricaoComponent,
    InscricaoFormComponent,
    EventoFormComponent,
    IntegranteComponent,
    IntegranteFormComponent,
    ConferenciaComponent,
    ConferenciaFormComponent,
    IntegrantesImpressaoComponent,
    CrachaComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    TextMaskModule
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
