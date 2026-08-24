import Image from "next/image";
import destinationImages from "@/lib/destinationImages";

type Props = {
  name: string;
};

export default function DestinationImage({
  name,
}: Props) {
  const image =
    destinationImages[name] ??
    "/images/destinations/default.jpg";

  return (
    <Image
      src={image}
      alt={name}
      width={800}
      height={500}
      className="h-52 w-full rounded-2xl object-cover"
      priority={false}
    />
  );
}