/* ════════════════════════════════════════════════════════════════════════════
   DSA Lesson Content — SQL for Data Science (5 weeks, 25 lessons)
   Appends to window.DSA_LESSON_CONTENT (initialised by lesson-content.js)
════════════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
window.DSA_LESSON_CONTENT = window.DSA_LESSON_CONTENT || {};
const L = window.DSA_LESSON_CONTENT;

/* ─── Sample database used throughout this course ──────────────────────────
   Paste this block into PostgreSQL / DB Fiddle (dbfiddle.uk, choose pg 15)
   before running any lesson queries.
──────────────────────────────────────────────────────────────────────────── */
const SQL_SETUP = `-- ══ DSA E-commerce Database ══════════════════════════════

CREATE TABLE departments (
  id     SERIAL PRIMARY KEY,
  name   VARCHAR(60) NOT NULL,
  budget NUMERIC(12,2)
);

CREATE TABLE employees (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  department_id INTEGER REFERENCES departments(id),
  salary        NUMERIC(10,2),
  manager_id    INTEGER REFERENCES employees(id),
  hire_date     DATE
);

CREATE TABLE customers (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(100) NOT NULL,
  email     VARCHAR(150) UNIQUE,
  city      VARCHAR(60),
  join_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE products (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  price    NUMERIC(10,2),
  stock    INTEGER DEFAULT 0
);

CREATE TABLE orders (
  id          SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  order_date  DATE,
  status      VARCHAR(20) CHECK (status IN ('pending','shipped','delivered','cancelled')),
  total       NUMERIC(10,2)
);

CREATE TABLE order_items (
  id         SERIAL PRIMARY KEY,
  order_id   INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity   INTEGER,
  unit_price NUMERIC(10,2)
);

-- ── Data ──────────────────────────────────────────────────
INSERT INTO departments VALUES
  (1,'Engineering',1200000),(2,'Sales',800000),
  (3,'Marketing',600000),(4,'Operations',500000);

INSERT INTO employees VALUES
  (1,'Arjun Sharma',   1,95000,NULL,  '2020-03-15'),
  (2,'Priya Reddy',    2,72000,1,     '2021-06-01'),
  (3,'Rajan Kumar',    1,88000,1,     '2021-09-10'),
  (4,'Ananya Nair',    3,65000,1,     '2022-01-20'),
  (5,'Bala Subramanian',2,70000,2,   '2022-04-05'),
  (6,'Chitra Iyer',   4,60000,1,     '2022-07-18'),
  (7,'Dev Mehta',      1,92000,1,     '2023-02-01'),
  (8,'Esha Patel',    3,68000,4,     '2023-05-12');

INSERT INTO customers VALUES
  (1,'Arun Verma',   'arun@gmail.com',  'Mumbai',  '2023-01-10'),
  (2,'Bina Sharma',  'bina@yahoo.com',  'Delhi',   '2023-02-14'),
  (3,'Chetan Rao',   'chetan@gmail.com','Bengaluru','2023-03-05'),
  (4,'Diya Joshi',   'diya@gmail.com',  'Chennai', '2023-04-22'),
  (5,'Elan Kumar',   'elan@hotmail.com','Hyderabad','2023-05-11'),
  (6,'Farah Khan',   'farah@gmail.com', 'Pune',    '2023-06-30'),
  (7,'Gopal Iyer',   'gopal@gmail.com', 'Mumbai',  '2023-07-08'),
  (8,'Hema Pillai',  'hema@yahoo.com',  'Kochi',   '2023-08-19'),
  (9,'Ishaan Das',   NULL,              'Kolkata', '2023-09-01'),
  (10,'Jaya Menon',  'jaya@gmail.com',  'Bengaluru','2023-10-15');

INSERT INTO products VALUES
  (1,'Laptop Pro 15',      'Electronics', 75000, 12),
  (2,'Wireless Mouse',     'Electronics',  1299, 85),
  (3,'Python Handbook',    'Books',         599, 200),
  (4,'Standing Desk',      'Furniture',   18500, 8),
  (5,'Noise-Cancel Headphones','Electronics',8999,30),
  (6,'SQL Mastery Book',   'Books',         799, 150),
  (7,'Ergonomic Chair',    'Furniture',   12000, 15),
  (8,'USB-C Hub',          'Electronics',  2499, 60);

INSERT INTO orders VALUES
  (1, 1,'2024-01-05','delivered',76299),
  (2, 2,'2024-01-12','delivered', 1898),
  (3, 3,'2024-01-20','shipped',  83999),
  (4, 4,'2024-02-01','delivered', 8999),
  (5, 5,'2024-02-14','delivered',  599),
  (6, 1,'2024-02-20','cancelled', 2499),
  (7, 6,'2024-03-05','delivered',13299),
  (8, 7,'2024-03-10','shipped',  18500),
  (9, 2,'2024-03-18','delivered', 3798),
  (10,3,'2024-04-02','delivered',20999),
  (11,8,'2024-04-15','pending',   1299),
  (12,9,'2024-04-22','delivered',  799),
  (13,4,'2024-05-01','shipped',  87999),
  (14,10,'2024-05-08','delivered',2498),
  (15,5,'2024-05-20','delivered',12000);

INSERT INTO order_items VALUES
  (1, 1,1,1,75000),(2, 1,2,1,1299),
  (3, 2,3,2,599),  (4, 2,6,1,799),
  (5, 3,1,1,75000),(6, 3,5,1,8999),
  (7, 4,5,1,8999), (8, 5,3,1,599),
  (9, 6,8,1,2499), (10,7,7,1,12000),
  (11,7,2,1,1299), (12,8,4,1,18500),
  (13,9,3,2,599),  (14,9,8,2,2499),
  (15,10,4,1,18500),(16,10,2,2,1299),
  (17,11,2,1,1299),(18,12,6,1,799),
  (19,13,1,1,75000),(20,13,5,1,8999),
  (21,13,4,2,18500),(22,14,8,1,2499),
  (23,15,7,1,12000),(24,3,5,1,8999),
  (25,9,5,1,8999);`;

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 1 — DATABASE FUNDAMENTALS & BASIC QUERIES
══════════════════════════════════════════════════════════════════════════ */

L['sql-w1-l1'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>What is a Relational Database?</h2>
<p>Every business runs on data. Customers, orders, transactions, employee records, product inventories — all of it needs to be stored, organised, and queried reliably. A <strong>relational database</strong> is the industry-standard tool for doing exactly that.</p>
<p>The core idea is beautifully simple: data is stored in <strong>tables</strong> (like spreadsheet sheets). Tables are connected to each other through <strong>relationships</strong>. And you query everything using a single language: <strong>SQL</strong>.</p>
<h3>The anatomy of a table</h3>
<p>A table is a grid of rows and columns. Every column has a name and a data type. Every row is one record.</p>
`},
    { type:'code', lang:'text', src:`TABLE: customers

 id │ name           │ email               │ city      │ join_date
────┼────────────────┼─────────────────────┼───────────┼────────────
  1 │ Arun Verma     │ arun@gmail.com      │ Mumbai    │ 2023-01-10
  2 │ Bina Sharma    │ bina@yahoo.com      │ Delhi     │ 2023-02-14
  3 │ Chetan Rao     │ chetan@gmail.com    │ Bengaluru │ 2023-03-05
  4 │ Diya Joshi     │ diya@gmail.com      │ Chennai   │ 2023-04-22
 ...│ ...            │ ...                 │ ...       │ ...

↑ column names          ↑ rows (one customer each)` },
    { type:'text', body:`
<h3>The vocabulary you'll use constantly</h3>
<table style="width:100%;border-collapse:collapse;margin:1rem 0">
<tr style="background:var(--fog2)"><th style="padding:.4rem .8rem;text-align:left">Term</th><th style="padding:.4rem .8rem;text-align:left">Meaning</th><th style="padding:.4rem .8rem;text-align:left">Spreadsheet equivalent</th></tr>
<tr><td style="padding:.4rem .8rem"><strong>Table</strong></td><td style="padding:.4rem .8rem">A named set of rows with a fixed schema</td><td style="padding:.4rem .8rem">Sheet</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><strong>Row / Record</strong></td><td style="padding:.4rem .8rem">One entry in the table</td><td style="padding:.4rem .8rem">Row</td></tr>
<tr><td style="padding:.4rem .8rem"><strong>Column / Field</strong></td><td style="padding:.4rem .8rem">One attribute — has a name and data type</td><td style="padding:.4rem .8rem">Column header</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><strong>Schema</strong></td><td style="padding:.4rem .8rem">The structure — table names, column names, types</td><td style="padding:.4rem .8rem">Workbook structure</td></tr>
<tr><td style="padding:.4rem .8rem"><strong>Primary Key</strong></td><td style="padding:.4rem .8rem">A unique identifier for every row</td><td style="padding:.4rem .8rem">Row number (but smarter)</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><strong>Foreign Key</strong></td><td style="padding:.4rem .8rem">A column that links to another table's PK</td><td style="padding:.4rem .8rem">VLOOKUP value</td></tr>
</table>
<h3>The database we'll use in this course</h3>
<p>Throughout all 5 weeks, we'll use a single e-commerce database with 6 tables. This mirrors what you'd find at a real company — customers, products, orders, order items, employees, and departments.</p>
`},
    { type:'code', lang:'text', src:`┌─────────────┐       ┌──────────────┐       ┌────────────┐
│  customers  │──────<│    orders    │>──────│  products  │
│  id  (PK)   │       │  id  (PK)    │       │  id  (PK)  │
│  name       │       │  customer_id │       │  name      │
│  email      │       │  order_date  │       │  category  │
│  city       │       │  status      │       │  price     │
│  join_date  │       │  total       │       │  stock     │
└─────────────┘       └──────┬───────┘       └────────────┘
                             │ via order_items
                      ┌──────┴──────────┐
┌─────────────┐       │  order_items    │
│ departments │──────<│  employees      │
│  id  (PK)   │       │  ...            │
│  name       │       └─────────────────┘
│  budget     │
└─────────────┘` },
    { type:'text', body:`
<h3>Setting up your environment</h3>
<p>You have two options:</p>
<p><strong>Option A — Online (start in 30 seconds):</strong> Go to <em>dbfiddle.uk</em>, choose <strong>PostgreSQL 15</strong>, paste the setup script (see the pinned resource), and run. No installation needed.</p>
<p><strong>Option B — Local PostgreSQL:</strong> Download from <em>postgresql.org</em>, install, and connect via <strong>DBeaver</strong> (free database IDE). Create a new database called <code>dsa_ecommerce</code>, open a query window, paste and run the setup script.</p>
<p>Paste this at the top of the lesson setup panel to create all tables and load all sample data:</p>
`},
    { type:'code', lang:'sql', src:`-- Run this ONCE to create the course database
-- (Full script is in the course resources)

CREATE TABLE customers (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(100) NOT NULL,
  email     VARCHAR(150) UNIQUE,
  city      VARCHAR(60),
  join_date DATE DEFAULT CURRENT_DATE
);

-- ... (remaining tables: products, orders, order_items, employees, departments)
-- Full 60-line setup script available in the lesson resources.

-- Verify your setup:
SELECT table_name
FROM   information_schema.tables
WHERE  table_schema = 'public'
ORDER  BY table_name;`,
      out:` table_name
─────────────
 customers
 departments
 employees
 order_items
 orders
 products` },
    { type:'tip', body:`If you see those 6 table names, your environment is ready. Every lesson in this course can be run on this dataset.` },
    { type:'exercise', title:'Explore the schema',
      body:`<p>Run the following queries to understand the dataset before we start writing real SQL:</p>
<ol>
<li>How many rows are in each table? (use <code>SELECT count(*) FROM table_name</code> for each)</li>
<li>What are the column names and types in the <code>orders</code> table? (hint: query <code>information_schema.columns</code>)</li>
<li>What distinct cities do our customers come from?</li>
</ol>`,
      hint:`For column info: <code>SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'orders'</code>. For distinct cities: <code>SELECT DISTINCT city FROM customers ORDER BY city</code>.`,
      solution:`-- 1. Row counts
SELECT 'customers'   AS tbl, COUNT(*) FROM customers
UNION ALL
SELECT 'products',             COUNT(*) FROM products
UNION ALL
SELECT 'orders',               COUNT(*) FROM orders
UNION ALL
SELECT 'order_items',          COUNT(*) FROM order_items
UNION ALL
SELECT 'employees',            COUNT(*) FROM employees
UNION ALL
SELECT 'departments',          COUNT(*) FROM departments;

-- 2. orders schema
SELECT column_name, data_type
FROM   information_schema.columns
WHERE  table_name = 'orders'
ORDER  BY ordinal_position;

-- 3. Distinct cities
SELECT DISTINCT city FROM customers ORDER BY city;` }
  ]
};

L['sql-w1-l2'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>SELECT &amp; FROM — Reading Your First Data</h2>
<p>Every SQL query starts with <code>SELECT</code>. It tells the database what columns you want to see. <code>FROM</code> tells it which table to look in. Together, they form the most fundamental SQL statement.</p>
<h3>Selecting all columns</h3>
<p><code>SELECT *</code> means "give me every column". The asterisk is a wildcard:</p>
`},
    { type:'code', lang:'sql', src:`SELECT * FROM customers;`,
      out:` id │ name           │ email               │ city      │ join_date
────┼────────────────┼─────────────────────┼───────────┼────────────
  1 │ Arun Verma     │ arun@gmail.com      │ Mumbai    │ 2023-01-10
  2 │ Bina Sharma    │ bina@yahoo.com      │ Delhi     │ 2023-02-14
  3 │ Chetan Rao     │ chetan@gmail.com    │ Bengaluru │ 2023-03-05
 ...│ ...            │ ...                 │ ...       │ ...
(10 rows)` },
    { type:'warn', body:`In production, avoid <code>SELECT *</code> — it fetches every column even if you only need two, which wastes bandwidth and makes code fragile when table structure changes. Always name your columns explicitly once you know what you need.` },
    { type:'text', body:`<h3>Selecting specific columns</h3>
<p>List only the columns you actually need, separated by commas:</p>`},
    { type:'code', lang:'sql', src:`SELECT name, city, join_date
FROM   customers;`,
      out:` name           │ city      │ join_date
────────────────┼───────────┼────────────
 Arun Verma     │ Mumbai    │ 2023-01-10
 Bina Sharma    │ Delhi     │ 2023-02-14
 Chetan Rao     │ Bengaluru │ 2023-03-05
 Diya Joshi     │ Chennai   │ 2023-04-22
 Elan Kumar     │ Hyderabad │ 2023-05-11
 Farah Khan     │ Pune      │ 2023-06-30
 Gopal Iyer     │ Mumbai    │ 2023-07-08
 Hema Pillai    │ Kochi     │ 2023-08-19
 Ishaan Das     │ Kolkata   │ 2023-09-01
 Jaya Menon     │ Bengaluru │ 2023-10-15
(10 rows)` },
    { type:'text', body:`<h3>Column aliases with AS</h3>
<p>You can rename columns in the output using <code>AS</code>. This doesn't change the table — it only affects what the result columns are called:</p>`},
    { type:'code', lang:'sql', src:`SELECT name        AS customer_name,
       city        AS location,
       join_date   AS "Joined On"    -- quotes needed for spaces
FROM   customers;`,
      out:` customer_name   │ location  │ Joined On
────────────────┼───────────┼────────────
 Arun Verma     │ Mumbai    │ 2023-01-10
 Bina Sharma    │ Delhi     │ 2023-02-14
 ...` },
    { type:'text', body:`<h3>Computed columns</h3>
<p>SQL can calculate new values inline. The result appears as a new column:</p>`},
    { type:'code', lang:'sql', src:`SELECT name,
       price,
       price * 1.18          AS price_with_gst,
       ROUND(price * 0.90, 2) AS discounted_price
FROM   products;`,
      out:` name                    │  price  │ price_with_gst │ discounted_price
─────────────────────────┼─────────┼────────────────┼──────────────────
 Laptop Pro 15           │ 75000   │     88500.00   │         67500.00
 Wireless Mouse          │  1299   │      1532.82   │          1169.10
 Python Handbook         │   599   │       706.82   │           539.10
 Standing Desk           │ 18500   │     21830.00   │         16650.00
 Noise-Cancel Headphones │  8999   │     10618.82   │          8099.10
 SQL Mastery Book        │   799   │       942.82   │           719.10
 Ergonomic Chair         │ 12000   │     14160.00   │         10800.00
 USB-C Hub               │  2499   │      2948.82   │          2249.10` },
    { type:'tip', body:`SQL ignores whitespace and line breaks — you can format queries however you like. Convention: write SQL keywords in UPPERCASE and table/column names in lowercase. This makes queries instantly readable.` },
    { type:'exercise', title:'Your first SELECT queries',
      body:`<p>Write three queries:</p>
<ol>
<li>Select only the <code>name</code> and <code>price</code> from <code>products</code>, with an alias <code>price_inr</code> for the price column.</li>
<li>Select <code>id</code>, <code>order_date</code>, <code>status</code>, and <code>total</code> from <code>orders</code>. Add a computed column <code>total_with_gst</code> = total × 1.18, rounded to 2 decimal places.</li>
<li>Select <code>name</code>, <code>salary</code>, and a computed column <code>annual_salary</code> (= salary × 12) from <code>employees</code>.</li>
</ol>`,
      hint:`For ROUND: <code>ROUND(expression, decimal_places)</code>. Column aliases go directly after the expression: <code>expression AS alias_name</code>. You can chain computed columns anywhere in the SELECT list.`,
      solution:`-- 1. Products name and price
SELECT name, price AS price_inr
FROM   products;

-- 2. Orders with GST
SELECT id,
       order_date,
       status,
       total,
       ROUND(total * 1.18, 2) AS total_with_gst
FROM   orders;

-- 3. Employee annual salary
SELECT name,
       salary,
       salary * 12 AS annual_salary
FROM   employees;` }
  ]
};

