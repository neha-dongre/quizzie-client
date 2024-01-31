import React from "react";

const ItemNotFound = () => {
  const styles = {
    container: {     
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "4rem",
      textAlign: "center",
    },
  };

  return <div style={styles.container}>Page Not Found</div>;
};

export default ItemNotFound;
