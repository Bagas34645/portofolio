import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import { Pre } from "@/components/mdx/code-block";
import {
  GymArchitectureDiagram,
  RagPipelineDiagram,
  LayeredArchDiagram,
} from "@/components/mdx/diagrams";

const prettyCodeOptions: Options = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
  defaultLang: "text",
};

const components = {
  pre: Pre,
  GymArchitectureDiagram,
  RagPipelineDiagram,
  LayeredArchDiagram,
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </div>
  );
}