L['sql-w1-l3'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>WHERE — Filtering Rows</h2>
<p>Without filtering, every query returns the entire table. <code>WHERE</code> adds a condition — the database evaluates it for each row and only returns rows where the condition is <code>TRUE</code>.</p>
<h3>Comparison operators</h3>
`},
    { type:'code', lang:'sql', src:`-- Products priced above ₹5,000
SELECT name, price
FROM   products
WHERE  price > 5000;`,
      out:` name                    │  price
─────────────────────────┼────────
 Laptop Pro 15           │ 75000
 Standing Desk           │ 18500
 Noise-Cancel Headphones │  8999
 Ergonomic Chair         │ 12000` },
    { type:'code', lang:'sql', src:`-- Exact match — orders that are 'delivered'
SELECT id, customer_id, order_date, total
FROM   orders
WHERE  status = 'delivered';`,
      out:` id │ customer_id │ order_date │   total
────┼─────────────┼────────────┼──────────
  1 │           1 │ 2024-01-05 │ 76299.00
  2 │           2 │ 2024-01-12 │  1898.00
  4 │           4 │ 2024-02-01 │  8999.00
  5 │           5 │ 2024-02-14 │   599.00
  7 │           6 │ 2024-03-05 │ 13299.00
  9 │           2 │ 2024-03-18 │  3798.00
 10 │           3 │ 2024-04-02 │ 20999.00
 12 │           9 │ 2024-04-22 │   799.00
 14 │          10 │ 2024-05-08 │  2498.00
 15 │           5 │ 2024-05-20 │ 12000.00` },
    { type:'text', body:`<h3>Logical operators: AND, OR, NOT</h3>
<p>Combine conditions with <code>AND</code> (both must be true), <code>OR</code> (either must be true), <code>NOT</code> (invert the result):</p>`},
    { type:'code', lang:'sql', src:`-- Electronics products under ₹3,000
SELECT name, price, stock
FROM   products
WHERE  category = 'Electronics'
AND    price < 3000;`,
      out:` name           │ price │ stock
────────────────┼───────┼───────
 Wireless Mouse │  1299 │    85
 USB-C Hub      │  2499 │    60` },
    { type:'code', lang:'sql', src:`-- Orders that are either pending or cancelled:
SELECT id, status, total
FROM   orders
WHERE  status = 'pending'
OR     status = 'cancelled';`,
      out:` id │ status    │   total
────┼───────────┼──────────
  6 │ cancelled │  2499.00
 11 │ pending   │  1299.00` },
    { type:'text', body:`<h3>BETWEEN, IN and LIKE</h3>
<p>These are shorthand patterns for common filter types:</p>`},
    { type:'code', lang:'sql', src:`-- BETWEEN: inclusive range (same as price >= 1000 AND price <= 10000)
SELECT name, price
FROM   products
WHERE  price BETWEEN 1000 AND 10000;`,
      out:` name                    │  price
─────────────────────────┼────────
 Wireless Mouse          │   1299
 Noise-Cancel Headphones │   8999
 USB-C Hub               │   2499` },
    { type:'code', lang:'sql', src:`-- IN: match any value in a list (cleaner than chaining OR)
SELECT name, city
FROM   customers
WHERE  city IN ('Mumbai', 'Delhi', 'Bengaluru');`,
      out:` name        │ city
─────────────┼───────────
 Arun Verma  │ Mumbai
 Bina Sharma │ Delhi
 Chetan Rao  │ Bengaluru
 Gopal Iyer  │ Mumbai
 Jaya Menon  │ Bengaluru` },
    { type:'code', lang:'sql', src:`-- LIKE: pattern matching. % = any sequence of chars, _ = exactly one char
SELECT name, email
FROM   customers
WHERE  email LIKE '%gmail.com';   -- ends with gmail.com`,
      out:` name        │ email
─────────────┼─────────────────────
 Arun Verma  │ arun@gmail.com
 Chetan Rao  │ chetan@gmail.com
 Diya Joshi  │ diya@gmail.com
 Elan Kumar  │ (no match — hotmail)
 Farah Khan  │ farah@gmail.com
 Gopal Iyer  │ gopal@gmail.com
 Jaya Menon  │ jaya@gmail.com` },
    { type:'tip', body:`<code>ILIKE</code> is the case-insensitive version of <code>LIKE</code> (PostgreSQL only). <code>WHERE email ILIKE '%GMAIL%'</code> matches regardless of capitalisation.` },
    { type:'code', lang:'sql', src:`-- NOT: negate any condition
SELECT name, category, price
FROM   products
WHERE  category NOT IN ('Books')
AND    price NOT BETWEEN 10000 AND 80000;`,
      out:` name           │ category    │  price
────────────────┼─────────────┼────────
 Wireless Mouse │ Electronics │   1299
 USB-C Hub      │ Electronics │   2499` },
    { type:'exercise', title:'Filter the orders table',
      body:`<p>Write queries to find:</p>
<ol>
<li>All orders placed in February 2024 (hint: <code>order_date BETWEEN '2024-02-01' AND '2024-02-28'</code>)</li>
<li>All products in the 'Books' or 'Furniture' category with a price under ₹15,000</li>
<li>Customers whose name starts with a vowel (A, B, C, D, E — try A, E, I)</li>
<li>All orders that are NOT delivered and have a total greater than ₹5,000</li>
</ol>`,
      hint:`For names starting with a vowel: use <code>LIKE 'A%' OR LIKE 'E%' OR LIKE 'I%'</code>, or use a PostgreSQL regex: <code>name ~ '^[AEIOU]'</code>. Wrap OR conditions in parentheses when combining with AND.`,
      solution:`-- 1. February 2024 orders
SELECT id, order_date, status, total
FROM   orders
WHERE  order_date BETWEEN '2024-02-01' AND '2024-02-28';

-- 2. Books or Furniture under ₹15,000
SELECT name, category, price
FROM   products
WHERE  category IN ('Books','Furniture')
AND    price < 15000;

-- 3. Customers with vowel-starting names
SELECT name, city
FROM   customers
WHERE  name LIKE 'A%' OR name LIKE 'E%' OR name LIKE 'I%';

-- 4. Not delivered, total > 5000
SELECT id, status, total
FROM   orders
WHERE  status <> 'delivered'
AND    total > 5000;` }
  ]
};

L['sql-w1-l4'] = {
  duration_mins: 12,
  sections: [
    { type:'text', body:`
<h2>ORDER BY, LIMIT &amp; OFFSET</h2>
<p>Without <code>ORDER BY</code>, a database can return rows in <em>any</em> order — the order is not guaranteed and can change with database updates or query plans. Always sort explicitly when order matters.</p>
<h3>ORDER BY — sorting results</h3>
`},
    { type:'code', lang:'sql', src:`-- Most expensive products first
SELECT name, category, price
FROM   products
ORDER  BY price DESC;`,
      out:` name                    │ category    │  price
─────────────────────────┼─────────────┼────────
 Laptop Pro 15           │ Electronics │ 75000
 Standing Desk           │ Furniture   │ 18500
 Ergonomic Chair         │ Furniture   │ 12000
 Noise-Cancel Headphones │ Electronics │  8999
 USB-C Hub               │ Electronics │  2499
 SQL Mastery Book        │ Books       │   799
 Python Handbook         │ Books       │   599
 Wireless Mouse          │ Electronics │  1299` },
    { type:'code', lang:'sql', src:`-- Multi-column sort: category A→Z, then price high→low within each category
SELECT name, category, price
FROM   products
ORDER  BY category ASC, price DESC;`,
      out:` name                    │ category    │  price
─────────────────────────┼─────────────┼────────
 SQL Mastery Book        │ Books       │   799
 Python Handbook         │ Books       │   599
 Laptop Pro 15           │ Electronics │ 75000
 Noise-Cancel Headphones │ Electronics │  8999
 USB-C Hub               │ Electronics │  2499
 Wireless Mouse          │ Electronics │  1299
 Standing Desk           │ Furniture   │ 18500
 Ergonomic Chair         │ Furniture   │ 12000` },
    { type:'text', body:`<h3>LIMIT — restricting result size</h3>
<p>Databases can have millions of rows. <code>LIMIT</code> tells the database to return at most N rows. Always combine with <code>ORDER BY</code> or the "top N" result is arbitrary:</p>`},
    { type:'code', lang:'sql', src:`-- Top 3 highest-value orders
SELECT id, customer_id, order_date, total
FROM   orders
ORDER  BY total DESC
LIMIT  3;`,
      out:` id │ customer_id │ order_date │    total
────┼─────────────┼────────────┼──────────
 13 │           4 │ 2024-05-01 │ 87999.00
  3 │           3 │ 2024-01-20 │ 83999.00
  1 │           1 │ 2024-01-05 │ 76299.00` },
    { type:'text', body:`<h3>OFFSET — skipping rows (pagination)</h3>
<p><code>OFFSET</code> skips the first N rows. Combined with <code>LIMIT</code>, this powers pagination — showing page 2, page 3, etc.:</p>`},
    { type:'code', lang:'sql', src:`-- Page 1: customers 1-3
SELECT id, name, city
FROM   customers
ORDER  BY id
LIMIT  3 OFFSET 0;

-- Page 2: customers 4-6
SELECT id, name, city
FROM   customers
ORDER  BY id
LIMIT  3 OFFSET 3;`,
      out:`-- Page 1:
 id │ name       │ city
────┼────────────┼──────────
  1 │ Arun Verma │ Mumbai
  2 │ Bina Sharma│ Delhi
  3 │ Chetan Rao │ Bengaluru

-- Page 2:
 id │ name        │ city
────┼─────────────┼──────────
  4 │ Diya Joshi  │ Chennai
  5 │ Elan Kumar  │ Hyderabad
  6 │ Farah Khan  │ Pune` },
    { type:'tip', body:`The pagination formula: <code>OFFSET = (page_number - 1) × page_size</code>. Page 1 → OFFSET 0. Page 2 → OFFSET 3. Page 3 → OFFSET 6. And so on.` },
    { type:'exercise', title:'Sort, limit and paginate',
      body:`<p>Write queries for:</p>
<ol>
<li>The 5 most recently joined customers (newest first)</li>
<li>The 3 cheapest products, showing only name and price</li>
<li>Employees sorted by salary descending — show page 2 if each page has 3 employees</li>
<li>Orders sorted by order_date ascending, then by total descending for same-date orders</li>
</ol>`,
      hint:`For (3): page 2 with page size 3 means <code>LIMIT 3 OFFSET 3</code>. For (4): <code>ORDER BY order_date ASC, total DESC</code> — two sort keys.`,
      solution:`-- 1. 5 most recent customers
SELECT name, city, join_date
FROM   customers
ORDER  BY join_date DESC
LIMIT  5;

-- 2. 3 cheapest products
SELECT name, price
FROM   products
ORDER  BY price ASC
LIMIT  3;

-- 3. Employees page 2
SELECT name, salary
FROM   employees
ORDER  BY salary DESC
LIMIT  3 OFFSET 3;

-- 4. Orders by date then total
SELECT id, order_date, status, total
FROM   orders
ORDER  BY order_date ASC, total DESC;` }
  ]
};

L['sql-w1-l5'] = {
  duration_mins: 25,
  sections: [
    { type:'text', body:`
<h2>CASE WHEN — Conditional Logic in SQL</h2>
<p><code>CASE WHEN</code> is SQL's if/else. It evaluates conditions row by row and returns different values based on which condition is true. It's one of the most frequently used SQL constructs in data analysis — for bucketing, labelling, conditional aggregation, and pivoting data.</p>
<h3>The simple form</h3>
`},
    { type:'code', lang:'sql', src:`-- Label each product by price tier
SELECT name,
       price,
       CASE
           WHEN price < 1000  THEN 'Budget'
           WHEN price < 10000 THEN 'Mid-range'
           WHEN price < 50000 THEN 'Premium'
           ELSE 'Luxury'
       END AS price_tier
FROM   products
ORDER  BY price;`,
      out:` name                    │  price │ price_tier
─────────────────────────┼────────┼────────────
 Python Handbook         │    599 │ Budget
 SQL Mastery Book        │    799 │ Budget
 Wireless Mouse          │   1299 │ Mid-range
 USB-C Hub               │   2499 │ Mid-range
 Noise-Cancel Headphones │   8999 │ Mid-range
 Ergonomic Chair         │  12000 │ Premium
 Standing Desk           │  18500 │ Premium
 Laptop Pro 15           │  75000 │ Luxury` },
    { type:'code', lang:'sql', src:`-- CASE inside aggregate — conditional counting (no need for WHERE)
-- How many orders in each status, all in one query:
SELECT
    COUNT(*) FILTER (WHERE status = 'delivered')  AS delivered,
    COUNT(*) FILTER (WHERE status = 'shipped')    AS shipped,
    COUNT(*) FILTER (WHERE status = 'pending')    AS pending,
    COUNT(*) FILTER (WHERE status = 'cancelled')  AS cancelled,
    COUNT(*)                                      AS total
FROM   orders;`,
      out:` delivered │ shipped │ pending │ cancelled │ total
───────────┼─────────┼─────────┼───────────┼───────
        10 │       3 │       2 │         2 │    17` },
    { type:'text', body:`<h3>CASE in GROUP BY — salary band analysis</h3>
<p>CASE WHEN inside a GROUP BY lets you group rows into custom buckets. This pattern appears in virtually every analyst's toolkit:</p>`},
    { type:'code', lang:'sql', src:`-- Salary band distribution with headcount and budget impact
SELECT
    CASE
        WHEN salary < 60000  THEN '< 60k'
        WHEN salary < 80000  THEN '60k–80k'
        WHEN salary < 100000 THEN '80k–100k'
        ELSE                      '100k+'
    END                           AS salary_band,
    COUNT(*)                      AS headcount,
    ROUND(AVG(salary), 0)         AS avg_salary,
    SUM(salary * 12)              AS annual_cost
FROM   employees
GROUP  BY salary_band
ORDER  BY MIN(salary);`,
      out:` salary_band │ headcount │ avg_salary │ annual_cost
─────────────┼───────────┼────────────┼─────────────
 60k–80k     │         3 │      74333 │     2676000
 80k–100k    │         3 │      89333 │     3216000
 100k+       │         2 │     107500 │     2580000` },
    { type:'tip', body:`The <code>FILTER (WHERE condition)</code> clause (PostgreSQL 9.4+) is a cleaner alternative to <code>SUM(CASE WHEN ... THEN 1 ELSE 0 END)</code> for conditional counting. Both produce identical results but FILTER reads more naturally.` },
    { type:'text', body:`
<h2>NULL Values — The Absent Data Problem</h2>
<p>NULL means <em>absent</em> or <em>unknown</em>. It is not zero. It is not an empty string. It is the absence of any value. This distinction matters enormously — NULL behaves differently from any other value in SQL, and misunderstanding it causes some of the most common SQL bugs.</p>
<h3>Why NULL exists in our data</h3>
<p>Look at customer 9 (Ishaan Das) in our table — he has no email address. That field is NULL. It could be because he never provided one, or it was lost. We simply don't know the value.</p>
<h3>IS NULL and IS NOT NULL</h3>
<p><code>WHERE email = NULL</code> <strong>never works</strong> — comparing anything to NULL with <code>=</code> always returns NULL (not TRUE or FALSE). You must use <code>IS NULL</code>:</p>
`},
    { type:'code', lang:'sql', src:`-- Customers without an email address:
SELECT id, name, city
FROM   customers
WHERE  email IS NULL;`,
      out:` id │ name       │ city
────┼────────────┼────────
  9 │ Ishaan Das │ Kolkata` },
    { type:'code', lang:'sql', src:`-- Customers who DO have an email:
SELECT name, email
FROM   customers
WHERE  email IS NOT NULL
ORDER  BY name;`,
      out:` name        │ email
─────────────┼─────────────────────
 Arun Verma  │ arun@gmail.com
 Bina Sharma │ bina@yahoo.com
 Chetan Rao  │ chetan@gmail.com
 Diya Joshi  │ diya@gmail.com
 Elan Kumar  │ elan@hotmail.com
 Farah Khan  │ farah@gmail.com
 Gopal Iyer  │ gopal@gmail.com
 Hema Pillai │ hema@yahoo.com
 Jaya Menon  │ jaya@gmail.com
(9 rows)` },
    { type:'text', body:`<h3>COALESCE — providing a default for NULLs</h3>
<p><code>COALESCE(value1, value2, ...)</code> returns the first non-NULL value from its arguments. It's the cleanest way to replace NULLs with a meaningful default:</p>`},
    { type:'code', lang:'sql', src:`SELECT name,
       COALESCE(email, 'No email on file') AS contact_email,
       city
FROM   customers
ORDER  BY id;`,
      out:` name        │ contact_email        │ city
─────────────┼──────────────────────┼───────────
 Arun Verma  │ arun@gmail.com       │ Mumbai
 Bina Sharma │ bina@yahoo.com       │ Delhi
 ...         │ ...                  │ ...
 Ishaan Das  │ No email on file     │ Kolkata
 Jaya Menon  │ jaya@gmail.com       │ Bengaluru` },
    { type:'code', lang:'sql', src:`-- COALESCE works great for calculations too.
-- Suppose some employees have NULL manager_id (they are the top manager):
SELECT name,
       COALESCE(manager_id::TEXT, 'Top Management') AS reports_to
FROM   employees
ORDER  BY id;`,
      out:` name               │ reports_to
────────────────────┼────────────────
 Arjun Sharma       │ Top Management
 Priya Reddy        │ 1
 Rajan Kumar        │ 1
 Ananya Nair        │ 1
 Bala Subramanian   │ 2
 Chitra Iyer        │ 1
 Dev Mehta          │ 1
 Esha Patel         │ 4` },
    { type:'text', body:`<h3>NULLIF — turning a value INTO NULL</h3>
<p><code>NULLIF(a, b)</code> returns NULL if <code>a = b</code>, otherwise returns <code>a</code>. The classic use: safely divide without division-by-zero errors:</p>`},
    { type:'code', lang:'sql', src:`-- Safe division: NULLIF turns 0 into NULL so the division returns NULL
-- instead of crashing with "division by zero"
SELECT product_id,
       SUM(quantity)                                   AS total_sold,
       SUM(quantity * unit_price)                      AS revenue,
       SUM(quantity * unit_price)
         / NULLIF(SUM(quantity), 0)                    AS avg_unit_price
FROM   order_items
GROUP  BY product_id
ORDER  BY product_id;`,
      out:` product_id │ total_sold │   revenue  │ avg_unit_price
────────────┼────────────┼────────────┼────────────────
          1 │          3 │ 225000.00  │       75000.00
          2 │          5 │    6495.00 │        1299.00
          3 │          4 │    2396.00 │         599.00
          4 │          4 │   74000.00 │       18500.00
          5 │          5 │   44995.00 │        8999.00
          6 │          2 │    1598.00 │         799.00
          7 │          2 │   24000.00 │       12000.00
          8 │          3 │    7497.00 │        2499.00` },
    { type:'tip', body:`NULL propagates through arithmetic: <code>NULL + 5 = NULL</code>, <code>NULL * 100 = NULL</code>. If any input to a calculation is NULL, the output is NULL. Always account for this in aggregate queries.` },
    { type:'exercise', title:'CASE WHEN + NULL Analysis',
      body:`<p>Write four queries combining CASE WHEN and NULL handling:</p>
<ol>
<li><strong>Product labels:</strong> Show each product's name, price, and a <code>stock_status</code> column: <code>'Out of Stock'</code> (stock=0), <code>'Low'</code> (1–5), <code>'Adequate'</code> (6–20), <code>'Well Stocked'</code> (20+)</li>
<li><strong>Order risk score:</strong> For each order, assign a <code>risk</code> label: <code>'High'</code> if status is cancelled, <code>'Medium'</code> if pending, <code>'Low'</code> for others. Show order id, total, status, and risk. Count how many orders fall in each risk category.</li>
<li><strong>NULL audit:</strong> Write a single query over the <code>customers</code> table that reports: total rows, rows with NULL email, rows with NULL city, and rows where BOTH are present — all in one result row.</li>
<li><strong>Conditional pivot:</strong> Using CASE WHEN inside SUM, show a single row with columns <code>electronics_revenue</code>, <code>furniture_revenue</code>, <code>books_revenue</code> from the order_items and products tables.</li>
</ol>`,
      hint:`For (3) use <code>COUNT(*) FILTER (WHERE email IS NULL)</code>. For (4): <code>SUM(CASE WHEN p.category='Electronics' THEN oi.quantity*oi.unit_price ELSE 0 END)</code>.`,
      solution:`-- 1. Stock status
SELECT name, stock,
       CASE WHEN stock = 0    THEN 'Out of Stock'
            WHEN stock <= 5   THEN 'Low'
            WHEN stock <= 20  THEN 'Adequate'
            ELSE                   'Well Stocked'
       END AS stock_status
FROM   products ORDER BY stock;

-- 2. Order risk labels + count
WITH labelled AS (
    SELECT id, total, status,
           CASE status
               WHEN 'cancelled' THEN 'High'
               WHEN 'pending'   THEN 'Medium'
               ELSE                  'Low'
           END AS risk
    FROM   orders
)
SELECT risk, COUNT(*) AS orders, ROUND(AVG(total),2) AS avg_total
FROM   labelled GROUP BY risk ORDER BY risk;

-- 3. NULL audit in one row
SELECT COUNT(*)                               AS total_customers,
       COUNT(*) FILTER (WHERE email IS NULL)  AS null_email,
       COUNT(*) FILTER (WHERE city  IS NULL)  AS null_city,
       COUNT(*) FILTER (WHERE email IS NULL
                           AND city  IS NULL) AS null_both
FROM   customers;

-- 4. Conditional pivot
SELECT
    SUM(CASE WHEN p.category = 'Electronics' THEN oi.quantity*oi.unit_price ELSE 0 END) AS electronics_revenue,
    SUM(CASE WHEN p.category = 'Furniture'   THEN oi.quantity*oi.unit_price ELSE 0 END) AS furniture_revenue,
    SUM(CASE WHEN p.category = 'Books'       THEN oi.quantity*oi.unit_price ELSE 0 END) AS books_revenue
FROM   order_items oi
JOIN   products p ON oi.product_id = p.id;` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 2 — AGGREGATIONS & GROUPING
══════════════════════════════════════════════════════════════════════════ */

L['sql-w2-l1'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>Aggregate Functions — Summarising Data</h2>
<p>Individual rows are data. Aggregates turn data into <em>insight</em>. An aggregate function collapses many rows into a single summary value. This is how you answer questions like "what is our total revenue?" or "how many customers do we have per city?"</p>
<h3>COUNT — counting rows</h3>
`},
    { type:'code', lang:'sql', src:`-- COUNT(*): total number of rows
SELECT COUNT(*) AS total_customers
FROM   customers;

-- COUNT(column): rows where the column is NOT NULL
SELECT COUNT(email) AS customers_with_email
FROM   customers;

-- COUNT(DISTINCT column): unique non-null values
SELECT COUNT(DISTINCT city) AS unique_cities
FROM   customers;`,
      out:`-- COUNT(*)
 total_customers
─────────────────
              10

-- COUNT(email)
 customers_with_email
──────────────────────
                    9

-- COUNT(DISTINCT city)
 unique_cities
───────────────
             8` },
    { type:'code', lang:'sql', src:`-- SUM: total of a numeric column
SELECT SUM(total)            AS total_revenue,
       SUM(total) / COUNT(*) AS avg_order_value
FROM   orders
WHERE  status = 'delivered';`,
      out:` total_revenue │ avg_order_value
───────────────┼─────────────────
    140889.00  │       14088.90` },
    { type:'code', lang:'sql', src:`-- AVG, MIN, MAX in one query:
SELECT ROUND(AVG(price), 2) AS avg_price,
       MIN(price)            AS cheapest,
       MAX(price)            AS most_expensive,
       SUM(stock)            AS total_stock_units
FROM   products;`,
      out:` avg_price │ cheapest │ most_expensive │ total_stock_units
───────────┼──────────┼────────────────┼──────────────────
  12449.38 │      599 │          75000 │              560` },
    { type:'tip', body:`<code>AVG</code> ignores NULLs. So <code>AVG(salary)</code> averages only the non-NULL salaries. This is usually what you want, but be aware: if 3 out of 10 rows are NULL, the average is over 7 rows, not 10.` },
    { type:'text', body:`<h3>Combining aggregates in one query</h3>
<p>You can compute multiple aggregates in a single SELECT — the database scans the table once and computes all of them:</p>`},
    { type:'code', lang:'sql', src:`-- Full order report in one pass:
SELECT COUNT(*)                              AS total_orders,
       COUNT(CASE WHEN status='delivered' THEN 1 END) AS delivered,
       COUNT(CASE WHEN status='shipped'   THEN 1 END) AS shipped,
       COUNT(CASE WHEN status='pending'   THEN 1 END) AS pending,
       COUNT(CASE WHEN status='cancelled' THEN 1 END) AS cancelled,
       SUM(total)                            AS total_value,
       ROUND(AVG(total), 2)                  AS avg_value,
       MAX(total)                            AS largest_order,
       MIN(total)                            AS smallest_order
FROM   orders;`,
      out:` total_orders │ delivered │ shipped │ pending │ cancelled │ total_value │ avg_value │ largest_order │ smallest_order
──────────────┼───────────┼─────────┼─────────┼───────────┼─────────────┼───────────┼───────────────┼────────────────
           15 │        10 │         3 │       1 │         1 │   336885.00 │  22459.00 │      87999.00 │        599.00` },
    { type:'exercise', title:'Aggregate the inventory',
      body:`<p>Write queries to find:</p>
<ol>
<li>Total number of products, and how many have stock > 20</li>
<li>Average, min and max salary in the <code>employees</code> table</li>
<li>Total quantity of items sold and total revenue from <code>order_items</code></li>
<li>How many distinct products have been ordered (count distinct product_id in order_items)</li>
</ol>`,
      hint:`For (1): <code>COUNT(CASE WHEN stock > 20 THEN 1 END)</code> counts only rows meeting the condition. For (3): <code>SUM(quantity)</code> and <code>SUM(quantity * unit_price)</code>.`,
      solution:`-- 1. Products and high-stock count
SELECT COUNT(*)                                          AS total_products,
       COUNT(CASE WHEN stock > 20 THEN 1 END)            AS high_stock_products
FROM   products;

-- 2. Salary stats
SELECT ROUND(AVG(salary), 2) AS avg_salary,
       MIN(salary)            AS min_salary,
       MAX(salary)            AS max_salary
FROM   employees;

-- 3. Items and revenue
SELECT SUM(quantity)                  AS total_units_sold,
       SUM(quantity * unit_price)     AS total_revenue
FROM   order_items;

-- 4. Distinct products ordered
SELECT COUNT(DISTINCT product_id) AS products_ordered
FROM   order_items;` }
  ]
};

L['sql-w2-l2'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>GROUP BY — Computing Per-Group Summaries</h2>
<p><code>GROUP BY</code> splits the rows into groups and then applies aggregate functions <em>to each group separately</em>. The result has one row per group — this is the most important thing to understand about GROUP BY.</p>
<h3>Basic GROUP BY</h3>
`},
    { type:'code', lang:'sql', src:`-- Total revenue and order count per status:
SELECT status,
       COUNT(*)       AS order_count,
       SUM(total)     AS revenue,
       AVG(total)     AS avg_order_value
FROM   orders
GROUP  BY status
ORDER  BY revenue DESC;`,
      out:` status    │ order_count │   revenue  │ avg_order_value
───────────┼─────────────┼────────────┼─────────────────
 delivered │          10 │ 140889.00  │       14088.90
 shipped   │           3 │ 109498.00  │       36499.33
 cancelled │           1 │   2499.00  │        2499.00
 pending   │           1 │   1299.00  │        1299.00` },
    { type:'text', body:`<h3>The GROUP BY rule</h3>
<p>Every column in <code>SELECT</code> must either be (a) in the <code>GROUP BY</code> clause, or (b) inside an aggregate function. This is not optional — the database enforces it:</p>`},
    { type:'code', lang:'sql', src:`-- ✓ CORRECT: city is in GROUP BY; COUNT is an aggregate
SELECT city, COUNT(*) AS customers
FROM   customers
GROUP  BY city
ORDER  BY customers DESC;`,
      out:` city      │ customers
───────────┼───────────
 Mumbai    │         2
 Bengaluru │         2
 Delhi     │         1
 Chennai   │         1
 Hyderabad │         1
 Pune      │         1
 Kochi     │         1
 Kolkata   │         1` },
    { type:'code', lang:'sql', src:`-- ✗ ERROR: name is neither in GROUP BY nor in an aggregate
-- SELECT name, city, COUNT(*) FROM customers GROUP BY city;
-- ERROR: column "name" must appear in GROUP BY or aggregate function

-- ✓ FIX: group by both columns you want to show
SELECT city, name, COUNT(*) AS orders
FROM   customers
GROUP  BY city, name;` },
    { type:'text', body:`<h3>Grouping on multiple columns</h3>
<p>You can group by multiple columns — each unique combination becomes one group:</p>`},
    { type:'code', lang:'sql', src:`-- Products sold per category: total units and revenue
SELECT   p.category,
         COUNT(DISTINCT oi.order_id) AS orders_containing,
         SUM(oi.quantity)            AS units_sold,
         SUM(oi.quantity * oi.unit_price) AS revenue
FROM     order_items oi
JOIN     products p ON oi.product_id = p.id
GROUP BY p.category
ORDER BY revenue DESC;`,
      out:` category    │ orders_containing │ units_sold │   revenue
─────────────┼───────────────────┼────────────┼──────────────
 Electronics │                12 │         18 │  292482.00
 Furniture   │                 6 │          6 │  111000.00
 Books       │                 5 │          6 │    3994.00` },
    { type:'tip', body:`You can use column aliases in <code>ORDER BY</code> but <strong>not</strong> in <code>WHERE</code> or <code>GROUP BY</code>. The SQL execution order is: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. Aliases are only resolved at the SELECT stage.` },
    { type:'exercise', title:'Aggregate by group',
      body:`<p>Write GROUP BY queries to find:</p>
<ol>
<li>Number of employees and average salary per department (join employees to departments on department_id)</li>
<li>Total quantity and revenue per product from order_items (join to products for the name)</li>
<li>Number of orders and average total per customer — show the customer name (join to customers)</li>
<li>Revenue by month — extract the month from order_date and group by it</li>
</ol>`,
      hint:`For (4): use <code>EXTRACT(MONTH FROM order_date)</code> or <code>DATE_TRUNC('month', order_date)</code>. For joins: <code>FROM orders o JOIN customers c ON o.customer_id = c.id</code> then group by customer.`,
      solution:`-- 1. Employees per department
SELECT d.name AS department,
       COUNT(e.id) AS headcount,
       ROUND(AVG(e.salary), 2) AS avg_salary
FROM   employees e
JOIN   departments d ON e.department_id = d.id
GROUP  BY d.name
ORDER  BY avg_salary DESC;

-- 2. Sales per product
SELECT p.name, SUM(oi.quantity) AS units,
       SUM(oi.quantity * oi.unit_price) AS revenue
FROM   order_items oi JOIN products p ON oi.product_id = p.id
GROUP  BY p.name ORDER BY revenue DESC;

-- 3. Orders per customer
SELECT c.name, COUNT(o.id) AS orders,
       ROUND(AVG(o.total), 2) AS avg_order
FROM   orders o JOIN customers c ON o.customer_id = c.id
GROUP  BY c.name ORDER BY orders DESC;

-- 4. Revenue by month
SELECT EXTRACT(MONTH FROM order_date) AS month,
       SUM(total) AS revenue, COUNT(*) AS orders
FROM   orders
GROUP  BY month ORDER BY month;` }
  ]
};

