export interface Gift {
  id: string
  name: string
  description: string
  links: string[]
  created_at: string
  updated_at: string
}

export interface GiftFormData {
  name: string
  description: string
  links: string[]
}
