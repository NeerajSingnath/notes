import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // user info
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    // credit management
    credits: {
      type: Number,
      default: 50,
      min: 0,
    },
    // subscription
    isCreditAvailable: {
      type: Boolean,
      default: true,
    },
    // notes
    notes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Notes',
      default: [],
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;