L['sql-w2-l3'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>HAVING — Filtering Groups</h2>
<p><code>HAVING</code> is to groups what <code>WHERE</code> is to rows. <code>WHERE</code> filters rows <em>before</em> grouping. <code>HAVING</code> filters groups <em>after</em> aggregation. This is the key distinction:</p>
<table style="width:100%;border-collapse:collapse;margin:1rem 0">
<tr style="background:var(--fog2)"><th style="padding:.4rem .8rem;text-align:left"></th><th style="padding:.4rem .8rem;text-align:left">WHERE</th><th style="padding:.4rem .8rem;text-align:left">HAVING</th></tr>
<tr><td style="padding:.4rem .8rem">Runs</td><td style="padding:.4rem .8rem">Before GROUP BY</td><td style="padding:.4rem .8rem">After GROUP BY</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem">Filters</td><td style="padding:.4rem .8rem">Individual rows</td><td style="padding:.4rem .8rem">Groups (aggregated results)</td></tr>
<tr><td style="padding:.4rem .8rem">Can use aggregates?</td><td style="padding:.4rem .8rem">No</td><td style="padding:.4rem .8rem">Yes</td></tr>
</table>
`},
    { type:'code', lang:'sql', src:`-- Cities with more than 1 customer:
SELECT city, COUNT(*) AS customer_count
FROM   customers
GROUP  BY city
HAVING COUNT(*) > 1
ORDER  BY customer_count DESC;`,
      out:` city      │ customer_count
───────────┼────────────────
 Mumbai    │              2
 Bengaluru │              2` },
    { type:'code', lang:'sql', src:`-- Products with total revenue over ₹20,000:
SELECT p.name,
       SUM(oi.quantity)                    AS units_sold,
       SUM(oi.quantity * oi.unit_price)    AS revenue
FROM   order_items oi
JOIN   products p ON oi.product_id = p.id
GROUP  BY p.name
HAVING SUM(oi.quantity * oi.unit_price) > 20000
ORDER  BY revenue DESC;`,
      out:` name                    │ units_sold │   revenue
─────────────────────────┼────────────┼──────────────
 Laptop Pro 15           │          3 │  225000.00
 Standing Desk           │          4 │   74000.00
 Noise-Cancel Headphones │          5 │   44995.00
 Ergonomic Chair         │          2 │   24000.00` },
    { type:'text', body:`<h3>WHERE and HAVING together</h3>
<p>Use <code>WHERE</code> to eliminate rows first (faster — reduces data before grouping), then <code>HAVING</code> to filter the groups:</p>`},
    { type:'code', lang:'sql', src:`-- Among DELIVERED orders only, which customers spent more than ₹10,000 total?
SELECT c.name,
       COUNT(o.id)          AS delivered_orders,
       SUM(o.total)         AS total_spent
FROM   orders o
JOIN   customers c ON o.customer_id = c.id
WHERE  o.status = 'delivered'      -- filter rows FIRST
GROUP  BY c.name
HAVING SUM(o.total) > 10000        -- then filter groups
ORDER  BY total_spent DESC;`,
      out:` name        │ delivered_orders │ total_spent
─────────────┼──────────────────┼─────────────
 Arun Verma  │               1  │   76299.00
 Chetan Rao  │               1  │   20999.00
 Farah Khan  │               1  │   13299.00
 Elan Kumar  │               2  │   12599.00` },
    { type:'exercise', title:'Combine GROUP BY and HAVING',
      body:`<p>Write queries to find:</p>
<ol>
<li>Products that appear in more than 2 orders (use order_items)</li>
<li>Departments where the average salary exceeds ₹75,000</li>
<li>Customers who placed more than 1 order — show their name and total spending</li>
<li>Product categories where total stock is less than 100 units</li>
</ol>`,
      hint:`For (1): group order_items by product_id, HAVING COUNT(DISTINCT order_id) > 2. For (4): you don't need a join — product category and stock are both in the products table.`,
      solution:`-- 1. Products in 2+ orders
SELECT p.name, COUNT(DISTINCT oi.order_id) AS num_orders
FROM   order_items oi JOIN products p ON oi.product_id = p.id
GROUP  BY p.name
HAVING COUNT(DISTINCT oi.order_id) > 2;

-- 2. High-salary departments
SELECT d.name, ROUND(AVG(e.salary), 2) AS avg_salary
FROM   employees e JOIN departments d ON e.department_id = d.id
GROUP  BY d.name
HAVING AVG(e.salary) > 75000;

-- 3. Repeat customers
SELECT c.name, COUNT(o.id) AS orders, SUM(o.total) AS spent
FROM   orders o JOIN customers c ON o.customer_id = c.id
GROUP  BY c.name
HAVING COUNT(o.id) > 1
ORDER  BY spent DESC;

-- 4. Low-stock categories
SELECT category, SUM(stock) AS total_stock
FROM   products
GROUP  BY category
HAVING SUM(stock) < 100;` }
  ]
};

L['sql-w2-l4'] = {
  duration_mins: 12,
  sections: [
    { type:'text', body:`
<h2>DISTINCT &amp; Type Conversion</h2>
<h3>DISTINCT — removing duplicates</h3>
<p><code>SELECT DISTINCT</code> removes duplicate rows from the result. It operates on the <em>combination</em> of all selected columns — a row is a duplicate only if every column matches another row exactly:</p>
`},
    { type:'code', lang:'sql', src:`-- All unique cities in the customers table:
SELECT DISTINCT city
FROM   customers
ORDER  BY city;`,
      out:` city
───────────
 Bengaluru
 Chennai
 Delhi
 Hyderabad
 Kochi
 Kolkata
 Mumbai
 Pune
(8 rows)` },
    { type:'code', lang:'sql', src:`-- Unique category + status combinations in orders that exist:
SELECT DISTINCT p.category, o.status
FROM   orders o
JOIN   order_items oi ON o.id = oi.order_id
JOIN   products p    ON oi.product_id = p.id
ORDER  BY p.category, o.status;`,
      out:` category    │ status
─────────────┼───────────
 Books       │ cancelled
 Books       │ delivered
 Electronics │ delivered
 Electronics │ pending
 Electronics │ shipped
 Furniture   │ delivered
 Furniture   │ shipped` },
    { type:'text', body:`<h3>Rounding and math functions</h3>`},
    { type:'code', lang:'sql', src:`SELECT name,
       price,
       ROUND(price, -2)      AS rounded_to_100,  -- round to nearest 100
       CEIL(price / 1000.0)  AS price_in_k_up,   -- always round up
       FLOOR(price / 1000.0) AS price_in_k_down,  -- always round down
       ABS(price - 5000)     AS distance_from_5k
FROM   products
ORDER  BY price;`,
      out:` name              │  price │ rounded_to_100 │ price_in_k_up │ price_in_k_down │ distance_from_5k
───────────────────┼────────┼────────────────┼───────────────┼─────────────────┼──────────────────
 Python Handbook   │    599 │            600 │             1 │               0 │             4401
 Wireless Mouse    │   1299 │           1300 │             2 │               1 │             3701
 SQL Mastery Book  │    799 │            800 │             1 │               0 │             4201
 USB-C Hub         │   2499 │           2500 │             3 │               2 │             2501
 Noise-Cancel...   │   8999 │           9000 │             9 │               8 │             3999
 Ergonomic Chair   │  12000 │          12000 │            12 │              12 │             7000
 Standing Desk     │  18500 │          18500 │            19 │              18 │            13500
 Laptop Pro 15     │  75000 │          75000 │            75 │              75 │            70000` },
    { type:'text', body:`<h3>CAST — converting data types</h3>
<p>Sometimes data is stored in the wrong type. <code>CAST(expression AS type)</code> converts it. PostgreSQL also supports the shorthand <code>expression::type</code>:</p>`},
    { type:'code', lang:'sql', src:`-- order_date is a DATE — extract parts by casting or using functions:
SELECT id,
       order_date,
       EXTRACT(YEAR  FROM order_date)::INTEGER  AS year,
       EXTRACT(MONTH FROM order_date)::INTEGER  AS month,
       TO_CHAR(order_date, 'Month YYYY')        AS formatted,
       total::INTEGER                            AS total_rounded,
       total::TEXT || ' INR'                     AS total_text
FROM   orders
LIMIT  4;`,
      out:` id │ order_date │ year │ month │ formatted      │ total_rounded │ total_text
────┼────────────┼──────┼───────┼────────────────┼───────────────┼───────────────
  1 │ 2024-01-05 │ 2024 │     1 │ January   2024 │         76299 │ 76299.00 INR
  2 │ 2024-01-12 │ 2024 │     1 │ January   2024 │          1898 │ 1898.00 INR
  3 │ 2024-01-20 │ 2024 │     1 │ January   2024 │         83999 │ 83999.00 INR
  4 │ 2024-02-01 │ 2024 │     2 │ February  2024 │          8999 │ 8999.00 INR` },
    { type:'text', body:`
<h3>String functions — essential for data cleaning</h3>
<p>Real-world data is messy: inconsistent casing, trailing spaces, emails mixed with domains. These string functions let you clean and extract text directly in SQL without exporting to Python first:</p>
`},
    { type:'code', lang:'sql', src:`-- Core string operations on the customers table
SELECT name,
       UPPER(name)                               AS name_upper,
       LENGTH(name)                              AS char_count,
       TRIM(name)                               AS trimmed,
       REPLACE(name, ' ', '_')                  AS name_slug,
       LEFT(name, POSITION(' ' IN name)-1)      AS first_name,
       SUBSTRING(email, POSITION('@' IN email)+1)
                                                AS email_domain
FROM   customers
WHERE  email IS NOT NULL
LIMIT  4;`,
      out:` name        │ name_upper  │ char_count │ first_name │ email_domain
─────────────┼─────────────┼────────────┼────────────┼──────────────
 Arun Verma  │ ARUN VERMA  │         10 │ Arun       │ gmail.com
 Bina Sharma │ BINA SHARMA │         11 │ Bina       │ yahoo.com
 Chetan Rao  │ CHETAN RAO  │         10 │ Chetan     │ gmail.com
 Diya Joshi  │ DIYA JOSHI  │         10 │ Diya       │ gmail.com` },
    { type:'code', lang:'sql', src:`-- LIKE / ILIKE pattern matching (% = any chars, _ = one char)
SELECT name, email, city
FROM   customers
WHERE  email ILIKE '%gmail%';    -- ILIKE is case-insensitive

-- String concatenation for display labels
SELECT name || ' (' || city || ')' AS customer_label,
       TO_CHAR(join_date, 'Mon YYYY') AS joined
FROM   customers
ORDER  BY join_date;`,
      out:` customer_label           │ joined
──────────────────────────┼──────────
 Arun Verma (Mumbai)      │ Jan 2023
 Bina Sharma (Delhi)      │ Feb 2023
 Chetan Rao (Bengaluru)   │ Mar 2023
 Diya Joshi (Chennai)     │ Apr 2023` },
    { type:'tip', body:`Always use <code>ILIKE</code> over <code>LIKE</code> when searching user-entered text — data entry is never case-consistent. For very large tables, LIKE with a leading wildcard (<code>'%term'</code>) cannot use B-tree indexes; consider PostgreSQL full-text search (<code>tsvector</code>) for those cases.` },
    { type:'exercise', title:'Data cleaning & string transformations',
      body:`<p>Write four queries using string functions, type casting, and date formatting:</p>
<ol>
<li><strong>Product labels:</strong> Create a <code>display_label</code> for each product formatted as <code>"Laptop Pro 15 | Electronics | ₹75,000"</code> using CONCAT and TO_CHAR for price</li>
<li><strong>Email domain breakdown:</strong> Count customers by email domain (gmail.com, yahoo.com, etc.). Extract the domain using SUBSTRING + POSITION. Show domain and customer count.</li>
<li><strong>Order period report:</strong> From orders, show month name (e.g., January), year, status, and total formatted with commas. Sort by date.</li>
<li><strong>Employee first names:</strong> Show each employee's first name only (everything before the first space), department_id, and salary rounded to the nearest ₹5,000. Use SPLIT_PART or LEFT+POSITION.</li>
</ol>`,
      hint:`For (1): <code>TO_CHAR(price, 'FM"₹"99G99G999')</code>. For (2): GROUP BY the domain substring. For (4): <code>ROUND(salary/5000.0)*5000</code>.`,
      solution:`-- 1. Product display label
SELECT name || ' | ' || INITCAP(category) || ' | ' ||
       TO_CHAR(price, 'FM"₹"99G99G999') AS display_label
FROM   products ORDER BY category, price;

-- 2. Email domain breakdown
SELECT SUBSTRING(email FROM POSITION('@' IN email)+1) AS domain,
       COUNT(*) AS customers
FROM   customers
WHERE  email IS NOT NULL
GROUP  BY domain ORDER BY customers DESC;

-- 3. Order period report
SELECT TO_CHAR(order_date, 'FMMonth') AS month_name,
       EXTRACT(YEAR FROM order_date)::INTEGER AS year,
       status,
       TO_CHAR(total, 'FM99G99G999.00') AS formatted_total
FROM   orders ORDER BY order_date;

-- 4. Employee first names, rounded salary
SELECT SPLIT_PART(name, ' ', 1)        AS first_name,
       department_id,
       ROUND(salary / 5000.0) * 5000   AS salary_rounded
FROM   employees ORDER BY salary DESC;` }
  ]
};

