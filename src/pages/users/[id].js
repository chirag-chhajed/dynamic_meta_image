import Card from "@/components/Card";
import Head from "next/head";
import { useState } from "react";
import htmlToImage from "html-to-image";

export async function generateMetaImage({ name, email, website }) {
  const html = `
    <div>
      <h1>${name}</h1>
      <p>${email}</p>
      <p>${website}</p>
    </div>
  `;
  const canvas = await htmlToImage.toCanvas(html);
  const imageData = canvas.toDataURL("image/png");
  return imageData;
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(id, "id");

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();
  const { name, email, website } = data;
  const imageDataUrl = await generateMetaImage({ name, email, website });

  return { props: { data, imageDataUrl } };
}

const Id = ({ data, imageDataUrl }) => {
  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta property="og:title" content={data.name} />
        <meta property="og:description" content={data.name} />
        <meta property="og:image" content={imageDataUrl} />

        <meta property="twitter:title" content={data.name} />
        <meta property="twitter:description" content={data.name} />
        <meta property="twitter:image" content={imageDataUrl} />
      </Head>
      <section className="p-4">
        <Card {...data} />
        <img src={imageDataUrl} alt={`${data.name}'s image`} />
      </section>
    </>
  );
};

export default Id;
