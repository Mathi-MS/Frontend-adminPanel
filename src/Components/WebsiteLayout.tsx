import { Box } from "@mui/material";
import WebOffer from "./WebOffer";
import WebFooter from "./WebFooter";
import WebNavbar from "./WebNavbar";
import { Outlet } from "react-router-dom";
import { images } from "../assets/Images/Images";
export const webImages = {
  //   backgroundImage:`url(${images.overlay})`,
  //   width:"100%",
  //   height:"100%",
  //   backgroundSize:"cover",
  position: "absolute",
  top: "0px",
  left: "0px",
  zIndex: "9",
};
const WebsiteLayout = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ ...webImages }}>
        <Box
          component={"img"}
          src={images.overlay}
          alt="sefsef"
          sx={{
            width: "100%",
            height: "100%",
            "@media (max-width: 600px)": { height:"500px" },
          }}
        />
      </Box>
      <Box
        sx={{
          background: "#ffffffea",
          padding: "10px 20px",
          zIndex: "999",
          position: "relative",
          "@media (max-width: 991px)": { padding: "10px" },
          "@media (max-width: 600px)": { background: "#ffffffc4" },
          "@media (max-width: 450px)": { padding: "10px 5px" },
        }}
      >
        <WebOffer />
        <Box
          sx={{
            padding: "10px 30px",
            zIndex: "999",
            position: "relative",
            "@media (max-width: 991px)": { padding: "10px 20px" },
            "@media (max-width: 550px)": { padding: "10px" },
          }}
        >
          <WebNavbar />
          <Box sx={{ margin: "20px 0px", zIndex: "999", position: "relative" }}>
            <Outlet />
          </Box>
        </Box>
        <WebFooter />
      </Box>
    </Box>
  );
};

export default WebsiteLayout;
