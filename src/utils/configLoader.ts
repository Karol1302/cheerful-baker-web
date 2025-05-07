
import siteConfig from '../config/siteConfig.json';

export const getHeroSlideshowConfig = () => {
  return siteConfig.heroSlideshow;
};

export const getGalleryConfig = () => {
  return siteConfig.gallery;
};

export const getGalleryCategory = (categoryId: string) => {
  return siteConfig.gallery.categories.find(category => category.id === categoryId);
};

export const getAllGalleryCategories = () => {
  return siteConfig.gallery.categories;
};
