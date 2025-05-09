export type AlertType = 'primary' | 'success' | 'info' | 'warning' | 'danger'

export interface AlertProps {
  type?: AlertType
  closed?: boolean
}