L['sql-w2-l5'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>Business KPI Queries — Putting It All Together</h2>
<p>You now have enough SQL to answer real business questions. This lesson applies everything from Week 2 — COUNT, SUM, AVG, GROUP BY, HAVING, DISTINCT, and CASE WHEN — to produce the kinds of reports data analysts write every day.</p>
<h3>Report 1: Sales dashboard</h3>
`},
    { type:'code', lang:'sql', src:`-- Monthly sales summary:
SELECT TO_CHAR(order_date, 'Mon-YYYY')          AS month,
       COUNT(*)                                 AS total_orders,
       COUNT(CASE WHEN status='delivered' THEN 1 END) AS delivered,
       SUM(CASE WHEN status='delivered' THEN total ELSE 0 END) AS confirmed_revenue,
       ROUND(AVG(total), 2)                      AS avg_order_value
FROM   orders
GROUP  BY TO_CHAR(order_date, 'Mon-YYYY'),
          EXTRACT(YEAR FROM order_date),
          EXTRACT(MONTH FROM order_date)
ORDER  BY EXTRACT(YEAR FROM order_date),
          EXTRACT(MONTH FROM order_date);`,
      out:` month    │ total_orders │ delivered │ confirmed_revenue │ avg_order_value
──────────┼──────────────┼───────────┼───────────────────┼────────────────
 Jan-2024 │            3 │         2 │          78197.00 │       54065.33
 Feb-2024 │            3 │         2 │           9598.00 │        3699.00
 Mar-2024 │            3 │         1 │          13299.00 │       11865.67
 Apr-2024 │            3 │         2 │          21798.00 │        7699.00
 May-2024 │            3 │         2 │          14498.00 │       34165.67` },
    { type:'code', lang:'sql', src:`-- Product performance report: rank by revenue, show stock health
SELECT p.name,
       p.category,
       p.stock                                 AS stock_remaining,
       COUNT(DISTINCT oi.order_id)             AS times_ordered,
       SUM(oi.quantity)                        AS units_sold,
       SUM(oi.quantity * oi.unit_price)        AS total_revenue,
       CASE
         WHEN p.stock = 0  THEN 'Out of Stock'
         WHEN p.stock < 10 THEN 'Low Stock'
         ELSE 'In Stock'
       END                                     AS stock_status
FROM   products p
LEFT   JOIN order_items oi ON p.id = oi.product_id
GROUP  BY p.id, p.name, p.category, p.stock
ORDER  BY total_revenue DESC NULLS LAST;`,
      out:` name                    │ category    │ stock │ times_ordered │ units_sold │   revenue  │ stock_status
─────────────────────────┼─────────────┼───────┼───────────────┼────────────┼────────────┼──────────────
 Laptop Pro 15           │ Electronics │    12 │             3 │          3 │ 225000.00  │ In Stock
 Standing Desk           │ Furniture   │     8 │             3 │          4 │  74000.00  │ Low Stock
 Noise-Cancel Headphones │ Electronics │    30 │             5 │          5 │  44995.00  │ In Stock
 Ergonomic Chair         │ Furniture   │    15 │             2 │          2 │  24000.00  │ In Stock
 USB-C Hub               │ Electronics │    60 │             3 │          3 │   7497.00  │ In Stock
 SQL Mastery Book        │ Books       │   150 │             2 │          2 │   1598.00  │ In Stock
 Python Handbook         │ Books       │   200 │             3 │          4 │   2396.00  │ In Stock
 Wireless Mouse          │ Electronics │    85 │             4 │          5 │   6495.00  │ In Stock` },
    { type:'code', lang:'sql', src:`-- Customer value segments:
SELECT
  CASE
    WHEN SUM(o.total) >= 50000 THEN 'High Value'
    WHEN SUM(o.total) >= 10000 THEN 'Mid Value'
    ELSE 'Entry Level'
  END                      AS segment,
  COUNT(DISTINCT c.id)     AS customers,
  SUM(o.total)             AS segment_revenue,
  ROUND(AVG(o.total), 2)  AS avg_order
FROM   customers c
JOIN   orders o ON c.id = o.customer_id
WHERE  o.status = 'delivered'
GROUP  BY segment
ORDER  BY segment_revenue DESC;`,
      out:` segment     │ customers │ segment_revenue │ avg_order
─────────────┼───────────┼─────────────────┼───────────
 High Value  │         1 │       76299.00  │  76299.00
 Mid Value   │         4 │       59595.00  │  11919.00
 Entry Level │         5 │        4995.00  │    999.00` },
    { type:'exercise', title:'Executive KPI dashboard',
      body:`<p>Write three queries to produce an executive analytics summary:</p>
<ol>
<li><strong>Revenue snapshot:</strong> A single row showing total revenue, delivered revenue, cancelled revenue, avg order value, and a <code>delivery_rate</code> (delivered orders ÷ total orders as a %). Use FILTER or CASE WHEN inside aggregates.</li>
<li><strong>Department payroll health:</strong> Show department name, headcount, total payroll, avg salary, top salary, and a <code>payroll_health</code> label (<code>'Over Budget'</code> if payroll > 80% of budget, else <code>'On Track'</code>). Sort by payroll descending.</li>
<li><strong>City revenue contribution:</strong> From customers → orders, show each city's total revenue, percentage of grand total (use a subquery or window function), and a <code>tier</code> label: <code>'Key Market'</code> (≥20% of revenue), <code>'Growing'</code> (5–20%), <code>'Emerging'</code> (&lt;5%).</li>
</ol>`,
      hint:`For (1): <code>COUNT(*) FILTER (WHERE status='delivered') * 100.0 / COUNT(*)</code>. For (3): <code>SUM(o.total) * 100.0 / SUM(SUM(o.total)) OVER ()</code> — a window function on the aggregate.`,
      solution:`-- 1. Revenue snapshot
SELECT
    COUNT(*)                                             AS total_orders,
    COUNT(*) FILTER (WHERE status = 'delivered')         AS delivered_orders,
    SUM(total) FILTER (WHERE status = 'delivered')       AS delivered_revenue,
    SUM(total) FILTER (WHERE status = 'cancelled')       AS cancelled_revenue,
    ROUND(AVG(total), 2)                                AS avg_order_value,
    ROUND(COUNT(*) FILTER (WHERE status='delivered')
          * 100.0 / COUNT(*), 1)                        AS delivery_rate_pct
FROM   orders;

-- 2. Department payroll health
SELECT d.name AS department,
       COUNT(e.id) AS headcount,
       SUM(e.salary) AS total_payroll,
       ROUND(AVG(e.salary), 0) AS avg_salary,
       MAX(e.salary) AS top_salary,
       CASE WHEN SUM(e.salary) > d.budget * 0.8
            THEN 'Over Budget' ELSE 'On Track' END AS payroll_health
FROM   employees e
JOIN   departments d ON e.department_id = d.id
GROUP  BY d.name, d.budget
ORDER  BY total_payroll DESC;

-- 3. City revenue contribution with tier
SELECT c.city,
       SUM(o.total) AS city_revenue,
       ROUND(SUM(o.total) * 100.0 / SUM(SUM(o.total)) OVER (), 1) AS pct_of_total,
       CASE
           WHEN SUM(o.total) * 100.0 / SUM(SUM(o.total)) OVER () >= 20 THEN 'Key Market'
           WHEN SUM(o.total) * 100.0 / SUM(SUM(o.total)) OVER () >= 5  THEN 'Growing'
           ELSE 'Emerging'
       END AS tier
FROM   customers c
JOIN   orders o ON c.id = o.customer_id
GROUP  BY c.city
ORDER  BY city_revenue DESC;` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 3 — JOINS
══════════════════════════════════════════════════════════════════════════ */

L['sql-w3-l1'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>Keys &amp; Relationships — Why Tables Connect</h2>
<p>A relational database stores each type of entity in its own table. An order and a customer are different things — they live in different tables. But they're linked: every order <em>belongs to</em> a customer. This link is expressed through <strong>keys</strong>.</p>
<h3>Primary Key (PK)</h3>
<p>A column (or combination of columns) that <strong>uniquely identifies every row</strong> in a table. No two rows can share the same PK value. It cannot be NULL.</p>
<p>In our database, every table has an <code>id SERIAL PRIMARY KEY</code> — PostgreSQL automatically assigns a unique integer for each new row.</p>
<h3>Foreign Key (FK)</h3>
<p>A column in one table that <strong>references the PK of another table</strong>. This is how relationships are expressed. The FK column's value must either match an existing PK value in the referenced table, or be NULL.</p>
`},
    { type:'code', lang:'sql', src:`-- orders.customer_id is a FK referencing customers.id
-- This query verifies the relationship exists:
SELECT o.id AS order_id,
       o.customer_id,
       c.id AS customer_id_in_customers,
       c.name
FROM   orders o
JOIN   customers c ON o.customer_id = c.id
LIMIT  4;`,
      out:` order_id │ customer_id │ customer_id_in_customers │ name
──────────┼─────────────┼──────────────────────────┼────────────
        1 │           1 │                        1 │ Arun Verma
        2 │           2 │                        2 │ Bina Sharma
        3 │           3 │                        3 │ Chetan Rao
        4 │           4 │                        4 │ Diya Joshi` },
    { type:'text', body:`
<h3>Types of relationships</h3>
<table style="width:100%;border-collapse:collapse;margin:1rem 0">
<tr style="background:var(--fog2)"><th style="padding:.4rem .8rem;text-align:left">Type</th><th style="padding:.4rem .8rem;text-align:left">Example</th><th style="padding:.4rem .8rem;text-align:left">Implementation</th></tr>
<tr><td style="padding:.4rem .8rem"><strong>One-to-Many</strong></td><td style="padding:.4rem .8rem">One customer → many orders</td><td style="padding:.4rem .8rem">FK in the "many" table</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><strong>Many-to-Many</strong></td><td style="padding:.4rem .8rem">Orders ↔ Products</td><td style="padding:.4rem .8rem">Junction table (order_items)</td></tr>
<tr><td style="padding:.4rem .8rem"><strong>One-to-One</strong></td><td style="padding:.4rem .8rem">Employee ↔ Employee details</td><td style="padding:.4rem .8rem">FK with UNIQUE constraint</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><strong>Self-referential</strong></td><td style="padding:.4rem .8rem">Employee → Manager (same table)</td><td style="padding:.4rem .8rem">FK references own table's PK</td></tr>
</table>
<h3>Referential integrity</h3>
<p>The FK constraint ensures you can't create an order for a non-existent customer. The database enforces consistency automatically:</p>
`},
    { type:'code', lang:'sql', src:`-- This FAILS — customer 999 doesn't exist:
INSERT INTO orders (customer_id, order_date, status, total)
VALUES (999, '2024-06-01', 'pending', 5000);
-- ERROR: insert or update on table "orders" violates foreign key constraint
-- DETAIL: Key (customer_id)=(999) is not present in table "customers".

-- This is referential integrity at work — the database protects your data.` },
    { type:'exercise', title:'Explore the relationships',
      body:`<p>Without running a JOIN yet — just using SELECT and WHERE:</p>
<ol>
<li>What is the customer_id for 'Arun Verma'? (query customers)</li>
<li>Using that ID, find all of Arun's orders from the orders table</li>
<li>Pick one of Arun's order_ids. Find the items in that order from order_items</li>
<li>For each product_id from step 3, look up the product name from products</li>
</ol>
<p>This is exactly what a JOIN does — automates steps 1–4 into one query.</p>`,
      hint:`This is purely exploratory — no trick here. The point is to feel the pain of doing this manually across four queries, so the JOIN in the next lesson feels like a genuine relief.`,
      solution:`-- 1. Find Arun's customer id
SELECT id, name FROM customers WHERE name = 'Arun Verma';
-- Result: id = 1

-- 2. Arun's orders
SELECT * FROM orders WHERE customer_id = 1;
-- Orders: id 1 (delivered, ₹76,299) and id 6 (cancelled, ₹2,499)

-- 3. Items in order 1
SELECT * FROM order_items WHERE order_id = 1;
-- Items: product_id 1 (qty 1), product_id 2 (qty 1)

-- 4. Product names
SELECT name, price FROM products WHERE id IN (1, 2);
-- Laptop Pro 15 (₹75,000) and Wireless Mouse (₹1,299)` }
  ]
};

L['sql-w3-l2'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>INNER JOIN — The Most Common Join</h2>
<p>An <code>INNER JOIN</code> combines two tables by matching rows where the join condition is true. Only rows that match in <em>both</em> tables appear in the result. Unmatched rows are silently dropped.</p>
<p>Think of it as the intersection of two sets.</p>
<h3>Basic syntax</h3>
`},
    { type:'code', lang:'sql', src:`-- Join orders with customers — the manual work from lesson 3-1, automated:
SELECT o.id    AS order_id,
       c.name  AS customer_name,
       c.city,
       o.order_date,
       o.status,
       o.total
FROM   orders o
JOIN   customers c ON o.customer_id = c.id
ORDER  BY o.order_date;`,
      out:` order_id │ customer_name │ city      │ order_date │ status    │    total
──────────┼───────────────┼───────────┼────────────┼───────────┼──────────
        1 │ Arun Verma    │ Mumbai    │ 2024-01-05 │ delivered │ 76299.00
        2 │ Bina Sharma   │ Delhi     │ 2024-01-12 │ delivered │  1898.00
        3 │ Chetan Rao    │ Bengaluru │ 2024-01-20 │ shipped   │ 83999.00
        4 │ Diya Joshi    │ Chennai   │ 2024-02-01 │ delivered │  8999.00
       ...│ ...           │ ...       │ ...        │ ...       │ ...` },
    { type:'tip', body:`Always use table aliases (<code>o</code>, <code>c</code>) when joining. Once you have more than one table, column names without a table prefix are ambiguous — and aliases make queries dramatically shorter.` },
    { type:'text', body:`<h3>Joining three tables</h3>
<p>Chain multiple JOINs — each one adds another table to the result. The database processes them left to right:</p>`},
    { type:'code', lang:'sql', src:`-- Full order details: customer → order → items → products
SELECT c.name      AS customer,
       o.id        AS order_id,
       o.order_date,
       p.name      AS product,
       oi.quantity,
       oi.unit_price,
       oi.quantity * oi.unit_price AS line_total
FROM   orders o
JOIN   customers c    ON o.customer_id  = c.id
JOIN   order_items oi ON o.id           = oi.order_id
JOIN   products p     ON oi.product_id  = p.id
ORDER  BY o.id, p.name;`,
      out:` customer    │ order_id │ order_date │ product                    │ qty │ unit_price │ line_total
─────────────┼──────────┼────────────┼────────────────────────────┼─────┼────────────┼───────────
 Arun Verma  │        1 │ 2024-01-05 │ Laptop Pro 15              │   1 │   75000.00 │  75000.00
 Arun Verma  │        1 │ 2024-01-05 │ Wireless Mouse             │   1 │    1299.00 │   1299.00
 Bina Sharma │        2 │ 2024-01-12 │ Python Handbook            │   2 │     599.00 │   1198.00
 Bina Sharma │        2 │ 2024-01-12 │ SQL Mastery Book           │   1 │     799.00 │    799.00
 ...         │      ... │ ...        │ ...                        │ ... │ ...        │ ...` },
    { type:'text', body:`<h3>JOIN with filtering and aggregation</h3>
<p>JOINs compose naturally with WHERE, GROUP BY, and HAVING:</p>`},
    { type:'code', lang:'sql', src:`-- Revenue per city from delivered orders:
SELECT c.city,
       COUNT(DISTINCT o.id)   AS orders,
       SUM(o.total)           AS revenue
FROM   orders o
JOIN   customers c ON o.customer_id = c.id
WHERE  o.status = 'delivered'
GROUP  BY c.city
ORDER  BY revenue DESC;`,
      out:` city      │ orders │   revenue
───────────┼────────┼──────────
 Mumbai    │      1 │ 76299.00
 Bengaluru │      1 │ 20999.00
 Pune      │      1 │ 13299.00
 Hyderabad │      2 │ 12599.00
 Chennai   │      1 │  8999.00
 Kolkata   │      1 │    799.00
 Delhi     │      2 │  5696.00` },
    { type:'exercise', title:'Join the tables',
      body:`<p>Write JOIN queries to:</p>
<ol>
<li>List all employees with their department name (join employees to departments)</li>
<li>Show all order items with product name, category, and line total (quantity × unit_price)</li>
<li>Find which customers ordered 'Electronics' products — show customer name, product name, and order date (join all 4 tables)</li>
<li>Compute revenue per department by joining employees to departments, then aggregate salary as a proxy for cost</li>
</ol>`,
      hint:`For (3): you need customers → orders → order_items → products, filtered WHERE p.category = 'Electronics'. For (4): no orders involved — just departments and employees, GROUP BY department.`,
      solution:`-- 1. Employees with department
SELECT e.name, d.name AS department, e.salary
FROM   employees e JOIN departments d ON e.department_id = d.id;

-- 2. Order items with product details
SELECT oi.order_id, p.name, p.category,
       oi.quantity, oi.unit_price,
       oi.quantity * oi.unit_price AS line_total
FROM   order_items oi JOIN products p ON oi.product_id = p.id;

-- 3. Customers who ordered Electronics
SELECT DISTINCT c.name AS customer, p.name AS product, o.order_date
FROM   orders o
JOIN   customers c    ON o.customer_id = c.id
JOIN   order_items oi ON o.id = oi.order_id
JOIN   products p     ON oi.product_id = p.id
WHERE  p.category = 'Electronics';

-- 4. Payroll by department
SELECT d.name, COUNT(e.id) headcount, SUM(e.salary) total_payroll
FROM   employees e JOIN departments d ON e.department_id = d.id
GROUP  BY d.name ORDER BY total_payroll DESC;` }
  ]
};

L['sql-w3-l3'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>LEFT, RIGHT &amp; FULL OUTER JOIN</h2>
<p>INNER JOIN drops unmatched rows. But sometimes you <em>need</em> those unmatched rows — for example, to find customers who have never placed an order, or products that have never been sold. That's what OUTER JOINs are for.</p>
<h3>LEFT JOIN — keep all rows from the left table</h3>
<p>A LEFT JOIN returns every row from the left table (the one before <code>LEFT JOIN</code>). If there's no matching row in the right table, the right table's columns are NULL:</p>
`},
    { type:'code', lang:'sql', src:`-- Every customer, with their orders (or NULL if they've never ordered):
SELECT c.id,
       c.name,
       o.id        AS order_id,
       o.order_date,
       o.status
FROM   customers c
LEFT   JOIN orders o ON c.id = o.customer_id
ORDER  BY c.id, o.order_date;`,
      out:` id │ name        │ order_id │ order_date │ status
────┼─────────────┼──────────┼────────────┼───────────
  1 │ Arun Verma  │        1 │ 2024-01-05 │ delivered
  1 │ Arun Verma  │        6 │ 2024-02-20 │ cancelled
  2 │ Bina Sharma │        2 │ 2024-01-12 │ delivered
  2 │ Bina Sharma │        9 │ 2024-03-18 │ delivered
  3 │ Chetan Rao  │        3 │ 2024-01-20 │ shipped
  3 │ Chetan Rao  │       10 │ 2024-04-02 │ delivered
  4 │ Diya Joshi  │        4 │ 2024-02-01 │ delivered
  4 │ Diya Joshi  │       13 │ 2024-05-01 │ shipped
  5 │ Elan Kumar  │        5 │ 2024-02-14 │ delivered
  5 │ Elan Kumar  │       15 │ 2024-05-20 │ delivered
  6 │ Farah Khan  │        7 │ 2024-03-05 │ delivered
  7 │ Gopal Iyer  │        8 │ 2024-03-10 │ shipped
  8 │ Hema Pillai │       11 │ 2024-04-15 │ pending
  9 │ Ishaan Das  │       12 │ 2024-04-22 │ delivered
 10 │ Jaya Menon  │       14 │ 2024-05-08 │ delivered` },
    { type:'text', body:`<h3>Finding unmatched rows — the anti-join pattern</h3>
<p>The most common use of LEFT JOIN: find rows in table A that have <em>no</em> match in table B. Filter for <code>IS NULL</code> on the right table's column:</p>`},
    { type:'code', lang:'sql', src:`-- Products that have NEVER been ordered:
SELECT p.id, p.name, p.category, p.stock
FROM   products p
LEFT   JOIN order_items oi ON p.id = oi.product_id
WHERE  oi.id IS NULL;`,
      out:`(0 rows)
-- All 8 products in our dataset have been ordered at least once.
-- In a real system with hundreds of products, you'd find plenty here.` },
    { type:'code', lang:'sql', src:`-- Customers with no delivered orders (potential win-back targets):
SELECT c.name, c.email, c.city
FROM   customers c
LEFT   JOIN orders o ON c.id = o.customer_id
                    AND o.status = 'delivered'   -- join condition, not WHERE!
WHERE  o.id IS NULL;`,
      out:` name        │ email          │ city
─────────────┼────────────────┼────────
 Gopal Iyer  │ gopal@gmail.com│ Mumbai
 Hema Pillai │ hema@yahoo.com │ Kochi` },
    { type:'warn', body:`Notice the filter <code>AND o.status = 'delivered'</code> is in the <code>ON</code> clause, not <code>WHERE</code>. If you put it in <code>WHERE</code>, it would filter out NULLs and turn the LEFT JOIN into an INNER JOIN — defeating the purpose.` },
    { type:'text', body:`<h3>RIGHT JOIN and FULL OUTER JOIN</h3>
<p><code>RIGHT JOIN</code> is the mirror of LEFT JOIN — keeps all rows from the right table. In practice, most people just swap the table order and use LEFT JOIN instead. <code>FULL OUTER JOIN</code> keeps rows from <em>both</em> sides, NULLing unmatched columns on either side:</p>`},
    { type:'code', lang:'sql', src:`-- FULL OUTER JOIN: all customers AND all orders, whether or not they match
-- (Useful to audit orphaned records)
SELECT c.name AS customer, o.id AS order_id, o.status
FROM   customers c
FULL   OUTER JOIN orders o ON c.id = o.customer_id
WHERE  c.id IS NULL OR o.id IS NULL;   -- only show the unmatched ones

-- In our clean dataset this returns 0 rows — no orphans.
-- In real systems you often find orders with deleted customer IDs.` },
    { type:'exercise', title:'Outer join patterns',
      body:`<p>Write queries to:</p>
<ol>
<li>Show all products with total units sold — include products with 0 orders (hint: LEFT JOIN order_items, then COALESCE the sum)</li>
<li>List all departments with their employee count — include departments with no employees</li>
<li>Find employees who manage nobody (no other employee has their id as manager_id) — use a LEFT JOIN from employees to itself</li>
</ol>`,
      hint:`For (1): <code>COALESCE(SUM(oi.quantity), 0)</code> turns NULL into 0 for products with no sales. For (3): <code>FROM employees e LEFT JOIN employees sub ON e.id = sub.manager_id WHERE sub.id IS NULL</code>.`,
      solution:`-- 1. All products with sales (including zero)
SELECT p.name, p.category,
       COALESCE(SUM(oi.quantity), 0) AS units_sold
FROM   products p
LEFT   JOIN order_items oi ON p.id = oi.product_id
GROUP  BY p.name, p.category
ORDER  BY units_sold DESC;

-- 2. Departments with headcount
SELECT d.name, COUNT(e.id) AS employees
FROM   departments d
LEFT   JOIN employees e ON d.id = e.department_id
GROUP  BY d.name;

-- 3. Employees who manage nobody (leaf nodes)
SELECT e.name, e.salary
FROM   employees e
LEFT   JOIN employees sub ON e.id = sub.manager_id
WHERE  sub.id IS NULL;` }
  ]
};

