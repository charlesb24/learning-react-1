import { useState } from 'react';

import Output from './Output';

export default function Greeting() {
  const [ hasChanged, setHasChanged ] = useState(false);

  return (
    <div>
      <h2>Hello World!</h2>
      { !hasChanged && <Output>It's good to see you!</Output> }
      { hasChanged && <Output>Changed!</Output> }
      <button onClick={() => setHasChanged(true)}>Change Text!</button>
    </div>
  );
}