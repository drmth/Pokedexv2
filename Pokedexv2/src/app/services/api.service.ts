import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../interfaces/pokemon';
import { ListOfPokemonAndURL } from '../interfaces/list-of-pokemon-and-url';
import { Observable } from 'rxjs';
import { PokemonSpecies } from '../interfaces/pokemon-species';
import { EvolutionChain } from '../interfaces/evolution-chain';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  URL = 'https://pokeapi.co/api/v2/pokemon';
  URLGetSpecies = 'https://pokeapi.co/api/v2/pokemon-species/';

  constructor(private http: HttpClient) {}

  getListOfPokemonsAndURL(): Observable<ListOfPokemonAndURL> {
    return this.http.get<ListOfPokemonAndURL>(`${this.URL}?limit=151`);
  }

  getDetailedInfoForAPokemon(pokemonName: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.URL}/${pokemonName}`);
  }

  getPokemonEvolutionChain(
    currentPokemonID: number
  ): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(
      `${this.URLGetSpecies}${currentPokemonID}`
    );
  }

  getPokemonEvolution(
    currentPokemonEvolutionChain: string
  ): Observable<EvolutionChain> {
    return this.http.get<EvolutionChain>(currentPokemonEvolutionChain);
  }
}
