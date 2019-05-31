const cors = require('cors');


const uploadRouter = require('./routes/upload');


app.use('/upload', uploadRouter);   
app.use('*', cors());