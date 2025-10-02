function Card({ titulo, descricao }) {
  return (
    <div style={{ 
      border: "1px solid #ccc", 
      padding: "10px", 
      margin: "10px", 
      borderRadius: "8px",
      maxWidth: "200px"
    }}>
      <h3>{titulo}</h3>
      <p>{descricao}</p>
    </div>
  );
}

export default Card;
