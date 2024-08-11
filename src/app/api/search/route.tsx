import { NextResponse } from "next/server";

export default async function GET(request: Request) {
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

  const response = 
}
