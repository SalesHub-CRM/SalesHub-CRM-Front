import {Link} from "react-router-dom";


const EmployeeTutorial = () => {

    const baseUrl = process.env.PUBLIC_URL;

    return(
        <div style={{width:"96%", margin:"auto"}} className="mb-5 mt-5">
            <h1 className="text-center">Welcome to SalesHub !</h1>
            <h2 className="text-center mt-5"> this short tutorial will walk you through some of our basic functions !</h2>

            <div className="card mb-5 mt-5" style={{padding:"40px"}}>
                <h4>The Leads tab is used to keep track of potential clients : </h4>
                <div className="d-flex mt-5 mb-5">
                    <img className="tutorialImagesRight" src={`${baseUrl}/assets/images/leadsTuto.png`} alt="leads"/>

                    <div className="align-self-center" style={{width:"60%"}}>
                        <p style={{fontSize:"1.2rem"}}>- Leads are very important to any business, since they represent potential clients !</p>

                        <p style={{fontSize:"1.2rem"}}>- You can start by adding a lead <Link to="/home/lead/addLead">here</Link> .</p>

                        <p style={{fontSize:"1.2rem"}}>- Or you can check the exiting leads in this <Link to="/home/lead">list</Link> .</p>

                        <p style={{fontSize:"1.2rem"}}>- Clicking on the "Details" button will give you more insight into the lead.</p>

                    </div>


                </div>
            </div>


            <div className="card mb-5 mt-5" style={{padding:"40px"}}>
                <h4>The Tasks tab is used to keep track of the tasks assigned to you : </h4>
                <div className="d-flex mt-5 mb-5 justify-content-end">

                    <div className="align-self-center" style={{width:"60%"}}>
                        <p style={{fontSize:"1.2rem"}}>- This tab allows you to manage the group tasks.</p>

                        <p style={{fontSize:"1.2rem"}}>- You can add new tasks and assign them to an employee of your group <Link to="/home/task/addTask">here</Link> .</p>

                        <p style={{fontSize:"1.2rem"}}>- Or you can check the task assigned to you in this <Link to="/home/task">list</Link> .</p>

                        <p style={{fontSize:"1.2rem"}}>- Clicking on the "Details" button will give you more insight into the task.</p>

                    </div>

                    <img className="tutorialImagesLeft" src={`${baseUrl}/assets/images/tasksTuto.png`} alt="tasks"/>


                </div>
            </div>


            <div className="card mb-5 mt-5" style={{padding:"40px"}}>
                <h4>The Clients tab is used to keep track of your clients : </h4>
                <div className="d-flex mt-5 mb-5">
                    <img className="tutorialImagesRight" src={`${baseUrl}/assets/images/clientsTuto.png`} alt="clients"/>

                    <div className="align-self-center" style={{width:"60%"}}>
                        <p style={{fontSize:"1.2rem"}}>- The core of your job as an employee is to try and win contracts.</p>

                        <p style={{fontSize:"1.2rem"}}>- This tab will allow you to organise your clients.</p>

                        <p style={{fontSize:"1.2rem"}}>- You can start by adding a client <Link to="/home/client/addClient">here</Link> .</p>

                        <p style={{fontSize:"1.2rem"}}>- Or you can check your existing clients in this <Link to="/home/client">list</Link> .</p>

                        <p style={{fontSize:"1.2rem"}}>- Clicking on the "Details" button will give you more insight into the lead.</p>

                    </div>

                </div>
            </div>



            <div className="card mb-5 mt-5" style={{padding:"40px"}}>
                <h4>The Contacts view is used to visualise the contacts registered for the current client : </h4>
                <div className="d-flex mt-5 mb-5 justify-content-end">

                    <div className="align-self-center" style={{width:"60%"}}>
                        <p style={{fontSize:"1.2rem"}}>- This tab allows you to manage the contacts of the chosen client.</p>

                        <p style={{fontSize:"1.2rem"}}>- Clicking on the "Details" button will give you more insight about the contact.</p>

                    </div>

                    <img className="tutorialImagesLeft" src={`${baseUrl}/assets/images/contactTuto1.png`} alt="contact1"/>


                </div>

                <hr style={{margin:"15px auto", width:"60%"}}/>

                <div className="d-flex mt-5 mb-5 justify-content-end">

                    <div className="align-self-center" style={{width:"60%"}}>
                        <p style={{fontSize:"1.2rem"}}>- In order to access the contacts list or add a client, you first have to access the clients list</p>

                        <p style={{fontSize:"1.2rem"}}>- Next, choose the desired client from the list and click "Details".</p>

                        <p style={{fontSize:"1.2rem"}}>- At the bottom, you'll find action buttons that allow you to add a new contact,</p>

                        <p style={{fontSize:"1.2rem"}}>- or check existing ones for this client.</p>

                    </div>

                    <img className="tutorialImagesLeft" src={`${baseUrl}/assets/images/clientInfoTuto.png`} alt="contact2"/>

                </div>
            </div>


            <div className="card mb-5 mt-5" style={{padding:"40px"}}>
                <h4>The Cases tab is used to keep track of cases your group is working on : </h4>
                <div className="d-flex mt-5 mb-5">
                    <img className="tutorialImagesRight" src={`${baseUrl}/assets/images/casesTuto.png`} alt="clients"/>

                    <div className="align-self-center" style={{width:"60%"}}>
                        <p style={{fontSize:"1.2rem"}}>- On occasion, your group might get requests from your clients.</p>

                        <p style={{fontSize:"1.2rem"}}>- This tab will allow you to organise your group cases.</p>

                        <p style={{fontSize:"1.2rem"}}>- You can a new case <Link to="/home/case/addCase">here</Link> .</p>

                        <p style={{fontSize:"1.2rem"}}>- You can also check the cases assigned to your group in this <Link to="/home/case">list</Link> .</p>

                        <p style={{fontSize:"1.2rem"}}>- Clicking on the "Details" button will give you more insight into the chosen case.</p>

                    </div>


                </div>
            </div>


            <div className="card mb-5 mt-5" style={{padding:"40px"}}>
                <h4>The Products tab allows you to view which products your company deals in : </h4>
                <div className="d-flex mt-5 mb-5 justify-content-end">

                    <div className="align-self-center" style={{width:"60%"}}>
                        <p style={{fontSize:"1.2rem"}}>- This tab allows you to view the products your company deals in.</p>

                        <p style={{fontSize:"1.2rem"}}>- Only the owner of your organisation can add or modify products.</p>

                        <p style={{fontSize:"1.2rem"}}>- There are other functionalities you can only access through this tab, mainly concerning opportunities and campaigns.</p>

                    </div>

                    <img className="tutorialImagesLeft" src={`${baseUrl}/assets/images/productTuto.png`} alt="tasks"/>


                </div>
            </div>


            <div className="card mb-5 mt-5" style={{padding:"40px"}}>
                <h4>The Opportunities view is used to visualise different opportunities according to the situation : </h4>
                <div className="d-flex mt-5 mb-5">

                    <img className="tutorialImagesRight" src={`${baseUrl}/assets/images/oppTuto1.png`} alt="contact1"/>

                    <div className="align-self-center" style={{width:"60%"}}>
                        <p style={{fontSize:"1.2rem"}}>- This tab allows you to manage opportunities relating to clients and products.</p>

                        <p style={{fontSize:"1.2rem"}}>- Accessing this tab from the "Opportunity" button in the navbar will display the opportunities you created.</p>

                        <p style={{fontSize:"1.2rem"}}>- Accessing this tab from the "Product" details will display the opportunities related to the selected product.</p>

                        <p style={{fontSize:"1.2rem"}}>- Accessing this tab from the "Client" details will display the opportunities related to the selected client.</p>

                    </div>

                </div>

                <hr style={{margin:"15px auto", width:"60%"}}/>

                <div className="d-flex mt-5 mb-5">

                    <img className="tutorialImagesRight" src={`${baseUrl}/assets/images/productDetails.png`} alt="contact2"/>

                    <div className="align-self-center" style={{width:"60%"}}>
                        <p style={{fontSize:"1.2rem"}}>- From the product details, you can access two actions concerning the opportunities :</p>

                        <p style={{fontSize:"1.2rem"}}>- Adding a new opportunity related to the current product.</p>

                        <p style={{fontSize:"1.2rem"}}>- Viewing a list of opportunities related to the current product.</p>

                    </div>

                </div>

                <hr style={{margin:"15px auto", width:"60%"}}/>


                <div className="d-flex mt-5 mb-5">

                    <img className="tutorialImagesRight" src={`${baseUrl}/assets/images/clientInfoTuto.png`} alt="contact2"/>

                    <div className="align-self-center" style={{width:"60%"}}>
                        <p style={{fontSize:"1.2rem"}}>- You can access similar action from the client tab, to see manage opportunities related to the current client</p>

                    </div>

                </div>

            </div>


            <div className="card mb-5 mt-5" style={{padding:"40px"}}>
                <h4>The Campaigns tab allows you to manage current campaigns your group is involved with : </h4>
                <div className="d-flex mt-5 mb-5 justify-content-end">

                    <div className="align-self-center" style={{width:"60%"}}>
                        <p style={{fontSize:"1.2rem"}}>- This tab allows you to view the campaigns your company is running.</p>

                        <p style={{fontSize:"1.2rem"}}>- Accessing this tab from the "Campaigns" button in the navbar will display the campaigns assigned to your group.</p>

                    </div>

                    <img className="tutorialImagesLeft" src={`${baseUrl}/assets/images/campaignTuto.png`} alt="tasks"/>
                </div>

                <hr style={{margin:"15px auto", width:"60%"}}/>

                <div className="d-flex mt-5 mb-5">

                    <div className="align-self-center" style={{width:"60%"}}>
                        <p style={{fontSize:"1.2rem"}}>- From the product details, you can access two actions concerning campaigns :</p>

                        <p style={{fontSize:"1.2rem"}}>- Adding a new campaign related to the current product.</p>

                        <p style={{fontSize:"1.2rem"}}>- Viewing a list of campaigns related to the current product.</p>

                    </div>

                    <img className="tutorialImagesLeft" src={`${baseUrl}/assets/images/productDetails.png`} alt="contact2"/>

                </div>

            </div>


        </div>
    )
}

export default EmployeeTutorial;