L['sql-w3-l4'] = {
  duration_mins: 12,
  sections: [
    { type:'text', body:`
<h2>Self Joins &amp; Cross Joins</h2>
<h3>Self Join — a table joining itself</h3>
<p>Sometimes data has a recursive structure: employees have managers, who are also employees. Categories have parent categories. File systems have parent directories. A <strong>self join</strong> joins a table to itself using two different aliases.</p>
`},
    { type:'code', lang:'sql', src:`-- Show each employee with their manager's name:
SELECT e.name         AS employee,
       e.salary,
       m.name         AS manager,
       d.name         AS department
FROM   employees e
LEFT   JOIN employees m    ON e.manager_id = m.id   -- self join
JOIN   departments d       ON e.department_id = d.id
ORDER  BY d.name, e.name;`,
      out:` employee           │ salary   │ manager        │ department
────────────────────┼──────────┼────────────────┼─────────────
 Dev Mehta          │  92000   │ Arjun Sharma   │ Engineering
 Rajan Kumar        │  88000   │ Arjun Sharma   │ Engineering
 Arjun Sharma       │  95000   │ ∅ (top)        │ Engineering
 Ananya Nair        │  65000   │ Arjun Sharma   │ Marketing
 Esha Patel         │  68000   │ Ananya Nair    │ Marketing
 Bala Subramanian   │  70000   │ Priya Reddy    │ Sales
 Priya Reddy        │  72000   │ Arjun Sharma   │ Sales
 Chitra Iyer        │  60000   │ Arjun Sharma   │ Operations` },
    { type:'code', lang:'sql', src:`-- Which employees earn more than their direct manager?
SELECT e.name    AS employee,
       e.salary  AS emp_salary,
       m.name    AS manager,
       m.salary  AS mgr_salary,
       e.salary - m.salary AS difference
FROM   employees e
JOIN   employees m ON e.manager_id = m.id
WHERE  e.salary > m.salary;`,
      out:` employee     │ emp_salary │ manager      │ mgr_salary │ difference
──────────────┼────────────┼──────────────┼────────────┼───────────
 Dev Mehta    │   92000.00 │ Arjun Sharma │   95000.00 │  (no match)
 Rajan Kumar  │   88000.00 │ Arjun Sharma │   95000.00 │  (no match)
(0 rows — nobody earns more than their manager in our dataset)` },
    { type:'text', body:`<h3>CROSS JOIN — the Cartesian product</h3>
<p>A CROSS JOIN produces every possible combination of rows from two tables. If table A has 5 rows and table B has 3 rows, the result has 5 × 3 = 15 rows. Use it when you genuinely need all combinations — it can explode in size if used carelessly:</p>`},
    { type:'code', lang:'sql', src:`-- Generate a grid of all department–product category combinations:
SELECT d.name  AS department,
       p.category
FROM   departments d
CROSS  JOIN (SELECT DISTINCT category FROM products) p
ORDER  BY d.name, p.category;`,
      out:` department   │ category
─────────────┼─────────────
 Engineering │ Books
 Engineering │ Electronics
 Engineering │ Furniture
 Marketing   │ Books
 Marketing   │ Electronics
 Marketing   │ Furniture
 Operations  │ Books
 Operations  │ Electronics
 Operations  │ Furniture
 Sales       │ Books
 Sales       │ Electronics
 Sales       │ Furniture
(12 rows — 4 departments × 3 categories)` },
    { type:'tip', body:`CROSS JOIN is useful for generating all combinations in reports (e.g., all months × all regions even when some combinations have no data). Then LEFT JOIN actual data onto the grid so zero-data cells still appear in results.` },
    { type:'exercise', title:'Self join and cross join',
      body:`<p>Write queries to:</p>
<ol>
<li>List all employees whose salary is within ₹5,000 of their manager's salary (self join; use ABS)</li>
<li>Generate a grid of all customers × all product categories — then check which customer has ordered from all 3 categories (you'll need to aggregate)</li>
</ol>`,
      hint:`For (1): <code>WHERE ABS(e.salary - m.salary) <= 5000</code>. For (2): <code>CROSS JOIN (SELECT DISTINCT category FROM products)</code> gives the full grid; then LEFT JOIN through orders/order_items/products and count distinct categories ordered per customer.`,
      solution:`-- 1. Employees near manager's salary
SELECT e.name AS employee, e.salary,
       m.name AS manager, m.salary AS mgr_salary,
       ABS(e.salary - m.salary) AS difference
FROM   employees e
JOIN   employees m ON e.manager_id = m.id
WHERE  ABS(e.salary - m.salary) <= 5000;

-- 2. Customer who bought all 3 categories
SELECT c.name, COUNT(DISTINCT p.category) AS categories_bought
FROM   customers c
JOIN   orders o      ON c.id = o.customer_id
JOIN   order_items oi ON o.id = oi.order_id
JOIN   products p    ON oi.product_id = p.id
GROUP  BY c.name
HAVING COUNT(DISTINCT p.category) = 3;` }
  ]
};

L['sql-w3-l5'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>Multi-Table Joins — Real-World Query Patterns</h2>
<p>Real databases have dozens of tables. Being able to join 3, 4, or 5 tables in a single clean query is what separates a functional SQL writer from a proficient one. This lesson works through the patterns you'll write most often in a data role.</p>
<h3>Pattern 1: The full receipt (4-table join)</h3>
`},
    { type:'code', lang:'sql', src:`-- Complete receipt for a specific order:
SELECT o.id                                   AS order_id,
       o.order_date,
       o.status,
       c.name                                 AS customer,
       c.city,
       p.name                                 AS product,
       p.category,
       oi.quantity,
       oi.unit_price,
       oi.quantity * oi.unit_price            AS line_total,
       o.total                                AS order_total
FROM   orders o
JOIN   customers c    ON o.customer_id  = c.id
JOIN   order_items oi ON o.id           = oi.order_id
JOIN   products p     ON oi.product_id  = p.id
WHERE  o.id = 3
ORDER  BY p.category, p.name;`,
      out:` order_id │ order_date │ status  │ customer   │ city      │ product                    │ category    │ qty │ unit_price │ line_total │ order_total
──────────┼────────────┼─────────┼────────────┼───────────┼────────────────────────────┼─────────────┼─────┼────────────┼────────────┼────────────
        3 │ 2024-01-20 │ shipped │ Chetan Rao │ Bengaluru │ Laptop Pro 15              │ Electronics │   1 │   75000.00 │  75000.00  │   83999.00
        3 │ 2024-01-20 │ shipped │ Chetan Rao │ Bengaluru │ Noise-Cancel Headphones    │ Electronics │   1 │    8999.00 │   8999.00  │   83999.00` },
    { type:'text', body:`<h3>Pattern 2: The summary report with multiple aggregations</h3>`},
    { type:'code', lang:'sql', src:`-- Customer lifetime value report:
SELECT c.id,
       c.name,
       c.city,
       c.join_date,
       COUNT(DISTINCT o.id)                            AS total_orders,
       COUNT(DISTINCT CASE WHEN o.status='delivered'
                     THEN o.id END)                    AS delivered_orders,
       COALESCE(SUM(CASE WHEN o.status='delivered'
                    THEN o.total END), 0)              AS lifetime_value,
       COALESCE(MAX(o.order_date), c.join_date)        AS last_activity,
       CURRENT_DATE - c.join_date                      AS days_as_customer
FROM   customers c
LEFT   JOIN orders o ON c.id = o.customer_id
GROUP  BY c.id, c.name, c.city, c.join_date
ORDER  BY lifetime_value DESC;`,
      out:` id │ name         │ city      │ join_date  │ total_orders │ delivered │ lifetime_value │ last_activity │ days_as_customer
────┼──────────────┼───────────┼────────────┼──────────────┼───────────┼────────────────┼───────────────┼──────────────────
  1 │ Arun Verma   │ Mumbai    │ 2023-01-10 │            2 │         1 │       76299.00 │ 2024-02-20    │              492
  3 │ Chetan Rao   │ Bengaluru │ 2023-03-05 │            2 │         1 │       20999.00 │ 2024-04-02    │              438
  6 │ Farah Khan   │ Pune      │ 2023-06-30 │            1 │         1 │       13299.00 │ 2024-03-05    │              321
...` },
    { type:'text', body:`<h3>Pattern 3: Conditional aggregation with CASE WHEN in GROUP BY queries</h3>`},
    { type:'code', lang:'sql', src:`-- Sales pivot: revenue per category broken down by order status
SELECT p.category,
       SUM(CASE WHEN o.status='delivered'
                THEN oi.quantity * oi.unit_price ELSE 0 END) AS delivered_rev,
       SUM(CASE WHEN o.status='shipped'
                THEN oi.quantity * oi.unit_price ELSE 0 END) AS shipped_rev,
       SUM(CASE WHEN o.status='cancelled'
                THEN oi.quantity * oi.unit_price ELSE 0 END) AS cancelled_rev,
       SUM(oi.quantity * oi.unit_price)                       AS total_gmv
FROM   order_items oi
JOIN   orders o   ON oi.order_id   = o.id
JOIN   products p ON oi.product_id = p.id
GROUP  BY p.category
ORDER  BY total_gmv DESC;`,
      out:` category    │ delivered_rev │ shipped_rev │ cancelled_rev │  total_gmv
─────────────┼───────────────┼─────────────┼───────────────┼──────────────
 Electronics │    161487.00  │   83999.00  │      2499.00  │   247985.00
 Furniture   │     37500.00  │   56000.00  │         0.00  │    93500.00
 Books       │      3994.00  │       0.00  │         0.00  │     3994.00` },
    { type:'exercise', title:'Build the analyst report',
      body:`<p>Write a single query that produces a <em>product sales report</em> joining all relevant tables. For each product, show: name, category, current stock, units sold (from order_items), revenue generated, number of distinct customers who bought it, and a <code>popularity</code> label — <code>'Best Seller'</code> if units sold ≥ 4, <code>'Moving'</code> if 2–3, <code>'Slow'</code> if 0–1.</p>
<p>Include products with zero sales. Sort by revenue descending.</p>`,
      hint:`Start with <code>FROM products p LEFT JOIN order_items oi ON p.id = oi.product_id LEFT JOIN orders o ON oi.order_id = o.id LEFT JOIN customers c ON o.customer_id = c.id</code>. Then GROUP BY p columns and apply CASE WHEN on the aggregated units_sold.`,
      solution:`SELECT p.name,
       p.category,
       p.stock,
       COALESCE(SUM(oi.quantity), 0)            AS units_sold,
       COALESCE(SUM(oi.quantity * oi.unit_price),0) AS revenue,
       COUNT(DISTINCT c.id)                      AS unique_customers,
       CASE
         WHEN COALESCE(SUM(oi.quantity),0) >= 4 THEN 'Best Seller'
         WHEN COALESCE(SUM(oi.quantity),0) >= 2 THEN 'Moving'
         ELSE 'Slow'
       END                                        AS popularity
FROM   products p
LEFT   JOIN order_items oi ON p.id = oi.product_id
LEFT   JOIN orders o       ON oi.order_id = o.id
LEFT   JOIN customers c    ON o.customer_id = c.id
GROUP  BY p.name, p.category, p.stock
ORDER  BY revenue DESC;` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 4 — SUBQUERIES, CTEs & WINDOW FUNCTIONS
══════════════════════════════════════════════════════════════════════════ */

L['sql-w4-l1'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>Subqueries — Queries Inside Queries</h2>
<p>A <strong>subquery</strong> is a SELECT statement nested inside another SQL statement. The inner query runs first and its result is used by the outer query. They let you break complex problems into logical steps — all in one statement.</p>
<h3>Scalar subquery — returns a single value</h3>
<p>A scalar subquery produces exactly one row and one column. You can use it anywhere you'd use a single value:</p>
`},
    { type:'code', lang:'sql', src:`-- Products priced above the overall average:
SELECT name, price
FROM   products
WHERE  price > (SELECT AVG(price) FROM products)
ORDER  BY price DESC;`,
      out:` name                    │  price
─────────────────────────┼────────
 Laptop Pro 15           │ 75000
 Standing Desk           │ 18500
 Ergonomic Chair         │ 12000
 Noise-Cancel Headphones │  8999
-- Average is ₹12,449 so only 4 products qualify` },
    { type:'code', lang:'sql', src:`-- Use a scalar subquery as a computed column:
SELECT name,
       price,
       (SELECT AVG(price) FROM products)         AS avg_price,
       price - (SELECT AVG(price) FROM products) AS vs_average
FROM   products
ORDER  BY vs_average DESC;`,
      out:` name                    │  price  │ avg_price │ vs_average
─────────────────────────┼─────────┼───────────┼───────────
 Laptop Pro 15           │ 75000   │  12449.38 │  62550.63
 Standing Desk           │ 18500   │  12449.38 │   6050.63
 Ergonomic Chair         │ 12000   │  12449.38 │   -449.38
 Noise-Cancel Headphones │  8999   │  12449.38 │  -3450.38
 USB-C Hub               │  2499   │  12449.38 │  -9950.38
 SQL Mastery Book        │   799   │  12449.38 │ -11650.38
 Wireless Mouse          │  1299   │  12449.38 │ -11150.38
 Python Handbook         │   599   │  12449.38 │ -11850.38` },
    { type:'text', body:`<h3>IN subquery — returns a list</h3>
<p>When the subquery returns multiple rows (one column), use it with <code>IN</code> or <code>NOT IN</code>:</p>`},
    { type:'code', lang:'sql', src:`-- Customers who have placed at least one 'shipped' order:
SELECT name, city
FROM   customers
WHERE  id IN (
    SELECT DISTINCT customer_id
    FROM   orders
    WHERE  status = 'shipped'
);`,
      out:` name        │ city
─────────────┼───────────
 Chetan Rao  │ Bengaluru
 Diya Joshi  │ Chennai
 Gopal Iyer  │ Mumbai` },
    { type:'code', lang:'sql', src:`-- Products that have NEVER been ordered (NOT IN version):
SELECT name, category
FROM   products
WHERE  id NOT IN (
    SELECT DISTINCT product_id
    FROM   order_items
);

-- (0 rows in our dataset — all products have been ordered)` },
    { type:'warn', body:`<code>NOT IN</code> with a subquery that can return NULLs is dangerous — <code>NOT IN (1, 2, NULL)</code> always returns no rows because <code>x NOT IN (...NULL...)</code> evaluates to UNKNOWN. Prefer <code>NOT EXISTS</code> or filter NULLs out of the subquery.` },
    { type:'text', body:`<h3>Correlated subquery — references the outer query</h3>
<p>A correlated subquery runs once <em>for each row</em> of the outer query. It's slower but expressive:</p>`},
    { type:'code', lang:'sql', src:`-- Each product compared to the average price in its own category:
SELECT name,
       category,
       price,
       (SELECT ROUND(AVG(p2.price), 2)
        FROM   products p2
        WHERE  p2.category = p1.category) AS category_avg,
       price - (SELECT ROUND(AVG(p2.price), 2)
                FROM   products p2
                WHERE  p2.category = p1.category) AS vs_category_avg
FROM   products p1
ORDER  BY category, vs_category_avg DESC;`,
      out:` name                    │ category    │  price │ category_avg │ vs_category_avg
─────────────────────────┼─────────────┼────────┼──────────────┼─────────────────
 SQL Mastery Book        │ Books       │    799 │       699.00 │          100.00
 Python Handbook         │ Books       │    599 │       699.00 │         -100.00
 Laptop Pro 15           │ Electronics │  75000 │    22199.25  │        52800.75
 Noise-Cancel Headphones │ Electronics │   8999 │    22199.25  │       -13200.25
 USB-C Hub               │ Electronics │   2499 │    22199.25  │       -19700.25
 Wireless Mouse          │ Electronics │   1299 │    22199.25  │       -20900.25
 Standing Desk           │ Furniture   │  18500 │    15250.00  │         3250.00
 Ergonomic Chair         │ Furniture   │  12000 │    15250.00  │        -3250.00` },
    { type:'exercise', title:'Subquery practice',
      body:`<p>Write queries using subqueries (not JOINs) to find:</p>
<ol>
<li>Employees who earn more than the company-wide average salary</li>
<li>Orders whose total is greater than the average order total — show order ID, customer_id, and total</li>
<li>The customer who placed the single highest-value order (use a scalar subquery in WHERE)</li>
<li>Departments where at least one employee earns over ₹90,000 (use an IN subquery)</li>
</ol>`,
      hint:`For (3): <code>WHERE o.total = (SELECT MAX(total) FROM orders)</code>. For (4): <code>WHERE id IN (SELECT department_id FROM employees WHERE salary > 90000)</code>.`,
      solution:`-- 1. Above-average earners
SELECT name, salary
FROM   employees
WHERE  salary > (SELECT AVG(salary) FROM employees);

-- 2. Above-average orders
SELECT id, customer_id, total
FROM   orders
WHERE  total > (SELECT AVG(total) FROM orders)
ORDER  BY total DESC;

-- 3. Customer with highest order
SELECT c.name, o.total
FROM   orders o JOIN customers c ON o.customer_id = c.id
WHERE  o.total = (SELECT MAX(total) FROM orders);

-- 4. Departments with high earners
SELECT name FROM departments
WHERE  id IN (SELECT department_id FROM employees WHERE salary > 90000);` }
  ]
};

L['sql-w4-l2'] = {
  duration_mins: 20,
  sections: [
    { type:'text', body:`
<h2>Common Table Expressions (CTEs)</h2>
<p>A <strong>CTE</strong> (using the <code>WITH</code> clause) is a named temporary result set that exists only for the duration of a single query. Think of it as giving a subquery a name so you can reference it multiple times, and so the query reads like a story from top to bottom.</p>
<p>CTEs don't improve performance (the database evaluates them inline), but they dramatically improve <em>readability</em> — the most important property of SQL written by professionals.</p>
<h3>Basic CTE</h3>
`},
    { type:'code', lang:'sql', src:`-- Without CTE: hard to follow
SELECT name, total_spent
FROM (
    SELECT c.name, SUM(o.total) AS total_spent
    FROM   customers c JOIN orders o ON c.id = o.customer_id
    WHERE  o.status = 'delivered'
    GROUP  BY c.name
) sub
WHERE total_spent > 10000;

-- With CTE: reads like a paragraph
WITH delivered_spending AS (
    SELECT c.name,
           SUM(o.total) AS total_spent
    FROM   customers c
    JOIN   orders o ON c.id = o.customer_id
    WHERE  o.status = 'delivered'
    GROUP  BY c.name
)
SELECT name, total_spent
FROM   delivered_spending
WHERE  total_spent > 10000
ORDER  BY total_spent DESC;`,
      out:` name        │ total_spent
─────────────┼─────────────
 Arun Verma  │   76299.00
 Chetan Rao  │   20999.00
 Farah Khan  │   13299.00
 Elan Kumar  │   12599.00` },
    { type:'text', body:`<h3>Multiple CTEs</h3>
<p>Chain multiple CTEs with a single <code>WITH</code> — separate them with commas. Each CTE can reference earlier ones:</p>`},
    { type:'code', lang:'sql', src:`WITH
-- Step 1: revenue per product
product_revenue AS (
    SELECT p.id,
           p.name,
           p.category,
           SUM(oi.quantity * oi.unit_price) AS revenue,
           SUM(oi.quantity)                 AS units_sold
    FROM   products p
    JOIN   order_items oi ON p.id = oi.product_id
    GROUP  BY p.id, p.name, p.category
),
-- Step 2: revenue per category (references product_revenue)
category_totals AS (
    SELECT category,
           SUM(revenue) AS category_revenue
    FROM   product_revenue
    GROUP  BY category
)
-- Final: each product with its share of category revenue
SELECT pr.name,
       pr.category,
       pr.revenue,
       ct.category_revenue,
       ROUND(pr.revenue * 100.0 / ct.category_revenue, 1) AS pct_of_category
FROM   product_revenue pr
JOIN   category_totals ct ON pr.category = ct.category
ORDER  BY pr.category, pr.revenue DESC;`,
      out:` name                    │ category    │   revenue  │ cat_revenue │ pct_of_category
─────────────────────────┼─────────────┼────────────┼─────────────┼─────────────────
 SQL Mastery Book        │ Books       │   1598.00  │    3994.00  │            40.0
 Python Handbook         │ Books       │   2396.00  │    3994.00  │            60.0
 Laptop Pro 15           │ Electronics │ 225000.00  │  292482.00  │            76.9
 Noise-Cancel Headphones │ Electronics │  44995.00  │  292482.00  │            15.4
 USB-C Hub               │ Electronics │   7497.00  │  292482.00  │             2.6
 Wireless Mouse          │ Electronics │   6495.00  │  292482.00  │             2.2
 Standing Desk           │ Furniture   │  74000.00  │  111000.00  │            66.7
 Ergonomic Chair         │ Furniture   │  24000.00  │  111000.00  │            21.6` },
    { type:'text', body:`<h3>Recursive CTE — walking a hierarchy</h3>
<p>A recursive CTE references itself. It has two parts separated by <code>UNION ALL</code>: the <em>anchor</em> (base case) and the <em>recursive member</em> (each iteration). Use it for tree structures like organisational hierarchies:</p>`},
    { type:'code', lang:'sql', src:`WITH RECURSIVE org_chart AS (
    -- Anchor: start with the top-level manager (no manager_id)
    SELECT id, name, manager_id, salary, 0 AS depth,
           name::TEXT AS path
    FROM   employees
    WHERE  manager_id IS NULL

    UNION ALL

    -- Recursive: add employees who report to someone already in the CTE
    SELECT e.id, e.name, e.manager_id, e.salary,
           oc.depth + 1,
           oc.path || ' → ' || e.name
    FROM   employees e
    JOIN   org_chart oc ON e.manager_id = oc.id
)
SELECT REPEAT('  ', depth) || name AS hierarchy,
       salary,
       path
FROM   org_chart
ORDER  BY path;`,
      out:` hierarchy                  │  salary  │ path
────────────────────────────┼──────────┼──────────────────────────────────────
 Arjun Sharma               │ 95000.00 │ Arjun Sharma
   Ananya Nair              │ 65000.00 │ Arjun Sharma → Ananya Nair
     Esha Patel             │ 68000.00 │ Arjun Sharma → Ananya Nair → Esha Patel
   Bala Subramanian         │ 70000.00 │ Arjun Sharma → ... → Bala
   Chitra Iyer              │ 60000.00 │ Arjun Sharma → Chitra Iyer
   Dev Mehta                │ 92000.00 │ Arjun Sharma → Dev Mehta
   Priya Reddy              │ 72000.00 │ Arjun Sharma → Priya Reddy
   Rajan Kumar              │ 88000.00 │ Arjun Sharma → Rajan Kumar` },
    { type:'exercise', title:'Refactor with CTEs',
      body:`<p>Take the following multi-join query and rewrite it using at least two CTEs to make it more readable. Then extend it to show each customer's orders as a percentage of total company revenue:</p>
<pre style="background:var(--fog);padding:.75rem 1rem;border-radius:.4rem;font-family:monospace;font-size:.82rem;">SELECT c.name, SUM(o.total) AS spent
FROM customers c JOIN orders o ON c.id = o.customer_id
WHERE o.status = 'delivered'
GROUP BY c.name HAVING SUM(o.total) > 5000;</pre>`,
      hint:`CTE 1: customer spending (the GROUP BY query). CTE 2: total revenue (<code>SELECT SUM(total) FROM orders WHERE status = 'delivered'</code>). Final SELECT: join CTE 1 to CTE 2 and compute the percentage.`,
      solution:`WITH
customer_spending AS (
    SELECT c.name,
           SUM(o.total) AS total_spent
    FROM   customers c
    JOIN   orders o ON c.id = o.customer_id
    WHERE  o.status = 'delivered'
    GROUP  BY c.name
    HAVING SUM(o.total) > 5000
),
company_total AS (
    SELECT SUM(total) AS grand_total
    FROM   orders
    WHERE  status = 'delivered'
)
SELECT cs.name,
       cs.total_spent,
       ROUND(cs.total_spent * 100.0 / ct.grand_total, 1) AS pct_of_revenue
FROM   customer_spending cs
CROSS  JOIN company_total ct
ORDER  BY cs.total_spent DESC;` }
  ]
};

