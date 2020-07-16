import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, createStyles } from '@material-ui/core/styles';
import keycode from 'keycode';
import Table from '@material-ui/core/Table';
import  {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import TextField from '@material-ui/core/TextField';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

class EnhancedTableHead extends Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell checkbox>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < 5}
              checked={numSelected === 5}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                disablePadding={column.disablePadding}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyleSheet = createStyles(theme => ({
  root: {
    paddingRight: 2,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.accent.A700,
          backgroundColor: theme.palette.accent.A100,
        }
      : {
          color: theme.palette.accent.A100,
          backgroundColor: theme.palette.accent.A700,
        },
  actions: {
    color: theme.palette.text.secondary,
    marginLeft: 'auto'
  },
  title: {
    flex: '0 0 auto',
  },
}));

let EnhancedTableToolbar = props => {
  const { numSelected, classes, value, handleSearch} = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0
          ? <Typography type="subheading">
              {numSelected} selected
            </Typography>
          : <Typography type="title">Nutrition</Typography>}
      </div>
      <div className={classes.actions}>
        {numSelected > 0
          ? <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          : <div>
              <TextField  placeholder="Search" onChange={handleSearch} value={value}/>
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </div>
            }
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyleSheet)(EnhancedTableToolbar);

const styleSheet = createStyles(theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
}));

