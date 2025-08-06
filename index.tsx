import React, { useState } from 'https://esm.sh/react@19.1.1';
import { createRoot } from 'https://esm.sh/react-dom@19.1.1/client';
import './index.css';

const App = () => {
  // Contoh data awal
  const initialBookings = [
    {
      id: 1,
      room: 'Ruang Aula Edelweis',
      date: '2025-07-28',
      time: '09:00',
      organizer: 'Divisi Marketing',
    },
    {
      id: 2,
      room: 'Ruang Zoom Cempaka',
      date: '2025-07-28',
      time: '10:00',
      organizer: 'Divisi IT',
    },
     {
      id: 3,
      room: 'Ruang Aula Edelweis',
      date: '2025-07-29',
      time: '14:00',
      organizer: 'Manajemen',
    },
  ];

  const [bookings, setBookings] = useState(initialBookings);
  const [formData, setFormData] = useState({
    room: 'Ruang Aula Edelweis',
    date: '',
    time: '',
    organizer: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.organizer) {
      alert('Harap isi semua kolom.');
      return;
    }

    const newBooking = {
      id: bookings.length + 1,
      ...formData,
    };
    
    // Menambahkan dan mengurutkan berdasarkan tanggal dan waktu
    setBookings(prevBookings => 
        [...prevBookings, newBooking].sort((a, b) => {
            const dateTimeA = new Date(`${a.date}T${a.time}`);
            const dateTimeB = new Date(`${b.date}T${b.time}`);
            // Menggunakan getTime() untuk perbandingan yang aman dan eksplisit
            return dateTimeA.getTime() - dateTimeB.getTime();
        })
    );

    // Reset form
    setFormData({
      room: 'Ruang Aula Edelweis',
      date: '',
      time: '',
      organizer: '',
    });
  };

  return (
    <div className="container">
      <h1>Jadwal Pendaftaran Ruang Rapat</h1>

      <div className="form-container">
        <h2>Buat Pendaftaran Baru</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="organizer">Penyelenggara</label>
                    <input
                        type="text"
                        id="organizer"
                        name="organizer"
                        value={formData.organizer}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Tanggal</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Waktu</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="room">Ruangan</label>
                    <select
                        id="room"
                        name="room"
                        value={formData.room}
                        onChange={handleInputChange}
                        required>
                        <option>Ruang Aula Edelweis</option>
                        <option>Ruang Zoom Cempaka</option>
                    </select>
                </div>
            </div>
            <button type="submit">Daftar</button>
        </form>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Ruangan</th>
              <th>Tanggal</th>
              <th>Waktu</th>
              <th>Penyelenggara</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.room}</td>
                <td>{new Date(booking.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                <td>{booking.time}</td>
                <td>{booking.organizer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
