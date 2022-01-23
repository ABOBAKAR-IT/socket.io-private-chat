
const user = require('../4_model/user_model');
module.exports.add = async (body) => {
    try {
            const userdata= new user({
                username:body,
                 })
             let data=  await  userdata.save()
             return data
            
        } catch (error) {
            console.log(error);
        }
};

module.exports.update = async (body,name) => {
let d=await user.findOneAndUpdate({username:name},{$push: { sms: body } })

};

module.exports.find = async (body) => {
  let data=await  user.findOne({username:body})
   return data
};
// module.exports.findone = async (body) => {
//     user.find({id:req.body.id})
//     .then(data=>res.send(data))
//     .catch(err=>res.send(err));
// };
// module.exports.del = async (body) => {
  
// };