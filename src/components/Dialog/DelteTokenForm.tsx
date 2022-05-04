import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import { Stack, TextField, InputAdornment, IconButton } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import { t, Trans } from '@lingui/macro'
import React from 'react'

export default function DeleteTokenForm({ onSubmit }: { onSubmit: (values: any) => void }) {
  const schema = Yup.object().shape({
    private_key: Yup.string().required(t`Private key is required`),
  })

  const formik = useFormik({
    initialValues: {
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
            label={t`Private key`}
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
          <Trans>Delete</Trans>
        </LoadingButton>
      </Form>
    </FormikProvider>
  )
}
