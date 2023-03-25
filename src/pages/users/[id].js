import Card from "@/components/Card";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";

const Id = ({ data }) => {
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const ref = useRef();

  useEffect(() => {
    async function generateImage() {
      const dataUrl = await toPng(ref.current);
      setImageDataUrl(dataUrl);
    }

    generateImage();
  }, [data]);

  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta property="og:title" content={data.name} />
        <meta property="og:description" content={data.name} />
        {imageDataUrl && <meta property="og:image" content={imageDataUrl} />}

        <meta property="twitter:title" content={data.name} />
        <meta property="twitter:description" content={data.name} />
        {imageDataUrl && (
          <meta property="twitter:image" content={imageDataUrl} />
        )}
      </Head>
      <section className="p-4" ref={ref}>
        <Card {...data} />
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(id, "id");

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();
  return { props: { data } };
}

export default Id;
