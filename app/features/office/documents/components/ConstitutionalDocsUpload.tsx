"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { documentTypes } from "@/features/office/documents/data/document-types";
import { schema } from "@/features/office/documents/schema";
import { FormInputData } from "@/features/office/documents/types";

import axios from "axios";

export const ConstitutionalDocsUpload = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormInputData>({
    resolver: zodResolver(schema as any),
    mode: "onSubmit"
  });

  const onSubmit = async (data: FormInputData) => {
    const form = new FormData();
    form.append("documentType", data.documentType);
    form.append("file", data.file);

    setIsSubmitting(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/documents/upload`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      );

      reset({ documentType: "", file: undefined });
      if (fileInputRef.current) fileInputRef.current.value = "";
      window.location.reload();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 600 }}
    >
      <Typography variant="h5" fontWeight={600}>
        Загрузка уставных документов
      </Typography>

      <FormControl fullWidth error={!!errors.documentType}>
        <InputLabel>Тип документа</InputLabel>
        <Controller
          name="documentType"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select {...field} label="Тип документа">
              {documentTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.documentType && (
          <Typography variant="caption" color="error">
            {errors.documentType.message}
          </Typography>
        )}
      </FormControl>

      <TextField
        inputRef={fileInputRef}
        type="file"
        fullWidth
        inputProps={{ accept: ".pdf,.jpg,.jpeg,.png" }}
        onChange={e => {
          const file = (e.target as HTMLInputElement).files?.[0];
          setValue("file", file ?? undefined, { shouldValidate: true });
        }}
        error={!!errors.file}
        helperText={
          typeof errors.file?.message === "string"
            ? errors.file.message
            : undefined
        }
      />

      <Button variant="contained" type="submit" disabled={isSubmitting}>
        Загрузить файл
      </Button>
    </Box>
  );
};
