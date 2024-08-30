import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CountryDetails = () => {
    const { countryName } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showAllData, setShowAllData] = useState(false); // New state for showing all data

    useEffect(() => {
        fetchCountryDetails();
    }, [countryName]);

    const fetchCountryDetails = async () => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
            setCountry(response.data[0]);
            setLoading(false);
        } catch (error) {
            console.error('Failed to load country details:', error);
            setError(true);
            setLoading(false);
        }
    };

    const formatObject = (obj) => {
        if (Array.isArray(obj)) {
            return obj.map(item => (typeof item === 'object' ? formatObject(item) : item)).join(', ');
        } else if (typeof obj === 'object') {
            return Object.entries(obj).map(([key, value]) => `${capitalize(key)}: ${value}`).join(', ');
        } else {
            return obj;
        }
    };

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    if (loading) return <div className="container mt-4"><p>Loading...</p></div>;
    if (error) return <div className="container mt-4"><p className="text-danger">Failed to load country details.</p></div>;

    return (
        <div className="container mt-4">
            <a href="/decent-react" className="btn btn-primary">Back</a>

            <h1>Country Details: {country.name.common}</h1>

            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} className="img-fluid mb-4"/>

            <p><strong>Region:</strong> {country.region}</p>

            <p><strong>Maps:</strong> <a href={country.maps.googleMaps} target='_blank' rel="noopener noreferrer">{country.maps.googleMaps}</a></p>

            {/* Button to toggle showing all data */}
            <button
                className="btn btn-secondary mb-4"
                onClick={() => setShowAllData(!showAllData)}
            >
                {showAllData ? 'Hide All Data' : 'Show All Data'}
            </button>

            {/* Conditionally render allData */}
            {showAllData && (
                <div className="allData">
                    {Object.entries(country).map(([key, value]) => (
                        <p key={key}>
                            <strong>{capitalize(key)}:</strong> {typeof value === 'object' ? formatObject(value) : value}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CountryDetails;
