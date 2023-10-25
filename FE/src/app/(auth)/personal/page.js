import { LayoutAuth, PersonalForm } from '@/components/pages/auth'

export default function signin() {
  return (
    <LayoutAuth step={0}>
      <PersonalForm />
    </LayoutAuth>
  )
}
