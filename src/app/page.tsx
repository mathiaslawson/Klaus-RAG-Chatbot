import Link from "next/link";

// import { api, HydrateClient } from "~/trpc/server";
import Klaus from "~/components/klaus";
import Chat from "~/components/RagBot";
import LandingPage from "./(main)/LandingPage";

export default async function Home() {



  return (
    // <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center  text-black">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          {/* <LandingPage /> */}
          <Chat />
        </div>
      </main>
    // </HydrateClient>
  );
}
