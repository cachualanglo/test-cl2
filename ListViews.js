import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
const All = (props) => {
    const { data } = props;
    const [yourName, setYourName] = useState("");
    const [listUser, setListUser] = useState(data);
    const [textButton, setTextButton] = useState("create");
    const [isCreate, setIsCreated] = useState(true);
    const [idUserUpdated, setIdUserUpdated] = useState("");
    const handleInputChange = (event) => {
        setYourName(event.target.value);
    }

    const handleCreateNewUser = (event) => {
        event.preventDefault()

        setListUser([...listUser, {
            id: uuidv4(),
            name: yourName
        }]);
        setYourName("");
        setIsCreated(true);
    };
    const deleteUser = (event) => {
        const idUserDelete = event.target.id;
        const listUserAfterDeleted = listUser.filter(item => {
            return item.id !== idUserDelete;
        });
        setListUser(listUserAfterDeleted);
        setIsCreated(true);
    }

    const updateUser = (event) => {
        const idUserUpdate = event.target.id;
        const { id, name } = listUser.find(item => {
            return item.id === idUserUpdate;
        })
        setYourName(name);
        setTextButton("update");
        setIdUserUpdated(id);
        setIsCreated(false);

    }

    const handleClickUpdateUser = (event) => {
        event.preventDefault()
        const users = listUser.map(user => {
            if (user.id === idUserUpdated) {
                user.name = yourName;
            }
            return user;
        })
        setListUser(users);
        setYourName("");
        setIsCreated(true);
        setTextButton("create");


    }


    return (
        <div>
            <ul>
                {listUser.map(item => {
                    return (
                        <li key={item.id} className="mb-2">

                            <h4>{item.name}</h4>
                            <button type="submit" className="ml-4 btn btn-sm btn-outline-danger" id={item.id} onClick={updateUser}>update User</button>
                            <button type="submit" className="ml-4 btn btn-sm btn-outline-primary" id={item.id} onClick={deleteUser}>delete User</button>

                        </li>

                    )
                })}
            </ul>
            <div>
                <form className="container mb-4 mt-4">
                    <div className="form-group">
                        <input type="text" className="form-control" id="exampleInputEmail12" aria-describedby="emailHelp" placeholder="inter your name" value={yourName} onChange={handleInputChange} ></input>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={isCreate ? handleCreateNewUser : handleClickUpdateUser}>{textButton}</button>
                </form>
            </div>
        </div>
    )
}

export default All