import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";



const router = Router();
const SKILLS_COLLECTION = db.collection('Skills');
// ENDPOINT FOR GETTING LIST OF SKILLS
router.get('/', async(req, res) =>{
    let result = await SKILLS_COLLECTION.find({}).toArray();
    res.send(result).status(200);
})

// ENDPOINT FOR SINGLE ITEM BY ID
router.get('/:id', async(req, res) =>{
    let query = {_id: new ObjectId(req.params.id)}
    let singleResult = await SKILLS_COLLECTION.findOne(query)

    if(!singleResult) res.send("NOT FOUND").status(404)
    else res.send(singleResult).status(200)
})

// ENPOINT FOR ADD/POSTING A SINGLE SKILLS
router.post('/', async(req, res) =>{
    try{
        let newSkills ={
            skill: req.body.skill,
            proficiency:req.body.proficiency
        }

        let result = await SKILLS_COLLECTION.insertOne(newSkills)
        res.send(result).status(201);
    } catch (error){
        console.log('SORRY TRY AGAIN', error)
    }
});

// ENDPOINT FOR UPDATE
router.patch('/:id', async(req, res) => {
    try{
        const query = {_id: new ObjectId(req.params.id)}
        const updates = {
            $set:{
            skill: req.body.skill,
            proficiency:req.body.proficiency
            },
        };
        let result = await SKILLS_COLLECTION.updateOne(query, updates);
        res.send(result).status(200)
    } catch(error){
        console.log('SORRY TRY AGAIN', error)
    }
})


// DELETE
router.delete('/:id',async(req, res) =>{
    
    try{
        const query = {_id: new ObjectId(req.params.id)}
        let result = await SKILLS_COLLECTION.deleteOne(query);
        res.send(result).status(200);

    }catch(error){
        console.log('SORRY TRY AGAIN', error);
    }
});
export default router;