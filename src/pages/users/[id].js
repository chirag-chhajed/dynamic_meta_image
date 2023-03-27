import Card from "@/components/Card";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(id, "id");
  const first = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await first.json();
  const { name, email, website } = data;

  const second = await fetch(
    `https://dynamic-meta-image.vercel.app/api/generateMetaImage?id=${id}&name=${name}&email=${email}&website=${website}`
  );
  const check = await second.json();
  console.log(check);

  // const [ checker] = await Promise.all([api.json(), check.json()]);

  return { props: { data, id } };
}

const Id = ({ data, id }) => {
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
      <img
        src={`https://dynamic-meta-image.vercel.app/${id}.png`}
        className="aspect-[1200/630]"
        alt={data.name}
      />
    </>
  );
};

export default Id;
