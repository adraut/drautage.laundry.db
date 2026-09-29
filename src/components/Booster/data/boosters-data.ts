import { BoosterProfile } from '../types/BoosterProfile';

export async function loadBoosters(): Promise<Map<string, BoosterProfile>> {
  const profiles: Record<string, BoosterProfile> = await import('./profiles');

  // Convert all exported profiles into an array
  return new Map<string, BoosterProfile>(Object.entries(profiles).map(([key, profile]) => [key, profile]));
}
