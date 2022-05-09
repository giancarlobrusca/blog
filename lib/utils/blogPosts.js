import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";

const postsDirectory = path.join(process.cwd(), "blog/posts");

export function getSortedPostsData() {
	const fileNames = fs.readdirSync(postsDirectory);

	const allPostsData = fileNames.map((fileName) => {
		const slug = fileName.replace(/\.mdx$/, "");

		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");
		const matterResult = matter(fileContents);

		return {
			slug,
			...matterResult.data,
		};
	});

	return allPostsData.sort(({ date: a }, { date: b }) => {
		if (a < b) {
			return 1;
		} else if (a > b) {
			return -1;
		} else {
			return 0;
		}
	});
}

export function getAllPostSlugs() {
	const fileNames = fs.readdirSync(postsDirectory);

	return fileNames.map((fileName) => {
		return {
			params: {
				slug: fileName.replace(/\.mdx$/, ""),
			},
		};
	});
}

export async function getPostData(slug) {
	const fullPath = path.join(postsDirectory, `${slug}.mdx`);
	const source = fs.readFileSync(fullPath, "utf8");

	const { code, frontmatter } = await bundleMDX({
		source,
		cwd: path.join(process.cwd(), "blog/components"),
		xdmOptions(options) {
			options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm];
			options.rehypePlugins = [...(options?.rehypePlugins ?? []), rehypePrism];
			return options;
		},
	});

	return {
		slug,
		code,
		frontmatter,
	};
}
