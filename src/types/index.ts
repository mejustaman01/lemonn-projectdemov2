export interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  upcomingSession: string | null;
}

export interface Goal {
  id: string;
  domain: string;
  goal: string;
  baseline: string;
  criterion: string;
  sessionsPerWeek: number;
  dataMethod: string;
  progress: number;
  status: string;
  reviewDate: string;
}

export interface Activity {
  id: string;
  date: string;
  time: string;
  title: string;
  domain: string;
  type: string;
}