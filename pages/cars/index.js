import { useEffect, useState } from 'react';

export default function CarsList({ cars }) {
    const [cars2, setCars2] = useState();

    useEffect(async () => {
        const cars2 = await loadCars();
        setCars2(cars2);
    }, [])

    return <>
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
    </>
}


export async function loadCars() {

    const req = await fetch(`http://localhost:3000/cars.json`);
    return await req.json();
}


export async function getServerSideProps({ params }) {
    return {
        props: { cars: await loadCars() },
    }
}