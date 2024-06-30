import { Box, Button } from "@mui/material";
import { Meeting, Review } from "../types/events";

import React from "react";
import { format } from "date-fns";
import styled from "@emotion/styled";

interface HeaderContentProps {
  event?: Meeting | Review;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ event }) => {
  if (!event) return null;

  const handleEventClick = () => {
    window.open(event.url);
  };

  return (
    <HeaderContainer>
      <StyledButton onClick={handleEventClick} variant="contained">
        {event?.summary} at {format(event?.start, "HH:mm")}
      </StyledButton>
    </HeaderContainer>
  );
};

export default HeaderContent;

// Styled Components
const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const StyledButton = styled(Button)`
  float: right;
  background-color: #673aff;
  text-transform: none;
  color: #eaeaeb;
  &:hover {
    background-color: #673aff;
  }
`;
