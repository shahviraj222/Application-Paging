import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'
import { User } from './models/user.models.js'
dotenv.config()
const port = process.env.PORT || 8000
connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.log("Middleware Error:", err)
        })

        //fetching the users data    
        app.get('/api/user', async (req, res) => {
            try {
                const users = await User.find();
                res.json(users);
            } catch (err) {
                console.error('Error fetching users:', err);
                res.status(500).send('Internal Server Error');
            }
        });

        // Define the route to delete a user by query parameter
        app.delete('/api/delete-user', async (req, res) => {
            const { id } = req.query; // Expecting an id query parameter
            try {
                if (!id) {
                    return res.status(400).json({ message: 'ID query parameter is required' });
                }
                const result = await User.findByIdAndDelete(id);
                if (result) {
                    res.json({ message: 'User deleted successfully', user: result });
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            } catch (err) {
                console.error('Error deleting user:', err);
                res.status(500).send('Internal Server Error');
            }
        });

        app.put('/api/update-user', async (req, res) => {
            const { id } = req.query;
            const updateData = req.body;
            console.log("Inside the PUT API ", updateData, id)
            try {
                if (!id) {
                    return res.status(400).json({ message: 'ID query parameter is required' });
                }
                const result = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
                if (result) {
                    res.json({ message: 'User updated successfully', user: result })
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            } catch (error) {
                console.error('Error updating user:', err);
                res.status(500).send('Internal Server Error');
            }
        });


        app.listen(port, () => {
            console.log("App Is Runing On Port Number:", port)
        })
    })
    .catch((error) => {
        console.log("Error: ", error)
    })