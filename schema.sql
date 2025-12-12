-- backend/schema.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS shows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('BUS','MOVIE','DOCTOR')),
  start_time TIMESTAMP NOT NULL,
  total_seats INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- seats: for BUS & MOVIE
CREATE TABLE IF NOT EXISTS seats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  show_id UUID REFERENCES shows(id) ON DELETE CASCADE,
  seat_label TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('AVAILABLE','BOOKED')) DEFAULT 'AVAILABLE'
);

-- slots: for doctor appointment
CREATE TABLE IF NOT EXISTS slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  show_id UUID REFERENCES shows(id) ON DELETE CASCADE,
  slot_time TIMESTAMP NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('AVAILABLE','BOOKED')) DEFAULT 'AVAILABLE'
);

-- bookings
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  show_id UUID REFERENCES shows(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('SEAT','SLOT')),
  seat_id UUID REFERENCES seats(id) ON DELETE SET NULL,
  slot_id UUID REFERENCES slots(id) ON DELETE SET NULL,
  user_name TEXT,
  status TEXT NOT NULL CHECK (status IN ('PENDING','CONFIRMED','FAILED')) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT NOW()
);