class EnhancedTable extends Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    searchValue: '',
    data: [
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Cupcake', 305, 3.7, 67, 4.3),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
    ],
    filterData: [
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Cupcake', 305, 3.7, 67, 4.3),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
    ],
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const filterData = this.state.filterData.sort(
      (a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]),
    );

    this.setState({ filterData, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.filterData.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;


   handleSearch = event => {
        const {data} = this.state
        let filteredDatas = []
        filteredDatas = data.filter(e => {
            let mathesItems = Object.values(e)
            let retVal = true;
            mathesItems.forEach(e => {
                const regex = new RegExp(event.target.value, 'gi')
                if (typeof e == 'string')
                    retVal = e.match(regex)
            })
            return retVal;
        })
        this.setState({filterData: filteredDatas, searchValue: event.target.value})
    }


  render() {
    const classes = this.props.classes;
    const { filterData, order, orderBy, selected } = this.state;

    return (
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} handleSearch={this.handleSearch} 
            value={this.searchValue} />
        <Table>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}

          />
          <TableBody>
            {filterData.map(n => {
              const isSelected = this.isSelected(n.id);
              return (
                <TableRow
                  hover
                  onClick={event => this.handleClick(event, n.id)}
                  onKeyDown={event => this.handleKeyDown(event, n.id)}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex="-1"
                  key={n.id}
                  selected={isSelected}
                >
                  <TableCell checkbox>
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell disablePadding>
                    {n.name}
                  </TableCell>
                  <TableCell numeric>
                    {n.calories}
                  </TableCell>
                  <TableCell numeric>
                    {n.fat}
                  </TableCell>
                  <TableCell numeric>
                    {n.carbs}
                  </TableCell>
                  <TableCell numeric>
                    {n.protein}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

EnhancedTable = withStyles(styleSheet)(EnhancedTable);

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <EnhancedTable />
      </div>
    );
  }
}

export default App;








// ------------------------------------------------------------------------------------------------------------------
// import React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import { lighten, makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import TextField from '@material-ui/core/TextField';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// let rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
// ];

// function desc(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function stableSort(array, cmp) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = cmp(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map(el => el[0]);
// }

// function getSorting(order, orderBy) {
//   return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
// }

// const headCells = [
//   { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
//   { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
//   { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
//   { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
//   { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
// ];

// function EnhancedTableHead(props) {
//   const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//   const createSortHandler = property => event => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{ 'aria-label': 'select all desserts' }}
//           />
//         </TableCell>
//         {headCells.map(headCell => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'default'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={order}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <span className={classes.visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </span>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// const useToolbarStyles = makeStyles(theme => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === 'light'
//       ? {
//         color: theme.palette.secondary.main,
//         backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//       }
//       : {
//         color: theme.palette.text.primary,
//         backgroundColor: theme.palette.secondary.dark,
//       },
//   spacer: {
//     flex: '1 1 100%',
//   },
//   actions: {
//     color: theme.palette.text.secondary,
//   },
//   title: {
//     flex: '0 0 auto',
//   },
// }));

// const EnhancedTableToolbar = props => {
//   const classes = useToolbarStyles();
//   const { numSelected } = props;

//   const handleSearch = event => {
//     const data = rows;
//     let filteredDatas = []
//     filteredDatas = data.filter(e => {
//       let mathesItems = Object.values(e)
//       let retVal = true;
//       mathesItems.forEach(e => {
//         const regex = new RegExp(event.target.value, 'gi')
//         if (typeof e == 'string')
//           retVal = e.match(regex)
//       })
//       return retVal;
//     })
//     console.log('filtered data', filteredDatas);
//     //rows = filteredDatas;

//   }

//   return (
//     <div>
//       <Toolbar
//         className={clsx(classes.root, {
//           [classes.highlight]: numSelected > 0,
//         })}
//       >

//         <div className={classes.title}>
//           {numSelected > 0 ? (
//             <Typography color="inherit" variant="subtitle1">
//               {numSelected} selected
//           </Typography>
//           ) : (
//               <Typography variant="h6" id="tableTitle">
//                 Nutrition
//           </Typography>
//             )}
//         </div>
//         <div className={classes.spacer} />
//         <TextField placeholder="Search" onChange={handleSearch} />
//         <div className={classes.actions}>

//           {numSelected > 0 ? (
//             <Tooltip title="Delete">
//               <IconButton aria-label="delete">
//                 <DeleteIcon />
//               </IconButton>
//             </Tooltip>
//           ) : (

//               <Tooltip title="Filter list">
//                 <IconButton aria-label="filter list">
//                   <FilterListIcon />
//                 </IconButton>
//               </Tooltip>
//             )}
//         </div>
//       </Toolbar>
//     </div>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing(3),
//   },
//   paper: {
//     width: '100%',
//     marginBottom: theme.spacing(2),
//   },
//   table: {
//     minWidth: 750,
//   },
//   tableWrapper: {
//     overflowX: 'auto',
//   },
//   visuallyHidden: {
//     border: 0,
//     clip: 'rect(0 0 0 0)',
//     height: 1,
//     margin: -1,
//     overflow: 'hidden',
//     padding: 0,
//     position: 'absolute',
//     top: 20,
//     width: 1,
//   },
// }));

// export default class EnhancedTable extends React.Component {

//   // const[order, setOrder] = React.useState('asc');
//   // const[orderBy, setOrderBy] = React.useState('calories');
//   // const[selected, setSelected] = React.useState([]);
//   // const[page, setPage] = React.useState(0);
//   // const[dense, setDense] = React.useState(true);
//   // const[rowsPerPage, setRowsPerPage] = React.useState(5);

//   constructor (props) {
//     super(props);

//     this.state = {
//       oreder : 'asc',
//       orederBy : 'calories',
//       selected : [] ,
//       page : 0,
//       dense : false,
//       rowsPerPage : 5
//     }

//   }

//   handleRequestSort = (event, property) => {
//     const isDesc = this.state.orderBy === property && this.state.order === 'desc';
//     this.setState({
//       order : isDesc ? 'asc' : 'desc',
//       orderBy : property
//     })
//     // setOrder(isDesc ? 'asc' : 'desc');
//     // setOrderBy(property);
//   };

//   handleSelectAllClick = event => {
//     if (event.target.checked) {
//       const newSelecteds = rows.map(n => n.name);
//       this.setState({
//         selected : newSelecteds
//       });
//       // setSelected(newSelecteds);
//       return;
//     }
//     this.setState({
//       selected : []
//     });
//     // setSelected([]);
//   };

//   handleClick = (event, name) => {
//     const selectedIndex = this.state.selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(this.state.selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(this.state.selected.slice(1));
//     } else if (selectedIndex === this.state.selected.length - 1) {
//       newSelected = newSelected.concat(this.state.selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         this.state.selected.slice(0, selectedIndex),
//         this.state.selected.slice(selectedIndex + 1),
//       );
//     }

//     this.setState({
//       selected : newSelected
//     })
//     // setSelected(newSelected);
//   };

//   handleChangePage = (event, newPage) => {
//     // setPage(newPage);
//     this.setState({
//       page : newPage
//     });
//   };

//   handleChangeRowsPerPage = event => {
//     // setRowsPerPage(+event.target.value);
//     // setPage(0);
//     this.setState({
//       page : 0,
//       rowsPerPage :+event.target.value
//     });
//   };

//   handleChangeDense = event => {
//     // setDense(event.target.checked);
//     this.setState({
//       dense : event.target.checked
//     });
//   };

//   isSelected = name => this.state.selected.indexOf(name) !== -1;

  

//   render() {
//     const classes = useStyles();
//     const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage);
//     return (
//       <div className={classes.root}>
//         <Paper className={classes.paper}>
//           <EnhancedTableToolbar numSelected={this.state.selected.length} />
//           <div className={classes.tableWrapper}>
//             <Table
//               className={classes.table}
//               aria-labelledby="tableTitle"
//               size={this.state.dense ? 'small' : 'medium'}
//               aria-label="enhanced table"
//             >
//               <EnhancedTableHead
//                 classes={classes}
//                 numSelected={this.state.selected.length}
//                 order={this.state.order}
//                 orderBy={this.state.orderBy}
//                 onSelectAllClick={this.handleSelectAllClick}
//                 onRequestSort={this.handleRequestSort}
//                 rowCount={rows.length}
//               />
//               <TableBody>
//                 {stableSort(rows, getSorting(this.state.order, this.state.orderBy))
//                   .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
//                   .map((row, index) => {
//                     const isItemSelected = this.isSelected(row.name);
//                     const labelId = `enhanced-table-checkbox-${index}`;

//                     return (
//                       <TableRow
//                         hover
//                         onClick={event => this.handleClick(event, row.name)}
//                         role="checkbox"
//                         aria-checked={isItemSelected}
//                         tabIndex={-1}
//                         key={row.name}
//                         selected={isItemSelected}
//                       >
//                         <TableCell padding="checkbox">
//                           <Checkbox
//                             checked={isItemSelected}
//                             inputProps={{ 'aria-labelledby': labelId }}
//                           />
//                         </TableCell>
//                         <TableCell component="th" id={labelId} scope="row" padding="none">
//                           {row.name}
//                         </TableCell>
//                         <TableCell align="right">{row.calories}</TableCell>
//                         <TableCell align="right">{row.fat}</TableCell>
//                         <TableCell align="right">{row.carbs}</TableCell>
//                         <TableCell align="right">{row.protein}</TableCell>
//                       </TableRow>
//                     );
//                   })}
//                 {emptyRows > 0 && (
//                   <TableRow style={{ height: (this.state.dense ? 33 : 53) * emptyRows }}>
//                     <TableCell colSpan={6} />
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={this.state.rowsPerPage}
//             page={this.state.page}
//             backIconButtonProps={{
//               'aria-label': 'previous page',
//             }}
//             nextIconButtonProps={{
//               'aria-label': 'next page',
//             }}
//             onChangePage={this.handleChangePage}
//             onChangeRowsPerPage={this.handleChangeRowsPerPage}
//           />
//         </Paper>
//         <FormControlLabel
//           control={<Switch checked={this.state.dense} onChange={this.handleChangeDense} />}
//           label="Dense padding"
//         />
//       </div>
//     )
//   }
// }
