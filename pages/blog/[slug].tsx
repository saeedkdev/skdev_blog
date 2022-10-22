import GetStaticProps from "next";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import Header from "../../components/Header";
import Head from "next/head";
import PortableText from "react-portable-text";

interface Props {
	post: Post;
}

export default function Blog(props: Props) {
  const { post } = props;
  return (
	<main>
		<Head>
			<title>skdev | {post.title}</title>
		</Head>
		<Header />
		<img className="w-full h-40 object-cover" src={urlFor(post.mainImage).url()} />
		<article className="max-w-3xl mx-auto p-5">
			<h1 className="text-3xl font-bold mt-10 mb-3">{post.title}</h1>
			<h2 className="text-xl font-light text-gray-500 mb-2">
				{post.description}
			</h2>
			<div className="flex items-center space-x-2">
				<img className="h-10 w-10 rounded-full" src={urlFor(post.author.image).url()!} />
				<p className="text-gray-500 text-sm">
					Posted By <span className="text-green-600">{post.author.name}</span> {" "}
				    | {new Date(post.publishedAt).toLocaleString()}
				</p>
			</div>
			<div className="pt-5">
				<PortableText 
					dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
					projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
					content={post.body}
					className=""
					serializers={
						{
							h1: (props: any) => (
								<h1 className="text-2xl font-bold my-5" {...props} />
							),
							h2: (props: any) => (
								<h2 className="text-xl font-bold my-5" {...props} />
							),
							li: ({ children }: any) => (
								<li className="ml-4 list-disc">{children}</li>
							),
							link: ({ href, children }: any) => (
								<a href={href} 
								target="_blank" className="text-blue-500 hover:underline">
									{children}
								</a>
							),
						}
					}
					
				/>
			</div>
		</article>
	</main>
  )
};

export const getStaticPaths = async () => {
	const query = `*[_type == "post"]{
		_id,
		slug {
			current
		}
	}`;

	const posts = await sanityClient.fetch(query);

	const paths = posts.map((post: Post) => ({
		params: { slug: post.slug.current },
	}));

	return {
		paths,
		fallback: false,
	};
};


export const getStaticProps: GetStaticProps = async ({ params }) => {

	const query = `*[_type == 'post' && slug.current == $slug][0] {
		_id,
		_createdAt,
		publishedAt,
		title,
		author -> {
			name,
			image,
	    },
		"comments": *[
		  _type == 'comment' &&
		  post._ref == ^._id &&
		  approved == true],
		description,
		mainImage,
		slug,
		body
	}`;

	const post = await sanityClient.fetch(query, { slug: params?.slug });

	if(!post) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			post,
		},
		revalidate: 60, // in 60 seconds, update the cache
	};
};
