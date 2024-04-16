const express = require('express')
const router = express.Router()
const gitController = require('../controllers/gitController')
router.get('/save-user/:username',gitController.getOrSaveUser)
router.get('/find-friends/:username',gitController.findMutualFollowers)
router.get('/search-users',gitController.searchByParameters)
router.delete('/delete-user/:username',gitController.softDeleted)
router.patch('/update-user/:username',gitController.updateUser)
router.get('/getallusers',gitController.getListOfUsers)

//  '/' Route
router.get('/',(req,res)=>{
    res.send("welcome to githubExplorer")
})


module.exports = router