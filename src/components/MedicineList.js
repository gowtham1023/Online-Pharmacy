import React from 'react';

const medicines = [
  { id: 1, name: 'Paracetamol', price: 10 },
  { id: 2, name: 'Amoxicillin', price: 20 },
  { id: 3, name: 'Ibuprofen', price: 15 },
];

const MedicineList = ({ addToCart }) => {
  return (
    <div className="medicine-list">
      <h2>Medicines</h2>
      {medicines.map((med) => (
        <div key={med.id} className="medicine-item">
          <span>{med.name} - ${med.price}</span>
          <button onClick={() => addToCart(med)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default MedicineList;
