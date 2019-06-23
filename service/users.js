const knex = require('knex');
const dbConfig = require('./../knexfile');
const dbClient = knex(dbConfig);
// const knex = require('knex');
// const dbConfig = require('./../knexfile');


async function register(data) {
    try{
    // // get username
    // const username = request.body.username;
    // // get password
    // const password = request.body.password;
  
    // const hashedPassword = bcrypt.hashSync(password, 10);
    const fullname = data.fullname;
    const address = data.address;
    const contact = data.contact;
    const password = data.hashedPassword;
    const username = data.username;
    const gender = data.gender;
   
   

    await dbClient.table('users').insert({fullname: fullname, username: username, password: password, address: address, contact: contact, gender: gender})
    }
      catch(error){
          console.log(error)

      }
    }
  
  
  // create a auth handler
  // async function authenticate(request, response) {
  //   try{
    
  //   // const username = request.body.username;
  //   // const passwordFromJSON = request.body.password;
  
  // await dbClient.table('users').first('password').where('username', username)
  //     // .then(data => {
  //     //   if (!data) {
  //     //     response.json({
  //     //       status: 'fail',
  //     //       message: 'User not found.'
  //     //     })
  //     //   } else {
  //     //     const password = data.password;
  //     //     const isMatch = bcrypt.compareSync(passwordFromJSON, password);
  //     //     if (isMatch) {
  //     //       // password matched
  //     //       response.json({
  //     //         status: 'success',
  //     //         accessToken: jwt.sign({
  //     //           username: username
  //     //         }, 'secret_key')
  //     //       })
  //     //     } else {
  //     //       response.json({
  //     //         status: 'fail',
  //     //         message: 'user not authenticated'
  //     //       })
  //     //     }
  //     //   }
        
  //     // })
  //    }catch(error){
  //      console.log(error)
  // }}
  
//   async function getUsers(request, response) {
//     try{
//     const data = await dbClient.table('users').select('username','password')
//           response.json({
//           status: 'success',
//           data: data
       
//       })
//     } catch(error){
      
//       response.json({
//         status: 'failed',
//         message : error
     
//     })
  
//     }
//   }
  
//   async function getUsername(request,response){
    
//     try{
//       const user = request.params.username;
      
//       const data = await dbClient.table('users').select('username','password').where("username",user);
//       if(data==null){
//         response.json({
//           status: 'failed',
//           data: data,
//         message : "No user found"
       
//       })
//       }else{
//       response.json({
//         status: 'success',
//         data: data
     
//     })}
//   } catch(error){
//     console.log(error)
    
//     response.json({
  
//       status: 'failed22',
//       message : error
   
//   })
  
//   }
  
//     }
    module.exports = {
        register
      }