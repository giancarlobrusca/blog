import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { getAllPostSlugs, getPostData } from "../../lib/utils";
import styled from "styled-components";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";

export default function BlogPost({ code, frontmatter }) {
	const Component = useMemo(() => getMDXComponent(code), [code]);

	return (
		<Wrapper>
			<Main>
				<Title>{frontmatter.title}</Title>
				<Subtitle>{frontmatter.description}</Subtitle>
				<Content>
					<Link href="/">
						<BackButton>
							<IoMdArrowBack />
						</BackButton>
					</Link>
					<Component />
				</Content>
			</Main>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 100px;
	text-rendering: optimizeLegibility;
`;

const Main = styled.main`
	width: 675px;
`;

const Title = styled.h1`
	color: blue;
	font-size: 2.8rem;
	text-align: center;
`;

const Subtitle = styled.h2`
	color: gray;
	font-size: 1.8rem;
	font-weight: 500;
	text-align: center;
	margin-bottom: 50px;
`;

const Content = styled.div`
	font-size: 1.2rem;
	font-weight: 500;

	h1 {
		margin: 20px 0;
	}

	p {
		margin: 20px 0;
	}
`;

const BackButton = styled.button`
	cursor: pointer;
	position: absolute;
	margin-top: 4px;
	margin-left: -50px;
	border: none;
	background: transparent;

	svg {
		color: deeppink;
	}
`;

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
