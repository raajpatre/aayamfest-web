import { Model, Schema, model, models } from "mongoose";

const SponsorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ["Title", "Concert", "Associate", "In-Kind"]
    },
    logo: {
      type: String,
      required: true
    },
    websiteLink: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Sponsor =
  (models.Sponsor as Model<unknown>) || model("Sponsor", SponsorSchema);

export default Sponsor;
