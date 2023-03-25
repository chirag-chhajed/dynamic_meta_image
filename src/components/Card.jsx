import Link from "next/link";

const Card = ({ name, email, phone, website, address, id }) => {
  return (
    <div className="border border-black shadow-lg">
      <h2>Name:{name}</h2>
      <p>
        <span>Email:</span>
        {email}
      </p>
      <p>Phone:{phone}</p>
      <p>Website: {website}</p>
      <p>
        Location:
        {address &&
          `${address.street} + ${address.suite} + ${address.city} + ${address.zipcode}`}
      </p>
      <Link href={`/users/${id}`}>detail</Link>
    </div>
  );
};

export default Card;
