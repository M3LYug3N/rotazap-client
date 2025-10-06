"use client";

import Link from "next/link";
import { KeyboardEvent, MouseEvent, useState } from "react";

import { StyledDrawer } from "@/components/styled/StyledDrawer";
import { DrawerButton } from "@/components/ui/drawer/DrawerButton";
import { navLinks } from "@/components/ui/drawer/drawerMenuItems";
import { MenuItem } from "@/components/ui/drawer/type";
import { Anchor } from "@/components/ui/user/type";

import { useCurrentPath } from "@/hooks/useCurrentPath";

import styles from "@/styles/components/ui/drawer/Drawer.module.css";

export const DrawerComponent = () => {
  const pathname = useCurrentPath();
  const [state, setState] = useState({ left: false });

  const toggleDrawer =
    (anchor: Anchor) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(prevState => ({ ...prevState, [anchor]: !prevState[anchor] }));
    };

  const renderMenuItems = (
    items: MenuItem[],
    additionalClasses = "",
    isInfoSection = false
  ) =>
    items.map(item => (
      <li className={styles.drawerListItem} key={item.title}>
        <Link
          className={`${styles.drawerLinkBase} ${isInfoSection ? styles.drawerLinkInfo : styles.drawerLink} ${
            pathname === item.path ? styles.activeLink : ""
          } ${additionalClasses}`}
          itemProp="url"
          href={item.path}
          target={item.target || "_self"}
        >
          <item.icon fontSize="medium" />
          <p
            itemProp="name"
            className={
              isInfoSection
                ? styles.drawerListItemTextInfo
                : styles.drawerListItemText
            }
          >
            {item.title}
          </p>
        </Link>
      </li>
    ));

  const list = (anchor: Anchor) => (
    <nav
      className={styles.navigation}
      role="presentation"
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
      onClick={toggleDrawer(anchor)}
      onKeyDown={toggleDrawer(anchor)}
    >
      <ul className={styles.drawerList}>
        {renderMenuItems(navLinks.filter(item => item.id >= 0 && item.id <= 4))}
        <hr className="my-2 h-px w-full text-white" />
        {renderMenuItems(navLinks.filter(item => item.id >= 5 && item.id <= 7))}
        <hr className="my-2 h-px w-full text-white" />
        {renderMenuItems(
          navLinks.filter(item => item.id >= 8 && item.id <= 10),
          "",
          true
        )}
      </ul>
    </nav>
  );

  return (
    <>
      <DrawerButton onClick={toggleDrawer("left")} />
      <StyledDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer("left")}
      >
        {list("left")}
      </StyledDrawer>
    </>
  );
};
