import { ActionItem } from '.'
import { ActionState } from './types'

export const actions: ActionItem[] = [
  { action: ActionState.RECEIVE, icon: 'akar-icons:gift', title: 'Receive token', color: '#00bcd4' },
  { action: ActionState.SEND, icon: 'carbon:send-alt', title: 'Send token' },
  { action: ActionState.DELETE, icon: 'fluent:delete-28-regular', title: 'Delete', color: '#FF4842' },
  { action: ActionState.ADD_TO_METAMASK, icon: 'ant-design:plus-circle-outlined', title: 'Add to Metamask' },
]
