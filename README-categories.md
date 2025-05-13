
# Managing Categories

This document explains how to manage categories and images in the gallery system.

## Structure

Categories are defined in the `/public/categories/categories.json` file. Each category has:

- `id`: Unique identifier for the category (used in URLs)
- `name`: Display name of the category
- `description`: Short description of the category
- `thumbnail`: Path to the thumbnail image
- `current`: Boolean flag indicating if this is a current/featured category
- `images`: Array of images in the category

## Adding a New Category

1. Create a new directory in `/public/categories/` with your category ID (e.g., `/public/categories/new-category/`)
2. Add images to this directory
3. Add a new entry to the `categories.json` file:

```json
{
  "id": "new-category",
  "name": "New Category",
  "description": "Description of the new category",
  "thumbnail": "/categories/new-category/main-image.jpg",
  "current": false,
  "images": [
    {
      "url": "/categories/new-category/image1.jpg",
      "description": "Optional custom description for image1"
    },
    {
      "url": "/categories/new-category/image2.jpg"
    }
  ]
}
```

## Updating a Category

To update a category, simply edit its entry in the `categories.json` file.

## Setting Featured Categories

To make a category featured (appear at the top of the list with special highlighting):
1. Set its `current` property to `true` in the `categories.json` file

## Adding Images to a Category

1. Place the image file in the category's directory (e.g., `/public/categories/serca/new-image.jpg`)
2. Add an entry to the category's `images` array in `categories.json`:

```json
{
  "url": "/categories/serca/new-image.jpg",
  "description": "Optional custom description"
}
```

If you don't provide a description, the system will use the filename (without extension) as the default.

## Removing Images or Categories

To remove an image, delete its entry from the `images` array in `categories.json`.
To remove a category, delete its entry from the `categories` array in `categories.json`.
