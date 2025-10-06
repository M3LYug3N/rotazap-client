"use client";

import { ReactNode } from "react";

import { ExpandMoreIcon } from "@/components/icons";
import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary
} from "@/components/styled/StyledAccordion";

import styles from "@/styles/components/ui/accordion/AccordionComponent.module.css";

interface AccordionComponentProps {
  title: string;
  children: ReactNode;
  level?: "main" | "nested";
}

export const AccordionComponent = ({
  title,
  children,
  level = "main"
}: AccordionComponentProps) => {
  const HeadingTag = level === "main" ? "h3" : "h4";
  const titleStyle = level === "main" ? styles.title : styles.titleNested;

  return (
    <StyledAccordion>
      <StyledAccordionDetails
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        className={styles.title}
      >
        <HeadingTag className={titleStyle}>{title}</HeadingTag>
      </StyledAccordionDetails>
      <StyledAccordionSummary>{children}</StyledAccordionSummary>
    </StyledAccordion>
  );
};
