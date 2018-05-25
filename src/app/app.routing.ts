import { LogoutComponent } from './logout/logout.component';
import { CrachaComponent } from './cracha/cracha.component';
import { IntegrantesImpressaoComponent } from './integrantes-impressao/integrantes-impressao.component';
import { ConferenciaFormComponent } from './conferencia-form/conferencia-form.component';
import { IntegranteFormComponent } from './integrante-form/integrante-form.component';
import { IntegranteComponent } from './integrante/integrante.component';
import { EventoFormComponent } from './evento-form/evento-form.component';
import { InscricaoFormComponent } from './inscricao-form/inscricao-form.component';
import { InscricaoComponent } from './inscricao/inscricao.component';
import { EventoComponent } from './evento/evento.component';
import { LoginComponent } from './login/login.component';
import { CorporacaoComponent } from './corporacao/corporacao.component';
import { CorporacaoFormComponent } from './corporacao-form/corporacao-form.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConferenciaComponent } from './conferencia/conferencia.component';

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'corporacao-form/:id', component: CorporacaoFormComponent },
    { path: 'corporacao-form', component: CorporacaoFormComponent },
    { path: 'corporacao', component: CorporacaoComponent },
    { path: 'evento', component: EventoComponent },
    { path: 'evento-form', component: EventoFormComponent },
    { path: 'evento-form/:id', component: EventoFormComponent },
    { path: 'inscricao', component: InscricaoComponent },
    { path: 'inscricao-form', component: InscricaoFormComponent },
    { path: 'inscricao-form/:id', component: InscricaoFormComponent },
    { path: 'integrante', component: IntegranteComponent },
    { path: 'integrante-form', component: IntegranteFormComponent },
    { path: 'integrante-form/:rg', component: IntegranteFormComponent },
    { path: 'conferencia', component: ConferenciaComponent },
    { path: 'conferencia-form/:id', component: ConferenciaFormComponent },
    { path: 'integrantes-impressao', component: IntegrantesImpressaoComponent },
    { path: 'cracha', component: CrachaComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '', component: EventoComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);