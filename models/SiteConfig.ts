import { Model, Schema, model, models } from "mongoose";

const SiteConfigSchema = new Schema(
  {
    festName: {
      type: String,
      required: true,
      default: "AAYAM Tech Fest"
    },
    festDate: {
      type: String,
      default: ""
    },
    totalPrizePool: {
      type: String,
      default: ""
    },
    contactDetails: {
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      address: { type: String, default: "" },
      sponsorFormLink: { type: String, default: "" }
    },
    socialLinks: {
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      youtube: { type: String, default: "" }
    }
  },
  {
    timestamps: true
  }
);

const SiteConfig =
  (models.SiteConfig as Model<unknown>) ||
  model("SiteConfig", SiteConfigSchema);

export default SiteConfig;
