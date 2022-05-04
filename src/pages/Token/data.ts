import { ActionItem } from '.'
import { ActionState } from './types'
import { t } from '@lingui/macro'

export const actions: ActionItem[] = [
  { action: ActionState.RECEIVE, icon: 'akar-icons:gift', title: t`Receive token`, color: '#00bcd4' },
  { action: ActionState.SEND, icon: 'carbon:send-alt', title: t`Send token` },
  { action: ActionState.DELETE, icon: 'fluent:delete-28-regular', title: t`Delete`, color: '#FF4842' },
  { action: ActionState.ADD_TO_METAMASK, icon: 'ant-design:plus-circle-outlined', title: t`Add to Metamask` },
]
