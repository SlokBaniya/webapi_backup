const knex = require('knex');
const dbConfig = require('./../knexfile');
const dbClient = knex(dbConfig);



async function register(data) {
    try{

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

    async function authenticate(username){
      try{
        return await dbClient.table('users').first('password').where('username',username);
      }catch(error){
        return error;
      }
    }
  
  async function details(username) {

    try{
     return await dbClient.table('users').select('fullname', 'username', 'password', 'address', 'contact', 'gender').where('username',username);
     
    } catch(error){
      
    //   response.json({
    //     status: 'failed',
    //     message : error
     
    // })
    return error;
  
    }
  }
  
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
        register,
        authenticate,
        details
      }