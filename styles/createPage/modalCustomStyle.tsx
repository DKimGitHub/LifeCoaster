var customStyles: any;

if (window.innerWidth > 600) {
  console.log("hi");
  customStyles = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "fit-content",
      height: "fit-content",
      minWidth: "30%",
      transform: "translate(-50%, -50%)",
      marginX: "auto",
      borderRadius: "3rem",
      // border: "2px solid #ff4114",
      color: "#474239",
      backgroundColor: "#99c7c2",
      padding: "3rem 4rem",
      // boxShadow: "0px 0px 10px 10px #cae3e0"
    },
    overlay: {
      backgroundColor: "#FBF4E6aa",
    },
  };
} else {
  customStyles = {
    content: {
      top: "20%",
      bottom: "auto",
      height: "fit-content",
      minWidth: "30%",
      margin: "-2rem",
      borderRadius: "3rem",
      // border: "2px solid #ff4114",
      color: "#474239",
      backgroundColor: "#99c7c2",
      padding: "3rem 0.5rem",
      // boxShadow: "0px 0px 10px 10px #cae3e0"
    },
    overlay: {
      backgroundColor: "#FBF4E6aa",
    },
  };
}

export default customStyles;