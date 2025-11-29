import SearchForm from "@/components/SearchForm";

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
    </>
  );
};

export default page;
