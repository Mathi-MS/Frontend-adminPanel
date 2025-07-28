import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetSyllabusApi } from "../Hooks/syllabusView";
import {
  FaAngleLeft,
  FaChevronDown,
  FaBook,
  FaPlayCircle,
} from "react-icons/fa";

const WebSyllabusView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobId } = location.state || {};
  const { data: syllabus, isLoading, error } = useGetSyllabusApi(jobId);

  const syllabusData = syllabus?.data;

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            mb: 3,
            fontFamily: "Medium_W",
            borderColor: "var(--webprimary)",
            color: "var(--webprimary)",
            width: "35px",
            minWidth: "35px",
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
          <FaAngleLeft style={{ fontSize: "14px" }} />
        </Button>
        <Alert severity="error">Failed to load syllabus data</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", p: 2 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
          fontFamily: "Medium_W",
          borderColor: "var(--webprimary)",
          color: "var(--webprimary)",
          width: "35px",
          minWidth: "35px",
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
        <FaAngleLeft style={{ fontSize: "14px" }} />
      </Button>

      {syllabusData && (
        <>
          {/* Course Information */}
          {syllabusData?.units && (
            <Card sx={{ mb: 4, boxShadow: 3 }}>
              <CardContent>
                <Typography
                  variant="h4"
                  component="h1"
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
                  {syllabusData.courseId?.name}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Regular_W",
                    fontSize: "14px",
                    padding: "10px 0px",
                  }}
                >
                  {syllabusData.courseId?.description}
                </Typography>

                <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
                  {syllabusData.courseId?.discount ? (
                    <>
                      <Chip
                        label={`₹${Math.round(
                          syllabusData.courseId.price -
                            (syllabusData.courseId.price *
                              syllabusData.courseId.discount) /
                              100
                        )}`}
                        variant="filled"
                        sx={{ fontFamily: "Medium_W" }}
                      />
                      <Chip
                        label={`₹${syllabusData.courseId.price}`}
                        variant="outlined"
                        sx={{
                          fontFamily: "Medium_W",
                          textDecoration: "line-through",
                          color: "text.secondary",
                        }}
                      />
                      <Chip
                        label={`${syllabusData.courseId.discount}% OFF`}
                        color="success"
                        variant="outlined"
                        sx={{ fontFamily: "Medium_W" }}
                      />
                    </>
                  ) : (
                    <Chip
                      label={`₹${syllabusData.courseId?.price}`}
                      color="primary"
                      variant="filled"
                      sx={{ fontFamily: "Medium_W" }}
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Course Syllabus */}
          <Typography
            variant="h5"
            component="h2"
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
            Course Syllabus
          </Typography>

          {!syllabusData.units || syllabusData.units.length === 0 ? (
            <Card
              sx={{ textAlign: "center", py: 4, backgroundColor: "#f8f9fa" }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Medium_W",
                    fontSize: "16px",
                    color: "text.secondary",
                    mb: 2,
                  }}
                >
                  No Syllabus found for this course
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Regular_W",
                    fontSize: "14px",
                    color: "text.secondary",
                  }}
                >
                  The syllabus for this course is not available at the moment.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            syllabusData.units?.map((unit: any, unitIndex: number) => (
              <Accordion
                key={unit._id}
                defaultExpanded={unitIndex === 0}
                sx={{
                  mb: 2,
                  boxShadow: 2,
                  "&:before": { display: "none" },
                  borderRadius: "8px !important",
                }}
              >
                <AccordionSummary
                  expandIcon={<FaChevronDown />}
                  sx={{
                    backgroundColor: "var(--weblight)",
                    color: "var(--webprimary)",
                    borderRadius: "8px",
                    fontFamily: "SemiBold_W",
                    "&.Mui-expanded": {
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <FaBook />
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Medium_W",
                        fontSize: "16px",
                        "@media (max-width: 768px)": {
                          fontSize: "16px",
                          "@media (max-width: 690px)": { fontSize: "14px" },
                        },
                      }}
                    >
                      Unit {unitIndex + 1}: {unit.unitName}
                    </Typography>
                    <Chip
                      label={`${unit.lessons?.length || 0} Lessons`}
                      size="small"
                      sx={{
                        backgroundColor: "var(--webprimary)",
                        color: "white",
                        fontFamily: "Regular_W",
                      }}
                    />
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 0 }}>
                  <List>
                    {unit.lessons?.map((lesson: any, lessonIndex: number) => (
                      <ListItem
                        key={lesson._id}
                        sx={{
                          borderBottom:
                            lessonIndex < unit.lessons.length - 1
                              ? "1px solid #e0e0e0"
                              : "none",
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={2}
                          width="100%"
                        >
                          <FaPlayCircle
                            style={{
                              color: "var(--webprimary)",
                              fontSize: "16px",
                            }}
                          />
                          <ListItemText
                            primary={
                              <Typography
                                sx={{
                                  fontFamily: "Medium_W",
                                  fontSize: "14px",
                                  "@media (max-width: 768px)": {
                                    fontSize: "14px",
                                    "@media (max-width: 690px)": {
                                      fontSize: "14px",
                                    },
                                  },
                                }}
                              >
                                Lesson {lessonIndex + 1}: {lesson.title}
                              </Typography>
                            }
                          />
                        </Box>
                      </ListItem>
                    ))}

                    {(!unit.lessons || unit.lessons.length === 0) && (
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography
                              color="text.secondary"
                              sx={{ fontStyle: "italic" }}
                            >
                              No lessons available in this unit
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </>
      )}
    </Box>
  );
};
export default WebSyllabusView;
