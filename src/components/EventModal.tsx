import { Meeting, Review } from "../types/events";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Close from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import React from "react";
import Typography from "@mui/material/Typography";
import { getRelativeDay } from "../utils/helpers";
import { styled } from "@mui/system";

interface EventModalProps {
  open: boolean;
  handleClose: () => void;
  event?: Meeting | Review;
}

const EventModal: React.FC<EventModalProps> = ({
  open,
  handleClose,
  event,
}) => {
  if (!event) return null;

  const eventStartDate = new Date(event.start);
  const eventEndDate = new Date(event.end);
  const now = new Date();
  const disableJoinButton = differenceInMinutes(eventStartDate, now) > 15;

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBox>
        <CloseButton onClick={handleClose}>
          <Close />
        </CloseButton>
        <Title variant="h6">{event.summary}</Title>
        <TextSecondary variant="body1">
          {getRelativeDay(eventStartDate)} {format(eventStartDate, "HH:mm")} -{" "}
          {format(eventEndDate, "HH:mm")}
        </TextSecondary>
        <Box sx={{ marginBottom: "20px" }} />
        {getEventStatusText(eventStartDate, eventEndDate, now)}
        {now <= eventEndDate && (
          <JoinButton
            variant="contained"
            fullWidth
            onClick={() => window.open(event.url, "_blank")}
            disabled={disableJoinButton}
          >
            Join meeting
          </JoinButton>
        )}
      </ModalBox>
    </Modal>
  );
};

export default EventModal;

// Helper functions
const getStartsInText = (start: Date, now: Date) => {
  const minutes = differenceInMinutes(start, now);
  const hours = differenceInHours(start, now);
  const days = differenceInDays(start, now);

  if (minutes > 0) {
    if (minutes < 60) {
      return `Starts in: ${minutes} min`;
    } else if (hours < 24) {
      return `Starts in: ${hours} hr${hours > 1 ? "s" : ""}`;
    } else {
      return `Starts in: ${days} day${days > 1 ? "s" : ""}`;
    }
  }
  return null;
};

const getEventStatusText = (start: Date, end: Date, now: Date) => {
  if (now >= start && now <= end) {
    return (
      <TextSecondary variant="body2" style={{ color: "orange" }}>
        Event is happening! Quick, join, join, join!
      </TextSecondary>
    );
  } else if (now > end) {
    return (
      <TextSecondary variant="body2">Event already happened</TextSecondary>
    );
  } else {
    return (
      <TextSecondary variant="body2">
        {getStartsInText(start, now)}
      </TextSecondary>
    );
  }
};

// Styled Components
const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background-color: #202128;
  box-shadow: 24;
  padding: 20px;
  border-radius: 5px;
  @media (max-width: 767px) {
    width: 361px;
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  color: #e0e0e1;
`;

const Title = styled(Typography)`
  color: #e0e0e1;
`;

const TextSecondary = styled(Typography)`
  color: #7c7d83;
`;

const JoinButton = styled(Button)`
  margin-top: 16px;
  background-color: #673aff;
  text-transform: none;
  color: #e0e0e1;
  &:hover {
    background-color: #673aff;
  }
  &:disabled {
    color: #e0e0e1;
    background-color: #673aff;
    opacity: 40%;
  }
`;
