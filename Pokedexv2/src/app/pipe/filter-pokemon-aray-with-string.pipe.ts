import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';
import { PokemonItemComponent } from '../components/pokemon-item/pokemon-item.component';
import { Pokemon } from '../interfaces/pokemon';

@Pipe({
  name: 'filterPokemonArayWithString',
})
export class FilterPokemonArayWithStringPipe implements PipeTransform {
  transform(pokemonsList: Pokemon[], userResearch: string): Pokemon[] {
    if (userResearch === '') return pokemonsList;
    let filteredListOfPokemon = [] as Pokemon[];
    pokemonsList.forEach((pokemon: Pokemon) => {
      if (pokemon.name.includes(userResearch)) {
        filteredListOfPokemon.push(pokemon);
      }
    });
    return filteredListOfPokemon;
  }
}
