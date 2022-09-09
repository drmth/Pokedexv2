import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { Chain, EvolutionChain } from 'src/app/interfaces/evolution-chain';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FlavorTextEntry } from 'src/app/interfaces/pokemon-species';
import Chart from 'chart.js/auto/auto.mjs';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent implements OnInit, AfterViewInit {
  @ViewChild('barCanvas') barCanvas: ElementRef | undefined;
  barChart: Chart | undefined;

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

  ngAfterViewInit(): void {
    this.barChartStat();
  }

  barChartStat() {
    this.barChart = new Chart(this.barCanvas?.nativeElement, {
      type: 'bar',
      data: {
        labels: this.getChartLabel(),
        datasets: [
          {
            label: '# of Votes',
            data: this.getChartData(),
            backgroundColor: this.getChartColor(),
            borderColor: this.getChartColor(),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getChartLabel(): string[] {
    let labelChart: string[] = [];
    this.currentPokemon?.stats.forEach((stat) => {
      labelChart.push(stat.stat.name);
    });
    return labelChart;
  }

  getChartData(): number[] {
    let dataChart: number[] = [];
    this.currentPokemon?.stats.forEach((stat) => {
      dataChart.push(stat.base_stat);
    });
    return dataChart;
  }

  getChartColor(): string[] {
    let chartColor: string[] = [];
    if (this.currentPokemon?.stats) {
      for (var i = 0; i < this.currentPokemon?.stats.length; i++) {
        chartColor.push(
          `rgba(
            ${Math.floor(Math.random() * 255)},
            ${Math.floor(Math.random() * 255)},
            ${Math.floor(Math.random() * 255)},
            0.2)`
        );
      }
    }
    return chartColor;
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

  getPokemonDescription(): FlavorTextEntry[] {
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
