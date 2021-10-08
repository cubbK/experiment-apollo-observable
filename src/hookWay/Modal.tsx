import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ModalSlice from "./modalSlice";

export default function Modal() {
  // @ts-ignore
  const modalState = useSelector((state) => state.modal.value);

  const dispatch = useDispatch();
  if (modalState === "OPEN") {
    return (
      <div>
        Modal!!!
        <button onClick={() => dispatch(ModalSlice.close())}>
          Close modal and continue to fetch
        </button>
      </div>
    );
  }
  return null;
}
