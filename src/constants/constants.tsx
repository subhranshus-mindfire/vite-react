const jobRoles = [
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'Data Scientist',
  'UI/UX Designer',
  'Software Engineer',
  'SDE',
  'Associate Software Engineer'
] as const

type JobRole = typeof jobRoles[number];

export { jobRoles as JOB_ROLES };
export type { JobRole };
export const getJobRoles = (): string[] => [...jobRoles];


