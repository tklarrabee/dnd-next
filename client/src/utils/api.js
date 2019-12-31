import axios from 'axios';

export default {
    newGame: name => axios.post('/game', name),
    
    getSession: () => axios.get('/session')
}