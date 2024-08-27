// backend/insertData.js

import mongoose from 'mongoose';
import { User } from '../models/user.models.js'
import { DB_NAME } from '../constants.js'

// const MONGODB_URI = "Entire Your String"

// Connect to MongoDB
console.log(process.env.MONGODB_URI)
mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Function to insert data
const insertData = async (dataArray) => {
    try {
        await User.insertMany(dataArray);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Sample data to insert
//importing file and uploading the data in mongodb

const entry = [{ "id": 1, "first_name": "Anet", "last_name": "Doe", "email": "adoe0@comcast.net", "gender": "Female", "avatar": "https://robohash.org/sintessequaerat.png?size=50x50&set=set1", "domain": "Sales", "available": false },
{ "id": 2, "first_name": "Honoria", "last_name": "Caughte", "email": "hcaughte1@google.com.br", "gender": "Female", "avatar": "https://robohash.org/temporibusporrolaboriosam.png?size=50x50&set=set1", "domain": "Finance", "available": true },
{ "id": 3, "first_name": "Wiley", "last_name": "Boarder", "email": "wboarder2@xing.com", "gender": "Male", "avatar": "https://robohash.org/laboriosamdolorepossimus.png?size=50x50&set=set1", "domain": "Marketing", "available": false },
{ "id": 4, "first_name": "Brett", "last_name": "Ivetts", "email": "bivetts3@netlog.com", "gender": "Agender", "avatar": "https://robohash.org/ullamsuntet.png?size=50x50&set=set1", "domain": "Finance", "available": true },
{ "id": 5, "first_name": "Horst", "last_name": "Grastye", "email": "hgrastye4@dmoz.org", "gender": "Male", "avatar": "https://robohash.org/utquirepudiandae.png?size=50x50&set=set1", "domain": "Finance", "available": false },
{ "id": 6, "first_name": "Monique", "last_name": "Wilbud", "email": "mwilbud5@state.gov", "gender": "Female", "avatar": "https://robohash.org/maximequiomnis.png?size=50x50&set=set1", "domain": "IT", "available": true },
{ "id": 7, "first_name": "Kalindi", "last_name": "Vinson", "email": "kvinson6@g.co", "gender": "Female", "avatar": "https://robohash.org/occaecatinihilquos.png?size=50x50&set=set1", "domain": "Management", "available": true },
{ "id": 8, "first_name": "Janos", "last_name": "Le Noire", "email": "jlenoire7@sakura.ne.jp", "gender": "Male", "avatar": "https://robohash.org/praesentiumquasicorporis.png?size=50x50&set=set1", "domain": "Management", "available": true },
{ "id": 9, "first_name": "Corella", "last_name": "Coniff", "email": "cconiff8@guardian.co.uk", "gender": "Bigender", "avatar": "https://robohash.org/nihilexcepturiomnis.png?size=50x50&set=set1", "domain": "UI Designing", "available": false },
{ "id": 10, "first_name": "Cecilia", "last_name": "Waldocke", "email": "cwaldocke9@gmpg.org", "gender": "Female", "avatar": "https://robohash.org/commodiestvoluptatem.png?size=50x50&set=set1", "domain": "Management", "available": true },
{ "id": 11, "first_name": "Suellen", "last_name": "Bretton", "email": "sbrettona@mapquest.com", "gender": "Female", "avatar": "https://robohash.org/cupiditatemaioresaut.png?size=50x50&set=set1", "domain": "Sales", "available": false },
{ "id": 12, "first_name": "Deloris", "last_name": "Evered", "email": "deveredb@ovh.net", "gender": "Female", "avatar": "https://robohash.org/blanditiiscumqueimpedit.png?size=50x50&set=set1", "domain": "UI Designing", "available": false },
{ "id": 13, "first_name": "Candice", "last_name": "Harbar", "email": "charbarc@home.pl", "gender": "Female", "avatar": "https://robohash.org/autarchitectotenetur.png?size=50x50&set=set1", "domain": "Sales", "available": true },
{ "id": 14, "first_name": "John", "last_name": "Fine", "email": "jfined@facebook.com", "gender": "Male", "avatar": "https://robohash.org/etvoluptatemoccaecati.png?size=50x50&set=set1", "domain": "UI Designing", "available": true },
{ "id": 15, "first_name": "Gonzalo", "last_name": "Tilliard", "email": "gtilliarde@marketwatch.com", "gender": "Agender", "avatar": "https://robohash.org/voluptatemfacilisodit.png?size=50x50&set=set1", "domain": "Sales", "available": false },
{ "id": 16, "first_name": "Hertha", "last_name": "Sterrick", "email": "hsterrickf@nationalgeographic.com", "gender": "Female", "avatar": "https://robohash.org/rerumoptiorepudiandae.png?size=50x50&set=set1", "domain": "Marketing", "available": true },
{ "id": 17, "first_name": "Benjamin", "last_name": "Challiner", "email": "bchallinerg@nydailynews.com", "gender": "Male", "avatar": "https://robohash.org/architectoomnisquia.png?size=50x50&set=set1", "domain": "Marketing", "available": false },
{ "id": 18, "first_name": "Lockwood", "last_name": "Wermerling", "email": "lwermerlingh@imgur.com", "gender": "Male", "avatar": "https://robohash.org/cumquenoncommodi.png?size=50x50&set=set1", "domain": "Sales", "available": false },
{ "id": 19, "first_name": "Baillie", "last_name": "Mulqueeny", "email": "bmulqueenyi@wikispaces.com", "gender": "Male", "avatar": "https://robohash.org/dolorumvelitquam.png?size=50x50&set=set1", "domain": "Business Development", "available": false },
{ "id": 20, "first_name": "Quintus", "last_name": "Gibbieson", "email": "qgibbiesonj@symantec.com", "gender": "Male", "avatar": "https://robohash.org/delectusconsectetursed.png?size=50x50&set=set1", "domain": "Management", "available": true },
{ "id": 21, "first_name": "Heinrik", "last_name": "Brockbank", "email": "hbrockbankk@plala.or.jp", "gender": "Male", "avatar": "https://robohash.org/eumdelectusducimus.png?size=50x50&set=set1", "domain": "IT", "available": false },
{ "id": 22, "first_name": "Klara", "last_name": "Lorking", "email": "klorkingl@kickstarter.com", "gender": "Female", "avatar": "https://robohash.org/veniamenimlaborum.png?size=50x50&set=set1", "domain": "IT", "available": false },
{ "id": 23, "first_name": "Lynelle", "last_name": "Mawne", "email": "lmawnem@nsw.gov.au", "gender": "Female", "avatar": "https://robohash.org/totamsuntrem.png?size=50x50&set=set1", "domain": "Sales", "available": false },
{ "id": 24, "first_name": "Colver", "last_name": "Mc Harg", "email": "cmchargn@google.co.uk", "gender": "Male", "avatar": "https://robohash.org/voluptasipsaquam.png?size=50x50&set=set1", "domain": "UI Designing", "available": true },
{ "id": 25, "first_name": "Tristam", "last_name": "Morsley", "email": "tmorsleyo@engadget.com", "gender": "Male", "avatar": "https://robohash.org/repellendusetvoluptatibus.png?size=50x50&set=set1", "domain": "IT", "available": false },
{ "id": 26, "first_name": "Barnabe", "last_name": "Cathrall", "email": "bcathrallp@photobucket.com", "gender": "Polygender", "avatar": "https://robohash.org/atnonqui.png?size=50x50&set=set1", "domain": "Sales", "available": false },
{ "id": 27, "first_name": "Shauna", "last_name": "Routham", "email": "srouthamq@shutterfly.com", "gender": "Female", "avatar": "https://robohash.org/doloresolutasuscipit.png?size=50x50&set=set1", "domain": "IT", "available": false },
{ "id": 28, "first_name": "Selena", "last_name": "Mathewson", "email": "smathewsonr@auda.org.au", "gender": "Female", "avatar": "https://robohash.org/recusandaevelut.png?size=50x50&set=set1", "domain": "Finance", "available": true },
{ "id": 29, "first_name": "Genny", "last_name": "Kane", "email": "gkanes@cocolog-nifty.com", "gender": "Female", "avatar": "https://robohash.org/exteneturrepudiandae.png?size=50x50&set=set1", "domain": "UI Designing", "available": true },
{ "id": 30, "first_name": "Iver", "last_name": "Dansie", "email": "idansiet@timesonline.co.uk", "gender": "Male", "avatar": "https://robohash.org/iddoloremquequidem.png?size=50x50&set=set1", "domain": "Marketing", "available": false },]

insertData(entry)