import Card from "@/components/Card";
import Head from "next/head";

export async function getServerSideProps(context) {
  try {
    const { id } = context.query;
    console.log(id, "id");
    const first = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    if (!first.ok) {
      throw new Error(
        `Failed to fetch user data: ${first.status} ${first.statusText}`
      );
    }
    const data = await first.json();
    if (!data || !data.name || !data.email) {
      throw new Error("Failed to parse user data");
    }
    const { name, email, website } = data;

    const second = await fetch(
      `https://dynamic-meta-image.vercel.app/api/generateMetaImage?name=${name}&email=${email}&website=${website}`
    );
    if (!second.ok) {
      throw new Error(
        `Failed to generate meta image: ${second.status} ${second.statusText}`
      );
    }
    const { url } = await second.json();
    console.log(url);

    return { props: { data, id, url, name, email, website } };
  } catch (error) {
    console.error(error);
    return { props: { error: error.message || "Unexpected error occurred" } };
  }
}

const Id = ({ data, id, url, name, email, website }) => {
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="title" content={name} />
        <meta name="description" content={name + email + website} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://dynamic-meta-image.vercel.app/"
        />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={name + email + website} />
        <meta property="og:image" content={url} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={"https://dynamic-meta-image.vercel.app/"}
        />
        <meta property="twitter:title" content={name} />
        <meta property="twitter:description" content={name + email + website} />
        <meta property="twitter:image" content={url} />
        <meta property="twitter:image:width" content="1200" />
        <meta property="twitter:image:height" content="630" />
      </Head>
      <section className="p-4">
        <Card {...data} />
      </section>
      <img src={url} className="aspect-[1200/630]" alt={name} />
    </>
  );
};

export default Id;
