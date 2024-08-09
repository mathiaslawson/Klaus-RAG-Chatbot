import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import Klaus from "~/components/klaus";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();



  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center  text-black">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <Klaus />
        </div>
      </main>
    </HydrateClient>
  );
}
