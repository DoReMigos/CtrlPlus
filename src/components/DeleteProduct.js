import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { deleteProduct} from "../databaseAdapter";

export async function DeleteProduct({productId}){
    const navigate = useNavigate()
    async function deleteMyRoutine() {
        const tokens = localStorage.getItem("token");
        const erase = await deleteProduct(tokens, productId);
        navigate("/Store");
        return erase;
      }
    return (
        <button
        onClick={() => {
          deleteMyRoutine();
        }}
        type="button"
        id="deletePostButton"
        className="btn btn-dark">
        Delete Routine
      </button>
    )
}
