export interface Event {
  id: number;
  summary: string;
  url: string;
  start: Date;
  end: Date;
}

export interface Meeting extends Event {
  category: MeetingCategory;
}

export interface Review extends Event {
  state: ReviewState;
}

export enum MeetingCategory {
  MEETING = "meeting",
  OPEN_SESSION = "open_session",
}

export enum ReviewState {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}
