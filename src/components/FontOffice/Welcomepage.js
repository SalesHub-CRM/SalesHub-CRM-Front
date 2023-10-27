import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CountsGroupsByAdmin} from "../../redux/actions/GroupsActions";
import {useNavigate} from "react-router";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {ListTasksByEmployee} from "../../redux/actions/TasksActions";


const Welcomepage = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate();
    const user =JSON.parse(localStorage.getItem('user'));
    const Tasks = useSelector(state => state.Task.ListTasksByEmployee);

    useEffect(()=>{

        const token = JSON.parse(localStorage.getItem('authTokens'));
        if(user)
        {
            dispatch(ListTasksByEmployee(user.id));
        }
    },[])

    console.log("Tasks",Tasks)

    const eventStyleGetter = (event)=>{
        let style={backgroundColor:"blue",margin:"auto",padding:"5px 0", width:"50%",textAlign:"center"}

        if (event && event.status==="COMPLETED"){
            style.backgroundColor="green";
        }
        else
        {
            const today = new Date();
            const dueDate = event? new Date(event.duedate) : null;
            if (dueDate && today>dueDate)
            {
                style.backgroundColor="red";
            }
        }

        return {style}
    }

    const handleEventClick=(event)=>{
        navigate(`/home/task/taskDetails/${event.id}`)
    }


    const customToolBar=(props)=>{
        return(
            <div className="rbc-toolbar">

                <span className="rbc-btn-group">
                    <button type="button" onClick={props.onNavigate.bind(null, "TODAY")}>
                      Today
                    </button>
                    <button type="button" onClick={props.onNavigate.bind(null, "PREV")}>
                      Back
                    </button>
                    <button type="button" onClick={props.onNavigate.bind(null, "NEXT")}>
                      Next
                    </button>
                </span>

                <span className="rbc-toolbar-label">{props.label}</span>

                <span className="rbc-btn-group">
                    <button type="button" onClick={()=>props.onView("month")}>
                        Month
                    </button>

                    <button type="button" onClick={()=>props.onView("agenda")}>
                        Agenda
                    </button>
                </span>
            </div>
        )
    }



    if (!Array.isArray(Tasks)) {

        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    else if(Tasks.length===0) {
        return (
            <div>
                <h3 className="text-center">There are currently no tasks assigned to you</h3>
            </div>
        );
    }

  else{
        return(
            <div>

                <div className="container mt-5 mb-5 text-center">
                    <h1 className="mt-5 mb-5">Welcome to salesHub. How can we help?</h1>
                </div>

                {/* Calendar */}
                <div className="mt-5 mb-5" style={{width:"98%", margin:"auto"}}>

                    <h3 className="mt-5 mb-5 text-center">My tasks for this month</h3>

                    <Calendar
                        localizer={momentLocalizer(moment)}
                        events={Tasks.map((task) => ({
                            ...task,
                            title: task.subject,
                        }))}
                        startAccessor="duedate"
                        endAccessor="duedate"
                        eventPropGetter={eventStyleGetter}
                        style={{ height: 500 }}
                        onSelectEvent={handleEventClick}
                        components={{
                            toolbar:customToolBar,
                        }}
                    />
                </div>


            </div>
        )
    }


}
export default Welcomepage;