import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Chip,
  Stack,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import { FaAngleLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { images } from "../assets/Images/Images";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carrersWebSchema } from "../assets/Validation/Schema";
import { IoClose } from "react-icons/io5";
import CustomInput from "../Custom/CustomInput";
import CustomButton from "../Custom/CustomButton";
import { useState } from "react";

const mockCategoryData = [
  {
    title: "React Internship Program",
    startDate: "2025-08-01",
    endDate: "2025-09-01",
    startTime: "10:00 AM",
    endTime: "4:00 PM",
    venue: "Online Zoom",
    mode: "Online",
    price: "₹2999",
    image: images.loginBack,
    description:
      "This React internship helps you build real-world UI with hands-on projects, expert sessions, and mentorship.",
    id: "43",
  },
  {
    title: "Web Dev Workshop",
    startDate: "2025-08-15",
    endDate: "2025-08-17",
    startTime: "9:00 AM",
    endTime: "3:00 PM",
    venue: "Tech Auditorium, Chennai",
    mode: "Offline",
    price: "₹1499",
    image: images.banner,
    description:
      "Join this 3-day offline workshop covering HTML, CSS, JS, and deployment for beginners and students.",
    id: "23",
  },
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  borderRadius: "5px",
  boxShadow: 24,
  padding: "10px 20px",
  "@media (max-width: 600px)": {
    width: "90vw",
    margin: "auto",
  },
};
const WebCategory = () => {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<{
    title: string;
    id: string;
  } | null>(null);
  const location = useLocation();
  const categoryTitle = location.state;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(carrersWebSchema),
  });
  const onsubmit = async (data: any) => {
    if (selectedJob) {
      const submissionData = {
        ...data,
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
      };
      console.log("Apply for:", submissionData);
    }
  };
  const handleOpen = (jobTitle: string, jobId: string) => {
    setSelectedJob({ title: jobTitle, id: jobId });
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };
  return (
    <Box sx={{
        paddingTop: "60px",
        "@media (max-width: 768px)": { paddingTop: "40px" },
      }}>
      {location.pathname === "/services/category" ? (
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
          <FaAngleLeft style={{ fontSize: "14px" }} />
        </Button>
      ) : (
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
            Intenships & Workshops
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
          {location.pathname === "/courses" ? (
            ""
          ) : (
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
              onClick={() => navigate("/services")}
            >
              View All
            </Box>
          )}
        </Box>
      </Box>
      )}

      <Typography
        variant="h4"
        sx={{
          fontFamily: "Bold_W",
          mb: 2,
          "@media (max-width: 768px)": { fontSize: "26px" },
          "@media (max-width: 480px)": { fontSize: "22px" },
        }}
      >
        {categoryTitle}
      </Typography>

      <Grid container spacing={3} sx={{justifyContent:"space-between",alignItems:"center"}}>
        {mockCategoryData.map((item, index) => (
          <Grid
            flexBasis={"48%"}
            sx={{ "@media (max-width:690px)": { flexBasis: "100%" } }}
            key={index}
          >
            <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "SemiBold_W", mb: 1 }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "Regular_W", color: "#555", mb: 2 }}
                >
                  {item.description}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  mb={1}
                  sx={{ gap: 1 }}
                >
                  <Chip
                    sx={{ fontFamily: "Medium_W", fontSize: "10px" }}
                    label={`Start: ${item.startDate}`}
                    size="small"
                  />
                  <Chip
                    sx={{ fontFamily: "Medium_W", fontSize: "10px" }}
                    label={`End: ${item.endDate}`}
                    size="small"
                  />
                  <Chip
                    sx={{ fontFamily: "Medium_W", fontSize: "10px" }}
                    label={`Time: ${item.startTime} - ${item.endTime}`}
                    size="small"
                  />
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  sx={{ gap: 1 }}
                >
                  <Chip
                    sx={{ fontFamily: "Medium_W", fontSize: "10px" }}
                    label={`Venue: ${item.venue}`}
                    size="small"
                  />
                  <Chip
                    sx={{ fontFamily: "Medium_W", fontSize: "10px" }}
                    label={`Mode: ${item.mode}`}
                    size="small"
                  />
                  <Chip
                    sx={{ fontFamily: "Medium_W", fontSize: "10px" }}
                    label={`Price: ${item.price}`}
                    size="small"
                  />
                </Stack>
                <Button
                  variant="outlined"
                  onClick={() => handleOpen(item.title, item.id)}
                  sx={{
                    textTransform: "none",
                    fontFamily: "Medium_W",
                    borderRadius: "6px",
                    borderColor: "var(--webprimary)",
                    color: "var(--webprimary)",
                    margin: "20px 0px 0px 0px",
                    "&:hover": {
                      backgroundColor: "var(--webprimary)",
                      color: "#fff",
                    },
                  }}
                >
                  Apply
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Apply Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "8px",
              borderBottom: "0.4px solid var(--greyText)",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: "14px", fontFamily: "Medium_M" }}
            >
              {selectedJob?.title}
            </Typography>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleClose}
              sx={{
                "& svg": {
                  fontSize: "18px",
                },
              }}
            >
              <IoClose className="close-icon" />
            </IconButton>
          </Box>
          {/* Body */}
          <Box
            component={"form"}
            sx={{ marginTop: "12px", maxHeight: "50vh", overflowY: "auto" }}
            onSubmit={handleSubmit(onsubmit)}
          >
            <CustomInput
              name="name"
              placeholder="Enter Name"
              label="Name"
              type="text"
              bgmode="dark"
              required={false}
              register={register}
              errors={errors}
            />
            <CustomInput
              name="email"
              placeholder="Enter Email"
              label="Email"
              type="text"
              bgmode="dark"
              required={false}
              register={register}
              errors={errors}
            />
            <CustomInput
              name="mobile"
              placeholder="Enter Phone Number"
              label="Mobile Number"
              type="number"
              bgmode="dark"
              required={false}
              register={register}
              errors={errors}
            />
          </Box>
          {/* Footer */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "12px",
              gap: "20px",
            }}
          >
            <CustomButton
              type="button"
              variant="contained"
              label="cancel"
              btnSx={{ background: "transparent", color: "var(--title)" }}
              onClick={handleClose}
            />
            <CustomButton
              type="submit"
              variant="contained"
              label={"Apply"}
              btnSx={{ background: "var(--primary)", color: "var(--white)" }}
              onClick={handleSubmit(onsubmit)}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default WebCategory;
