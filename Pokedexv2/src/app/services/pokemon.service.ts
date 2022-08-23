import { Injectable } from '@angular/core';
import { Pokemon, Type } from '../interfaces/pokemon';
import { ListOfPokemonAndURL } from '../interfaces/list-of-pokemon-and-url';
import { APIService } from './api.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  listOfPokemonAndURLFromAPI?: ListOfPokemonAndURL;
  public listOfDetailedPokemons: Pokemon[] = [];

  constructor(private APIService: APIService) {}

  getListOfPokemon(types: string[]): Pokemon[] {
    if (this.listOfDetailedPokemons.length === 0) {
      this.getListOfPokemonAndURL();
      return this.listOfDetailedPokemons;
    }

    if (types.length > 0) {
      return this.filterListOfPokemonByType(types);
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
        }
      );
    });
  }

  filterListOfPokemonByType(types: string[]): Pokemon[] {
    return this.listOfDetailedPokemons.filter((pokemon) => {
      let doesPokemonMatchTheType: boolean[] = [];
      pokemon.types.forEach((pokemonType) => {
        types.forEach((type) => {
          doesPokemonMatchTheType.push(
            pokemonType.type.name.includes(type.toLowerCase())
          );
        });
      });
      return doesPokemonMatchTheType.includes(true);
    });
  }

  getDetailedPokemon(pokemonName: string): Pokemon {
    return this.listOfDetailedPokemons.filter(
      (pokemon: Pokemon) => pokemon.name === pokemonName
    )[0];
  }

  getPokemonEvolutionChain(currentPokemonID: number) {
    return this.APIService.getPokemonEvolutionChain(currentPokemonID).pipe(
      switchMap((pokemonEvolutionChain) =>
        this.APIService.getPokemonEvolution(
          pokemonEvolutionChain.evolution_chain.url
        )
      )
    );
  }
}
