INSERT INTO department(department)
VALUES
('Metaphysics'),
('Epistmology'),
('History'),
('Ethics');


INSERT INTO role (title, salary, department_id)
VALUES
('Professor of Philosophy', 40000, 1),
('Visiting Assistant Professor', 35000, 2),
('Lectuer', 15000, 4),
('Adjunct Faculty', 12000, 2),
('Chair', 125000, 1);





INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Inji', 'Ismail', 1, 2),
('Peanut', 'Who', 3, 3),
('Pumbaa', 'Timon',2,  NULL),
('Pickels', 'Oreo', 4, 1 ),
('Scotty', 'doggie', 3, 1),

