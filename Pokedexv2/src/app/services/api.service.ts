import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../interfaces/pokemon';
import {
  ListOfPokemonAndURL,
  Result,
} from '../interfaces/list-of-pokemon-and-url';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  URL = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getListOfPokemonsAndURL(): Observable<Result[]> {
    return this.http
      .get<ListOfPokemonAndURL>(`${this.URL}?limit=10`)
      .pipe(map((list: ListOfPokemonAndURL) => list.results));
  }

  getDetailedInfoForAPokemon(pokemonName: string): any {
    this.http.get<Pokemon>(`${this.URL}/${pokemonName}`).pipe(
      switchMap((pokemon: any) => {
        return pokemon;
      })
    );
  }
}
