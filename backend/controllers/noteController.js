const e = require("express");
const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, category, content } = req.body;
  if (!title || !category || !content) {
    res.status(400);
    throw new Error(`Please Fill All the Fields!`);
  } else {
    const note = new Note({ user: req.user._id, title, category, content });
    const createdNote = await note.save();
    res.status(200);
    res.json(createdNote);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.status(200);
    res.json(note);
  } else {
    res.status(404);
    res.json({ message: "Note Not Found" });
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, category, content } = req.body;
  const note = await Note.findById(req.params.id);
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error(`You can't perform this action!`);
  }
  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;
    const updatedNote = await note.save();
    res.status(200);
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error(`Note not Found`);
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error(`You can't perform this action!`);
  }
  if (note) {
    await note.delete();
    res.status(200);
    res.json({ message: "Note Delted" });
  } else {
    res.status(404);
    throw new Error(`Note not Found`);
  }
});

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };
