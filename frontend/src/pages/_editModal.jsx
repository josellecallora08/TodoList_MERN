import React, { useEffect, useState } from 'react'


const _editModal = ({error,handlerID, seteditName, closeModal,editTask,seteditDescription,editName,editDescription}) => {

    const [currData, setcurrData] = useState({});

    useEffect(() => {
        setcurrData(handlerID)
    }, [handlerID])
    
  return (
       <div id='edit-main'>
       <div className="edit-container">
            <div className="edit-wrapper">
                <div className="title">
                    <h1>EDIT TASK</h1>
                    <button onClick={closeModal}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="edit-content">
                    <div className="input-field">
                        <input type="text"
                        placeholder={currData.Name}
                        onChange={(e) => seteditName(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <input type="text"
                        placeholder={currData.Description}
                        onChange={(e) => seteditDescription(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <button  onClick={() => editTask(currData)}>
                            <i className="fa-solid fa-pen-to-square"></i>
                            <span>Update</span>
                        </button>
                    </div>
                </div>
            </div>
       </div>
    </div>
  )
}

export default _editModal