export interface Wilaya {
  id: string
  name: string
  code: string
  member_count: number
  moughataas: Moughataa[]
  is_active: boolean
  coordinates?: [number, number]
}

export interface Moughataa {
  id: string
  name: string
  wilaya_id: string
  wilaya_name: string
  member_count: number
  sections: Section[]
  is_active: boolean
}

export interface Section {
  id: string
  name: string
  moughataa_id: string
  member_count: number
  units: Unit[]
  is_complete: boolean
}

export interface Unit {
  id: string
  name: string
  section_id: string
  member_count: number
  required_count: number
  is_complete: boolean
  leader?: {
    id: string
    full_name: string
    phone: string
  }
}

export interface OrganizationStats {
  total_wilayas: number
  active_wilayas: number
  total_moughataas: number
  total_sections: number
  total_units: number
  complete_units: number
  completion_rate: number
}
