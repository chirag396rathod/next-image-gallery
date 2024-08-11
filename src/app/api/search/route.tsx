import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      {
        error: "No Query Provided!",
      },
      {
        status: 400,
      }
    );
  }

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const { results } = await response.json();

  return NextResponse.json(results);
}
