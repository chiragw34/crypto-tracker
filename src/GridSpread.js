import React, { useContext } from 'react'
import { DataContext } from './contexts/DataContext';
import { Grid } from 'semantic-ui-react';
// import GridLayout from 'react-grid-layout';
// import '../node_modules/react-grid-layout/css/styles.css'
// import '../node_modules/react-resizable/css/styles.css'



export default function GridSpread() {

  const { data, total_invested} = useContext(DataContext);


  // const getRoot = (c) => {
  //   var percent = (c.invested / total_invested) * 100
  //   var side = Math.sqrt(percent)
  //   console.log(side);
  //   return side
  // }

  // return (
  //   <GridLayout width={1200} cols={12} className="layout"  isResizable='false' isDraggable='false'>
  //     {data.map((c, i) => (
  //       <div key={i} data-grid={{ x: 0, y: 0, w: getRoot(c), h: getRoot(c)/2 }}>
  //         {`${((c.invested/total_invested)*100).toFixed(2)}% ${c.base_unit}`}
  //       </div>
  //     ))}
  //   </GridLayout>
  // )

  return (
    <Grid centered>
      {data.map((c,i) => (
        <Grid.Column key={i} width={2}>
          {`${((c.invested/total_invested)*100).toFixed(2)}% ${c.base_unit.toUpperCase()}`}
        </Grid.Column>
      ))}
  </Grid>
  )
}
