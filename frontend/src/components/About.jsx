import React from 'react';
// import '../assets/style/about.css';

const About = () => {
    return (
        <div className="about-container">
            <section className="about-hero">
                <div className="about-overlay"></div>
                <div className="about-hero-text">
                    <h1 className='text-light'>About Us</h1>
                    <p className='text-light'>Discover who we are and our mission to make a difference.</p>
                </div>
            </section>

            <section className="about-content">
                <div className="about-mission">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to provide top-notch services and create a platform that
                        brings innovation and solutions to our users. We strive to ensure a
                        seamless experience, maintaining high standards of integrity, excellence,
                        and dedication in everything we do.
                    </p>
                </div>

                <div className="about-vision">
                    <h2>Our Vision</h2>
                    <p>
                        We envision a future where our solutions empower individuals and businesses
                        to unlock new possibilities, fostering a global community of growth,
                        collaboration, and positive change. We aim to lead through innovation and
                        a relentless commitment to customer success.
                    </p>
                </div>

                <div className="about-history">
                    <h2>Our Story</h2>
                    <p>
                        Founded in [Year], our journey started with a simple idea to make a
                        difference in the industry. Over the years, we have grown into a team
                        of dedicated professionals who are passionate about delivering quality and
                        value. From humble beginnings to a well-established platform, our history
                        is a testament to the trust and support of our users.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;
