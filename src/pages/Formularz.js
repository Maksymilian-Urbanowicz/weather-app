import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Formularz({ submitHandler }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitHandler({ name, email });
    navigate("/komponent");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Imię:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Prześlij</button>
    </form>
  );
}

export default Formularz;
