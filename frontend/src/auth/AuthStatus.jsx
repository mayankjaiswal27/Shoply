import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth_helpers";

export default function AuthStatus({ children }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {user !== null && (
        <div className="container">
          <div
            className="row justify-content-end align-items-center"
            style={{ marginBottom: "1em", marginTop: "1em" }}
          >
            <div className="col-auto">
              <button
                className="btn btn-danger btn-md"
                onClick={() => {
                  signOut(() => navigate("/", { replace: true }));
                }}
              >
                Sign out
              </button>
            </div>
            <div className="col-auto text-md text-right">
              <b>Welcome {user.username}!</b>
              <br />
              <span><b>Current Time: {currentTime.toLocaleTimeString()}</b></span>
            </div>
          </div>
          <div className="row">{children}</div>
        </div>
      )}
    </>
  );
}
