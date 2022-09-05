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

    return pokemonsList.filter((pokemon: Pokemon) => {
      return pokemon.name.includes(userResearch);
    });
  }
}
