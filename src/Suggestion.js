import React,{useContext} from 'react'
import { DataContext } from './contexts/DataContext';

export default function Suggestion() {
  const { sentiment } = useContext(DataContext);
  return (
    <div>
      <h1>Suggestion</h1>
      <h4>{sentiment}</h4>
    </div>
  );
}
