import {
  Box,
  IconButton,
  Modal,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangePasswordSchema,
  CourseSchema,
} from "../assets/Validation/Schema";
import CustomInput from "../Custom/CustomInput";
import CustomButton from "../Custom/CustomButton";
import CustomFileUpload from "../Custom/CustomFileUpload";
import CourseCard from "../Custom/CourseCard";
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
// Dummy data for courses
const dummyCourses = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
    courseName: "React Development",
    description:
      "Learn modern React development with hooks, context, and best practices for building scalable applications",
    prize: 2999,
    duration: "8 weeks",
    discount: 20,
  },
  {
    id: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=200&fit=crop",
    courseName: "Node.js Backend",
    description:
      "Master backend development with Node.js, Express, and MongoDB for full-stack applications",
    prize: 3499,
    duration: "10 weeks",
    discount: 15,
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
    courseName: "Python Programming",
    description:
      "Complete Python course covering basics to advanced topics including data structures and algorithms",
    prize: 2499,
    duration: "12 weeks",
  },
  {
    id: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=200&fit=crop",
    courseName: "JavaScript Mastery",
    description:
      "Deep dive into JavaScript fundamentals, ES6+, async programming, and modern development patterns",
    prize: 2799,
    duration: "6 weeks",
    discount: 25,
  },
  {
    id: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=200&fit=crop",
    courseName: "UI/UX Design",
    description:
      "Learn user interface and user experience design principles with hands-on projects and real-world examples",
    prize: 3999,
    duration: "14 weeks",
    discount: 30,
  },
  {
    id: 6,
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
    courseName: "Data Science",
    description:
      "Comprehensive data science course covering statistics, machine learning, and data visualization techniques",
    prize: 4499,
    duration: "16 weeks",
    discount: 10,
  },
  {
    id: 7,
    thumbnail:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=200&fit=crop",
    courseName: "Mobile Development",
    description:
      "Build cross-platform mobile apps using React Native and Flutter with native performance optimization",
    prize: 3799,
    duration: "12 weeks",
  },
  {
    id: 8,
    thumbnail:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop",
    courseName: "DevOps Engineering",
    description:
      "Master DevOps practices including CI/CD, containerization, cloud deployment, and infrastructure automation",
    prize: 4999,
    duration: "18 weeks",
    discount: 20,
  },
  {
    id: 9,
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop",
    courseName: "Cybersecurity",
    description:
      "Learn cybersecurity fundamentals, ethical hacking, network security, and threat assessment methodologies",
    prize: 5499,
    duration: "20 weeks",
    discount: 15,
  },
  {
    id: 10,
    thumbnail:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=200&fit=crop",
    courseName: "Cloud Computing",
    description:
      "Comprehensive cloud computing course covering AWS, Azure, and Google Cloud Platform services and architecture",
    prize: 4299,
    duration: "14 weeks",
    // discount: 25,
  },
];

