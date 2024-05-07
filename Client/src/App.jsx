import { useState } from "react";
import PlayGround from "./screens/PlayGround/PlayGround";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <PlayGround />
      </div>
    </>
  );
}

export default App;
