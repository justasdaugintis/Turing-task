import { Box, List, Typography } from "@mui/material";
import { Meeting, Review } from "../types/events";
import { addDays, format } from "date-fns";
import { getRelativeDay, groupEvents } from "../utils/helpers";

import EventRow from "./EventRow";
import React from "react";
import styled from "@emotion/styled";

interface EventsListProps {
  eventsData: (Meeting | Review)[];
  handleEventClick: (event: Meeting | Review) => void;
}

const EventsList: React.FC<EventsListProps> = ({
  eventsData,
  handleEventClick,
}) => {
  const { overdue, today, tomorrow } = groupEvents(eventsData);

  const renderNoEventsMessage = (message: string) => (
    <NoEventsMessage>
      {message}{" "}
      <span role="img" aria-label="party popper">
        🎉
      </span>
    </NoEventsMessage>
  );

  return (
    <Container>
      <StyledTitle align="center">My schedule</StyledTitle>

      <Section>
        <SectionTitle variant="h5">Overdue</SectionTitle>
        <StyledList>
          {overdue.length > 0
            ? overdue.map((item, index) => (
                <EventRow
                  key={index}
                  event={item}
                  isOverdue={true}
                  handleEventClick={handleEventClick}
                />
              ))
            : renderNoEventsMessage("Nothing overdue.")}
        </StyledList>
      </Section>

      <Section>
        <SectionTitle variant="h5">
          {getRelativeDay(new Date())}, {format(new Date(), "MM-dd")}
        </SectionTitle>
        <StyledList>
          {today.length > 0
            ? today.map((item, index) => (
                <EventRow
                  key={index}
                  event={item}
                  isToday={true}
                  handleEventClick={handleEventClick}
                />
              ))
            : renderNoEventsMessage("No events today.")}
        </StyledList>
      </Section>

      <Section>
        <SectionTitle variant="h5">
          {getRelativeDay(addDays(new Date(), 1))},{" "}
          {format(addDays(new Date(), 1), "MM-dd")}
        </SectionTitle>
        <StyledList>
          {tomorrow.length > 0
            ? tomorrow.map((item, index) => (
                <EventRow
                  key={index}
                  event={item}
                  handleEventClick={handleEventClick}
                />
              ))
            : renderNoEventsMessage("No events tomorrow.")}
        </StyledList>
      </Section>
    </Container>
  );
};

export default EventsList;

// Styled Components
const Container = styled(Box)`
  border-radius: 5px;
  background-color: #2e3038;
  padding: 10px;
  margin: 20px;
`;

const StyledTitle = styled(Typography)`
  color: #e0e0e1;
  text-align: center;
  font-size: 18px;
`;

const Section = styled(Box)`
  padding: 10px;
`;

const SectionTitle = styled(Typography)`
  color: #7a7c85;
  font-size: 13px;
`;

const StyledList = styled(List)`
  margin-top: 10px;
`;

const NoEventsMessage = styled(Typography)`
  color: #7a7c85;
  font-size: 13px;
  text-align: center;
  margin-top: 20px;
`;
