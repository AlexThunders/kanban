import { useState } from 'react';

const xx = ' fwfsdf ';

const obj = {
  x: 1,
  y: 5,
};

function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>My counteR</h1>
      <button
        type="button"
        onClick={() => setCount((counter) => counter + 1)}
      >
        Click me
      </button>
      <h2>
        counter:
        {count}
      </h2>
    </div>
  );
}

export default ClickCounter;
