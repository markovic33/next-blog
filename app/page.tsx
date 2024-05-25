import Image from "next/image";
import { client, urlFor } from "./lib/sanity";
import { simpleBlogCard } from "./lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
  }
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data.map((post, index) => (
        <Card key={index}>
          <Image
            src={urlFor(post.titleImage).url()}
            alt="blog-img"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-contain"
          />
          <CardContent className="mt-5">
            <h3 className="font-bold text-lg line-clamp-2">{post.title}</h3>
            <p className="line-clamp-3 mt-2 text-sm text-muted-foreground">
              {post.smallDescription}
            </p>
            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
