import classNames from "classnames/dedupe";
import React from "react";

import { Modal } from "./";

export default {
  title: "common/Modal",
  component: Modal
};

export const WithCloseButton = () => {
  return (
    <Modal isOpen={true} size="lg" title="Custom Title" onClose={console.log}>
      <>
        <div>This is a modal&apos;s body</div>
      </>
    </Modal>
  );
};

export const WithCustomTitle = () => {
  const className = classNames(
    `bg-red text-white flex justify-between items-center pl-6 pr-2 font-bold`,
    "py-4 text-2xl"
  );
  return (
    <Modal
      isOpen={true}
      size="lg"
      title="Custom Title"
      ModalTitle={({ children, ...props }) => (
        <div {...props} className={className}>
          {children}
        </div>
      )}
    >
      <>
        <div>This is a modal&apos;s body</div>
      </>
    </Modal>
  );
};

export const WithCustomContent = () => {
  const className = classNames(
    `bg-brown-300 text-white flex justify-between items-center pl-6 pr-2 font-bold`,
    "py-4 text-2xl"
  );
  return (
    <Modal
      isOpen={true}
      size="lg"
      title="Custom Content 👇🏻"
      ModalContent={({ children, ...props }) => (
        <div {...props} className={className}>
          {children}
        </div>
      )}
    >
      <>
        <div>This is a modal&apos;s body with a custom component</div>
      </>
    </Modal>
  );
};

export const WithCustomOverlay = () => {
  const className = classNames(
    "modal-overlay absolute w-full h-full bg-gray-900 opacity-50 bg-brown-200"
  );
  return (
    <Modal
      isOpen={true}
      size="lg"
      title="Custom Overlay"
      ModalOverlay={({ children, ...props }) => (
        <div {...props} className={className}>
          {children}
        </div>
      )}
    >
      <>
        <div>This is a modal&apos;s body</div>
      </>
    </Modal>
  );
};

export const WithCustomContainer = () => {
  const className = classNames(
    `modal-container bg-white w-11/12 md:max-w-lg mx-auto my-4 rounded shadow-lg z-50 max-h-full overflow-y-auto`,
    "border-2 border-red rounded"
  );
  return (
    <Modal
      isOpen={true}
      size="lg"
      title="Custom Container"
      ModalContainer={({ children, ...props }) => (
        <div {...props} className={className}>
          {children}
        </div>
      )}
    >
      <>
        <div>This is a modal&apos;s body</div>
      </>
    </Modal>
  );
};

export const FullSize = () => {
  return (
    <Modal isOpen={true} size="full" title="Full Size">
      <>
        <div>This is a modal&apos;s body</div>
      </>
    </Modal>
  );
};

export const MaxSize = () => {
  return (
    <Modal isOpen={true} size="max" title="Max Size">
      <>
        <div>This is a modal&apos;s body</div>
      </>
    </Modal>
  );
};
