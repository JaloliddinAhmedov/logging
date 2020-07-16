import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Fuse from 'fuse.js';
import '../../style/styleForInbox.css'
import { Route, Redirect } from 'react-router-dom';

import axios from 'axios';
import Cookie from 'js-cookie'
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { NativeSelect, Grid, Button } from '@material-ui/core';
import SubTable from '../ErrorLogs/Subtable';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
    // { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
    // { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    // { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    // { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
    // ----------------------------------------------------------------------------
    { id: 'lvl', numeric: false, disablePadding: true, label: 'lvl' },
    { id: 'message_short', numeric: false, disablePadding: false, label: 'message' },
    { id: 'stack_trace_short', numeric: false, disablePadding: false, label: 'stack_trace' },
    { id: 'emc', numeric: false, disablePadding: false, label: 'emc' },
    { id: 'act', numeric: false, disablePadding: false, label: 'act' },
    { id: 'c_ts_hr', numeric: false, disablePadding: false, label: 'c_ts_hr' },
    { id: 't_lvl', numeric: false, disablePadding: true, label: 't_lvl' },
    { id: 's_code', numeric: false, disablePadding: false, label: 's_code' },
    { id: 'src_host', numeric: false, disablePadding: false, label: 'src_host' },
    { id: 'dst_host', numeric: false, disablePadding: false, label: 'dst_host' },

];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },

    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
}));

// const EnhancedTableToolbar = props => {
//     const classes = useToolbarStyles();
//     const { numSelected } = props;

//     const handleSearch = event => {
//         const data = rows;
//         let filteredDatas = []
//         filteredDatas = data.filter(e => {
//             let mathesItems = Object.values(e)
//             let retVal = true;
//             mathesItems.forEach(e => {
//                 const regex = new RegExp(event.target.value, 'gi')
//                 if (typeof e == 'string')
//                     retVal = e.match(regex)
//             })
//             return retVal;
//         })
//         console.log('filtered data', filteredDatas);
//         //rows = filteredDatas;

//     }

//     return (
//         <div>
//             <Toolbar
//                 className={clsx(classes.root, {
//                     [classes.highlight]: numSelected > 0,
//                 })}
//             >

//                 <div className={classes.title}>
//                     {numSelected > 0 ? (
//                         <Typography color="inherit" variant="subtitle1">
//                             {numSelected} selected
//           </Typography>
//                     ) : (
//                             <Typography variant="h6" id="tableTitle">
//                                 Nutrition
//           </Typography>
//                         )}
//                 </div>
//                 <div className={classes.spacer} />
//                 <TextField placeholder="Search" onChange={handleSearch} />
//                 <div className={classes.actions}>

//                     {numSelected > 0 ? (
//                         <Tooltip title="Delete">
//                             <IconButton aria-label="delete">
//                                 <DeleteIcon />
//                             </IconButton>
//                         </Tooltip>
//                     ) : (

//                             <Tooltip title="Filter list">
//                                 <IconButton aria-label="filter list">
//                                     <FilterListIcon />
//                                 </IconButton>
//                             </Tooltip>
//                         )}
//                 </div>
//             </Toolbar>
//         </div>
//     );
// };

// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
// };

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function All() {
    var now = new Date();
    var myDate = new Date();
    myDate.setDate(myDate.getDate() - 7);
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [mainData, setMainData] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [fullData, setFullData] = React.useState(null);
    const [searchKeys, setSearchKeys] = React.useState([]);
    const [payloadKeys, setPayloadKeys] = React.useState([]);
    const [currData, setCurrData] = React.useState(null);
    const [selectFromTime, setSelectFromTime] = React.useState(myDate);
    const [selectToTime, setSelectToTime] = React.useState(now);

    let keyBond = {
        'All': payloadKeys,
        'id': ['id'],
        'log_level_label': ['log_level_label'],
        'message_short': ['message_short'],
        'em_code': ['em_code'],
        'app_client_type_id': ['app_client_type_id'],
        'created_ts_hr': ['created_ts_hr'],
        'threat_level': ['threat_level'],
        'subdomain_code': ['subdomain_code'],
        'src_host': ['src_host'],
        'dst_host': ['dst_host'],
        'chain_id': ['chain_id'],
        'user_id': ['user_id'],
        'app_instance_id': ['app_instance_id'],
    }

    // ----------------------------------------------------------------------------------------

    const handleRequest = (from = selectFromTime, to = selectToTime) => {

        axios.post('https://logger-api.antexpert.uz/find_by_log_ts_and_status_id', {
            "meta": {
            },
            "payload": [
                {
                    "start_time": from.getTime(),
                    "end_time": to.getTime()
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': 'Bearer ' + Cookie.get('cookies')
            }

        }).then(r => {

            console.log('r', r);
            setMainData(r.data.payload);
            setFullData(r.data.payload);
            setPayloadKeys(Object.keys(r.data.payload[0]));



        }).catch(err => {
            console.error(err);
            console.log('in Inbox', err.response);
            if (err.response) {
                if (err.response.status === 401) {
                    window.location = '/login';
                    Cookie.remove('cookies');
                }
            }


        })
    }

    if (!fullData) {
        handleRequest();
    }
    // -------------------------------------------------------------------------------------------
    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = mainData.map(n => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, row) => {
        setCurrData(row);
        let name = row.id
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            console.log('-1');

            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            console.log('0');
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            console.log('selected.length-1');
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            console.log('>0');
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
        console.log('event.target.id.split(' - ')[3]', event.target);
        console.log('newselected', selected);


    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, mainData.length - page * rowsPerPage);

    const handleSearch = event => {
        console.log("in handle Search", event.target.value);
        setMainData(fullData)
        if (!event.target.value) {

        } else {
            let filteredDatas = [];
            var options = {
                shouldSort: true,
                threshold: 0.5,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: searchKeys
            };
            var fuse = new Fuse(fullData, options);
            filteredDatas = fuse.search(event.target.value);
            // filteredDatas = fullData.filter(e => {


            //     let mathesItems = Object.values(e)
            //     let retVal = true;
            //     mathesItems.forEach(ev => {
            //         console.log(ev);

            //         const regex = new RegExp(event.target.value, 'gi')
            //         if (typeof ev == 'string')
            //             retVal = ev.match(regex)
            //             console.log(retVal);
            //             console.log('retval tugadi');


            //     })
            //     return retVal;
            // });
            console.log('filtered data', filteredDatas);
            setMainData(filteredDatas);
            console.log('main data', mainData);
        }

    }

    const handleInboxPostClick = () => {

        axios.post('https://logger-api.antexpert.uz/change_status', {
            "payload": [
                {
                    "ids": selected
                    ,
                    "status_id": 3
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': 'Bearer ' + Cookie.get('cookies')
            }

        }).then(r => {
            console.log('r in inbox', r);

            if (r.status === 200) {

                selected.map(item => {
                    const ddata = fullData.filter(el => el.id !== item);
                    setFullData(ddata);
                    const ddataa = mainData.filter(el => el.id !== item);
                    setMainData(ddataa);
                })
                setSelected([]);
            }
        }).catch(err => {
            console.error(err);

            if (err.response) {
                if (err.response.status === 401) {
                    window.location = '/login';
                    Cookie.remove('cookies');
                }
            }
        })
    }

    const handleArchivePostClick = () => {

        axios.post('https://logger-api.antexpert.uz/change_status', {
            "payload": [
                {
                    "ids": selected
                    ,
                    "status_id": 4
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': 'Bearer ' + Cookie.get('cookies')
            }

        }).then(r => {
            console.log('r in inbox', r);

            if (r.status === 200) {

                selected.map(item => {
                    const ddata = fullData.filter(el => el.id !== item);
                    setFullData(ddata);
                    const ddataa = mainData.filter(el => el.id !== item);
                    setMainData(ddataa);
                })
                setSelected([]);
            }
        }).catch(err => {
            console.error(err);

            if (err.response) {
                if (err.response.status === 401) {
                    window.location = '/login';
                    Cookie.remove('cookies');
                }
            }
        })
    }

    const handleProcessingPostClick = () => {

        axios.post('https://logger-api.antexpert.uz/change_status', {
            "payload": [
                {
                    "ids": selected
                    ,
                    "status_id": 5
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': 'Bearer ' + Cookie.get('cookies')
            }

        }).then(r => {
            console.log('r in inbox', r);

            if (r.status === 200) {

                selected.map(item => {
                    const ddata = fullData.filter(el => el.id !== item);
                    setFullData(ddata);
                    const ddataa = mainData.filter(el => el.id !== item);
                    setMainData(ddataa);
                })
                setSelected([]);
            }
        }).catch(err => {
            console.error(err);

            if (err.response) {
                if (err.response.status === 401) {
                    window.location = '/login';
                    Cookie.remove('cookies');
                }
            }
        })
    }

    const classesToolBar = useToolbarStyles();
    const numSelected = selected.length;

    const [values, setValues] = React.useState({
        age: '',
        name: 'hai',
    });

    const handleChange = event => {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    };

    return (<div className='inbox_app classes.root'>
        <Route render={props =>
            (Cookie.get('cookies')) ? (
                <div className={classes.root}>
                    <Grid container spacing={3} className="app_instance" justify="space-between" alignItems="flex-start">
                        <Grid item>
                            {/* <NativeSelect onChange={(e) => {
                                console.log(e.target.value);
                                setOptionIndex(e.target.value);
                            }} className='selector'>
                                <option value="4">Archive</option>
                                <option value="5">Processing</option>
                            </NativeSelect> */}
                            <Grid container spacing={1}>
                                <Grid item xs>
                                    <Button variant="contained" onClick={handleInboxPostClick} color="primary">Inb</Button>
                                </Grid>
                                <Grid item xs>
                                    <Button variant="contained" onClick={handleArchivePostClick}color="secondary">Arc</Button>
                                </Grid>
                                <Grid item xs>
                                    <Button variant="contained" onClick={handleProcessingPostClick} color="primary">Pro</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Paper className={classes.paper} elevation={0}>
                                <Grid container spacing={0}>
                                    <Grid item>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2} align="center">
                                                <p>From</p>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDateTimePicker
                                                        value={selectFromTime}
                                                        onChange={date => {
                                                            console.log('date mi ', date.getTime());
                                                            setSelectFromTime(date);
                                                            setFullData([]);
                                                            setMainData([]);
                                                            handleRequest(date, selectToTime);
                                                        }}
                                                        ampm={false}
                                                        // label="From"
                                                        onError={console.log}
                                                        minDate={new Date("2018-01-01T00:00")}
                                                        format="yyyy/MM/dd hh:mm"
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2} align="center">
                                                <p>To</p>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDateTimePicker
                                                        value={selectToTime}
                                                        onChange={date => {
                                                            setSelectToTime(date);
                                                            handleRequest();
                                                        }}
                                                        ampm={false}
                                                        // label="To"
                                                        onError={console.log}
                                                        minDate={new Date("2018-01-01T00:00")}
                                                        format="yyyy/MM/dd hh:mm"
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item>
                        <NativeSelect
                                                    value={searchValue}
                                                    onChange={(e) => {
                                                        console.log(e.target.value);
                                                        setSearchValue(e.target.value);
                                                        setSearchKeys(keyBond[e.target.value])
                                                    }}
                                                    className='selector'
                                                >
                                                    <option value={''} >Select</option>
                                                    <option value={'All'}>All</option>
                                                    <option value={'log_level_label'}>log_level_label</option>
                                                    <option value={'message_short'}>message_short</option>
                                                    <option value={'em_code'}>em_code</option>
                                                    <option value={'app_client_type_id'}>app_client_type_id</option>
                                                    <option value={'created_ts_hr'}>created_ts_hr</option>
                                                    <option value={'threat_level'}>threat_level</option>
                                                    <option value={'subdomain_code'}>subdomain_code</option>
                                                    <option value={'src_host'}>src_host</option>
                                                    <option value={'dst_host'}>dst_host</option>
                                                    <option value={'id'}>id</option>
                                                    <option value={'chain_id'}>chain_id</option>
                                                    <option value={'user_id'}>user_id</option>
                                                    <option value={'app_instance_id'}>app_instance_id</option>
                                                </NativeSelect>

                                                <TextField placeholder="Search" onChange={handleSearch} />

                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <div className={classes.root}>
                                    <Paper className={classes.paper}>
                                        <div>
                                            <Toolbar
                                                className={clsx(classesToolBar.root, {
                                                    [classesToolBar.highlight]: numSelected > 0,
                                                })}
                                            >
                                                <div className={classesToolBar.title}>
                                                    {numSelected > 0 ? (
                                                        <Typography color="inherit" variant="subtitle1">
                                                            {numSelected} selected
                                                        </Typography>
                                                    ) : (
                                                            <div></div>
                                                        )}
                                                </div>
                                                <div className={classesToolBar.spacer} />       
                                                <div className={classesToolBar.actions}>
                                                    {numSelected > 0 ? (
                                                        <Tooltip title="Delete">
                                                            <IconButton aria-label="delete">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    ) : (
                                                            null
                                                            // <Tooltip title="Filter list">
                                                            //     <IconButton aria-label="filter list">
                                                            //         <FilterListIcon />
                                                            //     </IconButton>
                                                            // </Tooltip>
                                                        )}
                                                </div>
                                            </Toolbar>
                                        </div>
                                        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                        <div className={classes.tableWrapper}>
                                            <Table
                                                className={classes.table}
                                                aria-labelledby="tableTitle"
                                                size='small'
                                                aria-label="enhanced table"
                                            >
                                                <EnhancedTableHead
                                                    classes={classes}
                                                    numSelected={selected.length}
                                                    order={order}
                                                    orderBy={orderBy}
                                                    onSelectAllClick={handleSelectAllClick}
                                                    onRequestSort={handleRequestSort}
                                                    rowCount={mainData.length}
                                                />
                                                <TableBody>
                                                    {stableSort(mainData, getSorting(order, orderBy))
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((row, index) => {
                                                            const isItemSelected = isSelected(row.id);
                                                            const labelId = `enhanced-table-checkbox-${index}`;
                                                            return (
                                                                <TableRow
                                                                    hover
                                                                    onClick={event => handleClick(event, row)}
                                                                    role="checkbox"
                                                                    aria-checked={isItemSelected}
                                                                    tabIndex={-1}
                                                                    key={row.id}
                                                                    selected={isItemSelected}
                                                                >
                                                                    <TableCell padding="checkbox">
                                                                        <Checkbox
                                                                            checked={isItemSelected}
                                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                                        />
                                                                    </TableCell>
                                                                    {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                                                    {row.name}
                                                </TableCell> */}
                                                                    {/* <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell> */}
                                                                    {/* // // -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                                                                    <TableCell align="left">{row.log_level}</TableCell>
                                                                    <TableCell align="left">{row.message_short}</TableCell>
                                                                    <TableCell align="left">{row.stack_trace_short}</TableCell>
                                                                    <TableCell align="left">{row.em_code}</TableCell>
                                                                    <TableCell align="left">{row.app_client_type_id}</TableCell>
                                                                    <TableCell align="left">{row.created_ts_hr}</TableCell>
                                                                    <TableCell align="left">{row.threat_level}</TableCell>
                                                                    <TableCell align="left">{row.subdomain_code}</TableCell>
                                                                    <TableCell align="left">{row.src_host}</TableCell>
                                                                    <TableCell align="left">{row.dst_host}</TableCell>
                                                                    {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                                                                </TableRow>
                                                            );
                                                        })}
                                                    {emptyRows > 0 && (
                                                        <TableRow style={{ height: 33 * emptyRows }}>
                                                            <TableCell colSpan={6} />
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, (mainData.length)]}
                                            component="div"
                                            count={mainData.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            backIconButtonProps={{
                                                'aria-label': 'previous page',
                                            }}
                                            nextIconButtonProps={{
                                                'aria-label': 'next page',
                                            }}
                                            onChangePage={handleChangePage}
                                            onChangeRowsPerPage={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                {currData
                                    ? (<SubTable currentData={currData} />)
                                    : (null)
                                }
                            </Paper>
                        </Grid>

                    </Grid>
                </div>
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
        />
    </div>);
}