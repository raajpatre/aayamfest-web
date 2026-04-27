import { Model, Schema, model, models } from "mongoose";

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ["Robotics", "Hackathon", "CP", "Non-Tech"]
    },
    description: {
      type: String,
      required: true
    },
    prizePool: {
      type: String,
      required: true
    },
    teamSize: {
      type: String,
      required: true
    },
    posterImage: {
      type: String,
      required: true
    },
    registrationLink: {
      type: String,
      required: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Event = (models.Event as Model<unknown>) || model("Event", EventSchema);

export default Event;
