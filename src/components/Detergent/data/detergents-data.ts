import { DetergentProfile } from '../types/DetergentProfile';

export async function loadDetergents(): Promise<Map<string, DetergentProfile>> {
  const profiles = await import('./profiles');

  // Convert all exported profiles into an array
  return new Map<string, DetergentProfile>(Object.entries(profiles).map(([key, profile]) => [key, profile]));
}
