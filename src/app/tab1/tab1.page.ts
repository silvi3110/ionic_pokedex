import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { Pokemon } from '../interfaces/pokemon.interface';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true, 
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList], // ✅ Agrega CommonModule
})
export class Tab1Page implements OnInit {
  pokemonList: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemonList();
  }

  loadPokemonList() {
    this.pokemonService.getPokemonList().subscribe((response) => {
      console.log("Pokémon list response:", response); 
      this.pokemonList = response.results;
    }, (error) => {
      console.error("Error fetching Pokémon list:", error);
    });
  }

  trackByIndex(index: number, item: Pokemon): number {
    return index;
  }
}
