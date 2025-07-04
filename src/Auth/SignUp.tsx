import { Box, Typography, TextField } from "@mui/material";
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
import { useState, useRef } from "react";
import { useRegisterApi, verifyOtp } from "../Hooks/login";
import CustomSnackBar from "../Custom/CustomSnackBar";

const SignUp = () => {
  const navigate = useNavigate();
  const [otpOpen, setOpenOpen] = useState<boolean>(false);
  const [valueStore, setValueStore] = useState<any>({});
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const {mutate: RegisterUser} = useRegisterApi();
  const { mutate: otpFunction } = verifyOtp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const onsubmit = async (data: { email: string,name:string,mobile:string }) => {
    RegisterUser({email:data.email,name:data.name,mobile:data.mobile},
      {
        onSuccess:()=>{
          CustomSnackBar.successSnackbar("Please check your mail");
          setOpenOpen(true);
          setValueStore(data);
        },
        onError:(error)=>{
          CustomSnackBar.errorSnackbar(error.message); 
        }
      }
    )
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      otpFunction({otp:otpValue,email:valueStore.email},{
      onSuccess:()=>{
        CustomSnackBar.successSnackbar("Register Successfully");
        setValueStore({});
        navigate("/");
      },
      onError:(error)=>{
        CustomSnackBar.errorSnackbar(error.message);
      }
    });
    }
    else{
      CustomSnackBar.errorSnackbar("Please enter valid OTP");
    }
  };
  const handleResendClick = () =>{
    console.log(valueStore);
    
    RegisterUser({email:valueStore.email,name:valueStore.name,mobile:valueStore.mobile},
      {
        onSuccess:()=>{
          CustomSnackBar.successSnackbar("Please check your mail");
          setOpenOpen(true);
          setValueStore(valueStore);
        },
        onError:(error)=>{
          CustomSnackBar.errorSnackbar(error.message); 
        }
      }
    )
  }
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
            {otpOpen === false ? (
              <>
                <Typography variant="h6">Please Sign up to continue</Typography>
                <Box component={"form"} onSubmit={handleSubmit(onsubmit)}>
                  <CustomInput
                    name="name"
                    placeholder="Enter your Name"
                    label="Name"
                    type="text"
                    bgmode="dark"
                    required={false}
                    register={register}
                    errors={errors}
                  />
                  <CustomInput
                    name="email"
                    placeholder="Enter your Email"
                    label="Email"
                    type="text"
                    bgmode="dark"
                    required={false}
                    register={register}
                    errors={errors}
                  />
                  <CustomInput
                    name="mobile"
                    placeholder="Enter your Mobile Number"
                    label="Mobile Number"
                    type="number"
                    bgmode="dark"
                    required={false}
                    register={register}
                    errors={errors}
                  />
                  <CustomButton
                    type="submit"
                    variant="contained"
                    label="Sign Up"
                  />
                  <Box sx={{ ...microsoftBottom }}>
                    Already have an account?{" "}
                    <Box component={"span"} onClick={() => navigate("/")}>
                      Sign In
                    </Box>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    We've sent a 6-digit code to your email
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      justifyContent: "center",
                      mb: 3,
                    }}
                  >
                    {otp.map((digit, index) => (
                      <TextField
                        key={index}
                        inputRef={(el) => (otpRefs.current[index] = el)}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        inputProps={{
                          maxLength: 1,
                          style: {
                            textAlign: "center",
                            fontSize: "16px",
                            fontWeight: "bold",
                          },
                        }}
                        sx={{
                          width: "40px",
                          height: "40px",
                          "& .MuiOutlinedInput-root": {
                            height: "40px",
                            "& fieldset": {
                              borderColor: "#ccc",
                            },
                            "&:hover fieldset": {
                              borderColor: "#ccc",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#ccc",
                            },
                          },
                        }}
                      />
                    ))}
                  </Box>
                  <CustomButton
                    type="button"
                    variant="contained"
                    label="Verify OTP"
                    onClick={handleOtpSubmit}
                  />
                  <Box sx={{ ...microsoftBottom }}>
                    Didn't receive the code?{" "}
                    <Box
                      component={"span"}
                      onClick={handleResendClick}
                    >
                      Resend
                    </Box>
                  </Box>
                </Box>
              </>
            )}
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

export default SignUp;
