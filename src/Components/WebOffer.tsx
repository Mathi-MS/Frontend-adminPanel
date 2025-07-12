import { Box, Typography } from "@mui/material";

const WebOffer = () => {
  return (
    <Box
      sx={{
        background: "var(--webprimary)",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "var(--white)",
          fontFamily: "Regular_W",
          fontSize: "14px",
          textAlign: "center",
          "@media (max-width: 450px)": { fontSize: "12px" },
        }}
      >
        Free Courses 🌟 Sale Ends Soon, Get It Now
      </Typography>
    </Box>
  );
};

export default WebOffer;
