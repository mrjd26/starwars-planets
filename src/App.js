import './App.css';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [planets, setPlanets] = useState([]);
  
  useEffect(() => {

    Promise.all([
      fetch("https://swapi.dev/api/planets").then(value=>value.json()),
      fetch("https://swapi.dev/api/planets?page=2").then(value=>value.json()),
      fetch('https://swapi.dev/api/planets/?page=3').then(value=>value.json()),
      fetch('https://swapi.dev/api/planets/?page=4').then(value=>value.json()),
      fetch('https://swapi.dev/api/planets/?page=5').then(value=>value.json()),
      fetch('https://swapi.dev/api/planets/?page=6').then(value=>value.json())
    ]).then((values) => { 
		values.forEach(value => {
		  let results = value.results;  
                  setPlanets(prev => [...prev, ...results]);
		});
                setIsLoaded(true);

	},           
	(error) => {
		setIsLoaded(true);
		setError(error);
	}
     )
  }, []) //end useEffect

const data = {
	labels: planets.map(planet => planet.name),
        datasets: [{
          data: planets.map(planet => planet.population),
          label: "Star Wars Planets"
        }]
      }

const options = {
  scales: {
	  y: {type:'logarithmic'}
  }
}

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
	  <div>
	    <div> 
	      <Bar data={data} options={options} />
	    </div>
                  
	    <table style={{width: "50%", margin: "0 auto", border: "1px solid black"}} >
	      <tbody>
	        <tr>
                   <th>Name</th>
	           <th>Population</th>
	           <th>Rotation</th>
	           <th>Orbital Period</th>
	           <th>Diameter</th>
	           <th>Climate</th>
	           <th>Surface Water</th>
	        </tr>
                 {/* 1st row Labels */}
	    
	        { 
			planets.sort((a,b) => a.name.localeCompare(b.name))


				.map( (i, ndx) => <tr>
		                <td> {i.name}</td>
		                <td> {i.population}</td>
		                <td> {i.rotation_period}</td>
		                <td> {i.orbital_period}</td>
		                <td>{i.diameter}</td>
		                <td>{i.climate}</td>
			        <td>{i.surface_water}</td>
		               </tr>,
	        )}
	     </tbody>
	   </table>
	 </div>
    )
  }
}

export default App
