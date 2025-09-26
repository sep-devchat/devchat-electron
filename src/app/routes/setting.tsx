import { createFileRoute } from '@tanstack/react-router'
import { SettingPage } from '../pages/Setting'

export const Route = createFileRoute('/setting')({
  component: SettingPage,
})
