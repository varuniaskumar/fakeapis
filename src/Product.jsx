import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Product() {
    
    const { id } = useParams();

    const [val, setVal] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => setVal(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const BackButton = () => {
        navigate('/home');  
      };
    return (
        <div>
            <img src={val.image} alt={val.title} style={{ width: '200px' }} />
            <h1>{val.id} </h1>
            <p><strong>title:</strong> ${val.title}</p>
            <p><strong>Price:</strong> ${val.price}</p>
            <p><strong>Description:</strong> {val.description}</p>
            <p><strong>Rating:</strong> {val.rating?.rate}</p>
            <p><strong>Category:</strong> {val.category}</p>
            <button onClick={BackButton}>Back to Home</button>
        </div>
    );
}




