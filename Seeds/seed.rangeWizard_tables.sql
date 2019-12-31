Begin;

TRUNCATE
  charts, ranges
  RESTART IDENTITY CASCADE;

INSERT INTO charts (chart_name)
VALUES
  ('Chart 1'),
  ('Chart B'),
  ('Chart III'),
  ('Full ring base range');

INSERT INTO ranges (range_name, color, coords, chart_id)
VALUES
  ('4bet+', 'magenta', ARRAY ['0,0', '1,1'], 1),
  ('3bet', 'red', ARRAY ['0,1', '0,2', '0,3', '0,10', '0,11', '1,0', '1,2', '2,0', '2,1', '3,3', '4,4', '5,5', '7,8', '6,7'], 1),
  ('call 2bet', 'goldenrod', ARRAY ['4,0', '5,0', '6,0', '7,0', '1,4', '1,5', '1,6', '1,7', '0,4', '0,5', '0,6', '0,7', '0,8', '0,11', '0,12', '2,5', '2,6', '3,4', '3,5', '6,6', '7,7', '8,8', '9,9', '10,10', '11,11', '12,12'], 1),
  ('Aces only', 'pink', ARRAY ['0,0', '0,1', '0,2', '0,3', '0,4', '0,5', '0,6', '0,7', '0,8', '0,9', '0,10', '0,11', '0,12', '1,0', '2,0', '3,0', '4,0', '5,0', '6,0', '7,0', '8,0', '9,0', '10,0', '11,0', '12,0'], 2),
  ('Medium PP', 'yellow', ARRAY ['4,4', '5,5', '6,6', '7,7'], 3);

COMMIT;