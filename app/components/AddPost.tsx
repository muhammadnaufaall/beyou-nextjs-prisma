"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const { mutate } = useMutation(
    async (title) => await axios.post("/api/post/addPost", { title })
  );

  return (
    <form className='bg-white mb-8 py-8 rounded-md '>
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
