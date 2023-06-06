import React from "react";

function Komponent({ data }) {
  let name = data.name ||null;
  let email = data.email || null;
  return (
    <div>
      <h2>Odebrane dane:</h2>
      <p>Imię: {name}</p>
      <p>Email: {email}</p>
    </div>
  );
}

export default Komponent;
