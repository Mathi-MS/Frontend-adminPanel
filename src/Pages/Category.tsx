import { Box, IconButton, Modal, Typography } from "@mui/material";
import CustomButton from "../Custom/CustomButton";
import CustomInput from "../Custom/CustomInput";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OffersDescriptionSchema } from "../assets/Validation/Schema";
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
const Category = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(OffersDescriptionSchema),
  });
    const handleClose = () => {
    setOpen(false);
    reset();
    clearErrors();
  };
  const onsubmit = async (data:any) => {
    console.log(data);
  };
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            marginBottom: "20px",
            "@media (max-width: 600px)": {
              flexDirection: "column",
              alignItems: "start",
            },
          }}
        >
          <CustomButton
            type="button"
            label="Add Offers"
            variant="contained"
            btnSx={{
              background: "var(--primary)",
              color: "var(--white)",
              width: "fit-content",
            }}
            // onClick={() => setOpen(true)}
          />
        </Box>
        <Modal
          open={true}
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
                {"Add Category"}
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
                name="description"
                placeholder="Enter Description"
                label="Description"
                type="text"
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
                label={"Add Category"}
                btnSx={{ background: "var(--primary)", color: "var(--white)" }}
                onClick={handleSubmit(onsubmit)}
              />
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default Category;
