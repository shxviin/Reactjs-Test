import Chart from './Chart.js';
import Card from './CardWidget.js';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

function App() {

  const [chartList,setChartList] = useState([]);
  const [count, setCount] = useState(0)

  const addBarChart = () =>{
    setCount(count + 1);
    setChartList([...chartList, {id: count, type:'bar'}]);
    console.log(chartList);
  }

  const addLineChart = () =>{
    setCount(count + 1);
    setChartList([...chartList, {id: count, type:'line'}]);
    console.log(chartList);
  }

  const addCard = () =>{
    setCount(count + 1);
    setChartList([...chartList, {id: count, type:'card'}]);
    console.log(chartList);
  }

  const removeChart = index => {
    const list= [...chartList];
    list.splice(index, 1);
    console.log('chart ' + index + ' deleted');
    setChartList(list);
  }

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
        <AppBar position="static">
          <Toolbar >
            <Typography variant="h6">
              OCTOPUS BI
            </Typography>
          </Toolbar>
        </AppBar> 
      </header>

      <Button size="small" variant="contained" className={classes.margin} onClick={addCard}>Title Chart</Button>
      <Button size="small" variant="contained" className={classes.margin} onClick={addLineChart}>Line Chart</Button>
      <Button size="small" variant="contained" className={classes.margin} onClick={addBarChart}>Bar Chart</Button>

      
      {chartList.map((x,i) => {
        return(
          <div key={x.id}>
          
            <Button size="small" color="secondary" variant="contained" className={classes.margin} onClick={() => removeChart(i)}>
                Remove Chart
            </Button>
            
            {(() => {
              if (x.type === 'bar' || x.type === 'line'){
                  return <Chart chartId={x.id} chartType={x.type}/>
               }
              else{ 
                  return <Card chartId={x.id}/>
              }
            
            
            })()} 
            
          </div>
          
        )
      })}
    </div>
  );
}



export default App;
