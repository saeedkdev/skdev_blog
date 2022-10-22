import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { sanityClient, urlFor } from '../sanity'

import Header from '../components/Header'
import { Post } from '../typings'

interface Props {
	posts: Post[]
}

export default function Home({ posts }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>skdev | home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
	  <Header />
	  <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
		<div className="px-10 space-y-5">
			<h1 className="text-6xl max-w-xl font-serif">
				<span className="underline decoration-black decoration-4">skdev</span> is a my personal blog
			</h1>
			<h2 className="font-serif">Learn the art of coding and how to think like a programmer and connect with me</h2>
		</div>
		<img className="hidden md:inline-flex h-32 lg:h-full" src="/sk.png" alt="sk" />
	  </div>

	{/* Posts */}


    </div>
  )
}

export const getServersideProps = async () => {
	const query = `*[_type == "post"]{
	  _id,
	  title,
	  slug,
	  author -> {
		name,
		image
	  },
	  description,
	  mainImage,
	  publishedAt
	}`;
	const posts = await sanityClient.fetch(query);
	return {
		props: {
			posts
		}
	}
}
