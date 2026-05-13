export interface NavLink {
  name: string;
  path: string;
}

export const navigationLinks: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Pricing", path: "/pricing" },
  { name: "Members", path: "/members" },
  { name: "Contact", path: "/contact" },
  { name: "Studio", path: "/studio" },
  { name: "Console", path: "/dashboard" },
];
