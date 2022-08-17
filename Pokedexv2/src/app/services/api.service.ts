import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../interfaces/pokemon';
import {
  ListOfPokemonAndURL,
  Result,
} from '../interfaces/list-of-pokemon-and-url';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  URL = 'https://pokeapi.co/api/v2/pokemon';
  listOfPokemonsAndURL: ListOfPokemonAndURL | undefined;
  listOfDetailedPokemon: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  getListOfPokemonsAndURL(): Observable<Result[]> {
    return this.http
      .get<ListOfPokemonAndURL>(`${URL}?limit=10`)
      .pipe(map((list: ListOfPokemonAndURL) => list.results));
  }

  getDetailedInfoForAPokemon(pokemonName: string) {
    try {
      this.http
        .get<Pokemon>(`${URL}/${pokemonName}`)
        .subscribe((pokemon: Pokemon) =>
          this.listOfDetailedPokemon.push(pokemon)
        );
    } catch (error) {
      console.error(error);
    }
  }
}
