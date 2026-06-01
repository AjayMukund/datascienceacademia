(function(){
'use strict';
window.DSA_LESSON_CONTENT = window.DSA_LESSON_CONTENT || {};
const L = window.DSA_LESSON_CONTENT;

/* ─── MODULE 1 — Getting Started with Power BI ──────────────────────────── */

L['powerbi-w1-l1'] = {
  title: 'The Power BI Ecosystem — Desktop, Service, Mobile & Report Builder',
  sections: [
    { type: 'text', body: `<h2>What is Power BI?</h2>
<p>Power BI is Microsoft's business analytics platform for connecting to data, transforming it, building interactive reports, and sharing insights across an organisation. It sits alongside Excel in the Microsoft 365 ecosystem and integrates tightly with Azure, Teams, SharePoint, and Dynamics 365.</p>
<h3>The Product Family</h3>
<ul>
  <li><strong>Power BI Desktop</strong> — the free Windows authoring tool. This is where you build reports: connect to data, write Power Query transformations, model relationships, write DAX measures, and design visuals. All serious Power BI work starts here.</li>
  <li><strong>Power BI Service</strong> (app.powerbi.com) — the cloud platform for publishing, sharing, and consuming reports in a browser. Also supports dashboards, Apps, workspaces, scheduled refresh, and RLS management.</li>
  <li><strong>Power BI Mobile</strong> — iOS and Android apps for consuming published reports and dashboards. Supports push notifications for data alerts.</li>
  <li><strong>Power BI Report Builder</strong> — a separate tool for creating paginated reports (pixel-perfect, print-ready layouts like invoices and statements). Different paradigm from standard Power BI reports.</li>
  <li><strong>Power BI Embedded</strong> — Azure service for embedding Power BI reports into your own web applications.</li>
</ul>` },
    { type: 'text', body: `<h3>Licensing Overview</h3>
<ul>
  <li><strong>Power BI Desktop</strong> — completely free. No account needed to build reports locally.</li>
  <li><strong>Power BI Free</strong> — sign in to Power BI Service but can only publish to "My Workspace". Cannot share with others.</li>
  <li><strong>Power BI Pro</strong> — per-user licence (~$10/user/month). Required to publish to shared workspaces and share with other Pro users.</li>
  <li><strong>Power BI Premium Per User (PPU)</strong> — per-user licence with all Premium features (paginated reports, AI insights, larger datasets).</li>
  <li><strong>Power BI Premium (P SKUs)</strong> — capacity-based, org-wide. Allows free users to consume Pro-shared content. Very expensive.</li>
</ul>
<p>For learning, Power BI Desktop + a free Service account is sufficient for everything in this course.</p>
<h3>The Workflow</h3>
<ol>
  <li>Connect to data and transform it in <strong>Power Query</strong> (inside Desktop).</li>
  <li>Model relationships and write <strong>DAX</strong> measures in the Model/Data views.</li>
  <li>Build visuals and reports on the <strong>Report canvas</strong>.</li>
  <li>Publish to <strong>Power BI Service</strong> for sharing and scheduled refresh.</li>
</ol>` },
    { type: 'tip', body: `Download Power BI Desktop from the <strong>Microsoft Store</strong> (preferred — auto-updates) or from powerbi.microsoft.com. The Store version updates monthly. Always keep it up to date — Microsoft releases new features every month, and some DAX functions or visual features may not exist in older versions.` },
    { type: 'text', body: `<h3>Power BI vs Excel vs Tableau</h3>
<table>
  <tr><th>Aspect</th><th>Power BI</th><th>Excel</th><th>Tableau</th></tr>
  <tr><td>Primary use</td><td>Interactive reports & dashboards</td><td>Ad-hoc analysis & modelling</td><td>Visual analytics & exploration</td></tr>
  <tr><td>Data volume</td><td>Millions of rows (VertiPaq)</td><td>~1M rows per sheet</td><td>Millions (Hyper engine)</td></tr>
  <tr><td>Calculation language</td><td>DAX</td><td>Formulas / VBA</td><td>Tableau calc language / LOD</td></tr>
  <tr><td>Sharing</td><td>Power BI Service (Pro licence)</td><td>Email / SharePoint</td><td>Tableau Server / Public</td></tr>
  <tr><td>Microsoft 365 integration</td><td>Native (Teams, SharePoint)</td><td>Native</td><td>Via connectors</td></tr>
</table>` },
    { type: 'exercise', title: 'Install Power BI Desktop and explore the interface', hint: 'Open the Microsoft Store, search "Power BI Desktop", install, then open and explore the three views', solution: `1. Open Microsoft Store → search "Power BI Desktop" → Get (free).
2. Launch Power BI Desktop → sign in with a Microsoft account (or skip).
3. Close the splash screen → notice the three view icons in the left sidebar:
   - Chart icon = Report view (default)
   - Table icon = Data view
   - Relationship icon = Model view
4. Click Model view → it is empty (no data loaded yet).
5. Click the "Get data" button in the ribbon → browse the connector list to see available sources.
6. Close without connecting — you will connect to data in Lesson 3.` }
  ]
};

L['powerbi-w1-l2'] = {
  title: 'The Power BI Desktop Interface — Report, Data & Model Views',
  sections: [
    { type: 'text', body: `<h2>The Three Views</h2>
<p>Power BI Desktop has three distinct views, each serving a different phase of the workflow. Switch between them using the icons on the left sidebar.</p>
<h3>Report View</h3>
<p>The canvas where you build your report. Key areas:</p>
<ul>
  <li><strong>Report canvas</strong> (centre) — drag visuals onto this. Each "page" tab at the bottom is a separate canvas.</li>
  <li><strong>Visualizations pane</strong> (right) — all chart types. Click one to add it, or drag a field to auto-suggest. Below the visual gallery: Fields (what data to show), Format (colours, labels, axes), Analytics (trend lines, reference lines).</li>
  <li><strong>Filters pane</strong> (right, below Visualizations) — visual-level, page-level, and report-level filters. Can be locked or hidden from viewers.</li>
  <li><strong>Fields pane</strong> (far right) — all tables, columns, and measures from the data model. Drag fields to the canvas or Visualizations pane to build charts.</li>
</ul>` },
    { type: 'text', body: `<h3>Data View</h3>
<p>Shows the data inside your model as a spreadsheet-like grid. Use it to:</p>
<ul>
  <li>Inspect column values after transformations.</li>
  <li>Create calculated columns (right-click a table → New column).</li>
  <li>See column data types and categories.</li>
  <li>Verify that your Power Query steps loaded the expected data.</li>
</ul>
<p>Data view does not let you edit raw data — changes happen in Power Query. What you see here is the loaded model.</p>
<h3>Model View</h3>
<p>A diagram showing all your tables and the relationships between them. Click and drag between columns to create relationships. Click a relationship line to see its cardinality and cross-filter direction.</p>
<p>This is where you design the data model before building visuals. A well-designed model in this view makes DAX measures simpler and report performance faster.</p>` },
    { type: 'text', body: `<h3>The Ribbon</h3>
<p>Power BI Desktop's ribbon has several tabs depending on context:</p>
<ul>
  <li><strong>Home</strong> — Get data, Transform data (opens Power Query), Publish, Refresh.</li>
  <li><strong>Insert</strong> — add visual types, text boxes, images, buttons, shapes.</li>
  <li><strong>Modeling</strong> — New measure, New column, New table, Manage relationships, What-if parameters.</li>
  <li><strong>View</strong> — Themes, Mobile layout, Bookmarks pane, Performance Analyzer, Sync Slicers.</li>
  <li><strong>Optimize</strong> — Query reduction options, Performance options.</li>
  <li><strong>Help</strong> — DAX reference, Community, Power BI blog.</li>
</ul>` },
    { type: 'tip', body: `Use <strong>View → Performance Analyzer</strong> to see how long each visual takes to render and what DAX query it runs. This is the single most useful debugging tool for slow reports — open it, click "Start recording", then interact with your report to see query durations per visual.` },
    { type: 'exercise', title: 'Navigate all three views and identify key panes', hint: 'Load a sample dataset via Get data → Samples → Sales & Returns, then explore all three views', solution: `1. Home ribbon → Get data → Samples → Sales & Returns Sample.
2. Load the data. You are now in Report view with two tables in the Fields pane.
3. Click the Data view icon (table icon) → click the "Sales" table → inspect columns.
4. Click the Model view icon (relationship diagram) → notice the relationship between Sales and Returns.
5. Back in Report view: drag "Gross Revenue" to the canvas → a card visual appears.
6. Drag "Product" from the Fields pane to the Axis field in the Visualizations pane to build a bar chart.
7. Open the Filters pane → drag "Country" from Fields → set it to "USA" to filter the report.` }
  ]
};

L['powerbi-w1-l3'] = {
  title: 'Connecting to Data Sources — Excel, CSV, SQL & Web',
  sections: [
    { type: 'text', body: `<h2>Get Data</h2>
<p>Click <strong>Home → Get data</strong> (or the dropdown arrow) to see all available connectors. Power BI supports 100+ connectors out of the box. Common categories:</p>
<ul>
  <li><strong>File</strong>: Excel, CSV/Text, XML, JSON, PDF, Parquet, Folder (bulk import all files in a folder).</li>
  <li><strong>Database</strong>: SQL Server, PostgreSQL, MySQL, Oracle, Amazon Redshift, Snowflake, BigQuery, Azure SQL.</li>
  <li><strong>Online Services</strong>: SharePoint, Dynamics 365, Salesforce, Google Analytics, Microsoft Dataverse.</li>
  <li><strong>Azure</strong>: Azure SQL, Blob Storage, Data Lake, Synapse Analytics, Cosmos DB.</li>
  <li><strong>Other</strong>: Web (scrape HTML tables), OData, REST APIs (via blank query), Python/R scripts.</li>
</ul>` },
    { type: 'text', body: `<h3>Connecting to Excel</h3>
<p>Get data → Excel workbook → browse to the .xlsx file → Navigator dialog shows all sheets and named tables. Best practice: import named <strong>Tables</strong> (not raw sheets) because:</p>
<ul>
  <li>Named tables have explicit column headers Power BI respects.</li>
  <li>When you add rows to the Excel table, Power BI refresh automatically picks them up.</li>
  <li>Sheets include all cells — you may get blank rows at the bottom.</li>
</ul>
<h3>Connecting to CSV</h3>
<p>Get data → Text/CSV → browse to file. Power BI detects the delimiter automatically (comma, semicolon, tab). If detection is wrong, change it in the preview dialog. CSV connects load all rows — no Navigator step needed.</p>
<h3>Connecting to SQL Server</h3>
<p>Get data → SQL Server → enter server name and (optionally) database name. Choose Import or DirectQuery mode. Import copies data into the .pbix file. DirectQuery sends live queries to the server on every interaction — no data is stored locally.</p>` },
    { type: 'tip', body: `<strong>Import vs DirectQuery:</strong> Import is faster and supports all DAX functions. DirectQuery shows real-time data but many DAX time intelligence functions are unsupported and performance depends entirely on the source database. Start with Import; switch to DirectQuery only when data freshness requirements demand it and your DBA approves the query load.` },
    { type: 'text', body: `<h3>Connecting to a Web Page</h3>
<p>Get data → Web → enter a URL. Power BI fetches the page and shows any HTML tables it finds. You can select the table you want. This works well for public data like Wikipedia tables, government statistics pages, and sports results.</p>
<p>For REST APIs that return JSON, use Get data → Web with a URL that returns JSON, then use Power Query's JSON parsing functions to expand nested fields.</p>
<h3>Managing Data Sources</h3>
<p>After loading, go to <strong>Home → Transform data → Data source settings</strong> to see all connected sources. You can change credentials, update file paths, and remove connections here — without rebuilding your queries from scratch.</p>` },
    { type: 'exercise', title: 'Connect to an Excel file and a CSV simultaneously', hint: 'Use Get data twice to connect to both sources, then load both tables into the model', solution: `1. Download a sample Excel file (e.g. Northwind orders spreadsheet) and a CSV of product details.
2. Home → Get data → Excel → select your file → Navigator → tick the Orders table → Load.
3. Home → Get data → Text/CSV → select your CSV → Transform Data (to preview) → Close & Apply.
4. Model view → both tables now appear. Notice there is no relationship yet.
5. In Model view, drag the "ProductID" column from Orders to ProductID in Products to create a relationship.
6. Data view → click the Products table → verify all rows loaded correctly.` }
  ]
};

L['powerbi-w1-l4'] = {
  title: 'Power Query Basics — Loading & Shaping Your First Dataset',
  sections: [
    { type: 'text', body: `<h2>What is Power Query?</h2>
<p>Power Query is the ETL (Extract, Transform, Load) engine inside Power BI. Every time you connect to a data source, Power Query handles the extraction. You can then add transformation steps — filtering, renaming, changing types, merging tables — before the data loads into the model.</p>
<p>Open Power Query Editor via <strong>Home → Transform data</strong>. The editor opens in a separate window from the report canvas.</p>
<h3>Power Query Editor Layout</h3>
<ul>
  <li><strong>Queries pane</strong> (left) — list of all queries (one per data source/table). Click to switch between them.</li>
  <li><strong>Formula bar</strong> (top) — shows the M language formula for the currently selected step.</li>
  <li><strong>Data preview</strong> (centre) — first 1,000 rows of the query after all steps have been applied.</li>
  <li><strong>Query Settings pane</strong> (right) — Name of the query at the top, and the <strong>Applied Steps</strong> list below.</li>
</ul>` },
    { type: 'text', body: `<h3>Applied Steps</h3>
<p>Every action you take in Power Query adds a step to the Applied Steps list. Steps are executed top to bottom, each one transforming the output of the previous step. You can:</p>
<ul>
  <li>Click any step to preview the data at that point in the transformation pipeline.</li>
  <li>Delete a step by clicking the X next to it.</li>
  <li>Reorder steps by dragging (with caution — steps depend on prior ones).</li>
  <li>Edit the M formula directly in the formula bar for precise control.</li>
</ul>
<h3>Essential Transformations</h3>
<ul>
  <li><strong>Promote Headers</strong> — first row becomes column headers. (Home → Use First Row as Headers)</li>
  <li><strong>Change Data Type</strong> — click the icon left of a column name to change type (Text, Whole Number, Decimal, Date, True/False, etc.).</li>
  <li><strong>Remove Columns</strong> — right-click column header → Remove. Or select multiple → Remove Columns.</li>
  <li><strong>Rename Column</strong> — double-click column header.</li>
  <li><strong>Filter Rows</strong> — click the dropdown arrow on a column header to filter by value.</li>
  <li><strong>Remove Duplicates</strong> — select columns → right-click → Remove Duplicates.</li>
  <li><strong>Replace Values</strong> — right-click column → Replace Values (find/replace within a column).</li>
</ul>` },
    { type: 'tip', body: `Always set the correct <strong>data type</strong> for every column in Power Query before loading. Power BI makes guesses, but it often gets dates wrong (importing them as text) or integers as decimals. Wrong types cause silent errors in DAX — a date stored as text cannot be used in time intelligence functions, and it takes minutes to diagnose.` },
    { type: 'text', body: `<h3>Close & Apply</h3>
<p>When you are done with transformations, click <strong>Home → Close & Apply</strong>. Power Query executes all steps and loads the results into the Power BI data model. This is when the data physically enters the .pbix file.</p>
<p>If you click <strong>Close & Apply → Apply</strong> (dropdown), Power Query applies pending changes without closing the editor — useful when you want to verify the model after partial changes.</p>
<p>If you click <strong>Discard</strong>, all unapplied changes in the editor are discarded and the model is unchanged.</p>` },
    { type: 'exercise', title: 'Load and clean a messy CSV in Power Query', hint: 'Promote headers, fix data types, remove blank rows, and rename columns before loading', solution: `1. Download a raw sales CSV (or create one with: Date, Product, Qty, Price — but with wrong types).
2. Get data → Text/CSV → select file → Transform Data (not Load).
3. Home → Use First Row as Headers (if headers are in row 1).
4. Click the Date column icon → change type to Date.
5. Click Qty column icon → Whole Number. Click Price → Decimal Number.
6. Home → Remove Rows → Remove Blank Rows.
7. Double-click "Product" column header → rename to "Product Name".
8. Right-click the index/row number column → Remove Column.
9. Home → Close & Apply → model now has a clean Sales table.` }
  ]
};

L['powerbi-w1-l5'] = {
  title: 'Building Your First Report — A Simple Sales Dashboard',
  sections: [
    { type: 'text', body: `<h2>From Data to Report</h2>
<p>With data loaded and typed correctly, you are ready to build visuals. In Report view, the Fields pane on the right shows your table(s) and all their columns. You build visuals by dragging fields or clicking them while a visual is selected.</p>
<h3>Adding Visuals</h3>
<p>Three ways to add a visual:</p>
<ol>
  <li><strong>Click a visual type</strong> in the Visualizations pane — an empty placeholder appears on the canvas. Then drag fields into it.</li>
  <li><strong>Drag a field</strong> from the Fields pane to an empty area of the canvas — Power BI picks a default visual type (usually a table or bar chart).</li>
  <li><strong>Select multiple fields</strong> in the Fields pane (Ctrl+click) then click a visual type — Power BI maps fields automatically.</li>
</ol>` },
    { type: 'text', body: `<h3>Building a Bar Chart</h3>
<p>Click the Clustered bar chart icon → drag [Category] to the Y-axis field well → drag [Sales] to the X-axis field well. Power BI aggregates Sales as SUM by default and groups by Category.</p>
<p>To change aggregation: click the dropdown arrow next to [Sales] in the field well → choose Average, Count, Min, Max, etc.</p>
<h3>Building a Card (KPI Number)</h3>
<p>Click the Card visual → drag [Sales] to the Field well. The card shows the total SUM of Sales. Format it: Visualizations → Format → Callout value → change font size to 28, colour to white.</p>
<h3>Adding a Slicer</h3>
<p>Click the Slicer visual → drag [Region] to the Field well. The slicer appears as a list of regions. Clicking one filters all other visuals on the page automatically — this is Power BI's built-in cross-filtering.</p>
<h3>Formatting Tips</h3>
<ul>
  <li>Select a visual → Visualizations pane → Format tab (paintbrush icon) → every visual property is here: title, background, border, colours, data labels, axis formatting.</li>
  <li>Rename a page by double-clicking the tab at the bottom.</li>
  <li>Resize a visual by dragging its handles. Move it by dragging from the centre.</li>
</ul>` },
    { type: 'tip', body: `Hold <strong>Ctrl</strong> and click multiple visuals to select them all. Then use <strong>Format → Align</strong> in the ribbon to align left edges, centres, or right edges. Use <strong>Distribute → Horizontally</strong> to space them evenly. This produces a much cleaner layout than manually pixel-nudging each visual.` },
    { type: 'exercise', title: 'Build a 3-visual sales dashboard page', hint: 'Add a card for total sales, a bar chart by category, and a slicer by year', solution: `1. In Report view (with Sales data loaded):
2. Click Slicer → drag [Year] from your date table to the Field well → place top-left.
3. Click Card → drag [Sales] to Field well → place top-centre → format: title off, callout value 28pt.
4. Click Clustered bar chart → Y-axis: [Category], X-axis: [Sales] → Data labels: on.
5. Sort the bar chart descending by Sales: click the "…" menu on the visual → Sort descending → Sales.
6. Resize and align the three visuals to form a clean row.
7. Test: click a Year in the slicer → both the card and bar chart update.
8. File → Save As → "My First Sales Report.pbix".` }
  ]
};

/* ─── MODULE 2 — Data Transformation with Power Query ───────────────────── */

L['powerbi-w2-l1'] = {
  title: 'Power Query Editor Deep Dive — Toolbar & Applied Steps',
  sections: [
    { type: 'text', body: `<h2>The Power Query Ribbon</h2>
<p>The Power Query Editor has its own ribbon, separate from the report ribbon. Key tabs:</p>
<h3>Home Tab</h3>
<ul>
  <li><strong>Close & Apply</strong> — apply all pending changes and return to report.</li>
  <li><strong>New Source</strong> — add another data connection from within the editor.</li>
  <li><strong>Refresh Preview</strong> — reload the data preview from the source.</li>
  <li><strong>Choose Columns</strong> — select which columns to keep (remove all others).</li>
  <li><strong>Remove Rows</strong> — remove top N, bottom N, blank rows, duplicates, or errors.</li>
  <li><strong>Keep Rows</strong> — keep only top N or bottom N rows.</li>
  <li><strong>Group By</strong> — aggregate rows (like SQL GROUP BY + SUM/COUNT).</li>
  <li><strong>Use First Row as Headers</strong> — promote the first data row to column names.</li>
  <li><strong>Transpose</strong> — rotate the table (rows become columns, columns become rows).</li>
  <li><strong>Append Queries / Merge Queries</strong> — combine tables.</li>
</ul>` },
    { type: 'text', body: `<h3>Transform Tab</h3>
<ul>
  <li><strong>Data Type</strong> — change column type (same as clicking the type icon on a column header).</li>
  <li><strong>Detect Data Type</strong> — let Power Query guess types for all columns.</li>
  <li><strong>Replace Values</strong> — find and replace within a column.</li>
  <li><strong>Fill Down / Fill Up</strong> — propagate a non-blank value down/up into blank cells below/above it.</li>
  <li><strong>Pivot Column / Unpivot Columns</strong> — reshape between wide and long formats.</li>
  <li><strong>Split Column</strong> — split by delimiter or by number of characters.</li>
  <li><strong>Format</strong> (text operations): UPPERCASE, lowercase, Trim, Clean, Prefix/Suffix.</li>
  <li><strong>Extract</strong>: first N characters, last N characters, text before/after delimiter.</li>
  <li><strong>Date / Time</strong>: extract Year, Month, Day, Quarter, Week of Year, etc.</li>
</ul>
<h3>Add Column Tab</h3>
<ul>
  <li><strong>Column From Examples</strong> — type an example of the result and Power Query generates the M formula.</li>
  <li><strong>Custom Column</strong> — write an M expression to create a new column.</li>
  <li><strong>Conditional Column</strong> — if/else rules via a dialog (no M knowledge needed).</li>
  <li><strong>Index Column</strong> — add a sequential row number column.</li>
  <li><strong>Duplicate Column</strong> — create a copy of an existing column for transformations.</li>
</ul>` },
    { type: 'text', body: `<h3>Applied Steps in Depth</h3>
<p>The Applied Steps list in the Query Settings pane is your transformation audit trail. Understanding it fully is essential for advanced Power Query work:</p>
<ul>
  <li>Each step has a name (auto-generated or custom). Right-click → Rename to give it a meaningful name.</li>
  <li>Click the gear icon next to a step to edit its dialog (if it was created via a dialog, not a formula).</li>
  <li>Insert a step between two existing steps by clicking the step before the insertion point, then performing a transformation — Power Query inserts it after the selected step.</li>
  <li>If you insert a step that breaks a later step, Power Query warns you of the dependency conflict.</li>
</ul>
<p>The formula bar shows the M expression for the selected step. Every dialog action generates M code. Learning to read and edit M directly unlocks transformations that no dialog provides.</p>` },
    { type: 'tip', body: `Right-click any Applied Step → <strong>View Native Query</strong> (available when connected to a relational database with query folding). This shows the SQL Power Query generates for that step. Query folding means the transformation runs in the database — much faster than fetching all rows then filtering in Power BI. Steps that break folding (like custom M functions) force Power BI to download everything — watch for the folding indicator.` },
    { type: 'exercise', title: 'Audit a query\'s Applied Steps and rename them', hint: 'Open an existing query, click each step, observe the formula bar, and rename steps to descriptive names', solution: `1. Home → Transform data to open Power Query Editor.
2. Click your Sales query in the Queries pane.
3. In Applied Steps, click "Changed Type" → formula bar shows: = Table.TransformColumnTypes(...)
4. Click "Filtered Rows" → formula bar shows: = Table.SelectRows(..., each [Column] = "value")
5. Right-click "Changed Type" → Rename → type "Set column data types".
6. Right-click "Filtered Rows" → Rename → type "Remove blank product rows".
7. Right-click the last step → View Native Query (if available) to see the generated SQL.
8. Home → Close & Apply.` }
  ]
};

L['powerbi-w2-l2'] = {
  title: 'Column Operations — Split, Merge, Rename & Change Type',
  sections: [
    { type: 'text', body: `<h2>Working with Columns</h2>
<p>Most real-world data cleaning involves reshaping columns: combining two fields, splitting one field into parts, fixing formatting, and correcting data types. Power Query provides all of these through the Transform and Add Column tabs.</p>
<h3>Splitting a Column</h3>
<p>Select a column → Transform → Split Column. Options:</p>
<ul>
  <li><strong>By Delimiter</strong> — split on a comma, space, dash, custom character. Choose split at each occurrence, first occurrence only, or last occurrence only.</li>
  <li><strong>By Number of Characters</strong> — fixed-width splitting (e.g. first 4 characters, then rest).</li>
  <li><strong>By Positions</strong> — specify exact character positions for each split.</li>
  <li><strong>By Uppercase/Lowercase/Digit transition</strong> — useful for camelCase or mixed-format strings.</li>
</ul>
<p>Power Query creates new columns (Column.1, Column.2…) which you then rename. Use <strong>Add Column → Split Column</strong> instead of Transform → Split Column if you want to keep the original column.</p>` },
    { type: 'text', body: `<h3>Merging Columns</h3>
<p>Select two or more columns (Ctrl+click) → Transform → Merge Columns. Choose a separator (space, dash, comma, none, or custom). Power Query concatenates the values and creates a new merged column, replacing the originals.</p>
<p>Use <strong>Add Column → Merge Columns</strong> to keep the originals and add the merged result as a new column.</p>
<p>Example: merging [First Name] and [Last Name] with a space separator gives "Ajay Mukund".</p>
<h3>Renaming Columns</h3>
<p>Double-click any column header to rename it inline. Or right-click header → Rename. Renaming early in the Applied Steps is good practice — subsequent steps reference column names, and renaming later can cause those references to break.</p>
<h3>Changing Data Types</h3>
<p>Click the data type icon (left of column name): ABC for text, 123 for whole number, 1.2 for decimal, a calendar icon for date, etc. Or Transform → Data Type → select type.</p>
<p>Common type issues and fixes:</p>
<ul>
  <li>Dates imported as text → change to Date; Power Query parses most formats automatically.</li>
  <li>Currency fields with $ or £ symbols → replace symbols (Replace Values), then change to Decimal.</li>
  <li>Boolean fields stored as 0/1 → change to True/False (Logical).</li>
  <li>Percentage stored as 0.15 → keep as Decimal; format as % in the report canvas, not in Power Query.</li>
</ul>` },
    { type: 'tip', body: `Use <strong>Add Column → Column From Examples</strong> for complex string operations. Just type the expected result for 2–3 rows and Power Query generates the M formula automatically. It handles patterns like extracting domain from email ("ajay@example.com" → "example.com") or reformatting dates ("01/05/2024" → "May 2024") without you needing to know the M syntax.` },
    { type: 'text', body: `<h3>Removing and Reordering Columns</h3>
<p>To remove columns: select them (Ctrl+click multiple) → right-click → Remove Columns. Or use <strong>Home → Choose Columns</strong> to select only the columns to keep — useful when a source has 80 columns but you need 10.</p>
<p>To reorder columns: drag column headers left or right. Or: Add Column → select the new position. Reordering does not affect query performance but makes the data preview and the Fields pane more navigable.</p>
<p>Always remove columns you don't need — every unused column occupies RAM in the VertiPaq engine and slows model compression.</p>` },
    { type: 'exercise', title: 'Split a full name column and clean a date column', hint: 'Use Split Column by delimiter for names, Replace Values + Change Type for dates', solution: `1. Load a CSV with columns: "Full Name", "Join Date" (as text "DD-MM-YYYY"), "Department".
2. Select "Full Name" → Transform → Split Column → By Delimiter → Space → Split at each occurrence.
3. Rename the resulting columns to "First Name" and "Last Name".
4. Select "Join Date" → Transform → Replace Values → find "-" → replace with "/" → OK.
5. With "Join Date" selected → click its type icon → change to Date.
6. Verify: Data view should show dates as 01/05/2024 format.
7. Home → Choose Columns → untick any columns you don't need → OK.
8. Close & Apply.` }
  ]
};

L['powerbi-w2-l3'] = {
  title: 'Filtering, Sorting & Grouping Rows',
  sections: [
    { type: 'text', body: `<h2>Filtering Rows in Power Query</h2>
<p>Filtering in Power Query removes rows permanently from the query result before data loads into the model. This is different from report-level filters, which hide data temporarily for viewers.</p>
<h3>Auto-Filter (Column Header Dropdown)</h3>
<p>Click the dropdown arrow on any column header. Options depend on data type:</p>
<ul>
  <li><strong>Text columns</strong>: filter by specific values (checkbox list), "begins with", "contains", "does not contain", "ends with".</li>
  <li><strong>Number columns</strong>: equals, does not equal, greater than, less than, between, top/bottom N.</li>
  <li><strong>Date columns</strong>: before, after, between, in the previous N days/months, is earliest/latest.</li>
</ul>
<p>Selecting multiple values in the checkbox list creates an OR condition (keep rows matching value1 OR value2).</p>` },
    { type: 'text', body: `<h3>Home → Remove Rows</h3>
<ul>
  <li><strong>Remove Top Rows</strong> — remove the first N rows (useful when the first few rows of a file are metadata/headers before the real data).</li>
  <li><strong>Remove Bottom Rows</strong> — remove the last N rows (useful for footer totals at the bottom of a CSV).</li>
  <li><strong>Remove Blank Rows</strong> — removes rows where all columns are null/empty.</li>
  <li><strong>Remove Duplicates</strong> — removes duplicate rows (considers all selected columns). Select specific columns first to deduplicate only on those keys.</li>
  <li><strong>Remove Errors</strong> — removes rows that contain errors in any column (e.g. type conversion failures).</li>
</ul>
<h3>Sorting</h3>
<p>Click a column header dropdown → Sort Ascending / Sort Descending. Or Home → Sort. In Power Query, sorting affects row order in the preview but does not affect DAX calculations — sort order is irrelevant to the model. Sort in Power Query only when you need it for a specific transformation that depends on row order (like adding a sequential index after sorting by date).</p>` },
    { type: 'text', body: `<h3>Group By</h3>
<p>Home → Group By aggregates multiple rows into summary rows — equivalent to SQL GROUP BY.</p>
<p>Dialog options:</p>
<ul>
  <li><strong>Group by column(s)</strong>: which columns define the groups (e.g. Region, Product Category).</li>
  <li><strong>New column name</strong>: the name of the aggregated output column.</li>
  <li><strong>Operation</strong>: Sum, Average, Median, Min, Max, Count Rows, Count Distinct Values, All Rows (keeps the grouped sub-table as a nested table).</li>
</ul>
<p>You can add multiple aggregations at once (click "Add aggregation"). Example: Group by [Region] → Sum of Sales, Count of Orders.</p>
<p>Group By is useful for pre-aggregating large datasets before loading — e.g. collapsing 10M row transaction data to monthly totals if row-level granularity is not needed.</p>` },
    { type: 'tip', body: `When filtering dates in Power Query, prefer <strong>relative date filters</strong> ("in the previous 12 months") over absolute date filters ("after 01/01/2024"). Relative filters stay correct at every refresh — absolute filters become stale and require manual updates. Access them via column header dropdown → Date Filters → In the Previous…` },
    { type: 'exercise', title: 'Filter, deduplicate, and summarise a transactions table', hint: 'Filter to completed orders, remove duplicates on order ID, then Group By region and sum sales', solution: `1. Load a transactions CSV with columns: OrderID, Region, Status, Sales.
2. Column header dropdown on "Status" → Text Filters → Equals → "Completed" → OK.
3. Select the "OrderID" column → Home → Remove Rows → Remove Duplicates.
4. Home → Group By → Group by: Region → New column: "Total Sales" → Operation: Sum → Column: Sales → OK.
5. Data preview now shows one row per Region with a Total Sales column.
6. Rename the query to "Sales by Region" in the Queries pane.
7. Close & Apply.` }
  ]
};

L['powerbi-w2-l4'] = {
  title: 'Merging and Appending Queries',
  sections: [
    { type: 'text', body: `<h2>Combining Queries</h2>
<p>Real-world data is rarely in a single table. Power Query provides two operations for combining queries: <strong>Merge</strong> (horizontal join) and <strong>Append</strong> (vertical union).</p>
<h3>Merge Queries</h3>
<p>Home → Merge Queries (or Merge Queries as New). This is equivalent to a SQL JOIN.</p>
<p>In the Merge dialog:</p>
<ol>
  <li>Select the left table (your primary query).</li>
  <li>Select the matching column in the left table.</li>
  <li>Select the right table from the dropdown.</li>
  <li>Select the matching column in the right table.</li>
  <li>Choose the <strong>Join Kind</strong>.</li>
</ol>
<h3>Join Kinds</h3>
<ul>
  <li><strong>Left Outer</strong> — all rows from the left table, matching rows from the right. Unmatched left rows get nulls for right columns. (Most common)</li>
  <li><strong>Right Outer</strong> — all rows from the right, matching from left.</li>
  <li><strong>Full Outer</strong> — all rows from both tables.</li>
  <li><strong>Inner</strong> — only rows that match in both tables.</li>
  <li><strong>Left Anti</strong> — rows in left that have NO match in right (find orphaned records).</li>
  <li><strong>Right Anti</strong> — rows in right with no match in left.</li>
</ul>` },
    { type: 'text', body: `<h3>Expanding Merged Columns</h3>
<p>After merging, the right table appears as a single "Table" column. Click the expand icon (two arrows) in the column header to select which columns from the right table to bring across. Uncheck "Use original column name as prefix" to get clean column names without the table prefix.</p>
<p>If you merged a large right table but only need 2 columns from it, expand only those 2 — this reduces memory usage.</p>
<h3>Append Queries</h3>
<p>Home → Append Queries. Stacks two or more tables vertically — equivalent to SQL UNION ALL. Both tables must have the same column names (or Power Query creates nulls for unmatched columns).</p>
<p>Common use cases:</p>
<ul>
  <li>Combining January, February, March CSV exports into one table.</li>
  <li>Combining data from multiple regional databases with the same schema.</li>
  <li>Unifying current-year and prior-year tables.</li>
</ul>
<p>Use <strong>Append Queries as New</strong> to create a third query (leaving the originals intact), or <strong>Append Queries</strong> to append into the currently selected query.</p>` },
    { type: 'tip', body: `For bulk appending of many files (e.g. 12 monthly CSVs in a folder), use <strong>Get data → Folder</strong> instead of Append. Power Query lists all files in the folder, and you can add a custom step to combine them all into one table automatically. New files added to the folder are picked up on the next refresh — no manual re-appending needed.` },
    { type: 'text', body: `<h3>Merge vs Relationship</h3>
<p>A common question: should I merge tables in Power Query, or create a relationship in the Model view?</p>
<ul>
  <li><strong>Use a Model relationship</strong> when both tables will be used independently AND together. This is the recommended approach for dimension-fact joins in a star schema.</li>
  <li><strong>Use a Power Query Merge</strong> when you need to bring a lookup value physically into a table (e.g. add a "Category" column from a product table into the fact table, so you can build a calculated column that references it). Also use Merge when you are building a single flat table for a specific purpose and do not need both tables separately.</li>
</ul>
<p>In general, prefer Model relationships — they are more flexible and produce better DAX performance than denormalised merged tables.</p>` },
    { type: 'exercise', title: 'Merge a product lookup table into a sales facts table', hint: 'Left join Sales to Products on ProductID, then expand Category and UnitCost', solution: `1. Ensure you have two queries: "Sales" (with ProductID) and "Products" (with ProductID, Category, UnitCost).
2. Click the "Sales" query in the Queries pane.
3. Home → Merge Queries → Right table: Products → match on ProductID (both sides) → Join Kind: Left Outer → OK.
4. A new "Products" column appears at the right. Click its expand icon.
5. Select only "Category" and "UnitCost" → uncheck "Use original column name as prefix" → OK.
6. The Sales query now has Category and UnitCost columns from Products.
7. Rename steps: "Merged Products", "Expanded product columns".
8. Close & Apply → verify in Data view that the new columns appear.` }
  ]
};

L['powerbi-w2-l5'] = {
  title: 'Custom Columns, Conditional Columns & the M Language',
  sections: [
    { type: 'text', body: `<h2>Adding Calculated Columns in Power Query</h2>
<p>You can add new derived columns in Power Query (before loading) or in the data model (calculated columns in DAX). Which to choose?</p>
<ul>
  <li><strong>Power Query (M)</strong>: use when the calculation is purely a data-shaping operation — concatenating text, extracting parts of strings, arithmetic on loaded columns, or conditional text labels. Runs at refresh time, not at query time.</li>
  <li><strong>DAX Calculated Column</strong>: use when the formula needs to reference measures or other model constructs. Evaluated after load, in row context.</li>
</ul>
<h3>Custom Column</h3>
<p>Add Column → Custom Column. A dialog appears with a formula editor. Write an M expression in the formula box. Available columns appear in the right-hand list — double-click to insert them. Example:</p>
<pre><code>// Profit margin column
[Revenue] - [Cost]</code></pre>
<pre><code>// Full name from first + last
[First Name] & " " & [Last Name]</code></pre>
<pre><code>// Extract year from a date column
Date.Year([Order Date])</code></pre>` },
    { type: 'text', body: `<h3>Conditional Column</h3>
<p>Add Column → Conditional Column. A dialog lets you build if/else rules without writing M:</p>
<ul>
  <li>Column name: "Sales Tier"</li>
  <li>If [Sales] is greater than 10000 then "High"</li>
  <li>Else If [Sales] is greater than 5000 then "Medium"</li>
  <li>Else "Low"</li>
</ul>
<p>This generates M code like:</p>
<pre><code>if [Sales] > 10000 then "High"
else if [Sales] > 5000 then "Medium"
else "Low"</code></pre>
<h3>Column From Examples</h3>
<p>Add Column → Column From Examples → From All Columns. A column appears on the right where you type examples of the expected output. Power Query infers the pattern:</p>
<ul>
  <li>Type "ajay@example.com" → expected: "example.com" → Power Query generates: <code>Text.AfterDelimiter([Email], "@")</code></li>
  <li>Type "2024-05-15" with expected "May 2024" → generates date formatting logic automatically.</li>
</ul>` },
    { type: 'text', body: `<h3>Introduction to the M Language</h3>
<p>M (Power Query Formula Language) is a functional language designed for data transformation. Every step in Applied Steps is an M expression. The full query is a <strong>let…in</strong> expression:</p>
<pre><code>let
  Source = Excel.Workbook(File.Contents("C:\\data.xlsx"), null, true),
  Orders = Source{[Item="Orders",Kind="Table"]}[Data],
  #"Promoted Headers" = Table.PromoteHeaders(Orders, [PromoteAllScalars=true]),
  #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",
    {{"Date", type date}, {"Sales", type number}})
in
  #"Changed Type"</code></pre>
<p>Each step references the output of the previous step by name. The final step name after <code>in</code> is what the query returns. Understanding this structure lets you write steps directly in the Advanced Editor (Home → Advanced Editor) for operations no dialog supports.</p>` },
    { type: 'tip', body: `Open the <strong>Advanced Editor</strong> (Home → Advanced Editor) to see the full M script for a query. You can edit it directly — paste M from documentation, Stack Overflow, or AI assistants. This is the escape hatch for any transformation the dialog-based UI cannot express. Always click "Done" and check for syntax errors before closing.` },
    { type: 'exercise', title: 'Add a profit margin column and a tier label using M', hint: 'Use Custom Column for the margin calculation and Conditional Column for the tier', solution: `1. In Power Query, ensure your Sales query has [Revenue] and [Cost] columns.
2. Add Column → Custom Column → Name: "Profit" → Formula: [Revenue] - [Cost] → OK.
3. Add Column → Custom Column → Name: "Profit Margin %" → Formula: ([Revenue] - [Cost]) / [Revenue] → OK.
4. Change "Profit Margin %" type to Percentage (or leave as Decimal and format in the report).
5. Add Column → Conditional Column → Name: "Tier":
   - If [Profit Margin %] > 0.3 then "High Margin"
   - Else If [Profit Margin %] > 0.15 then "Medium Margin"
   - Else "Low Margin"
6. Home → Advanced Editor → review the generated M → close.
7. Close & Apply → verify new columns in Data view.` }
  ]
};

/* ─── MODULE 3 — Data Modeling ──────────────────────────────────────────── */

L['powerbi-w3-l1'] = {
  title: 'Star Schema & Snowflake Schema — Data Modeling Fundamentals',
  sections: [
    { type: 'text', body: `<h2>Why Data Modeling Matters</h2>
<p>The data model is the foundation that determines how fast your reports run, how simple your DAX formulas can be, and whether Power BI can correctly answer cross-table questions. A poor model (wide flat table, many-to-many everywhere) produces slow, error-prone reports. A good model (star schema) makes everything easier.</p>
<h3>The Star Schema</h3>
<p>A star schema has two types of tables:</p>
<ul>
  <li><strong>Fact tables</strong> — store transactional or event data: sales, orders, payments, clicks. Each row is one event. Fact tables are wide (many rows) and skinny (few columns). Columns are primarily foreign keys to dimension tables and numeric measures.</li>
  <li><strong>Dimension tables</strong> — store descriptive attributes used for filtering and grouping: products, customers, dates, regions. Each row is one entity. Dimension tables are short (fewer rows) and wide (many descriptive columns).</li>
</ul>
<p>In the Model view, a star schema looks like a star: fact table in the centre, dimension tables radiating outward. Relationships connect fact foreign keys to dimension primary keys (many-to-one).</p>` },
    { type: 'text', body: `<h3>Why Not a Flat Table?</h3>
<p>A common mistake is importing one giant denormalised flat table (all data in a single sheet with many columns). Problems:</p>
<ul>
  <li><strong>Data duplication</strong>: "CustomerName", "CustomerCity" repeat on every row for that customer — wasted memory.</li>
  <li><strong>Slow compression</strong>: VertiPaq compresses repeated values very efficiently in narrow dimension tables. Duplicated text in a wide flat table compresses poorly.</li>
  <li><strong>Fragile DAX</strong>: calculations that need to reference a dimension attribute alongside a measure are much harder to write on a flat table.</li>
  <li><strong>Maintenance burden</strong>: when a customer's name changes, you must update every row — not just one dimension row.</li>
</ul>
<h3>The Date Dimension</h3>
<p>Every Power BI model with time-series data needs a proper Date dimension table — a table with one row per calendar date and columns for Year, Quarter, Month, Week, Day, IsWeekend, IsHoliday, etc. This enables time intelligence DAX functions (TOTALYTD, SAMEPERIODLASTYEAR, etc.).</p>
<p>Mark it as a Date Table: Model view → right-click the date table → Mark as Date Table → select the date column.</p>` },
    { type: 'tip', body: `Create a Date table using DAX: Modeling → New Table → <code>DateTable = CALENDAR(DATE(2020,1,1), DATE(2026,12,31))</code>. Then add columns for Year, Month, Quarter using DAX calculated columns on the DateTable. Alternatively, use M in Power Query to generate a full date table — many templates are available online. Never use your fact table's date column as the date axis without a dedicated date dimension.` },
    { type: 'text', body: `<h3>Snowflake Schema</h3>
<p>A snowflake schema normalises dimension tables further — one dimension references another. Example: Product → Sub-Category → Category, each as a separate table linked by foreign keys.</p>
<p>Power BI supports snowflake schemas but star schemas are preferred because:</p>
<ul>
  <li>Fewer relationships = simpler DAX.</li>
  <li>Power BI's VertiPaq engine handles wide dimension tables efficiently — there is no performance benefit to normalising dimension tables as in OLTP databases.</li>
  <li>Flattening Product → Sub-Category → Category into a single Product dimension is simpler and equally performant.</li>
</ul>
<p>Only use a snowflake when the source data is normalised and flattening it would require complex Power Query joins that are harder to maintain.</p>` },
    { type: 'exercise', title: 'Design a star schema from a flat CSV', hint: 'Identify fact and dimension columns, split the flat table in Power Query, create relationships in Model view', solution: `1. Load a flat sales CSV: OrderID, Date, CustomerID, CustomerName, CustomerCity, ProductID, ProductName, Category, Quantity, UnitPrice, TotalSales.
2. In Power Query, duplicate the query twice.
3. Query 1 (Facts): keep OrderID, Date, CustomerID, ProductID, Quantity, UnitPrice, TotalSales.
4. Query 2 (Customers): keep CustomerID, CustomerName, CustomerCity → Remove Duplicates on CustomerID.
5. Query 3 (Products): keep ProductID, ProductName, Category → Remove Duplicates on ProductID.
6. Add a Date table: Modeling → New Table → DateTable = CALENDAR(MIN(Facts[Date]), MAX(Facts[Date])).
7. Model view → create relationships:
   - Facts[CustomerID] → Customers[CustomerID] (many-to-one)
   - Facts[ProductID] → Products[ProductID] (many-to-one)
   - Facts[Date] → DateTable[Date] (many-to-one)
8. Mark DateTable as the Date Table.` }
  ]
};

L['powerbi-w3-l2'] = {
  title: 'Relationships — Cardinality, Direction & Managing Ambiguity',
  sections: [
    { type: 'text', body: `<h2>Relationships in Power BI</h2>
<p>Relationships define how tables connect. When you filter one table, related tables are filtered automatically — this is the foundation of cross-table DAX and cross-visual filtering.</p>
<h3>Creating Relationships</h3>
<p>In Model view: drag from one column to another to create a relationship. Or Home → Manage Relationships → New. Power BI's auto-detect attempts to find relationships on load (Home → Manage Relationships → Autodetect).</p>
<h3>Cardinality</h3>
<ul>
  <li><strong>Many-to-One (*:1)</strong> — each row in the fact table matches one row in the dimension. The most common and recommended cardinality. Example: many sales rows, one product per sale.</li>
  <li><strong>One-to-One (1:1)</strong> — each row in one table matches exactly one row in the other. Rare; usually the tables should be merged.</li>
  <li><strong>Many-to-Many (*:*)</strong> — rows on both sides can match multiple rows on the other. Supported in Power BI but requires a bridge table or composite model. Avoid unless necessary — it complicates DAX and produces unexpected filter behaviour.</li>
</ul>` },
    { type: 'text', body: `<h3>Cross-Filter Direction</h3>
<ul>
  <li><strong>Single (→)</strong> — filters flow from the "one" side (dimension) to the "many" side (fact). This is the default and recommended direction. Dimension filters the fact, not the other way around.</li>
  <li><strong>Both (↔)</strong> — filters flow in both directions. The fact table can filter the dimension. Can cause ambiguity ("which path should the filter take?") and unexpected results with DAX. Only enable when required for a specific use case.</li>
</ul>
<p>In a star schema: all relationships should be Single direction, flowing from dimensions to the fact table. This creates a clean, unambiguous filter context for all DAX measures.</p>
<h3>Active vs Inactive Relationships</h3>
<p>Power BI only allows one <em>active</em> relationship between two tables at a time. If a fact table has two date columns (OrderDate and ShipDate), both connecting to the DateTable, one must be active and the other inactive.</p>
<p>Use the <strong>USERELATIONSHIP</strong> DAX function to activate an inactive relationship within a measure:</p>
<pre><code>Shipped Sales = CALCULATE(SUM(Sales[Amount]), USERELATIONSHIP(Sales[ShipDate], DateTable[Date]))</code></pre>` },
    { type: 'tip', body: `If you see unexpected totals in a visual — measures returning values you don't expect when filtered — the first thing to check is <strong>relationship direction</strong>. Open Model view, click the relationship line, and verify the cross-filter direction. A bi-directional relationship where single is expected is the most common source of "my filter isn't working" bugs.` },
    { type: 'text', body: `<h3>Role-Playing Dimensions</h3>
<p>A "role-playing dimension" is a dimension table that serves multiple roles in a fact table. The Date table is the most common example — a sales fact might have OrderDate, ShipDate, and DeliveryDate, all referencing the same Date table.</p>
<p>Power BI's approach: create multiple inactive relationships (one per date column), make the most common one active, and use USERELATIONSHIP in measures for the others. Alternatively, create multiple copies of the Date table (DateOrder, DateShip, DateDelivery) — more memory but simpler DAX and model diagram.</p>` },
    { type: 'exercise', title: 'Create and validate a star schema with two date roles', hint: 'Add OrderDate and ShipDate relationships to the Date table, make one active, write a USERELATIONSHIP measure', solution: `1. Ensure your model has: Sales (OrderDate, ShipDate, Amount), DateTable (Date).
2. Model view → drag Sales[OrderDate] to DateTable[Date] → relationship created (active by default).
3. Drag Sales[ShipDate] to DateTable[Date] → second relationship (inactive — shown as dashed line).
4. Modeling → New Measure:
   Shipped Amount = CALCULATE(SUM(Sales[Amount]), USERELATIONSHIP(Sales[ShipDate], DateTable[Date]))
5. Report view: add a matrix with DateTable[Year] on rows, SUM(Sales[Amount]) and [Shipped Amount] as values.
6. Both measures should show for each year — Amount uses OrderDate, Shipped Amount uses ShipDate.
7. Confirm by checking: orders placed in December but shipped in January should appear in year N for Amount and year N+1 for Shipped Amount.` }
  ]
};

L['powerbi-w3-l3'] = {
  title: 'Calculated Columns vs Measures — When to Use Each',
  sections: [
    { type: 'text', body: `<h2>Two Ways to Add Calculations to Your Model</h2>
<p>Power BI has two mechanisms for adding new fields derived from existing data: <strong>Calculated Columns</strong> and <strong>Measures</strong>. They look similar but behave very differently — choosing the wrong one causes performance problems and incorrect results.</p>
<h3>Calculated Columns</h3>
<p>Created via: Modeling → New Column (or right-click a table in the Fields pane → New Column).</p>
<p>A calculated column:</p>
<ul>
  <li>Is computed <strong>row by row</strong> at model refresh time (not at report query time).</li>
  <li>Is stored physically in the model — it occupies RAM and increases .pbix file size.</li>
  <li>Evaluates in <strong>row context</strong> — each row can reference other columns in the same row.</li>
  <li>Appears as a new column in Data view with a calculator icon.</li>
  <li>Can be used as an axis, legend, slicer, or filter field (like any regular column).</li>
</ul>
<pre><code>// Example calculated column on the Sales table
Profit = Sales[Revenue] - Sales[Cost]

// Profit Margin %
Profit Margin = DIVIDE(Sales[Revenue] - Sales[Cost], Sales[Revenue])</code></pre>` },
    { type: 'text', body: `<h3>Measures</h3>
<p>Created via: Modeling → New Measure (or right-click a table → New Measure).</p>
<p>A measure:</p>
<ul>
  <li>Is computed <strong>dynamically</strong> at query time, in response to the current filter context.</li>
  <li>Is <strong>not stored</strong> — it takes no RAM at rest (only CPU when evaluated).</li>
  <li>Evaluates in <strong>filter context</strong> — it operates on the set of rows passing all active filters.</li>
  <li>Appears in the Fields pane with a calculator icon but <em>cannot</em> be used as an axis or slicer — only as a value.</li>
  <li>Must be an aggregation (returns a scalar, not a column).</li>
</ul>
<pre><code>// Simple measure
Total Sales = SUM(Sales[Revenue])

// Dynamic ratio — recalculates per filter context
Profit Margin % = DIVIDE(SUM(Sales[Revenue]) - SUM(Sales[Cost]), SUM(Sales[Revenue]))</code></pre>` },
    { type: 'tip', body: `Default rule: <strong>prefer measures over calculated columns</strong>. Measures are computed on demand and do not consume RAM at rest. Use calculated columns only when you need to: (1) use the result as an axis, legend, or slicer, (2) reference the value in a relationship, or (3) use it in a Power Query Merge. If it's just a number you want to summarise in a visual, it's a measure.` },
    { type: 'text', body: `<h3>Decision Framework</h3>
<table>
  <tr><th>Scenario</th><th>Use</th></tr>
  <tr><td>Concatenate First Name + Last Name for display</td><td>Calculated Column (used as axis/label)</td></tr>
  <tr><td>Total sales in a card or bar chart value</td><td>Measure</td></tr>
  <tr><td>Segment customers into "High/Medium/Low" for a slicer</td><td>Calculated Column (used as slicer)</td></tr>
  <tr><td>Year-over-year % growth shown in a visual</td><td>Measure (dynamic, changes with filter)</td></tr>
  <tr><td>Profit = Revenue - Cost (per-row arithmetic)</td><td>Calculated Column (if used as axis) or Measure (if only ever summed)</td></tr>
  <tr><td>Running total, rank, or time intelligence</td><td>Always a Measure</td></tr>
</table>
<h3>Measure Tables</h3>
<p>Best practice: create a dedicated empty table (Modeling → New Table → <code>_Measures = {0}</code>) and store all your measures in it. This keeps the Fields pane organised and makes it obvious that these are calculations, not columns from a source table. Hide the "Value" column from the _Measures table.</p>` },
    { type: 'exercise', title: 'Create a profit column and a dynamic profit measure', hint: 'Add a calculated column for per-row profit, then a measure for aggregate profit ratio', solution: `1. In Data view, click the Sales table.
2. Modeling → New Column:
   Profit = Sales[Revenue] - Sales[Cost]
3. Verify: Data view shows Profit column with per-row values.
4. Modeling → New Measure:
   Total Profit = SUM(Sales[Profit])
5. Modeling → New Measure:
   Profit Margin % = DIVIDE([Total Profit], SUM(Sales[Revenue]), 0)
6. Report view: add a Card visual → drag [Profit Margin %] → format as percentage.
7. Add a slicer on [Region] → notice the margin updates per region.
8. Add a calculated column for categorisation:
   Profit Tier = IF(Sales[Profit Margin] > 0.3, "High", IF(Sales[Profit Margin] > 0.15, "Medium", "Low"))
9. Use [Profit Tier] as a slicer — this works only because it is a column, not a measure.` }
  ]
};

L['powerbi-w3-l4'] = {
  title: 'Introduction to DAX — SUM, COUNT, AVERAGE & DISTINCTCOUNT',
  sections: [
    { type: 'text', body: `<h2>What is DAX?</h2>
<p>DAX (Data Analysis Expressions) is the formula language used in Power BI for measures, calculated columns, and calculated tables. It is also used in Power Pivot (Excel) and Azure Analysis Services — the same formulas work across all three.</p>
<p>DAX looks superficially like Excel formulas, but it operates on entire columns and tables rather than individual cells. The key shift in thinking: DAX formulas always return a scalar (a single value) or a table, never a range like Excel's SUM(A1:A10).</p>
<h3>Basic Aggregation Functions</h3>
<ul>
  <li><code>SUM(column)</code> — sum of all values in a column (in current filter context).</li>
  <li><code>COUNT(column)</code> — count of non-blank rows in a column.</li>
  <li><code>COUNTA(column)</code> — count of non-blank rows in any data type column (text, dates, etc.).</li>
  <li><code>COUNTROWS(table)</code> — count of rows in a table (respects filters).</li>
  <li><code>AVERAGE(column)</code> — arithmetic mean of numeric values.</li>
  <li><code>MIN(column)</code> / <code>MAX(column)</code> — minimum / maximum value.</li>
  <li><code>DISTINCTCOUNT(column)</code> — count of unique values (ignores blanks).</li>
</ul>` },
    { type: 'text', body: `<h3>Writing Your First Measures</h3>
<pre><code>// Total number of orders
Order Count = COUNTROWS(Sales)

// Unique customers
Unique Customers = DISTINCTCOUNT(Sales[CustomerID])

// Average order value
Avg Order Value = AVERAGE(Sales[OrderAmount])

// Minimum and maximum sale
Min Sale = MIN(Sales[OrderAmount])
Max Sale = MAX(Sales[OrderAmount])</code></pre>
<h3>DIVIDE — Safe Division</h3>
<p>Never use the <code>/</code> operator for division in DAX — if the denominator is zero or blank, it returns an error. Use <code>DIVIDE(numerator, denominator, [alternate_result])</code> instead:</p>
<pre><code>// Returns 0 if denominator is 0 (instead of divide-by-zero error)
Return Rate = DIVIDE(COUNTROWS(Returns), COUNTROWS(Sales), 0)</code></pre>
<h3>Implicit vs Explicit Measures</h3>
<p>When you drag a numeric column to a visual's value field, Power BI creates an <em>implicit</em> measure (SUM by default). These are convenient but:</p>
<ul>
  <li>They cannot be referenced by other measures.</li>
  <li>They cannot be formatted individually.</li>
  <li>They appear cluttered in complex models.</li>
</ul>
<p>Best practice: always create explicit measures (Modeling → New Measure) and hide raw numeric columns from the report view so users cannot accidentally create implicit aggregations.</p>` },
    { type: 'tip', body: `Write all measures using the <strong>measure = expression</strong> format with the measure name on the left and the DAX expression on the right, and always include meaningful names. "Sales" is a bad measure name — is it total sales, sales count, or average sale? "Total Sales Amount" is unambiguous. Consistent naming prevents confusion in large models with dozens of measures.` },
    { type: 'text', body: `<h3>Formatting Measures</h3>
<p>After creating a measure, the "Measure tools" tab appears in the ribbon when the measure is selected in the Fields pane. Use it to:</p>
<ul>
  <li>Set the format: Currency, Percentage, Whole Number, Decimal, Custom.</li>
  <li>Set the Home Table (which table the measure appears under in the Fields pane).</li>
  <li>Set the Description (tooltip shown in the Fields pane on hover).</li>
</ul>
<p>Currency measures should be formatted as Currency with 2 decimal places. Ratios should be Percentage. Counts should be Whole Number. Setting formats on measures avoids the need to format every visual that uses them.</p>` },
    { type: 'exercise', title: 'Build a KPI card row using basic aggregation measures', hint: 'Create measures for Total Sales, Order Count, Unique Customers, and Avg Order Value, then display them as cards', solution: `1. Modeling → New Table → _Measures = {0} → hide the "Value" column.
2. Click the _Measures table → New Measure:
   Total Sales = SUM(Sales[OrderAmount])
   (Format: Currency, 2 decimal places)
3. New Measure: Order Count = COUNTROWS(Sales) (Format: Whole Number)
4. New Measure: Unique Customers = DISTINCTCOUNT(Sales[CustomerID]) (Format: Whole Number)
5. New Measure: Avg Order Value = DIVIDE([Total Sales], [Order Count], 0) (Format: Currency)
6. Report view: add 4 Card visuals in a row, one for each measure.
7. Format each card: turn off title, set font size to 24, background to a subtle grey.
8. Add a Year slicer → verify all four cards update when you filter to a year.` }
  ]
};

L['powerbi-w3-l5'] = {
  title: 'CALCULATE & FILTER — The Heart of DAX',
  sections: [
    { type: 'text', body: `<h2>CALCULATE</h2>
<p>CALCULATE is the most important and most used function in DAX. It evaluates an expression in a <em>modified filter context</em>. The syntax:</p>
<pre><code>CALCULATE(expression, filter1, filter2, ...)</code></pre>
<p>The <code>expression</code> is any DAX expression (usually an aggregation like SUM). The filters modify the filter context before the expression is evaluated. CALCULATE can:</p>
<ul>
  <li><strong>Add a filter</strong>: restrict the data further.</li>
  <li><strong>Remove a filter</strong>: ignore a slicer or visual filter (using ALL).</li>
  <li><strong>Replace a filter</strong>: change what values a column is filtered to.</li>
</ul>
<pre><code>// Sales of only the "Technology" category — ignores what category the user filtered
Technology Sales = CALCULATE(SUM(Sales[Amount]), Products[Category] = "Technology")

// Sales in the West region specifically
West Sales = CALCULATE(SUM(Sales[Amount]), Regions[Region] = "West")</code></pre>` },
    { type: 'text', body: `<h3>ALL — Removing Filters</h3>
<p><code>ALL(table or column)</code> removes all filters from a table or specific column. Use it inside CALCULATE to create measures that ignore certain filters:</p>
<pre><code>// Total Sales ignoring all filters (useful for % of total calculations)
Total Sales All = CALCULATE(SUM(Sales[Amount]), ALL(Sales))

// % of Grand Total
% of Total = DIVIDE(SUM(Sales[Amount]), CALCULATE(SUM(Sales[Amount]), ALL(Sales)), 0)

// % of total, but only ignoring Category (still filters by Region from slicer)
% of Category Total = DIVIDE(
  SUM(Sales[Amount]),
  CALCULATE(SUM(Sales[Amount]), ALL(Products[Category])),
  0
)</code></pre>
<h3>FILTER</h3>
<p><code>FILTER(table, condition)</code> returns a table containing only rows where the condition is true. Use it inside CALCULATE when the filter is more complex than a simple column = value comparison:</p>
<pre><code>// Sales where individual order amount > 1000
High Value Sales = CALCULATE(
  SUM(Sales[Amount]),
  FILTER(Sales, Sales[Amount] > 1000)
)

// Average sales for customers who have ordered more than 5 times
CALCULATE(
  AVERAGE(Sales[Amount]),
  FILTER(Customers, CALCULATE(COUNTROWS(Sales)) > 5)
)</code></pre>` },
    { type: 'tip', body: `For simple column equality filters inside CALCULATE, prefer the direct syntax (<code>Table[Column] = "Value"</code>) over <code>FILTER(Table, Table[Column] = "Value")</code>. The direct syntax is more readable and Power BI optimises it better. Use FILTER only when you need row-by-row evaluation — e.g. comparing a column value to a calculated result rather than a constant.` },
    { type: 'text', body: `<h3>ALLEXCEPT</h3>
<p><code>ALLEXCEPT(table, column1, column2, ...)</code> removes all filters from a table <em>except</em> the specified columns. Useful for "% of subtotal within group" calculations:</p>
<pre><code>// % of sales within each Region (ignores Category filter, keeps Region filter)
% of Region = DIVIDE(
  SUM(Sales[Amount]),
  CALCULATE(SUM(Sales[Amount]), ALLEXCEPT(Sales, Regions[Region])),
  0
)</code></pre>
<h3>A Mental Model for CALCULATE</h3>
<ol>
  <li>Start with the current filter context (slicers, visual axes, other CALCULATE wrappers).</li>
  <li>Apply each filter argument to modify that context (add/remove/replace filters).</li>
  <li>Evaluate the expression inside that modified context.</li>
  <li>Return the scalar result.</li>
</ol>
<p>This mental model explains all CALCULATE behaviour, no matter how complex the nesting.</p>` },
    { type: 'exercise', title: 'Build a % of total and a category-specific measure using CALCULATE', hint: 'Use ALL for the denominator in a ratio measure, and a column filter for a category-specific total', solution: `1. In the _Measures table:
   % of Grand Total = DIVIDE(
     SUM(Sales[Amount]),
     CALCULATE(SUM(Sales[Amount]), ALL(Sales)),
     0
   )
   (Format as Percentage, 1 decimal place)

2. Technology Sales = CALCULATE(SUM(Sales[Amount]), Products[Category] = "Technology")

3. Report view: add a matrix with Products[Category] on rows.
4. Values: [Total Sales], [% of Grand Total], [Technology Sales].
5. Observe: [% of Grand Total] sums to 100% across all categories.
6. [Technology Sales] is the same value for every row — it ignores the row filter.
7. Add a Region slicer → [% of Grand Total] recalculates within the region (denominator still ignores Region because ALL(Sales) removes all filters).
8. Change to: CALCULATE(SUM(Sales[Amount]), ALL(Products[Category])) → now the denominator respects Region but ignores Category.` }
  ]
};

/* ─── MODULE 4 — DAX Deep Dive ───────────────────────────────────────────── */

L['powerbi-w4-l1'] = {
  title: 'Row Context vs Filter Context',
  sections: [
    { type: 'text', body: `<h2>The Two Contexts</h2>
<p>Understanding evaluation context is the single most important concept in DAX. Every DAX expression evaluates within a context that determines which rows are included in the calculation. There are two types:</p>
<h3>Filter Context</h3>
<p>Filter context is the set of filters active when a measure is evaluated. It is established by:</p>
<ul>
  <li>Slicers on the report page.</li>
  <li>Visual axes and legends (a bar chart grouped by Region applies a Region filter to each bar's measure).</li>
  <li>The Filters pane (visual-level, page-level, report-level filters).</li>
  <li>CALCULATE calls in DAX that modify the context explicitly.</li>
</ul>
<p>Every measure lives in filter context. When you write <code>Total Sales = SUM(Sales[Amount])</code>, the SUM operates only on rows that pass the current filter context — nothing more.</p>
<h3>Row Context</h3>
<p>Row context exists when DAX iterates over a table row by row. It is established by:</p>
<ul>
  <li><strong>Calculated columns</strong> — each row of the table is processed in its own row context, giving access to that row's column values.</li>
  <li><strong>Iterator functions</strong>: SUMX, AVERAGEX, MINX, MAXX, COUNTAX, FILTER, ADDCOLUMNS, etc. — these iterate over a table and evaluate an expression for each row.</li>
</ul>` },
    { type: 'text', body: `<h3>Context Transition</h3>
<p>Context transition is when a row context is automatically converted into an equivalent filter context. This happens when you call CALCULATE inside a calculated column or an iterator function.</p>
<pre><code>// Calculated column — row context
Sales[Customer Total] =
  CALCULATE(SUM(Sales[Amount]))
  // CALCULATE triggers context transition:
  // the current row's CustomerID value becomes a filter,
  // so this returns total sales for the customer on that row.</code></pre>
<p>Without CALCULATE, a measure inside a calculated column evaluates in filter context only (no row context active for the measure). With CALCULATE, the row context of the calculated column transitions into a filter context that includes "CustomerID = this row's CustomerID".</p>
<h3>Iterator Functions</h3>
<p>SUMX iterates over each row of a table and evaluates an expression per row, then sums the results:</p>
<pre><code>// Line-item profit: Revenue × Margin per row, then sum
Total Profit = SUMX(Sales, Sales[Revenue] * Sales[Margin %])

// Weighted average price
Avg Price Weighted = DIVIDE(SUMX(Sales, Sales[Qty] * Sales[UnitPrice]), SUM(Sales[Qty]))</code></pre>
<p>Use SUMX (not SUM) when the calculation involves per-row arithmetic before aggregation. SUM(Sales[Revenue] * Sales[Margin]) would fail because you cannot multiply columns directly inside SUM — SUM only takes a single column.</p>` },
    { type: 'tip', body: `A common mistake: writing <code>SUM(Sales[Revenue]) - SUM(Sales[Cost])</code> vs <code>SUMX(Sales, Sales[Revenue] - Sales[Cost])</code>. The first computes (total revenue) minus (total cost) = correct for profit. The second computes (per-row revenue minus per-row cost), then sums = also profit. Both give the same answer here. They differ when rows have different patterns — use SUMX when the per-row calculation matters before aggregation.` },
    { type: 'text', body: `<h3>Common Context Mistakes</h3>
<p><strong>Mistake 1: Expecting a measure to work like a calculated column.</strong><br>
A measure does not have row context. <code>SUM(Sales[Amount]) * Sales[Discount]</code> inside a measure will error because <code>Sales[Discount]</code> expects row context. Fix: use SUMX to iterate.</p>
<p><strong>Mistake 2: Using ALL inside a calculated column.</strong><br>
ALL only removes filter context — it has no effect inside a calculated column where the context is row-based. The fix is usually to restructure as a measure.</p>
<p><strong>Mistake 3: Forgetting that CALCULATE triggers context transition.</strong><br>
Inside an iterator (like SUMX), if you wrap an expression in CALCULATE, the current row context transitions to a filter. This is powerful but can produce unexpected results if misunderstood.</p>` },
    { type: 'exercise', title: 'Write SUMX measures and observe context differences', hint: 'Build a Total Revenue measure, a per-row SUMX profit measure, and compare them in a matrix', solution: `1. Ensure Sales has: Amount, UnitCost, Quantity columns.
2. New Measure: Total Revenue = SUM(Sales[Amount])
3. New Measure: Total Profit SUMX = SUMX(Sales, Sales[Amount] - (Sales[UnitCost] * Sales[Quantity]))
4. New Measure: Total Profit Columns = SUM(Sales[Amount]) - SUM(Sales[UnitCost] * Sales[Quantity])
   // This will error — can't multiply columns inside SUM directly
   // Fix: = SUM(Sales[Amount]) - SUMX(Sales, Sales[UnitCost] * Sales[Quantity])
5. Add a matrix with Products[Category] on rows, both profit measures as values.
6. Observe: results match at the total level; may differ at the row level if data has different patterns.
7. Add a calculated column: Sales[Row Profit] = Sales[Amount] - Sales[UnitCost] * Sales[Quantity]
8. New Measure: Total Profit Col = SUM(Sales[Row Profit]) — compare to SUMX version.` }
  ]
};

L['powerbi-w4-l2'] = {
  title: 'Time Intelligence — TOTALYTD, SAMEPERIODLASTYEAR & DATEADD',
  sections: [
    { type: 'text', body: `<h2>Time Intelligence in DAX</h2>
<p>Time intelligence functions compute measures relative to time periods: year-to-date totals, prior period comparisons, rolling averages. They require a <strong>proper Date table</strong> marked as the Date Table in Model view, with a contiguous sequence of dates (no missing days).</p>
<h3>Prerequisites</h3>
<ul>
  <li>A Date table with a primary key column containing one row per calendar date.</li>
  <li>The table is marked as a Date Table (right-click the table in Model view → Mark as Date Table → select the date column).</li>
  <li>The Date table is connected to your fact table via a Many-to-One relationship on the date column.</li>
  <li>The date column in the Date table has <strong>no gaps</strong> — every date in the range must exist, including weekends and holidays.</li>
</ul>
<h3>Year-to-Date</h3>
<pre><code>// Cumulative sales from Jan 1 to the latest date in the current filter
Sales YTD = TOTALYTD(SUM(Sales[Amount]), DateTable[Date])

// With custom fiscal year end (e.g. 31 March)
Sales Fiscal YTD = TOTALYTD(SUM(Sales[Amount]), DateTable[Date], "03-31")</code></pre>
<p>TOTALYTD is equivalent to: <code>CALCULATE(SUM(Sales[Amount]), DATESYTD(DateTable[Date]))</code></p>` },
    { type: 'text', body: `<h3>Prior Period Comparisons</h3>
<pre><code>// Sales in the same period last year
Sales LY = CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(DateTable[Date]))

// Year-over-year growth %
YoY Growth % = DIVIDE(
  SUM(Sales[Amount]) - [Sales LY],
  [Sales LY],
  0
)

// Sales in the prior month
Sales PM = CALCULATE(SUM(Sales[Amount]), PREVIOUSMONTH(DateTable[Date]))

// Sales in the prior quarter
Sales PQ = CALCULATE(SUM(Sales[Amount]), PREVIOUSQUARTER(DateTable[Date]))</code></pre>
<h3>DATEADD — Flexible Period Shifting</h3>
<p>DATEADD shifts the current date context by a specified number of intervals:</p>
<pre><code>// Sales 3 months ago
Sales 3M Ago = CALCULATE(SUM(Sales[Amount]), DATEADD(DateTable[Date], -3, MONTH))

// Sales 1 year ago (equivalent to SAMEPERIODLASTYEAR)
Sales 1Y Ago = CALCULATE(SUM(Sales[Amount]), DATEADD(DateTable[Date], -1, YEAR))

// Sales 2 quarters ahead (forecast comparison)
Sales Next 2Q = CALCULATE(SUM(Sales[Amount]), DATEADD(DateTable[Date], 2, QUARTER))</code></pre>` },
    { type: 'tip', body: `Time intelligence functions <strong>do not work on DirectQuery models</strong> unless the date table is imported (composite model). They also fail silently if the Date table is not properly marked, or if the date column has gaps. If TOTALYTD returns blank or wrong values, the first check is: right-click the Date table → Mark as Date Table — is it marked? Is the correct date column selected?` },
    { type: 'text', body: `<h3>Rolling Averages</h3>
<pre><code>// 3-month rolling average of sales
Rolling 3M Avg =
VAR LastDate = MAX(DateTable[Date])
VAR StartDate = DATEADD(DateTable[Date], -2, MONTH)
RETURN
  CALCULATE(
    AVERAGEX(
      VALUES(DateTable[Month]),
      [Total Sales]
    ),
    DATESBETWEEN(DateTable[Date], EOMONTH(StartDate, -1) + 1, LastDate)
  )</code></pre>
<h3>MTD / QTD</h3>
<pre><code>// Month-to-date
Sales MTD = TOTALMTD(SUM(Sales[Amount]), DateTable[Date])

// Quarter-to-date
Sales QTD = TOTALQTD(SUM(Sales[Amount]), DateTable[Date])</code></pre>` },
    { type: 'exercise', title: 'Build a YTD, LY, and YoY% measure suite', hint: 'Create the three measures and display them in a line chart and matrix with date on the axis', solution: `1. Ensure DateTable is marked as Date Table.
2. New Measure: Sales YTD = TOTALYTD(SUM(Sales[Amount]), DateTable[Date])
3. New Measure: Sales LY = CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(DateTable[Date]))
4. New Measure: YoY % = DIVIDE([Total Sales] - [Sales LY], [Sales LY], 0)
   (Format: Percentage, 1 decimal)
5. Add a line chart: X-axis = DateTable[Month] (Month Name), Values = [Total Sales] + [Sales LY].
6. Add a matrix: Rows = DateTable[Year], Columns = DateTable[Month Number].
   Values = [Total Sales], [Sales YTD], [Sales LY], [YoY %].
7. Verify: Sales YTD should accumulate month over month, resetting at year boundary.
8. Verify: YoY% for January 2024 = ([Jan 2024 Sales] - [Jan 2023 Sales]) / [Jan 2023 Sales].` }
  ]
};

L['powerbi-w4-l3'] = {
  title: 'Ranking & Conditional Logic — RANKX, TOPN, SWITCH & SELECTEDVALUE',
  sections: [
    { type: 'text', body: `<h2>RANKX</h2>
<p>RANKX ranks a value within a table based on a specified expression. Syntax:</p>
<pre><code>RANKX(table, expression, [value], [order], [ties])</code></pre>
<pre><code>// Rank products by total sales (1 = highest)
Product Sales Rank =
RANKX(
  ALL(Products[ProductName]),
  [Total Sales],
  ,
  DESC,
  DENSE
)
</code></pre>
<ul>
  <li><strong>table</strong>: the table to rank over — usually ALL(dimension column) to rank over all members regardless of filter.</li>
  <li><strong>expression</strong>: the measure to rank by.</li>
  <li><strong>value</strong>: (optional) the specific value to rank. Omit to rank the current context's value.</li>
  <li><strong>order</strong>: ASC (smallest = rank 1) or DESC (largest = rank 1, default).</li>
  <li><strong>ties</strong>: SKIP (1,2,2,4) or DENSE (1,2,2,3, default).</li>
</ul>` },
    { type: 'text', body: `<h3>TOPN</h3>
<p>TOPN returns a table of the top N rows by a specified expression:</p>
<pre><code>// Top 5 customers by sales (returns a table)
Top 5 Customers = TOPN(5, Customers, [Total Sales], DESC)

// Use inside CALCULATE to filter to top N
Top 5 Sales = CALCULATE(
  [Total Sales],
  TOPN(5, ALL(Customers[CustomerID]), [Total Sales], DESC)
)</code></pre>
<h3>SWITCH</h3>
<p>SWITCH evaluates an expression against a list of values and returns the matching result. Cleaner than nested IF for multiple conditions:</p>
<pre><code>// Based on a slicer selection
Metric Label = SWITCH(
  SELECTEDVALUE(MetricPicker[Metric]),
  "Sales", "Total Revenue",
  "Profit", "Net Profit",
  "Quantity", "Units Sold",
  "Unknown"  // else/default
)

// SWITCH TRUE() pattern — evaluate conditions
Sales Tier Label = SWITCH(
  TRUE(),
  [Total Sales] > 1000000, "Platinum",
  [Total Sales] > 500000,  "Gold",
  [Total Sales] > 100000,  "Silver",
  "Bronze"
)</code></pre>` },
    { type: 'text', body: `<h3>SELECTEDVALUE</h3>
<p>SELECTEDVALUE returns the single value of a column when exactly one value is in the filter context. If multiple values or no value is selected, it returns the alternate result (default: BLANK):</p>
<pre><code>// Returns the selected region name (blank if multiple selected)
Selected Region = SELECTEDVALUE(Regions[Region], "All Regions")

// Dynamic measure based on slicer selection
Dynamic Metric =
VAR selected = SELECTEDVALUE(MetricTable[MetricName])
RETURN
  SWITCH(
    selected,
    "Sales",    [Total Sales],
    "Profit",   [Total Profit],
    "Quantity", [Total Quantity],
    [Total Sales]
  )</code></pre>
<p>This pattern — a MetricTable with metric names, a slicer on the report, and SELECTEDVALUE in a measure — creates a dynamic metric switcher that lets users toggle between KPIs without changing visuals.</p>` },
    { type: 'tip', body: `For the dynamic metric switcher, create a disconnected table (not related to any fact/dimension) containing metric names. Use Get data → Enter Data or Modeling → New Table: <code>MetricTable = {"Sales", "Profit", "Quantity"}</code>. Since it is disconnected, selecting a value in the slicer does not filter the model — it only sets SELECTEDVALUE, which your measure reads.` },
    { type: 'exercise', title: 'Build a product rank column and a dynamic metric switcher', hint: 'Use RANKX with ALL for ranking, create a disconnected MetricTable, and write a SWITCH/SELECTEDVALUE measure', solution: `1. New Measure:
   Product Rank = RANKX(ALL(Products[ProductName]), [Total Sales], , DESC, DENSE)
2. Add a table visual: Products[ProductName], [Total Sales], [Product Rank].
3. Sort by [Product Rank] ascending — verify top product = rank 1.
4. Modeling → New Table:
   MetricTable = DATATABLE("MetricName", STRING, {{"Sales"}, {"Profit"}, {"Quantity"}})
5. New Measure:
   Dynamic KPI = SWITCH(
     SELECTEDVALUE(MetricTable[MetricName], "Sales"),
     "Sales", [Total Sales],
     "Profit", [Total Profit],
     "Quantity", SUM(Sales[Quantity]),
     [Total Sales]
   )
6. Add a slicer on MetricTable[MetricName] (single select).
7. Add a bar chart with Products[Category] on axis, [Dynamic KPI] as value.
8. Switching the slicer changes the bar chart metric.` }
  ]
};

L['powerbi-w4-l4'] = {
  title: 'Variables in DAX — VAR/RETURN Pattern',
  sections: [
    { type: 'text', body: `<h2>Why Use Variables?</h2>
<p>DAX variables (introduced in Power BI 2015) solve two problems: readability and performance.</p>
<ul>
  <li><strong>Readability</strong>: complex nested expressions become readable step-by-step logic.</li>
  <li><strong>Performance</strong>: a variable is evaluated once and cached. If you reference a complex subexpression multiple times in a measure, using a variable computes it once instead of N times.</li>
</ul>
<h3>VAR / RETURN Syntax</h3>
<pre><code>Measure Name =
VAR variable1 = expression1
VAR variable2 = expression2
RETURN
  result_expression_using_variables</code></pre>
<p>Rules:</p>
<ul>
  <li>Each VAR creates a named value. Variable names cannot contain spaces (use underscores or camelCase).</li>
  <li>Variables are evaluated lazily — only when referenced in RETURN.</li>
  <li>Variables are scoped to the measure — they cannot be shared across measures.</li>
  <li>RETURN must be the last statement. Everything after RETURN is the result.</li>
</ul>` },
    { type: 'text', body: `<h3>Practical Examples</h3>
<pre><code>// Without VAR — hard to read, duplicated subexpression
YoY % (no var) = DIVIDE(
  SUM(Sales[Amount]) - CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(DateTable[Date])),
  CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(DateTable[Date])),
  0
)

// With VAR — clear and computes SAMEPERIODLASTYEAR once
YoY % =
VAR CurrentSales = SUM(Sales[Amount])
VAR PriorYearSales = CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(DateTable[Date]))
RETURN
  DIVIDE(CurrentSales - PriorYearSales, PriorYearSales, 0)</code></pre>
<pre><code>// Conditional logic with early return
Trend Arrow =
VAR Change = [YoY %]
RETURN
  IF(ISBLANK(Change), "—",
     IF(Change > 0, "↑ " & FORMAT(Change, "0.0%"),
        "↓ " & FORMAT(ABS(Change), "0.0%"))
  )</code></pre>` },
    { type: 'tip', body: `Use variables to <strong>capture filter context at a point in time</strong>. Inside an iterator like SUMX, a variable defined before the iterator captures the outer filter context — whereas the same expression inside the iterator would use the row context. This distinction is subtle but critical for patterns like "sales rank within overall dataset" vs "sales rank within current row's group".` },
    { type: 'text', body: `<h3>Variables for Debugging</h3>
<p>Variables are invaluable for debugging DAX. When a measure returns an unexpected result, break it into VAR steps and return each intermediate variable to see where the logic goes wrong:</p>
<pre><code>// Debug version — return CurrentSales to verify it
Debug Measure =
VAR CurrentSales = SUM(Sales[Amount])
VAR PriorYearSales = CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(DateTable[Date]))
VAR Delta = CurrentSales - PriorYearSales
RETURN CurrentSales  // temporarily return just this to check its value
// Then change to: RETURN PriorYearSales
// Then change to: RETURN Delta
// Then restore the full expression</code></pre>
<h3>ISINSCOPE</h3>
<p>Combine VAR with ISINSCOPE to change measure behaviour based on the visual hierarchy level:</p>
<pre><code>Conditional Total =
VAR isDetail = ISINSCOPE(Products[ProductName])
RETURN
  IF(isDetail, [Total Sales], [Total Sales] * 1.1)  // add 10% uplift at totals</code></pre>` },
    { type: 'exercise', title: 'Refactor a nested YoY measure using VAR', hint: 'Take a working but unreadable YoY measure and rewrite it with named variables', solution: `1. Start with this unreadable measure:
   YoY Ugly = DIVIDE(
     SUM(Sales[Amount]) - CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(DateTable[Date])),
     CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(DateTable[Date])), 0)

2. Rewrite with VAR:
   YoY Clean =
   VAR ThisYear = SUM(Sales[Amount])
   VAR LastYear = CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(DateTable[Date]))
   VAR Change = ThisYear - LastYear
   VAR Rate = DIVIDE(Change, LastYear, 0)
   RETURN Rate

3. Add a formatted version:
   YoY Display =
   VAR Rate = [YoY Clean]
   RETURN
     IF(ISBLANK(Rate), "No prior data",
        IF(Rate >= 0, "▲ " & FORMAT(Rate, "+0.0%;-0.0%"), "▼ " & FORMAT(ABS(Rate), "0.0%")))

4. Add both [YoY Clean] and [YoY Display] to a table visual. Verify they match.` }
  ]
};

L['powerbi-w4-l5'] = {
  title: 'Advanced DAX Patterns — Rolling Averages, Pareto & YoY%',
  sections: [
    { type: 'text', body: `<h2>Rolling Average</h2>
<p>A rolling (moving) average smooths out short-term fluctuations. For a 3-month rolling average:</p>
<pre><code>Rolling 3M Avg =
VAR LastDate = MAX(DateTable[Date])
VAR RollingStart = DATEADD(LASTDATE(DateTable[Date]), -2, MONTH)
RETURN
  AVERAGEX(
    DATESBETWEEN(DateTable[Date], RollingStart, LastDate),
    [Total Sales]
  )</code></pre>
<p>Or using DATESINPERIOD:</p>
<pre><code>Rolling 3M Avg v2 =
CALCULATE(
  [Total Sales],
  DATESINPERIOD(DateTable[Date], LASTDATE(DateTable[Date]), -3, MONTH)
) / 3</code></pre>
<h3>Cumulative Total (Running Total)</h3>
<pre><code>Cumulative Sales =
VAR CurrentDate = MAX(DateTable[Date])
RETURN
  CALCULATE(
    SUM(Sales[Amount]),
    DateTable[Date] <= CurrentDate,
    ALL(DateTable)
  )</code></pre>` },
    { type: 'text', body: `<h3>Pareto Analysis (80/20 Rule)</h3>
<p>Pareto analysis identifies the ~20% of products that generate ~80% of revenue. Build it with cumulative % rank:</p>
<pre><code>// Step 1: rank each product by sales descending
Product Rank = RANKX(ALL(Products[ProductName]), [Total Sales], , DESC, DENSE)

// Step 2: cumulative sales up to and including this product's rank
Cumulative Sales Pareto =
CALCULATE(
  [Total Sales],
  FILTER(
    ALL(Products[ProductName]),
    [Product Rank] <= MAX([Product Rank])
  )
)

// Step 3: % of grand total
Cumulative % = DIVIDE([Cumulative Sales Pareto], CALCULATE([Total Sales], ALL(Products)), 0)</code></pre>
<p>Plot: bar chart of Sales by Product (sorted descending) + line chart of Cumulative % on a secondary Y-axis. The crossover at 80% shows your Pareto threshold.</p>` },
    { type: 'text', body: `<h3>Period-over-Period % with DATEADD</h3>
<pre><code>// Generic prior period comparison — works for any granularity
MoM % =
VAR ThisPeriod = [Total Sales]
VAR PriorPeriod = CALCULATE([Total Sales], DATEADD(DateTable[Date], -1, MONTH))
RETURN DIVIDE(ThisPeriod - PriorPeriod, PriorPeriod, 0)

QoQ % =
VAR ThisPeriod = [Total Sales]
VAR PriorPeriod = CALCULATE([Total Sales], DATEADD(DateTable[Date], -1, QUARTER))
RETURN DIVIDE(ThisPeriod - PriorPeriod, PriorPeriod, 0)</code></pre>
<h3>ABC Classification</h3>
<pre><code>// Classify products as A (top 70%), B (70-90%), C (bottom 10%) by revenue
ABC Class =
VAR CumPct = [Cumulative %]
RETURN
  SWITCH(
    TRUE(),
    CumPct <= 0.70, "A — Core",
    CumPct <= 0.90, "B — Contributor",
    "C — Long Tail"
  )</code></pre>` },
    { type: 'tip', body: `For Pareto and cumulative measures, always use <code>ALL()</code> on the dimension you're ranking over — otherwise the filter context from the visual removes products not currently shown, and the cumulative % calculation breaks. The ALL() call inside CALCULATE ensures the full product list is evaluated regardless of any visual or slicer filter.` },
    { type: 'exercise', title: 'Build a Pareto chart with cumulative % line', hint: 'Rank products, compute cumulative sales and %, create a combo bar+line chart', solution: `1. Measures (in _Measures table):
   Product Rank = RANKX(ALL(Products[ProductName]), [Total Sales], , DESC, DENSE)

   Grand Total Sales = CALCULATE([Total Sales], ALL(Products))

   Cumulative Sales =
   CALCULATE([Total Sales],
     FILTER(ALL(Products[ProductName]), [Product Rank] <= MAX([Product Rank])))

   Cumulative % = DIVIDE([Cumulative Sales], [Grand Total Sales], 0)

2. Report view: add a Clustered column chart visual.
   X-axis: Products[ProductName]
   Column values: [Total Sales]

3. Add [Cumulative %] to the visual's values → right-click → Line on secondary axis.

4. Sort X-axis by [Total Sales] descending.

5. Add a constant line at 80% on the secondary Y-axis (Analytics pane → Constant Line → 0.8).

6. Products left of where the line crosses the 80% mark are your Pareto A items.` }
  ]
};

/* ─── MODULE 5 — Visualisations & Reports ───────────────────────────────── */

L['powerbi-w5-l1'] = {
  title: 'Core Chart Types — Bar, Line, Scatter, Pie & Map',
  sections: [
    { type: 'text', body: `<h2>Choosing the Right Chart</h2>
<p>Power BI includes 30+ built-in visuals plus hundreds of custom visuals from AppSource. Knowing which chart type communicates each analytical question is as important as building it correctly.</p>
<h3>Bar and Column Charts</h3>
<p>Best for comparing discrete categories. Use:</p>
<ul>
  <li><strong>Clustered bar</strong> (horizontal) — for long category names that don't fit vertically.</li>
  <li><strong>Clustered column</strong> (vertical) — for short category names or time-based comparisons.</li>
  <li><strong>Stacked bar/column</strong> — for showing composition within each category. Hard to compare non-bottom segments.</li>
  <li><strong>100% stacked</strong> — for showing proportions (part-to-whole) when absolute values are less important.</li>
</ul>
<p>Configuration: X-axis (or Y-axis for bar) gets the category; the Values field gets the measure; the Legend field adds a second grouping dimension (creates clusters or stacks).</p>` },
    { type: 'text', body: `<h3>Line Charts</h3>
<p>Best for showing trends over time. X-axis should always be a date or time dimension. Use:</p>
<ul>
  <li><strong>Line chart</strong> — single or multiple series over time.</li>
  <li><strong>Area chart</strong> — line with filled area. Good for showing volume/magnitude over time.</li>
  <li><strong>Stacked area</strong> — shows cumulative total and contribution of each series.</li>
</ul>
<p>Never use a line chart for unordered categories (e.g. Products) — the line implies sequence/order that doesn't exist. Use a bar chart instead.</p>
<h3>Scatter Charts</h3>
<p>Best for showing the relationship between two numeric measures. Configuration:</p>
<ul>
  <li><strong>X-axis</strong>: one measure (e.g. Marketing Spend).</li>
  <li><strong>Y-axis</strong>: another measure (e.g. Revenue).</li>
  <li><strong>Legend</strong>: colour by a category dimension.</li>
  <li><strong>Size</strong>: encode a third measure as bubble size (bubble chart).</li>
  <li><strong>Details</strong>: the granularity of each bubble (e.g. CustomerName for one dot per customer).</li>
</ul>` },
    { type: 'text', body: `<h3>Pie and Donut Charts</h3>
<p>Use only for 2–4 segments where proportions are clearly different. For 5+ categories, a stacked bar is almost always more readable. Avoid pie charts when slices are similar in size — humans are poor at comparing areas and angles.</p>
<p>The donut chart (a pie with a centre hole) allows a KPI total number to be displayed in the centre — this is its only real advantage over a pie.</p>
<h3>Maps</h3>
<p>Power BI includes several map visuals:</p>
<ul>
  <li><strong>Map (bubble map)</strong> — circles at geocoded locations, sized by a measure. Best for point data (stores, cities).</li>
  <li><strong>Filled map (choropleth)</strong> — shades regions (countries, states) by a measure. Best for regional aggregates. Requires a geographic hierarchy or correctly assigned geographic roles on the column.</li>
  <li><strong>Azure Maps</strong> — more powerful mapping visual with street-level tiles.</li>
  <li><strong>Shape map</strong> — use custom TopoJSON/GeoJSON shapes (e.g. custom territories, floor plans).</li>
</ul>
<p>Ensure geographic columns have their Data Category set: select the column in Model/Data view → Column tools tab → Data category → Country, State/Province, City, Postal Code, etc.</p>` },
    { type: 'tip', body: `For map visuals with ambiguous location names (e.g. "Springfield" exists in multiple states), add a full hierarchy: City + State + Country. Drag all three to the Location field and Power BI disambiguates using the full address. If you only pass "Springfield", the map may plot it in the wrong country.` },
    { type: 'exercise', title: 'Build one of each core chart type from the same dataset', hint: 'Use Superstore-style data: bar chart by Category, line chart by Month, scatter by Discount vs Profit, filled map by Region', solution: `1. Bar chart: X-axis = SUM(Sales), Y-axis = Products[Category]. Sort descending.
2. Line chart: X-axis = DateTable[Month] (Month Name, sort by Month Number), Values = [Total Sales], [Sales LY].
3. Scatter: X-axis = AVERAGE(Sales[Discount]), Y-axis = SUM(Sales[Profit]), Details = Products[SubCategory], Size = [Total Sales].
4. Filled map: Location = Regions[Region] (set Data Category = "State or Province"), Values = [Total Sales] (colour saturation).
5. Donut: Legend = Products[Category], Values = [Total Sales]. Limit to 4 categories using a top N visual-level filter.
6. Format each: turn on data labels, remove chart borders, set consistent title font.` }
  ]
};

L['powerbi-w5-l2'] = {
  title: 'Slicers, Cards & KPI Visuals',
  sections: [
    { type: 'text', body: `<h2>Slicers</h2>
<p>A slicer is an on-canvas filter control. When a user selects a value in the slicer, all connected visuals on the page filter to that value — with no additional configuration needed.</p>
<h3>Slicer Types</h3>
<p>After adding a slicer and assigning a field, right-click the slicer or use Format → Slicer settings to choose the display style:</p>
<ul>
  <li><strong>List</strong> — all values as a scrollable list (default for text fields).</li>
  <li><strong>Dropdown</strong> — compact; shows values in a dropdown menu on click.</li>
  <li><strong>Between / Less than / Greater than</strong> — range slider (for numeric fields).</li>
  <li><strong>Relative date / Relative time</strong> — date fields: "Last 30 days", "This week", "Current month", etc.</li>
  <li><strong>Tile</strong> — values as clickable tiles/buttons.</li>
</ul>
<h3>Slicer Settings</h3>
<ul>
  <li><strong>Single select</strong>: only one value at a time (like a radio button). Enable via Format → Slicer settings → Selection → Single select.</li>
  <li><strong>Select All</strong>: adds a "Select All" option at the top — useful when users need to reset back to all values.</li>
  <li><strong>Sync Slicers</strong>: View → Sync Slicers pane. Make a slicer apply to multiple pages and optionally display on multiple pages.</li>
</ul>` },
    { type: 'text', body: `<h3>Card Visuals</h3>
<p>Cards display a single aggregate value prominently. Configuration: drag a measure to the "Fields" field well. Best practices:</p>
<ul>
  <li>Turn off the card title and use a text box above it instead — gives more formatting control.</li>
  <li>Format the callout value: Font size 28–36, bold, colour matching your theme.</li>
  <li>Add a category label below the number: Format → Category label → on.</li>
  <li>Use conditional formatting on the callout value colour: red if below target, green if above (Format → Callout value → Conditional formatting → Color scales or Rules).</li>
</ul>
<h3>Multi-Row Card</h3>
<p>The multi-row card shows multiple measures in one visual — useful for a compact KPI summary. Drag multiple measures to the Fields field well.</p>` },
    { type: 'text', body: `<h3>KPI Visual</h3>
<p>The KPI visual (not to be confused with a card) shows:</p>
<ul>
  <li>A large current value (the Indicator field).</li>
  <li>A target value (the Target goals field).</li>
  <li>Trend direction (a small sparkline — requires a trend axis field, usually a date).</li>
  <li>Colour coding: green/red based on whether the indicator exceeds the target.</li>
</ul>
<p>Configuration:</p>
<ul>
  <li><strong>Indicator</strong>: the measure to display (e.g. Total Sales).</li>
  <li><strong>Target goals</strong>: a target measure or value (e.g. Sales Target).</li>
  <li><strong>Trend axis</strong>: a date field for the sparkline (e.g. DateTable[Month]).</li>
</ul>
<p>The KPI visual is ideal for executive dashboards where the primary question is "are we on track?" rather than "what is the breakdown?".</p>` },
    { type: 'tip', body: `For a row of KPI cards at the top of a dashboard, use a <strong>single multi-row card</strong> rather than four separate cards if space is tight. But for full formatting control — individual colours, conditional formatting, custom labels, different font sizes per card — use separate Card visuals inside a horizontal container. The extra effort is worth it for polished executive dashboards.` },
    { type: 'exercise', title: 'Build a KPI header with cards and a date slicer', hint: 'Add 3 card visuals for Sales, Profit, and Order Count, plus a relative date slicer', solution: `1. Add a Slicer → DateTable[Date] → Format → Slicer settings → Style: Relative date.
   Set to "Last 12 months" — this slicer now auto-updates every day.
2. Add Card → [Total Sales] → Format: callout value 32pt, category label "Total Revenue".
3. Add Card → [Total Profit] → Conditional format: callout colour → Rules:
   If value < 0 → red; else → green.
4. Add Card → [Order Count] → Format: category label "Orders".
5. Add KPI visual → Indicator: [Total Sales], Target goals: [Sales Target] (create a simple measure returning a fixed budget), Trend axis: DateTable[MonthYear].
6. Align all 4 visuals in a row using Format → Align → Distribute horizontally.
7. Group them: Ctrl+click all → right-click → Group.` }
  ]
};

L['powerbi-w5-l3'] = {
  title: 'Conditional Formatting & Data Bars',
  sections: [
    { type: 'text', body: `<h2>Conditional Formatting in Power BI</h2>
<p>Conditional formatting applies colour, icons, or data bars to table and matrix cells based on their values — making patterns immediately visible without needing additional visuals.</p>
<h3>Applying Conditional Formatting</h3>
<p>Select a table or matrix visual → click a measure in the Values field well → click the dropdown arrow → Conditional formatting. Options depend on the column type:</p>
<ul>
  <li><strong>Background color</strong> — colours the cell background.</li>
  <li><strong>Font color</strong> — colours the text.</li>
  <li><strong>Data bars</strong> — adds a horizontal bar inside each cell proportional to the value.</li>
  <li><strong>Icons</strong> — adds icon sets (arrows, traffic lights, stars) next to values.</li>
  <li><strong>Web URL</strong> — makes cells clickable links (the column must contain a valid URL).</li>
</ul>` },
    { type: 'text', body: `<h3>Formatting Rules</h3>
<p>In the conditional formatting dialog, choose the formatting type:</p>
<ul>
  <li><strong>Gradient</strong> — continuous colour scale from minimum to maximum. Lowest value = one colour, highest = another. Good for heat maps.</li>
  <li><strong>Rules</strong> — define if/else conditions with threshold values. Example: if value &lt; 0 → red, if value between 0–0.1 → amber, else → green. Rules override gradient.</li>
  <li><strong>Field value</strong> — a measure returns a hex colour code string ("#FF0000") which becomes the colour. Maximum flexibility — the DAX measure can compute the colour based on any logic.</li>
</ul>
<h3>Field Value Conditional Formatting</h3>
<p>Create a measure that returns a hex colour:</p>
<pre><code>Profit Color =
VAR margin = [Profit Margin %]
RETURN
  IF(margin < 0, "#E74C3C",      // red
     IF(margin < 0.1, "#F39C12", // amber
        "#27AE60"))               // green</code></pre>
<p>Then: conditional formatting → Background color → Format style: Field value → select [Profit Color].</p>` },
    { type: 'tip', body: `<strong>Data bars</strong> are the quickest win for making a table scannable. Apply them to any numeric column in a table visual: select the column → conditional formatting → Data bars → set negative bar colour (red) separately from positive (blue). The bars make the magnitude immediately obvious without requiring the reader to compare raw numbers across rows.` },
    { type: 'text', body: `<h3>Icon Sets</h3>
<p>Icons add visual indicators next to values. Common use: KPI status traffic lights.</p>
<p>Icon sets → Format style: Rules → define rules for each icon:</p>
<ul>
  <li>Red circle: if YoY % &lt; -0.05 (down &gt;5%)</li>
  <li>Yellow triangle: if YoY % between -0.05 and 0.05 (within 5%)</li>
  <li>Green circle: if YoY % &gt; 0.05 (up &gt;5%)</li>
</ul>
<p>Choose whether to show icons only (hide the numeric value) or icons alongside the value. "Icons only" creates a compact traffic light column for executive summaries.</p>
<h3>Applying to Matrix Rows</h3>
<p>In a matrix, conditional formatting applies to the cell at the intersection of rows and columns. You can apply different formatting to different measures — e.g. green/red on Profit Margin but data bars on Total Sales — within the same matrix visual.</p>` },
    { type: 'exercise', title: 'Apply gradient and icon conditional formatting to a matrix', hint: 'Build a Region × Category matrix, add gradient on Sales and traffic light icons on YoY%', solution: `1. Add a matrix: Rows = Regions[Region], Columns = Products[Category], Values = [Total Sales], [YoY %].
2. Click [Total Sales] dropdown in Values → Conditional formatting → Background color.
   Format style: Gradient. Minimum: white. Maximum: your theme's primary colour. Apply.
3. Click [YoY %] dropdown → Conditional formatting → Icons.
   Format style: Rules.
   Rule 1: if value < -0.05 → red down arrow.
   Rule 2: if value >= -0.05 and < 0.05 → yellow warning triangle.
   Rule 3: if value >= 0.05 → green up arrow.
   Icon placement: Left of data. Apply.
4. Format → Style: no gridlines, alternate row colour: light grey.
5. Observe: the matrix now communicates Sales volume (gradient) and growth trend (icons) simultaneously.` }
  ]
};

L['powerbi-w5-l4'] = {
  title: 'Drill-Through, Drill-Down & Cross-Report Drill-Through',
  sections: [
    { type: 'text', body: `<h2>Drill-Down</h2>
<p>Drill-down explores hierarchical data within a single visual. It requires a hierarchy in the axis field — either a built-in date hierarchy (Year → Quarter → Month → Day) or a custom hierarchy you create.</p>
<h3>Creating a Hierarchy</h3>
<p>In the Fields pane: right-click a column → Create hierarchy. Then drag other columns onto the hierarchy to add levels. Example: Country → State → City hierarchy on the Customers table.</p>
<h3>Using Drill-Down</h3>
<p>When a visual has a hierarchy on the axis, drill controls appear in the top-right of the visual on hover:</p>
<ul>
  <li><strong>↓ (Go to next level)</strong> — expands all marks to the next level simultaneously.</li>
  <li><strong>∀ (Expand all levels)</strong> — shows parent and child simultaneously (expanded view).</li>
  <li><strong>↑ (Drill up)</strong> — returns to the parent level.</li>
  <li><strong>Click a specific mark</strong> (when drill mode is on) — drills down into only that mark's children. Enable by clicking the drill mode toggle (forked arrow icon).</li>
</ul>` },
    { type: 'text', body: `<h3>Drill-Through</h3>
<p>Drill-through navigates from a summary page to a detail page filtered to the selected context. Setup:</p>
<ol>
  <li>Create a detail page (e.g. "Customer Detail").</li>
  <li>On the detail page, drag a field to the <strong>Drill through</strong> field well in the Filters pane (appears at the bottom of the page's filter panel). Example: drag [CustomerName].</li>
  <li>Power BI auto-adds a Back button to the page.</li>
  <li>On the summary page, right-click any mark that has a CustomerName value → Drill through → Customer Detail.</li>
  <li>The Customer Detail page opens filtered to that specific customer.</li>
</ol>
<p>The drill-through filter applies automatically. Any visuals on the detail page using CustomerName will be filtered to the selected customer.</p>
<h3>Keep All Filters</h3>
<p>In the drill-through field well, toggle "Keep all filters" to pass the entire filter context (including slicers from the source page) to the detail page, not just the drill-through field. Useful when the detail page should inherit "Year = 2024" from a slicer on the source page.</p>` },
    { type: 'tip', body: `Add a <strong>formatted Back button</strong> to every drill-through page. Power BI's auto-generated button is plain. Replace it: Insert → Buttons → Back. Format it with your theme colours and add an icon. Place it consistently in the same location on all detail pages so users can intuitively navigate back.` },
    { type: 'text', body: `<h3>Cross-Report Drill-Through</h3>
<p>Cross-report drill-through navigates from one .pbix report to a detail page in a <em>different</em> .pbix report published to the same Power BI Service workspace.</p>
<p>Setup on the <strong>target report</strong> (the detail report):</p>
<ol>
  <li>Go to File → Options → Current File → Report settings → Enable cross-report drillthrough.</li>
  <li>Set up the drill-through field on the target page as usual.</li>
</ol>
<p>Setup on the <strong>source report</strong>: right-click a mark → Drill through → Other reports → select the target report and page.</p>
<p>Both reports must be published to the same workspace. Useful for separating a high-level executive dashboard from detailed operational reports while keeping them navigable.</p>` },
    { type: 'exercise', title: 'Build a drill-through from a region summary to a customer detail page', hint: 'Set up drill-through field on the detail page, then right-click a region bar to test', solution: `1. Report view: rename the current page "Region Summary".
2. Add a new page → rename "Customer Detail".
3. On Customer Detail: Filters pane → Drill through field well → drag Customers[CustomerName].
4. Add a table on Customer Detail: CustomerName, [Total Sales], [Order Count], [Profit Margin %].
5. Add a line chart: DateTable[Month] on X-axis, [Total Sales] on Y-axis.
   (Both will filter to the drilled-through customer.)
6. Go to Region Summary page → add a bar chart: Regions[Region] vs [Total Sales].
7. Right-click any region bar → Drill through → (it shows no target yet — the drill-through field is CustomerName, not Region).
8. Fix: on Customer Detail, also drag Regions[Region] to the Drill through field well.
9. Back on Region Summary → right-click a bar → Drill through → Customer Detail.
   All customer-level visuals now filter to that region.` }
  ]
};

L['powerbi-w5-l5'] = {
  title: 'Bookmarks, Buttons & Report Navigation',
  sections: [
    { type: 'text', body: `<h2>Bookmarks</h2>
<p>A bookmark captures the current state of a report page: which filters are active, which slicers are selected, which visuals are visible, and the scroll position. Viewers can click a bookmark to restore that exact state.</p>
<h3>Creating Bookmarks</h3>
<p>View → Bookmarks pane → Add. Power BI captures the current state. Name it descriptively ("Sales View — Q4 2024"). Create multiple bookmarks to represent different "views" of the same page.</p>
<h3>Bookmark Options</h3>
<p>Right-click a bookmark → Update (saves the current state to the bookmark) or right-click → Edit (toggle what the bookmark captures):</p>
<ul>
  <li><strong>Data</strong>: capture filter/slicer state. Uncheck to make the bookmark ignore the current filter context — it will only capture visual properties.</li>
  <li><strong>Display</strong>: capture visual visibility (show/hide). Useful for toggle show/hide patterns.</li>
  <li><strong>Current page</strong>: capture which page is active.</li>
  <li><strong>All visuals / Selected visuals</strong>: whether the bookmark affects all visuals or only selected ones. "Selected visuals" bookmarks are the key to building toggle patterns.</li>
</ul>` },
    { type: 'text', body: `<h3>Buttons</h3>
<p>Insert → Buttons provides a gallery of button types: Back, Blank, Bookmark, Drill through, Navigator, Q&A, Reset. Buttons can be assigned actions.</p>
<p>Assign a bookmark to a button: Format → Action → Type: Bookmark → select a bookmark. When a viewer clicks the button, the bookmark is applied.</p>
<h3>Show/Hide Toggle Pattern</h3>
<ol>
  <li>Add a visual (e.g. a help overlay text box) and position it on the canvas.</li>
  <li>Create Bookmark A: visual is visible. Select the visual only → bookmark with "Selected visuals" and "Display" only.</li>
  <li>Hide the visual (Selection pane → eye icon next to the visual).</li>
  <li>Create Bookmark B: visual is hidden. Same "Selected visuals" + "Display" only settings.</li>
  <li>Add two buttons: "Show Help" → Bookmark A, "Hide Help" → Bookmark B.</li>
  <li>Result: clicking "Show Help" reveals the overlay; clicking "Hide Help" hides it — all without any data filtering.</li>
</ol>` },
    { type: 'tip', body: `Use the <strong>Selection pane</strong> (View → Selection) alongside bookmarks. The Selection pane lists every visual on the page with a visibility (eye) toggle and a lock toggle. Name your visuals in the Selection pane — "Help Overlay", "Main Chart", "Filter Panel" — so bookmarks reference them by name. This prevents confusion when layers overlap on the canvas.` },
    { type: 'text', body: `<h3>Page Navigator</h3>
<p>Insert → Buttons → Navigator → Page Navigator. This auto-generates a button row with one button per page in the report, labeled with the page name. As you add or rename pages, the navigator updates automatically. Format it to match your theme.</p>
<p>Hide pages you don't want in the navigator: right-click a page tab → Hide page. The page is still accessible for drill-through and bookmarks, but does not appear in the navigator.</p>
<h3>Bookmark Navigator</h3>
<p>Insert → Buttons → Navigator → Bookmark Navigator. Shows all bookmarks as buttons — useful for "chapter" navigation in a story-style report (similar to Tableau Story Points).</p>
<p>Group bookmarks: in the Bookmarks pane, select multiple bookmarks → "…" → Group. The Bookmark Navigator shows each group as a dropdown.</p>` },
    { type: 'exercise', title: 'Build a tabbed navigation system using buttons and bookmarks', hint: 'Create two visual groups, one bookmark per group, two buttons — clicking each shows only that group', solution: `1. On the canvas, build two visual groups side by side:
   Group A: a bar chart and a slicer.
   Group B: a table and a map.
   (Both groups occupy the same canvas space — they will be toggled.)
2. Select Group B visuals → View → Selection → hide them (eye icon off).
3. View → Bookmarks → Add → name "Sales Charts View" → right-click → Edit → Data: off, Display: on, Selected visuals: off.
4. Now show Group B, hide Group A.
5. Add bookmark "Table & Map View" → same settings.
6. Insert → Buttons → Blank → label "Charts" → Format → Action: Bookmark: "Sales Charts View".
7. Duplicate → label "Table & Map" → Action: Bookmark: "Table & Map View".
8. Test: clicking "Charts" shows Group A; clicking "Table & Map" shows Group B.
9. Hold Ctrl and click each button in report view to verify the toggle works.` }
  ]
};

/* ─── MODULE 6 — Publishing, Security & Capstone ────────────────────────── */

L['powerbi-w6-l1'] = {
  title: 'Power BI Service — Workspaces, Dashboards vs Reports',
  sections: [
    { type: 'text', body: `<h2>Power BI Service Overview</h2>
<p>Power BI Service (app.powerbi.com) is the cloud platform for publishing, sharing, and governing Power BI content. It organises content into <strong>Workspaces</strong>.</p>
<h3>My Workspace vs Shared Workspaces</h3>
<ul>
  <li><strong>My Workspace</strong> — personal sandbox. Only you can see content here. Use for testing and personal analysis. Content cannot be shared via Apps from My Workspace.</li>
  <li><strong>Shared Workspaces</strong> (formerly App Workspaces) — collaborative spaces where a team manages reports, datasets, and dashboards together. Require Pro or Premium licence to create and share.</li>
</ul>
<h3>Workspace Roles</h3>
<ul>
  <li><strong>Admin</strong> — full control including workspace settings and member management.</li>
  <li><strong>Member</strong> — publish content, manage datasets, create Apps.</li>
  <li><strong>Contributor</strong> — publish and edit content, but cannot manage members.</li>
  <li><strong>Viewer</strong> — view content only. Cannot edit or republish.</li>
</ul>` },
    { type: 'text', body: `<h3>Reports vs Dashboards in Power BI Service</h3>
<table>
  <tr><th>Aspect</th><th>Report</th><th>Dashboard</th></tr>
  <tr><td>Pages</td><td>Multiple pages (tabs)</td><td>Single page (canvas)</td></tr>
  <tr><td>Content</td><td>Rich visuals with full interactivity (filters, drill-through, bookmarks)</td><td>Tiles pinned from reports, datasets, or real-time streams</td></tr>
  <tr><td>Creation</td><td>Power BI Desktop or web authoring</td><td>Power BI Service only (pin tiles from reports)</td></tr>
  <tr><td>Filters</td><td>Full filter panel, slicers, drill-through</td><td>Tile-level filters only; no page-level filtering</td></tr>
  <tr><td>Real-time</td><td>Not real-time (refreshes on schedule)</td><td>Supports streaming tiles for real-time data</td></tr>
  <tr><td>Mobile</td><td>Automatic phone layout</td><td>Customisable phone view</td></tr>
</table>
<h3>Pinning Visuals to a Dashboard</h3>
<p>Open a published report in Power BI Service → hover over a visual → click the pin icon → choose dashboard (existing or new). Pinned tiles are static snapshots that refresh when the dataset refreshes.</p>` },
    { type: 'tip', body: `Use <strong>Power BI Apps</strong> to share content with a broad audience. An App is a packaged bundle of reports and dashboards from a workspace, published to end users who do not need workspace access. Users install the App and see a curated, read-only view. Apps are the recommended distribution method for large organisations — they separate content creators from viewers cleanly.` },
    { type: 'text', body: `<h3>Publishing from Desktop</h3>
<ol>
  <li>Power BI Desktop → Home → Publish → sign in if prompted → choose the destination workspace → Publish.</li>
  <li>After publishing: a link appears to open the report in Service. Click it to verify the published version.</li>
  <li>Publishing again (same filename) overwrites the existing report and dataset in Service.</li>
</ol>
<h3>Web Authoring</h3>
<p>In Power BI Service, open a report → Edit. A limited but capable web authoring interface opens — you can add visuals, modify DAX measures, change formatting, and add pages without going back to Desktop. Useful for quick fixes after publishing. Complex model changes (relationships, Power Query) still require Desktop.</p>` },
    { type: 'exercise', title: 'Publish a report and create a dashboard from it', hint: 'Publish from Desktop, open in Service, pin two visuals to a new dashboard', solution: `1. In Power BI Desktop: Home → Publish → select your workspace → wait for upload.
2. Click the "Open in Power BI" link → report opens in browser.
3. Click a bar chart visual → hover → click the pin icon (top-right of visual).
4. Pin to: New dashboard → name "Sales Overview Dashboard" → Pin.
5. Click another visual (e.g. a KPI card) → pin to the same dashboard.
6. Navigate to the workspace → click "Sales Overview Dashboard".
7. Rearrange tiles by dragging. Resize tiles by dragging the bottom-right corner.
8. Add a text tile: Edit → Add tile → Text → enter the dashboard title.
9. Click a pinned tile → it navigates to the source report page.` }
  ]
};

L['powerbi-w6-l2'] = {
  title: 'Row-Level Security — Static & Dynamic RLS',
  sections: [
    { type: 'text', body: `<h2>What is Row-Level Security?</h2>
<p>Row-Level Security (RLS) restricts which data rows each user can see within the same report. A sales manager sees all regions; a regional rep sees only their own. The report is identical — the data is filtered by the viewer's identity.</p>
<h3>Static RLS</h3>
<p>Static RLS defines fixed filter rules for each role. Setup in Power BI Desktop:</p>
<ol>
  <li>Modeling tab → Manage roles → Create.</li>
  <li>Name the role (e.g. "West Region").</li>
  <li>Select the table to filter (e.g. Regions).</li>
  <li>Enter a DAX filter expression: <code>[Region] = "West"</code></li>
  <li>Create another role: "East Region" → <code>[Region] = "East"</code></li>
  <li>Save → Publish to Service.</li>
</ol>
<p>In Power BI Service → workspace → Datasets → the published dataset → Security → assign users (email addresses or security groups) to each role.</p>
<p>To test before assigning: Modeling → View as → select a role → the report re-renders as if you were a member of that role.</p>` },
    { type: 'text', body: `<h3>Dynamic RLS</h3>
<p>Dynamic RLS uses the viewer's login email to filter data automatically — one role, unlimited users. No need to assign individual users to roles.</p>
<p>Setup:</p>
<ol>
  <li>Add a "Users" table to the model: columns for Email and Region (or whatever dimension to filter by). Load from your HR/AD system or maintain manually in Excel.</li>
  <li>Create a relationship: Users[Email] to the relevant dimension table (or use the Users table directly).</li>
  <li>In Manage Roles, create one role: "Dynamic RLS".</li>
  <li>Filter the Users table with: <code>[Email] = USERPRINCIPALNAME()</code></li>
  <li>USERPRINCIPALNAME() returns the logged-in user's Azure AD email at query time.</li>
  <li>Through the relationship chain, this filters the Regions table and therefore the fact table.</li>
</ol>
<pre><code>// DAX filter on Users table
[Email] = USERPRINCIPALNAME()</code></pre>` },
    { type: 'tip', body: `Test dynamic RLS with a specific user's perspective using <strong>View as → Other user</strong> (enter their email). This simulates what they will see when they open the published report. Always test with at least 2–3 user emails before releasing to production — a misconfigured relationship in the RLS chain can accidentally show all data to all users or no data to any user.` },
    { type: 'text', body: `<h3>RLS Best Practices</h3>
<ul>
  <li>Use Dynamic RLS for any deployment with more than ~5 distinct roles — static roles become a maintenance burden as the team grows.</li>
  <li>Keep the Users table in a secure, maintainable location (SharePoint, SQL table, or Azure Active Directory group membership) rather than hardcoded in Power Query.</li>
  <li>RLS applies to the <strong>dataset</strong>, not the report — if the same dataset is used by multiple reports, RLS protects all of them automatically.</li>
  <li>RLS does NOT protect the underlying .pbix file if it is downloaded. If a user downloads the file, they can see all data. Control .pbix download permissions in Service → Dataset settings.</li>
  <li>Admin and Member workspace roles bypass RLS — they always see all data. Only Viewer-role users (or users accessing via an App) are subject to RLS.</li>
</ul>` },
    { type: 'exercise', title: 'Set up Dynamic RLS with a user-region mapping table', hint: 'Create the Users table, link it to Regions, define the USERPRINCIPALNAME() filter, test with View as', solution: `1. In Power BI Desktop: Modeling → Enter Data → create a table:
   | Email               | Region |
   | you@company.com     | West   |
   | colleague@company.com | East |
   Name the table "UserRegionMap".

2. Model view → create relationship: UserRegionMap[Region] → Regions[Region] (many-to-one).

3. Modeling → Manage Roles → Create → name "Dynamic" → select UserRegionMap table.
   DAX filter: [Email] = USERPRINCIPALNAME()

4. Modeling → View as → Dynamic role → report now shows only "West" data (your email maps to West).

5. View as → Other user → enter colleague@company.com → report shows "East" data only.

6. Publish to Service → dataset → Security → assign the "Dynamic" role to ALL users
   (everyone gets the role; USERPRINCIPALNAME() determines what they see within it).` }
  ]
};

L['powerbi-w6-l3'] = {
  title: 'Scheduled Refresh & On-Premises Data Gateway',
  sections: [
    { type: 'text', body: `<h2>Keeping Data Fresh</h2>
<p>Published Power BI reports show data as of the last refresh. Without scheduled refresh, users see stale data. Power BI Service can automatically refresh datasets on a schedule — but requirements differ by data source type.</p>
<h3>Refresh for File-Based Sources</h3>
<p>If your data source is an Excel file, CSV, or SharePoint Online file:</p>
<ul>
  <li>Store the file in <strong>OneDrive for Business</strong> or <strong>SharePoint Online</strong> (not local disk).</li>
  <li>Connect from Power BI Desktop using the OneDrive/SharePoint URL, not the local file path.</li>
  <li>Power BI Service can then refresh by re-reading the file from OneDrive/SharePoint on schedule — no gateway needed.</li>
</ul>
<h3>Refresh for Cloud Databases</h3>
<p>SQL Server on Azure, Snowflake, BigQuery, Azure SQL — Power BI Service connects directly. Go to dataset settings → Data source credentials → enter credentials → configure scheduled refresh. No gateway needed for cloud sources.</p>` },
    { type: 'text', body: `<h3>On-Premises Data Gateway</h3>
<p>If your data is on a server inside your corporate network (on-premises SQL Server, Oracle, SAP, on-premises SharePoint), Power BI Service cannot reach it directly. The <strong>On-Premises Data Gateway</strong> bridges this gap.</p>
<p>Setup:</p>
<ol>
  <li>Download the Gateway installer from Power BI Service → Settings → Manage gateways → Download gateway.</li>
  <li>Install on a Windows machine that: (a) is inside the corporate network, (b) is always on, (c) has network access to the data source.</li>
  <li>Register the gateway with Power BI Service using your Power BI credentials.</li>
  <li>In Power BI Service → dataset settings → Gateway connection → select your gateway → map data sources.</li>
  <li>Configure scheduled refresh — Power BI Service sends the refresh request to the gateway, which queries the on-premises source and returns data.</li>
</ol>
<h3>Gateway Modes</h3>
<ul>
  <li><strong>Standard (Enterprise) mode</strong> — supports multiple users and multiple data sources. Runs as a Windows service. Recommended for production.</li>
  <li><strong>Personal mode</strong> — single-user only. Cannot be shared. Not recommended for team environments.</li>
</ul>` },
    { type: 'tip', body: `Install the gateway on a <strong>dedicated server</strong>, not someone's laptop. If the laptop is shut down or off the corporate network, scheduled refreshes fail silently and users see stale data without knowing why. A dedicated server (or VM) that is always on and always connected to the network ensures reliable, automatic refreshes.` },
    { type: 'text', body: `<h3>Configuring Scheduled Refresh</h3>
<p>Power BI Service → Workspace → click the three dots next to a dataset → Settings → Scheduled refresh.</p>
<ul>
  <li><strong>Refresh frequency</strong>: Daily or Weekly.</li>
  <li><strong>Time</strong>: add up to 8 refresh times per day (Pro) or 48 (Premium).</li>
  <li><strong>Time zone</strong>: set the timezone for the refresh schedule.</li>
  <li><strong>Send refresh failure notifications</strong>: enable to receive email when a refresh fails.</li>
</ul>
<h3>Incremental Refresh</h3>
<p>For large datasets, full refresh every night is expensive. Incremental Refresh loads only new or changed rows since the last refresh:</p>
<ol>
  <li>In Power Query: add parameters RangeStart and RangeEnd (Date/Time type).</li>
  <li>Filter your date column: <code>[Date] >= RangeStart and [Date] < RangeEnd</code></li>
  <li>In Power BI Service → dataset settings → Incremental refresh → define the archive window and refresh window.</li>
</ol>` },
    { type: 'exercise', title: 'Publish a report and configure scheduled daily refresh', hint: 'Publish to Service, enter data source credentials, enable daily refresh at 6am', solution: `1. In Power BI Desktop: publish to your workspace.
2. Power BI Service → your workspace → Datasets → click "…" next to your dataset → Settings.
3. Under "Data source credentials": click "Edit credentials" → enter your database username and password → Save.
4. Under "Scheduled refresh": toggle "Keep your data up to date" → On.
5. Refresh frequency: Daily. Time zone: your timezone.
6. Add time: 06:00 AM. (For testing, add a time 2 minutes from now.)
7. "Send refresh failure notifications to me": toggle On.
8. Click Apply.
9. After the refresh runs: workspace → Datasets → check the "Refreshed" timestamp confirms the refresh ran.
10. Open the report → verify the data is current.` }
  ]
};

L['powerbi-w6-l4'] = {
  title: 'Performance Optimisation — Star Schema, Aggregations & Best Practices',
  sections: [
    { type: 'text', body: `<h2>Why Reports Become Slow</h2>
<p>Power BI can handle millions of rows when the model is well designed. Poor design decisions create slow, unresponsive reports. Common causes:</p>
<ul>
  <li><strong>Wide flat tables</strong> — many text columns with high cardinality repeated across millions of rows. VertiPaq compresses poorly, RAM usage is high.</li>
  <li><strong>Bi-directional relationships</strong> — create filter ambiguity, force Power BI to evaluate multiple filter paths, slow DAX execution.</li>
  <li><strong>Too many visuals per page</strong> — each visual runs an independent DAX query. 15 visuals = 15 queries on every interaction.</li>
  <li><strong>Complex DAX at render time</strong> — expensive measures (nested CALCULATE, iterator-within-iterator) evaluated for every cell in a large matrix.</li>
  <li><strong>High cardinality columns in the model</strong> — columns with millions of unique values (like GUIDs, timestamps) compress poorly and slow relationship traversal.</li>
</ul>` },
    { type: 'text', body: `<h3>Model Optimisation</h3>
<ul>
  <li><strong>Use star schema</strong> — the single most impactful design decision. Narrow fact tables (few columns, mostly foreign keys and measures), wide dimension tables (many descriptive columns, fewer rows).</li>
  <li><strong>Remove unused columns</strong> — every column takes RAM whether used or not. In Power Query, delete columns you don't need before loading.</li>
  <li><strong>Set correct data types</strong> — integers compress better than text. A "Year" column stored as text is worse than stored as Whole Number. True/False compresses better than "Yes"/"No" text.</li>
  <li><strong>Avoid calculated columns when measures suffice</strong> — calculated columns store data in RAM at rest. Measures compute on demand and use no RAM at rest.</li>
  <li><strong>Avoid bi-directional relationships</strong> unless absolutely necessary. Replace with CROSSFILTER() in DAX when needed for specific calculations only.</li>
</ul>
<h3>DAX Optimisation</h3>
<ul>
  <li>Use <strong>DIVIDE</strong> instead of <code>/</code> — handles zero-denominator gracefully without an error branch.</li>
  <li>Use <strong>VAR</strong> — computes subexpressions once; avoids repeated evaluation.</li>
  <li>Prefer <strong>column filters in CALCULATE</strong> over FILTER() when possible — column filters are optimised by the engine, FILTER() iterates.</li>
  <li>Avoid <strong>ISINSCOPE</strong> inside heavy measures called from large matrices — it forces row-by-row evaluation.</li>
</ul>` },
    { type: 'tip', body: `Use <strong>Performance Analyzer</strong> (View → Performance Analyzer → Start Recording) to identify which visuals are slow. Click "Copy query" on a slow visual to get the DAX query, then paste it into <strong>DAX Studio</strong> (free, downloadable) to profile it. DAX Studio shows which storage engine calls are expensive and whether the formula engine is bottlenecking — far more detail than the Power BI built-in analyzer.` },
    { type: 'text', body: `<h3>Report Page Optimisation</h3>
<ul>
  <li><strong>Reduce visual count</strong> — aim for 8 or fewer visuals per page. Split dense pages into two pages linked by navigation.</li>
  <li><strong>Use Query Reduction options</strong> (View → Optimize → Query reduction settings): Add an "Apply" button to slicers so filters only apply when the user clicks Apply — prevents a query for every slicer click.</li>
  <li><strong>Disable cross-filtering on non-essential visuals</strong> — select a visual → Format → Edit interactions → set some visuals to "None" so they don't re-query when other visuals are clicked.</li>
  <li><strong>Use import mode</strong> — DirectQuery fires a database query on every interaction. Import mode queries the in-memory VertiPaq engine, which is 10–100× faster for analytical queries.</li>
  <li><strong>Pre-aggregate large tables</strong> in Power Query when row-level detail is not needed — load monthly summaries instead of daily transactions if the report never shows daily data.</li>
</ul>` },
    { type: 'exercise', title: 'Profile and optimise a slow report using Performance Analyzer', hint: 'Start recording, interact with visuals, identify the slowest query, apply one fix, and re-measure', solution: `1. Open a report with 8+ visuals (or the capstone report from the next lesson).
2. View → Performance Analyzer → Start recording.
3. Click "Refresh visuals" to render all visuals.
4. Click a slicer to trigger cross-filtering.
5. Stop recording. Expand each visual in the results.
6. Find the visual with the longest "DAX query" duration. Click "Copy query".
7. Identify the bottleneck:
   - If "DAX query" is >500ms: the measure is expensive. Add VAR, remove nested FILTER.
   - If "Direct query" shows: switch from DirectQuery to Import mode.
   - If many visuals are slow: reduce visual count or add Query Reduction settings.
8. Make one change → re-record → compare total render time before vs after.` }
  ]
};

L['powerbi-w6-l5'] = {
  title: 'Capstone — End-to-End Sales Analytics Report',
  sections: [
    { type: 'text', body: `<h2>Capstone Overview</h2>
<p>You will build a complete, production-quality Sales Analytics Report applying every skill from this course: star schema modeling, Power Query transformation, DAX measures (including time intelligence and dynamic metrics), interactive visuals, RLS, bookmarks, and scheduled refresh.</p>
<h3>Business Brief</h3>
<p>You are a BI analyst at a retail company. The VP of Sales needs a self-service report that answers:</p>
<ol>
  <li>How are total sales, profit, and order volume trending month over month and year over year?</li>
  <li>Which product categories and regions drive the most revenue — and which are most profitable?</li>
  <li>Who are our top customers, and which are at risk (high orders, low profitability)?</li>
  <li>Are we on track vs the annual sales target?</li>
</ol>
<p>The report must support regional managers seeing only their region's data (Dynamic RLS), work on mobile, and refresh daily from the source system.</p>` },
    { type: 'text', body: `<h3>Step 1 — Data Model</h3>
<p>Load the following tables from the Superstore Excel workbook:</p>
<ul>
  <li><strong>FactSales</strong>: OrderID, OrderDate, ShipDate, CustomerID, ProductID, Quantity, UnitPrice, Discount, Sales, Profit.</li>
  <li><strong>DimProduct</strong>: ProductID, ProductName, SubCategory, Category. (Remove Duplicates on ProductID.)</li>
  <li><strong>DimCustomer</strong>: CustomerID, CustomerName, Segment, City, State, Region. (Remove Duplicates on CustomerID.)</li>
  <li><strong>DimDate</strong>: generate with DAX: <code>DimDate = CALENDAR(DATE(2021,1,1), DATE(2025,12,31))</code>. Add columns: Year, Month, MonthName, Quarter, WeekDay.</li>
  <li><strong>UserRegionMap</strong>: Email, Region (for Dynamic RLS — add your own email for testing).</li>
  <li><strong>Budget</strong>: Year, Month, BudgetAmount (enter manually or load from Excel).</li>
</ul>
<p>Star schema relationships: FactSales → DimProduct, DimCustomer, DimDate (on OrderDate). Mark DimDate as Date Table.</p>` },
    { type: 'text', body: `<h3>Step 2 — DAX Measures</h3>
<p>Create a <code>_Measures</code> table. Build these measures:</p>
<pre><code>Total Sales = SUM(FactSales[Sales])
Total Profit = SUM(FactSales[Profit])
Profit Margin % = DIVIDE([Total Profit], [Total Sales], 0)
Order Count = DISTINCTCOUNT(FactSales[OrderID])
Avg Order Value = DIVIDE([Total Sales], [Order Count], 0)

Sales LY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date]))
Sales YTD = TOTALYTD([Total Sales], DimDate[Date])
YoY % = DIVIDE([Total Sales] - [Sales LY], [Sales LY], 0)

Budget Total = SUM(Budget[BudgetAmount])
vs Budget % = DIVIDE([Total Sales] - [Budget Total], [Budget Total], 0)

Dynamic KPI = SWITCH(
  SELECTEDVALUE(MetricTable[Metric], "Sales"),
  "Sales", [Total Sales], "Profit", [Total Profit],
  "Orders", [Order Count], [Total Sales])</code></pre>` },
    { type: 'text', body: `<h3>Step 3 — Report Pages</h3>
<p>Build 4 pages:</p>
<p><strong>Page 1 — Executive Summary</strong></p>
<ul>
  <li>KPI header row: 4 Card visuals (Total Sales, YoY %, Profit Margin %, vs Budget %).</li>
  <li>Line chart: DimDate[MonthYear] vs [Total Sales] + [Sales LY] + [Budget Total].</li>
  <li>Bar chart: DimCustomer[Region] vs [Dynamic KPI] (colour-coded by [vs Budget %]).</li>
  <li>MetricTable slicer (single select) + Year slicer + Region slicer (synced to all pages).</li>
</ul>
<p><strong>Page 2 — Product Analysis</strong></p>
<ul>
  <li>Matrix: DimProduct[Category] → DimProduct[SubCategory] on rows, Values: [Total Sales], [Total Profit], [Profit Margin %], [YoY %]. Conditional formatting on margins.</li>
  <li>Treemap: DimProduct[SubCategory] on Category, [Total Sales] on Size.</li>
</ul>
<p><strong>Page 3 — Customer Detail</strong> (drill-through from Page 1 by Region)</p>
<ul>
  <li>Table: DimCustomer[CustomerName], [Total Sales], [Order Count], [Profit Margin %].</li>
  <li>Scatter: X = [Avg Order Value], Y = [Profit Margin %], Details = CustomerName, Size = [Order Count].</li>
</ul>
<p><strong>Page 4 — Mobile Summary</strong> (mobile layout optimised)</p>
<ul>
  <li>3 Cards: Total Sales, YoY %, Profit Margin %.</li>
  <li>Single bar chart by Region.</li>
</ul>` },
    { type: 'exercise', title: 'Complete the capstone — publish, set up RLS, and configure refresh', hint: 'After building all pages, publish to Service, assign Dynamic RLS, and set a daily 6am refresh schedule', solution: `Step 4 — Mobile Layout:
1. View → Mobile layout → arrange Page 4 visuals in a single column.
2. Increase card font sizes to 28pt. Remove data labels from bar chart.

Step 5 — Security:
1. Modeling → Manage Roles → Dynamic → UserRegionMap[Email] = USERPRINCIPALNAME()
2. View as → your role → verify you see only your mapped region's data.
3. Publish to Service.
4. Service → Dataset → Security → assign "Dynamic" role to all regional users.

Step 6 — Refresh:
1. Service → Dataset → Settings → Data source credentials → enter credentials.
2. Scheduled refresh: Daily, 06:00 AM, your timezone.
3. Refresh failure notifications: on.

Step 7 — App:
1. Workspace → Create App.
2. Include pages: Executive Summary, Product Analysis.
3. Exclude Customer Detail from navigation (visible only via drill-through).
4. Publish App → share the App link with your manager for review.

Step 8 — Final test:
Open the App as a Viewer → confirm RLS filters correctly, drill-through works, mobile page renders on phone browser.` }
  ]
};


L['powerbi-w1-quiz'] = { duration_mins: 15, sections: [
  { type:'text', body:`<h2>Module 1 Quiz — Getting Started with Power BI</h2><p>Test your knowledge of the Power BI ecosystem (Desktop, Service, Mobile), the three views (Report, Data, Model), connecting to data sources, and building your first report and visualisation.</p>` }
]};

L['powerbi-w2-quiz'] = { duration_mins: 15, sections: [
  { type:'text', body:`<h2>Module 2 Quiz — Data Transformation with Power Query</h2><p>Test your knowledge of the Power Query Editor, M language fundamentals, common transformations (split, merge, pivot, unpivot), data type conversion, and combining queries with Append and Merge.</p>` }
]};

L['powerbi-w3-quiz'] = { duration_mins: 15, sections: [
  { type:'text', body:`<h2>Module 3 Quiz — Data Modeling</h2><p>Test your knowledge of star and snowflake schema design, creating relationships (cardinality, cross-filter direction), calculated columns vs measures, and best practices for an efficient Power BI data model.</p>` }
]};

L['powerbi-w4-quiz'] = { duration_mins: 15, sections: [
  { type:'text', body:`<h2>Module 4 Quiz — DAX Deep Dive</h2><p>Test your knowledge of CALCULATE, FILTER, ALL/ALLEXCEPT, time intelligence functions (TOTALYTD, SAMEPERIODLASTYEAR), iterator functions (SUMX, AVERAGEX), and writing efficient DAX measures.</p>` }
]};

L['powerbi-w5-quiz'] = { duration_mins: 15, sections: [
  { type:'text', body:`<h2>Module 5 Quiz — Visualisations &amp; Reports</h2><p>Test your knowledge of Power BI chart types, bookmarks and buttons for navigation, drill-through and drill-down, tooltips, custom visuals from AppSource, and report design best practices.</p>` }
]};

L['powerbi-w6-quiz'] = { duration_mins: 15, sections: [
  { type:'text', body:`<h2>Module 6 Quiz — Publishing, Security &amp; Capstone</h2><p>Test your knowledge of publishing to Power BI Service, workspaces and apps, row-level security (RLS) setup, scheduled refresh, sharing and embedding reports, and the end-to-end capstone dashboard.</p>` }
]};

})();

