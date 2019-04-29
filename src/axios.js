import axios from 'axios'
 const instance = axios.create({
   baseURL: 'https://api.themoviedb.org/3',
 })

 instance.defaults.params = {}
 instance.defaults.params['api_key'] = '6ed12e064b90ae1290fa326ce9e790ff'

 export default instance;
