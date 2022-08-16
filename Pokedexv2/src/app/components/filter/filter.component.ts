import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  pokemonType: [] | undefined;

  constructor(private pokemonService: PokemonService) {
    this.pokemonService.getListOfPokemonType();
   }

  ngOnInit(): void {
  }

}
