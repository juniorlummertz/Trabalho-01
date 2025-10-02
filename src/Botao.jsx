import { useState } from "react";

function BotaoClique() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        o bobo apertou {count} vezes
      </button>
    </div>
  );
}

export default BotaoClique;