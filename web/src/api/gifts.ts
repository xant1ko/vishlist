export interface Gift {
  id: string
  name: string
  description: string
  links: string[]
  is_reserved: boolean
  created_at: string
  updated_at: string
}

export interface GiftFormData {
  name: string
  description: string
  links: string[]
}
