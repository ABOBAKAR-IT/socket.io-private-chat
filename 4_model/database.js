const mongoose=require('mongoose')
const mongodb='mongodb+srv://abobakar786:rana1234@cluster0.ojybe.mongodb.net/chat?retryWrites=true&w=majority'
mongoose.connect(mongodb,{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>console.log('mongodb is connected'))
.catch(err=>console.log(err));
