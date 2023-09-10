import React from "react";
import "./Home.css";


const Home = () => {
    return(
        /*this is temporary, used to understand how to devide, later use components here*/
        /*icons from https://mui.com/material-ui/material-icons/   */
        /*tables from https://mui.com/material-ui/react-table/#data-table  */
        /*color picker https://imagecolorpicker.com/en  */
        <div className="DashboardHome">

            <div>
                <h1 style={{'margin':'100px auto','text-align':'center','color':'#69AADB'}}>Welcome to the Admin Dashboard Interface</h1>
                <h2 style={{'text-align':'center','color':'#94C2E5'}}>To proceed, choose the task you want to perform on the left side menu</h2>
            </div>
            {/*<CardsExample/>*/}
            {/*write grid in the parameters if you want chart with a grid, otherwise don't*/}
            {/* <ChartExample title="Donation analysis" data={ChartDataEXample} dataKey={{uv:"uv",pv:"pv"}} grid/>

            <div className="HomeWidgets">
                <WidgetSmExample/>
                <WidgetLgExample/>
            </div>*/}
        </div>
    )
}

export default Home;