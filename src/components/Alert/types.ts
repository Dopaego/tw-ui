export type AlertType = 'primary' | 'success' | 'info' | 'warning' | 'danger'
export type AlertEffect = 'light' | 'dark'
export interface AlertProps {
  type?: AlertType
  closed?: boolean
  effect?: AlertEffect
  show?: boolean
}
