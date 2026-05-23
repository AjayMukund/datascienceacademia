(function(){
'use strict';
window.DSA_LESSON_CONTENT = window.DSA_LESSON_CONTENT || {};
const L = window.DSA_LESSON_CONTENT;

/* ─── WEEK 1 — Excel Fundamentals ───────────────────────────────────────── */

L['excel-w1-l1'] = {
  title: 'Workbooks, Worksheets & Navigation',
  sections: [
    { type: 'text', body: `<h2>Excel as a Data Tool</h2>
<p>Microsoft Excel is the most widely used tool for data analysis in business. Before writing any formula, you need a firm grip on how Excel organises data and how to move around it efficiently.</p>
<h3>Workbook vs Worksheet</h3>
<ul>
  <li><strong>Workbook</strong> — the entire .xlsx file. One file = one workbook.</li>
  <li><strong>Worksheet (Sheet)</strong> — a single grid of rows and columns inside a workbook. A workbook can contain many sheets (tabs at the bottom).</li>
  <li><strong>Cell</strong> — the intersection of a row and column. Address format: column letter + row number, e.g. <code>B4</code>.</li>
  <li><strong>Range</strong> — a rectangular block of cells, e.g. <code>A1:D10</code> (A1 to D10).</li>
</ul>
<h3>Key Navigation Shortcuts</h3>
<table>
  <tr><th>Shortcut</th><th>Action</th></tr>
  <tr><td>Ctrl + Home</td><td>Jump to cell A1</td></tr>
  <tr><td>Ctrl + End</td><td>Jump to last used cell</td></tr>
  <tr><td>Ctrl + Arrow</td><td>Jump to edge of data in that direction</td></tr>
  <tr><td>Ctrl + Shift + Arrow</td><td>Select to edge of data</td></tr>
  <tr><td>Ctrl + G (or F5)</td><td>Go To — navigate to a specific cell or range</td></tr>
  <tr><td>Ctrl + F</td><td>Find</td></tr>
  <tr><td>Ctrl + H</td><td>Find & Replace</td></tr>
  <tr><td>Alt + Enter</td><td>New line within a cell</td></tr>
</table>` },
    { type: 'text', body: `<h3>Freeze Panes</h3>
<p>When working with large tables, freeze the header row so it stays visible as you scroll. Select the row below your headers (usually row 2), then go to <strong>View → Freeze Panes → Freeze Panes</strong>. To freeze both the top row and left column, click cell B2 first.</p>
<h3>Worksheet Management</h3>
<ul>
  <li>Right-click a sheet tab to rename, move, copy, or colour-code it.</li>
  <li>Hold <strong>Ctrl</strong> while clicking multiple sheet tabs to select them together — any edit applies to all selected sheets simultaneously (group editing).</li>
  <li>To reference a cell on another sheet: <code>Sheet2!A1</code> or <code>'Sales Data'!B5</code> (quote the name if it contains spaces).</li>
</ul>` },
    { type: 'tip', body: `Use <strong>Ctrl + Page Up / Page Down</strong> to switch between worksheets. For a workbook with many sheets, right-click the navigation arrows (bottom-left) to get a full sheet list and jump directly.` },
    { type: 'text', body: `<h3>The Name Box</h3>
<p>The Name Box (top-left, showing the current cell address) is more powerful than it looks. Click it and type a cell address or range to navigate there instantly. You can also type a name to jump to a Named Range (covered in Week 3). This is faster than scrolling for known destinations.</p>` },
    { type: 'exercise', title: 'Build a workbook structure', hint: 'Create 3 sheets: Raw Data, Analysis, Dashboard. Rename, colour-code, and freeze headers.', solution: `1. Open a new workbook.
2. Double-click "Sheet1" tab → rename to "Raw Data".
3. Right-click the tab → Tab Color → choose green.
4. Click the + icon to add two more sheets, rename to "Analysis" and "Dashboard".
5. In Raw Data, add headers in row 1: Date, Region, Product, Sales.
6. Select row 2 (click row number 2).
7. View → Freeze Panes → Freeze Panes.
8. Scroll down — row 1 headers stay visible.` }
  ]
};

L['excel-w1-l2'] = {
  title: 'Data Types, Formatting & Input Validation',
  sections: [
    { type: 'text', body: `<h2>Excel Data Types</h2>
<p>Excel stores values as one of four fundamental types:</p>
<ul>
  <li><strong>Numbers</strong> — integers, decimals, percentages, dates (stored as serial numbers), times. Right-aligned by default.</li>
  <li><strong>Text</strong> — any string. Left-aligned by default. Numbers stored as text cannot be summed.</li>
  <li><strong>Logical</strong> — TRUE or FALSE.</li>
  <li><strong>Errors</strong> — #N/A, #VALUE!, #REF!, #DIV/0!, #NAME?, #NUM!, #NULL!.</li>
</ul>
<p>Excel infers type from what you type. Prefix a number with an apostrophe (') to force text storage — useful for account codes like "0042" that must not lose leading zeros.</p>
<h3>Dates in Excel</h3>
<p>Excel stores dates as integers (serial numbers): 1 = 1 January 1900. Today's date is roughly 45,000. This means you can subtract dates to get the number of days between them. Time is stored as a decimal fraction of a day (0.5 = noon). Format the cell to display it as a date — the underlying value is always a number.</p>` },
    { type: 'text', body: `<h3>Number Formatting</h3>
<p>Formatting changes how a value <em>appears</em> without changing the underlying value. Key formats:</p>
<ul>
  <li><strong>Currency</strong> — £1,234.56 or $1,234.56. Use Accounting format for aligned decimal points in financial tables.</li>
  <li><strong>Percentage</strong> — multiplies by 100 and adds %. 0.25 → 25%.</li>
  <li><strong>Custom number format</strong> — e.g. <code>#,##0.0"K"</code> displays 1500 as 1,500.0K. Build formats in Format Cells → Number → Custom.</li>
  <li><strong>Date formats</strong> — <code>dd/mm/yyyy</code>, <code>mmm-yy</code> (Jan-24), <code>dddd</code> (Monday).</li>
</ul>
<p>Shortcut: <strong>Ctrl + 1</strong> opens the Format Cells dialog.</p>` },
    { type: 'tip', body: `<strong>Numbers stored as text</strong> is one of the most common Excel data quality issues. Signs: left-aligned numbers, green triangles in corners, SUM returns 0. Fix: select the column → Data → Text to Columns → Finish (no changes needed) — Excel re-parses the values as numbers.` },
    { type: 'text', body: `<h3>Data Validation</h3>
<p>Data Validation (Data tab → Data Validation) restricts what users can enter into a cell:</p>
<ul>
  <li><strong>Whole Number</strong> — enforce min/max bounds.</li>
  <li><strong>Decimal</strong> — for monetary or measurement inputs.</li>
  <li><strong>List</strong> — creates a drop-down menu. Source can be a comma-separated list ("Jan,Feb,Mar") or a cell range.</li>
  <li><strong>Date / Time</strong> — restrict to valid date ranges.</li>
  <li><strong>Custom formula</strong> — any formula returning TRUE/FALSE. e.g. <code>=LEN(A1)=10</code> enforces exactly 10 characters.</li>
</ul>
<p>Add an <strong>Input Message</strong> (shown when cell is selected) and an <strong>Error Alert</strong> (shown on invalid entry) to guide users.</p>` },
    { type: 'exercise', title: 'Create a validated data entry form', hint: 'Use List validation for Region, Whole Number for Quantity, Date validation for Order Date', solution: `1. In B2: Data → Data Validation → Allow: List → Source: North,South,East,West → OK.
2. In C2: Data → Data Validation → Allow: Whole number → between 1 and 9999 → OK.
3. In D2: Data → Data Validation → Allow: Date → between 01/01/2020 and 31/12/2030 → OK.
4. For each, add an Input Message: "Enter the Region for this order."
5. Try entering an invalid value — the Error Alert should block it.` }
  ]
};

L['excel-w1-l3'] = {
  title: 'Cell References — Relative, Absolute & Mixed',
  sections: [
    { type: 'text', body: `<h2>Why References Matter</h2>
<p>When you copy a formula, Excel adjusts cell references automatically. Understanding <em>how</em> they adjust — and when to lock them — is the foundation of building scalable spreadsheets.</p>
<h3>Relative References</h3>
<p>The default. <code>=A1+B1</code> in cell C1. Copy down to C2 → becomes <code>=A2+B2</code>. The reference adjusts relative to the new position. Use when each row/column should reference its own neighbours.</p>
<h3>Absolute References</h3>
<p>Dollar signs lock row and/or column. <code>=$A$1</code> always refers to A1, regardless of where the formula is copied. Use for constants (tax rates, conversion factors, lookup tables) that should not shift when copied.</p>
<h3>Mixed References</h3>
<ul>
  <li><code>$A1</code> — column locked (A), row adjusts. Copy across → column stays A; copy down → row increments.</li>
  <li><code>A$1</code> — row locked (1), column adjusts. Copy across → column increments; copy down → row stays 1.</li>
</ul>
<p><strong>Shortcut:</strong> Press <strong>F4</strong> while the cursor is on a reference to cycle through all four combinations: A1 → $A$1 → A$1 → $A1 → A1.</p>` },
    { type: 'text', body: `<h3>Building a Multiplication Table</h3>
<p>Mixed references are most clearly demonstrated by a multiplication table. Put 1–10 in row 1 (B1:K1) and column A (A2:A11). In cell B2, enter:</p>
<pre>=B$1 * $A2</pre>
<p>Copy this formula to fill B2:K11. The row is locked for the header row, and the column is locked for the left column — so each cell correctly multiplies its row header by its column header.</p>` },
    { type: 'text', body: `<h3>3D References</h3>
<p>Excel supports references across multiple sheets: <code>=SUM(Sheet1:Sheet3!B5)</code> sums cell B5 on Sheet1, Sheet2, and Sheet3 — a "3D reference." Useful for consolidating monthly sheets into an annual summary.</p>` },
    { type: 'tip', body: `A common mistake: writing <code>=A1*tax_rate</code> where tax_rate is in cell B1. When you copy the formula down, B1 becomes B2, B3... and returns wrong results. Always use <code>=A1*$B$1</code> to lock the tax rate cell. The F4 shortcut makes this instant.` },
    { type: 'exercise', title: 'Commission calculator with a locked rate', hint: 'Put sales values in A2:A11, commission rate in B1 (absolute). Formula in B2: =A2*$B$1', solution: `1. Type "Sales" in A1, "Commission Rate" in B1 header area.
2. In B1 (or a named cell), enter 0.08 (8%).
3. In C1 type "Commission".
4. In C2: =A2*$B$1   (lock B1 with $).
5. Copy C2 down to C11 — each row uses its own Sales but the same locked rate.
6. Change B1 to 0.10 — all commissions update instantly.` }
  ]
};

L['excel-w1-l4'] = {
  title: 'Essential Functions — SUM, COUNT, AVERAGE, IF & IFERROR',
  sections: [
    { type: 'text', body: `<h2>The Core Formula Set</h2>
<p>These five functions cover the majority of everyday data analysis tasks. Master them before moving to advanced functions.</p>
<h3>SUM, COUNT, AVERAGE</h3>
<table>
  <tr><th>Function</th><th>What it does</th><th>Example</th></tr>
  <tr><td>SUM</td><td>Adds all numbers in a range</td><td>=SUM(B2:B100)</td></tr>
  <tr><td>COUNT</td><td>Counts cells containing numbers</td><td>=COUNT(B2:B100)</td></tr>
  <tr><td>COUNTA</td><td>Counts non-empty cells (any type)</td><td>=COUNTA(A2:A100)</td></tr>
  <tr><td>COUNTBLANK</td><td>Counts empty cells</td><td>=COUNTBLANK(A2:A100)</td></tr>
  <tr><td>AVERAGE</td><td>Arithmetic mean of numbers</td><td>=AVERAGE(B2:B100)</td></tr>
  <tr><td>MEDIAN</td><td>Middle value</td><td>=MEDIAN(B2:B100)</td></tr>
  <tr><td>MAX / MIN</td><td>Largest / smallest value</td><td>=MAX(B2:B100)</td></tr>
</table>
<p><strong>AutoSum shortcut:</strong> Select a cell below a column of numbers and press <strong>Alt + =</strong> to insert a SUM formula automatically.</p>` },
    { type: 'text', body: `<h3>IF — Conditional Logic</h3>
<p>Syntax: <code>=IF(condition, value_if_true, value_if_false)</code></p>
<ul>
  <li><code>=IF(A2>1000, "High", "Low")</code> — label sales as High or Low.</li>
  <li><code>=IF(B2="", "Missing", B2)</code> — replace blanks with "Missing".</li>
  <li><code>=IF(C2>=90, "A", IF(C2>=80, "B", IF(C2>=70, "C", "F")))</code> — nested IF for grade bands.</li>
</ul>
<p>Nested IFs become hard to read beyond 2–3 levels. Prefer IFS() (Excel 2019+) for cleaner syntax:</p>
<code>=IFS(C2>=90,"A", C2>=80,"B", C2>=70,"C", TRUE,"F")</code>
<h3>IFERROR</h3>
<p>Syntax: <code>=IFERROR(formula, value_if_error)</code>. Catches any error and replaces it with a friendly value.</p>
<ul>
  <li><code>=IFERROR(VLOOKUP(A2,Table,2,0), "Not Found")</code></li>
  <li><code>=IFERROR(B2/C2, 0)</code> — handle division by zero.</li>
</ul>
<p>Use IFERROR judiciously — it can mask real errors. Only wrap formulas where errors are expected (lookups on partial data, divisions that may be zero).</p>` },
    { type: 'tip', body: `Avoid <code>=IF(A1=TRUE, ...)</code> — this is redundant. <code>=IF(A1, ...)</code> is identical since IF already evaluates the condition as true/false. Similarly, <code>=IF(A1<>"", A1, "blank")</code> can be written more cleanly as <code>=IF(A1="", "blank", A1)</code>.` },
    { type: 'exercise', title: 'Build a sales performance report', hint: 'Use SUM, AVERAGE, IF to label reps, IFERROR for safe division', solution: `Assume: A = Rep Name, B = Target, C = Actual Sales.
D2: =IF(C2>=B2, "Met", "Missed")             — hit/miss label
E2: =IFERROR(C2/B2, 0)                        — attainment % (handle zero target)
Format E2 as Percentage.
F1: Total Sales   → F2: =SUM(C2:C11)
G1: Avg Sales     → G2: =AVERAGE(C2:C11)
H1: Reps who Met  → H2: =COUNTIF(D2:D11,"Met")` }
  ]
};

L['excel-w1-l5'] = {
  title: 'Text Functions — CONCATENATE, LEFT, RIGHT, MID, TRIM & TEXT',
  sections: [
    { type: 'text', body: `<h2>Working with Text in Excel</h2>
<p>Raw data often arrives with messy text: extra spaces, mixed case, values split across columns, or numbers formatted as text. Excel's text functions clean and reshape this data without leaving the spreadsheet.</p>
<h3>Joining Text</h3>
<ul>
  <li><code>=A2 & " " & B2</code> — the ampersand (&) joins text. The simplest approach.</li>
  <li><code>=CONCAT(A2, " ", B2)</code> — same as &, accepts ranges too (Excel 2019+).</li>
  <li><code>=TEXTJOIN(", ", TRUE, A2:A10)</code> — joins a range with a delimiter, skipping blanks (TRUE = ignore empty cells).</li>
</ul>
<h3>Extracting Text</h3>
<table>
  <tr><th>Function</th><th>Usage</th><th>Example (A1 = "James Bond 007")</th></tr>
  <tr><td>LEFT(text, n)</td><td>First n characters</td><td>=LEFT(A1,5) → "James"</td></tr>
  <tr><td>RIGHT(text, n)</td><td>Last n characters</td><td>=RIGHT(A1,3) → "007"</td></tr>
  <tr><td>MID(text, start, n)</td><td>n characters from position start</td><td>=MID(A1,7,4) → "Bond"</td></tr>
  <tr><td>LEN(text)</td><td>Character count</td><td>=LEN(A1) → 14</td></tr>
  <tr><td>FIND(find, within)</td><td>Position of substring (case-sensitive)</td><td>=FIND(" ",A1) → 6</td></tr>
  <tr><td>SEARCH(find, within)</td><td>Position of substring (case-insensitive)</td><td>=SEARCH("bond",A1) → 7</td></tr>
</table>` },
    { type: 'text', body: `<h3>Cleaning Text</h3>
<ul>
  <li><code>=TRIM(A1)</code> — removes leading/trailing spaces and reduces internal multiple spaces to one. Essential for imported data.</li>
  <li><code>=CLEAN(A1)</code> — removes non-printable characters (line breaks, tabs) from imported text.</li>
  <li><code>=UPPER(A1)</code> / <code>=LOWER(A1)</code> / <code>=PROPER(A1)</code> — convert case. PROPER capitalises the first letter of each word.</li>
  <li><code>=SUBSTITUTE(A1, "old", "new")</code> — replaces all occurrences of "old" with "new".</li>
  <li><code>=REPLACE(A1, start, n, "new")</code> — replaces n characters starting at position start.</li>
</ul>
<h3>TEXT Function — Numbers as Formatted Text</h3>
<p><code>=TEXT(value, format_code)</code> converts a number to a text string using a format code:</p>
<ul>
  <li><code>=TEXT(A1, "dd/mm/yyyy")</code> → "23/05/2026"</li>
  <li><code>=TEXT(A1, "#,##0.00")</code> → "1,234.56"</li>
  <li><code>=TEXT(A1, "0%")</code> → "85%"</li>
</ul>
<p>Combine with & to build dynamic strings: <code>="Sales as of " & TEXT(TODAY(),"dd mmm yyyy")</code></p>` },
    { type: 'tip', body: `Use <strong>Flash Fill</strong> (Ctrl+E) for quick text transformations without formulas. Type the desired output for the first 1–2 rows, then press Ctrl+E — Excel infers the pattern and fills the rest of the column automatically. Ideal for splitting full names into first/last, reformatting phone numbers, and similar tasks.` },
    { type: 'exercise', title: 'Clean and split a messy name column', hint: 'Use TRIM, PROPER, FIND, LEFT, MID to separate "  james bond  " into First and Last', solution: `A2 = "  james bond  " (raw imported data)
B2: =PROPER(TRIM(A2))              → "James Bond"
C2: =LEFT(B2, FIND(" ", B2) - 1)  → "James"   (first name)
D2: =MID(B2, FIND(" ", B2) + 1, LEN(B2)) → "Bond"  (last name)
E2: =C2 & "." & D2 & "@company.com"  → "James.Bond@company.com"` }
  ]
};

/* ─── WEEK 2 — Lookup & Data Cleaning ───────────────────────────────────── */

L['excel-w2-l1'] = {
  title: 'Finding & Removing Duplicates',
  sections: [
    { type: 'text', body: `<h2>Duplicate Records in Data</h2>
<p>Duplicates inflate counts, distort sums, and corrupt analysis. Before any analysis, audit your data for duplicate rows — especially after merging data from multiple sources.</p>
<h3>Highlighting Duplicates with Conditional Formatting</h3>
<ol>
  <li>Select the column or range to check.</li>
  <li>Home → Conditional Formatting → Highlight Cell Rules → Duplicate Values.</li>
  <li>Choose a fill colour → OK.</li>
</ol>
<p>This highlights any value appearing more than once. For multi-column duplicate detection (e.g. same customer ID AND date), create a helper column combining both fields: <code>=A2&"|"&B2</code>, then highlight duplicates on that column.</p>` },
    { type: 'text', body: `<h3>Removing Duplicates (Built-in Tool)</h3>
<ol>
  <li>Click anywhere inside your data table.</li>
  <li>Data → Remove Duplicates.</li>
  <li>Select which columns to consider. Unchecked columns are ignored when determining uniqueness.</li>
  <li>Click OK — Excel removes duplicate rows and reports how many were removed.</li>
</ol>
<p><strong>Warning:</strong> Remove Duplicates is destructive and irreversible without Ctrl+Z. Always work on a copy of your data or create a backup before running it.</p>
<h3>Identifying Duplicates with COUNTIF</h3>
<p>A non-destructive approach that flags duplicates without deleting:</p>
<code>=COUNTIF($A$2:$A$100, A2)</code>
<p>Returns 1 for unique values, 2+ for duplicates. Filter for values > 1 to inspect duplicates before deciding which to remove.</p>` },
    { type: 'text', body: `<h3>Extracting Unique Values</h3>
<ul>
  <li><strong>UNIQUE function (Excel 365/2021)</strong>: <code>=UNIQUE(A2:A100)</code> — spills a list of unique values into adjacent cells. Dynamic — updates when source data changes.</li>
  <li><strong>Remove Duplicates on a copy</strong> — copy the column to a new location, then run Remove Duplicates.</li>
  <li><strong>Advanced Filter</strong> — Data → Advanced → Copy to another location → Unique records only.</li>
</ul>` },
    { type: 'tip', body: `Use <code>=UNIQUE(SORT(A2:A100))</code> to get a sorted, deduplicated list in a single formula. Combine with <code>=COUNTA(UNIQUE(A2:A100))</code> to count distinct values — the Excel 365 equivalent of SQL's <code>COUNT(DISTINCT column)</code>.` },
    { type: 'exercise', title: 'Find and flag duplicates in a customer list', hint: 'Use COUNTIF to flag, then filter, then Remove Duplicates on a copy', solution: `1. In B2: =COUNTIF($A$2:$A$100, A2)  — count occurrences of each ID.
2. Filter column B for values > 1 to see all duplicates.
3. Inspect to decide which duplicate rows to keep.
4. Copy A:A to a new sheet, then Data → Remove Duplicates.
5. In a summary cell: =COUNTA(UNIQUE(A2:A100)) for the final distinct count.` }
  ]
};

L['excel-w2-l2'] = {
  title: 'VLOOKUP & HLOOKUP',
  sections: [
    { type: 'text', body: `<h2>VLOOKUP — Vertical Lookup</h2>
<p>VLOOKUP searches the <em>first column</em> of a table for a value and returns a value from a specified column in the same row.</p>
<p><strong>Syntax:</strong> <code>=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])</code></p>
<ul>
  <li><code>lookup_value</code> — the value to search for.</li>
  <li><code>table_array</code> — the entire lookup table range (always lock with $).</li>
  <li><code>col_index_num</code> — which column of the table to return (1 = first column, 2 = second, etc.).</li>
  <li><code>range_lookup</code> — <strong>FALSE</strong> for exact match (almost always what you want); TRUE for approximate match (requires sorted data).</li>
</ul>
<h3>Example</h3>
<p>Product codes in A2:A100. A separate lookup table in E1:G50 has: Code | Product Name | Price. To pull the price for each row:</p>
<code>=VLOOKUP(A2, $E$1:$G$50, 3, FALSE)</code>
<p>Returns the value from the 3rd column (Price) where the first column (Code) matches A2.</p>` },
    { type: 'text', body: `<h3>VLOOKUP Limitations</h3>
<ul>
  <li><strong>Can only look right</strong> — the lookup column must be the first column. Cannot return values from a column to the left.</li>
  <li><strong>Breaks on column insertion</strong> — if you insert a column in the table, the column index number becomes wrong silently.</li>
  <li><strong>Case-insensitive</strong> — "APPLE" matches "apple".</li>
  <li><strong>Returns first match only</strong> — if multiple rows match, VLOOKUP returns the topmost match.</li>
</ul>
<h3>HLOOKUP</h3>
<p>HLOOKUP is the horizontal equivalent — searches the <em>first row</em> of a table and returns from a specified row below. Rare in practice (most tables are vertical). Syntax is identical with <code>row_index_num</code> instead of <code>col_index_num</code>.</p>` },
    { type: 'tip', body: `The single most common VLOOKUP error: forgetting <code>FALSE</code> (exact match). When omitted or set to TRUE, VLOOKUP uses approximate match on sorted data — it silently returns wrong results on unsorted data without any error. Always use <code>FALSE</code> unless you specifically need approximate match (e.g. tax bracket lookups).` },
    { type: 'exercise', title: 'Product price lookup with VLOOKUP', hint: 'Create a product table on a separate sheet, VLOOKUP from the order sheet', solution: `Sheet1 (Orders): A=Order ID, B=Product Code, C=Quantity, D=Unit Price (formula), E=Total
Sheet2 (Products): A=Product Code, B=Product Name, C=Unit Price

In Sheet1 D2:
=IFERROR(VLOOKUP(B2, Sheet2!$A$2:$C$50, 3, FALSE), 0)

In Sheet1 E2:
=C2 * D2

Copy D2:E2 down to all order rows.` }
  ]
};

L['excel-w2-l3'] = {
  title: 'INDEX & MATCH — The Power Combination',
  sections: [
    { type: 'text', body: `<h2>Why INDEX/MATCH?</h2>
<p>INDEX/MATCH is more powerful and flexible than VLOOKUP. It is the preferred lookup combination for professional Excel users.</p>
<h3>INDEX</h3>
<p><code>=INDEX(array, row_num, [col_num])</code> — returns the value at a given position in a range.</p>
<ul>
  <li><code>=INDEX(A1:A10, 3)</code> → returns the 3rd value in the range (A3).</li>
  <li><code>=INDEX(A1:D10, 2, 3)</code> → returns the value at row 2, column 3 of the range (C2).</li>
</ul>
<h3>MATCH</h3>
<p><code>=MATCH(lookup_value, lookup_array, [match_type])</code> — returns the <em>position</em> (row or column number) of a value in a range, not the value itself.</p>
<ul>
  <li><code>=MATCH("Apples", A1:A10, 0)</code> → returns 4 if "Apples" is in A4. Use 0 for exact match.</li>
</ul>
<h3>Combined: INDEX/MATCH</h3>
<p>MATCH finds the row number; INDEX uses that number to return the value from any column:</p>
<code>=INDEX(return_column, MATCH(lookup_value, lookup_column, 0))</code>` },
    { type: 'text', body: `<h3>Advantages Over VLOOKUP</h3>
<ul>
  <li><strong>Look in any direction</strong> — can return values from a column to the LEFT of the lookup column.</li>
  <li><strong>Column-insertion safe</strong> — references specific columns, not position numbers.</li>
  <li><strong>Two-way lookup</strong> — use MATCH for both row and column to create a matrix lookup:
    <code>=INDEX(B2:F10, MATCH(H1, A2:A10, 0), MATCH(H2, B1:F1, 0))</code></li>
  <li><strong>Slightly faster</strong> on very large datasets (INDEX only reads one column).</li>
</ul>
<h3>Looking Left</h3>
<p>Lookup table: B = Product Name, A = Product Code. VLOOKUP can't return Code when you know Name (Code is to the left of Name). INDEX/MATCH handles this naturally:</p>
<code>=INDEX($A$2:$A$50, MATCH("Widget", $B$2:$B$50, 0))</code>` },
    { type: 'tip', body: `When combining INDEX/MATCH with IFERROR, wrap the entire INDEX/MATCH: <code>=IFERROR(INDEX(...), MATCH(...), 0), "Not Found")</code>. Wrapping just INDEX or just MATCH separately won't catch all error cases properly.` },
    { type: 'exercise', title: 'Two-way lookup: find a value by row and column', hint: 'Create a grid with months in row 1 and regions in column A, use INDEX(MATCH,MATCH)', solution: `Data: A1:empty, B1:Jan, C1:Feb, D1:Mar; A2:North, A3:South, A4:East
Values in B2:D4.
Lookup input: G1=Region, G2=Month.

H1: =INDEX($B$2:$D$4, MATCH(G1,$A$2:$A$4,0), MATCH(G2,$B$1:$D$1,0))

Change G1 or G2 — the result updates to the matching cell in the grid.` }
  ]
};

L['excel-w2-l4'] = {
  title: 'XLOOKUP — The Modern Lookup Function',
  sections: [
    { type: 'text', body: `<h2>XLOOKUP (Excel 365 / Excel 2021+)</h2>
<p>XLOOKUP replaces both VLOOKUP and HLOOKUP with a single, more capable function. It is the recommended lookup function for all new work in Excel 365.</p>
<p><strong>Syntax:</strong> <code>=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])</code></p>
<ul>
  <li><code>lookup_value</code> — what to search for.</li>
  <li><code>lookup_array</code> — where to search (one column or one row).</li>
  <li><code>return_array</code> — what to return (can be multiple columns).</li>
  <li><code>if_not_found</code> — optional replacement for #N/A (no need for IFERROR wrapper).</li>
  <li><code>match_mode</code> — 0=exact (default), -1=exact or next smaller, 1=exact or next larger, 2=wildcard.</li>
  <li><code>search_mode</code> — 1=first to last (default), -1=last to first, 2=binary ascending, -2=binary descending.</li>
</ul>` },
    { type: 'text', body: `<h3>XLOOKUP vs VLOOKUP — Key Differences</h3>
<table>
  <tr><th>Feature</th><th>VLOOKUP</th><th>XLOOKUP</th></tr>
  <tr><td>Search direction</td><td>Left column only</td><td>Any column or row</td></tr>
  <tr><td>Return multiple columns</td><td>No (one at a time)</td><td>Yes (returns a range)</td></tr>
  <tr><td>Not found handling</td><td>Needs IFERROR wrapper</td><td>Built-in if_not_found argument</td></tr>
  <tr><td>Default match type</td><td>Approximate (TRUE) — dangerous</td><td>Exact (0) — safe</td></tr>
  <tr><td>Search last match</td><td>No</td><td>Yes (search_mode -1)</td></tr>
  <tr><td>Wildcard matching</td><td>Partial support</td><td>Full support (match_mode 2)</td></tr>
</table>
<h3>Returning Multiple Columns</h3>
<code>=XLOOKUP(A2, $E$2:$E$100, $F$2:$H$100, "Not Found")</code>
<p>This returns three columns (F, G, H) in one formula — spilling the results across adjacent cells. With VLOOKUP you'd need three separate formulas with different column indices.</p>` },
    { type: 'tip', body: `Use XLOOKUP with <code>search_mode = -1</code> (last to first) to find the <em>most recent</em> transaction for a customer in a time-ordered log. <code>=XLOOKUP(customer_id, id_column, date_column, "No record", 0, -1)</code> — something impossible with VLOOKUP without sorting or helper columns.` },
    { type: 'exercise', title: 'Replace a VLOOKUP with XLOOKUP', hint: 'Convert =IFERROR(VLOOKUP(A2,$E$1:$H$50,3,FALSE),"N/A") to XLOOKUP', solution: `Old VLOOKUP:
=IFERROR(VLOOKUP(A2, $E$2:$H$50, 3, FALSE), "N/A")

Equivalent XLOOKUP:
=XLOOKUP(A2, $E$2:$E$50, $G$2:$G$50, "N/A")

Note: XLOOKUP lookup_array is just the key column (E), not the whole table.
The return_array is the specific column to return (G = column 3 of E:H).
The "N/A" handles not-found inline — no IFERROR needed.` }
  ]
};

L['excel-w2-l5'] = {
  title: 'Data Validation & Drop-Down Lists',
  sections: [
    { type: 'text', body: `<h2>Preventing Bad Data at Entry</h2>
<p>Data validation is the first line of defence against data quality issues. It stops bad data from entering the spreadsheet rather than trying to clean it afterwards.</p>
<h3>Types of Validation Rules</h3>
<ul>
  <li><strong>List</strong> — restricts entry to a drop-down list. Source can be a typed list ("Jan,Feb,Mar") or a cell range.</li>
  <li><strong>Whole Number / Decimal</strong> — enforce numeric bounds (e.g. age between 0 and 120).</li>
  <li><strong>Date / Time</strong> — restrict to valid date ranges (e.g. not future dates).</li>
  <li><strong>Text Length</strong> — enforce min/max character counts.</li>
  <li><strong>Custom Formula</strong> — any formula returning TRUE (valid) or FALSE (invalid). Enables complex business rules.</li>
</ul>
<h3>Setting Up a Drop-Down List</h3>
<ol>
  <li>Select the cell or range to validate.</li>
  <li>Data → Data Validation → Allow: List.</li>
  <li>In Source, type values separated by commas OR click the up-arrow and select a range.</li>
  <li>Check "In-cell dropdown" to show the arrow.</li>
</ol>` },
    { type: 'text', body: `<h3>Dynamic Drop-Down Lists</h3>
<p>Point the Source to a named range or an Excel Table column — the list automatically includes new items added to that range. For Excel 365, use <code>=INDIRECT("TableName[ColumnName]")</code> or a named range based on a UNIQUE formula.</p>
<h3>Dependent (Cascading) Drop-Downs</h3>
<p>When the second list depends on the first selection (e.g. Country → City), use INDIRECT with named ranges:</p>
<ol>
  <li>Create named ranges for each country's cities (e.g. a range named "UK" containing London, Manchester, etc.).</li>
  <li>First dropdown: pick a country.</li>
  <li>Second dropdown Source: <code>=INDIRECT(A2)</code> — this points to the named range whose name matches the country in A2.</li>
</ol>
<h3>Circle Invalid Data</h3>
<p>If data already exists and you add validation afterwards, go to Data → Data Validation → Circle Invalid Data. Excel draws red circles around cells that fail the validation rule — a quick audit tool.</p>` },
    { type: 'tip', body: `Always use a <strong>cell range</strong> as the drop-down source (not a typed list), stored in a dedicated "Reference" sheet. This makes maintaining the list easy — add or edit the reference sheet without touching the validation rule itself. Typed lists in the Source field are invisible and hard to update.` },
    { type: 'exercise', title: 'Build a dependent drop-down for Region → Country', hint: 'Create named ranges per region, use INDIRECT in the second dropdown', solution: `1. Create a sheet "Lists".
2. In A1:A3: EMEA, APAC, Americas. Name this range "Regions".
3. In B1:B4: UK, Germany, France, Spain. Name this range "EMEA".
4. In C1:C3: India, Japan, Australia. Name this range "APAC".
5. In D1:D3: USA, Canada, Brazil. Name this range "Americas".
6. In your data sheet, B2: Data Validation → List → Source: =Regions
7. In C2: Data Validation → List → Source: =INDIRECT(B2)
8. Select EMEA in B2 → C2 dropdown shows UK, Germany, France, Spain.` }
  ]
};

/* ─── WEEK 3 — Advanced Formulas ────────────────────────────────────────── */

L['excel-w3-l1'] = {
  title: 'SUMIF, SUMIFS, COUNTIF & COUNTIFS',
  sections: [
    { type: 'text', body: `<h2>Conditional Aggregation</h2>
<p>These are the workhorses of data analysis in Excel — they aggregate (sum, count, average) only the rows matching one or more conditions, equivalent to SQL's <code>WHERE</code> clause.</p>
<h3>SUMIF</h3>
<p><strong>Syntax:</strong> <code>=SUMIF(criteria_range, criteria, [sum_range])</code></p>
<ul>
  <li><code>=SUMIF(A2:A100, "North", C2:C100)</code> — sum column C where column A = "North".</li>
  <li><code>=SUMIF(B2:B100, ">1000", B2:B100)</code> — sum values in B that exceed 1000 (criteria range = sum range).</li>
  <li>Criteria supports wildcards: <code>"Appl*"</code> matches Apple, Application, etc. Use <code>"<>"</code> for "not equal".</li>
</ul>
<h3>SUMIFS — Multiple Conditions</h3>
<p><strong>Syntax:</strong> <code>=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...)</code></p>
<p>Note: sum_range comes FIRST in SUMIFS (unlike SUMIF where it's last).</p>
<code>=SUMIFS(C2:C100, A2:A100, "North", B2:B100, "Q1")</code>
<p>Sums column C where Region = North AND Quarter = Q1.</p>` },
    { type: 'text', body: `<h3>COUNTIF & COUNTIFS</h3>
<p>Same logic as SUMIF/SUMIFS but counts rows instead of summing:</p>
<ul>
  <li><code>=COUNTIF(A2:A100, "North")</code> — count rows where Region = North.</li>
  <li><code>=COUNTIF(B2:B100, ">="&E1)</code> — count rows where B ≥ value in E1 (concatenate with &).</li>
  <li><code>=COUNTIFS(A2:A100, "North", C2:C100, ">1000")</code> — count where Region = North AND Sales > 1000.</li>
</ul>
<h3>AVERAGEIF & AVERAGEIFS</h3>
<p>Same pattern, computes average. <code>=AVERAGEIF(A2:A100, "North", C2:C100)</code> — average sales for the North region.</p>
<h3>Building a Summary Table</h3>
<p>Use these functions to build a cross-tab summary. With regions in rows and quarters in columns, each cell formula:</p>
<code>=SUMIFS($C$2:$C$100, $A$2:$A$100, $F2, $B$2:$B$100, G$1)</code>
<p>Mixed references lock the data ranges absolutely, the row reference for the region, and the column reference for the quarter — copy the formula across the entire table.</p>` },
    { type: 'tip', body: `To use a cell reference as a criteria with a comparison operator, concatenate: <code>=COUNTIF(B2:B100, ">"&E1)</code>. Writing <code>=COUNTIF(B2:B100, ">E1")</code> is wrong — it looks for the text ">E1", not a comparison to the value in cell E1.` },
    { type: 'exercise', title: 'Monthly revenue summary by region', hint: 'Use SUMIFS with a helper row of months and a helper column of regions as mixed-reference criteria', solution: `Data: A=Date, B=Region, C=Revenue.
Summary table: F1=Jan, G1=Feb... ; F2=North, F3=South...

In G2: =SUMIFS($C$2:$C$1000, $B$2:$B$1000, $F2,
              $A$2:$A$1000, ">="&DATE(2024,MATCH(G$1,{"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"},0),1),
              $A$2:$A$1000, "<"&DATE(2024,MATCH(G$1,{"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"},0)+1,1))
Copy across all months and regions.` }
  ]
};

L['excel-w3-l2'] = {
  title: 'Logical Functions — AND, OR, NOT & Nested IF',
  sections: [
    { type: 'text', body: `<h2>Logical Functions</h2>
<p>Logical functions combine multiple conditions and are most useful inside IF statements to build complex business rules.</p>
<h3>AND, OR, NOT</h3>
<ul>
  <li><code>=AND(condition1, condition2, ...)</code> — returns TRUE only if ALL conditions are true.</li>
  <li><code>=OR(condition1, condition2, ...)</code> — returns TRUE if ANY condition is true.</li>
  <li><code>=NOT(condition)</code> — inverts a logical value.</li>
</ul>
<p>Combined with IF:</p>
<ul>
  <li><code>=IF(AND(A2>0, B2="Active"), "Eligible", "Not Eligible")</code></li>
  <li><code>=IF(OR(C2="VIP", D2>10000), "Priority", "Standard")</code></li>
  <li><code>=IF(NOT(ISBLANK(A2)), A2, "Missing")</code></li>
</ul>
<h3>IS Functions</h3>
<ul>
  <li><code>ISBLANK(A1)</code> — TRUE if cell is empty.</li>
  <li><code>ISNUMBER(A1)</code> — TRUE if cell contains a number.</li>
  <li><code>ISTEXT(A1)</code> — TRUE if cell contains text.</li>
  <li><code>ISERROR(A1)</code> — TRUE if cell contains any error.</li>
</ul>` },
    { type: 'text', body: `<h3>Nested IF vs IFS</h3>
<p>Nested IF for grade bands — readable up to about 3 levels:</p>
<code>=IF(A2>=90,"A", IF(A2>=80,"B", IF(A2>=70,"C", "F")))</code>
<p>IFS is cleaner for 4+ conditions (Excel 2019+):</p>
<code>=IFS(A2>=90,"A", A2>=80,"B", A2>=70,"C", A2>=60,"D", TRUE,"F")</code>
<p>The final <code>TRUE,"F"</code> acts as the "else" — it always matches and catches any remaining case.</p>
<h3>SWITCH</h3>
<p><code>=SWITCH(expression, value1, result1, value2, result2, ..., [default])</code> — cleaner than nested IF for exact equality checks:</p>
<code>=SWITCH(A2, "N","North", "S","South", "E","East", "W","West", "Unknown")</code>` },
    { type: 'tip', body: `Avoid deeply nested IFs (4+) — they are hard to read and maintain. Use a lookup table with XLOOKUP/INDEX-MATCH instead. Put the condition values in one column and results in another; this is easier to update and self-documents the logic.` },
    { type: 'exercise', title: 'Commission tier calculator', hint: 'Use IFS to assign commission rates: <50K=5%, 50-100K=8%, 100-200K=12%, >200K=15%', solution: `A2 = Sales amount.
B2 = Commission Rate:
=IFS(A2>=200000, 15%, A2>=100000, 12%, A2>=50000, 8%, TRUE, 5%)

C2 = Commission Amount: =A2*B2

Or with a lookup table:
F1:F4 = 0, 50000, 100000, 200000 (thresholds)
G1:G4 = 5%, 8%, 12%, 15% (rates)
B2: =INDEX($G$1:$G$4, MATCH(A2, $F$1:$F$4, 1))  — approximate match on sorted thresholds` }
  ]
};

L['excel-w3-l3'] = {
  title: 'Date & Time Functions',
  sections: [
    { type: 'text', body: `<h2>Working with Dates</h2>
<p>Excel stores dates as integers and times as decimals. Understanding this unlocks powerful date arithmetic.</p>
<h3>Date Extraction</h3>
<ul>
  <li><code>=YEAR(A1)</code> / <code>=MONTH(A1)</code> / <code>=DAY(A1)</code> — extract year, month, day number.</li>
  <li><code>=WEEKDAY(A1, 2)</code> — day of week (2 = Monday=1 through Sunday=7).</li>
  <li><code>=WEEKNUM(A1, 2)</code> — ISO week number of the year.</li>
  <li><code>=TEXT(A1, "mmm")</code> — abbreviated month name (Jan, Feb…).</li>
  <li><code>=TEXT(A1, "dddd")</code> — full day name (Monday, Tuesday…).</li>
</ul>
<h3>Date Construction & Arithmetic</h3>
<ul>
  <li><code>=DATE(2024, 12, 31)</code> — construct a date from parts.</li>
  <li><code>=TODAY()</code> — today's date (dynamic).</li>
  <li><code>=NOW()</code> — current date and time.</li>
  <li><code>=B1 - A1</code> — days between two dates (result is an integer).</li>
  <li><code>=DATEDIF(A1, B1, "Y")</code> — full years between two dates. Also "M" (months), "D" (days), "YM" (months ignoring years).</li>
  <li><code>=EDATE(A1, 3)</code> — date 3 months from A1 (handles month-end correctly).</li>
  <li><code>=EOMONTH(A1, 0)</code> — last day of A1's month. EOMONTH(A1, 1) = last day of next month.</li>
</ul>` },
    { type: 'text', body: `<h3>Working Days</h3>
<ul>
  <li><code>=NETWORKDAYS(start, end, [holidays])</code> — count working days (Mon–Fri) between two dates, excluding a holiday list.</li>
  <li><code>=WORKDAY(start, days, [holidays])</code> — add N working days to a date.</li>
  <li><code>=NETWORKDAYS.INTL</code> / <code>=WORKDAY.INTL</code> — variants that allow custom weekend definitions (e.g. Fri–Sat weekend).</li>
</ul>
<h3>Grouping Dates for Analysis</h3>
<p>Create helper columns to group transactions by time period:</p>
<ul>
  <li>Month-Year: <code>=TEXT(A1,"mmm-yy")</code> or <code>=DATE(YEAR(A1), MONTH(A1), 1)</code> (formats as date → group by month).</li>
  <li>Quarter: <code>=ROUNDUP(MONTH(A1)/3, 0)</code> → 1, 2, 3, or 4.</li>
  <li>Financial year: <code>=IF(MONTH(A1)>=4, YEAR(A1), YEAR(A1)-1)</code> (April start FY).</li>
</ul>` },
    { type: 'tip', body: `Use <code>=DATE(YEAR(A1), MONTH(A1), 1)</code> (not <code>=TEXT</code>) as the month grouping column when you want to chart or sort by date order. TEXT produces text like "Jan-24" which sorts alphabetically (Aug before Jan). A date value like 01/01/2024 sorts correctly and displays as "Jan-24" via cell formatting.` },
    { type: 'exercise', title: 'Age and tenure calculator', hint: 'Use DATEDIF with "Y" for full years, NETWORKDAYS for working days', solution: `A2 = Date of Birth, B2 = Start Date (employment).
C2 (Age): =DATEDIF(A2, TODAY(), "Y") & " years, " & DATEDIF(A2, TODAY(), "YM") & " months"
D2 (Tenure years): =DATEDIF(B2, TODAY(), "Y")
E2 (Working days employed): =NETWORKDAYS(B2, TODAY())

For a report, add holiday range in a named range "Holidays":
E2: =NETWORKDAYS(B2, TODAY(), Holidays)` }
  ]
};

L['excel-w3-l4'] = {
  title: 'Dynamic Array Functions — FILTER, SORT, UNIQUE & SEQUENCE',
  sections: [
    { type: 'text', body: `<h2>Dynamic Arrays (Excel 365 / Excel 2021+)</h2>
<p>Dynamic array functions return multiple values that automatically <em>spill</em> into adjacent cells — no need to press Ctrl+Shift+Enter or copy formulas down. The result range expands and contracts automatically as data changes.</p>
<h3>FILTER</h3>
<p><code>=FILTER(array, include, [if_empty])</code> — returns only rows where the condition is TRUE.</p>
<ul>
  <li><code>=FILTER(A2:D100, B2:B100="North", "No data")</code> — returns all columns for North rows.</li>
  <li><code>=FILTER(A2:D100, (B2:B100="North")*(C2:C100>1000))</code> — multiple conditions with * (AND) or + (OR).</li>
</ul>
<h3>SORT & SORTBY</h3>
<ul>
  <li><code>=SORT(A2:C100, 2, -1)</code> — sort the range by column 2, descending (-1).</li>
  <li><code>=SORTBY(A2:C100, C2:C100, -1, B2:B100, 1)</code> — sort by C descending then by B ascending.</li>
</ul>
<h3>UNIQUE</h3>
<ul>
  <li><code>=UNIQUE(A2:A100)</code> — list of distinct values.</li>
  <li><code>=UNIQUE(A2:C100, FALSE, FALSE)</code> — unique rows across multiple columns.</li>
</ul>
<h3>SEQUENCE</h3>
<p><code>=SEQUENCE(rows, cols, start, step)</code> — generates a number sequence.</p>
<ul>
  <li><code>=SEQUENCE(10)</code> → 1 through 10 (single column).</li>
  <li><code>=SEQUENCE(1, 12, 1, 1)</code> → 1 through 12 (single row — for month numbers).</li>
</ul>` },
    { type: 'text', body: `<h3>Combining Dynamic Functions</h3>
<p>Dynamic functions compose powerfully:</p>
<code>=SORT(FILTER(A2:D100, B2:B100="North"), 3, -1)</code>
<p>Filter for North, then sort the result by column 3 descending — in one formula.</p>
<code>=UNIQUE(SORT(A2:A100))</code>
<p>Sorted unique list of values.</p>
<code>=FILTER(A2:D100, ISNUMBER(MATCH(A2:A100, G2:G10, 0)))</code>
<p>Filter rows where column A matches any value in a list G2:G10 — equivalent to SQL's <code>WHERE id IN (...)</code>.</p>` },
    { type: 'tip', body: `Dynamic array formulas spill into a range determined by the data size. If adjacent cells are not empty, the formula returns a #SPILL! error. Leave the spill range clear. Reference the entire spill range using the spill operator: if the formula is in F2, then <code>F2#</code> refers to the entire spilled result.` },
    { type: 'exercise', title: 'Build a dynamic filtered top-10 report', hint: 'Combine FILTER, SORT and SEQUENCE to show top 10 rows by sales with no manual updates', solution: `Data in A1:D1000 with headers. D = Sales.
In F1: =SORT(FILTER(A2:D1000, D2:D1000<>""), 4, -1)   — sort all rows by D descending.
In F1 (top 10 only): =TAKE(SORT(FILTER(A2:D1000, D2:D1000>0), 4, -1), 10)
(TAKE is available in Excel 365 to extract the first N rows of a spill.)

Add the headers manually above F1, or:
F1: ={"Name","Region","Product","Sales"; TAKE(SORT(FILTER(A2:D1000,D2:D1000>0),4,-1),10)}` }
  ]
};

L['excel-w3-l5'] = {
  title: 'Named Ranges & Table Structured References',
  sections: [
    { type: 'text', body: `<h2>Named Ranges</h2>
<p>A Named Range assigns a descriptive name to a cell or range, making formulas readable and maintainable. Instead of <code>=SUMIF($A$2:$A$100, "North", $C$2:$C$100)</code>, write <code>=SUMIF(Region, "North", Revenue)</code>.</p>
<h3>Creating Named Ranges</h3>
<ul>
  <li><strong>Name Box</strong> — select a range, click the Name Box (top-left), type the name, press Enter.</li>
  <li><strong>Formulas → Define Name</strong> — for more options (scope, comment, formula-based names).</li>
  <li><strong>Formulas → Create from Selection</strong> — automatically creates names from row/column headers for multiple ranges at once.</li>
</ul>
<p>Manage all names via <strong>Formulas → Name Manager</strong> (Ctrl+F3). Scope: Workbook-scoped names work everywhere; Sheet-scoped names only work on their sheet.</p>
<h3>Dynamic Named Ranges</h3>
<p>A formula-based name that expands automatically. In older Excel (pre-365):</p>
<code>=OFFSET(Sheet1!$A$2, 0, 0, COUNTA(Sheet1!$A:$A)-1, 1)</code>
<p>In Excel 365, just use a Table — it is automatically dynamic and named.</p>` },
    { type: 'text', body: `<h3>Excel Tables (Ctrl+T)</h3>
<p>Converting a range to a Table (Insert → Table, or Ctrl+T) provides:</p>
<ul>
  <li><strong>Auto-expanding ranges</strong> — new rows/columns are automatically included in the table and all formulas referencing it.</li>
  <li><strong>Structured references</strong> — reference by name: <code>SalesTable[Revenue]</code> instead of <code>$C$2:$C$1000</code>.</li>
  <li><strong>Auto-fill formulas</strong> — type a formula in one row of a calculated column; it fills all rows automatically.</li>
  <li><strong>Built-in filtering</strong> — dropdown filters on every header.</li>
  <li><strong>Total Row</strong> — toggle on via Table Design tab for quick aggregations with dropdown function selection.</li>
</ul>
<h3>Structured Reference Syntax</h3>
<ul>
  <li><code>=SalesTable[Revenue]</code> — the entire Revenue column (data rows only, not header).</li>
  <li><code>=SalesTable[[#Headers],[Revenue]]</code> — just the header cell.</li>
  <li><code>=[@Revenue]</code> — the Revenue value in the current row (inside a table formula).</li>
  <li><code>=SUM(SalesTable[Revenue])</code> — sum of the entire Revenue column, always up to date.</li>
</ul>` },
    { type: 'tip', body: `Make it a habit: always convert data ranges to Excel Tables before building analysis on top of them. A Table is the single most impactful Excel habit for data work — it eliminates almost all range-maintenance problems (extending formulas, updating VLOOKUP ranges, chart data sources going stale) automatically.` },
    { type: 'exercise', title: 'Convert a range to a Table and use structured references', hint: 'Ctrl+T on your data, then write SUMIFS using table column names', solution: `1. Click anywhere in your data range → Ctrl+T → check "My table has headers" → OK.
2. Name the table "SalesData" in the Table Design tab.
3. In a summary cell:
   =SUMIFS(SalesData[Revenue], SalesData[Region], "North", SalesData[Month], "Jan")
4. Add a new row to the bottom of the table — the formula automatically includes it.
5. In a calculated column (e.g. SalesData[Margin]):
   =[@Revenue]-[@Cost]   ← fills all rows automatically.` }
  ]
};


/* ─── WEEK 4 — Data Visualisation ───────────────────────────────────────── */

L['excel-w4-l1'] = {
  title: 'Choosing the Right Chart Type',
  sections: [
    { type: 'text', body: `<h2>Chart Selection Framework</h2>
<p>The wrong chart type obscures insight; the right one reveals it instantly. Match the chart to the relationship you want to show.</p>
<table>
  <tr><th>Question</th><th>Best Chart</th><th>Avoid</th></tr>
  <tr><td>How does a value change over time?</td><td>Line chart</td><td>Bar chart (implies discrete categories)</td></tr>
  <tr><td>How do categories compare?</td><td>Bar / Column chart</td><td>Line chart (implies continuous trend)</td></tr>
  <tr><td>What is the part-to-whole breakdown?</td><td>Stacked bar (100%)</td><td>3D Pie (distorts proportions)</td></tr>
  <tr><td>Is there a correlation between two variables?</td><td>Scatter plot (XY)</td><td>Line or bar</td></tr>
  <tr><td>How is data distributed?</td><td>Histogram, Box plot</td><td>Bar chart (shows totals, not distribution)</td></tr>
  <tr><td>What is the geographic pattern?</td><td>Map chart (Excel 365)</td><td>Table</td></tr>
</table>` },
    { type: 'text', body: `<h3>Common Chart Type Details</h3>
<ul>
  <li><strong>Column chart</strong> — vertical bars; best for fewer categories (up to ~10). Use Clustered for comparing groups, Stacked for composition within groups.</li>
  <li><strong>Bar chart</strong> — horizontal bars; better than column when category labels are long or there are many categories.</li>
  <li><strong>Line chart</strong> — connects data points; ideal for continuous time series. Add markers only when emphasising individual data points.</li>
  <li><strong>Scatter plot</strong> — two numeric axes; reveals correlations, clusters, and outliers. Add a trendline (right-click → Add Trendline) to show the regression line.</li>
  <li><strong>Combo chart</strong> — two chart types on one (e.g. column for revenue, line for margin %); use a secondary axis for different scales.</li>
  <li><strong>Waterfall chart</strong> — shows running totals with positive/negative contributions; ideal for P&L or variance analysis.</li>
</ul>` },
    { type: 'tip', body: `Avoid 3D charts in professional reporting. 3D effects distort the visual proportions — a segment at the front of a 3D pie appears larger than it is, misleading the reader. Use 2D charts and rely on labels and colours to convey information clearly.` },
    { type: 'text', body: `<h3>Inserting a Chart</h3>
<ol>
  <li>Select your data (including headers).</li>
  <li>Insert → Charts → select type, or press <strong>Alt+F1</strong> for a default chart.</li>
  <li>Use the Chart Design tab to switch chart type, change data layout, or apply a style.</li>
  <li>Move the chart to a dedicated chart sheet (Chart Design → Move Chart → New sheet) to keep it separate from data.</li>
</ol>` },
    { type: 'exercise', title: 'Choose and justify chart types for 4 datasets', hint: 'Consider: monthly sales trend, regional market share, price vs volume scatter, age distribution histogram', solution: `1. Monthly sales trend → Line chart (continuous time series).
   Justify: time on x-axis implies continuous progression; line emphasises the trend direction.

2. Regional market share → 100% Stacked Bar or Pie (if ≤5 regions).
   Justify: part-to-whole; avoid 3D pie.

3. Price vs Volume → Scatter plot.
   Justify: both axes are numeric; correlation is the story.

4. Age distribution → Histogram (Insert → Charts → Statistical → Histogram).
   Justify: shows frequency across continuous buckets, not discrete categories.` }
  ]
};

L['excel-w4-l2'] = {
  title: 'Building & Formatting Charts',
  sections: [
    { type: 'text', body: `<h2>Chart Elements</h2>
<p>Every chart element can be customised. Click a chart element to select it, then use the Format pane (double-click, or Ctrl+1) to adjust properties.</p>
<ul>
  <li><strong>Chart Title</strong> — click to edit inline. Use a cell-linked title: click the title, type = in the formula bar, then click the cell containing the title text. The title updates dynamically.</li>
  <li><strong>Axes</strong> — set min/max, major/minor units, number format, and orientation (vertical label text for long category names).</li>
  <li><strong>Gridlines</strong> — keep major gridlines, remove minor. Lighter gridlines (grey, thin) are less distracting.</li>
  <li><strong>Data Labels</strong> — add for precise values when the audience needs exact figures; omit when trend is the message.</li>
  <li><strong>Legend</strong> — remove it when you have only one series; position it inside the plot area to save space in multi-series charts.</li>
</ul>` },
    { type: 'text', body: `<h3>Formatting Best Practices</h3>
<ul>
  <li><strong>Colour palette</strong> — use 1–3 accent colours consistently. Avoid Excel's default rainbow palette.</li>
  <li><strong>Highlight one series</strong> — make the key insight series bold/bright; grey out supporting series.</li>
  <li><strong>Font consistency</strong> — use one font family throughout. Calibri or Arial at 10–12pt for labels.</li>
  <li><strong>No chart border</strong> — remove the chart border box for a cleaner look (Format Chart Area → Border → No line).</li>
  <li><strong>Plot area background</strong> — white or transparent; avoid coloured backgrounds.</li>
</ul>
<h3>Adding a Secondary Axis</h3>
<p>For a combo chart (e.g. bar + line) with different scales: right-click the line series → Format Data Series → Secondary Axis. The secondary axis appears on the right. Ensure axis labels are clearly distinguishable (label both axes).</p>` },
    { type: 'tip', body: `Right-click any chart element → "Add Data Labels" to label data points. For a bar chart, position labels <em>inside end</em> (right-click labels → Format Data Labels → Label Position). For a line chart, position labels <em>above</em> and reduce clutter by labelling only the first and last point, or the max point.` },
    { type: 'exercise', title: 'Format a combo chart: Revenue bars + Margin % line', hint: 'Select data → Insert → Combo Chart → choose bar for Revenue, line for Margin%, check secondary axis for Margin', solution: `1. Select Revenue and Margin% columns (with headers and date labels).
2. Insert → Recommended Charts → All Charts → Combo.
3. Set Revenue series: Clustered Column.
4. Set Margin% series: Line, check "Secondary Axis".
5. Click OK. Double-click chart → Format Chart Area → No border.
6. Right-click secondary axis → Format Axis → Axis Options → set min 0, max 0.3 (30%).
7. Click chart title → Formula bar → type = → click cell with title text.
8. Add data labels to the line series only: right-click line → Add Data Labels.` }
  ]
};

L['excel-w4-l3'] = {
  title: 'Conditional Formatting for Data Insight',
  sections: [
    { type: 'text', body: `<h2>Conditional Formatting</h2>
<p>Conditional formatting applies visual styling (fill colour, font colour, icon, data bar) automatically based on cell values or formulas — turning a table of numbers into a visual heatmap that communicates patterns instantly.</p>
<h3>Built-in Rules</h3>
<ul>
  <li><strong>Highlight Cell Rules</strong> — greater than, less than, equal to, between, text contains, duplicate values.</li>
  <li><strong>Top/Bottom Rules</strong> — top 10 items, top 10%, bottom 10, above average.</li>
  <li><strong>Data Bars</strong> — proportional bars inside cells showing relative magnitude. Good for single-column rankings.</li>
  <li><strong>Colour Scales</strong> — gradient from one colour to another based on value. Red-Yellow-Green (traffic light) is common for KPIs.</li>
  <li><strong>Icon Sets</strong> — arrows, traffic lights, stars, flags. Communicate direction and status at a glance.</li>
</ul>
<p>Access all rules via: Home → Conditional Formatting.</p>` },
    { type: 'text', body: `<h3>Custom Formula Rules</h3>
<p>The most powerful feature. Write any formula that returns TRUE/FALSE — TRUE triggers the formatting.</p>
<p>Apply to range A2:D100. Formula: <code>=$C2<0</code></p>
<ul>
  <li>The $ locks the column (C), allowing the row to adjust across the range.</li>
  <li>Any row where column C is negative → entire row highlighted.</li>
</ul>
<p>Common patterns:</p>
<ul>
  <li><strong>Highlight entire row</strong> on a condition: select the full data range, rule = <code>=$B2="Overdue"</code></li>
  <li><strong>Alternate row shading</strong>: rule = <code>=MOD(ROW(),2)=0</code></li>
  <li><strong>Duplicate rows</strong>: rule = <code>=COUNTIFS($A$2:$A$100,$A2,$B$2:$B$100,$B2)>1</code></li>
  <li><strong>Today's date</strong>: rule = <code>=$A2=TODAY()</code></li>
</ul>` },
    { type: 'tip', body: `Conditional formatting rules stack — multiple rules apply in priority order. Manage rule priority and resolve conflicts via Home → Conditional Formatting → Manage Rules. Check "Stop If True" to prevent lower-priority rules from overriding higher-priority formatting (e.g. if a row is highlighted red for "critical", stop before applying the alternate-row grey).` },
    { type: 'exercise', title: 'Build a traffic light KPI dashboard', hint: 'Use Colour Scale on metric columns, Icon Set (traffic light) for status column', solution: `1. Select the KPI value column (e.g. C2:C20).
2. Home → CF → Colour Scales → Red-Yellow-Green (3-colour scale).
   Low values = red, mid = yellow, high = green.

3. Add a "Status" column with formula:
   D2: =IF(C2>=B2*1.1, "Above", IF(C2>=B2*0.9, "On Track", "Below"))

4. Select D2:D20 → CF → Icon Sets → 3 Traffic Lights.
   Edit Rule → set "Above" = green, "On Track" = yellow, "Below" = red.
   Use "Format all cells based on their values" → Type: Text, Value: Above/On Track/Below.` }
  ]
};

L['excel-w4-l4'] = {
  title: 'Sparklines & In-Cell Mini-Charts',
  sections: [
    { type: 'text', body: `<h2>Sparklines</h2>
<p>Sparklines are tiny, word-sized charts embedded directly in a single cell. They show the trend or pattern of a row of data without taking up the space of a full chart — ideal for dashboards and comparison tables where you want to show the shape of each entity's data at a glance.</p>
<h3>Types of Sparklines</h3>
<ul>
  <li><strong>Line</strong> — shows trend over time; best for time series.</li>
  <li><strong>Column</strong> — small bar chart; good for discrete periods with positive and negative values.</li>
  <li><strong>Win/Loss</strong> — each period is either a win (up) or loss (down); binary representation. Good for stock up/down, win/loss records.</li>
</ul>
<h3>Inserting Sparklines</h3>
<ol>
  <li>Select the cell where you want the sparkline (e.g. N2 for a row of monthly data in B2:M2).</li>
  <li>Insert → Sparklines → Line (or Column, Win/Loss).</li>
  <li>Data Range: B2:M2. Location Range: N2 (already selected).</li>
  <li>To create sparklines for multiple rows at once, select N2:N20 and set Data Range to B2:M20.</li>
</ol>` },
    { type: 'text', body: `<h3>Sparkline Formatting (Sparkline tab)</h3>
<ul>
  <li><strong>Show Markers</strong> — toggle high point, low point, first point, last point, negative points, all markers.</li>
  <li><strong>Axis Options</strong> — by default, each sparkline scales independently (good for showing shape). Set "Same for all sparklines" to enable cross-row comparison by magnitude.</li>
  <li><strong>Style</strong> — change line weight, colour, marker colour.</li>
  <li><strong>Edit Data</strong> — change the source range or handle hidden/empty cells.</li>
</ul>
<h3>Sparkline vs Chart</h3>
<ul>
  <li>Sparklines: no axes, no labels, minimal; purpose is pattern recognition.</li>
  <li>Charts: full labelling, annotations, multiple series; purpose is detailed analysis.</li>
</ul>
<p>Use sparklines in summary tables where space is tight. Use full charts for standalone analysis slides or sections of a dashboard where the chart is the focal point.</p>` },
    { type: 'tip', body: `Set the sparkline axis to "Same for All Sparklines" only when comparing absolute magnitudes matters (e.g. sales volume across products). Leave it independent when each product operates at a different scale and you want to show the <em>trend shape</em> rather than volume comparison — otherwise all low-volume items appear as flat lines next to high-volume items.` },
    { type: 'exercise', title: 'Add sparklines to a monthly performance table', hint: 'Insert Line sparklines for each row, mark high and low points, set consistent axis', solution: `1. Data: Products in A2:A10, monthly sales in B2:M10.
2. Select N2:N10.
3. Insert → Sparklines → Line.
4. Data Range: B2:M10, Location Range: N2:N10 → OK.
5. Sparkline tab → Show: check High Point (orange) and Low Point (red).
6. Sparkline tab → Axis → Vertical Axis Minimum Value → Same for All Sparklines.
   This allows cross-product magnitude comparison.
7. Add a header "Trend" above N1.` }
  ]
};

L['excel-w4-l5'] = {
  title: 'Dashboard Design Principles',
  sections: [
    { type: 'text', body: `<h2>What Makes a Good Dashboard?</h2>
<p>A dashboard presents key information at a glance, enabling decisions without requiring the viewer to interpret raw data. Poor dashboards are cluttered, require scrolling, mix too many chart types, and bury the key message.</p>
<h3>The One-Screen Rule</h3>
<p>Everything critical should be visible without scrolling. Use a fixed window size (e.g. 1920×1080 or 1366×768) as your canvas. In Excel: View → Page Layout lets you see how content fits. Set row heights and column widths to fit the target screen.</p>
<h3>Layout Hierarchy</h3>
<ol>
  <li><strong>Top strip</strong> — title, date range, last updated timestamp, key KPI summary boxes.</li>
  <li><strong>Main area</strong> — the primary chart(s) that answer the main business question.</li>
  <li><strong>Secondary area</strong> — supporting detail tables, sparklines, or smaller charts.</li>
  <li><strong>Controls</strong> — slicers, dropdowns for filtering (Week 5).</li>
</ol>` },
    { type: 'text', body: `<h3>KPI Summary Cards</h3>
<p>Large-number KPI boxes (e.g. "£2.3M Total Revenue") grab attention immediately. Create them with:</p>
<ul>
  <li>A large font formula cell (36pt+): <code>=TEXT(SUM(Table[Revenue]),"£#,##0.0,,")&"M"</code></li>
  <li>A label below in smaller text.</li>
  <li>A delta vs. prior period: <code>=TEXT(B2-C2,"▲#,##0;▼#,##0")</code></li>
  <li>Colour the delta cell green/red with conditional formatting.</li>
</ul>
<h3>Design Rules</h3>
<ul>
  <li><strong>Max 3 colours</strong> — one primary, one accent, one alert (red).</li>
  <li><strong>Remove chart junk</strong> — no 3D, no unnecessary gridlines, no decorative borders.</li>
  <li><strong>Consistent alignment</strong> — all charts on a grid. Use Alt+drag to snap elements to cell borders.</li>
  <li><strong>Protect the dashboard sheet</strong> — lock charts and formula cells; only leave filter inputs editable (Review → Protect Sheet).</li>
  <li><strong>Separate data from presentation</strong> — keep raw data on a hidden sheet; dashboard only shows calculated outputs.</li>
</ul>` },
    { type: 'tip', body: `Use <strong>camera tool</strong> (not widely known): add it to the Quick Access Toolbar. Select a range → click Camera → click elsewhere on the sheet. A live linked picture of that range appears. Paste it on your dashboard sheet — it updates automatically when the source data changes. This lets you place a "snapshot" of a table or chart anywhere on the dashboard without the constraints of chart placement.` },
    { type: 'exercise', title: 'Build a 1-screen sales dashboard skeleton', hint: 'Create KPI cards at top, one main line chart, one bar chart, add slicers (Week 5)', solution: `Structure:
Row 1–3: Title bar (company name, date range, "Last updated: "&TEXT(TODAY(),"dd mmm yyyy"))
Row 4–7: 3 KPI boxes — Total Revenue, Units Sold, Avg Order Value
  Each: =TEXT(formula,"£#,##0.0,,")&"M" in 36pt, label in 10pt below
Row 8–22: Main area
  Left (cols A–H): Line chart — monthly revenue trend (link to Pivot data)
  Right (cols I–P): Bar chart — top 10 products by revenue
Row 23–35: Secondary
  Left: Summary table (SUMIFS by region)
  Right: Sparklines table (12 months per product)
Colour scheme: dark navy header, white background, teal accent for charts.` }
  ]
};

/* ─── WEEK 5 — Pivot Tables & Pivot Charts ───────────────────────────────── */

L['excel-w5-l1'] = {
  title: 'Pivot Tables — Basics & Layout',
  sections: [
    { type: 'text', body: `<h2>What is a Pivot Table?</h2>
<p>A Pivot Table summarises large datasets interactively — grouping, aggregating, and cross-tabulating data without writing a single formula. It is the most powerful native analysis tool in Excel.</p>
<h3>Creating a Pivot Table</h3>
<ol>
  <li>Click anywhere inside your data table.</li>
  <li>Insert → PivotTable → choose "New Worksheet" or specify a location → OK.</li>
  <li>The PivotTable Field List pane appears on the right.</li>
</ol>
<h3>The Four Areas</h3>
<ul>
  <li><strong>Rows</strong> — field values become row labels (left side of the table).</li>
  <li><strong>Columns</strong> — field values become column headers (top of the table).</li>
  <li><strong>Values</strong> — the numbers that are aggregated (SUM, COUNT, AVERAGE, etc.).</li>
  <li><strong>Filters</strong> — fields you can filter the entire table by, without showing them in the table structure.</li>
</ul>
<p>Drag fields between areas and watch the table update instantly.</p>` },
    { type: 'text', body: `<h3>Value Field Settings</h3>
<p>Right-click any value in the Values area → Value Field Settings to change the aggregation:</p>
<ul>
  <li>Sum (default for numbers)</li>
  <li>Count (default if field contains any text/blanks)</li>
  <li>Average, Max, Min, Standard Deviation, Variance</li>
  <li>"Show Values As" — % of Grand Total, % of Row Total, Running Total, Rank</li>
</ul>
<h3>Refreshing Data</h3>
<p>Pivot Tables do NOT update automatically when source data changes. Right-click the Pivot Table → Refresh (or Alt+F5). To auto-refresh on file open: PivotTable Analyze → Options → Data → check "Refresh data when opening the file".</p>
<p>If you add rows beyond the original source range, you may need to change the data source: PivotTable Analyze → Change Data Source. This is eliminated if your source is an Excel Table — Table ranges expand automatically and Pivot Tables based on them always include new rows after a Refresh.</p>` },
    { type: 'tip', body: `Always base Pivot Tables on an <strong>Excel Table</strong> (Ctrl+T on your data first). When new rows are added to the Table, a single Refresh (Alt+F5) on the Pivot Table picks them up — no need to update the data source range. This is the single biggest time-saver for recurring reporting.` },
    { type: 'exercise', title: 'Create a regional sales summary Pivot Table', hint: 'Fields: Region to Rows, Month to Columns, Revenue to Values (Sum), Product to Filters', solution: `1. Click inside your SalesData Table → Insert → PivotTable → New Worksheet → OK.
2. Drag "Region" to Rows.
3. Drag "Month" to Columns.
4. Drag "Revenue" to Values (verify it shows Sum, not Count — if Count, right-click → Value Field Settings → Sum).
5. Drag "Product" to Filters.
6. The Filter dropdown at the top lets you show all products or one at a time.
7. Right-click any Revenue value → Number Format → Currency with 2 decimal places.` }
  ]
};

L['excel-w5-l2'] = {
  title: 'Grouping, Sorting & Filtering in Pivot Tables',
  sections: [
    { type: 'text', body: `<h2>Grouping in Pivot Tables</h2>
<p>Grouping consolidates row or column labels into meaningful buckets without modifying the source data.</p>
<h3>Grouping Dates</h3>
<p>Right-click any date value in a Pivot Table row/column → Group → select grouping levels (Days, Months, Quarters, Years). You can select multiple levels — e.g. Months + Years creates a hierarchy.</p>
<p><strong>Requirement:</strong> The date column must contain real Excel dates (not text). If grouping is greyed out, the dates are stored as text — fix the source data first (Text to Columns or DATEVALUE formula).</p>
<h3>Grouping Numbers</h3>
<p>Group a numeric field into bands: right-click a number → Group → set Starting at, Ending at, and By (step size). Example: age groups in bins of 10 (0–9, 10–19, etc.).</p>
<h3>Grouping Items Manually</h3>
<p>Select specific row items (Ctrl+click) → right-click → Group. Rename the group. Useful for creating custom hierarchies not in the source data (e.g. grouping cities into custom regions).</p>` },
    { type: 'text', body: `<h3>Sorting Pivot Tables</h3>
<ul>
  <li><strong>By label</strong> — click the Row/Column label dropdown → Sort A to Z.</li>
  <li><strong>By value</strong> — right-click a value cell in the body → Sort → Largest to Smallest. This ranks rows by their total.</li>
  <li><strong>Custom order</strong> — drag row labels manually into the desired sequence.</li>
</ul>
<h3>Filtering Pivot Tables</h3>
<ul>
  <li><strong>Row/Column dropdown</strong> — click the label dropdown to show/hide specific items.</li>
  <li><strong>Value filters</strong> — show only rows where the value is greater than X, in the top N, etc. (Row dropdown → Value Filters).</li>
  <li><strong>Label filters</strong> — show rows where the label contains, starts with, etc.</li>
  <li><strong>Slicers</strong> — visual filter buttons (covered in Lesson 4).</li>
</ul>` },
    { type: 'tip', body: `To show a Pivot Table ranked by revenue with the top products first, right-click any value in the revenue column → Sort → Largest to Smallest. This is more reliable than sorting the source data and gives you an "always up-to-date" ranking that updates automatically when you Refresh.` },
    { type: 'exercise', title: 'Group dates by Quarter and filter top 5 products', hint: 'Group date field → Quarter, add Value Filter → Top 10 (set to Top 5) on the product row', solution: `1. In your Pivot Table, move "Date" to Columns.
2. Right-click any date value → Group → select Quarters and Years → OK.
3. Move "Product" to Rows.
4. Click the Row Labels dropdown → Value Filters → Top 10.
5. Set: Top 5 Items by Sum of Revenue → OK.
6. The table now shows only the top 5 products, broken down by quarter.` }
  ]
};

L['excel-w5-l3'] = {
  title: 'Calculated Fields & Calculated Items',
  sections: [
    { type: 'text', body: `<h2>Extending Pivot Tables with Calculations</h2>
<p>Calculated Fields and Items add custom computation to a Pivot Table without changing the source data.</p>
<h3>Calculated Field</h3>
<p>A new virtual measure column defined by a formula over existing fields. Example: source data has Revenue and Cost — add a Margin% field.</p>
<ol>
  <li>Click anywhere in the Pivot Table.</li>
  <li>PivotTable Analyze → Fields, Items & Sets → Calculated Field.</li>
  <li>Name: "Margin %"</li>
  <li>Formula: <code>= (Revenue - Cost) / Revenue</code></li>
  <li>Click Add → OK.</li>
</ol>
<p>The new field appears in the Values area and Field List. Format it as Percentage.</p>
<p><strong>Important:</strong> Calculated Fields always use SUM of the field, regardless of other aggregation settings. <code>= Revenue / Cost</code> means "SUM(Revenue) / SUM(Cost)" — not an average of row-level ratios. Keep this in mind when building ratio metrics.</p>` },
    { type: 'text', body: `<h3>Calculated Item</h3>
<p>A new item added to a Row or Column field, computed from other items in that field. Less common than Calculated Fields.</p>
<p>Example: add a "North + South" combined region item to the Region field:</p>
<ol>
  <li>Click a Region cell in the Pivot Table.</li>
  <li>PivotTable Analyze → Fields, Items & Sets → Calculated Item.</li>
  <li>Name: "North+South". Formula: <code>= North + South</code> → Add → OK.</li>
</ol>
<p><strong>Warning:</strong> Using Calculated Items alongside subtotals can cause double-counting. Use carefully and verify totals.</p>
<h3>Show Values As</h3>
<p>A simpler alternative to Calculated Fields for common derivations — right-click a value → Show Values As:</p>
<ul>
  <li>% of Grand Total, % of Row Total, % of Column Total</li>
  <li>% Difference From (previous period — great for MoM or YoY change)</li>
  <li>Running Total In (cumulative sum)</li>
  <li>Rank Largest to Smallest</li>
</ul>` },
    { type: 'tip', body: `Use "Show Values As → % Difference From" to create an instant Month-over-Month (MoM) change report. Set Base Field: Month, Base Item: (previous). Each month now shows the % change from the previous month — no formulas required outside the Pivot Table.` },
    { type: 'exercise', title: 'Add a profit margin and YoY growth column', hint: 'Calculated Field for margin; Show Values As % Difference From for YoY growth', solution: `1. Calculated Field "Gross Margin":
   PivotTable Analyze → Calculated Field → Name: Gross Margin
   Formula: = (Revenue - COGS) / Revenue → Add → OK. Format as %.

2. Add Revenue to Values a second time.
3. Right-click the second Revenue → Show Values As → % Difference From.
4. Base Field: Year, Base Item: (previous).
5. Rename the column header to "YoY Growth" (click the field header in the Values area).` }
  ]
};

L['excel-w5-l4'] = {
  title: 'Slicers & Timeline Filters',
  sections: [
    { type: 'text', body: `<h2>Interactive Filtering with Slicers</h2>
<p>Slicers are visual, button-based filters that make Pivot Tables (and Excel Tables) user-friendly. Each filter value is a clickable button — no dropdowns to hunt through.</p>
<h3>Inserting a Slicer</h3>
<ol>
  <li>Click inside the Pivot Table.</li>
  <li>PivotTable Analyze → Insert Slicer.</li>
  <li>Check the fields to create slicers for (e.g. Region, Product Category) → OK.</li>
  <li>A floating slicer panel appears. Resize and position it on your dashboard.</li>
</ol>
<h3>Using Slicers</h3>
<ul>
  <li>Click a button to filter by that value.</li>
  <li>Ctrl+click to select multiple values.</li>
  <li>Click the X (Clear Filter) button in the top-right of the slicer to reset.</li>
</ul>
<h3>Connecting One Slicer to Multiple Pivot Tables</h3>
<ol>
  <li>Right-click the slicer → Report Connections.</li>
  <li>Check all Pivot Tables this slicer should control → OK.</li>
</ol>
<p>Now one click filters all connected Pivot Tables and their Pivot Charts simultaneously — the foundation of an interactive dashboard.</p>` },
    { type: 'text', body: `<h3>Timeline Filter</h3>
<p>The Timeline is a date-specific slicer. It shows a visual bar of time periods and lets users drag to select a date range.</p>
<ol>
  <li>PivotTable Analyze → Insert Timeline → select the date field → OK.</li>
  <li>Use the period selector (Days / Months / Quarters / Years) in the top-right of the timeline.</li>
  <li>Drag the selection handles to define the date range.</li>
</ol>
<h3>Slicer Formatting</h3>
<p>Slicer tab → Slicer Styles to match your colour scheme. Set Columns to 2 or 3 to arrange buttons in a grid rather than a long list. Resize buttons (Slicer tab → Buttons → Height/Width) for a compact, professional layout.</p>` },
    { type: 'tip', body: `Format slicers to match your dashboard colour scheme and remove their title bar if the context is clear (right-click slicer → Slicer Settings → uncheck "Display header"). A clean, label-free slicer with coloured buttons looks far more professional than the default grey Excel slicer.` },
    { type: 'exercise', title: 'Connect slicers to two Pivot Tables on a dashboard', hint: 'Create two PTs, insert a Region slicer, right-click → Report Connections → check both PTs', solution: `1. Create Pivot Table 1 on the Dashboard sheet (monthly revenue by region).
2. Create Pivot Table 2 on the same sheet (top products by region).
3. Click anywhere in Pivot Table 1 → Insert Slicer → Region → OK.
4. Position the slicer between the two tables.
5. Right-click the slicer → Report Connections → check both Pivot Table 1 and 2 → OK.
6. Click "North" in the slicer — both tables filter to North data simultaneously.
7. Slicer tab → set Columns: 2 to display in a 2-column grid.` }
  ]
};

L['excel-w5-l5'] = {
  title: 'Pivot Charts',
  sections: [
    { type: 'text', body: `<h2>Pivot Charts</h2>
<p>A Pivot Chart is a chart directly connected to a Pivot Table. When the Pivot Table is filtered, grouped, or refreshed, the chart updates automatically. Slicers control both simultaneously.</p>
<h3>Creating a Pivot Chart</h3>
<ol>
  <li>Click inside a Pivot Table.</li>
  <li>PivotTable Analyze → PivotChart → select chart type → OK.</li>
</ol>
<p>Or: Insert → PivotChart (creates a new Pivot Table and Chart together).</p>
<h3>Differences from Regular Charts</h3>
<ul>
  <li>Pivot Charts have <strong>Field Buttons</strong> on the chart itself (the filter dropdowns for each field). These can be hidden: PivotChart Analyze → Field Buttons → Hide All.</li>
  <li>You cannot directly select individual data points to reorder them — change the Pivot Table structure instead.</li>
  <li>Pivot Charts update on Refresh; regular charts only update when the source data range changes.</li>
</ul>` },
    { type: 'text', body: `<h3>Best Practices for Pivot Charts</h3>
<ul>
  <li><strong>Line chart for trends</strong> — put dates/months in the Pivot Table Columns area; the chart x-axis shows time.</li>
  <li><strong>Bar chart for rankings</strong> — put categories in Rows, sort by value descending in the Pivot Table; the chart reflects this order.</li>
  <li><strong>Hide field buttons</strong> — they clutter professional dashboards. Use slicers for filtering instead.</li>
  <li><strong>Move chart to dashboard sheet</strong> — cut and paste the Pivot Chart from its default position to the dashboard sheet layout.</li>
</ul>
<h3>Dynamic Chart Title with Slicer Selection</h3>
<p>Link the chart title to a cell that reads the current slicer filter state. Use a formula in a cell:
<code>="Revenue by Region: "&IF(ISBLANK(A1),"All",A1)</code>
Then link the chart title to that cell (click title → formula bar → =CellRef).</p>` },
    { type: 'tip', body: `To create a Pivot Chart on a separate "Chart" sheet for a clean presentation: right-click the Pivot Chart → Move Chart → New Sheet. This makes the chart fullscreen. You can then paste a picture link (<strong>Alt+E+S+P</strong>) of this chart onto the dashboard sheet — it stays live but doesn't interfere with dashboard layout.` },
    { type: 'exercise', title: 'Build a connected dashboard: Pivot Table + Pivot Chart + Slicer', hint: 'One slicer controlling both the table and chart, timeline for date range, hidden field buttons', solution: `1. Create a Pivot Table: Rows=Product, Values=Sum of Revenue.
2. PivotTable Analyze → PivotChart → Column chart → OK.
3. Position chart to the right of the Pivot Table.
4. Insert Slicer for Region (connected to the Pivot Table).
5. Insert Timeline for Date.
6. PivotChart Analyze → Field Buttons → Hide All.
7. Format chart: remove border, set colours, add data labels.
8. Click "South" in the slicer → table and chart both filter to South products.` }
  ]
};

/* ─── WEEK 6 — Automation & Capstone ────────────────────────────────────── */

L['excel-w6-l1'] = {
  title: 'Excel Tables — Structured Data Management',
  sections: [
    { type: 'text', body: `<h2>Excel Tables as a Data Foundation</h2>
<p>An Excel Table (created with Ctrl+T) is not just formatting — it is a structural change to how Excel treats your data. Tables are the recommended way to store any data you will analyse, report on, or share.</p>
<h3>What Tables Give You Automatically</h3>
<ul>
  <li><strong>Dynamic range</strong> — expand automatically; formulas, Pivot Tables, and charts based on the table always include new rows.</li>
  <li><strong>Structured references</strong> — <code>Table1[Column]</code> instead of <code>$B$2:$B$1000</code>.</li>
  <li><strong>Auto-fill formulas</strong> — type a formula in any cell of a column → fills the entire column instantly.</li>
  <li><strong>Built-in filtering</strong> — dropdown arrows on every header, no setup required.</li>
  <li><strong>Total row</strong> — toggle with Ctrl+Shift+T; select SUM, COUNT, AVERAGE per column from a dropdown.</li>
  <li><strong>Consistent formatting</strong> — banded rows update automatically as data grows.</li>
</ul>` },
    { type: 'text', body: `<h3>Working with Tables Effectively</h3>
<ul>
  <li><strong>Name your table</strong> — Table Design tab → Table Name. "SalesData" beats "Table3".</li>
  <li><strong>Use structured references in formulas</strong> — outside the table, use <code>=SUM(SalesData[Revenue])</code>; inside the table, use <code>=[@Revenue]*[@Quantity]</code>.</li>
  <li><strong>Remove duplicates</strong> — Table Design → Remove Duplicates.</li>
  <li><strong>Export to range</strong> — Table Design → Convert to Range (removes table structure while keeping data).</li>
</ul>
<h3>Tables and Power Query</h3>
<p>Power Query (covered in depth in future courses) automatically detects Excel Tables as data sources. When you "load to table" from Power Query, the output is always an Excel Table — creating a fully refreshable data pipeline.</p>
<h3>Tables and Pivot Tables</h3>
<p>A Pivot Table sourced from an Excel Table picks up new rows with a single Refresh (Alt+F5). This is the key to low-maintenance recurring reporting — update your data table, refresh the Pivot Table, done.</p>` },
    { type: 'tip', body: `Use <code>Ctrl+T</code> on every dataset as your first action, before writing any formulas or creating any charts. The 2-second investment eliminates hours of "fix the range" maintenance work later. Treat this as a non-negotiable habit.` },
    { type: 'exercise', title: 'Convert a range to a table and build structured formulas', hint: 'Ctrl+T → name it → create calculated columns with @ references → use table name in SUMIFS', solution: `1. Select A1:E1000 → Ctrl+T → My table has headers → OK.
2. Table Design → Table Name: SalesData.
3. Click the header of column F → type "Margin".
4. In F2: =[@Revenue]-[@Cost]   (auto-fills all rows).
5. Click the header of column G → type "Margin %".
6. In G2: =[@Margin]/[@Revenue]  → format as %.
7. Toggle Total Row (Ctrl+Shift+T):
   Revenue column → Sum; Margin% column → Average.
8. In a cell outside the table:
   =SUMIFS(SalesData[Revenue], SalesData[Region], "North")` }
  ]
};

L['excel-w6-l2'] = {
  title: 'Recording & Running Macros',
  sections: [
    { type: 'text', body: `<h2>What is a Macro?</h2>
<p>A macro is a recorded or written sequence of Excel actions that can be replayed with one click. Macros automate repetitive tasks — formatting reports, applying filters, refreshing Pivot Tables, copying data between sheets — saving minutes to hours per week.</p>
<h3>Enabling the Developer Tab</h3>
<p>File → Options → Customise Ribbon → check "Developer" → OK. The Developer tab gives access to Record Macro, Macros list, Visual Basic Editor, and Form Controls.</p>
<h3>Recording a Macro</h3>
<ol>
  <li>Developer → Record Macro.</li>
  <li>Give it a name (no spaces), optionally a shortcut key (e.g. Ctrl+Shift+F), and choose where to store it (This Workbook for portability).</li>
  <li>Perform the actions you want to automate.</li>
  <li>Developer → Stop Recording.</li>
</ol>
<p>Run it: Developer → Macros → select → Run, or use the shortcut key.</p>` },
    { type: 'text', body: `<h3>Absolute vs Relative Recording</h3>
<p>Before recording, choose your reference mode:</p>
<ul>
  <li><strong>Absolute</strong> (default) — actions record against fixed cell addresses. Running the macro always acts on the same cells. Use for formatting a specific fixed area.</li>
  <li><strong>Relative</strong> (Developer → Use Relative References) — actions record relative to the active cell. Running the macro acts on whatever cell is currently selected. Use for row-by-row processing.</li>
</ul>
<h3>Saving Macro-Enabled Workbooks</h3>
<p>Save as .xlsm (Excel Macro-Enabled Workbook) — standard .xlsx cannot store macros. When opening an .xlsm file, Excel shows a security warning; click Enable Content to allow macros to run.</p>
<h3>Macro Security</h3>
<p>Developer → Macro Security → Disable all macros with notification (recommended). Only enable macros in trusted files. Never enable macros in files from unknown sources.</p>` },
    { type: 'tip', body: `Assign macros to <strong>buttons on the sheet</strong> for non-technical users. Insert → Shapes → draw a rectangle → right-click → Assign Macro → select your macro. Format the button to look like a button (text, colour, no fill border). Users click the button without needing to open the Developer tab.` },
    { type: 'exercise', title: 'Record a "Format Report" macro', hint: 'Record: select header row, bold, blue fill, autofit columns, freeze panes', solution: `1. Developer → Use Relative References: OFF (absolute recording).
2. Developer → Record Macro → Name: FormatReport → Shortcut: Ctrl+Shift+R → OK.
3. Click cell A1.
4. Ctrl+Shift+End to select to last used cell.
5. Home → Format as Table (optional, or just apply header formatting manually).
6. Click row 1 header → Bold → Fill: Blue → Font: White.
7. Select all used columns → Format → AutoFit Column Width.
8. Click A2 → View → Freeze Panes → Freeze Panes.
9. Developer → Stop Recording.
10. Test: open a new report sheet, run Ctrl+Shift+R — formatting applies instantly.` }
  ]
};

L['excel-w6-l3'] = {
  title: 'VBA Basics for Data Tasks',
  sections: [
    { type: 'text', body: `<h2>Visual Basic for Applications (VBA)</h2>
<p>VBA is the programming language embedded in Excel. The macro recorder generates VBA code automatically — understanding VBA lets you edit, extend, and fix recorded macros, and write logic the recorder cannot capture (loops, conditions, user input).</p>
<h3>The Visual Basic Editor (VBE)</h3>
<p>Open with <strong>Alt+F11</strong>. The VBE has:</p>
<ul>
  <li><strong>Project Explorer</strong> (left) — shows all workbooks, sheets, and modules.</li>
  <li><strong>Code window</strong> (right) — where you write and read VBA code.</li>
  <li><strong>Immediate Window</strong> (Ctrl+G) — run single lines of code interactively, great for testing.</li>
</ul>
<h3>Key VBA Concepts</h3>
<ul>
  <li><strong>Sub / End Sub</strong> — defines a macro (subroutine).</li>
  <li><strong>Range("A1")</strong> — references a cell or range. <code>.Value</code>, <code>.Formula</code>, <code>.Interior.Color</code> are properties.</li>
  <li><strong>Cells(row, col)</strong> — reference by row and column numbers (useful in loops).</li>
  <li><strong>With / End With</strong> — apply multiple properties to one object without repeating it.</li>
  <li><strong>MsgBox / InputBox</strong> — show a message or get user input.</li>
</ul>` },
    { type: 'code', lang: 'vba', src: `' Example 1: Basic operations
Sub HelloData()
    ' Write a value
    Range("A1").Value = "Hello, Excel!"

    ' Colour a range
    With Range("A1:E1")
        .Interior.Color = RGB(0, 112, 192)   ' blue
        .Font.Color = RGB(255, 255, 255)       ' white
        .Font.Bold = True
    End With

    ' Show a message
    MsgBox "Formatting applied!", vbInformation
End Sub

' Example 2: Loop over rows to clean data
Sub TrimAllCells()
    Dim lastRow As Long
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Raw Data")
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row

    Dim i As Long
    For i = 2 To lastRow                       ' skip header row
        If ws.Cells(i, 1).Value <> "" Then
            ws.Cells(i, 1).Value = Trim(ws.Cells(i, 1).Value)
        End If
    Next i
    MsgBox "Trimmed " & lastRow - 1 & " cells.", vbInformation
End Sub` },
    { type: 'code', lang: 'vba', src: `' Example 3: Refresh all Pivot Tables in a workbook
Sub RefreshAllPivots()
    Dim pt As PivotTable
    Dim ws As Worksheet
    For Each ws In ThisWorkbook.Worksheets
        For Each pt In ws.PivotTables
            pt.RefreshTable
        Next pt
    Next ws
    MsgBox "All Pivot Tables refreshed.", vbInformation
End Sub

' Example 4: Copy filtered data to a new sheet
Sub ExportFiltered()
    Dim srcWs As Worksheet, destWs As Worksheet
    Set srcWs = ThisWorkbook.Sheets("Data")

    ' Delete existing export sheet if it exists
    On Error Resume Next
    Application.DisplayAlerts = False
    ThisWorkbook.Sheets("Export").Delete
    Application.DisplayAlerts = True
    On Error GoTo 0

    srcWs.Copy After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.Count)
    Set destWs = ThisWorkbook.Sheets(ThisWorkbook.Sheets.Count)
    destWs.Name = "Export"

    ' Remove autofilter to show all data; apply new filter
    destWs.AutoFilterMode = False
    destWs.Range("A1").AutoFilter Field:=3, Criteria1:="North"

    MsgBox "Export sheet created with North filter.", vbInformation
End Sub` },
    { type: 'tip', body: `Always add <code>Application.ScreenUpdating = False</code> at the start of a macro and <code>Application.ScreenUpdating = True</code> at the end. This stops Excel from redrawing the screen during execution, making macros run 5–10× faster and without the flickering that confuses users.` }
  ]
};

L['excel-w6-l4'] = {
  title: 'Excel with Python — openpyxl & xlsxwriter',
  sections: [
    { type: 'text', body: `<h2>Why Python + Excel?</h2>
<p>Excel files (.xlsx) are ubiquitous in business. Python can read, write, and process Excel files programmatically — enabling automation at scale that is impossible in Excel alone: processing thousands of files, generating reports from database queries, building scheduled pipelines.</p>
<h3>Key Libraries</h3>
<ul>
  <li><strong>openpyxl</strong> — read and write .xlsx files. Can access cell values, formulas, formatting, charts, named ranges, and Pivot Table data. The most flexible choice for reading and modifying existing workbooks.</li>
  <li><strong>xlsxwriter</strong> — write-only library optimised for creating new, heavily formatted Excel reports. Excellent chart and formatting support. Cannot read existing files.</li>
  <li><strong>pandas</strong> — the standard for data analysis. <code>pd.read_excel()</code> reads Excel to a DataFrame; <code>df.to_excel()</code> writes it back. Uses openpyxl or xlsxwriter as the engine.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# pip install openpyxl xlsxwriter pandas

import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

# --- Read an existing workbook ---
wb = openpyxl.load_workbook('sales_report.xlsx')
ws = wb['Monthly Data']

# Read values
for row in ws.iter_rows(min_row=2, max_col=5, values_only=True):
    date, region, product, qty, revenue = row
    print(f'{region}: £{revenue:,.0f}')

# --- Write and format cells ---
ws['G1'] = 'Total Revenue'
ws['G1'].font = Font(bold=True, color='FFFFFF')
ws['G1'].fill = PatternFill('solid', fgColor='0070C0')   # blue

ws['G2'] = f'=SUM(E2:E{ws.max_row})'

# Auto-fit column widths (approximate)
for col in ws.columns:
    max_len = max((len(str(cell.value or '')) for cell in col), default=0)
    ws.column_dimensions[get_column_letter(col[0].column)].width = max_len + 4

wb.save('sales_report_updated.xlsx')
print('Saved.')` },
    { type: 'code', lang: 'python', src: `import pandas as pd

# --- pandas: read multiple sheets ---
xls = pd.ExcelFile('quarterly.xlsx')
print(xls.sheet_names)   # ['Q1', 'Q2', 'Q3', 'Q4']

dfs = {sheet: xls.parse(sheet) for sheet in xls.sheet_names}
annual = pd.concat(dfs.values(), ignore_index=True)

# --- pandas: write with multiple sheets + formatting ---
with pd.ExcelWriter('annual_report.xlsx', engine='xlsxwriter') as writer:
    annual.to_excel(writer, sheet_name='All Data', index=False)
    annual.groupby('Region')['Revenue'].sum().reset_index().to_excel(
        writer, sheet_name='By Region', index=False)

    # Access the xlsxwriter workbook/worksheet for formatting
    wb  = writer.book
    ws  = writer.sheets['By Region']
    fmt = wb.add_format({'bold': True, 'bg_color': '#0070C0',
                          'font_color': 'white', 'border': 1})
    ws.set_row(0, 20, fmt)           # format header row
    ws.set_column('B:B', 15, wb.add_format({'num_format': '£#,##0'}))

print('Report written.')` },
    { type: 'tip', body: `For scheduled report generation (e.g. daily sales email), use <code>pandas</code> to query your database → transform → write to Excel with xlsxwriter → send via <code>smtplib</code> or the Microsoft Graph API. Schedule with Windows Task Scheduler or cron. This replaces a manual "export, format, email" workflow with a zero-touch pipeline.` },
    { type: 'exercise', title: 'Generate a formatted summary report from a CSV', hint: 'Read CSV with pandas, group by region, write to Excel with header formatting and currency format', solution: `import pandas as pd

df = pd.read_csv('sales.csv', parse_dates=['Date'])
summary = df.groupby('Region').agg(
    Total_Revenue=('Revenue','sum'),
    Avg_Order=('Revenue','mean'),
    Orders=('OrderID','count')
).reset_index()

with pd.ExcelWriter('summary.xlsx', engine='xlsxwriter') as writer:
    summary.to_excel(writer, sheet_name='Summary', index=False)
    wb = writer.book
    ws = writer.sheets['Summary']

    header_fmt = wb.add_format({'bold':True,'bg_color':'#0070C0',
                                 'font_color':'white','align':'center'})
    currency_fmt = wb.add_format({'num_format':'£#,##0.00'})
    int_fmt = wb.add_format({'num_format':'#,##0'})

    for col_num in range(len(summary.columns)):
        ws.write(0, col_num, summary.columns[col_num], header_fmt)
    ws.set_column('B:C', 16, currency_fmt)
    ws.set_column('D:D', 10, int_fmt)
    ws.set_column('A:A', 14)
print('Done')` }
  ]
};

L['excel-w6-l5'] = {
  title: 'Capstone — Sales Analysis Dashboard',
  sections: [
    { type: 'text', body: `<h2>Capstone Project: End-to-End Sales Dashboard</h2>
<p>This capstone integrates everything from Weeks 1–6: data cleaning, formulas, Pivot Tables, charts, slicers, and automation — into a fully functional, interactive sales analysis dashboard.</p>
<h3>Project Brief</h3>
<p>You are a data analyst at a retail company. You have received a raw sales export (12 months, multiple regions, multiple product categories). Deliverables:</p>
<ol>
  <li>A clean, validated data table.</li>
  <li>A Pivot-powered analysis sheet.</li>
  <li>An interactive 1-screen dashboard with KPI cards, charts, and slicers.</li>
  <li>A VBA refresh button.</li>
</ol>
<h3>Sheet Structure</h3>
<ul>
  <li><strong>Raw Data</strong> — original import (hidden in final version).</li>
  <li><strong>Clean Data</strong> — Excel Table with validated, cleaned data.</li>
  <li><strong>Analysis</strong> — Pivot Tables (summary by region × month, top products, category breakdown).</li>
  <li><strong>Dashboard</strong> — KPI cards, charts, slicers, timeline.</li>
  <li><strong>Reference</strong> — lookup tables (region codes, product categories, targets).</li>
</ul>` },
    { type: 'text', body: `<h3>Step-by-Step Build</h3>
<h4>Step 1 — Data Cleaning (Clean Data sheet)</h4>
<ul>
  <li>Convert to Excel Table named "SalesData".</li>
  <li>Add data validation (Region = drop-down, Date = valid range, Revenue = positive number).</li>
  <li>Add calculated columns: Margin = Revenue − COGS; Margin% = Margin/Revenue; Month = DATE(YEAR(Date),MONTH(Date),1).</li>
  <li>TRIM all text columns; PROPER-case the Region names.</li>
  <li>Conditional formatting: highlight Margin% below 10% in red.</li>
</ul>
<h4>Step 2 — Analysis (Analysis sheet)</h4>
<ul>
  <li>Pivot Table 1: Rows=Month, Columns=Region, Values=Sum Revenue.</li>
  <li>Pivot Table 2: Rows=Product (Top 10 filter), Values=Sum Revenue.</li>
  <li>Pivot Table 3: Rows=Category, Values=Sum Revenue and Average Margin%.</li>
  <li>Add "% of Total" Show Values As for each table.</li>
</ul>
<h4>Step 3 — Dashboard</h4>
<ul>
  <li>KPI cards: Total Revenue, Total Orders, Avg Order Value, Overall Margin%.</li>
  <li>Line Pivot Chart: monthly revenue trend (from PT1).</li>
  <li>Bar Pivot Chart: top 10 products (from PT2).</li>
  <li>Region slicer connected to all three Pivot Tables.</li>
  <li>Date Timeline connected to all three Pivot Tables.</li>
  <li>Protect sheet: lock all except slicer/timeline interaction.</li>
</ul>` },
    { type: 'code', lang: 'vba', src: `' VBA: Refresh button for the dashboard
Sub RefreshDashboard()
    Application.ScreenUpdating = False
    Application.Calculation = xlCalculationManual

    ' Refresh all Pivot Tables
    Dim pt As PivotTable, ws As Worksheet
    For Each ws In ThisWorkbook.Worksheets
        For Each pt In ws.PivotTables
            pt.RefreshTable
        Next pt
    Next ws

    Application.Calculation = xlCalculationAutomatic
    Application.ScreenUpdating = True

    ' Update "last refreshed" timestamp
    ThisWorkbook.Sheets("Dashboard").Range("LastRefreshed").Value = Now()
    MsgBox "Dashboard refreshed at " & Format(Now(), "dd/mm/yyyy hh:mm"), vbInformation
End Sub` },
    { type: 'text', body: `<h3>KPI Card Formulas</h3>
<pre>Total Revenue:   =TEXT(SUM(SalesData[Revenue]),"£#,##0,,")&"M"
Total Orders:    =TEXT(COUNTA(SalesData[OrderID]),"#,##0")
Avg Order Value: =TEXT(AVERAGE(SalesData[Revenue]),"£#,##0")
Margin %:        =TEXT(SUM(SalesData[Margin])/SUM(SalesData[Revenue]),"0.0%")</pre>
<p>Place each formula in a large-font cell (28–36pt). Add a smaller label below. Use conditional formatting on the Margin % cell: red if below target (from Reference sheet), green if above.</p>
<p>Name the "Last Refreshed" cell (Formulas → Define Name → "LastRefreshed") so the VBA macro can reference it by name across sheet changes.</p>` },
    { type: 'tip', body: `When presenting the finished dashboard, hide the Raw Data and Analysis sheets (right-click tab → Hide). Protect the workbook structure (Review → Protect Workbook → password) so users cannot unhide or reorder sheets. The dashboard remains fully interactive — slicers and timelines still work on protected sheets as long as you checked "Use PivotTable & PivotChart" in the Protect Sheet dialog.` },
    { type: 'exercise', title: 'Add a dynamic chart title that reflects slicer selection', hint: 'Link chart title to a GETPIVOTDATA formula that reads the current filter state', solution: `1. In a cell on the Analysis sheet (e.g. B1), type a formula:
   =IF(ISBLANK(Dashboard!A1), "All Regions",
       "Region: "&Dashboard!A1)
   (Assumes the slicer selection is reflected in a helper cell via a GETPIVOTDATA or the slicer value.)

   Simpler approach: In Dashboard cell D1:
   ="Revenue — "&IF(COUNTIF(SalesData[Region],B1)>0,B1,"All Regions")
   Where B1 reads from the active slicer via a helper GETPIVOTDATA:
   =IFERROR(GETPIVOTDATA("Region",Analysis!$A$3),"All")

2. Click the chart title box → Formula bar → type = → click D1 → Enter.
3. The chart title now reads "Revenue — North" when North is selected,
   or "Revenue — All Regions" when no filter is active.` }
  ]
};

})();
