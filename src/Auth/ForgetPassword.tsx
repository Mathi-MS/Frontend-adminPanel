import { Box, Typography } from "@mui/material";
import {
  blueStarOne,
  blueStarTwo,
  boxOne,
  boxThree,
  boxTwo,
  LoginContentOverlay,
  LoginImage,
  LoginLeft,
  loginLogo,
  LoginOverLay,
  LoginRight,
  LoginStyle,
  microsoftBottom,
  whiteStar,
} from "../assets/Styles/LoginStyle";
import { images } from "../assets/Images/Images";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../assets/Validation/Schema";
import CustomInput from "../Custom/CustomInput";
import CustomButton from "../Custom/CustomButton";
import { CiMail } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { successnotify } from "../Custom/Notify";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const onsubmit = async (data: { email: string }) => {
    successnotify("Please Check your mail ");
    navigate("/login");
  };
  return (
    <>
      <Box sx={{ ...LoginStyle }}>
        <Box sx={{ ...LoginLeft }}>
          <Box
            component={"img"}
            src={images.loginBack}
            sx={{ ...LoginImage }}
          />
          <Box
            component={"img"}
            src={images.loginOverlay}
            sx={{ ...LoginOverLay }}
          />
          <Box sx={{ ...LoginContentOverlay }}>
            <Box
              component={"img"}
              src={images.whiteStar}
              sx={{ ...blueStarOne }}
            />
            <Box
              component={"img"}
              src={images.whiteStar}
              sx={{ ...whiteStar }}
            />
            <Box
              component={"img"}
              src={images.whiteStar}
              sx={{ ...blueStarTwo }}
            />
            <Typography variant="h3">
              Let’s Get to <br /> Work
            </Typography>
            <Typography variant="h4">
              All-in-One Platform for Management and Collaboration
            </Typography>
          </Box>
        </Box>
        <Box sx={{ ...LoginRight }}>
          <Box sx={{ ...boxTwo }}>
<Box
              sx={{
                background: "var(--webprimary)",
                width: "35px",
                height: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "3px",
                marginBottom: "15px",
              }}
            >
              <Box
                component={"img"}
                sx={{ width: "30px" }}
                src={images.logoicon}
              />
            </Box>
            <Typography variant="h3">Welcome to SkillUp Tech</Typography>              <>
                <Typography variant="h6">Forget Password</Typography>
                <Box component={"form"} onSubmit={handleSubmit(onsubmit)}>
                  <CustomInput
                    name="email"
                    placeholder="Enter your Email"
                    label="Email"
                    type="email"
                    bgmode="dark"
                    required={false}
                    register={register}
                    errors={errors}
                  />
                  <CustomButton
                    type="submit"
                    variant="contained"
                    label="Send Email"
                    btnSx={{ marginTop: "0px" }}
                  />
                  <Box sx={{ ...microsoftBottom }}>
                    Already have an account?{" "}
                    <Box component={"span"} onClick={() => navigate("/login")}>
                      Sign In
                    </Box>
                  </Box>
                </Box>
              </>
          </Box>
          <Box sx={{ ...boxThree }}>
            <Typography variant="h4">
              © SkillUp Tech Solutions {new Date().getFullYear()}
            </Typography>

          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgetPassword;
