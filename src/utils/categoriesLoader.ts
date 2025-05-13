
interface CategoryImage {
  url: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  current: boolean;
  images: CategoryImage[];
}

export const getCategoriesFromJson = async (): Promise<Category[]> => {
  try {
    const response = await fetch('/categories/categories.json');
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error("Failed to load categories:", error);
    return [];
  }
};

export const getImageNameFromUrl = (url: string): string => {
  // Extract the filename from the URL
  const filename = url.substring(url.lastIndexOf('/') + 1);
  // Remove the file extension
  const nameWithoutExtension = filename.substring(0, filename.lastIndexOf('.'));
  // Replace hyphens with spaces and capitalize words
  return nameWithoutExtension
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
