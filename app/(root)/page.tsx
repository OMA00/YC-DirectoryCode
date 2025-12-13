// app/page.tsx

import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { StartupTypeCard } from "@/components/StartupCard";
import { auth } from "@/auth";

// Define the component as 'async' as it performs data fetching
const page = async ({
  // 1. Give the entire searchParams object a default value of an empty object {}
  //    and type it as an object that *contains* the Promise, as Next.js is passing it.
  searchParams = {},
}: {
  // 2. The type definition must reflect that the value may be a Promise
  //    The error message implies the prop is a Promise, so we will treat it as such
  //    for the value we extract. We use Record<string, string> for the underlying type.
  searchParams?: Record<string, string> | Promise<Record<string, string>>;
}) => {
  // 3. AWAIT the searchParams object to unwrap the Promise, as instructed by the error message.
  const resolvedSearchParams = (await searchParams) as
    | Record<string, string>
    | undefined;

  // 4. Safely get the query string from the resolved object.
  const query = resolvedSearchParams?.query ?? "";

  // 5. Define the parameters object for the Sanity fetch
  const fetchParams = { search: query };

  const session = await auth();
  console.log(session?.id);

  // 6. Fetch data from Sanity
  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params: fetchParams,
  });

  // Log the fetched data for server-side debugging
  console.log(JSON.stringify(posts, null, 2));

  return (
    // ... rest of the component (return statement, etc.)
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Entrepreneurs.
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit your Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All startups"}
        </p>
        <ul className="mt-7 card_grid">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
};

export default page;
