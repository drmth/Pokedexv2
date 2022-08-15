import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemonsList: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {
    this.pokemonsList = this.pokemonService.getListOfPokemonsFromAPI();
  }

  ngOnInit(): void {
  }
}
