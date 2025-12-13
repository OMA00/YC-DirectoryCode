import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import Ping from "./Ping";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client.fetch(STARTUP_VIEWS_QUERY, { id });

  // Increment views in the background without blocking render
  incrementViews(id).catch((err) =>
    console.error("Failed to increment views:", err)
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

// Separate function to increment views
async function incrementViews(id: string) {
  try {
    await writeClient
      .patch(id)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();
  } catch (error) {
    console.error("Error incrementing views:", error);
  }
}

export default View;