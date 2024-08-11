"use client";

import { FormEvent } from "react";
import { Button, Form } from "react-bootstrap";

export default function SearchPage() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();
    console.log({ query });
  }
  return (
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
  );
}
