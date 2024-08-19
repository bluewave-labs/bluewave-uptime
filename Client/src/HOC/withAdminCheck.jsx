import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axiosConfig";
import { logger } from "../Utils/Logger";

const withAdminCheck = (WrappedComponent) => {
  const WithAdminCheck = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      axiosInstance
        .get("/auth/users/admin")
        .then((response) => {
          if (response.data.data === true) {
            navigate("/login");
          }
        })
        .catch((error) => {
          logger.error(error);
        });
    }, [navigate]);
    return <WrappedComponent {...props} isAdmin={true} />;
  };
  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithAdminCheck.displayName = `WithAdminCheck(${wrappedComponentName})`;

  return WithAdminCheck;
};

export default withAdminCheck;
