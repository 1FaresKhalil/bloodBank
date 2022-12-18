import ReactDom from "react-dom";

const Backdrop = (props) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-20 bg-[#000000bf]"
      onClick={props.onClose}
    ></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div>
      <div className="fixed top-[20vh] md:top-[15vh] left-[5%] md:left-[12%] lg:left-[25%] xl:left-[33%]  w-[90%] md:w-[75%] lg:w-[50%] xl:w-[35%] bg-white p-4 pb-7 rounded-xl shadow z-30">
        {" "}
        {props.children}
      </div>
    </div>
  );
};
const elementPortal = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onClose={props.onClose} />,
        elementPortal
      )}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        elementPortal
      )}
    </>
  );
};

export default Modal;
