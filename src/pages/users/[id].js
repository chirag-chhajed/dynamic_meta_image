import Card from "@/components/Card";
import Head from "next/head";
import { createCanvas } from "@napi-rs/canvas";

export async function generateMetaImage({ name, email, website }) {
  const canvas = createCanvas(1200, 630);
  const context = canvas.getContext("2d");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 1200, 630);

  context.fillStyle = "#000000";
  context.font = "bold 48px sans-serif";
  context.fillText(`${name}`, 100, 100);
  context.fillText(`${email}`, 100, 100);
  context.fillText(`${website}`, 100, 100);

  return canvas.toDataURL("image/png");
  // return imageData;
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
        <meta
          property="og:description"
          content={data.name + data.email + data.website}
        />
        <meta property="og:image" content={imageDataUrl} />

        <meta property="twitter:title" content={data.name} />
        <meta property="twitter:description" content={data.name} />
        <meta property="twitter:image" content={imageDataUrl} />
      </Head>
      <section className="p-4">
        <Card {...data} />
      </section>
    </>
  );
};

export default Id;
