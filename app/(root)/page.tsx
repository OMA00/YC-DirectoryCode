import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

// 1. Define the component as 'async'
const page = async ({
  searchParams, // Assuming you corrected the prop name to standard 'searchParams'
}: {
  // 2. Define the prop as a Promise (as the error indicates it is)
  searchParams: Promise<{ query?: string }>;
}) => {
  // 3. Await the promise to get the resolved object
  const resolvedParams = await searchParams;

  // 4. Access the property on the resolved object. Use ?? "" for type safety.
  const query = resolvedParams.query ?? "";
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Oma" },
      _id: 1,
      description: "This is a description",
      image: "/vercel.svg",
      category: "Robots",
      title: "We Robots",
    },
  ];

  return (
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
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
};

export default page;
