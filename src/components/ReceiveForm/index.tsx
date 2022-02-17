import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Stack, TextField, InputAdornment, IconButton } from '@mui/material'
import { FormikProvider, Form, useFormik } from 'formik'
import DeleteIcon from '@mui/icons-material/Delete'
import React from 'react'

export default function ReceiveForm({ onSubmit }: { onSubmit: (values: any) => void }) {
  const LoginSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
  })

  const formik = useFormik({
    initialValues: {
      address: '',
    },
    validationSchema: LoginSchema,
    onSubmit: onSubmit,
  })

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik

  const onClearAddressHandler = () => {
    setFieldValue('address', '')
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ my: 2 }}>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={'text'}
            label="Receive Address"
            {...getFieldProps('address')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onClearAddressHandler} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
          />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Receive
        </LoadingButton>
      </Form>
    </FormikProvider>
  )
}