const Courses = () => {
  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courses, setCourses] = useState(dummyCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);

  const handleClose = () => {
    setOpen(false);
    setEditingCourse(null);
    reset();
  };

  const handleEdit = (id: number) => {
    const courseToEdit = courses.find((course) => course.id === id);
    if (courseToEdit) {
      setEditingCourse(courseToEdit);
      // Pre-fill the form with course data
      reset({
        courseName: courseToEdit.courseName,
        description: courseToEdit.description,
        prize: courseToEdit.prize.toString(),
        duration: courseToEdit.duration,
        discount: courseToEdit.discount?.toString() || "",
      });
      setOpen(true);
    }
  };

  const handleDeleteClick = (id: number) => {
    setCourseToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (courseToDelete) {
      setCourses(courses.filter((course) => course.id !== courseToDelete));
      console.log("Delete course with id:", courseToDelete);
    }
    setDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(CourseSchema),
  });
  const onsubmit = (data: any) => {
    if (editingCourse) {
      // Update existing course
      setCourses(
        courses.map((course) =>
          course.id === editingCourse.id
            ? {
                ...course,
                courseName: data.courseName,
                description: data.description,
                prize: parseFloat(data.prize),
                duration: data.duration,
                discount: data.discount ? parseFloat(data.discount) : undefined,
              }
            : course
        )
      );
      console.log("Updated course:", data);
    } else {
      // Add new course
      const newCourse = {
        id: Math.max(...courses.map((c) => c.id)) + 1,
        thumbnail:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop", // Default thumbnail
        courseName: data.courseName,
        description: data.description,
        prize: parseFloat(data.prize),
        duration: data.duration,
        discount: data.discount ? parseFloat(data.discount) : undefined,
      };
      setCourses([...courses, newCourse]);
      console.log("Added new course:", data);
    }
    handleClose();
  };
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "@media (max-width: 600px)": {
              flexDirection: "column",
              alignItems: "start",
            },
          }}
        >
          <TextField
            placeholder="Search courses..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              minWidth: "200px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "var(--white)",
                borderRadius: "4px",
                fontSize: "12px",
                fontFamily: "Regular_M",
                "& fieldset": {
                  borderColor: "var(--borderColor)",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "var(--borderColor)",
                  borderWidth: "1px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--borderColor)",
                  borderWidth: "1px",
                },
              },
              "& .MuiInputBase-input": {
                padding: "10px 8px",
                fontSize: "12px",
                fontFamily: "Regular_M",
              },
            }}
          />
          <CustomButton
            type="button"
            label="Add Courses"
            variant="contained"
            btnSx={{
              background: "var(--primary)",
              color: "var(--white)",
              width: "fit-content",
            }}
            onClick={() => setOpen(true)}
          />
        </Box>

        {/* Course Cards Grid */}
        <Box sx={{ marginTop: "24px" }}>
          <Grid container spacing={3}>
            {filteredCourses.map((course) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={course.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexBasis: "30% !important",
                  "@media (max-width: 991px)": {
                    flexBasis: "48% !important",
                  },
                  "@media (max-width: 767px)": {
                    flexBasis: "100% !important",
                  }
                }}
              >
                <CourseCard
                  id={course.id}
                  thumbnail={course.thumbnail}
                  courseName={course.courseName}
                  description={course.description}
                  prize={course.prize}
                  duration={course.duration}
                  discount={course.discount}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              </Grid>
            ))}
          </Grid>

          {filteredCourses.length === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "200px",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "var(--greyText)",
                  fontSize: "16px",
                  fontFamily: "Medium_M",
                }}
              >
                No courses found
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--greyText)",
                  fontSize: "12px",
                  fontFamily: "Regular_M",
                  textAlign: "center",
                }}
              >
                Try adjusting your search terms or add a new course
              </Typography>
            </Box>
          )}
        </Box>

        {/* Model  */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* Header  */}
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
                {editingCourse ? "Edit Course" : "Add Courses"}
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
                name="courseName"
                placeholder="Enter Course Name"
                label="Course Name"
                type="text"
                bgmode="dark"
                required={false}
                register={register}
                errors={errors}
              />
              <CustomInput
                name="description"
                placeholder="Enter Description"
                label="Description"
                type="text"
                bgmode="dark"
                required={false}
                register={register}
                errors={errors}
              />
              <CustomInput
                name="prize"
                placeholder="Enter Prize"
                label="Prize"
                type="number"
                bgmode="dark"
                required={false}
                register={register}
                errors={errors}
              />
              <CustomInput
                name="duration"
                placeholder="Enter Duration"
                label="Duration"
                type="text"
                bgmode="dark"
                required={false}
                register={register}
                errors={errors}
              />
              <CustomInput
                name="discount"
                placeholder="Enter Discount"
                label="Discount"
                type="number"
                bgmode="dark"
                required={false}
                register={register}
                errors={errors}
              />
              <CustomFileUpload
                name="thumbnail"
                label="Course Thumbnail"
                register={register}
                errors={errors}
                clearErrors={clearErrors}
                accept="image/jpeg,image/jpg,image/png,image/webp"
                maxSize={20480}
                bgmode="dark"
              />
            </Box>
            {/* Footer */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "12px",
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
                label={editingCourse ? "Update Course" : "Add Course"}
                btnSx={{ background: "var(--primary)", color: "var(--white)" }}
                onClick={handleSubmit(onsubmit)}
              />
            </Box>
          </Box>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          open={deleteModalOpen}
          onClose={handleDeleteCancel}
          aria-labelledby="delete-modal-title"
          aria-describedby="delete-modal-description"
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
                id="delete-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontSize: "14px", fontFamily: "Medium_M" }}
              >
                Delete Course
              </Typography>
              <IconButton
                edge="end"
                aria-label="close"
                onClick={handleDeleteCancel}
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
            <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "14px",
                  fontFamily: "Regular_M",
                  color: "var(--title)",
                  textAlign: "center",
                  lineHeight: "1.5",
                }}
              >
                Are you sure you want to delete this course?
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "12px",
                  fontFamily: "Regular_M",
                  color: "var(--greyText)",
                  textAlign: "center",
                  marginTop: "8px",
                }}
              >
                This action cannot be undone.
              </Typography>
            </Box>

            {/* Footer */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                paddingTop: "12px",
              }}
            >
              <CustomButton
                type="button"
                variant="outlined"
                label="Cancel"
                btnSx={{
                  background: "transparent",
                  color: "var(--greyText)",
                  borderColor: "var(--borderColor)",
                  "&:hover": {
                    backgroundColor: "var(--toogleHover)",
                  },
                }}
                onClick={handleDeleteCancel}
              />
              <CustomButton
                type="button"
                variant="contained"
                label="Delete"
                btnSx={{
                  background: "#f44336",
                  color: "var(--white)",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                  },
                }}
                onClick={handleDeleteConfirm}
              />
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};
export default Courses;
