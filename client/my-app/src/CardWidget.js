import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useSelector } from "react-redux";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { selectModal } from "./features/modalSlice"
import EditCard from './EditCard.js';
import { Button } from '@material-ui/core';


function CardWidget({chartId}) {

    const modal = useSelector(selectModal);

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
        root: {
            width: 100,
            textAlign: 'center'
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
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


    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <EditCard chartId={chartId}/>
        </div>
    );

  return (
    <div className="CardWidget">
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

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Students 
                </Typography>
                <Typography variant="h5" component="h2">
                25
                </Typography>
            </CardContent>
        </Card>

    </div>
  );
}

export default CardWidget;