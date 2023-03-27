import Card from "@/components/Card";
import Head from "next/head";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();
  const { name, email, website } = data;

  // Call the image generation API and get the generated image URL
  await fetch(
    `http://localhost:3000/api/generateMetaImage?id=${id}&name=${name}&email=${email}&website=${website}`
  );

  return { props: { data, id } };
}

const Id = ({ data, id }) => {
  const { name, email, website } = data;
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      await fetch(
        `http://localhost:3000/api/generateMetaImage?id=${id}&name=${name}&email=${email}&website=${website}`
      );
      setShowImage(!showImage);
    };
    fetching();
  }, []);
  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta name="title" content={data.name} />
        <meta
          name="description"
          content={data.name + data.email + data.website}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://dynamic-meta-image.vercel.app/"
        />
        <meta property="og:title" content={data.name} />
        <meta
          property="og:description"
          content={data.name + data.email + data.website}
        />
        <meta
          property="og:image"
          content={`https://dynamic-meta-image.vercel.app/api/${id}.png`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://dynamic-meta-image.vercel.app"
        />
        <meta property="twitter:title" content={data.name} />
        <meta
          property="twitter:description"
          content={data.name + data.email + data.website}
        />
        <meta
          property="twitter:image"
          content={`https://dynamic-meta-image.vercel.app/api/${id}.png`}
        />
        <meta property="twitter:image:width" content="1200" />
        <meta property="twitter:image:height" content="630" />
      </Head>
      <section className="p-4">
        <Card {...data} />
      </section>

      {showImage && (
        <img
          src={`https://dynamic-meta-image.vercel.app/api/${id}.png`}
          alt={data.name}
        />
      )}
    </>
  );
};

export default Id;
