import React from "react";
import "./NextSteps.css";
import { Card, CardContent, Typography, Box } from "@mui/material";

const NextSteps = ({ events = [] }) => {
  const tasks = events.map((event) => {
    let message = "";

    if (event.type === "campaign_assigned") {
      message = `Campaign assigned to ${event.influencer.name.first} ${event.influencer.name.last} for ${event.product.title}`;
    } else if (event.type === "invitation") {
      message = `Invitation ${event.action} by ${event.email}`;
    } else {
      message = `${event.type} ${event.action}`;
    }

    return { message };
  });

  return (
    <Card className="next-steps-card shadow-sm rounded-4">
      <CardContent
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Typography
          variant="h6"
          className=" mb-3"
          sx={{ fontFamily: "Poppins", fontSize: "24px", fontWeight: "medium" }}
        >
          Events
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            pr: 1,
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        >
          {tasks.length === 0 ? (
            <div className="d-flex justify-content-between align-items-center border-top py-3">
              <Typography
                variant="body2"
                className="text-body"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "18px",
                  fontWeight: "regular",
                }}
              >
                You have 0 pending tasks.
              </Typography>
            </div>
          ) : (
            tasks.map((task, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center border-top py-3"
              >
                <Typography
                  variant="body2"
                  className="text-body"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "18px",
                    fontWeight: "regular",
                  }}
                >
                  {task.message}
                </Typography>
              </div>
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default NextSteps;
