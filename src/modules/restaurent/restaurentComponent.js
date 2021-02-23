import { Paper } from '@material-ui/core'
import React from 'react'
import Grid from '@material-ui/core/Grid';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

export default function GroupList(props) {
    return (
        <div style={{ marginLeft: '50px', marginTop: '30px' }}>
            <h5 style={{ marginLeft: '50px' }}>Restaurent List</h5>
            <DatePicker
                                className={'br-3 b-1-ccc w-140  color-dark-grey height-36 outline-none bg-white p-l-sm fs-16 date_picker'}
                                selected={props.state.startTime}
                                onChange={date => {
                                    props.applyFilter(moment(date).valueOf(), 'startTime');
                                }}
                                showTimeSelect
                                dateFormat="dd MMM h:mma"
                            />

            <input className="h-30 outline-none input-border "
            onChange={(event) => props.onChangeEvent(event)} style={{ marginLeft: '50px' }}/>
            <Grid container spacing={2}>
                {props.state.restaurentArray && props.state.restaurentArray.length ? props.state.restaurentArray.map(cell =>
                    <Grid>
                        <Paper variant="outlined" style={{ height: '200px', width: '250px', marginTop: '25px', marginLeft: '50px' }}>
                            <h5 style={{ textAlign: 'center', paddingTop: '14px' }}>{cell['Kushi Tsuru']}</h5>

                            <p style={{marginLeft: '9px', marginTop: '5px' }}>
                                {cell['Mon-Sun 11:30 am - 9 pm'].split('/').map(time =>
                                    <li>{time}</li>)}</p>
                            <p>{cell.isClosed}</p>
                        </Paper>

                    </Grid>) : ""}
            </Grid>
        </div>
    )
}