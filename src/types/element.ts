
export interface PeriodicElement {
  name: string;
  appearance: string | null;
  atomic_mass: number;
  atomic_number: number;
  boil: number | null;
  category: string;
  density: number | null;
  discovered_by: string | null;
  electron_affinity: number | null;
  electron_configuration: string;
  electron_configuration_semantic: string;
  electronegativity_pauling: number | null;
  group: number;
  ionization_energies: number[];
  melt: number | null;
  molar_heat: number | null;
  named_by: string | null;
  number: number; 
  period: number;
  phase: 'Gas' | 'Solid' | 'Liquid' | 'Unknown'; 
  source: string;
  spectral_img: string | null;
  summary: string;
  symbol: string;
  xpos: number; 
  ypos: number;
  shells: number[];
  bohr_model_image?: string | null;
  block: 's' | 'p' | 'd' | 'f';
}

export type ElementProperty = keyof PeriodicElement;
