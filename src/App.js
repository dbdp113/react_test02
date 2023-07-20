import ProductList from './components/ProductList';
import './App.css';
import data from './productList.json';
import { useState } from 'react';

function Option({ect, filtItems}){
  const ectChange = (e) => {
    return filtItems(e.target.value);
  }
  return(
    <>
    <select
    defaultValue={ect} onChange={ectChange}>
      <option value="All">All</option>
      <option value="Sergeant">Sergeant</option>
      <option value="Dolly">Dolly</option>
    </select>
    </>
  )
}

export default function App(){
  const [ect,setEct] = useState('');
  const [order,setOrder] = useState('price');
  const [items,setItems] = useState(data);

  let subData = data;

  const filtItems = (a) => {
    if(a === 'All'){
      setEct(a);
      setItems(subData);
    } else {
      const newList = subData.filter((item) => {return item.kind === a});
    setEct(a);
    setItems(newList);

    }

  };

  const sortItems = items.sort((a,b) => b[order] - a[order]);

  const priceClick = () => setOrder('price');
  const bestClick = () => setOrder('ration');

  const DeleteItem = (id) => {
    const newItem = items.filter((item) => item.id !== id);
    setItems(newItem);
  }
  return (
    <div id="wrap">
      <div className="btn">
        <button type="button"
        onClick={priceClick}
        >가격</button>
        <button type="button"
        onClick={bestClick}
        >인기순</button>
      </div>
      <div className="option">
        <Option ect={ect} filtItems={filtItems} />
      </div>
      <ProductList 
      items={sortItems} onDelete={DeleteItem}
      />
    </div>
  )
}