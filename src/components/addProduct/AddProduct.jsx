import './addProduct.css';
import { useState } from 'react';
import axios from 'axios';

export default function AddProduct() {
  const [popup, setPopup] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    console.log(event)
    event.preventDefault();
    const productData = {
      title:event.form.target.value,
      price:price,
      description:event,
      image:some,
      category:cate
    };

    axios.post('https://fakestoreapi.com/products', productData)
      .then(response => {
        console.log(response.data);
        setPopup(false); 
        setTitle(''); 
        setPrice(''); 
        setDescription(''); 
        setImage(''); 
        setCategory(''); 
      })
      .catch(error => {
        setError(error.response.data);
      });
  };

  const openPopup = () => setPopup(true);
  const closePopup = () => setPopup(false);

  return (
    <div className="containerr">
      <button onClick={openPopup}>Add Product</button>
      {popup && (
        <div>
          <form onSubmit={handleSubmit}  className='loginfrm'>
            <div>
              <h4>Add New Product</h4>
              <label>Title</label>
              <input type="text" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} /><br />
              <label>Price</label>
              <input type="number" placeholder="Enter price" value={price} onChange={e => setPrice(e.target.value)} /><br />
              <label>Description</label>
              <input type="text" placeholder="Enter description" value={description} onChange={e => setDescription(e.target.value)} /><br />
              <label>Image</label>
              <input type="url" placeholder="Enter image URL" value={image} onChange={e => setImage(e.target.value)} /><br />
              <label>Category</label>
              <input type="text" placeholder="Enter category" value={category} onChange={e => setCategory(e.target.value)} /><br />
              <div>
                <button type="submit">Add Product</button>
                <button type="button" onClick={closePopup}>Close</button>
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
