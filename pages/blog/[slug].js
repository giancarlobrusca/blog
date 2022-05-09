import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { getAllPostSlugs, getPostData } from "../../lib/utils";

export default function BlogPost({ code, frontmatter }) {
	const Component = useMemo(() => getMDXComponent(code), [code]);

	return (
		<>
			<h1>{frontmatter.title}</h1>
			<p>{frontmatter.description}</p>
			<p>{frontmatter.date}</p>
			<article>
				<Component />
			</article>
		</>
	);
}

export async function getStaticProps({ params }) {
	const postData = await getPostData(params.slug);

	return {
		props: {
			...postData,
		},
	};
}

export async function getStaticPaths() {
	const paths = getAllPostSlugs();

	return {
		paths,
		fallback: false,
	};
}
