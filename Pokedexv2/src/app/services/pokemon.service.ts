import { Injectable } from '@angular/core';
import { Pokemon, Type } from '../interfaces/pokemon';
import { ListOfPokemonAndURL } from '../interfaces/list-of-pokemon-and-url';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  listOfPokemonAndURLFromAPI?: ListOfPokemonAndURL;
  listOfDetailedPokemons: Pokemon[] = [];
  pokemonTypes: string[] = [];

  constructor(private APIService: APIService) {}

  getListOfPokemon(): Pokemon[] {
    if (this.listOfDetailedPokemons.length === 0) {
      this.getListOfPokemonAndURL();
    }

    return this.listOfDetailedPokemons;
  }

  getListOfPokemonAndURL() {
    this.APIService.getListOfPokemonsAndURL().subscribe((results) => {
      this.listOfPokemonAndURLFromAPI = results;
      this.getDetailedListOfPokemon();
    });
  }

  getDetailedListOfPokemon() {
    this.listOfPokemonAndURLFromAPI?.results.forEach((pokemon) => {
      this.APIService.getDetailedInfoForAPokemon(pokemon.name).subscribe(
        (pokemon: Pokemon) => {
          this.listOfDetailedPokemons.push(pokemon);
          this.getListOfPokemonType();
        }
      );
    });
  }

  getListOfPokemonType(): string[] {
    if (!this.pokemonTypes) {
      this.listOfDetailedPokemons.forEach((pokemon) => {
        pokemon.types.forEach((type) => {
          this.pokemonTypes.push(type.type.name);
        });
      });
    }

    return [...new Set(this.pokemonTypes)];
  }
}
