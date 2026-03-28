export type EventCategory = "Robotics" | "Hackathon" | "CP" | "Non-Tech";
export type SponsorCategory = "Title" | "Concert" | "Associate" | "In-Kind";

export type EventRecord = {
  _id: string;
  title: string;
  category: EventCategory;
  description: string;
  prizePool: string;
  teamSize: string;
  posterImage: string;
  registrationLink: string;
  isFeatured: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type SponsorRecord = {
  _id: string;
  name: string;
  category: SponsorCategory;
  logo: string;
  websiteLink: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SocialLinks = {
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
};

export type ContactDetails = {
  email?: string;
  phone?: string;
  address?: string;
  sponsorFormLink?: string;
};

export type SiteConfigRecord = {
  _id: string;
  festName: string;
  festDate: string;
  totalPrizePool: string;
  contactDetails: ContactDetails;
  socialLinks: SocialLinks;
  createdAt?: string;
  updatedAt?: string;
};

export type TeamMemberRecord = {
  _id: string;
  name: string;
  role: string;
  image: string;
  linkedin: string;
  createdAt?: string;
  updatedAt?: string;
};
