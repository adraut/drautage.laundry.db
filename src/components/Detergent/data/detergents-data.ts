import { IDetergentProfile } from '../types/DetergentProfile';

export async function loadDetergents(): Promise<Map<string, IDetergentProfile>> {
    const profiles = await import('./profiles');

    // Convert all exported profiles into an array
    return new Map<string, IDetergentProfile>(
        Object.entries(profiles).map(([key, profile]) => [key, profile])
    );
}

