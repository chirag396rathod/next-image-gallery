import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const revalidate = 0; // - no stored cache
export const metadata = {
  title: "Dynamic Feting - Next Js Image Gallery",
};

export default async function Page() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    { 
      // cache: "no-cache" - no stored cache
      // next : { revalidate: 0 } - no stored cache
     }
  );
  const image: UnsplashImage = await response.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image?.height;

  return (
    <div className="d-flex flex-column align-items-center ">
      <Alert>
        This page <strong>fetches data dynamic.</strong> Even
        every time you refresh the page, you get new image.
      </Alert>
      <Image
        src={image?.urls?.raw}
        width={width}
        height={height}
        alt={image?.description}
        className="rounded shadow mw-100 mh-100"
      />
      by{" "}
      <Link
        target="_blank"
        href={`${process.env.UNSPLASH_ACCESS_KEY}/user/${image?.user.username}`}
      >
        {image?.user.username}
      </Link>
    </div>
  );
}
