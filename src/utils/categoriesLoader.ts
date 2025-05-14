
export interface CategoryImage {
  url: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  images: CategoryImage[];
  current?: boolean; // Add the current property as optional
}

export const getCategoriesFromJson = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}/categories/categories.json`);
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error("Failed to load categories:", error);
    return [];
  }
};

export const getSortedCategories = async (): Promise<Category[]> => {
  const categories = await getCategoriesFromJson();
  // Simply sort alphabetically
  return [...categories].sort((a, b) => a.name.localeCompare(b.name));
};
