import { LayoutAuth, PhotoForm } from '@/components/pages/auth'

export default function signin() {
  return (
    <LayoutAuth step={3}>
      <PhotoForm />
    </LayoutAuth>
  )
}
