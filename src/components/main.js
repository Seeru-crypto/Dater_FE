import React from 'react'

const Main = () => {
    return (
        <div>
            <h1>Welcome to Dater!</h1>

            <div className="section-div">
                <h3>Description:</h3>
                <p>
                    Dater is a event manager, which will send out an email if a
                    date is nearing.
                </p>
            </div>
            <a
                style={{ textDecoration: 'none', color: 'black' }}
                href="https://github.com/Seeru-crypto/bDay_front-end"
            >
                <i className="pi pi-github" style={{ fontSize: '2rem' }}></i>
            </a>
        </div>
    )
}
export default Main
