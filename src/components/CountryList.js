import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const countriesPerPage = 20;

    useEffect(() => {
        fetchCountries();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchCountries = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('https://restcountries.com/v3.1/all');
            setCountries(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to load countries:', error);
            setIsLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop
            >= document.documentElement.offsetHeight - 100
            && !isLoading
        ) {
            loadMoreCountries();
        }
    };

    const loadMoreCountries = () => {
        if (currentIndex < countries.length) {
            setCurrentIndex(prevIndex => prevIndex + countriesPerPage);
        }
    };

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <div className="container mt-4">
            <h1>Country List</h1>
            <div className="row">
                {countries.slice(0, currentIndex + countriesPerPage).map((country, index) => (
                    <div className="col-sm-12 col-md-4 mb-4 col-lg-2" key={index}>
                        <div className="card">
                            <img src={country.flags.png} className="card-img-top" alt={`Flag of ${country.name.common}`} />
                            <div className="card-body">
                                <h5 className="card-title">{country.name.common}</h5>
                                <Link to={`/${country.name.common}`} className="btn btn-primary">Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isLoading && <div className="text-center mt-4">Loading more countries...</div>}
        </div>
    );
};

export default CountryList;
