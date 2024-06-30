import { Alert, AppBar, Box, CircularProgress, Toolbar } from "@mui/material";
import { Meeting, Review } from "./types/events";
import React, { useState } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchEvents, fetchReviews } from "./services/api";

import EventModal from "./components/EventModal";
import EventsList from "./components/EventsList";
import HeaderContent from "./components/Header";
import MainPage from "./components/MainPage";
import { isWithinInterval } from "date-fns";
import styled from "@emotion/styled";
import { useInterval } from "./utils/useInterval";

const App: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Meeting | Review>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const {
    data: events = [],
    error,
    isLoading,
    refetch,
  }: UseQueryResult<(Meeting | Review)[], Error> = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const [eventsData, reviewsData] = await Promise.all([
        fetchEvents(),
        fetchReviews(),
      ]);
      return [...eventsData, ...reviewsData];
    },
  });

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEventClick = (event: Meeting | Review) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  // Use the useInterval hook to refetch data every 5 minutes (300000 ms)
  useInterval(refetch, 5 * 60 * 1000);

  const liveEvent = (events as (Meeting | Review)[]).find((event) =>
    isWithinInterval(new Date(), { start: event.start, end: event.end })
  );

  return (
    <StyledLayout>
      <StyledHeader position="static">
        <Toolbar>
          <HeaderContent event={liveEvent} />
        </Toolbar>
      </StyledHeader>
      <StyledContent>
        {isLoading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <>
            <FixedWidth>
              <EventsList
                eventsData={events}
                handleEventClick={handleEventClick}
              />
            </FixedWidth>
            <FlexibleWidth>
              <MainPage />
            </FlexibleWidth>
          </>
        )}
      </StyledContent>
      <EventModal
        open={modalOpen}
        handleClose={handleCloseModal}
        event={selectedEvent}
      />
      {error && (
        <ErrorContainer>
          <Alert severity="error">Error fetching events: {error.message}</Alert>
        </ErrorContainer>
      )}
    </StyledLayout>
  );
};

export default App;

const StyledLayout = styled(Box)`
  min-height: 100vh;
  background-color: #282828;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const StyledHeader = styled(AppBar)`
  background-color: #282828;
  border-bottom: 1px solid #333;
`;

const StyledContent = styled(Box)`
  display: grid;
  grid-template-columns: 432px 1fr;
  background-color: #282828;
  height: 100%;
  gap: 1px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FixedWidth = styled(Box)`
  border-right: 1px solid #333;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid #333;
  }
`;

const FlexibleWidth = styled(Box)`
  @media (max-width: 768px) {
    grid-column: 1 / span 1;
  }
`;

const LoadingContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const ErrorContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
