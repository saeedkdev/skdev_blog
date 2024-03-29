import { GetStaticProps } from 'next'
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import Header from "../../components/Header";
import Head from "next/head";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';

interface IFormInput {
	_id: string;
	name: string;
	email: string;
	comment: string;
}

interface Props {
	post: Post;
}

export default function Blog(props: Props) {
	const [ submitted, setSubmitted ] = useState(false);

	const { post } = props;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		await fetch("/api/createComment", {
			method: "POST",
			body: JSON.stringify(data),
		})
			.then((res) => {
				console.log(data);
				setSubmitted(true);
			})
			.catch((err) => {
				console.log(err);
				setSubmitted(false);
			});
	};

	return (
		<main>
			<Head>
                <title>SKDEV | {post.title}</title>
                <link rel="icon" href="/favicon.png" />
			</Head>
			<Header />
			<img
				className="w-full h-40 object-cover"
				src={urlFor(post.mainImage).url()}
			/>
			<article className="max-w-3xl mx-auto p-5">
				<h1 className="text-3xl font-bold mt-10 mb-3">{post.title}</h1>
				<h2 className="text-xl font-light text-gray-500 mb-2">
					{post.description}
				</h2>
				<div className="flex items-center space-x-2">
					<img
						className="h-10 w-10 rounded-full"
						src={urlFor(post.author.image).url()!}
					/>
					<p className="text-gray-500 text-sm">
						Posted By{" "}
						<span className="text-green-600">
							{post.author.name}
						</span>{" "}
						| {new Date(post.publishedAt).toLocaleString()}
					</p>
				</div>
				<div className="pt-5 leading-loose">
					<PortableText
						dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
						projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
						content={post.body}
						className=""
						serializers={{
							h1: (props: any) => (
								<h1
									className="text-2xl font-bold my-5"
									{...props}
								/>
							),
							h2: (props: any) => (
								<h2
									className="text-2xl font-bold my-5"
									{...props}
								/>
							),
                            h3: (props: any) => (
                                <h3
                                    className="text-xl font-bold my-5"
                                    {...props}
                                />
                            ),
                            h4: (props: any) => (
                                <h4
                                    className="text-lg font-bold my-5"
                                    {...props}
                                />
                            ),
                            p: (props: any) => (
                                <p
                                    className="my-5" 
                                    {...props}
                                />
                            ),
							li: ({ children }: any) => (
								<li className="ml-4 list-disc">{children}</li>
							),
                            ol: ({ children }: any) => (
                                <ol className="ml-4 list-decimal">{children}</ol>
                            ),
							link: ({ href, children }: any) => (
								<a
									href={href}
									target="_blank"
									className="text-blue-500 hover:underline"
								>
									{children}
								</a>
							),
                            code: ({ children }: any) => (
                                <SyntaxHighlighter language="javascript">
                                    {children}
                                </SyntaxHighlighter>
                            ),
						}}
					/>
				</div>
			</article>
			<hr className="max-w-lg my-5 mx-auto border border-red-500" />
			{submitted ? (
				<div className="flex flex-col p-10 my-10 bg-red-400 text-white max-w-2xl mx-auto">
					<h3 className="text-3xl font-bold">Thank you for your comment</h3>
					<p>once it has been approved you will see it in the comment section</p>
				</div>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col p-5 my-10 max-w-2xl mx-auto mb-10"
				>
					<h2 className="text-3xl font-bold">
						Leave a comment below
					</h2>

					<input
						type="hidden"
						{...register("_id")}
						name="_id"
						value={post._id}
					/>

					<label className="block mb-5">
						<span className="text-gray-700">Name</span>
						<input
							{...register("name", { required: true })}
							className="shadow-xl shadow-slate-100 border rounded py-2 px-3 form-input mt-1 block w-full ring-red-500 outline-none focus:ring"
							placeholder="Type your name"
							type="text"
						/>
					</label>
					<label className="block mb-5">
						<span className="text-gray-700">Email</span>
						<input
							{...register("email", { required: true })}
							className="shadow-xl shadow-slate-100 border rounded py-2 px-3 form-input mt-1 block w-full ring-red-500 outline-none focus:ring"
							placeholder="email@example.com"
							type="email"
						/>
					</label>
					<label className="block mb-5">
						<span className="text-gray-700">Comment</span>
						<textarea
							{...register("comment", { required: true })}
							className="shadow-xl shadow-slate-100 rounded border py-2 px-3 form-textarea mt-1 block w-full ring-red-500 outline-none focus:ring"
							rows={6}
							placeholder="What did you think?"
						/>
					</label>
					{/* valication errors */}
					<div className="flex flex-col p-5">
						{errors.name && (
							<p className="text-red-500 ">
								- Please enter your name
							</p>
						)}
						{errors.email && (
							<p className="text-red-500">
								- Please enter your email
							</p>
						)}
						{errors.comment && (
							<p className="text-red-500">
								- Please enter your comment
							</p>
						)}
					</div>
					<input
						type="submit"
						className="shadow-xl bg-gradient-to-r from-red-400 to-red-300 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
						value="Submit"
					/>
				</form>
			)}

			<div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-red-100 shadow-2xl space-y-2">
				<h3 className="text-3xl">Comments</h3>
				<hr className="pb-2" />
				{post.comments.map((comment: any) => (
					<div key={comment._id} className="">
						<p><span className="text-red-500">{comment.name}</span> : {comment.comment}</p>
					</div>
				))}
			</div>

		</main>
	);
}

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

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			post,
		},
		revalidate: 60, // in 60 seconds, update the cache
	};
};
