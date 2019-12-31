import axios from 'axios';

export default {
    newGame: name => axios.post('/game', name)
}