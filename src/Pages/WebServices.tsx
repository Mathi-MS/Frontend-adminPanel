import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";

const benefits = [
  {
    number: "01",
    title: "Inplant Training",
    desc: "Gain hands-on exposure in real-time industrial environments to bridge the gap between academic learning and industry demands.",
  },
  {
    number: "02",
    title: "Internship Programmes",
    desc: "Work on live projects under the guidance of professionals to enhance your practical skills and industry knowledge.",
  },
  {
    number: "03",
    title: "Final Year Projects",
    desc: "Get complete assistance on innovative final year projects, from concept development to implementation and documentation.",
  },
  {
    number: "04",
    title: "Workshop Sessions",
    desc: "Participate in expert-led workshops that focus on current technologies, tools, and practical application through guided sessions.",
  },
  {
    number: "05",
    title: "Career Guidance",
    desc: "Receive personalized mentoring, resume building, and interview preparation to help you land your dream tech job.",
  },
  {
    number: "06",
    title: "IT Services",
    desc: "We deliver high-quality web and software development services tailored to meet business needs and drive digital transformation.",
  },
];

const WebServices = () => {
  return (
    <Box
      sx={{
        padding: "60px 0px",
        "@media (max-width: 768px)": { padding: "40px 0px" },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        sx={{
          "@media (max-width: 690px)": {
            flexDirection: "column",
            alignItems: "start",
            gap: 2,
          },
        }}
      >
        <Box
          width={"80%"}
          sx={{ "@media (max-width: 690px)": { width: "100%" } }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontFamily: "SemiBold_W",
              fontSize: "24px",
              "@media (max-width: 768px)": { fontSize: "22px" },
              "@media (max-width: 690px)": { fontSize: "20px" },
            }}
          >
            Services
          </Typography>
          <Typography
            sx={{
              fontFamily: "Regular_W",
              fontSize: "14px",
              "@media (max-width: 768px)": { fontSize: "14px" },
            }}
          >
            Empowering students and professionals through real-world training,
            project support, and innovative tech solutions tailored for career
            growth.
          </Typography>
        </Box>
        <Box
          width={"20%"}
          sx={{
            textAlign: "right",
            "@media (max-width: 690px)": { width: "100%", textAlign: "left" },
          }}
        >
          <Box
            component="button"
            sx={{
              background: "#fff",
              border: "1px solid #e0e0e0",
              px: 2,
              py: 1,
              borderRadius: "6px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "Medium_W",
            }}
          >
            View All
          </Box>
        </Box>
      </Box>

      <Grid
        container
        spacing={3}
        sx={{ justifyContent: "space-between", alignContent: "center" }}
      >
        {benefits.map((item, index) => (
          <Box
            flexBasis={"30%"}
            key={index}
            sx={{
              "@media (max-width: 991px)": { flexBasis: "48%" },
              "@media (max-width: 690px)": { flexBasis: "100%" },
            }}
          >
            <Card
              elevation={0}
              sx={{
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    fontFamily: "SemiBold_W",
                    fontSize: "24px",
                    textAlign: "right",
                    "@media (max-width: 768px)": { fontSize: "20px" },
                  }}
                >
                  {item.number}
                </Typography>
                <Typography
                  variant="subtitle1"
                  mt={1}
                  sx={{
                    fontFamily: "Bold_W",
                    fontSize: "24px",
                    lineHeight: "1.4",
                    "@media (max-width: 768px)": { fontSize: "20px" },
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={1}
                  sx={{
                    fontFamily: "Regular_W",
                    "@media (max-width: 768px)": { fontSize: "14px" },
                  }}
                >
                  {item.desc}
                </Typography>

                <Box mt={2}>
                  <IconButton
                    sx={{
                      border: "1px solid #eee",
                      width: 36,
                      height: 36,
                    }}
                  >
                    <NorthEastIcon
                      fontSize="small"
                      sx={{ color: "var(--webprimary)" }}
                    />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default WebServices;
