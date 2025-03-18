import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../interfaces/pokemon.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class Tab2Page implements OnInit {
  pokemonList: any[] = [];

  constructor(private pokemonService: PokemonService, private http: HttpClient) {}

  ngOnInit() {
    this.loadPokemonData();
  }

  loadPokemonData() {
    this.pokemonService.getPokemonList(20).subscribe((response) => {
      this.pokemonList = response.results.map((pokemon, index) => {
        const pokemonId = index + 1;
        return {
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
          height: 0,
          weight: 0,
          types: [],
          apiUrl: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
        };
      });

      // Llamar a la API para obtener datos detallados (tipos, peso y altura)
      this.pokemonList.forEach((pokemon) => {
        this.http.get<any>(pokemon.apiUrl).subscribe((data) => {
          pokemon.height = data.height;
          pokemon.weight = data.weight;
          pokemon.types = data.types.map((t: any) => t.type.name);
        });
      });
    });
  }
}
