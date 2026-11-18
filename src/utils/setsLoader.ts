import { getAssetUrl } from './url';

interface SetImage {
  url: string;
  description: string;
}

export type OfferTag = 'zestaw' | 'pojedynczy';

export interface GiftSet {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  thumbnail: string;
  price: string;
  tag: OfferTag;
  setNumber?: number;
  current?: boolean; // Keeping for backward compatibility with data
  images: SetImage[];
}

export const getSetsFromJson = async (): Promise<GiftSet[]> => {
  try {
    const response = await fetch(getAssetUrl('sets/sets.json'));
    const data = await response.json();
    const newestFirst: GiftSet[] = [...data.sets].reverse();
    // Sortowanie zachowuje kolejność dodania produktów bez numeru zestawu.
    return newestFirst.sort((a, b) =>
      (a.setNumber ?? Number.MAX_SAFE_INTEGER) - (b.setNumber ?? Number.MAX_SAFE_INTEGER)
    );
  } catch (error) {
    console.error("Failed to load sets:", error);
    return [];
  }
};

export const loadSets = async (): Promise<GiftSet[]> => {
  try {
    return await getSetsFromJson();
  } catch (error) {
    console.error("Failed to load sets:", error);
    return [];
  }
};

export const getSet = async (setId: string): Promise<GiftSet | undefined> => {
  const sets = await loadSets();
  return sets.find(set => set.id === setId);
};

// Get sorted sets alphabetically
export const getSortedSets = async (): Promise<GiftSet[]> => {
  const sets = await loadSets();
  return [...sets].sort((a, b) => a.name.localeCompare(b.name));
};

// Get limited sets for homepage (for backward compatibility)
export const getCurrentSets = async (limit?: number): Promise<GiftSet[]> => {
  const sets = await loadSets();
  if (limit) {
    return sets.slice(0, limit);
  }
  return sets;
};
