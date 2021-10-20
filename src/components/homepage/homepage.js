import axios from 'axios';
import React,{ useState, useEffect} from 'react'
import { nativeTouchData } from 'react-dom/test-utils';
import './homepage.css'

const Homepage = () =>{

    const [random, setRandom] = useState(Math.random());
    const reRender = () => setRandom(Math.random());

    const [tasks,setTasks] = useState([]);

    const addtask = () => {
        const description = document.getElementById("description").value;
        const time = document.getElementById("time").value;
        const assignedto = document.getElementById("assignedto").value;
        const datestring = new Date().toISOString();
        const task = {
            "description" : description,
            "time" : time,
            "assignedto" : assignedto,
            "status" : false,
            "timestamp" : new Date()
        }

        axios.post("http://localhost:5000/addtask",task)
             .then(res => {
                 console.log(res);
                 reRender();
             });
    }
    
  useEffect (() => {
        axios.post("http://localhost:5000/")
        .then(res => {
            console.log(res);
           setTasks(res.data.alltask);
                 
        });
    },[random]);

    const user1task = (task) => {
        const current = new Date();
        const postedtime = new Date(task.timestamp);
        const millisec = current - postedtime;
        const secs = millisec/1000;
        const mins = secs/60;
        const hours = mins/60;

        const timeleft = task.time - hours;

        console.log("time in millisecond " + millisec);
      return  task.assignedto === "user1" ? (<div className = "taskcard" style={task.status?{background : "rgb(78,166,92)"}:{background : "white"}} id={task._id} >
                <p className="description"> {task.description}</p>
                <p className="assignedto"> duty on: {task.assignedto}</p>
                <p className="time">time left : {timeleft.toFixed(1)} hours</p>
            <div className="header">
                   <div className="delete"  onClick={() => deletetask(task._id)}>Delete</div>
                   <div className="tick" onClick={() => donetask(task._id)}>Done</div>
                </div>
            </div> ) : (<div></div> )
    }
    const user2task = (task) => {
        const current = new Date();
        const postedtime = new Date(task.timestamp);
        const millisec = current - postedtime;
        const secs = millisec/1000;
        const mins = secs/60;
        const hours = mins/60;

        const timeleft = task.time - hours;

        return  task.assignedto === "user2" ? (<div className = "taskcard" style={task.status?{background : "rgb(78,166,92)"}:{background : "white"}} id={task._id} >
        <p className="description"> {task.description}</p>
        <p className="assignedto"> duty on : {task.assignedto}</p>
        <p className="time">time left : {timeleft.toFixed(1)} hours</p>
    <div className="header">
           <div className="delete"  onClick={() => deletetask(task._id)}>Delete</div>
           <div className="tick" onClick={() => donetask(task._id)}>Done</div>
        </div>
    </div> ) : (<div></div> )
      }

      const deletetask = (id) => {
          console.log("delete task clicked " +  id);
          axios.post("http://localhost:5000/delete/"+id)
        .then(res => {
            console.log(res);
        //    setTasks(res.data.alltask);
        reRender();
                 
        });
          
      }

      const donetask =(id) => {
        //   document.getElementById(id).style.backgroundColor = "green";
          axios.post("http://localhost:5000/donetask/"+id)
          .then(res => {
              console.log(res);
              reRender();
          });
      }
 
    return(
        <div className="homepage">
        <div className="dashboard">
           <div className="user1">
               <p className="username">user1</p>
               <div className="taskcontainer">
               { tasks.map(task => user1task(task)) } 
               </div>
           </div>
          <div className="user2">
          <p className="username">user2</p>
             <div className="taskcontainer">
              { tasks.map(task => user2task(task)) } 
             </div>
          </div>
        </div>

            <div className="sidenav">
                <div className="addtask">
                    <textarea  placeholder="task description" id="description" rows="2" ></textarea>
                    <input type="number" placeholder="time in hours" id="time" className="timeinput"></input>
                    <select  placeholder="assgined to" id="assignedto">
                        <option value="user1">user1</option>
                        <option value="user2">user2</option>
                        </select><br></br>
                    <button onClick={addtask}>Add task</button>
                    {/* <button >show task</button> */}
                </div>
            </div>

        </div>
    );
}

export default Homepage