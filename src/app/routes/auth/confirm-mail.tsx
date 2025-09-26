import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/confirm-mail')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/confirm-mail"!</div>
}
