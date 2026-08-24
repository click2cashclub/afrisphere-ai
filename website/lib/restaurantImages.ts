const restaurantImages: Record<string, string> = {
  "The Boma – Dinner & Drum Show":
    "/images/restaurants/the-boma/hero.jpg",

  "Victoria Falls Eatery":
    "/images/restaurants/victoria-falls-eater/hero.jpg",

  "Homely House Restaurant":
    "/images/restaurants/homely-house-restaurant/hero.jpg",

  "The Lookout Cafe":
    "/images/restaurants/the-lookout-cafe/hero.jpg",
};

const DEFAULT_RESTAURANT_IMAGE =
  "/images/restaurants/default-restaurant.jpg";

export function getRestaurantImage(
  restaurantName: string
): string {
  return (
    restaurantImages[restaurantName] ??
    DEFAULT_RESTAURANT_IMAGE
  );
}

export default getRestaurantImage;