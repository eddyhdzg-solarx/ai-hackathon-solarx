interface Address {
  address: string
  description: string
  lat: number
  lng: number
  title: string
}

export const antler: Address = {
  lat: 29.72629218156454,
  lng: -98.07836188794084,
  address: "522 Congress Ave. #400, Austin, TX 78701",
  title: "Get solar data for Antler 🤘🏻",
  description: "Antler VC office in Austin, TX"
}

export const bucees: Address = {
  address: "4155 N General Bruce Dr, Temple, TX 76501",
  title: "Get solar data for Buc-ee's 🦫",
  lat: 29.72629218156454,
  lng: -98.07836188794084,
  description: "Bucee"
}
