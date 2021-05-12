import { Line } from 'react-chartjs-2';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774"
    }
  ]
};



function LineChart() {

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
    <div className="BarChart">
        
        <Line data={data} />
    </div>
  );
}

export default LineChart;