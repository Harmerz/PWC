import { BuisnessFrom, LayoutAuth } from '@/components/pages/auth'

export default function Buisness() {
  return (
    <LayoutAuth step={2}>
      <BuisnessFrom />
    </LayoutAuth>
  )
}
