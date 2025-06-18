import React from 'react';
import './NextSteps.css';
import { Card, CardContent, Typography, Button } from '@mui/material';
import ExternalIcon from '../../assets/icons/external-links-icons.svg'; // Import local icon

const tasks = [
  {
    message: "You have 4 partnership applications to review.",
    action: "Review",
    link: "#",
  },
  {
    message: "2 campaigns are nearing their end date.",
    action: "View",
    link: "#",
  },
  {
    message: "3 payouts are pending for approval.",
    action: "Go to Payments",
    link: "#",
  },
  {
    message: "3 payouts are pending for approval.",
    action: "Go to Payments",
    link: "#",
  },
];

const NextSteps = () => {
  return (
    <Card className="next-steps-card shadow-sm rounded-4">
      <CardContent>
        <Typography variant="h6" className="fw-bold mb-3">Next Steps</Typography>

        {tasks.map((task, index) => (
          <div key={index} className="d-flex justify-content-between align-items-center border-top py-3">
            <Typography variant="body2" className="text-body">{task.message}</Typography>
            <Button href={task.link} variant="text" className="text-end text-nowrap fw-bold text-dark">
              {task.action}
            </Button>
          </div>
        ))}

        <div className="text-center mt-3">
          <Button href="#" variant="text" className="view-all-btn fw-bold d-inline-flex align-items-center text-dark">
            View All Tasks
            <img src={ExternalIcon} alt="External link" className="ms-2 icon-img" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextSteps;
