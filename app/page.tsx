"use client";

import axios from "axios";
import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";
import Loading from "./components/Loading";

type PostsType = {
  title: string;
  id: string;
  createdAt?: string;
  Comment?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
  user: {
    name: string;
    image: string;
  };
};

const allPost = async () => {
  const res = await axios.get("/api/posts/getPost");
  return res.data;
};

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryFn: allPost,
    queryKey: ["allPost"],
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <main>
      <AddPost />
      {data?.result.map((post: PostsType) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user?.name}
          avatar={post?.user?.image}
          postTitle={post.title}
          comments={post.Comment || []}
        />
      ))}
    </main>
  );
}
