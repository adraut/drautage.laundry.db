import { DetergentProfile } from '../types/DetergentProfile';

export function toDetergentSlug(detergent: DetergentProfile): string {
  return `${detergent.brand} ${detergent.name}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function findDetergentBySlug(slug: string, detergents: Map<string, DetergentProfile>): DetergentProfile | null {
  for (const detergent of detergents.values()) {
    if (toDetergentSlug(detergent) === slug) {
      return detergent;
    }
  }
  return null;
}
