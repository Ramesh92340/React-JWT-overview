class profileController{

async getProfile (req, res)  {

   
        const user = req.body;
        try {
        const newUser = await  userModel.createUser(user);
        res.status(200).json({ status:1 ,message: 'User Created Suuucccessfully!!!!' ,newUser});
        } catch (error) {
        res.status(500).json({ status:0, message: 'Internal Server Error' });
        }
        } 

}
module.exports =new profileController();
