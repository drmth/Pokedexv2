import { Injectable } from '@angular/core';
import { Pokemon, Type } from '../interfaces/pokemon';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemonsList: Pokemon[] = [];
  pokemonTypes: Type[] = [];

  constructor(private APIService: APIService) {}

  getListOfPokemonsFromAPI(): Pokemon[] {
    this.pokemonsList = this.APIService.getListOfPokemonsFromAPI();
    return this.pokemonsList;
  }

  getListOfPokemonType(): Type[] {
    console.log(this.pokemonsList);
    this.pokemonsList.forEach(pokemon => {
      pokemon.types.forEach(element => {
        this.pokemonTypes = pokemon.types
      });
    });

    //console.log(new Set(this.pokemonTypes));

    return this.pokemonTypes
  }
}
