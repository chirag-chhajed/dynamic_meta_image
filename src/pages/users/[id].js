import Card from "@/components/Card";
import Link from "next/link";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();
  console.log(data);

  return { props: { data } };
}

const Id = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta property="twitter:title" content={`${data.name}`} />
        <meta property="twitter:description" content={`${data.name}`} />
      </Head>
      <section className="p-4">
        <Card {...data} />
      </section>
    </>
  );
};

export default Id;
