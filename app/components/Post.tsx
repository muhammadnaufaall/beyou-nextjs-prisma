"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type PostProps = {
  id: string;
  name: string;
  avatar: string;
  postTitle: string;
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function Post({
  id,
  name,
  avatar,
  postTitle,
  comments,
}: PostProps) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
      className='bg-white my-8 p-8 rounded-lg border border-indigo-600'>
      <div className='flex items-center gap-2'>
        <Image
          className='rounded-full'
          width={32}
          height={32}
          src={avatar}
          alt='avatar'
        />
        <h3 className='font-bold text-gray-700'>{name}</h3>
      </div>
      <div className='my-8 '>
        <p className='break-all'>{postTitle}</p>
      </div>
      <div className='flex gap-4 cursor-pointer items-center'>
        <Link href={`post/${id}`}>
          <p className=' text-sm font-bold text-gray-700'>
            {comments?.length >= 1
              ? `${comments?.length} Comments`
              : "No Comments Yet"}
          </p>
        </Link>
      </div>
    </motion.div>
  );
}
