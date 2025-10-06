import {
  DonutSmallIcon,
  HomeIcon,
  ImportContactsIcon,
  LiveHelpIcon,
  LocalShippingIcon,
  LocationOnIcon,
  MailIcon,
  PeopleAltIcon,
  PhoneIcon,
  SyncIcon,
  WorkspacePremiumIcon
} from "@/components/icons";
import { MenuItem } from "@/components/ui/drawer/type";

export const navLinks: MenuItem[] = [
  { id: 0, title: "Главная", path: "/", icon: HomeIcon },
  {
    id: 1,
    title: "О компании",
    path: "/info/about-company",
    icon: ImportContactsIcon
  },
  {
    id: 2,
    title: "Поставщикам",
    path: "/info/provider",
    icon: DonutSmallIcon
  },
  {
    id: 3,
    title: "Оптовым покупателям",
    path: "/info/wholesale",
    icon: PeopleAltIcon
  },
  {
    id: 4,
    title: "Контакты",
    path: "/info/contacts",
    icon: LiveHelpIcon
  },
  {
    id: 5,
    title: "Доставка",
    path: "/info/delivery",
    icon: LocalShippingIcon
  },
  {
    id: 6,
    title: "Гарантия и возврат",
    path: "/info/warranty-refund",
    icon: WorkspacePremiumIcon
  },
  {
    id: 7,
    title: "ЭДО",
    path: "/info/workflow",
    icon: SyncIcon
  },
  {
    id: 8,
    title: "+7(499)678-99-33",
    path: "tel:74996789933",
    icon: PhoneIcon
  },
  {
    id: 9,
    title: "info@rotazap.ru",
    path: "mailto:info@rotazap.ru",
    icon: MailIcon
  },
  {
    id: 10,
    title: "141068, М.О., г.Королев,  мкр.Текстильщик, ул.Южная, д.3",
    path: "https://yandex.ru/maps/-/CCUG56vKPD",
    target: "__blank",
    icon: LocationOnIcon
  }
];
