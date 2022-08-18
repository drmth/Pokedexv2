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
  pokemonsList: Pokemon[] = this.pokemonService.getListOfPokemon('');
  pokemonType: string[] = [];

  constructor(private pokemonService: PokemonService) {
    this.getPokemonType();
  }

  filterListOfPokemonByType(type: string) {
    this.pokemonsList = this.pokemonService.getListOfPokemon(type);
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
