import React from 'react';
import './home.css';

function Home(){
    return (
        <div>
            {/* Banner Section */}
            <section className="banner">
                <div className="banner-content">
                    <h1>Government Services in a Single App</h1>
                    <p>Explore all digital services provided by the government.</p>
                    <div className="select">
                        <h2><i>Choose your role:</i></h2>
                        <button><a href="./UserLogin">Landlord</a></button>
                        <button><a href="./OfficeLogin">Office</a></button>
                    </div>
                </div>
                <div className="banner-graphics">
                    <img 
                        src="https://thumbs.dreamstime.com/b/house-symbol-location-pin-empty-dry-cracked-swamp-reclamation-soil-land-plot-housing-construction-project-property-339209301.jpg" 
                        alt="Illustration of government services" 
                    />
                </div>
            </section>
            {/* Services Section */}
            <section className="services">
                <h2>Our Services</h2>
                <div className="service-list">
                    <div className="service-item">
                        <img 
                            src="https://www.svgrepo.com/show/381137/transaction-password-otp-verification-code-security.svg" 
                            alt="Service Icon" 
                        />
                        <h3>OTP Verification</h3>
                        <p>Mobile Number verification through OTP.</p>
                    </div>
                    <div className="service-item">
                        <img 
                            src="https://www.shutterstock.com/image-vector/passport-line-icon-document-book-260nw-2366426987.jpg" 
                            alt="Service Icon" 
                        />
                        <h3>Citizen Verification</h3>
                        <p>Citizen must verify his/her identity to link them to the app.</p>
                    </div>
                    <div className="service-item">
                        <img 
                            src="https://static.vecteezy.com/system/resources/previews/008/942/393/non_2x/ejy-logo-ejy-letter-ejy-letter-logo-design-initials-ejy-logo-linked-with-circle-and-uppercase-monogram-logo-ejy-typography-for-technology-business-and-real-estate-brand-vector.jpg" 
                            alt="Service Icon" 
                        />
                        <h3>Enjoy App</h3>
                        <p>Enjoy government services in a single app.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <p>&copy; 2024 Services App. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Home;