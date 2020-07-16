import React from 'react';
import axios from 'axios';
import Cookie from 'js-cookie'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import dataAction from '../../actions/dataAction';

class Notification extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cnt: 0,
      loadedTime_ts: new Date().getTime()
    }

    console.log('in constructor of Notification')

  }

  componentWillMount() {
    console.log('in componentDidMount of Notification')

    setInterval(() => {
      if (window.location.pathname === "/dashboard/error-logs" || window.location.pathname === "/dashboard/inbox") {
        axios.post('https://logger-api.antexpert.uz/last_stats', {
          "meta": {
            "params": {
              "last_mod_ts": this.state.loadedTime_ts,
              "created_ts": this.state.loadedTime_ts
            }
          },
          "payload": []
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': 'Bearer ' + Cookie.get('cookies')
          }

        }).then(r => {
          // console.log('r in noti',r.status);

          this.setState({
            cnt: r.data.meta.params.created_ts_count
          })


        }).catch(err => {
          console.error(err);
          if (err.response) {
            if (err.response.status === 401) {
                
                Cookie.remove('cookies');
                window.location = '/login';
            }
        }
        })
      }
    }, 3000)

  }

  handleClick = () => {
    console.log('in handleClick of Notification')
    // ----------------------------------------------------
    if (window.location.pathname === "/dashboard/error-logs" | window.location.pathname === "/dashboard/inbox") {
      axios.post('https://logger-api.antexpert.uz/find_by_last_limit', {
        "meta": {
        },
        "payload": [
          {
            "limit": 2000
          }
        ]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': 'Bearer ' + Cookie.get('cookies')
        }

      }).then(r => {
        this.props.dataAction(r.data.payload)
        this.state = {
          cnt: 0,
          loadedTime_ts: new Date().getTime()
        }

      }).catch(err => {
        console.error(err);
        if (err.response) {
          if (err.response.status === 401) {
             
              Cookie.remove('cookies');
              window.location = '/login';
          }
      }
      })
      // ------------------------------------------------------------
      this.setState({
        cnt: 0,
        loadedTime_ts: new Date().getTime()
      }, () => { })
    }

  }

  render() {
    console.log('in render of Notification')
    return (
      <div>
        <IconButton
          color="inherit" onClick={this.handleClick}>
          <Badge badgeContent={
            (this.state.cnt > 0)
              ? <p>{this.state.cnt}</p>
              : null
          } color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { datas: state.datas,
          // count : state.count
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    dataAction: dataAction,
    // notifAction: state.notifAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);