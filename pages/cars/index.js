export default function CarsList({ cars }) {

    console.log("cars = ", cars)
    return <>
        <h1>List of cars</h1>
        <ul>
            {cars.map((c) => {
                const url = `/cars/${c}`;
                return <li keys={c}><a href={url}>{c}</a></li>
            })}
        </ul>
    </>
}


export async function getServerSideProps({ params }) {

    const req = await fetch(`http://localhost:3000/cars.json`);
    const data = await req.json();

    return {
        props: { cars: data },
    }
}