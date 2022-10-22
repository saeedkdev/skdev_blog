import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { sanityClient, urlFor } from "../sanity"

import Header from '../components/Header'
import { Post } from '../typings'

interface Props {
	posts: [Post];
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

	{/* if posts not undefined */}
	<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
		{posts && posts.map((post) => (
			<Link href={`/blog/${post.slug.current}`} key={post._id}>
				<div className="border rounded-lg group cursor-pointer overflow-hidden">
					<img className="h-60 w-full object-cover group-hover:scale-105 transition duration-200" 
					src={urlFor(post.mainImage).url()} alt={post.title} />
					<div className="flex justify-between p-5 bg-white">
						<div>
							<p className="text-lg font-bold">{post.title}</p>
							<p className="text-xs">{post.description} by {post.author.name}</p>
						</div>
						<img className="h-12 w-12 rounded-full" src={urlFor(post.author.image).url()!} alt={post.author.name} />
					</div>
				</div>
			</Link>
		))}
	</div>

    </div>
  );
}

export const getServerSideProps = async () => {
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
			posts,
		},
	};

}
