import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { networkService } from "../main";

const withAdminCheck = (WrappedComponent) => {
  const WithAdminCheck = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      networkService
        .doesAdminExist()
        .then((response) => {
          if (response.data.data === true) {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
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
