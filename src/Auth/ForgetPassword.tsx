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
    navigate("/");
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
              src={images.blueStar}
              sx={{ ...blueStarOne }}
            />
            <Box
              component={"img"}
              src={images.whiteStar}
              sx={{ ...whiteStar }}
            />
            <Box
              component={"img"}
              src={images.blueStar}
              sx={{ ...blueStarTwo }}
            />
            <Typography variant="h3">
              Make Every Stage <br /> Count
            </Typography>
            <Typography variant="h4">
              Turn each milestone into a measurable quality checkpoint.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ ...LoginRight }}>
          <Box sx={{ ...boxOne }}>
            <Box component={"img"} src={images.logo} sx={{ ...loginLogo }} />
            <Typography variant="h2">PackRepo</Typography>
          </Box>
          <Box sx={{ ...boxTwo }}>
            <Typography variant="h3">Welcome to PackRepo</Typography>
              <>
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
                  />
                  <Box sx={{ ...microsoftBottom }}>
                    Already have an account?{" "}
                    <Box component={"span"} onClick={() => navigate("/")}>
                      Sign In
                    </Box>
                  </Box>
                </Box>
              </>
          </Box>
          <Box sx={{ ...boxThree }}>
            <Typography variant="h4">
              © Cavinkare {new Date().getFullYear()}
            </Typography>
            <Typography variant="h4">
              <CiMail /> help.packrepo.com
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgetPassword;
