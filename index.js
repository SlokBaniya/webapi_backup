const Express = require('express');


const express = new Express();

function login(request,response){
    response.json({
        status :'ok'
    })

}

express.get('/api/login',login)

express.listen(8000,'localhost',function(){
    console.log('server is running on port 8000')
})