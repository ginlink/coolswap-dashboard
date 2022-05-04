import { Card, Grid, Stack } from '@mui/material'
import { useTheme } from '@mui/system'
import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import CalculateForm, { Direction } from './CalculateForm'
import DatePanel from './DatePanel'
import { t, Trans } from '@lingui/macro'

type CalcData = {
  stop_loss_price?: BigNumber
  stop_earn_price?: BigNumber
  flat_price?: BigNumber
  earned?: BigNumber
  loss_rate0?: BigNumber
  loss_rate1?: BigNumber
  loss_rate1_price?: BigNumber
  earn_rate0?: BigNumber
  earn_rate1?: BigNumber
  earn_rate1_price?: BigNumber
}

const Wrapper = styled.div``

export default function Calculator() {
  const [calcDate, setCalcDate] = useState<CalcData>({})

  const theme = useTheme()

  return (
    <Wrapper>
      <Card
        sx={{
          p: {
            xs: '24px',
            sm: '24px',
          },
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              [theme.breakpoints.up('sm')]: {
                borderRight: `1px solid ${theme.palette.grey[500_32]}`,
              },
              pr: {
                sm: '60px',
              },
            }}
          >
            <CalculateForm
              onSubmit={function (values: any, helper): void {
                const { curr_price, mul, in_price, earn_price, loss_price, direction } = values

                const loss_rate0 = new BigNumber(loss_price / in_price)
                const loss_rate1 = new BigNumber(loss_price / in_price / mul)
                const loss_rate1_price = loss_rate1.multipliedBy(curr_price)
                const earn_rate0 = new BigNumber(earn_price / in_price)
                const earn_rate1 = new BigNumber(earn_price / in_price / mul)
                const earn_rate1_price = earn_rate1.multipliedBy(curr_price)

                let stop_loss_price: BigNumber | undefined
                let stop_earn_price: BigNumber | undefined
                let flat_price: BigNumber | undefined
                let earned: BigNumber | undefined

                if (direction == Direction.UP) {
                  stop_loss_price = new BigNumber(curr_price).minus(loss_rate1.times(curr_price))
                  stop_earn_price = new BigNumber(curr_price).plus(earn_rate1.times(curr_price))
                  flat_price = new BigNumber(curr_price - curr_price * Number(1 / mul))
                  earned = new BigNumber(earn_price)
                } else if (direction == Direction.DOWN) {
                  stop_loss_price = new BigNumber(curr_price).plus(loss_rate1.times(curr_price))
                  stop_earn_price = new BigNumber(curr_price).minus(earn_rate1.times(curr_price))
                  flat_price = new BigNumber(curr_price + curr_price * Number(1 / mul))
                  earned = new BigNumber(earn_price)
                }

                setCalcDate({
                  stop_loss_price,
                  stop_earn_price,
                  flat_price,
                  earned,
                  loss_rate0: loss_rate0.times(100),
                  loss_rate1: loss_rate1.times(100),
                  loss_rate1_price,
                  earn_rate0: earn_rate0.times(100),
                  earn_rate1: earn_rate1.times(100),
                  earn_rate1_price,
                })

                helper.setSubmitting(false)
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              mt: {
                xs: '24px',
                sm: 0,
              },
              pl: {
                sm: '60px',
              },
            }}
          >
            <Stack spacing={2}>
              <DatePanel
                label={<Trans>Stop price</Trans>}
                value={calcDate.stop_loss_price?.toFixed()}
                rate0={calcDate.loss_rate0?.toFixed(2)}
                rate1={calcDate.loss_rate1?.toFixed(2)}
                rate1_price={calcDate.loss_rate1_price?.toFixed()}
              />
              <DatePanel
                label={<Trans>Profit stop price</Trans>}
                value={calcDate.stop_earn_price?.toFixed()}
                rate0={calcDate.earn_rate0?.toFixed(2)}
                rate1={calcDate.earn_rate1?.toFixed(2)}
                rate1_price={calcDate.earn_rate1_price?.toFixed()}
              />
              <DatePanel label={<Trans>Flat price</Trans>} value={calcDate.flat_price?.toFixed()} />
              <DatePanel label={<Trans>Profit</Trans>} value={calcDate.earned?.toFixed()} />
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Wrapper>
  )
}
