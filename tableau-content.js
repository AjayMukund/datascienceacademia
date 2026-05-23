(function(){
'use strict';
window.DSA_LESSON_CONTENT = window.DSA_LESSON_CONTENT || {};
const L = window.DSA_LESSON_CONTENT;

/* ─── MODULE 1 — Getting Started with Tableau ───────────────────────────── */

L['tableau-w1-l1'] = {
  title: 'The Tableau Interface — Workspace, Shelves & Cards',
  sections: [
    { type: 'text', body: `<h2>What is Tableau?</h2>
<p>Tableau is a leading data visualisation platform that lets you connect to virtually any data source and build interactive charts, dashboards, and stories without writing code. It sits at the intersection of data analysis and visual communication.</p>
<h3>Tableau Product Family</h3>
<ul>
  <li><strong>Tableau Desktop</strong> — the authoring tool for building workbooks. Available as Creator licence.</li>
  <li><strong>Tableau Public</strong> — free, cloud-hosted version with public-only publishing. Ideal for learning and portfolio work.</li>
  <li><strong>Tableau Server / Tableau Cloud</strong> — enterprise platforms for publishing, sharing, and governing workbooks internally.</li>
  <li><strong>Tableau Prep</strong> — data preparation tool for cleaning and shaping data before analysis.</li>
</ul>
<h3>The Workspace</h3>
<p>When you open a new worksheet, the key areas are:</p>
<ul>
  <li><strong>Data Pane</strong> (left) — all fields from the connected data source. Dimensions (blue) at the top, Measures (green) below the dividing line.</li>
  <li><strong>Shelves</strong> — Rows, Columns, Filters, Pages. Drag fields here to build views.</li>
  <li><strong>Marks Card</strong> — controls how marks (data points) are rendered: Colour, Size, Label, Detail, Tooltip, Shape.</li>
  <li><strong>View / Canvas</strong> — the central area where the visualisation appears.</li>
  <li><strong>Show Me</strong> — chart type recommender in the top-right.</li>
</ul>` },
    { type: 'text', body: `<h3>Dimensions vs Measures</h3>
<p>This is the most fundamental concept in Tableau:</p>
<ul>
  <li><strong>Dimensions</strong> — categorical fields used to slice, group, and label data. Shown in blue. Examples: Region, Product, Customer Name, Date.</li>
  <li><strong>Measures</strong> — numeric fields that are aggregated. Shown in green. Examples: Sales, Profit, Quantity, Temperature.</li>
</ul>
<p>When you place a dimension on Rows/Columns, Tableau creates a header for each distinct member. When you place a measure, Tableau creates an axis and aggregates (SUM by default).</p>
<h3>Discrete vs Continuous</h3>
<ul>
  <li><strong>Discrete</strong> (blue pill) — creates individual headers/labels. Produces a categorical axis.</li>
  <li><strong>Continuous</strong> (green pill) — creates a quantitative axis with a range. Produces a number line.</li>
</ul>
<p>Right-click any field pill on a shelf to switch between Discrete and Continuous. Dates behave differently depending on which you choose — discrete dates group into buckets (Year, Quarter, Month headers); continuous dates produce a timeline axis.</p>` },
    { type: 'tip', body: `Press <strong>Ctrl+Z</strong> generously in Tableau — every action is undoable. Press <strong>Ctrl+Shift+Z</strong> to redo. If you accidentally drag a field to the wrong shelf, Ctrl+Z immediately reverses it. There is no "save as draft" risk in Tableau during exploration.` },
    { type: 'text', body: `<h3>The Show Me Panel</h3>
<p>Click <strong>Show Me</strong> (top-right) to see all available chart types. Tableau highlights which charts are currently buildable based on your selected fields (bold border) and shows which are unavailable (greyed out). Hover over any chart type to see what fields are required.</p>
<p>Show Me is a great starting point, but experienced users typically drag fields directly to the shelves for more control. Rely on it less as you build proficiency.</p>` },
    { type: 'exercise', title: 'Navigate the workspace and build your first view', hint: 'Connect to Tableau\'s built-in Sample - Superstore data, drag Category to Rows and Sales to Columns', solution: `1. Open Tableau Desktop → Connect → Microsoft Excel → Sample - Superstore.xlsx.
2. Drag the "Orders" sheet to the canvas → click "Sheet 1" tab.
3. Drag [Category] to the Rows shelf.
4. Drag [Sales] to the Columns shelf.
5. Tableau auto-creates a horizontal bar chart (SUM of Sales per Category).
6. Click Show Me → try different chart types — notice which fields satisfy each chart's requirements.
7. Rename the sheet: double-click "Sheet 1" tab → type "Sales by Category".` }
  ]
};

L['tableau-w1-l2'] = {
  title: 'Connecting to Data — Files, Databases & Web Sources',
  sections: [
    { type: 'text', body: `<h2>Data Connections in Tableau</h2>
<p>Tableau's power begins with its ability to connect to virtually any data source — from a local Excel file to a cloud data warehouse — through a consistent interface.</p>
<h3>Connection Types</h3>
<ul>
  <li><strong>Files</strong> — Excel (.xlsx), CSV/Text, JSON, PDF, Spatial files (.shp, GeoJSON), Statistical files (.sas7bdat, .sav, .dta).</li>
  <li><strong>Databases (On-premise)</strong> — Microsoft SQL Server, PostgreSQL, MySQL, Oracle, SAP HANA, Teradata.</li>
  <li><strong>Cloud databases</strong> — Google BigQuery, Snowflake, Amazon Redshift, Azure SQL, Databricks.</li>
  <li><strong>Web & API</strong> — Google Sheets, Salesforce, Google Analytics, SharePoint.</li>
</ul>
<h3>The Data Source Page</h3>
<p>After connecting, the Data Source page lets you:</p>
<ul>
  <li>Drag tables from the left panel to the canvas to create joins or unions.</li>
  <li>View a sample of the data (first 1000 rows by default).</li>
  <li>Rename fields, change data types, and create aliases.</li>
  <li>Choose between <strong>Live</strong> connection (queries data source in real time) or <strong>Extract</strong> (copies data into a fast .hyper file).</li>
</ul>` },
    { type: 'text', body: `<h3>Joins vs Unions vs Blending</h3>
<ul>
  <li><strong>Join</strong> — combines tables horizontally (adds columns) on a shared key. Types: Inner, Left, Right, Full Outer. Most common for related tables in the same database.</li>
  <li><strong>Union</strong> — combines tables vertically (appends rows) when they have the same structure. Drag a second table below the first in the data source canvas, or use "New Union".</li>
  <li><strong>Data Blending</strong> — links two different data sources on a shared dimension in the view. The primary source drives the view; the secondary source aggregates to match. Useful for joining data from different connections without building a physical join.</li>
</ul>
<h3>Changing Data Types</h3>
<p>Click the data type icon (Abc, #, calendar) in the Data Source page column header to change it. Common fixes from imports:</p>
<ul>
  <li>Dates stored as strings → change to Date.</li>
  <li>Numeric IDs stored as numbers → change to String (to prevent aggregation).</li>
  <li>Boolean text ("Yes"/"No") → Tableau can interpret automatically or use calculated fields.</li>
</ul>` },
    { type: 'tip', body: `When connecting to a large database, always start with an <strong>Extract</strong> during development. Extracts make queries instant, let you work offline, and prevent accidentally running expensive full-table queries during exploration. Switch to Live connection only for production dashboards that need real-time data.` },
    { type: 'text', body: `<h3>Metadata Management</h3>
<p>In the Data pane, right-click any field to:</p>
<ul>
  <li><strong>Rename</strong> — give business-friendly names (e.g. "Cust. ID" → "Customer ID").</li>
  <li><strong>Hide</strong> — remove cluttered technical fields from the pane without deleting them.</li>
  <li><strong>Create Aliases</strong> — rename individual dimension members (e.g. "US" → "United States").</li>
  <li><strong>Default Aggregation</strong> — set SUM, AVG, etc. as the default when the field is dragged to the view.</li>
  <li><strong>Geographic Role</strong> — assign Country, State, City, Postcode for mapping.</li>
</ul>` },
    { type: 'exercise', title: 'Connect to two sources and blend them', hint: 'Connect Superstore for sales data, a second CSV for regional targets, blend on Region', solution: `1. Connect to Superstore (primary source).
2. Data menu → New Data Source → connect to targets.csv (Region, Target columns).
3. In a new worksheet, drag [Region] and [Sales] from Superstore to the view.
4. From the secondary source (targets.csv), drag [Target] to the view — Tableau blends on Region automatically.
5. The orange chain link icon on [Region] in the secondary source confirms blending is active.
6. Create a calculated field: [Sales] / [Target] to show attainment %.` }
  ]
};

L['tableau-w1-l3'] = {
  title: 'Building Your First Charts — Bar, Line & Pie',
  sections: [
    { type: 'text', body: `<h2>Core Charts in Tableau</h2>
<p>Tableau builds charts by interpreting which fields you place on which shelves. Understanding the "grammar" behind this makes building any chart intuitive.</p>
<h3>Bar Chart</h3>
<p>Bar charts compare values across discrete categories. In Tableau:</p>
<ol>
  <li>Drag a Dimension to <strong>Rows</strong> (creates horizontal bars) or <strong>Columns</strong> (creates vertical bars).</li>
  <li>Drag a Measure to <strong>Columns</strong> (or Rows for vertical). Tableau aggregates as SUM by default.</li>
  <li>To sort: click the Sort icon on the axis, or drag the dimension to the Sort icon in the toolbar.</li>
  <li>To add a second dimension for colour grouping: drag it to the <strong>Colour</strong> shelf on the Marks card → creates a stacked or grouped bar chart.</li>
</ol>
<p>Switch between Stacked and Grouped (Side-by-Side): Analysis menu → Stack Marks → On/Off.</p>` },
    { type: 'text', body: `<h3>Line Chart</h3>
<p>Line charts show change over time. Tableau auto-creates a line chart when a Date field is on Columns and a Measure is on Rows.</p>
<ol>
  <li>Drag [Order Date] to <strong>Columns</strong>. Tableau defaults to YEAR — right-click the pill → select Month (continuous) for a monthly line.</li>
  <li>Drag [Sales] to <strong>Rows</strong>.</li>
  <li>Add a second measure: drag [Profit] to the existing axis (creates a combined axis) or to the right edge for a dual axis.</li>
  <li>To add a Dimension as separate lines: drag it to the <strong>Colour</strong> shelf.</li>
</ol>
<h3>Pie Chart</h3>
<p>Use sparingly — only for part-to-whole with ≤5 slices. In Show Me: select a Dimension + a Measure → click Pie. Or manually: Marks card → change type to Pie → Dimension to Colour, Measure to Angle (Size shelf becomes the Angle shelf for pies).</p>` },
    { type: 'tip', body: `Never accept Tableau's default YEAR aggregation for date fields when you need monthly trends. Right-click the date pill on the shelf → select <strong>Month</strong> from the second section of the menu (continuous months, shown in green). The first section contains discrete date parts (truncated); the second section contains continuous date values — the difference is crucial for how the axis renders.` },
    { type: 'text', body: `<h3>Changing Mark Type</h3>
<p>The Marks card dropdown (default: "Automatic") lets you override the chart type: Bar, Line, Area, Square, Circle, Shape, Text, Map, Pie, Gantt Bar, Polygon. Changing this gives you direct control — e.g. change from Bar to Circle for a dot plot, or to Text to show a table.</p>
<h3>Colour, Size & Label</h3>
<ul>
  <li><strong>Colour</strong> — drag a field here to encode by colour. Click the Colour card → Edit Colors to customise the palette.</li>
  <li><strong>Size</strong> — drag a measure here to encode magnitude as mark size (bubble chart when combined with a scatter plot).</li>
  <li><strong>Label</strong> — drag a field or measure here to display text labels on marks. Click Label → check "Show mark labels" to label all marks.</li>
</ul>` },
    { type: 'exercise', title: 'Build a sorted bar chart with profit colour encoding', hint: 'Sub-Category on Rows, Sales on Columns, Profit on Colour, sort descending by Sales', solution: `1. Drag [Sub-Category] to Rows.
2. Drag [Sales] to Columns → horizontal bar chart.
3. Drag [Profit] to the Colour shelf on the Marks card.
4. Click Colour → Edit Colors → select the Red-Green Diverging palette → centre at 0 → OK.
   (Negative profit = red, positive = green.)
5. Sort: click the Sort Descending icon on the Sales axis (or right-click [Sub-Category] → Sort → By Field → Sales → Descending).
6. Drag [Sales] to the Label shelf → click Label → Font size 9pt → Align right.
7. Rename sheet: "Sub-Category Performance".` }
  ]
};

L['tableau-w1-l4'] = {
  title: 'Filters, Sorting & the Marks Card',
  sections: [
    { type: 'text', body: `<h2>Filtering Data in Tableau</h2>
<p>Filters restrict which data is shown in a view. Tableau has several filter types that execute in a defined order:</p>
<ol>
  <li><strong>Extract Filters</strong> — applied when creating an extract; reduce data permanently.</li>
  <li><strong>Data Source Filters</strong> — applied to the entire data source across all sheets.</li>
  <li><strong>Context Filters</strong> — execute first among view filters; create an independent filtered subset.</li>
  <li><strong>Dimension Filters</strong> — filter by category members.</li>
  <li><strong>Measure Filters</strong> — filter by aggregated values (e.g. only show products with Sales > 10,000).</li>
  <li><strong>Table Calculation Filters</strong> — applied after all other filters and after table calculations run.</li>
</ol>
<h3>Adding a Filter</h3>
<p>Drag any field to the <strong>Filters</strong> shelf → a dialog appears to select members (dimension filter) or set a range (measure filter). Right-click a filter pill → "Show Filter" to display it as an interactive control on the worksheet/dashboard.</p>` },
    { type: 'text', body: `<h3>Filter Types (Display)</h3>
<ul>
  <li><strong>Single Value (List)</strong> — radio buttons; one selection at a time.</li>
  <li><strong>Multiple Values (List)</strong> — checkboxes; multiple selections.</li>
  <li><strong>Single Value (Dropdown)</strong> — compact dropdown menu.</li>
  <li><strong>Wildcard Match</strong> — text search box for dimensions with many members.</li>
  <li><strong>Slider</strong> — range slider for numeric or date measures.</li>
</ul>
<p>Right-click the filter control on the worksheet → "Customise" to switch between display types.</p>
<h3>Apply Filter to Multiple Sheets</h3>
<p>Right-click a filter pill → "Apply to Worksheets" → choose "All Using This Data Source" or "Selected Worksheets". This is how a single filter control drives multiple views on a dashboard without using dashboard actions.</p>
<h3>Context Filters</h3>
<p>When a Top N filter doesn't behave as expected (showing Top 10 of all data instead of Top 10 of the filtered subset), add the restricting filter to context: right-click the filter pill → "Add to Context". The context filter runs first, and the Top N operates on that reduced set.</p>` },
    { type: 'tip', body: `Use <strong>"Show Filter"</strong> on dimension filters and <strong>"Show Highlighter"</strong> (right-click → Show Highlighter) for a non-filtering search. Highlighters keep all marks visible but fade out non-matching ones — great for dashboards where viewers want to emphasise without losing context.` },
    { type: 'exercise', title: 'Add interactive filters and a Top N context filter', hint: 'Add Region filter (shown), then a Top 10 Sub-Category by Sales filter as a context filter', solution: `1. In your Sub-Category bar chart, drag [Region] to Filters → select all → OK → right-click pill → Show Filter.
2. Set filter display type to Single Value (List).
3. Drag [Sub-Category] to Filters → Top tab → By field → Top 10 → By SUM(Sales) → OK.
4. Select "East" in the Region filter → notice the Top 10 shows East's top 10, not the global top 10.
5. Right-click the [Region] filter pill → Add to Context.
   Now the Top 10 correctly shows the top 10 Sub-Categories within East.
6. Right-click the [Sub-Category] filter pill → Show Filter (slider showing 10).` }
  ]
};

L['tableau-w1-l5'] = {
  title: 'Tooltips, Formatting & Annotations',
  sections: [
    { type: 'text', body: `<h2>Tooltips</h2>
<p>Tooltips appear when a viewer hovers over a mark. They are the primary way to show detail without cluttering the chart. By default, Tableau includes all fields in the view. Customise them via the <strong>Tooltip</strong> shelf on the Marks card.</p>
<h3>Editing Tooltips</h3>
<p>Click the Tooltip shelf to open the editor. Use Insert menu (top of dialog) to add field values, sheet names, or page names. Format with bold, italic, font size, and colour. Use <code>&lt;b&gt;</code> and other HTML-lite tags for rich text.</p>
<h3>Viz in Tooltip</h3>
<p>Tableau supports embedding a mini-chart inside a tooltip (Viz in Tooltip). In the tooltip editor, click Insert → Sheets → select a worksheet. When a viewer hovers over a mark, a small chart appears showing detail for that mark's context — e.g. hover over a region bar → tooltip shows a line chart of that region's monthly trend.</p>
<p>The tooltip sheet is filtered to the hovered mark's context automatically.</p>` },
    { type: 'text', body: `<h3>Formatting in Tableau</h3>
<p>Tableau has multiple levels of formatting (from most specific to most general):</p>
<ol>
  <li><strong>Field-level format</strong> — right-click a field → Format. Applies to that field everywhere.</li>
  <li><strong>Worksheet format</strong> — Format menu → controls fonts, shading, borders, lines for the entire sheet.</li>
  <li><strong>Workbook-level defaults</strong> — Format → Workbook → sets defaults inherited by all sheets.</li>
</ol>
<p>Key formatting actions:</p>
<ul>
  <li><strong>Number format</strong> — right-click a measure pill → Format → Numbers. Set currency, percentage, decimal places.</li>
  <li><strong>Axis formatting</strong> — right-click the axis → Format Axis. Control tick marks, range, title.</li>
  <li><strong>Remove gridlines</strong> — Format → Lines → set Grid Lines to None for a cleaner look.</li>
  <li><strong>Hide field labels</strong> — right-click an axis label → Hide Field Labels for Rows/Columns.</li>
</ul>` },
    { type: 'text', body: `<h3>Annotations</h3>
<p>Annotations draw attention to specific insights on a chart. Right-click anywhere on the view → Annotate → choose type:</p>
<ul>
  <li><strong>Mark</strong> — annotates a specific data mark; moves with the mark when data updates.</li>
  <li><strong>Point</strong> — annotates a fixed x/y position on the axes; does NOT move with data.</li>
  <li><strong>Area</strong> — annotates a rectangular region of the view.</li>
</ul>
<p>Double-click an annotation to edit its text. Drag the annotation box to reposition. Use annotations sparingly to highlight key insights — too many clutter the view.</p>` },
    { type: 'tip', body: `For clean professional charts, use <strong>Format → Shading</strong> to set the worksheet background to white (not the default light grey), and remove the default worksheet border. These two changes alone make Tableau charts look significantly more polished when placed on dashboards.` },
    { type: 'exercise', title: 'Build a rich tooltip with Viz in Tooltip', hint: 'Create a detail line chart sheet, then embed it in the tooltip of your main bar chart', solution: `1. Create a new sheet "Monthly Trend (Tooltip)":
   - [Order Date] (Month, continuous) on Columns
   - [Sales] on Rows → line chart
   - Title: <Sheet Name> (auto-shows filtered context)
2. Go back to your "Sub-Category Performance" bar chart.
3. Click Tooltip shelf on Marks card → Insert → Sheets → "Monthly Trend (Tooltip)".
4. Set width 300, height 200 → OK.
5. Hover over any Sub-Category bar → a mini line chart appears showing that category's monthly sales.
6. Edit the tooltip text to add: "<b><Sub-Category></b>: £<SUM(Sales)>" above the chart.` }
  ]
};

/* ─── MODULE 2 — Core Chart Types & Visual Analytics ────────────────────── */

L['tableau-w2-l1'] = {
  title: 'Time Series — Trend Lines, Forecasting & Reference Lines',
  sections: [
    { type: 'text', body: `<h2>Time Series Analysis in Tableau</h2>
<p>Time series are among the most common analyses in business — tracking performance over time, identifying seasonality, and projecting forward. Tableau's Analytics pane provides built-in statistical overlays without any manual calculation.</p>
<h3>Building a Time Series</h3>
<ol>
  <li>Drag [Order Date] to <strong>Columns</strong> — right-click the pill → choose a date granularity. Use Month (continuous, green) for monthly line charts.</li>
  <li>Drag a Measure to <strong>Rows</strong>.</li>
  <li>For multiple lines by category: drag a Dimension to <strong>Colour</strong>.</li>
  <li>To show multiple measures: drag a second measure to the Rows shelf (creates two row panels) or to the existing axis (combined axis).</li>
</ol>
<h3>The Analytics Pane</h3>
<p>Click the <strong>Analytics</strong> tab at the top of the Data pane. Drag these onto the view:</p>
<ul>
  <li><strong>Trend Line</strong> — fits a statistical model (Linear, Logarithmic, Exponential, Polynomial, Power). Hover over the trend line to see the model equation, R-squared, and p-value in the tooltip.</li>
  <li><strong>Average Line</strong> — draws a constant line at the overall or per-pane average.</li>
  <li><strong>Median with Quartiles</strong> — shows the median and IQR bands.</li>
  <li><strong>Reference Line</strong> — constant value, field value, or band.</li>
  <li><strong>Forecast</strong> — projects future values using exponential smoothing.</li>
</ul>` },
    { type: 'text', body: `<h3>Reference Lines & Bands</h3>
<p>Right-click the axis → Add Reference Line to add:</p>
<ul>
  <li><strong>Line</strong> — at a constant value (e.g. target = 50,000), a field's aggregate, or a parameter value.</li>
  <li><strong>Band</strong> — a shaded region between two values (e.g. acceptable range: 45,000–55,000).</li>
  <li><strong>Distribution</strong> — standard deviation bands or percentile lines around the average.</li>
</ul>
<h3>Forecasting</h3>
<p>Drag "Forecast" from the Analytics pane onto the view — Tableau's exponential smoothing model extends the trend into future periods. Tableau automatically determines the seasonality model (additive vs multiplicative). Right-click the forecast → Describe Forecast to see model details and prediction intervals.</p>
<p>Requirements: at least 5 data points; date field with regular intervals (monthly, quarterly) on Columns.</p>` },
    { type: 'tip', body: `Always check the <strong>R-squared and p-value</strong> before presenting a trend line. An R-squared near 0 means the trend line explains almost none of the variance — the trend is meaningless. A p-value above 0.05 means the trend is not statistically significant. Hover over the trend line to see these values in the tooltip.` },
    { type: 'exercise', title: 'Build a monthly sales trend with forecast and target reference line', hint: 'Date on Columns (Month, continuous), Sales on Rows, add Trend Line + Forecast + Reference Line at target value', solution: `1. [Order Date] (continuous Month) on Columns, [Sales] on Rows → line chart.
2. Analytics pane → drag Trend Line onto the view → Linear.
3. Hover over trend line: note R² and p-value.
4. Analytics pane → drag Forecast onto the view.
5. Right-click forecast area → Forecast Options → set 6 months forward.
6. Right-click the Sales axis → Add Reference Line → set Value to Constant → 50000 → label "Target" → red dashed line.
7. The view now shows actual sales (solid line), trend (dashed), forecast (shaded), and target reference.` }
  ]
};

L['tableau-w2-l2'] = {
  title: 'Maps — Geographic Visualisations & Spatial Analysis',
  sections: [
    { type: 'text', body: `<h2>Maps in Tableau</h2>
<p>Tableau has built-in geocoding for countries, states/provinces, cities, postal codes, and airports for most of the world. Drag a geographic field to the view and Tableau automatically creates a map.</p>
<h3>Map Types</h3>
<ul>
  <li><strong>Symbol Map</strong> — circles (or other shapes) at geographic locations sized and coloured by a measure. Most flexible — supports any number of marks.</li>
  <li><strong>Filled Map (Choropleth)</strong> — fills geographic polygons (countries, states) with colour based on a measure. Best for administrative boundaries. In Show Me: select "filled maps".</li>
  <li><strong>Density Map (Heatmap)</strong> — shows concentration of marks; useful for point data with many overlapping locations. Marks card → type → Density.</li>
</ul>
<h3>Setting Geographic Roles</h3>
<p>Right-click a field in the Data pane → Geographic Role → assign Country, State/Province, City, Postcode, or Latitude/Longitude. Tableau then knows how to geocode it. If Tableau cannot resolve a location, it adds an "X unknown" indicator in the bottom-right — click it to resolve ambiguous locations manually.</p>` },
    { type: 'text', body: `<h3>Using Custom Latitude & Longitude</h3>
<p>If your data has Latitude and Longitude columns:</p>
<ol>
  <li>Double-click [Latitude] → Tableau places it on the Rows shelf as a geographic field.</li>
  <li>Double-click [Longitude] → placed on Columns.</li>
  <li>Change Marks type to Circle → drag other fields to Colour and Size.</li>
</ol>
<p>This creates a precise point map at the exact coordinates in your data.</p>
<h3>Map Layers</h3>
<p>Map menu → Map Layers → toggle satellite imagery, streets, terrain, borders, place names. Use the Washout slider to de-emphasise the base map and let data marks stand out. For a minimal dashboard, use "Light" or "None" as the base map and rely on borders only.</p>
<h3>Spatial Files</h3>
<p>Tableau connects directly to shapefiles (.shp), GeoJSON, KML, and TopoJSON. This enables mapping of custom geographies not in Tableau's built-in geocoding (e.g. sales territories, custom regions, store catchment areas).</p>` },
    { type: 'tip', body: `For UK postcode data, Tableau's built-in geocoding works to postcode district level (the first 2–4 characters, e.g. "SW1"). For full UK postcodes, you'll need to join your data to a postcode → latitude/longitude lookup table and use custom Lat/Long coordinates instead of relying on the built-in geocoder.` },
    { type: 'exercise', title: 'Build a state-level sales choropleth with drill-down', hint: 'State on Detail, SUM(Sales) on Colour, filled map type, add city-level symbol layer via dual axis', solution: `1. Double-click [State] in the Data pane → Tableau creates a symbol map automatically.
2. Show Me → Filled Maps → Tableau fills each state by mark count; drag [Sales] to Colour.
3. Edit Colors → choose Blue-Teal Sequential → set 5 steps → OK.
4. Drag [Sales] to the Label shelf → Format as currency.
5. For drill-down: duplicate the Latitude pill on the Rows shelf (Ctrl+drag) → creates a second map layer → change second Marks card type to Circle → drag [City] to Detail.
6. Right-click the second Latitude axis → Dual Axis → synchronise axes.
7. Now the map shows filled states (aggregate sales) with city circles overlaid.` }
  ]
};

L['tableau-w2-l3'] = {
  title: 'Scatter Plots — Relationships, Clusters & Outliers',
  sections: [
    { type: 'text', body: `<h2>Scatter Plots for Relationship Analysis</h2>
<p>Scatter plots reveal correlations, clusters, and outliers between two numeric variables. In Tableau, a scatter plot requires two Measures on the X and Y axes and typically a Dimension on Detail to disaggregate marks to the individual level.</p>
<h3>Building a Scatter Plot</h3>
<ol>
  <li>Drag a Measure to <strong>Columns</strong> (x-axis) — e.g. [Discount].</li>
  <li>Drag a second Measure to <strong>Rows</strong> (y-axis) — e.g. [Profit].</li>
  <li>Drag a Dimension to <strong>Detail</strong> on the Marks card to disaggregate (e.g. [Order ID] for one mark per order).</li>
  <li>Add Colour by a categorical dimension (e.g. [Category]) to distinguish groups.</li>
  <li>Add a Measure to <strong>Size</strong> (e.g. [Sales]) to create a bubble chart.</li>
</ol>
<h3>Adding a Trend Line</h3>
<p>Analytics pane → drag Trend Line → Linear. For coloured scatter plots, Tableau can draw one trend line per colour group or one overall trend line — choose via the trend line placement target (drop on the individual pane or the entire view).</p>` },
    { type: 'text', body: `<h3>Clustering</h3>
<p>Analytics pane → drag <strong>Cluster</strong> onto the view → Tableau runs a k-means algorithm and colour-codes marks into clusters automatically. In the Clusters dialog, set the number of clusters or let Tableau determine it. Clusters appear as a new field in the Data pane and can be saved for use in other sheets.</p>
<h3>Identifying Outliers</h3>
<p>Use a reference band (standard deviation) to define the "normal" range:</p>
<ul>
  <li>Right-click the y-axis → Add Reference Line → Distribution → Standard Deviation → ±2 standard deviations → fill the band with a light colour.</li>
  <li>Marks outside the band are visual outliers.</li>
</ul>
<p>Or use a calculated field: <code>IF [Profit] &lt; PERCENTILE([Profit], 0.05) THEN "Outlier" ELSE "Normal" END</code> — then colour by this field.</p>` },
    { type: 'tip', body: `When you first create a scatter plot with two measures and no dimension on Detail, Tableau shows a <em>single mark</em> — the aggregate of the entire dataset. This is almost never what you want. Always drag a dimension to the <strong>Detail</strong> shelf to disaggregate into individual marks before drawing any conclusions from a scatter plot.` },
    { type: 'exercise', title: 'Profit vs Discount scatter with clustering', hint: 'Discount on X, Profit on Y, Order ID on Detail, Category on Colour, add k-means clusters', solution: `1. [Discount] on Columns, [Profit] on Rows.
2. Drag [Order ID] to Detail → one mark per order (thousands of marks appear).
3. Drag [Category] to Colour — three-colour scatter by category.
4. Analytics pane → drag Cluster onto the view → set 3 clusters → OK.
5. The clusters override the Category colour — note which orders cluster together.
6. Analytics pane → drag Trend Line → Linear → drop on "All" to show one overall trend.
7. The negative trend confirms: higher discounts correlate with lower profit.
8. Right-click the x-axis → Format → set number format to Percentage.` }
  ]
};

L['tableau-w2-l4'] = {
  title: 'Dual-Axis & Combo Charts',
  sections: [
    { type: 'text', body: `<h2>When to Use Dual-Axis Charts</h2>
<p>Dual-axis charts display two measures with different scales on a single chart — for example, Revenue (in millions) on the left axis and Profit Margin (as a percentage) on the right. They are powerful but easily misread if axes are not clearly labelled.</p>
<h3>Creating a Dual-Axis Chart</h3>
<p><strong>Method 1 — Drag to axis:</strong></p>
<ol>
  <li>Build a chart with one measure on Rows.</li>
  <li>Drag a second measure to the <em>right edge</em> of the existing axis — wait for the green dashed double-line indicator → drop it. A second axis appears on the right.</li>
</ol>
<p><strong>Method 2 — Right-click pill:</strong></p>
<ol>
  <li>Drag both measures to Rows (creates two separate row panels).</li>
  <li>Right-click the second measure pill → Dual Axis.</li>
</ol>
<h3>Synchronising Axes</h3>
<p>After creating a dual axis, right-click the secondary (right) axis → Synchronise Axis. Do this when both measures are on the same scale. Skip it when the scales are intentionally different (e.g. currency vs percentage).</p>` },
    { type: 'text', body: `<h3>Building a Bar + Line Combo Chart</h3>
<ol>
  <li>[Order Date] (Month) on Columns, [Sales] and [Profit] both on Rows → two line panels.</li>
  <li>Right-click [Profit] pill → Dual Axis.</li>
  <li>In the All Marks card, change type to Automatic (or Bar) for the first measure.</li>
  <li>Click the second Marks card (the one for Profit) → change type to Line.</li>
  <li>Right-click the secondary axis → Synchronise Axis → then un-synchronise if scales differ.</li>
  <li>Format each series with distinct colours (e.g. bar = teal, line = orange).</li>
</ol>
<h3>Shared Axis (Multiple Measures)</h3>
<p>If both measures have the same unit, use a <strong>shared axis</strong> instead of dual axis: drag the second measure onto the existing axis (not the right edge) — when you see a green bar indicator, drop it. Both measures share one axis and are distinguished by colour in the Marks card.</p>` },
    { type: 'tip', body: `Always label both axes on a dual-axis chart and use contrasting colours for the two series. A common mistake is having the line and bar series in similar colours — viewers can't tell which axis belongs to which series. Add the axis title (right-click axis → Edit Axis → Axis Titles) and match the axis label colour to its series colour.` },
    { type: 'exercise', title: 'Monthly Revenue bars with Profit Margin % line', hint: 'Sales on Columns (bar), Profit Ratio as a calculated field on dual axis (line), synchronise off', solution: `1. [Order Date] (Month, continuous) on Columns.
2. [Sales] on Rows → bar chart (Marks card → Bar).
3. Create calculated field "Profit Ratio": SUM([Profit]) / SUM([Sales])
4. Drag [Profit Ratio] to Rows → right-click pill → Dual Axis.
5. Click [Profit Ratio] Marks card → change to Line → colour orange.
6. Right-click the right axis → Do NOT synchronise (scales differ: currency vs ratio).
7. Right-click the right axis → Format Axis → Numbers → Percentage with 1 decimal.
8. Right-click the right axis → Edit Axis → Title: "Profit Margin %".
9. Format [Sales] axis → Numbers → Currency (millions: #,##0.0,,M).` }
  ]
};

L['tableau-w2-l5'] = {
  title: 'Histograms, Box Plots & Statistical Distributions',
  sections: [
    { type: 'text', body: `<h2>Understanding Data Distributions</h2>
<p>Bar charts compare totals across categories. Distribution charts answer a different question: <em>how is a single measure spread across its range?</em> These are essential for quality control, customer behaviour analysis, and outlier detection.</p>
<h3>Histogram</h3>
<p>A histogram groups continuous data into equal-width bins and counts how many values fall in each bin. In Tableau:</p>
<ol>
  <li>Show Me: select a single Measure → click "histogram" in Show Me. Tableau auto-creates bins and builds the histogram.</li>
  <li>Manually: right-click a Measure in the Data pane → Create → Bins → set Bin Size → OK. Drag the new bin field to Columns, the measure (COUNT or COUNTD) to Rows.</li>
  <li>Adjust bin size: right-click the bin field → Edit → change the size. A parameter can control this interactively.</li>
</ol>
<h3>Box Plot (Box-and-Whisker)</h3>
<p>Box plots show the distribution's quartiles and outliers in a compact format. Drag a Dimension to Columns, a Measure to Rows, change Marks to Circle (to show individual points), then from Show Me → Box-and-Whisker plots. Or: Analytics pane → drag Box Plot onto the view.</p>` },
    { type: 'text', body: `<h3>Reading a Box Plot</h3>
<ul>
  <li><strong>Box</strong> — spans from Q1 (25th percentile) to Q3 (75th percentile). Width = IQR (interquartile range).</li>
  <li><strong>Line in box</strong> — median (Q2).</li>
  <li><strong>Whiskers</strong> — extend to 1.5× IQR beyond Q1 and Q3 (Tableau's default).</li>
  <li><strong>Individual circles beyond whiskers</strong> — outliers.</li>
</ul>
<h3>Violin Plot Alternative</h3>
<p>Tableau doesn't have a native violin plot, but you can approximate one by combining a mirrored density plot (Marks → Density) with a box plot overlay using a dual axis.</p>
<h3>Calculated Percentiles</h3>
<p>For threshold-based analysis, use Tableau's statistical functions in calculated fields:</p>
<ul>
  <li><code>PERCENTILE([Sales], 0.9)</code> — 90th percentile (table calculation).</li>
  <li><code>WINDOW_PERCENTILE(SUM([Sales]), 0.9)</code> — percentile across the window.</li>
</ul>` },
    { type: 'tip', body: `When creating a histogram for customer order values, start with a bin size that gives 10–20 bins. Too many bins (bin size too small) creates a noisy, jagged histogram; too few (bin size too large) hides the distribution shape. A <strong>parameter</strong> controlling bin size lets dashboard users explore the distribution at different granularities interactively.` },
    { type: 'exercise', title: 'Distribution analysis: histogram + box plot', hint: 'Build a histogram of Sales, then a box plot of Sales by Category side by side in a dashboard', solution: `Sheet 1 — Histogram:
1. Right-click [Sales] → Create → Bins → size 500 → name "Sales (bin)".
2. Drag [Sales (bin)] to Columns → Drag [Sales] to Rows → change to COUNT.
3. Create parameter "Bin Size" (Integer, range 100–5000, step 100).
4. Edit the [Sales (bin)] bin: right-click → Edit → use parameter for size.
5. Show the Bin Size parameter control.

Sheet 2 — Box Plot:
1. [Category] on Columns, [Sales] on Rows.
2. Marks → Circle (show individual orders).
3. Analytics pane → drag Box Plot onto view.
4. Format whiskers to show mean as a cross.

Dashboard: place both sheets side by side.` }
  ]
};

/* ─── MODULE 3 — Calculations & LOD Expressions ─────────────────────────── */

L['tableau-w3-l1'] = {
  title: 'Calculated Fields — String, Date & Number Functions',
  sections: [
    { type: 'text', body: `<h2>Calculated Fields in Tableau</h2>
<p>Calculated fields create new fields derived from existing data, formulas, or constants. They exist only within Tableau — the underlying data source is never modified. Create them via: Analysis → Create Calculated Field, or right-click in the Data pane → Create Calculated Field.</p>
<h3>String Functions</h3>
<table>
  <tr><th>Function</th><th>Usage</th><th>Example</th></tr>
  <tr><td>LEFT(str, n)</td><td>First n characters</td><td>LEFT([Name], 1) → first initial</td></tr>
  <tr><td>RIGHT(str, n)</td><td>Last n characters</td><td>RIGHT([PostCode], 3)</td></tr>
  <tr><td>MID(str, start, len)</td><td>Substring from position</td><td>MID([SKU], 4, 3)</td></tr>
  <tr><td>CONTAINS(str, sub)</td><td>TRUE if substring exists</td><td>CONTAINS([Description], "Organic")</td></tr>
  <tr><td>STARTSWITH / ENDSWITH</td><td>Pattern matching</td><td>STARTSWITH([Code], "UK-")</td></tr>
  <tr><td>REPLACE(str, old, new)</td><td>String substitution</td><td>REPLACE([Phone], "-", "")</td></tr>
  <tr><td>UPPER / LOWER / PROPER</td><td>Case conversion</td><td>PROPER([Customer Name])</td></tr>
  <tr><td>TRIM(str)</td><td>Remove leading/trailing spaces</td><td>TRIM([Region])</td></tr>
  <tr><td>STR(number)</td><td>Convert to string</td><td>STR([Year]) + " Report"</td></tr>
  <tr><td>INT(str)</td><td>Convert to integer</td><td>INT([Quantity String])</td></tr>
</table>` },
    { type: 'text', body: `<h3>Date Functions</h3>
<ul>
  <li><code>DATEPART('month', [Order Date])</code> — returns numeric month (1–12).</li>
  <li><code>DATENAME('month', [Order Date])</code> — returns month name ("January").</li>
  <li><code>DATETRUNC('month', [Order Date])</code> — truncates to first day of month. Use for grouping to a consistent date level.</li>
  <li><code>DATEDIFF('day', [Order Date], [Ship Date])</code> — number of days between two dates.</li>
  <li><code>DATEADD('month', 3, [Order Date])</code> — adds 3 months to a date.</li>
  <li><code>TODAY()</code> — current date. <code>NOW()</code> — current datetime.</li>
</ul>
<h3>Number Functions</h3>
<ul>
  <li><code>ROUND([Sales], 2)</code> — round to 2 decimal places.</li>
  <li><code>ABS([Profit])</code> — absolute value.</li>
  <li><code>MAX([Sales], [Target])</code> — larger of two values (row-level, not aggregate MAX).</li>
  <li><code>SQRT([Value])</code> — square root.</li>
  <li><code>LOG([Revenue])</code> — natural log. <code>LOG([Revenue], 10)</code> — log base 10.</li>
  <li><code>ZN([Profit])</code> — return 0 if null (prevents gaps in charts).</li>
</ul>` },
    { type: 'tip', body: `Use <code>DATETRUNC('month', [Order Date])</code> (not <code>DATENAME</code>) as your "Month" grouping field in time-series charts. DATETRUNC returns an actual date (e.g. 01/01/2024) which sorts chronologically. DATENAME returns "January" which sorts alphabetically — April comes before August, which sorts before January, breaking your time axis.` },
    { type: 'exercise', title: 'Build shipping performance calculated fields', hint: 'Days to Ship = DATEDIFF, Late Flag = IF Days > 3, Category from name prefix using CONTAINS', solution: `1. [Days to Ship]: DATEDIFF('day', [Order Date], [Ship Date])
2. [Late Shipment]: IF [Days to Ship] > 3 THEN "Late" ELSE "On Time" END
3. [Product Category from Name]:
   IF CONTAINS([Product Name], "Chair") THEN "Seating"
   ELSEIF CONTAINS([Product Name], "Table") THEN "Tables"
   ELSE "Other" END
4. [Month Label]: DATENAME('month', [Order Date]) + " " + STR(YEAR([Order Date]))
5. Drag [Late Shipment] to Colour on a bar chart of Sub-Category by SUM([Days to Ship]).
   Red = Late average, green = On Time average.` }
  ]
};

L['tableau-w3-l2'] = {
  title: 'Logical Calculations — IF, IIF, CASE & ZN',
  sections: [
    { type: 'text', body: `<h2>Logical Functions in Tableau</h2>
<p>Logical calculations create conditional fields — categorising data, flagging records, and applying business rules. They are the most commonly written calculated fields in Tableau.</p>
<h3>IF / ELSEIF / ELSE / END</h3>
<p>The standard multi-branch conditional:</p>
<pre>IF [Sales] >= 10000 THEN "High"
ELSEIF [Sales] >= 5000 THEN "Medium"
ELSE "Low"
END</pre>
<h3>IIF — Inline IF</h3>
<p>A compact ternary for two outcomes: <code>IIF(condition, true_value, false_value, null_value)</code></p>
<pre>IIF([Profit] > 0, "Profitable", "Loss")</pre>
<p>The optional fourth argument handles NULLs. IIF is faster to write but less readable for complex conditions — use IF/ELSE for anything with more than two branches.</p>
<h3>CASE / WHEN / ELSE / END</h3>
<p>More readable than nested IF for exact-match lookups:</p>
<pre>CASE [Ship Mode]
  WHEN "First Class" THEN "Premium"
  WHEN "Second Class" THEN "Standard"
  WHEN "Standard Class" THEN "Economy"
  ELSE "Unknown"
END</pre>` },
    { type: 'text', body: `<h3>Boolean Logic</h3>
<p>Use AND, OR, NOT to combine conditions:</p>
<pre>IF [Region] = "East" AND [Sales] > 5000 THEN "Priority East"
ELSEIF [Region] = "West" OR [Profit] < 0 THEN "Flag"
ELSE "Normal"
END</pre>
<h3>NULL Handling</h3>
<ul>
  <li><code>ISNULL([Field])</code> — returns TRUE if the field is null.</li>
  <li><code>IFNULL([Field], "N/A")</code> — returns "N/A" if null, otherwise the field value.</li>
  <li><code>ZN([Field])</code> — returns 0 if null, otherwise the numeric value.</li>
</ul>
<p>NULL handling is critical in Tableau — nulls propagate silently and can cause gaps in charts, incorrect totals, or misleading averages. Always check for nulls in fields used in key calculations.</p>
<h3>IN Operator</h3>
<pre>[Region] IN ("East", "West", "North")</pre>
<p>Equivalent to <code>[Region]="East" OR [Region]="West" OR [Region]="North"</code> — cleaner for multiple exact matches.</p>` },
    { type: 'tip', body: `Avoid deeply nested IIF statements — they become unreadable quickly. If you find yourself writing <code>IIF(a, IIF(b, IIF(c, x, y), z), w)</code>, rewrite as an IF/ELSEIF/ELSE block or a CASE statement. Readability matters for maintenance and collaboration.` },
    { type: 'exercise', title: 'Customer segmentation with CASE and IF/AND logic', hint: 'Use CASE for RFM segment labels, IF/AND for VIP flag (high recency AND high spend)', solution: `1. [Customer Tier] — using a pre-calculated score field:
CASE
  WHEN [RFM Score] >= 8 THEN "Champion"
  WHEN [RFM Score] >= 6 THEN "Loyal"
  WHEN [RFM Score] >= 4 THEN "At Risk"
  ELSE "Churned"
END

2. [VIP Flag]:
IF [Total Spend] >= 5000 AND [Orders Last 90 Days] >= 3
THEN "VIP"
ELSE "Standard"
END

3. [Days Since Last Order]:
DATEDIFF('day', [Last Order Date], TODAY())

4. [Reactivation Needed]:
IF [Days Since Last Order] > 180 AND [Customer Tier] = "Champion"
THEN "High Priority Reactivation"
ELSEIF [Days Since Last Order] > 90
THEN "Monitor"
ELSE "Active"
END` }
  ]
};

L['tableau-w3-l3'] = {
  title: 'Table Calculations — Running Total, Rank & Percent of Total',
  sections: [
    { type: 'text', body: `<h2>Table Calculations</h2>
<p>Table calculations are computed on the aggregated data already in the view — not on the underlying row-level data. They operate across the table's structure (rows and columns as you see them) rather than across database rows.</p>
<p>Add a table calculation: right-click any measure pill on the Rows/Columns shelf → Add Table Calculation → choose type and addressing/partitioning settings.</p>
<h3>Common Table Calculations</h3>
<ul>
  <li><strong>Running Total</strong> — cumulative sum across the addressing direction. Year-to-date sales, cumulative customer count.</li>
  <li><strong>Percent of Total</strong> — each value divided by the total of all values in the partition. Market share, revenue share by region.</li>
  <li><strong>Rank</strong> — ranks marks 1, 2, 3... within the partition. Top performers, league tables.</li>
  <li><strong>Difference</strong> — value minus the previous value. Month-over-month change, week-over-week growth.</li>
  <li><strong>Percent Difference</strong> — (value − previous) / previous. MoM % growth.</li>
  <li><strong>Moving Average</strong> — rolling average over the previous N values. Smooths volatile time series.</li>
</ul>` },
    { type: 'text', body: `<h3>Addressing vs Partitioning</h3>
<p>The most confusing aspect of table calculations — and the most important to understand:</p>
<ul>
  <li><strong>Addressing</strong> — the direction in which the calculation moves (computes across). For a running total, this is typically "across" columns (months) or "down" rows.</li>
  <li><strong>Partitioning</strong> — the field(s) that restart the calculation. For a running total by region, Region is the partition — the total resets for each region.</li>
</ul>
<p>In the Table Calculation dialog, "Compute Using" controls this. Options: Table (across), Table (down), Pane (across/down), Specific Dimensions (explicit control).</p>
<h3>Quick Table Calculations</h3>
<p>The fastest way to add common calculations: right-click a measure pill → Quick Table Calculation → select type. The calculation is applied immediately with default addressing settings.</p>` },
    { type: 'tip', body: `When a table calculation produces unexpected results, edit the calculation and check the <strong>"Compute Using" setting</strong>. The orange highlighted cells in the preview show which marks are being calculated together. If the orange grouping doesn't match your intent, change the partitioning fields.` },
    { type: 'exercise', title: 'Year-to-date running total and MoM % change', hint: 'Running Total (SUM) across Month for YTD, Percent Difference for MoM change, both as quick table calcs', solution: `1. [Order Date] (Month, continuous) on Columns, [Sales] on Rows → line chart.
2. Duplicate [Sales] (Ctrl+drag pill) onto Rows → two panels.
3. Right-click first [Sales] pill → Quick Table Calculation → Running Total.
4. Rename axis: "YTD Sales (Running Total)".
5. Right-click second [Sales] pill → Quick Table Calculation → Percent Difference.
6. Change second Marks type to Bar (to distinguish from the running total line).
7. Add a Reference Line at 0 on the Percent Difference axis.
8. Red bars below 0 = MoM decline, green bars above 0 = growth.
9. Add both to a dashboard for an executive performance summary.` }
  ]
};

L['tableau-w3-l4'] = {
  title: 'Level of Detail (LOD) Expressions — FIXED, INCLUDE & EXCLUDE',
  sections: [
    { type: 'text', body: `<h2>LOD Expressions</h2>
<p>Level of Detail (LOD) expressions are one of Tableau's most powerful features. They allow you to compute aggregations at a <em>different</em> level of detail than the current view — without table calculations or secondary data sources.</p>
<p>Syntax: <code>{ LOD_TYPE [dimension(s)] : aggregate_expression }</code></p>
<h3>FIXED</h3>
<p>Computes the aggregate at the specified dimension(s), <em>ignoring</em> all other dimensions in the view:</p>
<pre>{ FIXED [Region] : SUM([Sales]) }</pre>
<p>Returns the total sales for each Region. This value is the same for every row within a Region, regardless of what other dimensions are in the view. Use cases:</p>
<ul>
  <li>Proportion of total: <code>SUM([Sales]) / { FIXED : SUM([Sales]) }</code> (the <code>{ FIXED : }</code> gives the grand total).</li>
  <li>Customer first order date: <code>{ FIXED [Customer ID] : MIN([Order Date]) }</code></li>
  <li>Cohort analysis: group customers by acquisition month using their first order date.</li>
</ul>` },
    { type: 'text', body: `<h3>INCLUDE</h3>
<p>Computes at the view's level of detail <em>plus</em> the specified dimension — finer granularity than the view:</p>
<pre>{ INCLUDE [Product ID] : AVG([Price]) }</pre>
<p>If the view is at Category level, this computes the average price per Product ID and then averages those per Category — different from simply AVG(Price) at the Category level. Use for: average of customer averages (avoiding Simpson's paradox), per-product metrics averaged to a category level.</p>
<h3>EXCLUDE</h3>
<p>Computes at the view's level of detail <em>minus</em> the specified dimension — coarser granularity:</p>
<pre>{ EXCLUDE [Month] : SUM([Sales]) }</pre>
<p>When Month is in the view, this gives the annual total (ignoring Month) for each row — enabling ratio calculations like monthly % of annual total: <code>SUM([Sales]) / { EXCLUDE [Month] : SUM([Sales]) }</code></p>
<h3>FIXED vs Filters</h3>
<p>FIXED LOD expressions are computed <em>before</em> dimension filters but <em>after</em> context filters. If you want a FIXED LOD to respect a filter, add that filter to context (right-click filter → Add to Context).</p>` },
    { type: 'tip', body: `The most common LOD use case is the <strong>"percent of total at a coarser grain"</strong> pattern: <code>SUM([Sales]) / { FIXED [Region] : SUM([Sales]) }</code>. This gives each sub-category's share of its region's total, regardless of how many sub-categories are in the view — a clean alternative to table calculations that can be unreliable when filtering.` },
    { type: 'exercise', title: 'Customer cohort analysis with FIXED LOD', hint: 'First order date per customer (FIXED), then DATETRUNC to cohort month, show cohort size and retention', solution: `1. [First Order Date]: { FIXED [Customer ID] : MIN([Order Date]) }
2. [Cohort Month]: DATETRUNC('month', [First Order Date])
3. [Months Since First Order]: DATEDIFF('month', [First Order Date], [Order Date])
4. Build the cohort table:
   - [Cohort Month] on Rows (discrete)
   - [Months Since First Order] on Columns (0, 1, 2... 11)
   - COUNTD([Customer ID]) on Text/Colour (how many customers from each cohort ordered in each subsequent month)
5. Add a calculated field [Retention Rate]:
   COUNTD([Customer ID]) / { FIXED [Cohort Month] : COUNTD([Customer ID]) }
   Drag this to Colour with a sequential colour scale (higher = better retention).` }
  ]
};

L['tableau-w3-l5'] = {
  title: 'Parameters & Parameter Actions',
  sections: [
    { type: 'text', body: `<h2>Parameters in Tableau</h2>
<p>A parameter is a user-controlled variable — a single value that viewers can change via a slider, dropdown, or input box. Unlike filters (which show/hide data), parameters feed values into calculated fields, reference lines, bin sizes, and top N controls.</p>
<h3>Creating a Parameter</h3>
<ol>
  <li>Data pane → right-click → Create Parameter.</li>
  <li>Give it a name, data type (Integer, Float, String, Boolean, Date), and current value.</li>
  <li>Allowable values: All (free input), List (predefined options), Range (min/max/step).</li>
  <li>Click OK → right-click the new parameter → Show Parameter Control.</li>
</ol>
<h3>Using Parameters in Calculations</h3>
<pre>// Top N parameter (integer, 1-20)
RANK(SUM([Sales])) <= [Top N]

// Dynamic metric selector (string: "Sales", "Profit", "Quantity")
IF [Metric Selector] = "Sales" THEN SUM([Sales])
ELSEIF [Metric Selector] = "Profit" THEN SUM([Profit])
ELSE SUM([Quantity])
END

// Dynamic reference line target
// Create a reference line → set value to the parameter</pre>` },
    { type: 'text', body: `<h3>Parameter Actions (Tableau 2019.2+)</h3>
<p>Parameter actions update a parameter's value when a user interacts with a mark — clicking, hovering, or selecting. This enables sophisticated interactivity without custom coding.</p>
<p>Dashboard → Actions → Add Action → Change Parameter:</p>
<ul>
  <li>Source Sheet: the sheet the user clicks on.</li>
  <li>Run action on: Select, Hover, or Menu.</li>
  <li>Target Parameter: which parameter to update.</li>
  <li>Field: which field's value gets written to the parameter on click.</li>
</ul>
<p>Common use cases:</p>
<ul>
  <li><strong>Click a region bar → filter a detail map to that region</strong> — click sets the Region parameter, a map filters using <code>[Region] = [Selected Region]</code>.</li>
  <li><strong>Click a product → update a KPI card to show that product's metrics</strong>.</li>
  <li><strong>Hover over a bar → update a tooltip-like detail sheet in a fixed position on the dashboard</strong>.</li>
</ul>` },
    { type: 'tip', body: `Use a <strong>dynamic metric selector parameter</strong> to let users switch between Sales, Profit, and Quantity in a single chart — the view reuses one axis and updates based on the parameter selection. This dramatically reduces the number of charts needed on a dashboard and keeps the interface clean.` },
    { type: 'exercise', title: 'Build a dynamic top N chart with metric switcher', hint: 'Two parameters: Top N (integer, range 5-20) and Metric (string list: Sales/Profit/Quantity). One calculated field uses both.', solution: `1. Create parameter "Top N" — Integer, Range, 5 to 20, step 1, default 10.
2. Create parameter "Metric" — String, List: Sales | Profit | Quantity.
3. Calculated field "Selected Metric":
   IF [Metric] = "Sales" THEN SUM([Sales])
   ELSEIF [Metric] = "Profit" THEN SUM([Profit])
   ELSE SUM([Quantity]) END
4. Calculated field "In Top N":
   RANK([Selected Metric]) <= [Top N]  (use as a filter on the view)
5. Build: [Sub-Category] on Rows, [Selected Metric] on Columns.
6. Drag [In Top N] to Filters → select True.
   (Right-click filter → Add to Context if needed for correct ranking.)
7. Show both parameter controls → changing Metric updates the bars; changing Top N trims/expands the list.` }
  ]
};

/* ─── MODULE 4 — Dashboards & Interactivity ─────────────────────────────── */

L['tableau-w4-l1'] = {
  title: 'Dashboard Layout — Containers, Tiled vs Floating',
  sections: [
    { type: 'text', body: `<h2>What is a Tableau Dashboard?</h2>
<p>A dashboard is a canvas that combines multiple sheets, images, text boxes, and web objects into a single view. Unlike a worksheet, a dashboard does not hold data directly — it displays sheets you have already built.</p>
<h3>Creating a Dashboard</h3>
<p>Click the <strong>New Dashboard</strong> icon (house icon at the bottom tab bar) or go to <strong>Dashboard → New Dashboard</strong>. The left panel shows:</p>
<ul>
  <li><strong>Sheets</strong> — all worksheets in the workbook; drag them onto the canvas.</li>
  <li><strong>Objects</strong> — Horizontal/Vertical containers, Text, Image, Web Page, Blank, Navigation, Extension.</li>
  <li><strong>Device Preview</strong> — toggle to see how the dashboard looks on Phone/Tablet/Desktop.</li>
</ul>
<h3>Size Settings</h3>
<p>At the top of the Dashboard pane, set the size: <em>Fixed</em> (exact pixel dimensions), <em>Automatic</em> (fills the browser window), or <em>Range</em> (min/max bounds). For Tableau Public embeds, Automatic is common. For Tableau Server, Fixed gives the most predictable layout.</p>` },
    { type: 'text', body: `<h3>Tiled vs Floating</h3>
<p>Every object on a dashboard can be placed in one of two modes:</p>
<ul>
  <li><strong>Tiled</strong> — objects snap into a grid. Tableau manages sizing relative to other tiled objects. This is the default and ensures a clean, responsive layout. Objects fill the available space and resize proportionally.</li>
  <li><strong>Floating</strong> — objects are positioned at an absolute pixel coordinate with a fixed width and height. Floating objects sit on top of tiled content. Use floating for overlays: legends, KPI tiles, logos, or custom filter controls.</li>
</ul>
<p>Hold <strong>Shift</strong> while dragging an object onto the canvas to force it floating. Or drag it in tiled mode first, then right-click → Floating.</p>
<h3>Containers</h3>
<p>Containers are invisible layout buckets that hold other objects:</p>
<ul>
  <li><strong>Horizontal container</strong> — children stack left-to-right. Setting one child to a fixed width leaves remaining space distributed among siblings.</li>
  <li><strong>Vertical container</strong> — children stack top-to-bottom.</li>
</ul>
<p>Containers nest inside each other, allowing sophisticated grid layouts. Select a container by clicking its grey border → use the Layout pane to set exact padding, background colour, and border.</p>` },
    { type: 'tip', body: `Use the <strong>Layout</strong> tab (bottom of the left panel) when a dashboard object is selected. It shows exact X, Y, W, H values for floating objects and lets you set inner/outer padding precisely. For consistent spacing, set the same padding on every container rather than inserting Blank objects as spacers.` },
    { type: 'text', body: `<h3>Dashboard Best Practices</h3>
<ul>
  <li>Build worksheets first, then assemble the dashboard — do not try to design the layout before the charts exist.</li>
  <li>Use a single Vertical container as the root, with Horizontal rows inside — this keeps the layout predictable.</li>
  <li>Hide sheet titles on individual worksheets if the dashboard will display a custom text box title above them.</li>
  <li>Use <em>Fit → Entire View</em> on each sheet before adding it to the dashboard so charts fill their container.</li>
  <li>Test with <strong>Device Preview</strong> before publishing — a layout that looks good on Desktop may be unusable on Phone.</li>
</ul>` },
    { type: 'exercise', title: 'Build a two-chart dashboard with header and filter', hint: 'Create a bar chart and a line chart, place them side-by-side in a Horizontal container, add a Region filter', solution: `1. Build Sheet 1: Category vs SUM(Sales) bar chart.
2. Build Sheet 2: Order Date (Month/Year) vs SUM(Sales) line chart.
3. New Dashboard → Fixed size 1200×700.
4. Drag a Horizontal Container onto the canvas (it fills the whole row).
5. Drag Sheet 1 into the left half, Sheet 2 into the right half.
6. Add a Text object at the top for a title: "Sales Overview".
7. Click the Region filter dropdown on the bar chart → "Apply to Worksheets → All Using This Data Source".
8. The line chart will now also filter when you select a Region.` }
  ]
};

L['tableau-w4-l2'] = {
  title: 'Dashboard Actions — Filter, Highlight, URL & Navigate',
  sections: [
    { type: 'text', body: `<h2>Dashboard Actions</h2>
<p>Actions make dashboards interactive. Instead of static displays, users click, hover, or select data to trigger changes across sheets. Go to <strong>Dashboard → Actions</strong> to manage all actions in a dashboard.</p>
<h3>Types of Actions</h3>
<ul>
  <li><strong>Filter Action</strong> — selecting marks on a source sheet filters another sheet. The most common action type.</li>
  <li><strong>Highlight Action</strong> — selected marks are highlighted (bold/bright) while others dim. Does not remove data, just draws attention.</li>
  <li><strong>URL Action</strong> — clicking a mark opens a URL (in the browser or a web object on the dashboard). Useful for linking to external documentation or product pages.</li>
  <li><strong>Go to Sheet Action</strong> — clicking a mark navigates to another sheet or dashboard. Used for drill-through flows.</li>
  <li><strong>Change Parameter Action</strong> — clicking a mark updates a parameter value. Enables click-to-set filters powered by parameters.</li>
  <li><strong>Change Set Values Action</strong> — clicking adds/removes marks from a set dynamically.</li>
</ul>` },
    { type: 'text', body: `<h3>Creating a Filter Action</h3>
<p>Dashboard → Actions → Add Action → Filter.</p>
<ul>
  <li><strong>Source Sheets</strong>: which sheets trigger the action (e.g., the bar chart).</li>
  <li><strong>Run action on</strong>: Hover, Select, or Menu (right-click).</li>
  <li><strong>Target Sheets</strong>: which sheets respond (e.g., the detail table).</li>
  <li><strong>Clearing the selection</strong>: Show all values / Exclude all values / Leave the filter.</li>
  <li><strong>Target Filters</strong>: which fields to pass as the filter. Default is "Selected Fields" — Tableau passes the dimension(s) associated with the clicked mark.</li>
</ul>
<p>Quick shortcut: click a sheet on the dashboard → click the funnel icon (top-right of the sheet) to create a filter action in one click. This creates a default action you can then customise.</p>
<h3>Highlight Action</h3>
<p>Highlight actions share colour encoding across sheets. If both a bar chart and a scatter plot are coloured by Segment, a Highlight action lets clicking "Consumer" in the bar highlight Consumer marks in the scatter. Create via Dashboard → Actions → Highlight. Choose the source, trigger, and target fields to match on.</p>` },
    { type: 'tip', body: `For <strong>URL Actions</strong>, you can embed field values in the URL using angle-bracket syntax: <code>https://example.com/product/&lt;[Product ID]&gt;</code>. Tableau URL-encodes the value automatically. This makes each row in a table link to the corresponding product page or documentation without any custom code.` },
    { type: 'text', body: `<h3>Go to Sheet / Navigate Action</h3>
<p>Use Navigate actions to build multi-page dashboard experiences. Example: a summary dashboard → clicking a region bar → navigates to a Region Detail dashboard filtered to that region.</p>
<p>Pair this with a <strong>Navigation button</strong> (Dashboard → Objects → Navigation) for breadcrumb-style back navigation. Set the button text ("← Back to Summary") and target sheet.</p>
<h3>Change Parameter Action</h3>
<p>This is a powerful advanced pattern. Instead of a parameter control (dropdown/slider), the user clicks a mark to set the parameter:</p>
<ol>
  <li>Create a Parameter (e.g., "Selected Category", String type).</li>
  <li>Build a calculated field using the parameter.</li>
  <li>Dashboard → Actions → Change Parameter → source: bar chart, field: [Category], target parameter: [Selected Category].</li>
  <li>Now clicking a Category bar sets the parameter, updating all views that reference it.</li>
</ol>` },
    { type: 'exercise', title: 'Wire a filter action between two charts', hint: 'Click the funnel icon on a source sheet to auto-create a filter action, then test by clicking a bar', solution: `1. On the dashboard, click the bar chart sheet frame → a grey border appears.
2. Click the funnel icon (Filter) in the top-right corner of the sheet frame.
3. Tableau auto-creates a filter action: clicking any bar on the bar chart filters the line chart.
4. Click a Category bar → the line chart now shows only that Category's trend.
5. Click an empty area of the bar chart to clear the selection and restore all data.
6. Go to Dashboard → Actions to inspect and rename the auto-created action.` }
  ]
};

L['tableau-w4-l3'] = {
  title: 'Sets & Set Actions',
  sections: [
    { type: 'text', body: `<h2>Sets in Tableau</h2>
<p>A <strong>Set</strong> is a custom field that classifies each mark as either <em>In</em> or <em>Out</em> of a defined group. Sets appear in the Data pane under a separate "Sets" section and behave like a boolean dimension.</p>
<h3>Creating a Fixed Set</h3>
<p>Right-click a dimension → Create → Set. In the dialog:</p>
<ul>
  <li><strong>General tab</strong> — manually check specific members (e.g., "Technology", "Furniture").</li>
  <li><strong>Condition tab</strong> — define a condition (e.g., SUM(Sales) > 500,000). All members meeting the condition are In.</li>
  <li><strong>Top tab</strong> — top/bottom N by an aggregation (e.g., Top 5 Products by Sales).</li>
</ul>
<p>Fixed sets are static until you edit them. Condition and Top sets recalculate dynamically as filters change.</p>` },
    { type: 'text', body: `<h3>Using Sets in a View</h3>
<p>Drag a set to the Colour mark to shade In members one colour and Out members another. Drag it to Filters to show only In members. Drag it to Rows/Columns to create two groups: "In Set" and "Out of Set".</p>
<p><strong>In/Out Field</strong>: right-click a set → Show In / Out of Set as a computed field, or use set membership directly in calculated fields:</p>
<pre><code>// Calculated field: Set Label
IF [Top Products] THEN "Top 5" ELSE "Others" END</code></pre>
<h3>Combined Sets</h3>
<p>Right-click a set in the Data pane → Create Combined Set to merge two sets with Union, Intersection, or Except logic. Example: "Products in Top 5 Sales AND Top 5 Profit" shows your true star performers.</p>` },
    { type: 'text', body: `<h3>Set Actions</h3>
<p>Set Actions (introduced in Tableau 2018.3) allow users to dynamically modify a set by clicking marks on the dashboard. This enables powerful custom filtering patterns that parameters cannot easily replicate.</p>
<p><strong>Setup:</strong> Dashboard → Actions → Add Action → Change Set Values.</p>
<ul>
  <li><strong>Source Sheet</strong>: which chart the user clicks on.</li>
  <li><strong>Target Set</strong>: which set gets modified.</li>
  <li><strong>Run on</strong>: Select, Hover, or Menu.</li>
  <li><strong>Clearing the selection</strong>: Keep set values / Add all values to set / Remove all values from set.</li>
</ul>
<h3>Classic Use Case — Comparative Analysis</h3>
<p>Build a "Selected Products" set (initially empty). Build a bar chart showing SUM(Sales) for all products. Build a second chart showing only In-set products with a highlight colour. Wire a Set Action from the first chart to the set. Now clicking any product in the main chart adds it to the comparison panel.</p>` },
    { type: 'tip', body: `Set Actions combined with a sheet that shows "In Set" vs "Others" create a <strong>proportional highlight</strong> pattern: as the user clicks marks, the proportion of the selected group vs the whole updates in real time — no parameters, no calculated fields needed for the selection logic.` },
    { type: 'exercise', title: 'Build a Top N set with a parameter', hint: 'Create a parameter N (integer), a Top N set using the Top tab, and colour the bar chart by the set', solution: `1. Create parameter "Top N": Integer, current value 5, allowable values: Range 1–20.
2. Show parameter control on the sheet.
3. Right-click [Sub-Category] → Create → Set → "Top Sub-Categories".
4. Top tab → By field: SUM(Sales), Top: By field → [Top N].
5. Drag [Sub-Category] to Rows, SUM(Sales) to Columns.
6. Drag [Top Sub-Categories] to Colour — blue for In, grey for Out.
7. Sort descending by Sales.
8. Changing [Top N] from 5 to 10 immediately recolours the chart.` }
  ]
};

L['tableau-w4-l4'] = {
  title: 'Story Points & Data Storytelling',
  sections: [
    { type: 'text', body: `<h2>Tableau Stories</h2>
<p>A <strong>Story</strong> is a sequence of sheets or dashboards, each paired with a caption, assembled into a guided narrative. Think of it as a presentation built inside Tableau — each "Story Point" is one slide.</p>
<h3>Creating a Story</h3>
<p>Click the <strong>New Story</strong> tab icon (book icon). The story panel shows:</p>
<ul>
  <li><strong>Story Points panel</strong> (left) — add/remove/reorder points here.</li>
  <li><strong>Canvas</strong> — drag a sheet or dashboard onto the canvas for the current point.</li>
  <li><strong>Caption box</strong> (above canvas) — the navigator label shown to viewers.</li>
  <li><strong>Annotation text box</strong> — an optional floating text box you can add to each point for callout text.</li>
</ul>
<p>To add a new point: click <strong>Blank</strong> to start fresh, or click <strong>Duplicate</strong> to copy the current point (preserving sheet state) and then add a highlight or annotation on top.</p>` },
    { type: 'text', body: `<h3>Story Point State</h3>
<p>Each story point captures the <em>state</em> of the sheets it contains — which filters are active, which marks are highlighted, which parameter values are set. When a viewer navigates to a point, Tableau restores that state.</p>
<p>This allows a progression like:</p>
<ol>
  <li>Point 1: "Overall Sales by Region" — no filters, all regions shown.</li>
  <li>Point 2: "The West Region Underperforms" — West region filter active, annotated data point circled.</li>
  <li>Point 3: "Technology Drives the West's Gap" — West filter active, Technology sub-category highlighted.</li>
  <li>Point 4: "Recommendation: Increase Technology Promotions" — final call to action.</li>
</ol>
<h3>Annotations</h3>
<p>In any worksheet, right-click a mark or an empty area of the view:</p>
<ul>
  <li><strong>Annotate → Mark</strong> — pins a callout to a specific data mark (moves with the mark as data changes).</li>
  <li><strong>Annotate → Point</strong> — pins to a fixed coordinate on the axes.</li>
  <li><strong>Annotate → Area</strong> — a free-form text box not attached to any mark.</li>
</ul>` },
    { type: 'tip', body: `A strong data story follows the <strong>SCR</strong> framework: <em>Situation</em> (what is the context?), <em>Complication</em> (what problem or surprise does the data reveal?), <em>Resolution</em> (what should the audience do about it?). Each story point should advance one step of this arc — resist the urge to put all insights on a single slide.` },
    { type: 'text', body: `<h3>Exporting Stories</h3>
<p>Stories can be shared as:</p>
<ul>
  <li><strong>Tableau Public/Server</strong> — published as an interactive story viewers navigate in the browser.</li>
  <li><strong>PDF</strong> — File → Print to PDF → Story. Each story point becomes a page.</li>
  <li><strong>PowerPoint</strong> — File → Export as PowerPoint (Tableau Desktop 2020.4+). Each point becomes a static slide image.</li>
  <li><strong>Image</strong> — Dashboard → Export as Image (per point).</li>
</ul>
<p>For executive presentations, exporting to PowerPoint is popular because it embeds the Tableau visuals as high-resolution images the presenter can annotate with standard slide tools.</p>` },
    { type: 'exercise', title: 'Build a 4-point story from a sales dashboard', hint: 'Use Duplicate to preserve state between points, add an annotation to the "Complication" point', solution: `1. Ensure you have a regional sales dashboard built.
2. New Story → drag the dashboard onto the canvas.
3. Caption: "Company Sales Overview — FY2024".
4. Click Duplicate. Apply a filter for "South" region (the weakest). Caption: "The South Region Lags Behind".
5. Right-click the lowest bar → Annotate → Mark → "$1.2M — 18% below target". Format the annotation.
6. Duplicate again. Highlight the "Office Supplies" sub-category in the South. Caption: "Office Supplies Drags Down the South".
7. Blank point → drag in a Text object with the recommendation. Caption: "Recommendation".
8. Present mode: click through the story as a viewer would.` }
  ]
};

L['tableau-w4-l5'] = {
  title: 'Mobile Design & Device-Specific Layouts',
  sections: [
    { type: 'text', body: `<h2>Why Mobile Layouts Matter</h2>
<p>Tableau Server and Cloud users access dashboards on phones and tablets. A dashboard designed for a 1200px desktop monitor is nearly unusable on a 375px phone screen — text is tiny, tooltips are hard to trigger with a finger, and horizontal scrolling is frustrating.</p>
<p>Tableau's <strong>Device Designer</strong> lets you define separate layouts for Desktop, Tablet, and Phone — each with its own arrangement of sheets, objects, and sizes — all from the same underlying data and sheets.</p>
<h3>Enabling Device-Specific Layouts</h3>
<p>On a dashboard → click <strong>Device Preview</strong> in the toolbar. The bottom of the screen shows device type buttons. Click <strong>Phone</strong> → click <strong>Add Phone Layout</strong>. Tableau auto-generates a phone layout by stacking your existing sheets vertically. This is a starting point — the auto-layout is rarely ideal.</p>` },
    { type: 'text', body: `<h3>Designing for Phone</h3>
<ul>
  <li><strong>Single-column layout</strong> — one chart per row. Users scroll vertically, not horizontally.</li>
  <li><strong>Fewer charts</strong> — consider showing only the most important 2–3 KPIs on phone. Hide secondary charts.</li>
  <li><strong>Larger text</strong> — minimum 12pt for labels on phone. Axis labels that read fine at 10pt on desktop become illegible on a 5-inch screen.</li>
  <li><strong>Larger marks</strong> — increase mark sizes in the phone-specific sheet copies.</li>
  <li><strong>Avoid hover tooltips</strong> — phone users cannot hover. Put key data in labels instead.</li>
  <li><strong>Tap-friendly actions</strong> — use Select (tap) not Hover for dashboard actions on phone.</li>
</ul>
<h3>Hiding Objects per Device</h3>
<p>In device-specific mode, right-click an object → <strong>Remove from Layout</strong> (not Delete — this hides it from the current device layout without deleting the underlying sheet). This lets you show a detailed data table on desktop while hiding it on phone.</p>` },
    { type: 'tip', body: `Use <strong>Fixed size</strong> for desktop layouts (e.g., 1200×800) and <strong>Automatic</strong> for phone layouts. Automatic on phone fills the browser width, which is exactly what you want — the phone layout then controls what is shown rather than fighting with fixed pixel coordinates.` },
    { type: 'text', body: `<h3>Tableau Server Mobile App</h3>
<p>The Tableau Mobile app (iOS and Android) respects device layouts automatically — it detects the screen size and serves the matching layout. Users who access via browser on phone also get the phone layout if their viewport is narrow enough (Tableau Cloud uses breakpoints: &lt;500px = phone, 500–800px = tablet).</p>
<h3>Testing Your Mobile Layout</h3>
<ol>
  <li>In Device Preview, select iPhone 12 or a similarly small preset.</li>
  <li>Click through every dashboard action to ensure tap targets are large enough.</li>
  <li>Publish to Tableau Public/Server and access from an actual phone to verify — the Device Preview in Desktop is close but not pixel-perfect.</li>
  <li>Check that filter controls are visible and operable on small screens — QuickFilters can become very narrow.</li>
</ol>` },
    { type: 'exercise', title: 'Create a phone layout for a sales dashboard', hint: 'Open Device Preview → Phone → Add Phone Layout, then rearrange sheets into a single column', solution: `1. Open your sales dashboard (two charts side by side).
2. Toolbar → Device Preview → Phone → Add Phone Layout.
3. Tableau stacks the two charts vertically. The layout may look cramped — let's fix it.
4. Click the line chart → resize it taller (drag the bottom handle down to ~300px).
5. Click the bar chart → set Fit to "Entire View" in the sheet options.
6. Right-click the dashboard title text object → Remove from Layout (the title takes too much space on phone).
7. Add a shorter Text object: "Sales Dashboard" at the top.
8. Publish to Tableau Public → open on your phone to verify.` }
  ]
};

/* ─── MODULE 5 — Publishing, Performance & Capstone ─────────────────────── */

L['tableau-w5-l1'] = {
  title: 'Data Extracts vs Live Connections',
  sections: [
    { type: 'text', body: `<h2>How Tableau Connects to Data</h2>
<p>Every Tableau workbook connects to data in one of two modes:</p>
<ul>
  <li><strong>Live Connection</strong> — Tableau sends queries directly to the source database/file each time the view renders. Data is always current. Requires constant network access to the source.</li>
  <li><strong>Extract</strong> — Tableau copies a snapshot of the data into a columnar file (`.hyper` format) stored locally or on Server. Queries run against this fast local file. Data is current only as of the last refresh.</li>
</ul>
<h3>When to Use Each</h3>
<table>
  <tr><th>Scenario</th><th>Recommended Mode</th></tr>
  <tr><td>Real-time operational data (live transactions, dashboards refreshing every minute)</td><td>Live</td></tr>
  <tr><td>Large datasets where query performance is slow</td><td>Extract</td></tr>
  <tr><td>Data from slow sources (REST APIs, slow data warehouses)</td><td>Extract</td></tr>
  <tr><td>Working offline / travelling</td><td>Extract</td></tr>
  <tr><td>Publishing to Tableau Public (live connections not supported)</td><td>Extract (required)</td></tr>
</table>` },
    { type: 'text', body: `<h3>Creating an Extract</h3>
<p>Data Source tab → top-right connection toggle → switch from <strong>Live</strong> to <strong>Extract</strong>. Click <strong>Edit</strong> next to Extract to configure:</p>
<ul>
  <li><strong>Filters</strong> — limit the extract to a date range or specific dimension values to reduce file size.</li>
  <li><strong>Aggregation</strong> — pre-aggregate the extract to a specific granularity (e.g., roll up to Monthly) if row-level detail is not needed.</li>
  <li><strong>Incremental Refresh</strong> — specify a date column; subsequent refreshes only add new rows since the last refresh rather than reloading everything.</li>
  <li><strong>Number of rows</strong> — sample (first N rows) for development/testing without loading the full dataset.</li>
</ul>
<p>Save the workbook. Tableau prompts you to build the extract now or later. Building extracts from large datasets can take several minutes.</p>` },
    { type: 'tip', body: `Check your extract file size with <strong>Data → Extract → Compute Calculations Now</strong> before publishing. Pre-computing calculated fields in the extract means Tableau runs them once at extract time rather than on every query — a big speed win for dashboards with many heavy calculations. After extract creation, the `.hyper` file lives in the Tableau repository's Datasources folder.` },
    { type: 'text', body: `<h3>Refreshing Extracts</h3>
<p>A stale extract shows outdated data. Options for keeping extracts fresh:</p>
<ul>
  <li><strong>Manual refresh</strong>: Data → Extract → Refresh (updates the local .hyper file). Then re-publish.</li>
  <li><strong>Tableau Server / Cloud scheduled refresh</strong>: after publishing an extract-based workbook or data source, set a refresh schedule in Tableau Server (Server → Schedules). Tableau Server connects to the source on your behalf — credentials must be embedded or managed via stored credentials.</li>
  <li><strong>Tableau Bridge</strong>: for on-premises data sources accessed from Tableau Cloud, Tableau Bridge runs on a local machine and performs refreshes through the corporate firewall.</li>
</ul>
<h3>Published Data Sources</h3>
<p>Instead of embedding a data source inside a workbook, publish it as a <strong>Published Data Source</strong> on Tableau Server/Cloud. Multiple workbooks can then connect to the same published source — when you refresh the source once, all workbooks pick up the updated data automatically.</p>` },
    { type: 'exercise', title: 'Convert a live connection to an extract with a date filter', hint: 'Switch to Extract mode, add a filter for the last 2 years of data, then verify the file size', solution: `1. Data Source tab → switch connection toggle from Live to Extract.
2. Click Edit next to Extract.
3. Add Filter: [Order Date] → Relative Date → Last 2 years.
4. Leave aggregation off (keep row-level data).
5. Close the dialog. Save the workbook.
6. Tableau prompts "Build Extract Now" → confirm.
7. Once built: Data → Extract → Compute Calculations Now (pre-computes formulas).
8. Check the Tableau repository/Datasources folder for the .hyper file and note its size.
9. Now switch back to Live → observe the difference in query time when loading the dashboard.` }
  ]
};

L['tableau-w5-l2'] = {
  title: 'Tableau Public, Server & Cloud — Publishing & Sharing',
  sections: [
    { type: 'text', body: `<h2>Publishing Options</h2>
<p>Once a workbook is built, Tableau offers several platforms for sharing it:</p>
<ul>
  <li><strong>Tableau Public</strong> — free cloud hosting at public.tableau.com. All published workbooks are publicly visible. Ideal for portfolio work, journalism, and public-facing visualisations. Extracts only; live connections are not supported. 10 GB storage per account.</li>
  <li><strong>Tableau Server</strong> — self-hosted enterprise platform. You control access, user authentication, and data governance. Supports live connections, scheduled refreshes, row-level security, and detailed permission management.</li>
  <li><strong>Tableau Cloud</strong> — Salesforce-hosted SaaS version of Tableau Server. Same features, no infrastructure management. Most organisations new to Tableau start here.</li>
</ul>` },
    { type: 'text', body: `<h3>Publishing to Tableau Public</h3>
<ol>
  <li>File → Save to Tableau Public. You will be prompted to sign in with your Tableau Public account.</li>
  <li>Name the workbook and choose which sheets to include.</li>
  <li>Click Save. Tableau builds the extract and uploads it.</li>
  <li>After upload, the workbook opens in your browser at public.tableau.com/app/profile/your-username.</li>
  <li>Click the Share button for embed code or a shareable link.</li>
</ol>
<h3>Publishing to Tableau Server / Cloud</h3>
<p>Server → Publish Workbook. Specify:</p>
<ul>
  <li><strong>Project</strong> — the folder/project on Server where the workbook will live.</li>
  <li><strong>Sheets to include</strong> — you can hide specific sheets from viewers (useful for sheets that are sources for dashboards but not meant to be viewed standalone).</li>
  <li><strong>Data source</strong> — embed credentials or use stored credentials on Server for scheduled refreshes.</li>
  <li><strong>Permissions</strong> — who can view, interact, or edit the published workbook.</li>
</ul>` },
    { type: 'tip', body: `Use <strong>Server → Edit Workbook</strong> (on Tableau Cloud) to edit a published workbook directly in the browser using Tableau's web authoring interface — no Desktop license needed for viewers who only need to make minor text or layout changes. Web authoring supports most chart types and all basic formatting.` },
    { type: 'text', body: `<h3>Embedding Tableau Views</h3>
<p>Every published view has an embed code (Share → Embed Code). This is an <code>&lt;iframe&gt;</code> or a JavaScript embed tag using the Tableau JavaScript API (tableau.extensions). Common embedding scenarios:</p>
<ul>
  <li>Embed a dashboard in a company intranet page (SharePoint, Confluence).</li>
  <li>Embed a public viz in a blog post or news article.</li>
  <li>Use the Tableau JavaScript API to embed and programmatically control filters from your web application.</li>
</ul>
<h3>Download Options for Viewers</h3>
<p>Published dashboards offer viewers a Download menu: Image (PNG), PDF, PowerPoint, Data (the underlying data as CSV), or the full Workbook (if the publisher allows it). Control download permissions in the workbook's Server permissions settings.</p>` },
    { type: 'exercise', title: 'Publish a workbook to Tableau Public', hint: 'File → Save to Tableau Public, name the workbook, then copy the embed code', solution: `1. Ensure your workbook has an extract (Tableau Public requires it).
2. File → Save to Tableau Public as... → sign in if prompted.
3. Name: "Sales Analytics Demo".
4. All sheets selected → Save.
5. Wait for the upload (may take 30–60 seconds for larger extracts).
6. Once in the browser, click Share → Embed Code. Copy the iframe snippet.
7. In a blank HTML file: paste the snippet and open in browser to verify the embed works.
8. Back on Public: click your profile → Edit Details → confirm the workbook is public (not hidden).` }
  ]
};

L['tableau-w5-l3'] = {
  title: 'Performance Optimisation & Best Practices',
  sections: [
    { type: 'text', body: `<h2>Why Dashboards Become Slow</h2>
<p>Slow dashboards frustrate users and reduce adoption. Common culprits:</p>
<ul>
  <li><strong>Too many marks</strong> — rendering 500,000 individual circles is slow. Aggregate first.</li>
  <li><strong>Too many sheets on one dashboard</strong> — each sheet runs its own query. 12 charts = 12 queries.</li>
  <li><strong>Complex calculations at query time</strong> — heavy LOD expressions or row-level calculated fields on large datasets.</li>
  <li><strong>Live connections to slow sources</strong> — every interaction triggers a round trip to the database.</li>
  <li><strong>Unfiltered joins/blends</strong> — Tableau fetches all rows then joins, which can be enormous.</li>
  <li><strong>Context filters not used</strong> — without context, Tableau must evaluate all filters independently.</li>
</ul>` },
    { type: 'text', body: `<h3>Performance Recording</h3>
<p>Help → Settings and Performance → Start Performance Recording. Interact with your dashboard normally. Stop recording. Tableau opens a new workbook showing a Gantt chart of every event (query, layout calculation, geocoding, rendering) with durations. This tells you exactly which query is slow — target that first.</p>
<h3>Key Optimisation Techniques</h3>
<ul>
  <li><strong>Use Extracts</strong> — the .hyper columnar format is typically 10–100× faster than a live OLTP database for analytical queries.</li>
  <li><strong>Pre-compute calculations in the extract</strong> — Data → Extract → Compute Calculations Now.</li>
  <li><strong>Reduce mark count</strong> — aggregate to a higher grain. Show top 20 products, not all 10,000 SKUs.</li>
  <li><strong>Context Filters</strong> — add the most restrictive filter (e.g., year) to context so subsequent filters operate on the smaller dataset.</li>
  <li><strong>Materialise LODs in the data source</strong> — for expensive FIXED LODs, compute them in your data warehouse as a column instead of in Tableau at query time.</li>
  <li><strong>Reduce dashboard complexity</strong> — split a 10-chart dashboard into two 5-chart tabs. Users can navigate to what they need.</li>
</ul>` },
    { type: 'tip', body: `The <strong>Performance Recording</strong> Gantt chart sorts events by duration. Almost always, one or two queries account for 80% of total load time. Fix those first before optimising everything else. A 2-second query is worth more optimisation effort than ten 50ms queries.` },
    { type: 'text', body: `<h3>Dashboard Design Performance Tips</h3>
<ul>
  <li>Use <strong>Tableau's query fusion</strong> — if two sheets use the exact same data source, fields, and filters, Tableau may combine them into one query. Ensure sheets don't diverge unnecessarily.</li>
  <li><strong>Avoid blending where possible</strong> — database joins (in the data source) are faster than Tableau data blending, which happens in-memory after both queries complete.</li>
  <li><strong>Don't show all data in a table</strong> — a table with 50,000 rows renders slowly and is unreadable. Use aggregations, or add pagination via a parameter.</li>
  <li><strong>Set Actions over Filter Actions for large dashboards</strong> — Set Actions pass membership (In/Out) rather than filter values, which can be faster to evaluate for complex logic.</li>
  <li><strong>Warm up the cache</strong> — on Tableau Server, use Subscriptions or a scheduled task to pre-render popular dashboards so the first user of the day doesn't wait for cold queries.</li>
</ul>` },
    { type: 'exercise', title: 'Run a Performance Recording and identify the slowest query', hint: 'Help → Settings and Performance → Start Performance Recording, navigate the dashboard, then stop', solution: `1. Help → Settings and Performance → Start Performance Recording.
2. Load your dashboard. Click a filter to change a value. Click another filter.
3. Help → Settings and Performance → Stop Performance Recording.
4. Tableau opens "Tableau Performance Summary" workbook.
5. Look at the "Events Sorted by Time" bar chart — the longest bar is your bottleneck.
6. Hover over the bar to see: Query text, duration, and which worksheet triggered it.
7. If the slow event is a "Query", check: Is there an unfiltered LOD? Is the source a live connection?
8. Apply one fix (e.g., switch to Extract) → re-record → compare total load time.` }
  ]
};

L['tableau-w5-l4'] = {
  title: 'Dashboard Design Principles & Visual Best Practices',
  sections: [
    { type: 'text', body: `<h2>Design Principles for Data Dashboards</h2>
<p>Technical correctness is necessary but not sufficient. A dashboard that shows the right data in the wrong way fails its users. These principles apply regardless of tool:</p>
<h3>1. Lead with the Insight, Not the Data</h3>
<p>The dashboard title and first visual should communicate the main finding, not just describe the data source. "Q3 Sales: $4.2M — 12% above target" is more useful than "Sales by Quarter". If a viewer must read all the charts before understanding the point, the design has failed.</p>
<h3>2. Reduce Cognitive Load</h3>
<ul>
  <li>Remove chart junk: unnecessary gridlines, borders, backgrounds, tick marks, 3D effects.</li>
  <li>Use consistent colour: one colour per dimension member, consistent across all charts on the dashboard.</li>
  <li>Align and group related charts spatially — the eye follows proximity.</li>
  <li>Limit colour palette to 6–8 colours maximum; beyond that, viewers cannot reliably distinguish categories.</li>
</ul>` },
    { type: 'text', body: `<h3>3. Choose the Right Chart Type</h3>
<ul>
  <li><strong>Bar chart</strong> — comparing categories. Use horizontal bars for long category names.</li>
  <li><strong>Line chart</strong> — trends over time. Never connect non-ordered categories with lines.</li>
  <li><strong>Scatter plot</strong> — correlation between two measures.</li>
  <li><strong>Map</strong> — geographic distribution. Use choropleth for rates, symbol map for absolute values.</li>
  <li><strong>Treemap</strong> — part-to-whole with hierarchy. Not great for precise comparison.</li>
  <li><strong>Pie chart</strong> — only use for 2–3 slices where proportions are obviously different. For 4+ categories, a bar chart is almost always clearer.</li>
  <li><strong>Bullet chart</strong> — single KPI vs target. More compact and informative than a gauge.</li>
</ul>
<h3>4. Design the Reading Path</h3>
<p>Western readers scan <strong>F-shaped</strong> or <strong>Z-shaped</strong> patterns (top-left first). Place the most important KPI or insight in the top-left. Secondary context flows right and down. Filters and controls are typically placed at the top or left.</p>` },
    { type: 'tip', body: `Apply the <strong>5-second test</strong>: show the dashboard to someone unfamiliar with it and ask "What is the main takeaway?" If they cannot answer correctly within 5 seconds, the design needs simplification — not more explanation. The fix is almost always removing something, not adding a description.` },
    { type: 'text', body: `<h3>5. Tableau-Specific Design Tips</h3>
<ul>
  <li><strong>Remove borders and shadows</strong> from dashboard objects (Layout pane → set border to None, shadow off).</li>
  <li><strong>Use a custom colour palette</strong> — Preferences.tps file in the Tableau repository. Define brand colours so all workbooks use consistent hex values.</li>
  <li><strong>Worksheet formatting</strong> — Format → Worksheet → set background to None (transparent), so the dashboard background colour shows through.</li>
  <li><strong>Tooltips</strong> — customise every tooltip (Tooltip button in Marks card). Remove auto-generated field names and write natural language: "Sales: £<SUM(Sales)>" → "£<SUM(Sales)> in sales".</li>
  <li><strong>Consistent fonts</strong> — Format → Workbook (applies globally). Use a maximum of 2 font sizes: header and body.</li>
  <li><strong>Hide unnecessary sheet tabs</strong> — on published workbooks, hide worksheet tabs so viewers cannot navigate away from the intended dashboard.</li>
</ul>` },
    { type: 'exercise', title: 'Audit an existing dashboard against design principles', hint: 'Check colour consistency, remove gridlines, and rewrite a tooltip in natural language', solution: `1. Open a dashboard with multiple charts.
2. Colour audit: right-click a dimension on Colour → Edit Colors. Note which hex values are used.
   If different charts use slightly different shades for the same category, standardise to one.
3. Remove gridlines: Format → Lines (on a worksheet) → Grid Lines → None.
4. Remove row/column dividers: Format → Lines → Row/Column Dividers → None.
5. Rewrite a tooltip: click Tooltip in the Marks card → edit the text from the auto-generated
   "Category: <Category>" to "<Category> generated <SUM(Sales)> in sales, accounting for
   <PERCENTOFTOTAL(SUM([Sales]))> of the total."
6. Check: does the title communicate the key insight? If it says "Sales by Category and Region",
   rewrite it to something like "Technology Leads in All Regions".` }
  ]
};

L['tableau-w5-l5'] = {
  title: 'Capstone — End-to-End Sales Analytics Dashboard',
  sections: [
    { type: 'text', body: `<h2>Capstone Project Overview</h2>
<p>In this capstone you will build a complete, interactive Sales Analytics Dashboard from the Superstore dataset — applying every skill from the course: data connections, calculations, LOD expressions, parameters, dashboard actions, and mobile layout.</p>
<h3>Business Brief</h3>
<p>You are an analyst at a retail company. The VP of Sales needs a dashboard that answers:</p>
<ol>
  <li>How are we performing vs last year — overall and by region?</li>
  <li>Which product categories and sub-categories drive profit?</li>
  <li>Which customers are our top contributors and which are at risk (high discount, low profit)?</li>
  <li>How do sales trend over time, and where does the forecast show risk?</li>
</ol>
<p>The dashboard must work on desktop and phone, support interactive filtering, and tell a clear story through a Tableau Story with at least 3 points.</p>` },
    { type: 'text', body: `<h3>Step 1 — Data Preparation</h3>
<p>Connect to Sample - Superstore (Excel). In the Data Source tab:</p>
<ul>
  <li>Join Orders to Returns on [Order ID] (Left Join) — adds a "Returned" field.</li>
  <li>Create a calculated field: <code>Returned = IF ISNULL([Returned]) THEN "No" ELSE "Yes" END</code></li>
  <li>Create an Extract with a filter: [Order Date] → Relative Date → Last 4 Years.</li>
  <li>Compute Calculations Now to pre-aggregate where possible.</li>
</ul>
<h3>Step 2 — KPI Header Sheet</h3>
<p>Build a "KPI Row" sheet with four BANs (Big Ass Numbers) using text marks:</p>
<ul>
  <li>Total Sales: <code>SUM([Sales])</code> formatted as currency.</li>
  <li>Total Profit: <code>SUM([Profit])</code> with colour: green if positive, red if negative.</li>
  <li>Profit Ratio: <code>SUM([Profit])/SUM([Sales])</code> as percentage.</li>
  <li>YoY Growth: <code>(SUM([Sales]) - LOOKUP(SUM([Sales]),-1)) / ABS(LOOKUP(SUM([Sales]),-1))</code> — table calc across years.</li>
</ul>` },
    { type: 'text', body: `<h3>Step 3 — Core Analysis Sheets</h3>
<p>Build these sheets (aim for 6–8 total, keeping it focused):</p>
<ul>
  <li><strong>Regional Sales Bar</strong>: Region on Rows, SUM(Sales) on Columns. Colour by Profit Ratio (diverging palette: red-white-green). Sort descending. Add a reference line at the company average profit ratio.</li>
  <li><strong>Time Series Line</strong>: Order Date (continuous Month) on Columns, SUM(Sales) on Rows. Add Forecast (Analytics pane → Forecast → Show Forecast). Dual-axis with SUM(Profit) bars.</li>
  <li><strong>Category Treemap</strong>: Sub-Category on Colour and Label, SUM(Sales) on Size, Profit Ratio on Colour. Reveals high-revenue but low-profit sub-categories instantly.</li>
  <li><strong>Customer Scatter Plot</strong>: SUM(Sales) on Columns, SUM(Profit) on Rows, Customer Name on Detail. Colour: Returned = "Yes" → orange, "No" → blue. Quadrant reference lines at 0 profit and median sales. Top-left quadrant = high revenue, low profit (at-risk customers).</li>
</ul>
<p>Add a Parameter: "Selected Metric" (Sales/Profit/Quantity) and wire it to the Regional Sales bar so the VP can toggle which metric the bars show.</p>` },
    { type: 'text', body: `<h3>Step 4 — Dashboard Assembly</h3>
<p>New Dashboard → Fixed 1300×800.</p>
<ul>
  <li>Top row: KPI sheet (fixed height ~80px) — full width.</li>
  <li>Left column (60% width): Time Series line chart.</li>
  <li>Right column (40% width): Regional Sales bar.</li>
  <li>Bottom row: Category Treemap (left 50%), Customer Scatter (right 50%).</li>
  <li>Floating: Region filter (QuickFilter), Year filter, Selected Metric parameter control.</li>
</ul>
<p>Wire actions:</p>
<ul>
  <li>Filter action: Regional Sales bar → all other sheets (filter by Region when a bar is clicked).</li>
  <li>Highlight action: Category Treemap ↔ Customer Scatter (shared colour by Category).</li>
  <li>Set Action: Customer Scatter → "Selected Customers" set → a floating KPI showing total sales for selected customers only (using FIXED LOD: <code>{FIXED [Customer Name] : SUM([Sales])}</code> filtered by the set).</li>
</ul>` },
    { type: 'exercise', title: 'Complete the capstone and publish to Tableau Public', hint: 'Add a mobile layout, build 3 story points, publish, and share the link', solution: `Step 5 — Mobile Layout:
1. Device Preview → Phone → Add Phone Layout.
2. Rearrange: KPI row, then Time Series, then Regional bar, then Treemap.
3. Remove the Customer Scatter from phone (too dense for small screens).
4. Increase font sizes for KPI numbers to 20pt.

Step 6 — Story:
1. New Story. Point 1: drag the dashboard → caption "Sales are growing — but profitability varies by region".
2. Duplicate. Click the South region bar (action filters all charts). Caption: "The South has the lowest profit ratio at 12%".
3. Annotate the lowest-profit sub-category in the treemap → "Tables generate negative profit in the South".
4. Duplicate. Narrative text box: "Recommendation: Discount controls on Tables in the South could recover $120k in annual profit."

Step 7 — Publish:
1. File → Save to Tableau Public as "Sales Analytics Dashboard — Superstore".
2. Copy the share link.
3. Copy the embed code for a portfolio page.
4. Verify on mobile browser that the phone layout renders correctly.` }
  ]
};

})();
