export const STATUSES = ["Applied", "Interview", "Offer", "Rejected"] as const;

export type Status = (typeof STATUSES)[number];

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  dateApplied: string; // yyyy-mm-dd
  jobLink: string;
  status: Status;
}

export interface User {
  name: string;
  email: string;
}
