import React, { useState } from 'react'

const App = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    account: '',
    date: '',
    items: 1,
  });

  const [bookings, setBookings] = useState(() => {
    const stored = localStorage.getItem('bookings');
    return stored ? JSON.parse(stored) : {};
  });

  const maxItems = 80;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const day = form.date;
    const currentItems = bookings[day] || 0;

    if (currentItems + parseInt(form.items) > maxItems) {
      alert('Item limit reached for selected day.');
      return;
    }

    const updatedBookings = {
      ...bookings,
      [day]: currentItems + parseInt(form.items),
    };

    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    alert('Booking successful!');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Consignment Booking Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" required onChange={handleChange} className="border p-2 w-full" />
        <input name="email" placeholder="Email" required onChange={handleChange} className="border p-2 w-full" />
        <input name="phone" placeholder="Phone" required onChange={handleChange} className="border p-2 w-full" />
        <input name="account" placeholder="Account Number (optional)" onChange={handleChange} className="border p-2 w-full" />
        <input name="date" type="date" required onChange={handleChange} className="border p-2 w-full" />
        <input name="items" type="number" min="1" max="80" required onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Book</button>
      </form>
    </div>
  );
};

export default App;
