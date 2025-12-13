import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    // Removed the redundant 'id' field

    defineField({
      name: "name",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("An author name is required."), // Recommended
    }),
    defineField({
      name: "slug", // Recommended for unique profile URLs
      type: "slug",
      options: {
        source: "name",
      },
    }),
    defineField({
      name: "email",
      type: "string",
      // You may add validation for email format here
    }),
    defineField({
      name: "image",
      type: "image", // Recommended standard Sanity image type
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      type: "text",
    }),
    // Removed the redundant 'username' field, as 'slug' serves a similar purpose
  ],
  preview: {
    select: {
      title: "name",
      media: "image", // Added media to show author picture in list
    },
  },
});
