import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Typography, Box, Button, Paper } from "@mui/material";
// import Constants from "../../constants/Constants";
import Constants from "../../../constants/Constants";

export default function OrderStatusTimeline({
  currentStatus,
  timestamps,
  order,
  onCancel,
  onView,
}) {
  const getStatusIndex = (status) =>
    Object.values(Constants.ORDER_STATUS).indexOf(status?.toLowerCase());

  const statusSteps = Object.values(Constants.ORDER_STATUS);

  return (
    <Timeline position="center" sx={{ m: 0, p: 0 }}>
      {statusSteps.map((status, index) => {
        const isActive = index <= getStatusIndex(currentStatus);
        const rawDate =
          timestamps?.[status] ||
          (status === Constants.ORDER_STATUS.PENDING && order?.createdAt)
            ? new Date(timestamps?.[status] || order?.createdAt)
            : null;

        const formattedDate = rawDate
          ? rawDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          : null;

        const formattedTime = rawDate
          ? rawDate.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : null;
        return (
          <>
            <TimelineItem key={status}>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    backgroundColor: isActive ? "primary.main" : "grey.400",
                  }}
                />
                {index !== statusSteps.length - 1 && (
                  <TimelineConnector
                    sx={{
                      backgroundColor: isActive ? "primary.main" : "grey.300",
                    }}
                  />
                )}
              </TimelineSeparator>
              <TimelineContent sx={{ pb: 3, px: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 0.5,
                    width: "100%",
                  }}
                >
                  <Typography
                    fontWeight={isActive ? 600 : 400}
                    color={isActive ? "primary.main" : "text.secondary"}
                    textTransform="capitalize"
                  >
                    {status}
                  </Typography>

                  {formattedDate && (
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {formattedDate}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formattedTime}
                      </Typography>
                    </Box>
                  )}

                  {status === Constants.ORDER_STATUS.CANCELLED && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={onCancel}
                      sx={{ textTransform: "none", mt: 1 }}
                    >
                      Cancelled
                    </Button>
                  )}

                  {status === Constants.ORDER_STATUS.DELIVERED && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={onView}
                      sx={{ textTransform: "none", mt: 1 }}
                    >
                      View Order
                    </Button>
                  )}
                </Box>
              </TimelineContent>
            </TimelineItem>
          </>
        );
      })}
    </Timeline>
  );
}
