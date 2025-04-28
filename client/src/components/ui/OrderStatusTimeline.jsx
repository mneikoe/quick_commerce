import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Typography } from "@mui/material";
import Constants from "../../constants/Constants";

export default function OrderStatusTimeline({ currentStatus }) {
  // Getting the index of the current status
  const getStatusIndex = (status) =>
    Object.values(Constants.ORDER_STATUS).indexOf(status.toLowerCase()); // Ensure uppercase comparison
  console.log(getStatusIndex(currentStatus));
  const statusSteps = Object.values(Constants.ORDER_STATUS); // Get statuses as an array
  console.log(statusSteps);
  return (
    <Timeline sx={{ p: 0 }}>
      {statusSteps.map((status, index) => {
        const isActive = index <= getStatusIndex(currentStatus); // Determine if the status is active
        console.log(isActive);
        return (
          <TimelineItem key={status}>
            <TimelineSeparator>
              <TimelineDot color={isActive ? "primary" : "secondary"} />
              {index !== statusSteps.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography
                color={isActive ? "primary.main" : "text.secondary"}
                fontWeight={isActive ? "bold" : "normal"}
              >
                {status}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
