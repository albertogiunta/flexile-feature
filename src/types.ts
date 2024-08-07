export type ExternalLink = {
  name: string;
  url: string;
  icon: string;
};

export type Company = {
  name: string;
  url: string;
  verified: boolean;
  earnings: string;
  duration: string;
  features: string[];
};

export type Service = {
  name: string;
  price: number;
  description: string;
  timesPerformed: number;
  icon: string;
  highlighted: boolean;
};

export type FreelancerData = {
  name: string;
  title: string;
  bio: string;
  totalTime: string;
  totalRevenue: string;
  totalClients: number;
  totalFlexileClients: number;
  services: Service[];
  companies: Company[];
  externalLinks: ExternalLink[];
};

export type DataType = {
  [key: string]: FreelancerData;
};
