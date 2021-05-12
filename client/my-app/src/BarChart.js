import React from 'react';
import EditBarChart from './EditBarChart.js';
import { Bar } from 'react-chartjs-2';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const data = {
  labels: ["SEM1 2015", "SEM2 2015", "SEM1 2016", "SEM2 2016", "SEM1 2017", "SEM2 2017"],
  datasets: [   
    {
      label: "Mathematics",
      data: [33, 53, 85, 41, 44, 65],
      backgroundColor: "#003f5c",
    },
    {
      label: "Computer Science",
      data: [33, 25, 35, 51, 54, 76],
      backgroundColor: "#2f4b7c",
    }
  ]
};



function BarChart() {

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

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <EditBarChart />
        </div>
    );

  return (
    <div className="BarChart">
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
        <Bar data={data} />
    </div>
  );
}

export default BarChart;