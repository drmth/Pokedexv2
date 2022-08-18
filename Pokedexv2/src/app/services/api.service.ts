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

  getListOfPokemonsAndURL(): Observable<ListOfPokemonAndURL> {
    return this.http
      .get<ListOfPokemonAndURL>(`${this.URL}?limit=10`);
  }

  getDetailedInfoForAPokemon(pokemonName: string): any {
    return this.http.get<Pokemon>(`${this.URL}/${pokemonName}`);
  }
}
