import React, { useState, useMemo, useCallback } from 'react';

const ChildComponent = React.memo(({ onClick, expensiveValue }) => {
  console.log('Child component rendered');

  return (
    <div>
      <button onClick={onClick}>Click me to increase count</button>
      <p>Calculated value: {expensiveValue}</p>
    </div>
  );
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(2);

  // Expensive calculation that will be memoized
  const calculateExpensiveValue = (n) => {
    console.log('Calculating expensive value...');
    return n * n;
  };

  // Memoize expensive calculation to avoid re-calculating unless `number` changes
  const expensiveValue = useMemo(() => calculateExpensiveValue(number), [number]);

  // Memoize function to prevent unnecessary re-creations
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setNumber(number + 1)}>Increase number</button>

      {/* Pass memoized callback and memoized value to the child */}
      <ChildComponent onClick={handleClick} expensiveValue={expensiveValue} />
    </div>
  );
};

export default ParentComponent;
