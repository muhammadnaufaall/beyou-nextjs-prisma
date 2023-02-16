"use client";

import React, { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID: string;

  const { mutate } = useMutation(
    async (title: String) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message, { id: toastPostID });
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["AllPosts"]);
        toast.success(data?.data?.message, { id: toastPostID });
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const submitPost = async (e: FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading("Creating an Awesome Post...");
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className='bg-white mb-8 py-8 px-6 rounded-md '>
      <div className='flex flex-col my-4'>
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name='title'
          placeholder="What's on your mind?"
          className='p-4 text-base rounded-md my-2  bg-gray-100'
        />
      </div>
      <div className=' flex items-center justify-between gap-2'>
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}>{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className='text-sm bg-indigo-600 text-white py-2 px-6 rounded-xl disabled:opacity-25'
          type='submit'>
          Create post
        </button>
      </div>
    </form>
  );
}
