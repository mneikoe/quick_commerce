// CustomDialog.js

import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

export function Modal({ open, handleOpen, title, bodyContent, footerButtons }) {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody>{bodyContent}</DialogBody>
      <DialogFooter>
        {footerButtons.map((btn, index) => (
          <Button
            key={index}
            variant={btn.variant}
            color={btn.color}
            onClick={btn.onClick}
            className={btn.className}
          >
            {btn.label}
          </Button>
        ))}
      </DialogFooter>
    </Dialog>
  );
}
