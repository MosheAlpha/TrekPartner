import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TrekInfoComponent } from './components/trek-info/trek-info.component';

import { TreksComponent } from './components/treks/treks.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddTrekComponent } from './components/add-trek/add-trek.component';

const routes: Routes = [
  // { path: 'main', component: MainComponent, canActivate: [AuthGuard] },

  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MainPageComponent},
  // { path: 'trek', component: TrekInfoComponent},
  { path: 'addTrek', component: AddTrekComponent},
  { path: 'trek/:id', component: TrekInfoComponent},
  { path: 'treks', component: TreksComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'about', component: AboutComponent},
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
