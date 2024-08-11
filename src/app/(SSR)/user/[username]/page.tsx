import React, { cache } from "react";
import { UnsplashUser } from "@/models/unsplash-user";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Alert } from "@/components/bootstrap";

interface pageProps {
  params: { username: string };
}

async function getUnsplashUser(username: string): Promise<UnsplashUser> {
  let url = `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
  const response = await fetch(url);
  if (response.status === 404) notFound();
  return await response.json();
}

// const getCachesUser = cache(getUnsplashUser); Get user data from cache noy using native fetch

export async function generateMetadata({
  params: { username },
}: pageProps): Promise<Metadata> {
  const user = await getUnsplashUser(username);
  return {
    title: `${user.first_name} ${user.last_name} - Next Js Image Gallery`,
  };
}

const Page = async ({ params: { username } }: pageProps) => {
  const user = await getUnsplashUser(username);
  return (
    <div>
      <Alert>
        This profile page uses <strong>generateMetadata</strong> to set the{" "}
        <strong>page title</strong>
        dynamically from the API response.
      </Alert>
      <h1>{user.username}</h1>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <button>
        <a href={`https://unsplash.com/` + user.username} target="_blank">
          Unsplash User
        </a>
      </button>
    </div>
  );
};

export default Page;
