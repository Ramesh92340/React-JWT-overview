const express = require ('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app= express();
const PORT  = process.env.PORT || 3008;

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/profile',profileRoutes);

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);

});
