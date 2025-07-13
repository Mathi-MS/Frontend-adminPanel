import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { FaAngleLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { images } from "../assets/Images/Images";

const serviceDetails: Record<
  string,
  {
    title: string;
    desc: string;
    highlights: { img: string; title: string; desc: string }[];
  }
> = {
  "Inplant Training": {
    title: "Inplant Training",
    desc:
      "Gain hands-on exposure in real-time industrial environments to bridge the gap between academic learning and industry expectations. Our inplant training programs help students understand the professional work environment and the application of theoretical concepts. We focus on giving practical exposure that prepares students to meet industrial requirements. The training includes basic IT knowledge, tools walkthrough, and interaction with professionals in the field.",
    highlights: [
      {
        img: images.loginBack,
        title: "Real-time Industry Visit",
        desc: "Students get to explore real companies and understand practical workflows.",
      },
      {
        img: images.banner,
        title: "Internship Certificate",
        desc: "Get a certified experience to boost your resume and job readiness.",
      },
    ],
  },
  "Internship Programmes": {
    title: "Internship Programmes",
    desc:
      "Our internship programmes are designed to bridge the gap between academics and industry. Interns work on real-time projects under the supervision of industry experts. This opportunity helps them enhance their technical skills, teamwork, time management, and communication. The programme ensures that candidates leave with hands-on experience and practical knowledge useful for job placements and career growth.",
    highlights: [
      {
        img: "https://via.placeholder.com/400x200?text=Project+Work",
        title: "Project-Based Learning",
        desc: "Get assigned real tech problems and solve them using industry-standard tools.",
      },
      {
        img: "https://via.placeholder.com/400x200?text=Mentorship",
        title: "Expert Mentorship",
        desc: "Learn under experienced professionals for structured guidance and feedback.",
      },
    ],
  },
  "Final Year Projects": {
    title: "Final Year Projects",
    desc:
      "We assist students in developing innovative final-year academic projects with end-to-end support, including idea selection, design, development, and documentation. Students can choose from a wide range of domains such as web, mobile, IoT, AI, and more. The goal is to help students build portfolio-worthy projects that enhance their technical skills and impress recruiters.",
    highlights: [
      {
        img: images.loginBack,
        title: "Real-time Industry Visit",
        desc: "Students get to explore real companies and understand practical workflows.",
      },
      {
        img: images.banner,
        title: "Internship Certificate",
        desc: "Get a certified experience to boost your resume and job readiness.",
      },
    ],
  },
  "Workshop Sessions": {
    title: "Workshop Sessions",
    desc:
      "We conduct practical and hands-on workshops on trending technologies like web development, data science, AI, cloud computing, etc. These workshops are designed to be interactive, beginner-friendly, and include live coding, demos, and Q&A. It’s ideal for both students and professionals looking to upskill quickly.",
    highlights: [
      {
        img: "https://via.placeholder.com/400x200?text=Live+Coding",
        title: "Interactive Demos",
        desc: "Practice what you learn with live examples and instructor guidance.",
      },
      {
        img: "https://via.placeholder.com/400x200?text=Certificate",
        title: "Certificate of Participation",
        desc: "Receive certificates to validate your skills and participation.",
      },
    ],
  },
  "Career Guidance": {
    title: "Career Guidance",
    desc:
      "We offer personalized career mentoring, resume building, mock interviews, and job search strategy sessions. Our career experts help you prepare for technical interviews, choose the right path, and stand out in the competitive job market. Whether you're a fresher or switching domains, we have tailored support for everyone.",
    highlights: [
      {
        img: images.loginBack,
        title: "Mock Interview Practice",
        desc: "Get interview-ready with real-world practice sessions and feedback.",
      },
      {
        img:images.banner,
        title: "Resume Building",
        desc: "Learn how to craft an impressive resume tailored to your goals.",
      },
    ],
  },
};

const WebServiceDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const serviceTitle = location.state;
  const data = serviceDetails[serviceTitle];

  return (
    <Box>
      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
          fontFamily: "Medium_W",
          borderColor: "var(--webprimary)",
          color: "var(--webprimary)",
          width: "35px ",
          minWidth: "35px ",
          height: "35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "100%",
          padding: 0,
          "&:hover": {
            backgroundColor: "var(--webprimary)",
            color: "#fff",
          },
        }}
      >
        <FaAngleLeft style={{ fontSize: "14px" } }/>

      </Button>

      {data ? (
        <>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ fontFamily: "Bold_W", mb: 2,
                "@media (max-width: 768px)": { fontSize: "26px"},
                "@media (max-width: 480px)": { fontSize: "22px"},
             }}
          >
            {data.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Regular_W",
              maxWidth: "800px",
              mb: 4,
              color: "#555",
              fontSize:"16px",
               "@media (max-width: 768px)": { fontSize: "16px"},
                "@media (max-width: 480px)": { fontSize: "14px"},
            }}
          >
            {data.desc}
          </Typography>

          <Grid container spacing={3}>
            {data.highlights.map((item, index) => (
              <Grid flexBasis={"48%"} sx={{ "@media (max-width:690px)": { flexBasis: "100%" } }} key={index}>
                <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.img}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: "SemiBold_W", mb: 1,fontSize:"18px" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "Regular_W", color: "#666" }}
                    >
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ fontFamily: "SemiBold_W", mb: 2 }}
          >
            Our Services
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "Regular_W" }}>
            Please select a service to view its details.
          </Typography>
        </>
      )}
    </Box>
  );
};

export default WebServiceDetail;
