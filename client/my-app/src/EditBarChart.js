import React, { useState } from 'react';
import { Button , Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from'axios';
import { useDispatch } from 'react-redux';
import { setFilter } from './features/filterSlice';
import { setModal } from './features/modalSlice';
import { setData } from './features/dataSlice';


const getCurrentDate = () => {
  let today = new Date();
  let dd = today.getDate();
  if (dd < 10){
    dd = '0'+dd;
  }

  let mm = today.getMonth()+1;
  if (mm < 10){
    mm = '0'+ mm;
  }
  return today.getFullYear() + '-' + mm + '-' + dd;
}

function EditBarChart({chartId}) {

    const dispatch = useDispatch();
    
    const [studentId, setStudentId] = useState(1);
    const [fromDate, setFromDate] = useState(getCurrentDate);
    const [toDate, setToDate] = useState(getCurrentDate);

    const [studentList, setStudentList] = useState([]);

    const getStudents = () => {
      Axios.get("http://localhost:3001/students").then((response) => {
        setStudentList(response.data);
      });
    };


    const useStyles = makeStyles((theme) => ({
        textField: {
              margin: theme.spacing(0,0,3,0),
              },
        margin: {
            margin: theme.spacing(3,10,0,10),
            justifyContent: 'center'
            },
        root: {
                '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
                },
            },
    }));

    const classes = useStyles();

    const handleChange = (event) => {
      console.log('changed student');
        setStudentId(event.target.value);
    };

    const sendFilters = (event) => {
        console.log('Filter button clicked');
        dispatch(
          setFilter({
            chartId: chartId,
            studentId: studentId,
            fromDate: fromDate,
            endDate: toDate,
          }),
        );

        dispatch(
          setModal({
            isOpen: false,
          }),
        );

        dispatch(
          setData({
            isFetch: true,
          }),
        );
    };
    
  return (
    <div className="EditBarChart">
        <TextField
          id="standard-select-student"
          select
          fullWidth
          required
          label="Select the student"
          value={studentId}
          className={classes.textField}
          onChange={handleChange}
          onFocus={getStudents}
        >
          {studentList.map((option) => (
            <MenuItem key={option.persistenceId} value={option.persistenceId}>
              {option.firstName + ' ' + option.lastName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="fromDate"
          label="From Date"
          type="date"
          fullWidth
          value={fromDate}
          className={classes.textField}
          onChange = {(event) => {
              setFromDate(event.target.value);
          }} 
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="toDate"
          label="To Date"
          type="date"
          fullWidth
          value={toDate}
          className={classes.textField}
          onChange = {(event) => {
              setToDate(event.target.value);
          }} 
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Typography align='center'>
            <Button size="small" type="submit" color="primary" variant="contained" className={classes.margin} onClick={sendFilters}>
                Filter
            </Button>
        </Typography>

    </div>
  );
}

export default EditBarChart;