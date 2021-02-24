import { Paper } from '@material-ui/core'
import React from 'react'
import Grid from '@material-ui/core/Grid';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

export default function GroupList(props) {
    return (
        <div className="m-l-50 m-t-30">
            <h5 className="m-l-50">Restaurent List</h5>
            <DatePicker
                className="m-l-50"
                selected={props.state.startTime}
                onChange={date => {
                    props.applyFilter(moment(date).valueOf(), 'startTime');
                }}
                showTimeSelect
                dateFormat="dd MMM h:mma"
            />

            <input className="h-32 w-225 fs-14 outline-none input-border "
                onChange={(event) => props.onChangeEvent(event)} className="m-l-95" placeholder="Search for a restaurent" />
            <Grid container spacing={2}>
                {props.state.restaurentArray && props.state.restaurentArray.length ? props.state.restaurentArray.map(cell =>
                    <Grid>
                        <Paper variant="outlined" className={"paper-box " + ((cell.isClosed) === "Closed" ? " bg-pink" : "bg-blue")}>
                            <div className={"status-ribbon " + ((cell.isClosed) === "Closed" ? " bg-closed" : "bg-open")}>{cell.isClosed}</div>

                            <h5 className="text-align-center p-t-14">{cell['Kushi Tsuru']}</h5>

                            <div className="m-l-9 m-t-5">
                                {cell['Mon-Sun 11:30 am - 9 pm'].split('/').map(time =>
                                    <li>{time}</li>)}</div>
                        </Paper>

                    </Grid>) : ""}
            </Grid>
        </div>
    )
}