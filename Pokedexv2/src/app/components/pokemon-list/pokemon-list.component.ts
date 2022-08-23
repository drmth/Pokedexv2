import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonType } from 'src/app/interfaces/pokemon-type';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  pokemonsList: Pokemon[] = this.pokemonService.getListOfPokemon([]);
  pokemonType: string[] = [];
  filters: string[] = [];

  constructor(private pokemonService: PokemonService) {
    this.getPokemonType();
  }

  filterListOfPokemonByType(type: string) {
    this.filters.push(type);
    this.pokemonsList = this.pokemonService.getListOfPokemon(this.filters);
  }

  removeFilter(filter: string) {
    const index = this.filters.indexOf(filter);
    if (index > -1) {
      this.filters.splice(index, 1);
    }
    this.pokemonsList = this.pokemonService.getListOfPokemon(this.filters);
  }

  getPokemonType(): string[] {
    for (let type in PokemonType) {
      if (isNaN(Number(type))) {
        this.pokemonType.push(type);
      }
    }
    return this.pokemonType.sort();
  }
}
