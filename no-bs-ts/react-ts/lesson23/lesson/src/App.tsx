import React from 'react'
import './App.css';

const Heading = ({title}: {title: string}) => {
  return <h2>{title}</h2>
}

const Box = ({children}: {children: React.ReactNode}) => (
  <div style={{
    padding: '1rem',
    fontWeight: 'bold'
  }}>{children}</div>
)

function App() {
  return (
    <div>
      <Heading title="Introduction"/>
      <Box>
        Hello there
      </Box>
    </div>
  );
}

export default App;
