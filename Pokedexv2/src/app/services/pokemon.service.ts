import { Injectable } from '@angular/core';
import { Pokemon, Type } from '../interfaces/pokemon';
import { ListOfPokemonAndURL } from '../interfaces/list-of-pokemon-and-url';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  listOfPokemonAndURLFromAPI?: ListOfPokemonAndURL;
  public listOfDetailedPokemons: Pokemon[] = [];
  pokemonTypes: string[] = [];

  listOfDetailedPokemons2: Pokemon[] = [];

  constructor(private APIService: APIService) {}

  getListOfPokemon(type: string): Pokemon[] {
    if (this.listOfDetailedPokemons.length === 0) {
      this.getListOfPokemonAndURL();
      return this.listOfDetailedPokemons;
    }

    if (type) {
      return this.filterListOfPokemonByType(type);
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

  filterListOfPokemonByType(type: string): Pokemon[] {
    const pok: Pokemon[] = [];
    for (let pokemon of this.listOfDetailedPokemons) {
      for (let pokemonType of pokemon.types) {
        if (pokemonType.type.name == type.toLowerCase()) {
          pok.push(pokemon);
        }
      }
    }

    /* return this.listOfDetailedPokemons.filter((pokemon) =>
      pokemon.types.forEach((pokemontype) => {
        console.log(pokemontype.type.name == type.toLowerCase());
        pokemontype.type.name == type.toLowerCase();
      })
    ); */

    return pok;
  }

  getListOfPokemonType() {
    /* this.listOfDetailedPokemons.forEach((pokemon) => {
      pokemon.types.forEach((type) => {
        this.pokemonTypes.push(type.type.name);
      });
    });

    return [...new Set(this.pokemonTypes)]; */
  }
}
