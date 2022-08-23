import { Component, OnInit } from '@angular/core';
import { PokemonType } from 'src/app/interfaces/pokemon-type';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  pokemonType: string[] = [];

  constructor(private pokemonService: PokemonService) {
    for (let type in PokemonType) {
      if (isNaN(Number(type))) {
        this.pokemonType.push(type);
      }
    }
  }

  filterListOfPokemonByType(type: string) {
    //this.pokemonService.getListOfPokemon(type);
  }

  ngOnInit(): void {}
}
