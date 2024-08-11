"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { UnsplashImage } from "@/models/unsplash-image";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import style from "../../../components/styled.module.css";

export default function SearchPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(
    null
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();
    if (query) {
      try {
        setError(null);
        setLoading(true);
        const response = await fetch("/api/search?query=" + query);
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <Alert>
        This page fetches data <strong>client-side.</strong> In order to not
        leak API credentials, the request is sent to a NextJS{" "}
        <strong>route handler</strong> that runs on the server. This route
        handler then fetches the data from the Unsplash API and returns it to
        the client.
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            placeholder="E.g. Cate,dogs, ..."
            name="query"
          ></Form.Control>
        </Form.Group>
        <Button className="mb-4" type="submit">
          Search
        </Button>
      </Form>
      <div className="d-flex justify-content-center align-items-center">
        {loading && <Spinner animation="border" />}
        {error && <strong>Soothing went wrong. Please try again.</strong>}
        {searchResults?.length === 0 && (
          <strong>Nothing found. Try a different query.</strong>
        )}
      </div>
      {!loading &&
        searchResults &&
        searchResults.map((image) => (
          <Image
            src={image.urls.raw}
            width={250}
            height={250}
            alt={image.urls.raw}
            key={image.urls.raw}
            className={style.image}
          />
        ))}
    </div>
  );
}
