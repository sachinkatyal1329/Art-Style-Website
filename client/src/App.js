import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Header from './components/header/header';
import Customers from './components/customers/customers';
import ImageCard from "./components/Card/Card";
import Footer from "./components/footer/footer";
import Navigation from "./components/navigation/nav";

var hi = "hi";
console.log("HI");

let url = window.location.href;
console.log(url);


/*

params = content: content image name
		 style: style image name
		 result: result image  name

*/

const getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

const params = getParams(url);


var state = 0;

if (params.content != null || params.style != null || params.result != null) {
	state = 1;
}

class App extends Component {
	
  	render(props) {
    	return (
    		<article>
		   		<Header />
    			<Navigation 
    				content = {params.content} 
    				style = {params.style}
    				result = {params.result}
    				name = {parseInt(state)}/>
		    	<Footer />
    		</article>

    );
  }
}

export default App;
