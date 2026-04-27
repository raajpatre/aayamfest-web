import { Model, Schema, model, models } from "mongoose";

const TeamMemberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true
    },
    linkedin: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const TeamMember =
  (models.TeamMember as Model<unknown>) ||
  model("TeamMember", TeamMemberSchema);

export default TeamMember;
