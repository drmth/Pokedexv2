import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { Chain, EvolutionChain } from 'src/app/interfaces/evolution-chain';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent implements OnInit {
  currentPokemonName: string | undefined;
  currentPokemon: Pokemon | undefined;
  evolution: string[] = [];
  hasPopulatedEvolution: Boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.currentPokemonName = paramMap.get('name') ?? '';
      this.currentPokemon = this.getDetailedPokemon(this.currentPokemonName);
      this.getPokemonEvolutionChain(this.currentPokemon.id);
    });
  }

  getDetailedPokemon(pokemonName: string): Pokemon {
    return this.pokemonService.getDetailedPokemon(pokemonName);
  }

  getPokemonEvolutionChain(currentPokemonID: number) {
    this.pokemonService
      .getPokemonEvolutionChain(currentPokemonID)
      .subscribe((chain: EvolutionChain) => {
        this.populateEvolutionArray(chain.chain.species.name);
        if (!this.hasEvolution(chain.chain.evolves_to)) return;
        this.getEachEvolution(chain.chain.evolves_to);
      });
  }

  getPokemonDescription(): string {
    return this.pokemonService.getPokemonDescription();
  }

  populateEvolutionArray(pokemonName: string) {
    this.evolution.push(pokemonName);
  }

  getEachEvolution(chain: Chain[]) {
    this.populateEvolutionArray(chain[0].species.name);
    if (!this.hasEvolution(chain[0].evolves_to)) return;
    this.getEachEvolution(chain[0].evolves_to);
  }

  hasPopulatedEvolutionArray(): Boolean {
    return (this.hasPopulatedEvolution = true);
  }

  hasEvolution(evolutionArray: Chain[]): Boolean {
    if (evolutionArray.length === 0) {
      this.hasPopulatedEvolution = true;
      return false;
    }
    return true;
  }

  getTypeColor(type: string): string {
    return this.pokemonService.getTypeColor(type);
  }
}
