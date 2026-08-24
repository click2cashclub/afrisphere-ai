const hotelImages: Record<string, string> = {
  "Victoria Falls Safari Lodge":
    "/images/hotels/victoria-falls-safari-lodge/hero.jpg",

  "Ilala Lodge":
    "/images/hotels/ilala-lodge/hero.jpg",

  "The Hide Safari Camp":
    "/images/hotels/the-hide-safari-camp/hero.jpg",

  "Somalisa Camp":
    "/images/hotels/somalisa-camp/hero.jpg",

  "The Victoria Falls Hotel":
    "/images/hotels/victoria-falls-hotel/hero.jpg",
};

export function getHotelImage(name: string): string {
  return (
    hotelImages[name] ||
    "/images/hotels/default-hotel.jpg"
  );
}

export default hotelImages;