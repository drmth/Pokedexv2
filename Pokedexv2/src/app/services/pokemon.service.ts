import { Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { ListOfPokemonAndURL } from '../interfaces/list-of-pokemon-and-url';
import { APIService } from './api.service';
import { switchMap } from 'rxjs';
import { PokemonTypeEnum } from '../interfaces/pokemon-type';
import { FlavorTextEntry, PokemonSpecies } from '../interfaces/pokemon-species';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  listOfPokemonAndURLFromAPI?: ListOfPokemonAndURL;
  public listOfDetailedPokemons: Pokemon[] = [];
  typesFilter: string[] | undefined;
  searchFilter: string = '';
  currentPokemonDescription: string[] = [];

  constructor(private APIService: APIService) {}

  getListOfPokemon(types: string[]): Pokemon[] {
    if (this.listOfDetailedPokemons.length === 0) {
      this.getListOfPokemonAndURL();
    }

    if (types.length > 0) {
      this.typesFilter = types;
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
      switchMap((pokemonEvolutionChain: PokemonSpecies) => {
        this.setPokemonDescriptionArray(
          pokemonEvolutionChain.flavor_text_entries
        );
        return this.APIService.getPokemonEvolution(
          pokemonEvolutionChain.evolution_chain.url
        );
      })
    );
  }

  setPokemonDescriptionArray(flavor_text_entries: FlavorTextEntry[]) {
    this.currentPokemonDescription = [];
    flavor_text_entries.forEach((flavor_text_entry: FlavorTextEntry) => {
      if (flavor_text_entry.language.name === 'en') {
        this.currentPokemonDescription.push(
          this.removeNewLineCharactersFromString(flavor_text_entry.flavor_text)
        );
      }
    });
  }

  getPokemonDescription(): string {
    if (this.currentPokemonDescription.length > 0) {
      let uniqueDecriptionValue = [...new Set(this.currentPokemonDescription)];

      return uniqueDecriptionValue.join(' ');
    }

    return '';
  }

  getPokemonType(): string[] {
    return Object.keys(PokemonTypeEnum)
      .filter((key) => isNaN(+key))
      .sort();
  }

  removeNewLineCharactersFromString(string: string): string {
    return string.replace(/\n|\f/g, ' ');
  }

  getTypeColor(type: string): string {
    const indexOfType = Object.keys(PokemonTypeEnum).indexOf(
      type.toUpperCase() as unknown as PokemonTypeEnum
    );
    const colorValue = Object.values(PokemonTypeEnum)[indexOfType];

    return colorValue;
  }
}
