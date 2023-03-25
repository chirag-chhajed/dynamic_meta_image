import Card from "@/components/Card";
import Link from "next/link";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await fetch(`http://localhost:4000/data/${id}`);
  const data = await res.json();
  console.log(data);

  return { props: { data } };
}

const Id = ({ data }) => {
  return (
    <>
      <Head>
        <title>
          {data.firstName} {data.lastName}
        </title>
        <meta
          property="twitter:title"
          content={`${data.firstName} ${data.lastName}`}
        />
        <meta
          property="twitter:description"
          content={`${data.firstName} ${data.lastName}`}
        />
      </Head>
      <section className="p-4">
        <Card {...data} />
      </section>
    </>
  );
};

export default Id;
