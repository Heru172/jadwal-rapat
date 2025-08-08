import React, { useState, useMemo } from 'https://esm.sh/react@18.3.1';
import ReactDOM from 'https://esm.sh/react-dom@18.3.1/client';

const App = () => {
    // Initial bookings data
    const initialBookings = [
        { id: 1, name: 'Rapat Tim Marketing', date: '2025-07-28', startTime: '09:00', endTime: '10:30', room: 'Aula Edelweiss' },
        { id: 2, name: 'Presentasi Klien', date: '2025-07-28', startTime: '11:00', endTime: '12:00', room: 'Zoom Cempaka' },
        { id: 3, name: 'Daily Standup', date: '2025-07-29', startTime: '08:30', endTime: '09:00', room: 'Zoom Cempaka' },
    ];

    const [bookings, setBookings] = useState(initialBookings);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [room, setRoom] = useState('Aula Edelweiss');
    
    const sortedBookings = useMemo(() => {
        return [...bookings].sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.startTime}`);
            const dateB = new Date(`${b.date}T${b.startTime}`);
            return dateA.getTime() - dateB.getTime();
        });
    }, [bookings]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !date || !startTime || !endTime || !room) {
            alert('Harap isi semua kolom!');
            return;
        }

        const newBooking = {
            id: Date.now(), // Use timestamp for unique ID
            name,
            date,
            startTime,
            endTime,
            room
        };

        setBookings([...bookings, newBooking]);

        // Reset form
        setName('');
        setDate('');
        setStartTime('');
        setEndTime('');
        setRoom('Aula Edelweiss');
    };

    return (
        <>
            <h1>Jadwal Ruang Rapat</h1>
            <div className="form-container">
                <h2>Tambah Pendaftaran Baru</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="name">Nama Kegiatan</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Tanggal</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="startTime">Waktu Mulai</label>
                            <input
                                type="time"
                                id="startTime"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endTime">Waktu Selesai</label>
                            <input
                                type="time"
                                id="endTime"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="room">Ruangan</label>
                            <select id="room" value={room} onChange={(e) => setRoom(e.target.value)} required>
                                <option value="Aula Edelweiss">Aula Edelweiss</option>
                                <option value="Zoom Cempaka">Zoom Cempaka</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit">Daftarkan Jadwal</button>
                </form>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nama Kegiatan</th>
                            <th>Tanggal</th>
                            <th>Waktu Mulai</th>
                            <th>Waktu Selesai</th>
                            <th>Ruangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedBookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.name}</td>
                                <td>{new Date(booking.date + 'T00:00:00').toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric'})}</td>
                                <td>{booking.startTime}</td>
                                <td>{booking.endTime}</td>
                                <td>{booking.room}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App />);
        </>
    );
};

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App />);



