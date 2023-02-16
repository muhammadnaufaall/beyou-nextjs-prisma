"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditPost from "./editPost";

type AuthPosts = {
  email: string;
  id: string;
  image: string;
  name: string;
  Post: {
    createdAt: string;
    id: string;
    title: string;
    Comment?: {
      createdAt: string;
      id: string;
      postId: string;
      title: string;
      userId: string;
    }[];
  }[];
};

const fetchPosts = async () => {
  const res = await axios.get("/api/posts/myPost");
  return res.data;
};

export default function MyPost() {
  const { data, isLoading } = useQuery({
    queryFn: fetchPosts,
    queryKey: ["myPosts"],
  });
  if (isLoading) return <h1>Posts are loading...</h1>;
  if (data) console.log(data);
  return (
    <div>
      {data?.result.Post?.map((post: AuthPosts) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.result.image}
          name={data.result.name}
          title={post.title}
          comments={post.Comment}
        />
      ))}
    </div>
  );
}
