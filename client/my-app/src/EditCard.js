import React, { useState } from 'react';
import { Button , Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const tablesList = [{"id":"student", "value": "Students"},
                    {"id":"marks", "value": "Marks"},
                    {"id":"subject", "value": "Subjects"}]

const functionList = [{"table": "student", "functions": [{"id": "count", "value":"Count"}]},
                        {"table": "marks", "functions": [{"id": "max", "value":"Max"}, {"id": "min", "value": "Min"}]},
                        {"table": "subject", "functions": [{"id": "count", "value":"Count"}]}];

function EditCard({chartId}) {

    const [tableName, setTableName] = useState();
    const [funcList, setFuncList] = useState([{"id": "count", "value":"Count"}]);
    const [funcName, setFuncName] = useState();

    const getFunctions = () => {
        functionList.map(option => {
            if (option.table === tableName){
                setFuncList(option.functions);
            }
        })
    };

    const handleTableChange = (event) => {
        setTableName(event.target.value);

    };

    const handleFuncChange = (event) => {
        setFuncName(event.target.value);
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

  return (
    <div className="EditCard">
        <TextField
          id="standard-select-table"
          select
          fullWidth
          required
          label="Select the table"
          value={tableName}
          className={classes.textField}
          onChange={handleTableChange}
        >
          {tablesList.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="standard-select-func"
          select
          fullWidth
          required
          label="Select the function"
          value={funcName}
          className={classes.textField}
          onChange={handleFuncChange}
          onFocus={getFunctions}
        >
          {funcList.map((option) => (
             
            <MenuItem key={option.id} value={option.id}>
                {option.value}
            </MenuItem>
              
          ))}
        </TextField>

        <Typography align='center'>
            <Button size="small" type="submit" color="primary" variant="contained" className={classes.margin} >
                Done
            </Button>
        </Typography>


    </div>
  );
}

export default EditCard;