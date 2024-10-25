import React from 'react'
import { AlertCircle, CheckCircle, XCircle, InfoIcon } from 'lucide-react'

type AlertType = 'info' | 'success' | 'warning' | 'error'
type AlertSize = 'sm' | 'md' | 'lg'

interface AlertBubbleProps {
  type?: AlertType
  size?: AlertSize
  message: string
  icon?: React.ReactNode
  dismissable?: boolean
  onDismiss?: () => void
  className?: string
}

const getAlertClass = (type: AlertType) => {
  switch (type) {
    case 'info':
      return 'alert-info'
    case 'success':
      return 'alert-success'
    case 'warning':
      return 'alert-warning'
    case 'error':
      return 'alert-error'
    default:
      return 'alert-info'
  }
}

const getAlertIcon = (type: AlertType) => {
  switch (type) {
    case 'info':
      return <InfoIcon className="w-6 h-6" />
    case 'success':
      return <CheckCircle className="w-6 h-6" />
    case 'warning':
      return <AlertCircle className="w-6 h-6" />
    case 'error':
      return <XCircle className="w-6 h-6" />
    default:
      return <InfoIcon className="w-6 h-6" />
  }
}

const getSizeClass = (size: AlertSize) => {
  switch (size) {
    case 'sm':
      return 'text-sm p-2'
    case 'md':
      return 'text-base p-3'
    case 'lg':
      return 'text-lg p-4'
    default:
      return 'text-base p-3'
  }
}

export default function AlertBubble({
  type = 'info',
  size = 'md',
  message,
  icon,
  dismissable = false,
  onDismiss,
  className = '',
}: AlertBubbleProps) {
  const alertClass = getAlertClass(type)
  const sizeClass = getSizeClass(size)
  const defaultIcon = getAlertIcon(type)

  return (
    <div className={`alert ${alertClass} ${sizeClass} ${className}`} role="alert">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {icon || defaultIcon}
          <span>{message}</span>
        </div>
        {dismissable && (
          <button
            onClick={onDismiss}
            className="btn btn-circle btn-ghost btn-sm"
            aria-label="Dismiss alert"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}