L['sql-w4-l3'] = {
  duration_mins: 20,
  sections: [
    { type:'text', body:`
<h2>Window Functions — ROW_NUMBER, RANK &amp; Friends</h2>
<p>Window functions are one of SQL's most powerful features. They perform calculations <em>across a set of rows related to the current row</em>, without collapsing them into a single output row (unlike GROUP BY). You get both the individual row <em>and</em> the aggregate — at the same time.</p>
<p>The syntax: <code>function() OVER (PARTITION BY ... ORDER BY ...)</code></p>
<ul>
<li><code>PARTITION BY</code> — divides rows into groups (like GROUP BY but doesn't collapse)</li>
<li><code>ORDER BY</code> — defines the order within each partition</li>
</ul>
<h3>ROW_NUMBER — unique sequential number per partition</h3>
`},
    { type:'code', lang:'sql', src:`-- Rank each order per customer by date (most recent = 1):
SELECT c.name,
       o.id           AS order_id,
       o.order_date,
       o.total,
       ROW_NUMBER() OVER (
           PARTITION BY o.customer_id
           ORDER BY o.order_date DESC
       )              AS customer_order_num
FROM   orders o
JOIN   customers c ON o.customer_id = c.id
ORDER  BY c.name, customer_order_num;`,
      out:` name        │ order_id │ order_date │    total │ customer_order_num
─────────────┼──────────┼────────────┼──────────┼────────────────────
 Arun Verma  │        6 │ 2024-02-20 │  2499.00 │                  1
 Arun Verma  │        1 │ 2024-01-05 │ 76299.00 │                  2
 Bina Sharma │        9 │ 2024-03-18 │  3798.00 │                  1
 Bina Sharma │        2 │ 2024-01-12 │  1898.00 │                  2
 Chetan Rao  │       10 │ 2024-04-02 │ 20999.00 │                  1
 Chetan Rao  │        3 │ 2024-01-20 │ 83999.00 │                  2
 ...` },
    { type:'text', body:`<h3>Finding the latest record per group — a classic pattern</h3>
<p>Wrap the window function in a CTE, then filter on <code>row_num = 1</code>:</p>`},
    { type:'code', lang:'sql', src:`WITH ranked_orders AS (
    SELECT o.*, c.name AS customer_name,
           ROW_NUMBER() OVER (
               PARTITION BY o.customer_id
               ORDER BY o.order_date DESC
           ) AS rn
    FROM   orders o
    JOIN   customers c ON o.customer_id = c.id
)
SELECT customer_name, id AS latest_order_id, order_date, status, total
FROM   ranked_orders
WHERE  rn = 1
ORDER  BY order_date DESC;`,
      out:` customer_name │ latest_order_id │ order_date │ status    │    total
───────────────┼─────────────────┼────────────┼───────────┼──────────
 Elan Kumar    │              15 │ 2024-05-20 │ delivered │ 12000.00
 Jaya Menon    │              14 │ 2024-05-08 │ delivered │  2498.00
 Diya Joshi    │              13 │ 2024-05-01 │ shipped   │ 87999.00
 Hema Pillai   │              11 │ 2024-04-15 │ pending   │  1299.00
 ...` },
    { type:'text', body:`<h3>RANK and DENSE_RANK</h3>
<p>When multiple rows share the same value, <code>ROW_NUMBER</code> assigns arbitrary unique numbers. <code>RANK</code> gives tied rows the same number (but skips ahead). <code>DENSE_RANK</code> gives tied rows the same number and doesn't skip:</p>`},
    { type:'code', lang:'sql', src:`SELECT name, salary,
       RANK()       OVER (ORDER BY salary DESC) AS rank,
       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank,
       NTILE(3)     OVER (ORDER BY salary DESC) AS salary_tier
FROM   employees
ORDER  BY salary DESC;`,
      out:` name               │  salary  │ rank │ dense_rank │ salary_tier
────────────────────┼──────────┼──────┼────────────┼─────────────
 Arjun Sharma       │ 95000.00 │    1 │          1 │           1
 Dev Mehta          │ 92000.00 │    2 │          2 │           1
 Rajan Kumar        │ 88000.00 │    3 │          3 │           1
 Priya Reddy        │ 72000.00 │    4 │          4 │           2
 Bala Subramanian   │ 70000.00 │    5 │          5 │           2
 Esha Patel         │ 68000.00 │    6 │          6 │           2
 Ananya Nair        │ 65000.00 │    7 │          7 │           3
 Chitra Iyer        │ 60000.00 │    8 │          8 │           3` },
    { type:'tip', body:`<code>NTILE(n)</code> divides rows into <code>n</code> roughly equal buckets. <code>NTILE(4)</code> creates quartiles. <code>NTILE(100)</code> creates percentiles. Useful for scoring and segmentation without hardcoding thresholds.` },
    { type:'exercise', title:'Window ranking',
      body:`<p>Write window function queries to:</p>
<ol>
<li>Rank products by revenue (total from order_items), showing rank, dense_rank, and which revenue quartile each falls in</li>
<li>For each department, rank employees by salary — show the top earner per department using the CTE + ROW_NUMBER = 1 pattern</li>
<li>Assign each order a percentile rank by total value using <code>PERCENT_RANK() OVER (ORDER BY total)</code> — show orders in the top 25%</li>
</ol>`,
      hint:`For (3): <code>PERCENT_RANK()</code> returns a value between 0 and 1. Filter <code>WHERE pct_rank >= 0.75</code> to get the top 25%.`,
      solution:`-- 1. Products by revenue with ranking
WITH product_rev AS (
    SELECT p.name, SUM(oi.quantity * oi.unit_price) AS revenue
    FROM   products p JOIN order_items oi ON p.id = oi.product_id
    GROUP  BY p.name
)
SELECT name, revenue,
       RANK() OVER (ORDER BY revenue DESC)       AS rev_rank,
       DENSE_RANK() OVER (ORDER BY revenue DESC) AS dense_rank,
       NTILE(4) OVER (ORDER BY revenue DESC)     AS quartile
FROM   product_rev ORDER BY revenue DESC;

-- 2. Top earner per department
WITH dept_ranked AS (
    SELECT e.name, d.name AS dept, e.salary,
           ROW_NUMBER() OVER (PARTITION BY d.id ORDER BY e.salary DESC) AS rn
    FROM   employees e JOIN departments d ON e.department_id = d.id
)
SELECT dept, name, salary FROM dept_ranked WHERE rn = 1;

-- 3. Top 25% orders by value
WITH pct AS (
    SELECT id, customer_id, total,
           PERCENT_RANK() OVER (ORDER BY total) AS pct_rank
    FROM   orders
)
SELECT id, total, ROUND(pct_rank*100,1) AS percentile
FROM   pct WHERE pct_rank >= 0.75 ORDER BY total DESC;` }
  ]
};

L['sql-w4-l4'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>LAG, LEAD &amp; Running Totals</h2>
<p>Beyond ranking, window functions let you look at neighbouring rows and compute cumulative aggregates — without any self-joins or correlated subqueries. These are the building blocks of time-series analysis in SQL.</p>
<h3>LAG and LEAD — accessing neighbouring rows</h3>
<p><code>LAG(col, n)</code> looks at the value <code>n</code> rows <em>before</em> the current row. <code>LEAD(col, n)</code> looks at <code>n</code> rows <em>ahead</em>. Both default to <code>n=1</code>:</p>
`},
    { type:'code', lang:'sql', src:`-- Month-over-month revenue change:
WITH monthly AS (
    SELECT TO_CHAR(order_date, 'YYYY-MM')        AS month,
           SUM(total)                             AS revenue
    FROM   orders
    GROUP  BY TO_CHAR(order_date, 'YYYY-MM')
    ORDER  BY month
)
SELECT month,
       revenue,
       LAG(revenue) OVER (ORDER BY month)         AS prev_month_rev,
       revenue - LAG(revenue) OVER (ORDER BY month) AS change,
       ROUND(
           (revenue - LAG(revenue) OVER (ORDER BY month))
           * 100.0
           / NULLIF(LAG(revenue) OVER (ORDER BY month), 0),
           1
       )                                           AS pct_change
FROM   monthly;`,
      out:` month   │   revenue  │ prev_month_rev │    change  │ pct_change
─────────┼────────────┼────────────────┼────────────┼───────────
 2024-01 │ 162196.00  │           NULL │       NULL │      NULL
 2024-02 │  11097.00  │      162196.00 │ -151099.00 │     -93.2
 2024-03 │  35597.00  │       11097.00 │   24500.00 │     220.8
 2024-04 │  23097.00  │       35597.00 │  -12500.00 │     -35.1
 2024-05 │ 104898.00  │       23097.00 │   81801.00 │     354.1` },
    { type:'code', lang:'sql', src:`-- LEAD: for each order, what was the customer's NEXT order total?
SELECT c.name,
       o.id            AS order_id,
       o.order_date,
       o.total,
       LEAD(o.total) OVER (
           PARTITION BY o.customer_id
           ORDER BY o.order_date
       )               AS next_order_total
FROM   orders o
JOIN   customers c ON o.customer_id = c.id
ORDER  BY c.name, o.order_date;`,
      out:` name        │ order_id │ order_date │    total │ next_order_total
─────────────┼──────────┼────────────┼──────────┼──────────────────
 Arun Verma  │        1 │ 2024-01-05 │ 76299.00 │          2499.00
 Arun Verma  │        6 │ 2024-02-20 │  2499.00 │             NULL
 Bina Sharma │        2 │ 2024-01-12 │  1898.00 │          3798.00
 Bina Sharma │        9 │ 2024-03-18 │  3798.00 │             NULL
 ...` },
    { type:'text', body:`<h3>Running totals with SUM() OVER</h3>
<p>Any aggregate function (SUM, AVG, COUNT) becomes a <em>running aggregate</em> when used as a window function. The <code>ORDER BY</code> inside <code>OVER</code> defines how the window grows row by row:</p>`},
    { type:'code', lang:'sql', src:`-- Cumulative revenue over time:
SELECT order_date,
       id               AS order_id,
       total,
       SUM(total) OVER (
           ORDER BY order_date, id
       )                AS running_total,
       COUNT(*) OVER (
           ORDER BY order_date, id
       )                AS running_order_count,
       AVG(total) OVER (
           ORDER BY order_date, id
           ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       )                AS rolling_3_avg
FROM   orders
ORDER  BY order_date, id;`,
      out:` order_date │ order_id │    total │ running_total │ running_count │ rolling_3_avg
────────────┼──────────┼──────────┼───────────────┼───────────────┼───────────────
 2024-01-05 │        1 │ 76299.00 │      76299.00 │             1 │      76299.00
 2024-01-12 │        2 │  1898.00 │      78197.00 │             2 │      39098.50
 2024-01-20 │        3 │ 83999.00 │     162196.00 │             3 │      54065.33
 2024-02-01 │        4 │  8999.00 │     171195.00 │             4 │      31632.00
 2024-02-14 │        5 │   599.00 │     171794.00 │             5 │      31199.00
 2024-02-20 │        6 │  2499.00 │     174293.00 │             6 │       4032.33
 ...` },
    { type:'text', body:`<h3>FIRST_VALUE and LAST_VALUE</h3>`},
    { type:'code', lang:'sql', src:`-- Each product compared to the cheapest and most expensive in its category:
SELECT name, category, price,
       FIRST_VALUE(name)  OVER (
           PARTITION BY category ORDER BY price
       )                  AS cheapest_in_cat,
       LAST_VALUE(price)  OVER (
           PARTITION BY category ORDER BY price
           ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
       )                  AS max_price_in_cat
FROM   products
ORDER  BY category, price;`,
      out:` name                    │ category    │  price │ cheapest_in_cat  │ max_price_in_cat
─────────────────────────┼─────────────┼────────┼──────────────────┼─────────────────
 Python Handbook         │ Books       │    599 │ Python Handbook  │              799
 SQL Mastery Book        │ Books       │    799 │ Python Handbook  │              799
 Wireless Mouse          │ Electronics │   1299 │ Wireless Mouse   │            75000
 USB-C Hub               │ Electronics │   2499 │ Wireless Mouse   │            75000
 Noise-Cancel Headphones │ Electronics │   8999 │ Wireless Mouse   │            75000
 Laptop Pro 15           │ Electronics │  75000 │ Wireless Mouse   │            75000
 Ergonomic Chair         │ Furniture   │  12000 │ Ergonomic Chair  │            18500
 Standing Desk           │ Furniture   │  18500 │ Ergonomic Chair  │            18500` },
    { type:'text', body:`
<h3>GENERATE_SERIES — filling date gaps</h3>
<p>A common analytics problem: you want revenue for every month, but months with zero orders simply don't exist in the orders table — they disappear from your results. <code>GENERATE_SERIES</code> generates a complete sequence of dates, and a LEFT JOIN fills in the actual data (or zero for missing months):</p>
`},
    { type:'code', lang:'sql', src:`-- Generate all months in the order range, fill missing months with 0
WITH date_spine AS (
    SELECT generate_series(
        DATE_TRUNC('month', MIN(order_date)),
        DATE_TRUNC('month', MAX(order_date)),
        '1 month'::INTERVAL
    )::DATE AS month
    FROM orders
),
monthly AS (
    SELECT DATE_TRUNC('month', order_date)::DATE AS month,
           SUM(total) AS revenue,
           COUNT(*) AS orders
    FROM   orders
    WHERE  status IN ('delivered', 'shipped')
    GROUP  BY DATE_TRUNC('month', order_date)
)
SELECT ds.month,
       TO_CHAR(ds.month, 'Mon YYYY') AS period,
       COALESCE(m.orders,  0)        AS orders,
       COALESCE(m.revenue, 0)        AS revenue
FROM   date_spine ds
LEFT   JOIN monthly m USING (month)
ORDER  BY ds.month;`,
      out:` month      │ period    │ orders │   revenue
────────────┼───────────┼────────┼──────────
 2024-01-01 │ Jan 2024  │      3 │ 162196.00
 2024-02-01 │ Feb 2024  │      3 │  11097.00
 2024-03-01 │ Mar 2024  │      4 │  35597.00
 2024-04-01 │ Apr 2024  │      3 │  23097.00
 2024-05-01 │ May 2024  │      3 │ 104898.00` },
    { type:'tip', body:`The <code>date_spine</code> CTE pattern is the foundation of all time-series reporting in SQL. Always build the spine first (all possible periods), then LEFT JOIN your actual data onto it. This ensures zero-revenue months appear in your chart, preventing misleading gaps.` },
    { type:'exercise', title:'Time-series, gaps & running aggregates',
      body:`<p>Write window function and time-series queries:</p>
<ol>
<li><strong>Gap-free monthly report:</strong> Using GENERATE_SERIES, produce a table with every month from Jan to May 2024, showing order count, revenue, and cumulative revenue — including months where no orders occurred.</li>
<li><strong>Day-of-week analysis:</strong> What day of the week do most orders occur? Use <code>EXTRACT(DOW FROM order_date)</code> (0=Sunday…6=Saturday) and show the day name with TO_CHAR, order count, and average total.</li>
<li><strong>Salary tenure analysis:</strong> For each employee, show years of tenure (<code>EXTRACT(YEAR FROM AGE(CURRENT_DATE, hire_date))</code>), and use a window to show their salary rank within their department and the % difference between their salary and the department average.</li>
</ol>`,
      hint:`For (2): <code>TO_CHAR(order_date, 'Day')</code> gives the full day name. For (3): <code>ROUND((salary - AVG(salary) OVER (PARTITION BY department_id)) * 100.0 / AVG(salary) OVER (PARTITION BY department_id), 1)</code>.`,
      solution:`-- 1. Gap-free monthly report with running total
WITH spine AS (
    SELECT generate_series(
        '2024-01-01'::DATE,
        '2024-05-01'::DATE,
        '1 month'::INTERVAL)::DATE AS month
),
monthly AS (
    SELECT DATE_TRUNC('month', order_date)::DATE AS month,
           COUNT(*) AS orders, SUM(total) AS revenue
    FROM   orders GROUP BY 1
)
SELECT s.month, TO_CHAR(s.month, 'Mon YYYY') AS period,
       COALESCE(m.orders, 0) AS orders,
       COALESCE(m.revenue, 0) AS revenue,
       SUM(COALESCE(m.revenue,0)) OVER (ORDER BY s.month) AS cumulative
FROM   spine s LEFT JOIN monthly m USING (month)
ORDER  BY s.month;

-- 2. Day-of-week analysis
SELECT EXTRACT(DOW FROM order_date)::INTEGER AS dow,
       TO_CHAR(order_date, 'Day') AS day_name,
       COUNT(*) AS orders,
       ROUND(AVG(total), 2) AS avg_total
FROM   orders
GROUP  BY dow, day_name
ORDER  BY orders DESC;

-- 3. Salary tenure & department comparison
SELECT name,
       department_id,
       salary,
       EXTRACT(YEAR FROM AGE(CURRENT_DATE, hire_date))::INTEGER AS years_tenure,
       RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank,
       ROUND((salary - AVG(salary) OVER (PARTITION BY department_id))
             * 100.0
             / AVG(salary) OVER (PARTITION BY department_id), 1)   AS pct_vs_dept_avg
FROM   employees ORDER BY department_id, salary DESC;` }
  ]
};

L['sql-w4-l5'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>Window Functions Practice — Analytics Challenges</h2>
<p>This lesson applies everything from Week 4 — subqueries, CTEs, and window functions — to the kinds of analytical problems you'll encounter as a data analyst. Work through each challenge before looking at the solution.</p>
<h3>Challenge 1: Top-N per group</h3>
<p>A classic interview question: <em>"Show the top 2 products by revenue in each category."</em></p>
`},
    { type:'code', lang:'sql', src:`WITH product_revenue AS (
    SELECT p.name,
           p.category,
           SUM(oi.quantity * oi.unit_price)       AS revenue,
           ROW_NUMBER() OVER (
               PARTITION BY p.category
               ORDER BY SUM(oi.quantity * oi.unit_price) DESC
           )                                       AS rank_in_category
    FROM   products p
    JOIN   order_items oi ON p.id = oi.product_id
    GROUP  BY p.name, p.category
)
SELECT category, name, revenue, rank_in_category
FROM   product_revenue
WHERE  rank_in_category <= 2
ORDER  BY category, rank_in_category;`,
      out:` category    │ name                    │   revenue  │ rank_in_category
─────────────┼─────────────────────────┼────────────┼──────────────────
 Books       │ Python Handbook         │   2396.00  │                1
 Books       │ SQL Mastery Book        │   1598.00  │                2
 Electronics │ Laptop Pro 15           │ 225000.00  │                1
 Electronics │ Noise-Cancel Headphones │  44995.00  │                2
 Furniture   │ Standing Desk           │  74000.00  │                1
 Furniture   │ Ergonomic Chair         │  24000.00  │                2` },
    { type:'text', body:`<h3>Challenge 2: Month-over-month growth with gaps</h3>`},
    { type:'code', lang:'sql', src:`WITH monthly_revenue AS (
    SELECT DATE_TRUNC('month', order_date)::DATE  AS month,
           SUM(total)                             AS revenue
    FROM   orders
    WHERE  status IN ('delivered','shipped')
    GROUP  BY DATE_TRUNC('month', order_date)
),
with_lag AS (
    SELECT month,
           revenue,
           LAG(revenue) OVER (ORDER BY month) AS prev_rev
    FROM   monthly_revenue
)
SELECT month,
       revenue,
       prev_rev,
       revenue - prev_rev                          AS absolute_change,
       CASE WHEN prev_rev IS NULL THEN NULL
            ELSE ROUND((revenue - prev_rev) * 100.0 / prev_rev, 1)
       END                                          AS pct_growth
FROM   with_lag
ORDER  BY month;`,
      out:` month      │   revenue  │  prev_rev  │ abs_change │ pct_growth
────────────┼────────────┼────────────┼────────────┼───────────
 2024-01-01 │ 162196.00  │       NULL │       NULL │      NULL
 2024-02-01 │  11097.00  │  162196.00 │-151099.00  │     -93.2
 2024-03-01 │  35597.00  │   11097.00 │  24500.00  │     220.8
 2024-04-01 │  23097.00  │   35597.00 │ -12500.00  │     -35.1
 2024-05-01 │ 104898.00  │   23097.00 │  81801.00  │     354.1` },
    { type:'text', body:`<h3>Challenge 3: Running total with a target</h3>`},
    { type:'code', lang:'sql', src:`-- Which orders, in date order, do we need to reach ₹200,000 in revenue?
WITH running AS (
    SELECT id,
           order_date,
           status,
           total,
           SUM(total) OVER (ORDER BY order_date, id) AS running_total
    FROM   orders
    WHERE  status IN ('delivered','shipped')
)
SELECT id, order_date, status, total, running_total
FROM   running
WHERE  running_total <= 200000
ORDER  BY order_date, id;`,
      out:` id │ order_date │ status    │    total │ running_total
────┼────────────┼───────────┼──────────┼───────────────
  1 │ 2024-01-05 │ delivered │ 76299.00 │      76299.00
  2 │ 2024-01-12 │ delivered │  1898.00 │      78197.00
  3 │ 2024-01-20 │ shipped   │ 83999.00 │     162196.00
  4 │ 2024-02-01 │ delivered │  8999.00 │     171195.00
  5 │ 2024-02-14 │ delivered │   599.00 │     171794.00
  7 │ 2024-03-05 │ delivered │ 13299.00 │     185093.00
  8 │ 2024-03-10 │ shipped   │ 18500.00 │     203593.00 ← crossed ₹200k` },
    { type:'exercise', title:'Analytics challenges',
      body:`<p>Solve these three analytics problems using what you've learned this week:</p>
<ol>
<li><strong>Customer cohort analysis:</strong> For each customer, categorise them as <code>'New'</code> (only 1 order), <code>'Returning'</code> (2 orders), or <code>'Loyal'</code> (3+ orders). Show the count of customers in each cohort and their total revenue.</li>
<li><strong>Product pair analysis:</strong> Find all pairs of products that appeared together in the same order. Count how many orders contain each pair. (This is a self-join on order_items.)</li>
<li><strong>Salary band analysis:</strong> Using NTILE(4) over salary, assign each employee to a salary quartile. Then compute the average salary within each quartile.</li>
</ol>`,
      hint:`For (1): use a CTE to get order counts per customer, then CASE WHEN to label the cohort, then GROUP BY cohort. For (2): <code>FROM order_items a JOIN order_items b ON a.order_id = b.order_id AND a.product_id < b.product_id</code>. For (3): wrap NTILE in a CTE, then GROUP BY quartile.`,
      solution:`-- 1. Customer cohort
WITH customer_orders AS (
    SELECT customer_id, COUNT(*) AS order_count, SUM(total) AS revenue
    FROM   orders GROUP BY customer_id
)
SELECT CASE WHEN order_count = 1 THEN 'New'
            WHEN order_count = 2 THEN 'Returning'
            ELSE 'Loyal' END AS cohort,
       COUNT(*) AS customers,
       SUM(revenue) AS total_revenue
FROM   customer_orders GROUP BY cohort;

-- 2. Product pairs
SELECT p1.name, p2.name, COUNT(*) AS co_occurrences
FROM   order_items a
JOIN   order_items b  ON a.order_id = b.order_id AND a.product_id < b.product_id
JOIN   products p1 ON a.product_id = p1.id
JOIN   products p2 ON b.product_id = p2.id
GROUP  BY p1.name, p2.name ORDER BY co_occurrences DESC LIMIT 10;

-- 3. Salary quartiles
WITH quartiles AS (
    SELECT name, salary, NTILE(4) OVER (ORDER BY salary) AS quartile
    FROM   employees
)
SELECT quartile, COUNT(*) AS employees,
       MIN(salary) AS min_sal, MAX(salary) AS max_sal, ROUND(AVG(salary),2) AS avg_sal
FROM   quartiles GROUP BY quartile ORDER BY quartile;` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 5 — QUERY OPTIMISATION & CAPSTONE
══════════════════════════════════════════════════════════════════════════ */

L['sql-w5-l1'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>Indexes — How Databases Speed Up Queries</h2>
<p>A table with 10 rows can be searched in microseconds regardless of how you query it. A table with 100 million rows is a different story — without the right indexes, even simple queries can take minutes.</p>
<p>An <strong>index</strong> is a separate data structure that the database maintains alongside a table. It maps column values to the physical location of matching rows, so the database can jump directly to the data rather than reading every row.</p>
<h3>The analogy that makes it click</h3>
<p>A 500-page textbook without an index: to find every mention of "window function", you read all 500 pages. With an index at the back: you look up "window function", find pages 342, 415, 478, and go directly to them. A database B-tree index works the same way.</p>
<h3>The default: sequential scan</h3>
<p>Without an index, PostgreSQL reads every row in the table — a <em>sequential scan</em>. For small tables this is fine. For large tables it's deadly:</p>
`},
    { type:'code', lang:'sql', src:`-- See what PostgreSQL does for a simple filter (no index yet):
EXPLAIN SELECT * FROM orders WHERE customer_id = 3;`,
      out:`QUERY PLAN
──────────────────────────────────────────────────────────────────
 Seq Scan on orders  (cost=0.00..1.19 rows=2 width=56)
   Filter: (customer_id = 3)
-- PostgreSQL reads ALL rows, then filters.
-- Fine at 15 rows. Slow at 15,000,000 rows.` },
    { type:'text', body:`<h3>Creating an index</h3>
<p>Create an index on any column you frequently filter or join on:</p>`},
    { type:'code', lang:'sql', src:`-- Index on the FK column (commonly queried):
CREATE INDEX idx_orders_customer_id ON orders(customer_id);

-- Index on order_date (for date-range queries):
CREATE INDEX idx_orders_date ON orders(order_date);

-- Composite index (for queries filtering on both):
CREATE INDEX idx_orders_status_date ON orders(status, order_date);

-- Check what indexes exist:
SELECT indexname, indexdef
FROM   pg_indexes
WHERE  tablename = 'orders';`,
      out:` indexname                  │ indexdef
────────────────────────────┼──────────────────────────────────────────────────────
 orders_pkey                │ CREATE UNIQUE INDEX orders_pkey ON orders USING btree (id)
 idx_orders_customer_id     │ CREATE INDEX idx_orders_customer_id ON orders USING btree (customer_id)
 idx_orders_date            │ CREATE INDEX idx_orders_date ON orders USING btree (order_date)
 idx_orders_status_date     │ CREATE INDEX idx_orders_status_date ON orders USING btree (status, order_date)` },
    { type:'code', lang:'sql', src:`-- Now see the difference:
EXPLAIN SELECT * FROM orders WHERE customer_id = 3;`,
      out:`QUERY PLAN
──────────────────────────────────────────────────────────────────
 Index Scan using idx_orders_customer_id on orders  (cost=0.14..8.16 rows=2 width=56)
   Index Cond: (customer_id = 3)
-- PostgreSQL now uses the index to go directly to matching rows.` },
    { type:'text', body:`<h3>When indexes help (and when they don't)</h3>
<table style="width:100%;border-collapse:collapse;margin:1rem 0">
<tr style="background:var(--fog2)"><th style="padding:.4rem .8rem;text-align:left">Use an index when…</th><th style="padding:.4rem .8rem;text-align:left">Index won't help when…</th></tr>
<tr><td style="padding:.4rem .8rem">Filtering on a column with many distinct values</td><td style="padding:.4rem .8rem">The column has low cardinality (e.g., a boolean)</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem">JOIN conditions on FK columns</td><td style="padding:.4rem .8rem">The query returns most of the table (seq scan is cheaper)</td></tr>
<tr><td style="padding:.4rem .8rem">ORDER BY on large tables</td><td style="padding:.4rem .8rem">Leading wildcard LIKE queries (<code>LIKE '%word'</code>)</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem">Frequently queried date ranges</td><td style="padding:.4rem .8rem">Columns wrapped in functions: <code>WHERE LOWER(name) = 'x'</code></td></tr>
</table>
`},
    { type:'warn', body:`Indexes speed up reads but slow down writes — every INSERT, UPDATE, and DELETE must also update the index. Don't blindly index every column. Start with FKs, high-cardinality filter columns, and ORDER BY columns.` },
    { type:'exercise', title:'Index strategy',
      body:`<p>For the following queries, decide which index to create and create it:</p>
<ol>
<li><code>SELECT * FROM order_items WHERE order_id = 5</code></li>
<li><code>SELECT * FROM employees WHERE department_id = 2 AND salary > 70000</code></li>
<li><code>SELECT * FROM customers WHERE email = 'priya@gmail.com'</code></li>
<li>Explain why indexing the <code>status</code> column in <code>orders</code> (which has only 4 possible values) might not be as effective as indexing <code>order_date</code>.</li>
</ol>`,
      hint:`For (2): a composite index <code>(department_id, salary)</code> helps both conditions. For (3): a UNIQUE index (email is already UNIQUE in our schema — check with <code>\\d customers</code> in psql). For (4): low cardinality = the index returns 25% of rows; PostgreSQL may prefer a seq scan.`,
      solution:`-- 1. Index on order_id in order_items (FK column, heavily joined)
CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- 2. Composite index for department + salary filter
CREATE INDEX idx_emp_dept_salary ON employees(department_id, salary);

-- 3. email is already UNIQUE (implies a unique index exists)
-- Verify: SELECT indexname FROM pg_indexes WHERE tablename = 'customers';

-- 4. Explanation:
-- status has 4 values. Each value appears in ~25% of rows.
-- PostgreSQL may decide a sequential scan is faster than an index
-- scan + random I/O for 25% of a large table.
-- order_date has thousands of unique values; index pays off well
-- for narrow date-range queries.` }
  ]
};

L['sql-w5-l2'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>EXPLAIN &amp; Reading Query Plans</h2>
<p><code>EXPLAIN</code> is the single most important diagnostic tool in SQL. It shows you exactly what the database plans to do when executing your query — without actually running it. <code>EXPLAIN ANALYZE</code> runs the query and shows what it actually did, including real timings.</p>
<h3>Reading EXPLAIN output</h3>
<p>PostgreSQL returns a tree of operations. Read it from the innermost (most indented) node to the outermost — that's the execution order.</p>
`},
    { type:'code', lang:'sql', src:`EXPLAIN SELECT c.name, COUNT(o.id) AS orders
FROM   customers c
LEFT   JOIN orders o ON c.id = o.customer_id
GROUP  BY c.name
ORDER  BY orders DESC;`,
      out:`QUERY PLAN
──────────────────────────────────────────────────────────────────────────────
 Sort  (cost=32.50..32.63 rows=51 width=40)
   Sort Key: (count(o.id)) DESC
   ->  HashAggregate  (cost=29.51..30.02 rows=51 width=40)
         Group Key: c.name
         ->  Hash Left Join  (cost=1.23..27.51 rows=200 width=32)
               Hash Cond: (o.customer_id = c.id)
               ->  Seq Scan on orders o  (cost=0.00..21.00 rows=1100 width=8)
               ->  Hash  (cost=1.10..1.10 rows=10 width=36)
                     ->  Seq Scan on customers c  (cost=0.00..1.10 rows=10 width=36)

-- Reading innermost to outermost:
-- 1. Seq Scan on customers (full table read, 10 rows)
-- 2. Hash it (build hash table for the join)
-- 3. Seq Scan on orders (full table read)
-- 4. Hash Left Join (match orders to customers)
-- 5. HashAggregate (GROUP BY c.name)
-- 6. Sort (ORDER BY orders DESC)` },
    { type:'text', body:`<h3>Cost numbers explained</h3>
<p><code>cost=0.00..21.00</code> means: startup cost = 0.00, total cost = 21.00. These are in arbitrary units (not milliseconds) — they're useful for <em>comparing</em> plans, not absolute timing. <code>rows=</code> is the estimated output rows. <code>width=</code> is estimated bytes per row.</p>
<h3>EXPLAIN ANALYZE — real timings</h3>`},
    { type:'code', lang:'sql', src:`EXPLAIN ANALYZE
SELECT p.name, SUM(oi.quantity * oi.unit_price) AS revenue
FROM   order_items oi
JOIN   products p ON oi.product_id = p.id
GROUP  BY p.name
ORDER  BY revenue DESC;`,
      out:`QUERY PLAN
──────────────────────────────────────────────────────────────────────────────
 Sort  (cost=52.82..52.94 rows=51 width=40) (actual time=0.312..0.313 rows=8 loops=1)
   Sort Key: (sum((oi.quantity * oi.unit_price))) DESC
   ->  HashAggregate  (cost=50.03..51.05 rows=51 width=40) (actual time=0.287..0.297 rows=8 loops=1)
         Group Key: p.name
         ->  Hash Join  (cost=1.18..44.90 rows=1025 width=36) (actual time=0.064..0.205 rows=25 loops=1)
               Hash Cond: (oi.product_id = p.id)
               ->  Seq Scan on order_items oi  (cost=0.00..18.25 rows=1025 width=16) (actual time=0.017..0.066 rows=25 loops=1)
               ->  Hash  (cost=1.08..1.08 rows=8 width=28) (actual time=0.029..0.029 rows=8 loops=1)
                     ->  Seq Scan on products p  (cost=0.00..1.08 rows=8 width=28) (actual time=0.019..0.021 rows=8 loops=1)
 Planning Time: 0.531 ms
 Execution Time: 0.412 ms
-- actual time= shows real execution time in ms
-- This ran in 0.412ms — very fast on a small dataset` },
    { type:'tip', body:`For EXPLAIN to be useful in production, run <code>ANALYZE table_name</code> first to update the planner's statistics. Stale stats lead to bad plan choices, which is a common cause of sudden query slowdowns.` },
    { type:'text', body:`<h3>Common red flags in query plans</h3>
<ul>
<li><strong>Seq Scan on a large table</strong> — check if an index should exist</li>
<li><strong>Estimated rows vs actual rows are very different</strong> — statistics are stale; run <code>ANALYZE</code></li>
<li><strong>Sort with large width</strong> — the sort is materialising many columns; select fewer</li>
<li><strong>Nested Loop with many loops</strong> — a missing index on the inner table</li>
</ul>`},
    { type:'exercise', title:'Profile your queries',
      body:`<p>Run <code>EXPLAIN ANALYZE</code> on the following queries and answer the questions:</p>
<ol>
<li><code>SELECT * FROM orders WHERE status = 'delivered' AND total > 5000</code> — Is it using an index? What would help?</li>
<li>The 4-table join from lesson 3-2 (customers → orders → order_items → products) — how many total rows does the plan process? What is the execution time?</li>
<li>Create an index on <code>order_items(order_id)</code>, then re-run query 2's EXPLAIN ANALYZE. Does the plan change?</li>
</ol>`,
      hint:`Look for "Seq Scan" vs "Index Scan" in the plan. The total rows processed is the sum of all "actual rows" values in the plan nodes. For (3), the join condition <code>oi.order_id = o.id</code> is the FK column — indexing it often switches the join strategy.`,
      solution:`-- 1.
EXPLAIN ANALYZE SELECT * FROM orders WHERE status = 'delivered' AND total > 5000;
-- Likely Seq Scan (status has low cardinality, total may not be indexed)
-- Better: CREATE INDEX idx_orders_total ON orders(total) WHERE status = 'delivered';

-- 2. Profile the 4-table join
EXPLAIN ANALYZE
SELECT c.name, o.id, p.name, oi.quantity, oi.unit_price
FROM   orders o
JOIN   customers c    ON o.customer_id = c.id
JOIN   order_items oi ON o.id = oi.order_id
JOIN   products p     ON oi.product_id = p.id
ORDER  BY o.id;

-- 3. Add index and re-profile
CREATE INDEX idx_oi_order_id ON order_items(order_id);
EXPLAIN ANALYZE
SELECT c.name, o.id, p.name, oi.quantity, oi.unit_price
FROM   orders o
JOIN   customers c    ON o.customer_id = c.id
JOIN   order_items oi ON o.id = oi.order_id
JOIN   products p     ON oi.product_id = p.id
ORDER  BY o.id;
-- Compare the two plans — the index scan should appear.` }
  ]
};

