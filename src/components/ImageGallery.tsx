"use client";

import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import React from "react";
import styled from "./styled.module.css";

interface ImageGalleryProps {
  images: UnsplashImage[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="row g-3">
      {images.map((item, key) => (
        <div className="col-lg-4 col-md-6 col-sm-12" key={`${item.urls.raw}`}>
          <div className={` ${styled.ImageWrapper}`}>
            <Image
              src={item.urls.raw}
              alt={item.description || "No description"}
              width={"250"}
              height={"250"}
              className="rounded shadow"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
