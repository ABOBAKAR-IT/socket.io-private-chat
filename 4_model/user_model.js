
    const mongoose=require('mongoose');
    const userdata=mongoose.Schema;
    const User=new userdata({
       username:userdata.Types.String,
           sms:[{
               type:Object
           }]
    },{timestamps:true});
    const users=mongoose.model('userdata',User);
    module.exports=users;
                    