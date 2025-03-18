export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
  }
  
  export interface Pokemon {
    name: string;
    url: string;
  }
  
  