import { Box, ListItem, Typography } from "@mui/material";
import { Meeting, Review } from "../types/events";
import React, { useMemo } from "react";
import { format, isWithinInterval } from "date-fns";

import styled from "@emotion/styled";

interface EventRowProps {
  event: Meeting | Review;
  isOverdue?: boolean;
  isToday?: boolean;
  handleEventClick: (event: Meeting | Review) => void;
}

const EventRow: React.FC<EventRowProps> = ({
  event,
  isOverdue,
  isToday,
  handleEventClick,
}) => {
  const isLive = isWithinInterval(new Date(), {
    start: event.start,
    end: event.end,
  });

  const isPast = event.end < new Date();

  const { stateColor, categoryName } = useMemo(() => {
    let stateColor = "";
    let categoryName = "";

    if ("category" in event) {
      stateColor = event.category === "open_session" ? "#7A7C85" : "#B08B69";
      categoryName = event.category === "open_session" ? "SESSION" : "MEETING";
    }

    if ("state" in event) {
      stateColor = "#808CF4";
      categoryName = "CORRECTION";
    }

    if (isLive) {
      stateColor = "#E0E0E1";
    }

    return { stateColor, categoryName };
  }, [event, isLive]);

  const timeText = useMemo(() => {
    return `${format(event.start, "HH:mm")} - ${format(event.end, "HH:mm")}`;
  }, [event.start, event.end]);

  const renderRightSection = () => (
    <RightSection>
      {isOverdue ? (
        <OverdueText>Overdue</OverdueText>
      ) : (
        <TimeInfo>
          {isLive && <LiveText>Live</LiveText>}
          <TimeText>
            <StartTime
              className={isPast && isToday ? "past" : ""}
              isPast={isPast}
            >
              {timeText.split(" - ")[0]}
            </StartTime>
            <EndTime className={isLive ? "live" : ""}>
              {timeText.split(" - ")[1]}
            </EndTime>
          </TimeText>
        </TimeInfo>
      )}
    </RightSection>
  );

  return (
    <StyledListItem
      className={isPast && isToday ? "faded" : ""}
      isLive={isLive}
      onClick={() => handleEventClick(event)}
    >
      <Box>
        <EventTitle variant="body1">{event.summary}</EventTitle>
        <EventCategory style={{ color: stateColor }}>
          {categoryName}
        </EventCategory>
      </Box>
      {renderRightSection()}
    </StyledListItem>
  );
};

export default EventRow;

// Styled Components
const StyledListItem = styled(ListItem)<{ isLive: boolean | undefined }>`
  background: ${({ isLive }) => (isLive ? "#D790538C" : "#333")};
  padding: 6px 12px;
  border-radius: 4px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  cursor: pointer;
  &.faded {
    opacity: 40%;
  }
  &:hover {
    background: ${({ isLive }) => (isLive ? "#D790538C" : "#41424B")};
    opacity: 100%;
  }
`;

const EventTitle = styled(Typography)`
  color: #e0e0e1;
  font-size: 14px;
  text-overflow: ellipsis;
`;

const EventCategory = styled(Typography)`
  font-size: 11px;
`;

const RightSection = styled(Box)`
  text-align: right;
`;

const OverdueText = styled(Typography)`
  color: #ca4365;
  font-size: 13px;
`;

const TimeInfo = styled(Box)`
  display: flex;
  align-items: center;
`;

const LiveText = styled(Typography)`
  color: #d79053;
  font-size: 13px;
  margin-right: 15px;
`;

const TimeText = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const StartTime = styled(Typography)<{ isPast: boolean | undefined }>`
  font-size: 13px;
  color: #e0e0e1;
  &.past {
    color: #7a7c85;
  }
  &:hover {
    color: ${({ isPast }) => (isPast ? "#b0b0b0" : "#e0e0e1")};
  }
`;

const EndTime = styled(Typography)`
  font-size: 13px;
  color: #7a7c85;
  &.live {
    color: #e0e0e1;
  }
`;
