
interface SetImage {
  url: string;
  description: string;
}

export interface GiftSet {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  price: string;
  current: boolean;
  images: SetImage[];
}

export const getSetsFromJson = async (): Promise<GiftSet[]> => {
  try {
    const response = await fetch('/sets/sets.json');
    const data = await response.json();
    return data.sets;
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

export const getSortedSets = async (): Promise<GiftSet[]> => {
  const sets = await loadSets();
  // Sort: current sets first, then alphabetically
  return [...sets].sort((a, b) => {
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;
    return a.name.localeCompare(b.name);
  });
};

export const getCurrentSets = async (limit?: number): Promise<GiftSet[]> => {
  const sets = await loadSets();
  const currentSets = sets.filter(set => set.current);
  if (limit) {
    return currentSets.slice(0, limit);
  }
  return currentSets;
};
