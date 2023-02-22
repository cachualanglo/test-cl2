import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
const Active = (props) => {
    const { data } = props;
    const [listUser, setListUser] = useState(data); // dữ liệu user của mình
    const [inputCreateUser, setInputCreateUser] = useState(""); // dữ liệu của input tạo user
    const [idUserUpdated, setIdUserUpdated] = useState(""); // để lưu trữ id của user cần update

    const [inputUpdateUser, setInputUpdateUser] = useState(""); // dữ liệu của input cập nhật user

    const [isUpdated, setUpdated] = useState(false);  // pop up hiển thị form để cập nhật

    const handleInputFormCreateChange = (event) => {
        setInputCreateUser(event.target.value);
    }

    const handleCreateNewUser = (event) => {
        event.preventDefault();

        setListUser([...listUser, {
            id: uuidv4(),
            name: inputCreateUser
        }]);
        setInputCreateUser("");
    };
    const deleteUser = (event) => {
        const idUserDelete = event.target.id;
        const listUserAfterDeleted = listUser.filter(item => {
            return item.id !== idUserDelete;
        });
        setListUser(listUserAfterDeleted);
    }

    const updateUser = (event) => {
        setUpdated(!isUpdated);
        const idUserUpdate = event.target.id;
        const { id, name } = listUser.find(item => {
            
            return item.id === idUserUpdate;
        })

        setInputUpdateUser(name);
        setIdUserUpdated(id);
    }

    const onChangeInputUpdate = (event) => {
        setInputUpdateUser(event.target.value)
    }
    const handleClickUpdateUser = (event) => {
        event.preventDefault();
        const users = listUser.map(user => {
            if (user.id === idUserUpdated) {
                user.name = inputUpdateUser;
            }
            return user;
        })
        setListUser(users);
        setInputUpdateUser("");
        setUpdated(!isUpdated);
    }


    return (
        <div>
            <div className=''>
                <div className=''>
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
                </div>
                {isUpdated && (
                    <div style={{border: "5px solid #333"}} className='form'>
                        <h4>form update user</h4>
                        <form className="form-group mx-sm-3 mb-2">
                            <input type="text" className="form-control" id="exampleInputEmail12" aria-describedby="emailHelp" value={inputUpdateUser} onChange={onChangeInputUpdate}></input>
                            <button type="submit" className="btn btn-primary" onClick={handleClickUpdateUser}>update</button>
                        </form>
                    </div>
                )}
            </div>
            <br /><br />
            <div style={{border: "5px solid #333"}}>
                <h3>form create user</h3>
                <form className="form">
                    <div className="form-group mx-sm-3 mb-2">
                        <input type="text" className="form-control" id="exampleInputEmail12" aria-describedby="emailHelp" placeholder="inter your name" value={inputCreateUser} onChange={handleInputFormCreateChange} ></input>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleCreateNewUser}>Create user</button>
                </form>
            </div>
        </div>
    )
}

export default Active