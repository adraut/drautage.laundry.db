import { DetergentProfile } from '../types/DetergentProfile';

export function findDetergentBySlug(slug: string, detergents: Map<string, DetergentProfile>): DetergentProfile | null {
  for (const detergent of detergents.values()) {
    if (detergent.slug === slug) {
      return detergent;
    }
  }
  return null;
}
