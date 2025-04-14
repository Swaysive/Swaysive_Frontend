import { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RegisterRoles() {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const roles = [
    { label: "Register as Seller", value: "SELLERS", icon: "\ud83c\udf1f" },
    { label: "Register as Super Admin", value: "SUPER_ADMIN", icon: "\ud83d\udc68\u200d\ud83d\udcbb" },
    { label: "Register as Influencer", value: "INFULENCERS", icon: "\ud83d\udcf8" }
  ];

  const handleSubmit = () => {
    if (selectedRole) {
      // Navigate to the register screen with the selected role
      navigate(`/register?role=${selectedRole}`);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center p-4">
      <Card className="p-4 shadow w-75">
        <CardContent>
          <Typography variant="h5" className="mb-4 text-center">
            Choose Your Role
          </Typography>
          {roles.map((role) => (
            <div
              key={role.value}
              className={`d-flex align-items-center justify-content-between p-3 mb-2 border rounded cursor-pointer ${
                selectedRole === role.value ? "border-dark bg-secondary text-white" : "border-secondary"
              }`}
              onClick={() => setSelectedRole(role.value)}
            >
              <span className="fs-3">{role.icon}</span>
              <Typography variant="body1" className={`fw-bold  ${
                selectedRole === role.value ? "text-white" : "text-dark"
              }`}>
                {role.label}
              </Typography>
            </div>
          ))}
         <Button
            variant="contained"
            fullWidth
            className="mt-3 p-2"
            onClick={handleSubmit}
            disabled={!selectedRole}
            style={{ backgroundColor: selectedRole ? "black" : "#e0e0e0", color: selectedRole ? "white" : "black" }}
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
