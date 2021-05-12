import React, { useEffect, useState } from 'react';
import EditBarChart from './EditBarChart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useSelector } from "react-redux";
import { selectFilter } from "./features/filterSlice"
import { selectModal } from "./features/modalSlice"
import { selectData } from "./features/dataSlice"
import Axios from'axios';


function Chart({chartId, chartType}) {

    const [labels,setLabels] = useState([]);
    const [dataset,setDataset] = useState([]);
    const [isFetch,setIsFetch] = useState(false);

    const data = {
      labels: labels,
      datasets: dataset,
    };

    const options = {
            scales: {
              x: {
                grid: {
                  tickColor: 'red',
                  borderColor: 'red'
                },
                ticks: {
                  color: 'blue',
                },
                title: {
                  color: 'red',
                  display: true,
                  text: 'Semester'
                }
              },
              y: {
                grid: {
                  tickColor: 'red',
                  borderColor: 'red'
                },
                ticks: {
                  color: 'blue',
                },
                title: {
                  color: 'red',
                  display: true,
                  text: 'Marks'
                }
              }
            }
        };

    const filter = useSelector(selectFilter);
    const modal = useSelector(selectModal);
    const datas = useSelector(selectData);

    const getMarks = () => {
        
          if (filter.filter.chartId === chartId){
              Axios.get("http://localhost:3001/marks/"+ filter.filter.studentId +"/"+ filter.filter.fromDate +"/"+ filter.filter.endDate)
                .then((response) => {
                  console.log('fetched data for chart ' + chartId );
                  if(response.data[0].length > 0){
                      setLabels(JSON.parse(response.data[0][0].TERM));
                      setDataset(JSON.parse(response.data[0][0].details));
                  }else{
                      setLabels([]);
                      setDataset([]);
                  }
                  
              });
          }

    };


    function rand() {
      return Math.round(Math.random() * 20) - 10;
    }

    function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
    }

    const useStyles = makeStyles((theme) => ({
        margin: {
        margin: theme.spacing(1),
        },
        extendedIcon: {
        marginRight: theme.spacing(1),
        },
        paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px',
        borderRadius: '5px!important',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5, 5, 5),
    },
    }));

    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);    

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
      setOpen(modal.modal.isOpen)
    },[modal]);

    useEffect(() => {
      setIsFetch(datas.data.isFetch)
    },[datas]);

    useEffect(() => {
      if (isFetch){
        getMarks();
        setIsFetch(false)
      }
      
    },[isFetch]);

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <EditBarChart chartId={chartId}/>
        </div>
    );

  return (
    <div className="Chart">
        <Button size="small" color="primary" variant="contained" className={classes.margin} onClick={handleOpen}>
            Edit Configurations
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
        {(() => {
          if (chartType === 'bar'){
              return <Bar data={data} options={options}/>
          }
          else{ 
              return <Line data={data} options={options}/>
          }
            
            
        })()}
    </div>
  );
}

export default Chart;