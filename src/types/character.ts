export interface Wand {
  wood: string;
  core: string;
  length: number;
}

export interface Character {
  id: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  image: string;
  house: string;
  species: string;
  actor: string;
  ancestry: string;
  alive: boolean;
  wand: Wand;
}
