import React from 'react'

const Main = () => {
    return (
        <div>
            <h1>Tere Tulemast!</h1>

            <div className="section-div">
                <h3>Arhidektuur</h3>
                <ul>
                    <li>React App: Port 4000</li>
                    <li>
                        JSON server/ container: Port 5432{': '}
                        <a href="http://localhost:5432/users">link</a>
                    </li>
                </ul>
            </div>
            <div className="section-div">
                <h3>Äriline funktsionaalsus</h3>
                <ul>
                    <li>
                        Klient saab sooritada CRUD operatsioone kuupäeva
                        sisestustega{' '}
                    </li>
                    <li>
                        Klient saab valida kas soovib email meelde tuletust,
                        koos mitme päeva eelteatamisega
                    </li>
                    <li>
                        Admin saab hallata emaili süsteemi konfe, mis pordid,
                        mis aadressid jne
                    </li>
                    <li>
                        Admin saab hallata emaili süsteemi konfe, mis pordid,
                        mis aadressid jne
                    </li>
                </ul>
            </div>

            <a
                style={{ textDecoration: 'none', color: 'black' }}
                href="https://github.com/Seeru-crypto/bDay_front-end"
            >
                <i class="pi pi-github" style={{ fontSize: '2rem' }}></i>
            </a>
        </div>
    )
}
export default Main
