import React, { useState } from 'react';

import { get } from './api'
import { useAPI } from './hooks/use-api'

function ApiComponent({ display }) {
  const [response, execute, isLoading, isError] = useAPI(get);

  return display && (
    <div className="App">
      <button onClick={() => execute({ id: 1 })}>Execute</button>
      <header className="App-header">
        { isLoading && <span>Loading...</span> }
        { isError && <span>Error!!!</span> }
        { response && <span>{JSON.stringify(response)}</span> }
      </header>
    </div>
  );
}

function App() {
  const [show, setShow] = useState(true)

  return (
    <div>
      <button onClick={() => setShow(!show)}>toggle</button>
      <ApiComponent display={show} />
    </div>
  )
}

export default App;
