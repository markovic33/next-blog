import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}' ] {
        "currentSlug": slug.current,
          title,
          content,
          titleImage,
      }[0]
    `;
  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <div className="mt-8">
      <h1 className="">
        <span className="text-primary block text-center font-semibold uppercase tracking-wide">
          Js - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-2xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        width={900}
        height={900}
        alt=""
        priority
        className="rounded-lg h-[300px] mt-9"
      />

      <div className="mt-16 prose prose-black prosle-xl dark:prose-invert prose-li:marker:text-primary ">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
