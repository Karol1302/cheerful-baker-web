
import siteConfig from '../config/siteConfig.json';
import { getCategoriesFromJson, Category } from './categoriesLoader';
import { GiftSet, loadSets } from './setsLoader';

export const getHeroSlideshowConfig = () => {
  return siteConfig.heroSlideshow;
};

export const getGalleryConfig = () => {
  return siteConfig.gallery;
};

// Legacy function for backward compatibility
export const getGalleryCategory = (categoryId: string) => {
  return siteConfig.gallery.categories.find(category => category.id === categoryId);
};

// Legacy function for backward compatibility
export const getAllGalleryCategories = () => {
  return siteConfig.gallery.categories;
};

// Categories methods using the JSON-based category system
let cachedCategories: Category[] | null = null;

export const loadCategories = async (): Promise<Category[]> => {
  try {
    if (!cachedCategories) {
      cachedCategories = await getCategoriesFromJson();
    }
    return cachedCategories;
  } catch (error) {
    console.error("Failed to load categories:", error);
    // Fallback to old method if something goes wrong
    return siteConfig.gallery.categories.map(cat => ({
      ...cat,
      current: false,
      images: cat.images.map(img => ({
        url: img.imageUrl,
        description: img.description
      }))
    }));
  }
};

export const getCategory = async (categoryId: string): Promise<Category | undefined> => {
  const categories = await loadCategories();
  return categories.find(category => category.id === categoryId);
};

export const getSortedCategories = async (): Promise<Category[]> => {
  const categories = await loadCategories();
  // Sort: current categories first, then alphabetically
  return [...categories].sort((a, b) => {
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;
    return a.name.localeCompare(b.name);
  });
};

export const getCurrentCategories = async (limit?: number): Promise<Category[]> => {
  const categories = await loadCategories();
  const currentCategories = categories.filter(category => category.current);
  if (limit) {
    return currentCategories.slice(0, limit);
  }
  return currentCategories;
};

// Function to get combined current offers (categories + sets)
export const getCurrentOffers = async (limit: number = 6): Promise<Array<Category | GiftSet>> => {
  const currentCategories = await getCurrentCategories();
  const currentSets = await loadSets().then(sets => sets.filter(set => set.current));
  
  const combined = [...currentCategories, ...currentSets];
  // Sort all items
  const sorted = combined.sort((a, b) => a.name.localeCompare(b.name));
  
  return sorted.slice(0, limit);
};

export const isCategory = (item: Category | GiftSet): item is Category => {
  return (item as Category).images && Array.isArray((item as Category).images);
};
