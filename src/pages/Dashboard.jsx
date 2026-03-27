import Nav from "../components/Nav";
import Main from "../components/Main";

function Dashboard() {

    // console.log("TOKEN:", localStorage.getItem("token"));

    return (
        <div>
            <Nav />
            <Main />
        </div>
    )
}

export default Dashboard;