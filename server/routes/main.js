const express = require('express');
const router = express.Router();
const { listUser, createUser, editUser, deleteUser } = require('../controllers/user');
app.listen(port, (request, respond) => {
    console.log(`Our server is live on ${port}. Yay!`);
});
  

router.use(bodyParser.urlencoded({
    extended: true
}));
router.get('/list', listUser);
router.post('/create', createUser);
router.put('/edit/:id', editUser);
router.delete('/delete/:id', deleteUser);
module.exports = router;
