const Card = ({ name, email, phone, website, address }) => {
  return (
    <div className="p-6 text-white bg-gray-800 border border-black rounded-lg">
      <h2 className="mb-4 text-2xl font-bold">{name}</h2>
      <p className="mb-2">
        <span className="font-bold">Email:</span> {email}
      </p>
      <p className="mb-2">
        <span className="font-bold">Phone:</span> {phone}
      </p>
      <p className="mb-2">
        <span className="font-bold">Website:</span> {website}
      </p>
      {address && (
        <p>
          <span className="font-bold">Location:</span>{" "}
          {`${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`}
        </p>
      )}
    </div>
  );
};

export default Card;
