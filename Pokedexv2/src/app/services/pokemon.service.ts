import { Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private APIService: APIService) {}

  getListOfPokemonsFromAPI(): Pokemon[] {
    return this.APIService.getListOfPokemonsFromAPI();
  }
}
