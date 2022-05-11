import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function CarsList({ cars }) {
    const [cars2, setCars2] = useState();
    const [search, setSearch] = useState("");
    const [cities, setCities] = useState([]);

    useEffect(async () => {
        const cars2 = await loadCars();
        setCars2(cars2);
    }, [])

    useEffect(async () => {
        const result = await getFrenchCity(search);
        setCities(result);
    }, [search])

    function handleChange(event) {
        setSearch(event.target.value);
    }

    console.log("cities = ", cities)

    return <>
        <Head>
            <title>My list of cars</title>
            <meta name="description" content="Check out our cars !" />
            <link rel='canonical' href='/cars' />
        </Head>
        <h1>List of cars</h1>
        <ul>
            {cars.map((c) => {
                const url = `/cars/${c}`;
                return <li key={c}><a href={url}>{c}</a></li>
            })}
        </ul>
        <p>MIDDLE</p>
        <ul>
            {cars2?.map((c) => {
                const url = `/cars/${c}`;
                return <li key={c}><a href={url}>{c}</a></li>
            })}
        </ul>
        <p>CITIES</p>
        <input type="text" value={search} onChange={handleChange} />
        <ul>
            {cities?.map((c) => {
                return <li key={c.name}>{c.name} : {c.population} people</li>
            })}
        </ul>
    </>
}

export async function getFrenchCity(code) {
    const FRENCH_CITY_URI = 'https://geo.api.gouv.fr/communes';
    const FRENCH_CITY_FIELDS = '&fields=nom,codesPostaux,centre,population&format=json&geometry=centre';

    const url = `${FRENCH_CITY_URI}?codePostal=${code}${FRENCH_CITY_FIELDS}`;
    const uri = encodeURI(url);

    const headers = new Headers();
    headers.append("accept", "application/json");
    const requestOptions = {
        method: 'GET',
        headers: headers
    };

    try {
        const response = await fetch(uri, requestOptions);

        const data = await response.json();

        const cities = data.map((c) => { 
            return {
                code: c.codesPostaux[0],
                name: c.nom,
                lng: parseFloat(c.centre.coordinates[0]),
                lat: parseFloat(c.centre.coordinates[1]),
                population: parseInt(c.population)
            };
        });

        const sortedCities = cities.sort(byPopulation);
        return sortedCities;

    } catch (error) {
        console.error(error);
        return [];
    }
}

function byPopulation(a, b) {
    return a.population - b.population;
}


export async function loadCars() {

    const req = await fetch("/api/cars");
    const data = await req.json();
    return data;
}


export async function getServerSideProps({ params }) {

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');  

    var raw = JSON.stringify([
        "toto",
        "tata",
        "titi"
    ]);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const req = await fetch("https://postman-echo.com/post", requestOptions);
    const json = await req.json();

    return {
        props: { cars: json.data },
    }
}