import axios from 'axios';
import Cookie from 'js-cookie';

const done =async function(){
    let datas;
    await axios.post('https://logger-api.antexpert.uz/find_by_last_limit', {
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

      console.log(r);
    datas = r.data.payload;
        return r.data.payload
        console.log('res json',r.data.payload.toJSON());
        
    }).catch(err => {
      console.error(err);
      datas = null;
      return null;
      if (err.response) {
        if (err.response.status === 401) {
            window.location = '/login';
            Cookie.remove('cookies')
        }
    }
    })

    return datas;
}

const data = done();


export default data;