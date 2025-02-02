// Define a interface para os itens de navegação

export interface NavigationItem {
  name: string;
  href: string;
  current?: boolean; // Campo opcional para indicar se o item é o atual
}

export const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "New User", href: "/registerUsers" },
  { name: "View Users", href: "/viewUsers" },
  { name: "View Database", href: "/viewDatabase" },
  { name: "New", href: "/new" },
];
