CREATE TABLE ranges (
  id SERIAL PRIMARY KEY,
  range_name TEXT NOT NULL,
  color TEXT NOT NULL,
  coords TEXT [],
  chart_id INTEGER
    REFERENCES charts(id) ON DELETE CASCADE
);