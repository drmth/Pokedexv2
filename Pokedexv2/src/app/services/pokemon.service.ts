import { Injectable } from '@angular/core';
import { Pokemon, Type } from '../interfaces/pokemon';
import { ListOfPokemonAndURL } from '../interfaces/list-of-pokemon-and-url';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  listOfPokemonAndURLFromAPI = {} as ListOfPokemonAndURL;
  listOfDetailedPokemons: Pokemon[] = [];
  pokemonTypes: Type[] = [];

  constructor(private APIService: APIService) {}

  getListOfPokemon(): Pokemon[] {
    if (this.listOfDetailedPokemons.length === 0) {
      this.getListOfPokemonAndURL();
      this.getDetailedListOfPokemon();
    }

    return this.listOfDetailedPokemons;
  }

  getListOfPokemonAndURL() {
    this.APIService.getListOfPokemonsAndURL().subscribe((results) => {
      this.listOfPokemonAndURLFromAPI.results = results;
    });
  }

  getDetailedListOfPokemon() {
    if (this.listOfPokemonAndURLFromAPI) {
      this.listOfPokemonAndURLFromAPI.results.forEach((pokemon) => {
        this.APIService.getDetailedInfoForAPokemon(pokemon.name);
      });
    }
    this.listOfDetailedPokemons = this.APIService.listOfDetailedPokemon;
  }

  getListOfPokemonType(): Type[] {
    this.listOfDetailedPokemons.forEach((pokemon) => {
      pokemon.types.forEach((element) => {
        this.pokemonTypes = pokemon.types;
      });
    });

    //console.log(new Set(this.pokemonTypes));

    return this.pokemonTypes;
  }
}
