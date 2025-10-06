"use client";

import Image from "next/image";

import { ModalComponent } from "@/components/ui/modal/ModalComponent";

interface ModalImageProps {
  imageUrl: string;
  open: boolean;
  onClose: () => void;
}

export const ModalImage = ({ imageUrl, open, onClose }: ModalImageProps) => (
  <ModalComponent open={open} onClose={onClose}>
    <Image
      src={imageUrl}
      alt="Изображение детали"
      width={400}
      height={400}
      className="rounded border object-contain"
      placeholder="blur"
      blurDataURL="/img/no-image.png"
    />
  </ModalComponent>
);
