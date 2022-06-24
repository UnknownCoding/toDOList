import React from 'react';
import {FaEdit,FaTrash} from "react-icons/fa";

const Lists = ({items,removeItem,editItem}) => {
    return (
        <div className='container'>
            {items.map((item)=>{
                const {id,title} = item
                return(
                    <ul className='list-group list-group-flush' keys={id}>
                        <li className='list-group-item d-flex justify-content-between allign-items-center'>
                            {title}
                            <div style={{float: "right"}}>
                                <button type="button" className='edit-btn' onClick={()=>{
                                    editItem(id) 
                                }}>
                                    <FaEdit/>
                                </button>
                                <button type="button" className='remove-btn' onClick={()=>{
                                    removeItem(id) 
                                }}>
                                    <FaTrash/>
                                </button>
                            </div>
                        </li>
                    </ul>
                )
            })}
        </div>
    )
}

export default Lists