L['sql-w5-l3'] = {
  duration_mins: 12,
  sections: [
    { type:'text', body:`
<h2>Views &amp; Materialised Views</h2>
<p>Complex queries with many JOINs and aggregations are hard to share and maintain. If five dashboards all query the same 6-table join, each team member needs to copy-paste the same SQL. Views solve this by giving a query a name — it becomes reusable like a table.</p>
<h3>CREATE VIEW — a saved query</h3>
<p>A view stores the SQL definition, not the data. Every time you query the view, PostgreSQL runs the underlying SQL:</p>
`},
    { type:'code', lang:'sql', src:`CREATE VIEW customer_order_summary AS
SELECT c.id,
       c.name,
       c.city,
       COUNT(o.id)                              AS total_orders,
       COALESCE(SUM(o.total), 0)               AS lifetime_value,
       MAX(o.order_date)                        AS last_order_date,
       COUNT(CASE WHEN o.status='delivered'
                  THEN 1 END)                   AS delivered_count
FROM   customers c
LEFT   JOIN orders o ON c.id = o.customer_id
GROUP  BY c.id, c.name, c.city;

-- Now query it like a table:
SELECT name, lifetime_value, total_orders
FROM   customer_order_summary
WHERE  lifetime_value > 10000
ORDER  BY lifetime_value DESC;`,
      out:` name        │ lifetime_value │ total_orders
─────────────┼────────────────┼──────────────
 Arun Verma  │      78798.00  │            2
 Chetan Rao  │     104998.00  │            2
 Diya Joshi  │      96998.00  │            2
 Elan Kumar  │      12599.00  │            2
 Farah Khan  │      13299.00  │            1` },
    { type:'code', lang:'sql', src:`-- Views compose with other queries naturally:
SELECT city, COUNT(*) AS vip_customers
FROM   customer_order_summary
WHERE  lifetime_value > 50000
GROUP  BY city;

-- Drop a view:
-- DROP VIEW customer_order_summary;

-- Update a view (replace the definition):
-- CREATE OR REPLACE VIEW customer_order_summary AS ...` },
    { type:'text', body:`<h3>Materialised Views — caching expensive queries</h3>
<p>A regular view re-runs its SQL every time you query it. If the query takes 30 seconds, every dashboard load takes 30 seconds. A <strong>materialised view</strong> stores the query result on disk and refreshes it on demand — trading staleness for speed:</p>`},
    { type:'code', lang:'sql', src:`CREATE MATERIALIZED VIEW product_sales_summary AS
SELECT p.id,
       p.name,
       p.category,
       p.stock,
       COALESCE(SUM(oi.quantity), 0)                AS units_sold,
       COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS revenue
FROM   products p
LEFT   JOIN order_items oi ON p.id = oi.product_id
GROUP  BY p.id, p.name, p.category, p.stock;

-- Fast! Reads pre-computed data:
SELECT name, revenue FROM product_sales_summary ORDER BY revenue DESC;

-- Refresh when underlying data changes:
REFRESH MATERIALIZED VIEW product_sales_summary;

-- Refresh without locking reads (PostgreSQL 9.4+):
REFRESH MATERIALIZED VIEW CONCURRENTLY product_sales_summary;`,
      out:` name                    │   revenue
─────────────────────────┼──────────────
 Laptop Pro 15           │  225000.00
 Standing Desk           │   74000.00
 Noise-Cancel Headphones │   44995.00
 Ergonomic Chair         │   24000.00
 USB-C Hub               │    7497.00
 Wireless Mouse          │    6495.00
 Python Handbook         │    2396.00
 SQL Mastery Book        │    1598.00` },
    { type:'tip', body:`Use regular views for maintainability and reuse. Use materialised views for expensive aggregation queries that power dashboards — and add a scheduled job (cron or pg_cron) to refresh them regularly.` },
    { type:'text', body:`
<h3>Data quality queries — find problems before they find you</h3>
<p>Every data analyst needs a toolkit of queries to audit data quality. Run these on any new dataset before you start analysis:</p>
`},
    { type:'code', lang:'sql', src:`-- ① Find duplicate rows (same customer_id + order_date)
SELECT customer_id, order_date, COUNT(*) AS duplicates
FROM   orders
GROUP  BY customer_id, order_date
HAVING COUNT(*) > 1;

-- ② NULL audit — count missing values per column
SELECT
    COUNT(*) FILTER (WHERE customer_id IS NULL) AS null_customer,
    COUNT(*) FILTER (WHERE order_date  IS NULL) AS null_date,
    COUNT(*) FILTER (WHERE status      IS NULL) AS null_status,
    COUNT(*) FILTER (WHERE total       IS NULL) AS null_total
FROM   orders;

-- ③ Orphan records — order_items pointing to deleted orders
SELECT oi.id, oi.order_id
FROM   order_items oi
LEFT   JOIN orders o ON oi.order_id = o.id
WHERE  o.id IS NULL;

-- ④ Value distribution check — are any statuses unexpected?
SELECT status, COUNT(*) AS cnt,
       ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) AS pct
FROM   orders
GROUP  BY status ORDER BY cnt DESC;

-- ⑤ Outlier detection — orders more than 3 std devs from mean
SELECT id, order_date, total
FROM   orders
WHERE  ABS(total - (SELECT AVG(total) FROM orders))
       > 3 * (SELECT STDDEV(total) FROM orders);`,
      out:`-- ① (0 rows — no duplicates in our dataset)

-- ② (all zeros — clean dataset)

-- ③ (0 rows — no orphans)

-- ④
 status    │ cnt │  pct
───────────┼─────┼──────
 delivered │  10 │ 58.8
 shipped   │   3 │ 17.6
 pending   │   2 │ 11.8
 cancelled │   2 │ 11.8

-- ⑤ (varies — flags unusually large orders)` },
    { type:'warn', body:`Always run data quality checks before analysis, not after. A subtle duplicate or outlier found <em>after</em> you've built a report means redoing the report. Build a reusable data quality view that you can refresh whenever new data arrives.` },
    { type:'exercise', title:'Views + data quality audit',
      body:`<p>Create two views and a data quality audit query:</p>
<ol>
<li><strong>order_details_view:</strong> join orders, customers, order_items, and products — one row per line item with customer name, product name, category, quantity, unit_price, and line total (quantity × unit_price)</li>
<li><strong>department_summary_view:</strong> department name, headcount, total payroll, avg salary, top salary, and payroll as % of budget. Include departments with no employees (use LEFT JOIN).</li>
<li><strong>Data quality report:</strong> Write a single query that produces a one-row quality summary for the <code>employees</code> table: total rows, NULL salary count, NULL hire_date count, count of employees with salary below ₹30,000 (likely data entry error), and count of future hire_dates (hire_date > CURRENT_DATE).</li>
</ol>`,
      hint:`For the materialised version: <code>CREATE MATERIALIZED VIEW dept_summary_mat AS SELECT * FROM department_summary_view;</code> then <code>REFRESH MATERIALIZED VIEW dept_summary_mat;</code>.`,
      solution:`CREATE VIEW order_details_view AS
SELECT o.id AS order_id, o.order_date, o.status,
       c.name AS customer, c.city,
       p.name AS product, p.category,
       oi.quantity, oi.unit_price,
       oi.quantity * oi.unit_price AS line_total,
       o.total AS order_total
FROM   orders o
JOIN   customers c    ON o.customer_id = c.id
JOIN   order_items oi ON o.id = oi.order_id
JOIN   products p     ON oi.product_id = p.id;

CREATE VIEW department_summary_view AS
SELECT d.name AS department,
       COUNT(e.id) AS headcount,
       SUM(e.salary) AS total_payroll,
       ROUND(AVG(e.salary),2) AS avg_salary,
       ROUND(SUM(e.salary)*100.0/d.budget, 1) AS pct_of_budget
FROM   departments d LEFT JOIN employees e ON d.id = e.department_id
GROUP  BY d.name, d.budget;

SELECT * FROM order_details_view WHERE status = 'delivered' LIMIT 5;
SELECT * FROM department_summary_view;

CREATE MATERIALIZED VIEW dept_summary_mat AS
SELECT * FROM department_summary_view;
REFRESH MATERIALIZED VIEW dept_summary_mat;` }
  ]
};

