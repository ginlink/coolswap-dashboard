import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import { Stack, TextField, InputAdornment, IconButton } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'

export default function CreateTokenForm({ onSubmit }: { onSubmit: (values: any) => void }) {
  const schema = Yup.object().shape({
    chain_id: Yup.string().required('Chain id is required'),
    address: Yup.string().required('Address is required'),
    private_key: Yup.string().required('Private key is required'),
  })

  const formik = useFormik({
    initialValues: {
      chain_id: '',
      address: '',
      private_key: '',
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
            label="Chain id"
            {...getFieldProps('chain_id')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onClearAddressHandler('chain_id')} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.chain_id && errors.chain_id)}
            helperText={touched.chain_id && errors.chain_id}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={'text'}
            label="Address"
            {...getFieldProps('address')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onClearAddressHandler('address')} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={'text'}
            label="Private key"
            {...getFieldProps('private_key')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onClearAddressHandler('private_key')} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.private_key && errors.private_key)}
            helperText={touched.private_key && errors.private_key}
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
          Create
        </LoadingButton>
      </Form>
    </FormikProvider>
  )
}
