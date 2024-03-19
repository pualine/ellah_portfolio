import { Router } from "express";
import db from "../db/connection";
import { ObjectId } from "mongodb";
import multer from "multer";

const router = Router();
const BLOG_COLLECTION = db.collection('Blog');

// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB file size limit
  },
  fileFilter: fileFilter
});

// ENDPOINT FOR GETTING ALL BLOGS
router.get('/', async (req, res) => {
  try {
    const result = await BLOG_COLLECTION.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ENDPOINT FOR GETTING A SINGLE BLOG
router.get('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const singleResult = await BLOG_COLLECTION.findOne(query);
    if (!singleResult) {
      res.status(404).send('RESULT NOT FOUND');
    } else {
      res.status(200).send(singleResult);
    }
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ENDPOINT FOR CREATING A NEW BLOG WITH IMAGE UPLOAD
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const newBlog = {
      blog: req.body.blog,
      date: req.body.date,
      event: req.body.event,
      image: req.file.path // Save the file path in the database
    };
    const result = await BLOG_COLLECTION.insertOne(newBlog);
    res.status(201).send(result);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ENDPOINT FOR UPDATING A BLOG
router.patch('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const update = {
      $set: {
        blog: req.body.blog,
        date: req.body.date,
        event: req.body.event
      }
    };
    const result = await BLOG_COLLECTION.updateOne(query, update);
    res.status(200).send(result);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ENDPOINT FOR DELETING A BLOG
router.delete('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const result = await BLOG_COLLECTION.deleteOne(query);
    res.status(200).send(result);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;