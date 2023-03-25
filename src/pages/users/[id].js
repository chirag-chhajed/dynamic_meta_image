import Card from "@/components/Card";
import Meta from "@/components/Meta";
// import Head from "next/head";
import { createCanvas } from "canvas";

async function generateMetaImage({ name, email, website }) {
  const canvas = createCanvas(1200, 630);
  const context = canvas.getContext("2d");

  // Set background color
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  context.fillStyle = "#000000";
  context.font = "bold 48px sans-serif";
  context.fillText(`${name}`, 100, 100);
  context.fillText(`${email}`, 100, 200);
  context.fillText(`${website}`, 100, 300);

  const imageData = canvas.toDataURL("image/png");
  return imageData;
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();
  const { name, email, phone, website, address } = data;

  const imageDataUrl = await generateMetaImage({ name, email, website });
  console.log(data);

  return { props: { name, email, phone, website, address, imageDataUrl } };
}

const Id = (props) => {
  return (
    <>
      <Meta
        title={props.name}
        description={props.name}
        imageUrl={props.imageDataUrl}
      />
      <section className="p-4">
        <Card {...props} />
      </section>
    </>
  );
};

export default Id;
