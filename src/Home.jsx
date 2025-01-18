import { useState, useEffect } from 'react';
import './home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './components/loader/Loader';
import AddProduct from './components/addProduct/AddProduct';
export default function Home() {
    const [arrayData, setArrayData] = useState([]);
    const [addData, setAddData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    let dropDownValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setArrayData(response.data)
                setLoading(false)
            }
            )     

            .catch(error => console.error(error));

        axios.get('https://fakestoreapi.com/products/categories')
            .then(response => setAddData(response.data))
            .catch(error => console.error(error));
           
    }, []);

    function navigateNextPage(id) {
        navigate('/product/' + id);
    }

    function selectToChange(event) {
        const selectId = event.target.value;
        setLoading(true);
        axios.get('https://fakestoreapi.com/products?limit=' + selectId)
        .then(response => {
            setArrayData(response.data)
            setLoading(false)
        })
            .catch((error) => console.error(error))
            
    }

    function handleCategory(event) {
        const category = event.target.value;
        setLoading(true);
        //  axios.get('https://fakestoreapi.com/products/categories/' + category)
        axios.get(`https://fakestoreapi.com/products/category/${category}`)
        .then(response => {    
            setArrayData(response.data)
            setLoading(false)
        })
           
            .catch((error) => console.error(error))
            
    }


    function handleDelete(id) {
        axios.delete(`https://fakestoreapi.com/products/${id}`)
        .then(response => {    
            // setArrayData(response.data)
            setArrayData(data => data.filter(p => p.id !== id));
            // navigate('/home');
        })
           
            .catch((error) => console.error(error))
            
    }

    function handleAddProduct() {
        // setLoading(true);
        // axios.post('https://fakestoreapi.com/products', {
        //     title: 'test product',
        //     price: 13.5,
        //     description: 'lorem ipsum set',
        //     image: 'https://i.pravatar.cc',
        //     category: 'electronic'
        // })
        //     .then(response => {
        //         setArrayData(response.data);
        //         setLoading(false);
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         console.error(error);
        //         setLoading(false);
        //     });
    }
    

     

    return (
       
        <div  style={{ top: '0' }}>
             {  loading &&  <Loader/> }
            <AddProduct/>
             <button onClick={handleAddProduct}>Add Product</button>
           
            <div className="dropdown">
                <label>Select No Of items</label>
                <select onChange={selectToChange} defaultValue="">
                    <option value="">Select a Product</option>
                    {dropDownValues.map((val) => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                </select>

                <label>Select No Of item to delete</label>
                {/* <select onChange={handleDelete} defaultValue="">
                    <option value="">Select a Product</option>
                    {dropDownValues.map((val) => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                </select> */}

                <label>Select Category</label>
                <select onChange={handleCategory} defaultValue="">
                    <option value="">Categories</option>
                    {addData.map((val, i) => (
                        <option key={i} value={val}>{val}</option>
                    ))}
                </select>
            </div>
            <div className="product">
                {
                arrayData.map((val) => (
                    <div key={val.id} className="product1" onClick={() => navigateNextPage(val.id)}>
                        <img
                            src={val.image}
                            alt={val.title}
                            className="productimage"
                            style={{ cursor: 'pointer' }}
                        />
                        <div
                            className="productdetails"
                            style={{ cursor: 'pointer' }}
                        >
                            <p><strong>ID:</strong> {val.id}</p>
                            <p><strong>Title:</strong> {val.title}</p>
                            <p><strong>Price:</strong> ${val.price}</p>
                            <p><strong>Category:</strong> {val.category}</p>
                            <button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    navigateNextPage(val.id);
                                }}
                            >
                                View Details
                            </button>
                            <button onClick={(event) => {
                                event.stopPropagation();
                                handleDelete(val.id);
                            }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
