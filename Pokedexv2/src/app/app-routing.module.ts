import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokemonItemComponent } from './components/pokemon-item/pokemon-item.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'pokemon/:name', component: PokemonItemComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
