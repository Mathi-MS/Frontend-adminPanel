import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { images } from "../assets/Images/Images";

const courses = [
  {
    title: "Web Design Fundamentals",
    duration: "4 Weeks",
    level: "Beginner",
    author: "John Smith",
    description:
      "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
    price: 2999,
    discountedPrice: 1499,
    thumbnail: images.banner,
  },
  {
    title: "UI/UX Design",
    duration: "6 Weeks",
    level: "Intermediate",
    author: "Emily Johnson",
    description:
      "Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.",
    price: 4999,
    thumbnail: images.loginBack,
  },
];

const WebCourses = () => {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
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
              "@media (max-width: 768px)": {
                fontSize: "22px",
                "@media (max-width: 690px)": { fontSize: "20px" },
              },
            }}
          >
            Our Courses
          </Typography>
          <Typography sx={{ fontFamily: "Regular_W", fontSize: "14px" }}>
            Our expert-led courses are designed to equip students with practical
            skills, real-world experience, and confidence to succeed in today’s
            competitive tech landscape.
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

      {/* Courses Grid */}
      <Grid container sx={{ gap: 3 }}>
        {courses.map((course, index) => (
          <Box
            flexBasis={"48%"}
            sx={{ "@media (max-width: 690px)": { flexBasis: "100%" } }}
            key={index}
          >
            <Card
              elevation={0}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              {/* Course Image */}
              <CardMedia
                component="img"
                height="200"
                image={course.thumbnail}
                alt={course.title}
              />

              {/* Course Content */}
              <CardContent>
                {/* Top Row: Duration, Level, Author */}
                <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                  <Chip
                    label={course.duration}
                    size="small"
                    sx={{ fontFamily: "Regular_W", fontSize: "12px" }}
                  />
                </Stack>

                {/* Title & Description */}
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    fontFamily: "SemiBold_W",
                    fontSize: "18px",
                    "@media (max-width: 690px)": { fontSize: "16px" },
                  }}
                >
                  {course.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={2}
                  sx={{
                    fontFamily: "Regular_W",
                    "@media (max-width: 690px)": { fontSize: "14px" },
                  }}
                >
                  {course.description}
                </Typography>

                {/* Price Section */}
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  {course.discountedPrice ? (
                    <>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          textDecoration: "line-through",
                          fontFamily: "Regular_W",
                          "@media (max-width: 690px)": { fontSize: "14px" },
                        }}
                      >
                        ₹{course.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          fontFamily: "SemiBold_W",
                          color: "var(--webprimary)",
                          "@media (max-width: 690px)": { fontSize: "14px" },
                        }}
                      >
                        ₹{course.discountedPrice}
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        fontFamily: "SemiBold_W",
                        "@media (max-width: 690px)": { fontSize: "14px" },
                      }}
                    >
                      ₹{course.price}
                    </Typography>
                  )}
                </Stack>

                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    textTransform: "none",
                    borderRadius: "6px",
                    fontFamily: "Medium_W",
                    borderColor: "var(--webprimary)",
                    color: "var(--webprimary)",
                    transition: "1s",
                    "&:hover": {
                      borderColor: "#ff7f50",
                      backgroundColor: "#ff7f50",
                      color: "#fff",
                    },
                    "@media (max-width: 690px)": { fontSize: "14px" },
                  }}
                >
                  Get it Now
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default WebCourses;
