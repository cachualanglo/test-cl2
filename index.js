import React, {useState,useEffect,useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Main(){
    const getData = localStorage.getItem("listJobs");
    const [job,setJob] = useState("");
    const [listJobs,setListJobs] = useState(getData!=null?JSON.parse(getData):[]);
    const [showState,setShowState] = useState(false);
    const [countUnfinished,setCountUnfinished] = useState(0);
    const [showUnfinished,setShowUnfinished] = useState(false);
    const addJob = (e) =>{
        let deadline = document.getElementsByName("date")[0].value;
        let id = new Date().getTime();
        let TimeRemaining;
        if(deadline!==""){
          TimeRemaining = Math.ceil((new Date(deadline) - new Date()) / (24*60*60*1000));
        } 
        else TimeRemaining = "No deadline";
        console.log(id);
        let newJob = {id:id,job:job,deadline:deadline,TimeRemaining:TimeRemaining,isDone:false};
        const newList = [...listJobs,newJob];
        localStorage.setItem("listJobs",JSON.stringify(newList));
        setListJobs(newList);
    }
    const jobDone = (id) =>{
        const newList = listJobs.map((item)=>{
          if(item.id===id){
            item.isDone = !item.isDone;
          }
          return item;
        })
        localStorage.setItem("listJobs",JSON.stringify(newList));
        setListJobs(newList);
    }
    const deleteJob = (id) =>{
        const newList = listJobs.filter((item)=>{
          return item.id!==id;
        })
        localStorage.setItem("listJobs",JSON.stringify(newList));
        setListJobs(newList);
    }
    const countUnfinishedJobs = () =>{
        const count = listJobs.filter((item)=>{
          return item.isDone===false;
        })
        setCountUnfinished(count.length);
    }
    return(
        <div className='mainContainer'>
          <form className='form'> 
              <input type="text" placeholder="Write Job" onChange={(e)=>{setJob(e.target.value)}}/>
              <button type="submit" onClick={()=>{addJob()}}>+</button>
          </form>
          <div className='function'>
            <div> <input type="checkBox" onClick={()=>{setShowState(!showState);countUnfinishedJobs();}}/> Check state </div>
            <div> <input type="checkBox" onClick={()=>{setShowUnfinished(!showUnfinished)}}/> Show unfinished only </div>
          </div>
          {showState&&<div className="countUnfinishedJobs">Unfinished jobs: {countUnfinished}</div>}
          <div className='listJobsContainer'>
                <ul>
                  {listJobs.map((item,index)=>{
                      if(showUnfinished&&item.isDone===false||!showUnfinished){
                        return(
                          <li key={index}> 
                            <input type="checkBox" defaultChecked={item.isDone} onClick={()=>{jobDone(item.id)}}/> 
                            <span className={showState&&(item.isDone?"finished":"unfinished")}>  {item.job} {showState&&(item.isDone?"finished":"unfinished")} </span> 
                            <span className="deadline"> {item.TimeRemaining} day </span>
                            <button onClick={()=>{deleteJob(item.id)}}>X</button>
                          </li>
                        )
                      }
                  })}
                </ul>
              </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main/>);
