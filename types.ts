export interface Show {
  name: string;
  type: 'Major' | 'Micro';
  duration: string;
  description: string;
  mustSee: boolean;
  location?: string;
}

export interface ScheduleEvent {
  time: string;
  activity: string;
  description: string;
  isShow: boolean;
  showName?: string;
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  events: ScheduleEvent[];
}

export interface TripData {
  analysis: {
    whyPopular: string;
    culturalSignificance: string;
  };
  shows: Show[];
  itinerary: DayPlan[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}