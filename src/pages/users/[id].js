import Card from "@/components/Card";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(id, "id");

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();
  const { name, email, website } = data;
  const imageDataUrl = `/api/generateMetaImage?name=${name}&email=${email}&website=${website}`;

  return { props: { data, imageDataUrl } };
}

const Id = ({ data, imageDataUrl }) => {
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
        <meta property="og:image" content={imageDataUrl} />
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
        <meta property="twitter:image" content={imageDataUrl} />
        <meta property="twitter:image:width" content="1200" />
        <meta property="twitter:image:height" content="630" />
      </Head>
      <section className="p-4">
        <Card {...data} />
      </section>
      {/* <img src={imageDataUrl} alt={data.name} /> */}
    </>
  );
};

export default Id;
