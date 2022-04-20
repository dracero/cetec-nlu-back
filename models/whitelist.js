import mongoose from 'mongoose';

const whitelistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  surname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
});

const whitelist = mongoose.model("whitelist", whitelistSchema);

export default whitelist;
