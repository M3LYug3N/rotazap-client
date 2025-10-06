import {
  AccountBalanceWalletIcon,
  ArticleIcon,
  AssignmentReturnIcon,
  ContactPageIcon,
  DownloadForOfflineIcon,
  FavoriteIcon,
  ForwardIcon,
  SettingsIcon,
  ShoppingCartIcon,
  SwitchAccountIcon,
  ViewQuiltIcon
} from "@/components/icons";
import { MenuItemConfig } from "@/components/ui/user/type";

export const userMenuItems: MenuItemConfig[] = [
  {
    id: 0,
    href: "/office/basket",
    title: "Корзина",
    disabled: false,
    render: true,
    icon: ShoppingCartIcon
  },
  {
    id: 1,
    href: "/office/orders",
    title: "Заказы",
    disabled: false,
    render: true,
    icon: ViewQuiltIcon
  },
  {
    id: 2,
    href: "/office/refunds",
    title: "Возвраты",
    disabled: false,
    render: false,
    icon: AssignmentReturnIcon
  },

  {
    id: 3,
    href: "/office/favorites",
    title: "Избранное",
    disabled: false,
    render: false,
    icon: FavoriteIcon
  },
  {
    id: 4,
    href: "/office/upload-files",
    title: "Загрузка из файла",
    disabled: false,
    render: false,
    icon: DownloadForOfflineIcon
  },
  {
    id: 5,
    href: "/office/documents",
    title: "Документы",
    disabled: false,
    render: false,
    icon: ArticleIcon
  },
  {
    id: 6,
    href: "/office/documents",
    title: "Уставные документы",
    disabled: false,
    render: false,
    icon: ContactPageIcon
  },
  {
    id: 7,
    href: "/orders/balance",
    title: "Баланс",
    disabled: false,
    render: false,
    icon: AccountBalanceWalletIcon
  },
  {
    id: 8,
    href: "/office/account",
    title: "Учетная запись",
    disabled: false,
    render: true,
    icon: SwitchAccountIcon
  },
  {
    id: 9,
    href: "/office/settings",
    title: "Настройки",
    disabled: false,
    render: false,
    icon: SettingsIcon
  },
  {
    id: 10,
    href: "/",
    title: "На главную",
    disabled: false,
    render: true,
    icon: ForwardIcon
  }
];
