import React from "react";
import ImageGallery from "@/components/ImageGallery";
import { UnsplashImage } from "@/models/unsplash-image";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";

interface pageInterface {
  params: { topic: string };
  //   searchParams: { [key: string]: string | string[] | undefined };
}
export const dynamicParams = false;
export const generateStaticParams = () => {
  return ["coding", "cooking", "learning"].map((item) => ({ item }));
};
export function generateMetadata({
  params: { topic },
}: pageInterface): Metadata {
  return {
    title: `${topic} - Next Js Image Gallery`,
  };
}

const Page = async ({ params: { topic } }: pageInterface) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const images: UnsplashImage[] = await response.json();
  return (
    <div>
      <Alert>
        This page uses <strong>generateStaticParams</strong> to render and cache
        static pages at build time, even though the URL has a dynamic parameter.
        Pages that are not included in generateStaticParams will be fetched &
        rendered on first access and then{" "}
        <strong>cached for subsequent requests</strong> (this can be disabled).
      </Alert>
      <h1>{topic}</h1>
      <ImageGallery images={images} />
    </div>
  );
};

export default Page;
