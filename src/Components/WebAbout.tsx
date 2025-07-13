import { Box, Typography } from "@mui/material";

const WebAbout = () => {
  return (
    <Box>
        <Box sx={{fontSize:"130px",fontFamily:'Bold_W',paddingTop:"40px",textTransform:"uppercase",background: "linear-gradient(-1deg, #fff, var(--webprimary))", "-webkit-background-clip": "text", "-webkit-text-fill-color": "transparent",opacity:"0.8",
            "@media (max-width: 768px)": {fontSize:"100px"},
            "@media (max-width: 650px)": {fontSize:"80px"},
            "@media (max-width: 500px)": {fontSize:"60px"},
            "@media (max-width: 450px)": {fontSize:"50px"},
            }}>
            About Us
        </Box>
      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontFamily: "Regular_W",
            fontSize: "24px",
            "@media (max-width: 768px)": {
              fontSize: "22px",
              "@media (max-width: 690px)": { fontSize: "20px" },
            },
          }}
        >
          About Us
        </Typography>
        <Typography
          sx={{
            fontFamily: "Regular_W",
            fontSize: "16px",
            paddingBottom: "5px",
          }}
        >
          We Help Clients Invest Their Future.
        </Typography>
        <Typography sx={{ fontFamily: "Regular_W", fontSize: "14px" }}>
          Welcome to SkillUp Tech solutions, your destination for all IT needs.
          From final year projects to comprehensive training, we offer diverse
          solutions. Our seasoned professionals ensure unparalleled results,
          exceeding expectations. Specializing in graphic design, we elevate
          brands' visual identities. Internship programs provide hands-on
          experience, while career guidance leads to success. With a passion for
          innovation, Skill Up transforms ideas into reality, your trusted
          partner in the digital landscape.
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontFamily: "Regular_W",
            fontSize: "20px",
            paddingTop: "30px",
            "@media (max-width: 768px)": {
              fontSize: "20px",
            },
            "@media (max-width: 690px)": { fontSize: "18px" },
          }}
        >
          Our Mission
        </Typography>

        <Typography sx={{ fontFamily: "Regular_W", fontSize: "14px" }}>
          To deliver exceptional IT services, equipping individuals with the
          expertise and guidance needed to excel in their careers and make a
          meaningful impact in the tech industry.
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontFamily: "Regular_W",
            fontSize: "20px",
            paddingTop: "30px",

            "@media (max-width: 768px)": {
              fontSize: "20px",
            },
            "@media (max-width: 690px)": { fontSize: "18px" },
          }}
        >
          Our Vision
        </Typography>

        <Typography sx={{ fontFamily: "Regular_W", fontSize: "14px" }}>
          To be the premier destination for aspiring technologists, empowering
          them with cutting-edge skills and opportunities to thrive in the
          digital age.
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontFamily: "Regular_W",
            fontSize: "20px",
            paddingTop: "30px",
            "@media (max-width: 768px)": {
              fontSize: "20px",
            },
            "@media (max-width: 690px)": { fontSize: "18px" },
          }}
        >
          Our Goal
        </Typography>

        <Typography sx={{ fontFamily: "Regular_W", fontSize: "14px" }}>
          To spark excitement for tech and propel careers through outstanding
          projects, engaging training, and eye-catching websites. With hands-on
          internships and personalized career guidance, we’re shaping the future
          of tech talent, step by step.
        </Typography>
      </Box>
    </Box>
  );
};

export default WebAbout;
