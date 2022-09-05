import { Component, EventEmitter, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  pokemonInputValue: string | undefined;
  @Output() userSearchingPokemonEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onUserResearchChange(event: Event) {
    this.userSearchingPokemonEvent.emit(this.pokemonInputValue);
  }
}
