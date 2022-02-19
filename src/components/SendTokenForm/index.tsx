import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import { Stack, TextField, InputAdornment, IconButton } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'

export default function SendTokenForm({ onSubmit }: { onSubmit: (values: any) => void }) {
  const schema = Yup.object().shape({
    amount: Yup.string().required('Amount key is required'),
  })

  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    validationSchema: schema,
    onSubmit: onSubmit,
  })

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue, isValid } = formik

  const onClearAddressHandler = (key: string) => {
    setFieldValue(key, '')
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ my: 2 }}>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={'text'}
            label="Send Amount"
            {...getFieldProps('amount')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onClearAddressHandler('amount')} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.amount && errors.amount)}
            helperText={touched.amount && errors.amount}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={!isValid}
        >
          Send
        </LoadingButton>
      </Form>
    </FormikProvider>
  )
}
