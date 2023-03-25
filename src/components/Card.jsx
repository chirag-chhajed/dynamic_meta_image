import Link from "next/link";

const Card = ({
  firstName,
  lastName,
  email,
  date,
  favouriteMovie,
  Location,
}) => {
  return (
    <div className="border border-black shadow-lg">
      <h2>
        Name:{firstName} {lastName}
      </h2>
      <p>
        <span>Email:</span>
        {email}
      </p>
      <p>Date:{date}</p>
      <p>Favourite Movie: {favouriteMovie}</p>
      <p>Location: {Location}</p>
    </div>
  );
};

export default Card;
