import { Box } from "@mui/material";
import WebCourses from "./WebCourses";

const WebCoursesPage = () => {
  return (
    <Box>
      <Box
        sx={{
          fontSize: "130px",
          fontFamily: "Bold_W",
          paddingTop: "40px",
          textTransform: "uppercase",
          background: "linear-gradient(-1deg, #fff, var(--webprimary))",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          opacity: "0.4",
          "@media (max-width: 768px)": { fontSize: "100px" },
          "@media (max-width: 650px)": { fontSize: "80px" },
          "@media (max-width: 500px)": { fontSize: "60px" },
          "@media (max-width: 450px)": { fontSize: "50px" },
        }}
      >
        Courses
      </Box>
      <WebCourses />
    </Box>
  );
};

export default WebCoursesPage;
