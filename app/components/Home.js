let React = require('react');
let Link = require('react-router-dom').Link;

// stateless functional component
const Home = (props) =>
{
    return (
        <div className="home-container">
            <h1>Github Battle: take on your friends!</h1>
            <Link className="button" to='/battle'>Battle</Link>
        </div>
    );
}
module.exports = Home;