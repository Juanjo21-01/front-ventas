import AlertBubble from './alert-bubble'
import { Bell } from 'lucide-react'

export default function AlertBubbleDemo() {
  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Alert Bubble Demo</h1>

      <AlertBubble
        type="type"
        message="This is an informational alert."
      />

      <AlertBubble
        type="success"
        message="Your action was successful!"
        size="lg"
      />

      <AlertBubble
        type="warning"
        message="Be careful with this action."
        size="sm"
      />

      <AlertBubble
        type="error"
        message="An error occurred. Please try again."
        dismissable
        onDismiss={() => console.log('Alert dismissed')}
      />

      <AlertBubble
        type="info"
        message="Custom icon alert"
        icon={<Bell className="w-6 h-6" />}
      />

      <AlertBubble
        type="success"
        message="Custom styled alert"
        className="bg-gradient-to-r from-green-400 to-blue-500 text-white"
      />
    </div>
  )
}