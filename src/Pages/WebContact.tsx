import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import CustomInput from "../Custom/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactUsSchema } from "../assets/Validation/Schema";
import { useContactPost } from "../Hooks/review";
import CustomSnackBar from "../Custom/CustomSnackBar";

const WebContact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(contactUsSchema),
  });
  const { mutate: contactMutation } = useContactPost();
  const onsubmit = (data: any) => {
    contactMutation(
      {name: data.name, email: data.email, contactNumber: data.mobile, description: data.description },
      {
        onSuccess: (response: any) => {
          CustomSnackBar.successSnackbar(
            response.message || "Review created successfully"
          );
          reset();
        },
        onError: (error) => {
          CustomSnackBar.errorSnackbar(error.message || "Somethimg went wrong");
        },
      }
    );
  };
  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          fontFamily: "SemiBold_W",
          fontSize: "24px",
          mb: "10px",
          "@media (max-width: 690px)": { fontSize: "20px" },
        }}
      >
        Get in Touch
      </Typography>

      <Grid
        container
        sx={{
          gap: "10px",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 2,
          boxShadow: 1,
          padding: 3,
        }}
      >
        {/* Left Side - Contact Form */}
        <Box
          sx={{
            width: "33%",
            "@media (max-width: 991px)": { width: "48%" },
            "@media (max-width: 690px)": { width: "100%" },
          }}
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight="medium"
              sx={{
                fontFamily: "Medium_W",
                mb: 2,
                "@media (max-width: 690px)": { fontSize: "16px" },
              }}
            >
              Contact Us
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onsubmit)}
              autoComplete="off"
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
                type="email"
                bgmode="dark"
                required={false}
                register={register}
                errors={errors}
              />
              <CustomInput
                name="mobile"
                placeholder="Enter Mobile Number"
                label="Mobile Number"
                type="number"
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

              <Button
                variant="contained"
                type="submit"
                onClick={handleSubmit(onsubmit)}
                fullWidth
                sx={{
                  background: "var(--webprimary)",
                  textTransform: "none",
                  borderRadius: "6px",
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Right Side - Map */}
        <Box
          sx={{
            width: "63%",
            "@media (max-width: 991px)": { width: "48%" },
            "@media (max-width: 690px)": { width: "100%" },
          }}
        >
          <Paper sx={{ height: "100%", borderRadius: 2, overflow: "hidden" }}>
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6763.583408766511!2d79.28505475337306!3d11.682915247392357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab4bb3c1f8f647%3A0xa5700439d3e35a25!2sSH%2069%2C%20Ulundurpet%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1708262309823!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              loading="lazy"
            />
          </Paper>
        </Box>
      </Grid>
    </Box>
  );
};

export default WebContact;
