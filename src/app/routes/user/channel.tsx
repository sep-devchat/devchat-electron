import { ChatChannel } from '@/app/pages/User/Channel/Channel'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/channel')({
  component: ChatChannel,
})
