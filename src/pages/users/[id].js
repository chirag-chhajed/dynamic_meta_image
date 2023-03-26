import Card from "@/components/Card";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(id, "id");

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();
  const { name, email, website } = data;
  const imageDataUrl = `https://dynamic-meta-image.vercel.app/api/generateMetaImage?name=${name}&email=${email}&website=${website}`;

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
