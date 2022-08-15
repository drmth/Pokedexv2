import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  pokemonsList: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  getListOfPokemonsFromAPI(): Pokemon[] {
    this.http
      .get('https://pokeapi.co/api/v2/pokemon?limit=10')
      .subscribe((pokemons: any) => {
        pokemons.results.forEach((pokemon: Pokemon) => {
          this.getPokemonInfosFromAPI(pokemon.name);
        });
      });

    console.log(this.pokemonsList);

    return this.pokemonsList;
  }

  getPokemonInfosFromAPI(pokemonName: string) {
    this.http
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .subscribe((pokemonFromAPI: any) => {
          this.pokemonsList.push(pokemonFromAPI);
      });
  }
}
