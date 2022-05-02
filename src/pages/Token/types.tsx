import { ReactNode } from 'react'

export enum ActionState {
  RECEIVE,
  EDIT,
  SEND,
  DELETE,
  ADD_TO_METAMASK,
}

export type ActionItem = {
  icon: string
  action: ActionState
  title?: ReactNode | undefined
  color?: string
}
