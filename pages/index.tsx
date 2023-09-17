import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { sanityClient, urlFor } from "../sanity"

import Header from '../components/Header'
import { Post } from '../typings'
import Hero from '../components/Hero'

interface Props {
	posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div className="max-w-full">
        <Head>
            <title>SKDEV | Blog</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
        <Header />
        <Hero />
        {/* if posts not undefined */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 pt-2 md:pt-6 ">
            {posts && posts.map((post) => (
                <Link href={`/blog/${post.slug.current}`} key={post._id}>
                    <div className="border rounded-lg group cursor-pointer overflow-hidden">
                        <img className="h-60 w-full object-cover group-hover:scale-105 transition duration-200" 
                        src={urlFor(post.mainImage).url()} alt={post.title} />
                        <div className="flex justify-between p-5 bg-white">
                            <div>
                                <p className="text-lg font-bold leading-normal">{post.title}</p>
                                <p className="text-xs mt-2">{post.description}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        <div className="max-w-7xl mx-auto flex justify-center items-center py-10">
            <h3 className="text-2xl font-serif cursor-pointer">Made for the love of the game</h3>
        </div>
    </div>
  );
}

export const getServerSideProps = async () => {
    const query = `*[_type == "post"] | order(publishedAt desc){
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
