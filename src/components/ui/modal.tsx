import React, { useEffect } from 'react';

const Backdrop = (props: { onClose: () => void }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-20 bg-[#000000bf]"
      onClick={props.onClose}
    ></div>
  );
};

const ModalOverlay = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] md:w-[75%] lg:w-[50%] xl:w-[35%] bg-white p-4 pb-7 rounded-xl shadow z-30">
        {' '}
        {props.children}
      </div>
    </div>
  );
};

const Modal = (props: { onClose: () => void; children: React.ReactNode }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <Backdrop onClose={props.onClose} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </>
  );
};

export default Modal;
