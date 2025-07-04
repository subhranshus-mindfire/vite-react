export type JobStatus = "applied" | "interviewing" | "rejected" | "hired";
export type JobType = "onsite" | "remote" | "hybrid";

export interface Application {
  applicantName: string;
  id: string;
  companyName: string;
  jobRole: string;
  jobType: JobType;
  location: string;
  applicationDate: string;
  jobStatus: JobStatus;
  notes: string;
}

export interface ApplicationState {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
}

