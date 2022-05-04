import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import { Stack, TextField, InputAdornment, IconButton, Autocomplete, Box } from '@mui/material'
import { Form, FormikHelpers, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
}

const directions: readonly { label: string }[] = [{ label: 'UP' }, { label: 'DOWN' }]

export default function CalculateForm({
  onSubmit,
}: {
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void
}) {
  const schema = Yup.object().shape({
    direction: Yup.string().required('The direction is required'),
    curr_price: Yup.number().required('The current price is required'),
    mul: Yup.number().required('A multiple is required'),
    in_price: Yup.number().required('Investment amount is required'),
    earn_price: Yup.number().required('Earn amount  is required'),
    loss_price: Yup.number().required('Loss amount is required'),
  })

  const formik = useFormik({
    initialValues: {
      direction: '',
      curr_price: '',
      mul: '',
      in_price: '',
      earn_price: '',
      loss_price: '',
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
      <Form autoComplete="false" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ my: 2 }}>
          <Autocomplete
            // fullWidth
            options={directions}
            autoHighlight
            getOptionLabel={(option) => option.label}
            onChange={(e, value) => setFieldValue('direction', value?.label || '')}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Direction"
                {...getFieldProps('direction')}
                error={Boolean(touched.direction && errors.direction)}
                helperText={touched.direction && errors.direction}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />

          {/* <Autocomplete
            // fullWidth
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            onChange={(e, value) => setFieldValue('curr_token', value?.label || '')}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label} ({option.code}) +{option.phone}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Current Token"
                {...getFieldProps('curr_token')}
                // label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
                error={Boolean(touched.curr_token && errors.curr_token)}
                helperText={touched.curr_token && errors.curr_token}
              />
            )}
          /> */}

          <TextField
            fullWidth
            // autoComplete="current-password"
            type={'number'}
            label="Current Price"
            {...getFieldProps('curr_price')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onClearAddressHandler('curr_price')} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.curr_price && errors.curr_price)}
            helperText={touched.curr_price && errors.curr_price}
          />

          <TextField
            fullWidth
            type={'number'}
            label="Multiple"
            {...getFieldProps('mul')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onClearAddressHandler('mul')} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.mul && errors.mul)}
            helperText={touched.mul && errors.mul}
          />
          <TextField
            fullWidth
            type={'number'}
            label="Investment amount"
            {...getFieldProps('in_price')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onClearAddressHandler('in_price')} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.in_price && errors.in_price)}
            helperText={touched.in_price && errors.in_price}
          />
          <TextField
            fullWidth
            type={'number'}
            label="Earn amount"
            {...getFieldProps('earn_price')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onClearAddressHandler('earn_price')} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.earn_price && errors.earn_price)}
            helperText={touched.earn_price && errors.earn_price}
          />
          <TextField
            fullWidth
            type={'number'}
            label="Loss amount"
            {...getFieldProps('loss_price')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onClearAddressHandler('loss_price')} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.loss_price && errors.loss_price)}
            helperText={touched.loss_price && errors.loss_price}
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
          Calculate
        </LoadingButton>
      </Form>
    </FormikProvider>
  )
}
