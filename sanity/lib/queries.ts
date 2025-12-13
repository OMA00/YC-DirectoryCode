import { defineQuery } from "next-sanity";
export const STARTUPS_QUERY = defineQuery(
  `*[_type == "startup" && defined(slug.current) 
    // CRUCIAL FIX: If $search is empty, return true (show all documents).
    && ($search == "" || title match $search + "*" || category match $search + "*" || author->name match $search + "*")
  ] // The filter ends correctly here
  | order(_createdAt desc){
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id, 
      "imageUrl": image.asset->url,
      bio,
      name
    },
    views,
    description,
    category,
    image 
  }` // Note: Removed the trailing comma after 'image' just in case.
);

export const STARTUPS_BY_ID_QUERY = defineQuery(
  `*[_type == "startup" && _id== $id][0]{
  _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id, 
      image,
      username,
      bio,
      name
    },
    views,
    description,
    category,
    image,
    pitch
}`
);

export const STARTUP_VIEWS_QUERY = defineQuery(
  `*[_type == "startup" && _id == $id][0]{
    _id,views
  }`
);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(
  `*[_type == "author" && id == $id][0]{
  _id,
   id,
   name,
   username,
   image,
   bio}`
);
