import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';

  constructor(private router: Router) {}
  pokemons: any[] = [];
  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      this.router.navigate(['/home']);
    } else {
      this.fetchRandomPokemonData();
    }
    this.fetchRandomPokemonData()
  const user = localStorage.getItem('currentUser');
  console.log('Usuario en localStorage:', user);
  
  if (!user) {
    console.warn('No hay usuario, redirigiendo a login');
    this.router.navigate(['/login']);
  } else {
    console.log('Usuario autenticado, mostrando contenido');
    this.fetchRandomPokemonData();
  }
  }

  onSearchInput(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  fetchRandomPokemonData(): void {
    const main = document.querySelector('.pokemon-grid');
    if (main) main.innerHTML = '';
    
    for (let i = 0; i < 8; i++) {
      const randomPokemonId = Math.floor(Math.random() * 1010) + 1;
      this.fetchPokemonById(randomPokemonId);
    }
  }

  fetchPokemonById(pokemonId: number | string): void {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(data => {
        this.displayPokemonData(data);
      })
      .catch(error => {
        console.error('Error fetching Pokémon data:', error);
      });
  }

  displayPokemonData(pokemon: any): void {
    const main = document.querySelector('.pokemon-grid');
    if (!main) return;

    const pokemonInfo = document.createElement('div');
    pokemonInfo.className = 'pokemon-info';

    const name = document.createElement('h2');
    name.textContent = pokemon.name;

    const image = document.createElement('img');
    image.src = pokemon.sprites.front_default;
    image.alt = pokemon.name;

    const abilities = document.createElement('p');
    abilities.textContent = 'Habilidades: ' + pokemon.abilities.map((ability: any) => ability.ability.name).join(', ');

    const statsSection = document.createElement('div');
    statsSection.className = 'stats';
    const statsTitle = document.createElement('h3');
    statsTitle.textContent = 'Estadísticas:';
    statsSection.appendChild(statsTitle);

    pokemon.stats.forEach((stat: any) => {
      const statText = document.createElement('p');
      statText.textContent = `${stat.stat.name}: ${stat.base_stat}`;
      statsSection.appendChild(statText);
    });

    pokemonInfo.appendChild(name);
    pokemonInfo.appendChild(image);
    pokemonInfo.appendChild(abilities);
    pokemonInfo.appendChild(statsSection);
    main.appendChild(pokemonInfo);
    this.pokemons = [...this.pokemons, pokemon];
  }

  signOut(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    this.router.navigate(['/login']);
  }

  searchPokemon(): void {
    if (this.searchTerm.trim()) {
      const main = document.querySelector('.pokemon-grid');
      if (main) main.innerHTML = '';
      this.fetchPokemonById(this.searchTerm.toLowerCase());
    }
  }
}