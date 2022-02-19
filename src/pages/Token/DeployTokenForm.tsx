import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import { Stack, TextField, InputAdornment, IconButton, Checkbox, Typography } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'

export default function DeployTokenForm({ onSubmit }: { onSubmit: (values: any) => void }) {
  const schema = Yup.object().shape({
    name: Yup.string().min(1).max(256).required('Name is required'),
    symbol: Yup.string().min(1).max(11).required('Symbol is required'),
    decimals: Yup.number().min(1).max(256).required('Decimals is required'),
    total: Yup.string().required('Total amount is required'),
    checked: Yup.boolean(),
  })

  const formikInputs = React.useMemo(
    () => ({
      initialValues: {
        name: '',
        symbol: '',
        decimals: undefined,
        total: undefined,
        checked: true,
      },
      validationSchema: schema,
      onSubmit: onSubmit,
    }),
    [onSubmit, schema]
  )
  const formik = useFormik(formikInputs)

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue, isValid } = React.useMemo(
    () => formik,
    [formik]
  )

  const onClearAddressHandler = React.useCallback(
    (key: string) => {
      setFieldValue(key, '')
    },
    [setFieldValue]
  )

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ my: 2 }}>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={'text'}
            label="name"
            {...getFieldProps('name')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onClearAddressHandler('name')} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={'text'}
            label="symbol"
            {...getFieldProps('symbol')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onClearAddressHandler('symbol')} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.symbol && errors.symbol)}
            helperText={touched.symbol && errors.symbol}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={'number'}
            label="decimals"
            {...getFieldProps('decimals')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onClearAddressHandler('decimals')} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.decimals && errors.decimals)}
            helperText={touched.decimals && errors.decimals}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={'number'}
            label="total amount"
            {...getFieldProps('total')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onClearAddressHandler('total')} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.total && errors.total)}
            helperText={touched.total && errors.total}
          />

          <Stack direction={'row'} alignItems={'center'}>
            <Checkbox defaultChecked {...getFieldProps('checked')} />

            <Typography>Whether to join the List?</Typography>
          </Stack>
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
