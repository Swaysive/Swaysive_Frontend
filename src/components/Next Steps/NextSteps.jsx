import React from "react";
import "./NextSteps.css";
import { Card, CardContent, Typography, Button } from "@mui/material";
import ExternalIcon from "../../assets/icons/external-links-icons.svg"; // Import local icon

const NextSteps = ({ events = [] }) => {
  const tasks = events.map((event) => {
    let message = "";
    let action = "View";
    let link = "#";

    if (event.type === "campaign_assigned") {
      message = `Campaign assigned to ${event.influencer.name.first} ${event.influencer.name.last} for ${event.product.title}`;
    } else if (event.type === "invitation") {
      message = `Invitation ${event.action} by ${event.email}`;
    } else {
      message = `${event.type} ${event.action}`;
    }

    return { message, action, link };
  });
  return (
    <Card className="next-steps-card shadow-sm rounded-4">
      <CardContent>
        <Typography
          variant="h6"
          className=" mb-3"
          sx={{ fontFamily: "Poppins", fontSize: "24px", fontWeight: "medium" }}
        >
          Next Steps
        </Typography>

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
              <Button
                href={task.link}
                variant="text"
                className="text-end text-nowrap text-dark"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {task.action}
              </Button>
            </div>
          ))
        )}

        {/* <div className="text-center mt-3">
          <Button
            href="#"
            variant="text"
            className="view-all-btn d-inline-flex align-items-center text-dark"
            sx={{ fontFamily: "Poppins", fontSize: "18px", fontWeight: "bold" }}
          >
            View All Tasks
            <img
              src={ExternalIcon}
              alt="External link"
              className="ms-2 icon-img"
            />
          </Button>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default NextSteps;
