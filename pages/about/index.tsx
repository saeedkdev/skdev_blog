import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'


import Header from '../../components/Header'
import { Post } from '../../typings'
import Hero from '../../components/Hero'


export default function About() {
  return (
    <div className="max-w-full">
        <Head>
            <title>SKDEV | Blog</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
        <Header />
        <Hero />
        {/* if posts not undefined */}
        <div className="max-w-7xl mx-auto p-10">
            <h1 className="text-3xl font-bold mt-10 mb-3">About Me</h1>
            <p className='leading-8 text-lg'>
            👋 Hello, I'm Saeed Karimi, a passionate software developer based in Vancouver, Canada. I'm thrilled to have you here on my blog, where I share my insights, experiences, and knowledge in the world of software development and technology.

            I'm well-versed in various programming languages, including PHP, JavaScript, TypeScript, Java, SQL, and Rust. I love working with a wide range of frameworks and tools, such as Laravel, React, Next.js, Node.js, GraphQL, and more. Whether it's building web applications, crafting APIs, or diving into mobile development, I enjoy the challenge of turning ideas into reality.
            </p>
            <p className='my-5 leading-8 text-lg'>
                Feel free to connect with me on <a className='text-red-900 underline' href="https://github.com/saeedkdev">GitHub</a> to explore my open-source projects and code contributions
            </p>
            <p className='leading-8 text-lg'>
                Thank you for visiting my blog! I hope you find my articles informative and engaging. Stay tuned for exciting insights into the ever-evolving world of software development and technology.
            </p>
        </div>
        <div className="max-w-7xl mx-auto flex justify-center items-center py-10">
            <h3 className="text-2xl font-serif cursor-pointer">Made for the love of the game</h3>
        </div>
    </div>
  );
}

