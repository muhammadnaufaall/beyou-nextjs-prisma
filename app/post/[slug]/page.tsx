"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Post from "@/app/components/Post";
import AddComment from "@/app/components/addComment";

type URL = {
  params: {
    slug: string;
  };
  searchParams: string;
};

const fetchDetails = async (slug: string) => {
  const res = await axios.get(`/api/posts/${slug}`);
  return res.data;
};

export default function DetailsPost(url: URL) {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ["detailPost"],
  });
  if (isLoading) return <h1>Post is loading...</h1>;
  if (data) console.log(data);
  return (
    <main>
      <Post
        id={data.id}
        key={data.id}
        avatar={data.user.image}
        name={data.user.name}
        postTitle={data.title}
        comments={data.Comment}
      />
      <AddComment id={data?.id} />
      {data?.Comment.map((comment) => (
        <Post
          id={comment.id}
          key={comment.id}
          avatar={comment.user.image}
          name={comment.user.name}
          postTitle={comment.message}
        />
      ))}
    </main>
  );
}
