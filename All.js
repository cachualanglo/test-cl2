import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { works } from './../TestData';
const All = (props) => {
    const { data } = props;
    const [yourWork, setYourWork] = useState("");
    const [listWork, setListWork] = useState(data);
    const [textButton, setTextButton] = useState("create");
    const [isCreate, setIsCreated] = useState(true);
    const [idWorkUpdated, setIdWorkUpdated] = useState("");
    const handleInputChange = (event) => {
        setYourWork(event.target.value);
    }
    const handleCreateNewWork = (event) => {
        event.preventDefault()

        setListWork([...listWork, {
            id: uuidv4(),
            name: yourWork
        }]);
        setYourWork("");
        setIsCreated(true);
    };
    const deleteWork = (event) => {
        const idWorkDelete = event.target.id;
        const listWorkAfterDeleted = listWork.filter(item => {
            return item.id !== idWorkDelete;
        });
        setListWork(listWorkAfterDeleted);
        setIsCreated(true);
    }
    const updateWork = (event) => {
        const idWorkUpdate = event.target.id;
        const { id, name } = listWork.find(item => {
            return item.id === idWorkUpdate;
        })
        setYourWork(name);
        setTextButton("update");
        setIdWorkUpdated(id);
        setIsCreated(false);
    }
    const handleClickUpdateWork = (event) => {
        event.preventDefault()
        const works = listWork.map(user => {
            if (works.id === idWorkUpdated) {
                works.name = yourWork;
            }
            return works;
        })
        setListWork(works);
        setYourWork("");
        setIsCreated(true);
        setTextButton("create");
    }
    return (
        <div><div>All</div>
            <ul>
                {listWork.map(item => {
                    return (
                        <li key={item.id} className="mb-2">

                            <h4>{item.name}</h4>
                            <button type="submit" className="ml-4 btn btn-sm btn-outline-danger" id={item.id} onClick={updateWork}>Add</button>
                            <button type="submit" className="ml-4 btn btn-sm btn-outline-primary" id={item.id} onClick={deleteWork}>Delete</button>

                        </li>

                    )
                })}
            </ul>
            <div>
                <form className="container mb-4 mt-4">
                    <div className="form-group">
                        <input type="text" className="form-control" id="exampleInputEmail12" aria-describedby="emailHelp" placeholder="Write here" value={yourWork} onChange={handleInputChange} ></input>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={isCreate ? handleCreateNewWork : handleClickUpdateWork}>{textButton}</button>
                </form>
            </div>
        </div>
    )
}

export default All