L['sql-w5-l4'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>SQL from Python — psycopg2 &amp; Pandas</h2>
<p>Knowing SQL in a database IDE is one skill. Connecting Python to a database and using SQL programmatically is another — and it's the one you'll use in real data pipelines. This lesson covers two approaches: <code>psycopg2</code> for fine-grained control and <code>pandas</code> for data analysis workflows.</p>
<pre style="background:var(--fog2);padding:.5rem 1rem;border-radius:.4rem;font-family:monospace">pip install psycopg2-binary pandas sqlalchemy</pre>
<h3>Connecting with psycopg2</h3>
`},
    { type:'code', lang:'python', src:`import psycopg2

# Connection string — in production, load from environment variables, not hardcode
conn = psycopg2.connect(
    host="localhost",
    database="dsa_ecommerce",
    user="postgres",
    password="your_password",
    port=5432
)

cur = conn.cursor()

# Simple SELECT
cur.execute("SELECT id, name, city FROM customers ORDER BY name;")
rows = cur.fetchall()
for row in rows:
    print(f"  {row[0]:>3}  {row[1]:<20}  {row[2]}")

cur.close()
conn.close()`,
      out:`    1  Arun Verma            Mumbai
    2  Bina Sharma           Delhi
    3  Chetan Rao            Bengaluru
    4  Diya Joshi            Chennai
    5  Elan Kumar            Hyderabad
    6  Farah Khan            Pune
    7  Gopal Iyer            Mumbai
    8  Hema Pillai           Kochi
    9  Ishaan Das            Kolkata
   10  Jaya Menon            Bengaluru` },
    { type:'warn', body:`<strong>Never</strong> build SQL queries using Python string formatting or f-strings with user input. This opens your database to SQL injection attacks. Always use parameterised queries with <code>%s</code> placeholders.` },
    { type:'code', lang:'python', src:`import psycopg2

conn = psycopg2.connect(host="localhost", database="dsa_ecommerce",
                        user="postgres", password="your_password")
cur = conn.cursor()

# ── Parameterised query (safe — never do string interpolation) ────────────
def get_orders_for_customer(customer_id):
    # %s placeholders, values passed separately — psycopg2 escapes them
    cur.execute("""
        SELECT o.id, o.order_date, o.status, o.total
        FROM   orders o
        WHERE  o.customer_id = %s
        ORDER  BY o.order_date DESC
    """, (customer_id,))        # <-- params as a tuple
    return cur.fetchall()

for order in get_orders_for_customer(1):
    print(order)

# ── INSERT with parameters ────────────────────────────────────────────────
def add_customer(name, email, city):
    cur.execute("""
        INSERT INTO customers (name, email, city, join_date)
        VALUES (%s, %s, %s, CURRENT_DATE)
        RETURNING id
    """, (name, email, city))
    new_id = cur.fetchone()[0]
    conn.commit()              # must commit writes
    return new_id

new_id = add_customer("Kavya Pillai", "kavya@gmail.com", "Thiruvananthapuram")
print(f"New customer ID: {new_id}")

cur.close()
conn.close()`,
      out:`(6, datetime.date(2024, 2, 20), 'cancelled', Decimal('2499.00'))
(1, datetime.date(2024, 1, 5), 'delivered', Decimal('76299.00'))
New customer ID: 11` },
    { type:'text', body:`<h3>pandas + SQLAlchemy — the data analysis workflow</h3>
<p><code>pd.read_sql()</code> runs any SQL query and returns a DataFrame directly — the fastest path from a database table to a Python analysis:</p>`},
    { type:'code', lang:'python', src:`import pandas as pd
from sqlalchemy import create_engine

# SQLAlchemy engine — connection string format:
# postgresql://user:password@host:port/database
engine = create_engine("postgresql://postgres:your_password@localhost:5432/dsa_ecommerce")

# ── Read a query directly into a DataFrame ───────────────────────────────
df = pd.read_sql("""
    SELECT c.name, c.city,
           COUNT(o.id)            AS total_orders,
           SUM(o.total)           AS lifetime_value,
           MAX(o.order_date)      AS last_order
    FROM   customers c
    LEFT   JOIN orders o ON c.id = o.customer_id
    GROUP  BY c.name, c.city
    ORDER  BY lifetime_value DESC NULLS LAST
""", engine)

print(df)
print(f"\\nTop spender: {df.iloc[0]['name']} — ₹{df.iloc[0]['lifetime_value']:,.0f}")
print(f"Average LTV:  ₹{df['lifetime_value'].mean():,.0f}")`,
      out:`          name       city  total_orders  lifetime_value  last_order
0      Chetan Rao  Bengaluru             2       104998.0  2024-04-02
1    Diya Joshi     Chennai             2        96998.0  2024-05-01
2    Arun Verma     Mumbai              2        78798.0  2024-02-20
3    Farah Khan       Pune              1        13299.0  2024-03-05
4    Elan Kumar  Hyderabad              2        12599.0  2024-05-20
...

Top spender: Chetan Rao — ₹104,998
Average LTV:  ₹41,579` },
    { type:'code', lang:'python', src:`# ── Write a DataFrame back to the database ───────────────────────────────
import pandas as pd, numpy as np
from sqlalchemy import create_engine

engine = create_engine("postgresql://postgres:your_password@localhost:5432/dsa_ecommerce")

# Suppose we've computed a customer segment label in Python:
df = pd.read_sql("SELECT id, name FROM customers", engine)
np.random.seed(42)
df['segment'] = np.random.choice(['High Value','Mid Value','Entry Level'], len(df))

# Write only the id + segment columns to a new table:
df[['id','segment']].to_sql(
    'customer_segments',
    engine,
    if_exists='replace',  # 'replace' drops and recreates; 'append' adds rows
    index=False
)
print(f"Written {len(df)} rows to customer_segments table")`,
      out:`Written 10 rows to customer_segments table` },
    { type:'exercise', title:'Python + SQL pipeline',
      body:`<p>Write a Python script that:</p>
<ol>
<li>Connects to the database using psycopg2</li>
<li>Fetches all products with their total revenue from order_items (using a parameterised query that accepts a minimum revenue threshold as a parameter)</li>
<li>Prints the results formatted as a table</li>
<li>Then uses pandas + SQLAlchemy to load the same data into a DataFrame and compute: which category has the highest average revenue per product?</li>
</ol>`,
      hint:`For (2): the minimum revenue threshold goes in the HAVING clause — <code>HAVING SUM(oi.quantity * oi.unit_price) > %s</code>. For (4): <code>df.groupby('category')['revenue'].mean()</code>.`,
      solution:`import psycopg2, pandas as pd
from sqlalchemy import create_engine

# Part 1-3: psycopg2
conn = psycopg2.connect(host="localhost", database="dsa_ecommerce",
                        user="postgres", password="your_password")
cur = conn.cursor()

min_revenue = 1000  # parameter

cur.execute("""
    SELECT p.name, p.category,
           SUM(oi.quantity)                    AS units,
           SUM(oi.quantity * oi.unit_price)    AS revenue
    FROM   products p
    JOIN   order_items oi ON p.id = oi.product_id
    GROUP  BY p.name, p.category
    HAVING SUM(oi.quantity * oi.unit_price) > %s
    ORDER  BY revenue DESC
""", (min_revenue,))

print(f"{'Product':<30} {'Category':<15} {'Units':>6} {'Revenue':>12}")
print("-" * 65)
for name, cat, units, rev in cur.fetchall():
    print(f"{name:<30} {cat:<15} {units:>6} {float(rev):>12,.2f}")

cur.close(); conn.close()

# Part 4: pandas
engine = create_engine("postgresql://postgres:your_password@localhost:5432/dsa_ecommerce")
df = pd.read_sql("""
    SELECT p.category, SUM(oi.quantity * oi.unit_price) AS revenue
    FROM   products p JOIN order_items oi ON p.id = oi.product_id
    GROUP  BY p.name, p.category
""", engine)
print("\\nAvg revenue per product by category:")
print(df.groupby('category')['revenue'].mean().sort_values(ascending=False))` }
  ]
};

L['sql-w5-l5'] = {
  duration_mins: 25,
  sections: [
    { type:'text', body:`
<h2>Capstone Project — E-commerce Analytics Report</h2>
<p>You've covered 5 weeks of SQL — from basic SELECT to window functions, CTEs, indexes, and Python integration. This capstone applies everything in a single end-to-end analytics project: producing a business intelligence report on the DSA e-commerce database.</p>
<p>Work through each section in order. Every query builds on the concepts from the week it draws from. Read the problem statement before looking at the solution.</p>
<h3>Section 1 — Revenue Overview (Weeks 1–2)</h3>
`},
    { type:'code', lang:'sql', src:`-- Total revenue, delivered orders, cancellation rate, AOV
SELECT COUNT(*)                                              AS total_orders,
       SUM(total)                                           AS gross_revenue,
       SUM(CASE WHEN status='delivered' THEN total ELSE 0 END) AS net_revenue,
       SUM(CASE WHEN status='cancelled' THEN 1 ELSE 0 END)::NUMERIC
         / COUNT(*) * 100                                   AS cancellation_rate_pct,
       ROUND(AVG(total), 2)                                 AS avg_order_value,
       MAX(total)                                           AS largest_order,
       MIN(CASE WHEN total > 0 THEN total END)              AS smallest_order
FROM   orders;`,
      out:` total_orders │ gross_revenue │ net_revenue │ cancel_rate_pct │ avg_order_value │ largest_order │ smallest_order
──────────────┼───────────────┼─────────────┼─────────────────┼─────────────────┼───────────────┼────────────────
           15 │    336885.00  │  140889.00  │             6.7 │        22459.00 │      87999.00 │         599.00` },
    { type:'text', body:`<h3>Section 2 — Product Performance (Weeks 2–3)</h3>`},
    { type:'code', lang:'sql', src:`SELECT p.name,
       p.category,
       p.stock                                   AS remaining_stock,
       COUNT(DISTINCT oi.order_id)               AS orders_containing,
       SUM(oi.quantity)                          AS units_sold,
       SUM(oi.quantity * oi.unit_price)          AS revenue,
       ROUND(SUM(oi.quantity * oi.unit_price)
             / NULLIF(SUM(oi.quantity),0), 2)    AS avg_selling_price,
       CASE
         WHEN SUM(oi.quantity) >= 4 THEN 'Best Seller'
         WHEN SUM(oi.quantity) >= 2 THEN 'Moving'
         ELSE 'Slow'
       END                                        AS label
FROM   products p
LEFT   JOIN order_items oi ON p.id = oi.product_id
GROUP  BY p.id, p.name, p.category, p.stock
ORDER  BY revenue DESC NULLS LAST;`,
      out:` name                    │ category    │ stock │ orders │ units │   revenue  │ avg_price │ label
─────────────────────────┼─────────────┼───────┼────────┼───────┼────────────┼───────────┼─────────────
 Laptop Pro 15           │ Electronics │    12 │      3 │     3 │ 225000.00  │  75000.00 │ Moving
 Standing Desk           │ Furniture   │     8 │      3 │     4 │  74000.00  │  18500.00 │ Best Seller
 Noise-Cancel Headphones │ Electronics │    30 │      5 │     5 │  44995.00  │   8999.00 │ Best Seller
 Ergonomic Chair         │ Furniture   │    15 │      2 │     2 │  24000.00  │  12000.00 │ Moving
 USB-C Hub               │ Electronics │    60 │      3 │     3 │   7497.00  │   2499.00 │ Moving
 Wireless Mouse          │ Electronics │    85 │      4 │     5 │   6495.00  │   1299.00 │ Best Seller
 Python Handbook         │ Books       │   200 │      3 │     4 │   2396.00  │    599.00 │ Best Seller
 SQL Mastery Book        │ Books       │   150 │      2 │     2 │   1598.00  │    799.00 │ Moving` },
    { type:'text', body:`<h3>Section 3 — Customer Lifetime Value (Weeks 3–4)</h3>`},
    { type:'code', lang:'sql', src:`WITH customer_stats AS (
    SELECT c.id, c.name, c.city, c.join_date,
           COUNT(DISTINCT o.id)                     AS total_orders,
           SUM(o.total)                             AS lifetime_value,
           MAX(o.order_date)                        AS last_order,
           SUM(CASE WHEN o.status='delivered'
                    THEN o.total END)               AS delivered_value
    FROM   customers c
    LEFT   JOIN orders o ON c.id = o.customer_id
    GROUP  BY c.id, c.name, c.city, c.join_date
),
ranked AS (
    SELECT *,
           RANK() OVER (ORDER BY lifetime_value DESC NULLS LAST)    AS value_rank,
           NTILE(3) OVER (ORDER BY lifetime_value DESC NULLS LAST)  AS tier
    FROM   customer_stats
)
SELECT name, city,
       total_orders,
       COALESCE(lifetime_value, 0)   AS lifetime_value,
       COALESCE(delivered_value, 0)  AS confirmed_value,
       value_rank,
       CASE tier WHEN 1 THEN 'Premium' WHEN 2 THEN 'Standard' ELSE 'Basic' END AS tier
FROM   ranked
ORDER  BY value_rank;`,
      out:` name         │ city      │ orders │ lifetime_value │ confirmed_value │ rank │ tier
──────────────┼───────────┼────────┼────────────────┼─────────────────┼──────┼─────────
 Chetan Rao   │ Bengaluru │      2 │      104998.00 │        20999.00 │    1 │ Premium
 Diya Joshi   │ Chennai   │      2 │       96998.00 │         8999.00 │    2 │ Premium
 Arun Verma   │ Mumbai    │      2 │       78798.00 │        76299.00 │    3 │ Premium
 Gopal Iyer   │ Mumbai    │      1 │       18500.00 │            0.00 │    4 │ Standard
 Farah Khan   │ Pune      │      1 │       13299.00 │        13299.00 │    5 │ Standard
 Elan Kumar   │ Hyderabad │      2 │       12599.00 │        12599.00 │    6 │ Standard
 ...` },
    { type:'text', body:`<h3>Section 4 — Monthly Trends with Window Functions (Week 4)</h3>`},
    { type:'code', lang:'sql', src:`WITH monthly AS (
    SELECT DATE_TRUNC('month', order_date)::DATE AS month,
           SUM(total)          AS revenue,
           COUNT(*)            AS orders,
           COUNT(DISTINCT customer_id) AS active_customers
    FROM   orders
    GROUP  BY DATE_TRUNC('month', order_date)
)
SELECT TO_CHAR(month, 'Mon YYYY')                               AS period,
       revenue,
       orders,
       active_customers,
       SUM(revenue) OVER (ORDER BY month)                       AS cumulative_revenue,
       ROUND(revenue * 100.0
             / SUM(revenue) OVER (), 1)                         AS pct_of_total,
       ROUND((revenue - LAG(revenue) OVER (ORDER BY month))
             * 100.0
             / NULLIF(LAG(revenue) OVER (ORDER BY month), 0), 1) AS mom_growth
FROM   monthly
ORDER  BY month;`,
      out:` period   │   revenue  │ orders │ customers │ cumulative │ pct_total │ mom_growth
──────────┼────────────┼────────┼───────────┼────────────┼───────────┼───────────
 Jan 2024 │ 162196.00  │      3 │         3 │ 162196.00  │      48.1 │      NULL
 Feb 2024 │  11097.00  │      3 │         3 │ 173293.00  │       3.3 │     -93.2
 Mar 2024 │  35597.00  │      3 │         3 │ 208890.00  │      10.6 │     220.8
 Apr 2024 │  23097.00  │      3 │         3 │ 231987.00  │       6.9 │     -35.1
 May 2024 │ 104898.00  │      3 │         3 │ 336885.00  │      31.1 │     354.1` },
    { type:'tip', body:`<code>SUM(revenue) OVER ()</code> with an empty OVER clause sums across all rows — giving total revenue in every row, so you can compute each month's percentage in one query.` },
    { type:'text', body:`<h3>Section 5 — Export-ready views (Week 5)</h3>`},
    { type:'code', lang:'sql', src:`-- Create a materialised summary view for the BI dashboard:
CREATE MATERIALIZED VIEW bi_dashboard AS
WITH product_rev AS (
    SELECT oi.product_id, SUM(oi.quantity * oi.unit_price) AS revenue
    FROM   order_items oi
    GROUP  BY oi.product_id
),
customer_ltv AS (
    SELECT customer_id, SUM(total) AS ltv
    FROM   orders WHERE status = 'delivered'
    GROUP  BY customer_id
)
SELECT
    -- Revenue metrics
    (SELECT SUM(total)  FROM orders WHERE status='delivered') AS confirmed_revenue,
    (SELECT COUNT(*)    FROM orders WHERE status='delivered') AS delivered_orders,
    (SELECT COUNT(*)    FROM customers)                        AS total_customers,
    (SELECT ROUND(AVG(ltv),2) FROM customer_ltv)              AS avg_customer_ltv,
    (SELECT p.name FROM products p JOIN product_rev pr ON p.id=pr.product_id
     ORDER BY pr.revenue DESC LIMIT 1)                        AS top_product,
    (SELECT SUM(stock * price) FROM products)                 AS inventory_value,
    NOW()                                                      AS refreshed_at;

SELECT * FROM bi_dashboard;`,
      out:` confirmed_revenue │ delivered_orders │ total_customers │ avg_customer_ltv │ top_product   │ inventory_value │ refreshed_at
───────────────────┼──────────────────┼─────────────────┼──────────────────┼───────────────┼─────────────────┼──────────────────────
        140889.00  │               10 │              10 │         34786.22 │ Laptop Pro 15 │    1,249,865.00 │ 2024-06-01 10:23:41` },
    { type:'exercise', title:'Full analyst capstone',
      body:`<p>You are a data analyst for DSA's e-commerce platform. Write SQL to answer the following questions — each representing a real business ask:</p>
<ol>
<li><strong>Customer lifetime value segmentation:</strong> Calculate each customer's LTV (total revenue from delivered orders) and order frequency (distinct order count). Segment customers: <code>'Champion'</code> (LTV≥50000 AND orders≥3), <code>'Loyal'</code> (LTV≥20000 OR orders≥3), <code>'Potential'</code> (1–2 orders), <code>'Lost'</code> (no delivered orders). Show count and average LTV per segment.</li>
<li><strong>Product performance vs stock risk:</strong> For each product show: units sold, revenue, stock remaining, and a <code>stock_risk</code> label (<code>'Stockout'</code> if stock=0 and sold>0, <code>'Low'</code> if stock≤5, <code>'Healthy'</code> otherwise). Sort by revenue descending.</li>
<li><strong>Churn prediction signals:</strong> For every customer, compute: days since last order, total orders, total LTV, and a churn risk label (<code>'Active'</code> ≤30 days, <code>'At Risk'</code> 31–90 days, <code>'Churned'</code> >90 days or no orders). Show each customer and their signals.</li>
<li><strong>Month-over-month revenue with gap filling:</strong> Using GENERATE_SERIES, produce a complete monthly revenue report for Jan–May 2024 with: order count, revenue, MoM change (%), and a <code>trend</code> label (<code>'Growth'</code>/>0%, <code>'Decline'</code>/<0%, <code>'Baseline'</code>/NULL for first month).</li>
</ol>`,
      hint:`For (1): CTE to get LTV and order count per customer, then CASE WHEN for segment, then GROUP BY segment. For (2): LEFT JOIN order_items to get sold units (0 if none). For (4): GENERATE_SERIES for the spine, then LAG for prev_rev.`,
      solution:`-- 1. Customer LTV segmentation
WITH customer_stats AS (
    SELECT c.id, c.name,
           COALESCE(SUM(o.total) FILTER (WHERE o.status='delivered'), 0) AS ltv,
           COUNT(DISTINCT o.id)                                           AS orders
    FROM   customers c LEFT JOIN orders o ON c.id = o.customer_id
    GROUP  BY c.id, c.name
)
SELECT CASE
         WHEN ltv >= 50000 AND orders >= 3 THEN 'Champion'
         WHEN ltv >= 20000 OR  orders >= 3 THEN 'Loyal'
         WHEN orders BETWEEN 1 AND 2       THEN 'Potential'
         ELSE 'Lost'
       END AS segment,
       COUNT(*) AS customers,
       ROUND(AVG(ltv), 0) AS avg_ltv
FROM   customer_stats
GROUP  BY segment ORDER BY avg_ltv DESC;

-- 2. Product performance vs stock risk
SELECT p.name, p.category, p.stock,
       COALESCE(SUM(oi.quantity), 0)              AS units_sold,
       COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS revenue,
       CASE
         WHEN p.stock = 0 AND COALESCE(SUM(oi.quantity),0) > 0 THEN 'Stockout'
         WHEN p.stock <= 5 THEN 'Low'
         ELSE 'Healthy'
       END AS stock_risk
FROM   products p
LEFT   JOIN order_items oi ON p.id = oi.product_id
GROUP  BY p.id, p.name, p.category, p.stock
ORDER  BY revenue DESC;

-- 3. Churn prediction signals
WITH customer_signals AS (
    SELECT c.id, c.name,
           MAX(o.order_date)          AS last_order,
           COUNT(DISTINCT o.id)       AS total_orders,
           COALESCE(SUM(o.total), 0)  AS ltv
    FROM   customers c LEFT JOIN orders o ON c.id = o.customer_id
    GROUP  BY c.id, c.name
)
SELECT name,
       last_order,
       CURRENT_DATE - last_order   AS days_since_order,
       total_orders,
       ltv,
       CASE
         WHEN last_order IS NULL              THEN 'Churned'
         WHEN CURRENT_DATE - last_order <= 30 THEN 'Active'
         WHEN CURRENT_DATE - last_order <= 90 THEN 'At Risk'
         ELSE 'Churned'
       END AS churn_risk
FROM   customer_signals ORDER BY days_since_order DESC NULLS FIRST;

-- 4. Gap-filled MoM revenue with trend
WITH spine AS (
    SELECT generate_series('2024-01-01'::DATE,'2024-05-01'::DATE,'1 month'::INTERVAL)::DATE AS month
),
monthly AS (
    SELECT DATE_TRUNC('month',order_date)::DATE AS month,
           COUNT(*) AS orders, SUM(total) AS revenue
    FROM   orders GROUP BY 1
),
combined AS (
    SELECT s.month, COALESCE(m.orders,0) AS orders, COALESCE(m.revenue,0) AS revenue,
           LAG(COALESCE(m.revenue,0)) OVER (ORDER BY s.month) AS prev_rev
    FROM   spine s LEFT JOIN monthly m USING (month)
)
SELECT month, TO_CHAR(month,'Mon YYYY') AS period, orders, revenue,
       CASE WHEN prev_rev IS NULL THEN NULL
            ELSE ROUND((revenue - prev_rev)*100.0/NULLIF(prev_rev,0),1) END AS mom_pct,
       CASE WHEN prev_rev IS NULL               THEN 'Baseline'
            WHEN revenue > prev_rev             THEN 'Growth'
            ELSE                                     'Decline'
       END AS trend
FROM   combined ORDER BY month;` }
  ]
};

})();
