import React, { useState } from "react";
import { Box, Typography, Button, IconButton, Tooltip } from "@mui/material";
import { IoCloudUpload, IoClose, IoImage } from "react-icons/io5";
import get from "lodash/get";
import {
  customBox,
  labelStyle,
  span,
  inputStyle,
  inputStyleColor,
  inputStyleColorLight,
  inputStyleColorRed,
} from "../assets/Styles/CustomInputStyle";
import type {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  UseFormClearErrors,
} from "react-hook-form";

interface CustomFileUploadProps<T extends FieldValues> {
  name: keyof T;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  clearErrors?: UseFormClearErrors<T>;
  accept?: string;
  maxSize?: number; // in bytes
  required?: boolean;
  bgmode?: "light" | "dark";
  boxSx?: object;
}

const CustomFileUpload = <T extends FieldValues>({
  name,
  label,
  register,
  errors,
  clearErrors,
  accept = "image/*",
  maxSize = 20480, // 20KB default
  required = false,
  bgmode = "light",
  boxSx,
}: CustomFileUploadProps<T>) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const errorMessage = get(errors, `${name}.message`, null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Clear validation errors when file is selected
      if (clearErrors) {
        clearErrors(name);
      }

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    // Reset the input value
    const input = document.getElementById(
      `file-input-${name as string}`
    ) as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const truncatedLabel =
    label.length > 17 ? `${label.substring(0, 17)}...` : label;

  const truncateFileName = (fileName: string, maxLength: number = 14) => {
    if (fileName.length <= maxLength) return fileName;

    const extension = fileName.split(".").pop();
    const nameWithoutExtension = fileName.substring(
      0,
      fileName.lastIndexOf(".")
    );

    if (extension) {
      const availableLength = maxLength - extension.length - 4; // 4 for "..." and "."
      return `${nameWithoutExtension.substring(
        0,
        availableLength
      )}...${extension}`;
    }

    return `${fileName.substring(0, maxLength - 3)}...`;
  };

  // Custom file upload styles matching CustomInput
  const fileUploadStyle = {
    ...inputStyle,
    ...(errorMessage
      ? inputStyleColorRed
      : bgmode === "dark"
      ? inputStyleColorLight
      : inputStyleColor),
    "& .MuiOutlinedInput-root": {
      padding: "0px",
      minHeight: "120px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: errorMessage
          ? "red"
          : bgmode === "dark"
          ? "var(--borderColor)"
          : "#000",
        borderWidth: "1px",
        borderStyle: "dashed",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: errorMessage
          ? "red"
          : bgmode === "dark"
          ? "var(--borderColor)"
          : "#000",
        borderWidth: "1px",
        borderStyle: "dashed",
      },
    },
  };

  return (
    <Box sx={{ ...customBox, ...boxSx }}>
      {/* Label - Same as CustomInput */}
      <Typography variant="h5" sx={{ ...labelStyle }}>
        <Tooltip title={label}>{truncatedLabel}</Tooltip>
        {required && (
          <Typography variant="h6" sx={{ ...span }}>
            *
          </Typography>
        )}
      </Typography>

      {/* File Upload Area */}
      <Box
        sx={{
          ...fileUploadStyle,
          position: "relative",
        }}
      >
        <input
          id={`file-input-${name as string}`}
          type="file"
          accept={accept}
          {...register(name)}
          onChange={handleFileChange}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            textAlign: "center",
            minHeight: "120px",
            width: "100%",
            border: errorMessage
              ? "1px dashed red"
              : bgmode === "dark"
              ? "1px dashed var(--borderColor)"
              : "1px dashed #000",
            borderRadius: "4px",
            backgroundColor: "transparent",
            position: "relative",
            zIndex: 0,
          }}
        >
          {!selectedFile ? (
            <>
              <IoCloudUpload
                size={32}
                color={
                  bgmode === "dark" ? "var(--borderColor)" : "var(--greyText)"
                }
              />
              <Typography
                variant="body2"
                sx={{
                  marginTop: "8px",
                  fontSize: "14px",
                  color:
                    bgmode === "dark"
                      ? "var(--borderColor)"
                      : "var(--greyText)",
                }}
              >
                Click to upload or drag and drop
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--greyText)",
                  fontSize: "12px",
                  marginTop: "4px",
                }}
              >
                Max size: {formatFileSize(maxSize)}
              </Typography>
            </>
          ) : (
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor:
                    bgmode === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  marginBottom: preview ? "12px" : "0",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <IoImage color="var(--primary)" />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color:
                          bgmode === "dark" ? "var(--red)" : "var(--title)",
                      }}
                      title={selectedFile.name} // Show full name on hover
                    >
                      {truncateFileName(selectedFile.name)}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "var(--greyText)", fontSize: "12px" }}
                    >
                      {formatFileSize(selectedFile.size)}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  size="small"
                  onClick={handleRemoveFile}
                  sx={{
                    color: "#f44336",
                    zIndex: 2,
                    "&:hover": {
                      backgroundColor: "rgba(244, 67, 54, 0.1)",
                    },
                  }}
                >
                  <IoClose />
                </IconButton>
              </Box>

              {preview && (
                <Box
                  sx={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto",
                    borderRadius: "4px",
                    overflow: "hidden",
                    border: "1px solid var(--greyText)",
                  }}
                >
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Error Message - Same as CustomInput */}
      {errorMessage && (
        <Typography
          sx={{
            margin: "5px 0px",
            color: "red",
            fontSize: "12px",
          }}
        >
          {errorMessage.toString()}
        </Typography>
      )}
    </Box>
  );
};

export default CustomFileUpload;
