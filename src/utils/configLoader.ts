import siteConfig from '../config/siteConfig.json';
import { getCategoriesFromJson, Category } from './categoriesLoader';
import { GiftSet, loadSets } from './setsLoader';

// Zwraca konfigurację Hero Slideshow (pozostaje bez zmian)
export const getHeroSlideshowConfig = () => {
  return siteConfig.heroSlideshow;
};

// Usuwamy getGalleryConfig, getGalleryCategory, getAllGalleryCategories
// ponieważ dane galerii są ładowane teraz dynamicznie z JSON-a

// Kategorie - cache
let cachedCategories: Category[] | null = null;

// Ładowanie kategorii z JSON
export const loadCategories = async (): Promise<Category[]> => {
  try {
    if (!cachedCategories) {
      cachedCategories = await getCategoriesFromJson();
    }
    return cachedCategories;
  } catch (error) {
    console.error("Failed to load categories:", error);
    // W razie błędu - fallback do pustej tablicy
    return [];
  }
};

// Pobieranie konkretnej kategorii po ID
export const getCategory = async (id: string) => {
  const categories = await loadCategories();
  return categories.find((c: Category) => c.id.toLowerCase() === id.toLowerCase()) || null;
};


// Pobieranie posortowanej listy kategorii
export const getSortedCategories = async (): Promise<Category[]> => {
  const categories = await loadCategories();
  // Sortowanie alfabetyczne
  return [...categories].sort((a, b) => a.name.localeCompare(b.name));
};

// Pomocnicza funkcja rozróżniająca typ Category vs GiftSet
export const isCategory = (item: Category | GiftSet): item is Category => {
  return (item as Category).images !== undefined && Array.isArray((item as Category).images);
};
