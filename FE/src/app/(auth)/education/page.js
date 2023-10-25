import { EducationForm, LayoutAuth } from '@/components/pages/auth'

export default function Buisness() {
  return (
    <LayoutAuth step={1}>
      <EducationForm />
    </LayoutAuth>
  )
}
