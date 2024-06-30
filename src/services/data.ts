import { Meeting, MeetingCategory, Review, ReviewState } from "../types/events";

export const mockEvents: Meeting[] = [
  {
    id: 1,
    summary: "Team Meeting",
    url: "https://zoom.us/j/123456789",
    category: MeetingCategory.MEETING,
    start: new Date("2024-06-30T20:00:00"), // Yesterday
    end: new Date("2024-06-30T24:00:00"),
  },
  {
    id: 2,
    summary: "Client Presentation",
    url: "https://zoom.us/j/123456789",
    category: MeetingCategory.MEETING,
    start: new Date("2024-07-01T11:00:00"), // Today
    end: new Date("2024-07-01T12:00:00"),
  },
  {
    id: 3,
    summary: "Team Sync",
    url: "https://zoom.us/j/123456789",
    category: MeetingCategory.MEETING,
    start: new Date("2024-07-02T09:00:00"), // Tomorrow
    end: new Date("2024-07-02T10:00:00"),
  },
  {
    id: 4,
    summary: "Project Update",
    url: "https://zoom.us/j/123456789",
    category: MeetingCategory.OPEN_SESSION,
    start: new Date("2024-07-01T18:00:00"), // Today
    end: new Date("2024-07-01T22:00:00"),
  },
  {
    id: 5,
    summary: "Weekly Review",
    url: "https://zoom.us/j/123456789",
    category: MeetingCategory.OPEN_SESSION,
    start: new Date("2024-07-02T15:00:00"), // Tomorrow
    end: new Date("2024-07-02T16:00:00"),
  },
];

export const mockReviews: Review[] = [
  {
    id: 7,
    summary: "Design Review",
    url: "https://zoom.us/j/987654321",
    state: ReviewState.PENDING,
    start: new Date("2024-07-01T10:00:00"), // Today
    end: new Date("2024-07-01T11:00:00"),
  },
  {
    id: 8,
    summary: "Sprint Retrospective",
    url: "https://zoom.us/j/987654321",
    state: ReviewState.COMPLETED,
    start: new Date("2024-07-01T18:29:00"), // Today
    end: new Date("2024-07-01T19:00:00"),
  },
  {
    id: 9,
    summary: "Bug Bash",
    url: "https://zoom.us/j/987654321",
    state: ReviewState.IN_PROGRESS,
    start: new Date("2024-07-02T11:00:00"), // Tomorrow
    end: new Date("2024-07-02T12:00:00"),
  },
  {
    id: 10,
    summary: "Performance Review",
    url: "https://zoom.us/j/987654321",
    state: ReviewState.IN_PROGRESS,
    start: new Date("2024-07-02T14:00:00"), // Tomorrow
    end: new Date("2024-07-02T15:00:00"),
  },
];
