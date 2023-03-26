import Card from "@/components/Card";
import Meta from "@/components/Meta";
import sharp from "sharp";

export async function generateMetaImage({ name, email, website }) {
  const buffer = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      {
        input:
          Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 48px; font-family: sans-serif;">
              <p>${name}</p>
              <p>${email}</p>
              <p>${website}</p>
            </div>
          </foreignObject>
        </svg>`),
        left: 100,
        top: 100,
      },
    ])
    .png()
    .toBuffer();

  return `data:image/png;base64,${buffer.toString("base64")}`;
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
