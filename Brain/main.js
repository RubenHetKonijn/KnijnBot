const axios = require('axios');

module.exports = (msg) => {
    axios.get(`http://api.brainshop.ai/get?bid=86315&key=GY6zj8kPTP9rpapx&uid=${msg.member.id}&msg=${msg.content}`).then(res =>{
        
    })
}