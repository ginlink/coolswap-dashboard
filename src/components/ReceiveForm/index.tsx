import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { Stack, TextField, InputAdornment, IconButton } from '@mui/material'
import { FormikProvider, Form, useFormik } from 'formik'
import DeleteIcon from '@mui/icons-material/Delete'
import { DEFAULT_RECEIVE_AMOUNT } from '@/pages/Token/Receive'
import { t, Trans } from '@lingui/macro'
import React from 'react'

export default function ReceiveForm({ onSubmit }: { onSubmit: (values: any) => void }) {
  const schema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    amount: Yup.number().min(0).max(DEFAULT_RECEIVE_AMOUNT).required('Amount is required'),
  })

  const formik = useFormik({
    initialValues: {
      address: '',
      amount: '',
    },
    validationSchema: schema,
    onSubmit: onSubmit,
  })

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik

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
            label={t`Receive Address`}
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
            label={t`Amount`}
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

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          <Trans>Receive</Trans>
        </LoadingButton>
      </Form>
    </FormikProvider>
  )
}
