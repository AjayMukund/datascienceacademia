(function(){
'use strict';
window.DSA_LESSON_CONTENT = window.DSA_LESSON_CONTENT || {};
const L = window.DSA_LESSON_CONTENT;

/* ─── MODULE 1 — Azure Fundamentals & Cloud Essentials ──────────────────── */

L['azure-w1-l1'] = {
  title: 'The Azure Cloud — Regions, Availability Zones & Global Infrastructure',
  sections: [
    { type: 'text', body: `<h2>Microsoft Azure at a Glance</h2>
<p>Microsoft Azure is the second-largest public cloud provider, with 60+ regions across 140 countries. It offers 200+ services spanning compute, storage, databases, AI/ML, networking, and developer tooling. For data scientists, Azure provides a tightly integrated stack from raw data ingestion through model deployment — anchored by Azure Machine Learning, Azure Databricks, and a comprehensive suite of managed data services.</p>
<h3>Azure Global Infrastructure</h3>
<ul>
  <li><strong>Geography</strong> — a market boundary (e.g. India, United States, Europe) that groups regions for data residency and compliance requirements. Data stored within a Geography stays within that boundary unless explicitly replicated out.</li>
  <li><strong>Region</strong> — a geographic area containing one or more data centres. Examples: East US, West Europe, Central India. Each region is independently operated with its own power, cooling, and network infrastructure. You choose the region closest to your users or required by compliance.</li>
  <li><strong>Region Pair</strong> — every region is paired with another within the same Geography (e.g. East US ↔ West US). Azure uses region pairs for planned maintenance, disaster recovery, and geo-redundant storage replication — updates are rolled out to one region at a time.</li>
  <li><strong>Availability Zone (AZ)</strong> — physically separate data centres within a single region, each with independent power, cooling, and networking. Deploying across 3 AZs protects against single-facility failures and provides a 99.99% uptime SLA for VMs.</li>
  <li><strong>Availability Set</strong> — for VMs within a single data centre: spreads VMs across fault domains (different power/network racks) and update domains (patching batches). Provides 99.95% SLA but does not protect against full data-centre failure.</li>
</ul>` },
    { type: 'text', body: `<h3>Azure Service Categories for Data Science</h3>
<table>
  <tr><th>Category</th><th>Key Services</th><th>Use in DS/ML</th></tr>
  <tr><td>Compute</td><td>VMs, Azure ML Compute, Databricks, Functions</td><td>Training, ETL, inference</td></tr>
  <tr><td>Storage</td><td>Blob Storage, ADLS Gen2, Azure Files</td><td>Data lake, model artefacts</td></tr>
  <tr><td>Databases</td><td>Cosmos DB, Azure SQL, PostgreSQL, Synapse</td><td>Feature store, analytics DW</td></tr>
  <tr><td>AI/ML</td><td>Azure ML, Cognitive Services, Azure OpenAI</td><td>Model lifecycle, pre-built AI</td></tr>
  <tr><td>Analytics</td><td>Synapse Analytics, HDInsight, Stream Analytics</td><td>Big data, real-time streams</td></tr>
  <tr><td>Integration</td><td>Azure Data Factory, Event Hubs, Service Bus</td><td>Pipelines, streaming ingestion</td></tr>
  <tr><td>DevOps</td><td>Azure DevOps, GitHub Actions, Container Registry</td><td>MLOps CI/CD</td></tr>
</table>
<h3>Azure Pricing Model</h3>
<ul>
  <li><strong>Pay-as-you-go</strong> — pay only for what you use, billed per second for compute.</li>
  <li><strong>Reserved Instances</strong> — commit to 1 or 3 years for up to 72% discount on VMs and Azure ML compute.</li>
  <li><strong>Spot VMs</strong> — unused Azure capacity at up to 90% discount; can be evicted with 30-second notice.</li>
  <li><strong>Azure Hybrid Benefit</strong> — bring existing on-premises Windows Server or SQL Server licences to Azure to save up to 40%.</li>
  <li><strong>Free Tier</strong> — 12 months of free popular services, 55+ always-free services, and $200 credit for the first 30 days.</li>
</ul>` },
    { type: 'tip', body: `When choosing an Azure region for ML workloads, prioritise <strong>East US</strong> or <strong>West Europe</strong> — they have the widest service availability (every new Azure service launches there first), the most GPU VM types, and the lowest latency to Azure's global backbone. If you're building in India, <strong>Central India</strong> (Pune) is your primary option, with <strong>South India</strong> (Chennai) as a paired backup for geo-redundancy.` },
    { type: 'exercise', title: 'Explore Azure global infrastructure and create your first resource group', hint: 'Use the Azure Portal to view regions, then use the CLI to create a resource group in Central India', solution: `# Install Azure CLI: https://docs.microsoft.com/cli/azure/install-azure-cli
# Login
az login

# List all available Azure regions
az account list-locations --query "[].{Name:name, DisplayName:displayName}" -o table

# Check which services are available in a region
az provider list --query "[?registrationState=='Registered'].namespace" -o table

# Create a resource group (all Azure resources live in a resource group)
az group create --name "dsa-ml-rg" --location "centralindia"

# List your resource groups
az group list --query "[].{Name:name, Location:location, State:properties.provisioningState}" -o table

# Tag the resource group for cost tracking
az group update --name "dsa-ml-rg" --tags project=ml-course environment=dev team=data-science

# Delete when done (removes all resources inside)
# az group delete --name "dsa-ml-rg" --yes --no-wait` }
  ]
};

L['azure-w1-l2'] = {
  title: 'Azure Portal, CLI & SDKs — Three Ways to Interact with Azure',
  sections: [
    { type: 'text', body: `<h2>Three Interaction Modes</h2>
<p>Every Azure operation — creating a VM, training an ML model, querying a database — can be performed through three equivalent interfaces. The interface you choose depends on the task: the Portal for exploration and one-off operations, the CLI for scripting and automation, and the SDK for application code and ML workflows.</p>
<h3>Azure Portal</h3>
<p>The Azure Portal (portal.azure.com) is a graphical web interface built on Azure Resource Manager (ARM). Every resource you create or modify through any interface is ultimately an ARM API call. Key features for data scientists:</p>
<ul>
  <li><strong>Resource groups</strong> — view, filter, and manage all resources in a group. Delete the group to clean up all resources at once.</li>
  <li><strong>Azure ML Studio</strong> — the ML-specific sub-portal at ml.azure.com. Manage experiments, datasets, compute, models, and endpoints through a dedicated UI.</li>
  <li><strong>Cloud Shell</strong> — a browser-embedded bash/PowerShell terminal pre-authenticated with your account. Access the Azure CLI and Python SDK without installing anything locally.</li>
  <li><strong>Cost analysis</strong> — built-in cost breakdown by service, resource group, tag, and time period. Set budgets and alerts from the Portal.</li>
</ul>` },
    { type: 'text', body: `<h3>Azure CLI</h3>
<p>The Azure CLI (<code>az</code>) is a cross-platform command-line tool for scripting Azure operations. Essential for data science automation: provisioning compute, uploading datasets, triggering training runs, and building CI/CD pipelines.</p>
<pre><code># Authenticate
az login                          # browser-based interactive login
az login --service-principal -u APP_ID -p SECRET --tenant TENANT_ID  # non-interactive

# Set default subscription
az account set --subscription "My Subscription"
az account show --query "{Name:name, ID:id}"

# Create a storage account
az storage account create \
  --name dsastreagecentralindia \
  --resource-group dsa-ml-rg \
  --location centralindia \
  --sku Standard_LRS \
  --kind StorageV2 \
  --enable-hierarchical-namespace true  # enables ADLS Gen2

# Create an Azure ML workspace
az ml workspace create \
  --name dsa-ml-workspace \
  --resource-group dsa-ml-rg \
  --location centralindia

# List Azure ML compute targets
az ml compute list --workspace-name dsa-ml-workspace --resource-group dsa-ml-rg</code></pre>
<h3>Azure SDK for Python</h3>
<pre><code>from azure.identity import DefaultAzureCredential
from azure.mgmt.resource import ResourceManagementClient
from azure.storage.blob import BlobServiceClient

# DefaultAzureCredential tries: env vars → managed identity → Azure CLI → VS Code
credential = DefaultAzureCredential()

# Resource management
sub_id = "YOUR_SUBSCRIPTION_ID"
client = ResourceManagementClient(credential, sub_id)
for rg in client.resource_groups.list():
    print(rg.name, rg.location)

# Blob Storage
blob_service = BlobServiceClient(
    account_url="https://dsastreage.blob.core.windows.net",
    credential=credential
)
container = blob_service.get_container_client("raw-data")
container.upload_blob(name="sales.csv", data=open("sales.csv", "rb"), overwrite=True)
print("Uploaded sales.csv")</code></pre>` },
    { type: 'tip', body: `Use <strong>DefaultAzureCredential</strong> in all Python code — never hardcode connection strings or keys. On your local machine it reads Azure CLI credentials; on an Azure VM or Azure ML compute it reads the Managed Identity automatically; in GitHub Actions it reads the service principal from environment variables. The same code runs everywhere without modification, and you never risk leaking a credential in source control.` },
    { type: 'exercise', title: 'Install the Azure CLI and SDK, authenticate, and list your resources', hint: 'Install azure-cli and azure-identity, run az login, then use Python DefaultAzureCredential to list resource groups', solution: `# 1. Install
pip install azure-identity azure-mgmt-resource azure-storage-blob azure-ai-ml

# 2. Login via CLI (sets credentials that DefaultAzureCredential will use)
az login

# 3. Python script — explore your Azure account
from azure.identity import DefaultAzureCredential, AzureCliCredential
from azure.mgmt.resource import ResourceManagementClient
import subprocess, json

# Get subscription ID from CLI
result = subprocess.run(['az', 'account', 'show'], capture_output=True, text=True)
account = json.loads(result.stdout)
sub_id = account['id']
print(f"Subscription: {account['name']} ({sub_id})")

# List resource groups
credential = DefaultAzureCredential()
rm_client = ResourceManagementClient(credential, sub_id)

print("\nResource Groups:")
for rg in rm_client.resource_groups.list():
    print(f"  {rg.name:30} {rg.location}")

# 4. Create a resource group and storage account
import subprocess
subprocess.run(['az', 'group', 'create', '--name', 'dsa-test-rg', '--location', 'centralindia'])
print("\nResource group created")` }
  ]
};

L['azure-w1-l3'] = {
  title: 'Microsoft Entra ID & RBAC — Identity and Access Management',
  sections: [
    { type: 'text', body: `<h2>Microsoft Entra ID (Azure Active Directory)</h2>
<p>Microsoft Entra ID (previously Azure Active Directory / Azure AD) is Azure's cloud-based identity and access management service. It authenticates users, applications, and workloads, and authorises their access to Azure resources. Unlike traditional on-premises Active Directory (which manages Windows machines and users), Entra ID is built for cloud and modern application scenarios.</p>
<h3>Core Entra ID Concepts</h3>
<ul>
  <li><strong>Tenant</strong> — a dedicated, isolated instance of Entra ID representing your organisation. Every Azure subscription is associated with exactly one tenant. Your tenant has a globally unique ID (UUID) and domain (e.g. mycompany.onmicrosoft.com).</li>
  <li><strong>User</strong> — a human identity with username and password. Can be a Member (internal to your org) or Guest (B2B from another tenant).</li>
  <li><strong>Group</strong> — a collection of users. Assign roles and permissions to groups rather than individual users for simpler management.</li>
  <li><strong>Service Principal</strong> — an application identity. When your Python script or CI/CD pipeline needs to authenticate to Azure, it uses a service principal (App Registration + client secret or certificate). No human interaction required — fully automated authentication.</li>
  <li><strong>Managed Identity</strong> — a service principal whose credentials are managed automatically by Azure. An Azure VM, Azure ML compute, or Azure Function with a Managed Identity can authenticate to any Azure service without storing any credentials — Azure handles rotation, storage, and retrieval of the secret internally.</li>
</ul>` },
    { type: 'text', body: `<h3>Azure RBAC — Role-Based Access Control</h3>
<p>Azure RBAC controls who can do what to which Azure resources. A <strong>role assignment</strong> = Security Principal + Role Definition + Scope.</p>
<ul>
  <li><strong>Security Principal</strong>: User, Group, Service Principal, or Managed Identity.</li>
  <li><strong>Role Definition</strong>: a named set of permissions. Built-in roles include:
    <ul>
      <li><strong>Owner</strong> — full access including the ability to assign roles to others.</li>
      <li><strong>Contributor</strong> — full access to create and manage resources, but cannot assign roles.</li>
      <li><strong>Reader</strong> — read-only view of all resources.</li>
      <li><strong>Storage Blob Data Contributor</strong> — read/write/delete access to blob data (not account-level settings).</li>
      <li><strong>AzureML Data Scientist</strong> — submit training jobs, manage experiments, register models; cannot manage compute or workspace settings.</li>
    </ul>
  </li>
  <li><strong>Scope</strong>: Management Group → Subscription → Resource Group → Individual Resource. A role assigned at a higher scope is inherited by all resources below it.</li>
</ul>
<pre><code># Assign a role via CLI
az role assignment create \
  --assignee "user@mycompany.com" \
  --role "AzureML Data Scientist" \
  --scope "/subscriptions/SUB_ID/resourceGroups/dsa-ml-rg/providers/Microsoft.MachineLearningServices/workspaces/dsa-ml-workspace"

# Assign Storage Blob Data Contributor to a Managed Identity
az role assignment create \
  --assignee-object-id "MANAGED_IDENTITY_OBJECT_ID" \
  --role "Storage Blob Data Contributor" \
  --scope "/subscriptions/SUB_ID/resourceGroups/dsa-ml-rg/providers/Microsoft.Storage/storageAccounts/dsastorage"</code></pre>` },
    { type: 'text', body: `<h3>Managed Identities in Practice</h3>
<p>The most important pattern for data science on Azure: give your compute resource (VM, Azure ML Compute, Databricks cluster) a Managed Identity and assign it the exact roles it needs. Your code uses <code>DefaultAzureCredential()</code> — no secrets anywhere.</p>
<pre><code>from azure.identity import ManagedIdentityCredential, DefaultAzureCredential
from azure.storage.blob import BlobServiceClient

# On an Azure resource (VM, Azure ML job), ManagedIdentityCredential is used automatically
# On local dev, DefaultAzureCredential falls through to AzureCliCredential
credential = DefaultAzureCredential()

# Read from ADLS Gen2 — no connection string, no account key, no SAS token
blob_client = BlobServiceClient(
    account_url="https://dsadatalake.dfs.core.windows.net",  # dfs endpoint for ADLS
    credential=credential
)

container = blob_client.get_container_client("processed")
blob = container.get_blob_client("features/train.parquet")
data = blob.download_blob().readall()

import pandas as pd, io
df = pd.read_parquet(io.BytesIO(data))
print(df.shape)</code></pre>
<h3>Creating a Service Principal for CI/CD</h3>
<pre><code># Create service principal with Contributor role on the resource group
az ad sp create-for-rbac \
  --name "dsa-mlops-sp" \
  --role "Contributor" \
  --scopes "/subscriptions/SUB_ID/resourceGroups/dsa-ml-rg" \
  --sdk-auth  # outputs JSON for AZURE_CREDENTIALS GitHub secret</code></pre>` },
    { type: 'exercise', title: 'Assign RBAC roles and authenticate with DefaultAzureCredential', hint: 'Create a user-assigned managed identity, assign Storage Blob Data Reader, authenticate from Python and list blobs', solution: `# 1. Create user-assigned managed identity
az identity create --name "dsa-ml-identity" --resource-group dsa-ml-rg --location centralindia

# 2. Get the managed identity's object (principal) ID
IDENTITY_OBJ=$(az identity show --name dsa-ml-identity --resource-group dsa-ml-rg --query principalId -o tsv)

# 3. Assign Storage Blob Data Reader to the identity
az role assignment create \
  --assignee-object-id $IDENTITY_OBJ \
  --role "Storage Blob Data Reader" \
  --scope "/subscriptions/SUB_ID/resourceGroups/dsa-ml-rg/providers/Microsoft.Storage/storageAccounts/dsastorage"

# 4. Python — list blob containers using DefaultAzureCredential (uses AzureCliCredential locally)
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient

credential = DefaultAzureCredential()
bsc = BlobServiceClient("https://dsastorage.blob.core.windows.net", credential=credential)

print("Containers:")
for container in bsc.list_containers():
    print(f"  {container.name}")

# 5. Check current user's role assignments
az role assignment list --all --query "[?principalName=='your@email.com'].{Role:roleDefinitionName,Scope:scope}" -o table` }
  ]
};

L['azure-w1-l4'] = {
  title: 'Azure Virtual Machines — IaaS Compute for Data Science',
  sections: [
    { type: 'text', body: `<h2>Azure Virtual Machines for Data Science</h2>
<p>Azure VMs are Infrastructure as a Service (IaaS) — you rent raw compute (vCPUs, RAM, storage, GPU) and configure the OS, software, and environment yourself. For data science, VMs are used for: development environments, running Jupyter notebooks on powerful hardware, custom training workloads not supported by managed services, and hosting inference APIs.</p>
<h3>VM Series for Data Science</h3>
<table>
  <tr><th>Series</th><th>Hardware</th><th>Use Case</th></tr>
  <tr><td>D-series (Dsv5)</td><td>General purpose CPU, balanced memory</td><td>Development, preprocessing, small models</td></tr>
  <tr><td>E-series (Esv5)</td><td>Memory-optimised CPU</td><td>In-memory data processing, large DataFrames</td></tr>
  <tr><td>NC-series (NC A100 v4)</td><td>NVIDIA A100 GPU</td><td>Deep learning training, LLM inference</td></tr>
  <tr><td>ND-series (NDasrA100_v4)</td><td>8× A100 80GB GPU + NVLink</td><td>Large model training, multi-GPU DL</td></tr>
  <tr><td>NV-series (NVadsA10_v5)</td><td>NVIDIA A10 GPU</td><td>Visualisation, moderate GPU inference</td></tr>
</table>
<h3>Data Science VM (DSVM)</h3>
<p>The Azure Data Science Virtual Machine is a pre-built VM image with data science tools pre-installed: Python (Anaconda, conda environments), Jupyter, VS Code, R, Julia, PyTorch, TensorFlow, scikit-learn, RAPIDS (GPU), Azure ML SDK, and CLI. Start working within minutes without environment setup.</p>` },
    { type: 'text', body: `<h3>Creating a VM for ML Development</h3>
<pre><code># Create a Data Science VM (Ubuntu DSVM image)
az vm create \
  --resource-group dsa-ml-rg \
  --name dsa-dev-vm \
  --image microsoft-dsvm:ubuntu-2004:2004:latest \
  --size Standard_D4s_v5 \          # 4 vCPUs, 16 GB RAM
  --admin-username azureuser \
  --ssh-key-values ~/.ssh/id_rsa.pub \
  --location centralindia \
  --assign-identity                  # System-assigned Managed Identity

# Get the public IP
az vm show --name dsa-dev-vm --resource-group dsa-ml-rg \
  --show-details --query publicIps -o tsv

# SSH into the VM
ssh azureuser@PUBLIC_IP

# On the VM — start Jupyter
jupyter notebook --ip=0.0.0.0 --no-browser --port=8888

# SSH tunnel to access Jupyter locally
ssh -L 8888:localhost:8888 azureuser@PUBLIC_IP</code></pre>
<h3>Stop vs Deallocate</h3>
<p>Critical cost point: <strong>Stopping</strong> a VM from within the OS (shutdown command) leaves it in "Stopped" state — you still pay for the VM compute. <strong>Deallocating</strong> via the Portal or CLI stops billing for compute (you still pay for managed disks).</p>
<pre><code># Deallocate (stop billing for compute)
az vm deallocate --name dsa-dev-vm --resource-group dsa-ml-rg

# Start again
az vm start --name dsa-dev-vm --resource-group dsa-ml-rg

# Auto-shutdown: configure in Portal → VM → Auto-shutdown → set daily shutdown time</code></pre>` },
    { type: 'tip', body: `Always configure <strong>Auto-shutdown</strong> on development VMs. A Standard_NC6s_v3 (V100 GPU) left running overnight costs ~$2.50/hour = $900/month. Set auto-shutdown to 7 PM daily from the Portal (VM → Operations → Auto-shutdown). For shared team VMs, use Azure Bastion instead of exposing SSH ports publicly — Bastion provides browser-based SSH/RDP without a public IP on the VM.` },
    { type: 'exercise', title: 'Create a development VM, SSH in, and run a training script', hint: 'Create an Ubuntu VM with --size Standard_D2s_v5, SSH in, install sklearn, run a quick training script, then deallocate', solution: `# 1. Create lightweight dev VM
az vm create \
  --resource-group dsa-ml-rg \
  --name dsa-dev-vm \
  --image Ubuntu2204 \
  --size Standard_D2s_v5 \
  --admin-username azureuser \
  --generate-ssh-keys \
  --location centralindia

# 2. Get IP
IP=$(az vm show --name dsa-dev-vm --resource-group dsa-ml-rg --show-details --query publicIps -o tsv)

# 3. Open SSH port (if not already open)
az vm open-port --port 22 --resource-group dsa-ml-rg --name dsa-dev-vm

# 4. SSH and run training
ssh azureuser@$IP << 'EOF'
pip install scikit-learn pandas numpy --quiet
python3 - << 'PYEOF'
from sklearn.datasets import make_classification
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score

X, y = make_classification(n_samples=10000, n_features=20, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2)
model = RandomForestClassifier(n_estimators=100, n_jobs=-1)
model.fit(X_tr, y_tr)
print(f"Test AUC: {roc_auc_score(y_te, model.predict_proba(X_te)[:,1]):.4f}")
PYEOF
EOF

# 5. DEALLOCATE to stop billing
az vm deallocate --name dsa-dev-vm --resource-group dsa-ml-rg` }
  ]
};

L['azure-w1-l5'] = {
  title: 'Azure Blob Storage — Object Storage Fundamentals',
  sections: [
    { type: 'text', body: `<h2>Azure Blob Storage</h2>
<p>Azure Blob Storage is Microsoft's object storage service — the foundational storage layer for data lakes, ML datasets, model artefacts, and backups on Azure. "Blob" stands for Binary Large Object: it stores any file as an opaque byte sequence with a name (key) and metadata, at virtually unlimited scale.</p>
<h3>Storage Account Hierarchy</h3>
<pre>
Storage Account (dsadatalake)
  └─ Container (raw-data)
       └─ Blob (sales/2024/05/sales.csv)
       └─ Blob (sales/2024/06/sales.csv)
  └─ Container (processed)
       └─ Blob (features/train.parquet)
  └─ Container (models)
       └─ Blob (churn-v3/model.pkl)
</pre>
<ul>
  <li><strong>Storage Account</strong> — the top-level namespace. Globally unique name across all of Azure. Contains containers, file shares, queues, and tables. Configured with redundancy (LRS/ZRS/GRS), access tier, and networking rules.</li>
  <li><strong>Container</strong> — analogous to an S3 bucket or a folder at the top level. Flat namespace — there are no real subfolders; a "/" in a blob name simulates a path.</li>
  <li><strong>Blob</strong> — the actual data object. Three types: Block Blob (standard files, up to 190.7 TB), Append Blob (append-only logs), Page Blob (VHD disks).</li>
</ul>` },
    { type: 'text', body: `<h3>Interacting with Blob Storage from Python</h3>
<pre><code>from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, generate_blob_sas, BlobSasPermissions
from datetime import datetime, timedelta, timezone
import pandas as pd, io

ACCOUNT_URL = "https://dsadatalake.blob.core.windows.net"
credential = DefaultAzureCredential()
bsc = BlobServiceClient(ACCOUNT_URL, credential)

# Create a container
bsc.create_container("raw-data")

# Upload a DataFrame as Parquet
df = pd.DataFrame({"region": ["North","South","East"], "sales": [1200, 980, 1450]})
buf = io.BytesIO()
df.to_parquet(buf, index=False)
buf.seek(0)
bsc.get_blob_client("raw-data", "sales/sales.parquet").upload_blob(buf, overwrite=True)
print("Uploaded sales.parquet")

# Download and read back
data = bsc.get_blob_client("raw-data", "sales/sales.parquet").download_blob().readall()
df2 = pd.read_parquet(io.BytesIO(data))
print(df2)

# List blobs with a prefix (simulates listing a "folder")
container_client = bsc.get_container_client("raw-data")
for blob in container_client.list_blobs(name_starts_with="sales/"):
    print(blob.name, blob.size)</code></pre>
<h3>Redundancy Options</h3>
<ul>
  <li><strong>LRS (Locally Redundant Storage)</strong> — 3 copies within one data centre. Cheapest. No zone or region protection.</li>
  <li><strong>ZRS (Zone-Redundant Storage)</strong> — 3 copies across 3 AZs in one region. Protects against data-centre failure. Recommended for production.</li>
  <li><strong>GRS (Geo-Redundant Storage)</strong> — 6 copies: 3 in primary region + 3 in secondary (read-only). Protects against full region failure.</li>
  <li><strong>GZRS</strong> — combines ZRS (primary) + GRS (secondary). Maximum durability.</li>
</ul>` },
    { type: 'tip', body: `For ML pipelines, always use the <strong>DFS endpoint</strong> (<code>https://account.dfs.core.windows.net</code>) instead of the blob endpoint when your storage account has Hierarchical Namespace enabled (ADLS Gen2). The DFS endpoint enables true directory operations (rename, delete folder), atomic file operations, and dramatically faster performance for Spark workloads — critical for Databricks and Synapse jobs that read/write partitioned datasets.` },
    { type: 'exercise', title: 'Create a storage account, upload ML data, and read it back with pandas', hint: 'Create a storage account with ZRS redundancy, create containers for raw/processed/models, upload a CSV, download and read it', solution: `# 1. Create storage account (enable hierarchical namespace for ADLS Gen2)
az storage account create \
  --name dsacoursestorage \
  --resource-group dsa-ml-rg \
  --location centralindia \
  --sku Standard_ZRS \
  --kind StorageV2 \
  --enable-hierarchical-namespace true \
  --allow-blob-public-access false

# 2. Create containers
az storage container create --name raw-data --account-name dsacoursestorage --auth-mode login
az storage container create --name processed --account-name dsacoursestorage --auth-mode login
az storage container create --name models --account-name dsacoursestorage --auth-mode login

# 3. Python — upload and download
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient
import pandas as pd, io, json

credential = DefaultAzureCredential()
bsc = BlobServiceClient("https://dsacoursestorage.blob.core.windows.net", credential)

# Create sample data
df = pd.DataFrame({
    "customer_id": range(1, 101),
    "age": [20+i%50 for i in range(100)],
    "spend_30d": [100+i*10.5 for i in range(100)],
    "churned": [i%5==0 for i in range(100)]
})

# Upload as Parquet
buf = io.BytesIO()
df.to_parquet(buf, index=False)
buf.seek(0)
bsc.get_blob_client("raw-data", "customers/customers.parquet").upload_blob(buf, overwrite=True)
print("Uploaded", len(df), "rows")

# Download and read
raw = bsc.get_blob_client("raw-data", "customers/customers.parquet").download_blob().readall()
df_back = pd.read_parquet(io.BytesIO(raw))
print(df_back.describe())
print("Churn rate:", df_back["churned"].mean())` }
  ]
};

/* ─── MODULE 2 — Data Storage on Azure ──────────────────────────────────── */

L['azure-w2-l1'] = {
  title: 'Azure Blob Storage Deep Dive — Tiers, SAS Tokens & Lifecycle',
  sections: [
    { type: 'text', body: `<h2>Blob Storage Access Tiers</h2>
<p>Azure Blob Storage offers four access tiers to optimise storage cost by matching the pricing tier to data access frequency. Tiers can be set at the account level (default for new blobs) or overridden at the individual blob level.</p>
<table>
  <tr><th>Tier</th><th>Storage Cost</th><th>Access Cost</th><th>Min Storage</th><th>Best For</th></tr>
  <tr><td>Hot</td><td>Highest</td><td>Lowest</td><td>None</td><td>Frequently accessed data, active ML training sets</td></tr>
  <tr><td>Cool</td><td>Lower</td><td>Higher</td><td>30 days</td><td>Infrequently accessed data, short-term backups</td></tr>
  <tr><td>Cold</td><td>Even lower</td><td>Even higher</td><td>90 days</td><td>Rarely accessed data, older model artefacts</td></tr>
  <tr><td>Archive</td><td>Lowest</td><td>Highest + rehydration</td><td>180 days</td><td>Compliance retention, audit logs, old training data</td></tr>
</table>
<p>Archive blobs are offline — they must be <strong>rehydrated</strong> (moved to Hot or Cool) before they can be read. Rehydration takes 1–15 hours depending on priority. Standard priority: up to 15 hours. High priority (costs more): under 1 hour for blobs under 10 GB.</p>` },
    { type: 'text', body: `<h3>Lifecycle Management Policies</h3>
<p>Lifecycle policies automatically transition blobs between tiers or delete them based on age. This is how you implement cost-efficient ML data management without manual intervention.</p>
<pre><code># lifecycle-policy.json
{
  "rules": [
    {
      "name": "tiering-rule",
      "enabled": true,
      "type": "Lifecycle",
      "definition": {
        "filters": {
          "blobTypes": ["blockBlob"],
          "prefixMatch": ["raw-data/", "processed/"]
        },
        "actions": {
          "baseBlob": {
            "tierToCool": {"daysAfterModificationGreaterThan": 30},
            "tierToCold": {"daysAfterModificationGreaterThan": 90},
            "tierToArchive": {"daysAfterModificationGreaterThan": 365},
            "delete": {"daysAfterModificationGreaterThan": 1825}
          },
          "snapshot": {
            "delete": {"daysAfterCreationGreaterThan": 90}
          }
        }
      }
    }
  ]
}

# Apply via CLI
az storage account management-policy create \
  --account-name dsacoursestorage \
  --resource-group dsa-ml-rg \
  --policy @lifecycle-policy.json</code></pre>` },
    { type: 'text', body: `<h3>Shared Access Signatures (SAS)</h3>
<p>A SAS token is a URI query parameter string that grants delegated, time-limited access to a storage resource without sharing the account key. Critical for sharing datasets with external collaborators or generating temporary upload links.</p>
<pre><code>from azure.storage.blob import generate_blob_sas, BlobSasPermissions, BlobServiceClient
from azure.identity import DefaultAzureCredential
from datetime import datetime, timedelta, timezone

ACCOUNT_NAME = "dsacoursestorage"
ACCOUNT_URL = f"https://{ACCOUNT_NAME}.blob.core.windows.net"

# User Delegation SAS (recommended — uses Entra ID, not account key)
credential = DefaultAzureCredential()
bsc = BlobServiceClient(ACCOUNT_URL, credential)

# Get a User Delegation Key (valid for up to 7 days)
start = datetime.now(timezone.utc)
expiry = start + timedelta(hours=24)
delegation_key = bsc.get_user_delegation_key(start, expiry)

sas_token = generate_blob_sas(
    account_name=ACCOUNT_NAME,
    container_name="processed",
    blob_name="features/train.parquet",
    user_delegation_key=delegation_key,
    permission=BlobSasPermissions(read=True),
    expiry=expiry
)

sas_url = f"{ACCOUNT_URL}/processed/features/train.parquet?{sas_token}"
print("Share this URL (valid for 24h):", sas_url)

# Anyone can download with: pd.read_parquet(sas_url)
import pandas as pd
df = pd.read_parquet(sas_url)
print(df.head())</code></pre>` },
    { type: 'tip', body: `Prefer <strong>User Delegation SAS</strong> over Account Key SAS for all external sharing. Account Key SAS uses a shared account secret that, if leaked, grants access to the entire account until the key is rotated. User Delegation SAS is backed by your Entra ID token — it automatically revokes when you revoke the user's permissions in RBAC, or when the delegation key expires. Rotate storage account keys only as a break-glass measure.` },
    { type: 'exercise', title: 'Set up blob lifecycle tiers and generate a 24-hour SAS download URL', hint: 'Create a lifecycle policy that moves blobs to Cool after 30 days; generate a read-only SAS URL for a parquet file and verify it works with pandas', solution: `from azure.storage.blob import BlobServiceClient, generate_blob_sas, BlobSasPermissions
from azure.identity import DefaultAzureCredential
from datetime import datetime, timedelta, timezone
import pandas as pd, io

ACCOUNT = "dsacoursestorage"
credential = DefaultAzureCredential()
bsc = BlobServiceClient(f"https://{ACCOUNT}.blob.core.windows.net", credential)

# Upload a test file first
df = pd.DataFrame({"x": range(50), "y": [i**2 for i in range(50)]})
buf = io.BytesIO(); df.to_parquet(buf, index=False); buf.seek(0)
bsc.get_blob_client("processed", "demo/squares.parquet").upload_blob(buf, overwrite=True)

# Generate User Delegation SAS (read-only, 2 hours)
now = datetime.now(timezone.utc)
expiry = now + timedelta(hours=2)
dk = bsc.get_user_delegation_key(now, expiry)
token = generate_blob_sas(
    account_name=ACCOUNT,
    container_name="processed",
    blob_name="demo/squares.parquet",
    user_delegation_key=dk,
    permission=BlobSasPermissions(read=True),
    expiry=expiry
)
sas_url = f"https://{ACCOUNT}.blob.core.windows.net/processed/demo/squares.parquet?{token}"
print("SAS URL:", sas_url[:80] + "...")

# Verify it works
import requests
result = requests.get(sas_url)
print("Status:", result.status_code)
df_back = pd.read_parquet(io.BytesIO(result.content))
print("Rows returned:", len(df_back))

# Check the lifecycle policy applied
print("\nApply lifecycle via CLI:")
print("az storage account management-policy create --account-name", ACCOUNT, "--resource-group dsa-ml-rg --policy @lifecycle-policy.json")` }
  ]
};

L['azure-w2-l2'] = {
  title: 'Azure SQL Database & Azure Database for PostgreSQL',
  sections: [
    { type: 'text', body: `<h2>Managed Relational Databases on Azure</h2>
<p>Azure offers fully managed relational database services that eliminate DBA overhead — no OS patching, no backups to configure, no high-availability setup. Two services are most relevant for data science pipelines:</p>
<h3>Azure SQL Database</h3>
<p>A fully managed PaaS version of Microsoft SQL Server. Supports T-SQL, advanced analytics functions, row-level security, and integration with Azure ML and Power BI. Key features:</p>
<ul>
  <li><strong>Serverless tier</strong> — auto-pauses after a configurable inactivity period (down to 1 hour) and resumes on the next connection. Pay only for compute seconds used — ideal for dev/test databases.</li>
  <li><strong>Hyperscale tier</strong> — up to 100 TB storage, read scale-out with replicas, fast backups/restores using distributed page servers. For very large analytical workloads.</li>
  <li><strong>Always Encrypted</strong> — client-side encryption where data is encrypted before it reaches the database. Azure never sees plaintext values of encrypted columns.</li>
  <li><strong>Built-in ML</strong> — call Azure ML endpoints directly from T-SQL using sp_invoke_external_script (via SQL Server Machine Learning Services).</li>
</ul>
<pre><code># Create Azure SQL Database
az sql server create \
  --name dsa-sql-server \
  --resource-group dsa-ml-rg \
  --location centralindia \
  --admin-user sqladmin \
  --admin-password "SecureP@ss123!"

az sql db create \
  --resource-group dsa-ml-rg \
  --server dsa-sql-server \
  --name dsa-mldb \
  --service-objective S2 \   # Standard tier, 50 DTUs
  --max-size 10GB</code></pre>` },
    { type: 'text', body: `<h3>Azure Database for PostgreSQL — Flexible Server</h3>
<p>Fully managed PostgreSQL with Flexible Server offering granular control over maintenance windows, zone-redundant HA, and stop/start to reduce costs. Preferred for Python data science teams due to native PostgreSQL extensions (pgvector, PostGIS, pg_stat_statements, TimescaleDB).</p>
<pre><code># Create PostgreSQL Flexible Server
az postgres flexible-server create \
  --name dsa-postgres \
  --resource-group dsa-ml-rg \
  --location centralindia \
  --admin-user pgadmin \
  --admin-password "SecureP@ss123!" \
  --sku-name Standard_D2s_v3 \
  --tier GeneralPurpose \
  --storage-size 32 \
  --version 16 \
  --high-availability Disabled  # enable ZoneRedundant for prod

# Open firewall for your IP
az postgres flexible-server firewall-rule create \
  --name allow-my-ip \
  --resource-group dsa-ml-rg \
  --server-name dsa-postgres \
  --start-ip-address YOUR_IP \
  --end-ip-address YOUR_IP</code></pre>
<h3>Connecting from Python</h3>
<pre><code>import psycopg2, pandas as pd
from azure.identity import DefaultAzureCredential
import struct

# For PostgreSQL — password authentication
conn = psycopg2.connect(
    host="dsa-postgres.postgres.database.azure.com",
    port=5432,
    database="postgres",
    user="pgadmin",
    password="SecureP@ss123!",
    sslmode="require"
)

# Create a features table
cur = conn.cursor()
cur.execute("""
    CREATE TABLE IF NOT EXISTS customer_features (
        customer_id VARCHAR(20) PRIMARY KEY,
        age INTEGER,
        spend_30d DECIMAL(10,2),
        purchase_count INTEGER,
        churn_score DECIMAL(5,4),
        updated_at TIMESTAMP DEFAULT NOW()
    )
""")
conn.commit()

# Insert features
features = [("C001", 34, 450.50, 12, 0.12), ("C002", 28, 89.0, 3, 0.78)]
cur.executemany(
    "INSERT INTO customer_features VALUES (%s,%s,%s,%s,%s) ON CONFLICT(customer_id) DO UPDATE SET churn_score=EXCLUDED.churn_score",
    features
)
conn.commit()

# Query into pandas
df = pd.read_sql("SELECT * FROM customer_features ORDER BY churn_score DESC", conn)
print(df)
conn.close()</code></pre>` },
    { type: 'tip', body: `Enable the <strong>pgvector extension</strong> on Azure Database for PostgreSQL for vector similarity search. After storing OpenAI embedding vectors in a <code>VECTOR(1536)</code> column, you can run cosine similarity search directly in SQL: <code>SELECT id, text, embedding &lt;=&gt; query_vec AS distance FROM documents ORDER BY distance LIMIT 5</code> — making PostgreSQL your vector store for RAG applications without a separate vector database service.` },
    { type: 'exercise', title: 'Create a PostgreSQL database, write feature data, and query with pandas', hint: 'Create an Azure PostgreSQL Flexible Server, open a firewall rule, connect with psycopg2, create a table, insert customer features, read back with pd.read_sql', solution: `# After creating the server (az postgres flexible-server create above):
import psycopg2, pandas as pd
from sklearn.datasets import make_classification
import numpy as np

conn = psycopg2.connect(
    host="dsa-postgres.postgres.database.azure.com",
    database="postgres",
    user="pgadmin@dsa-postgres",
    password="SecureP@ss123!",
    sslmode="require"
)
cur = conn.cursor()

# Create table
cur.execute("""
    DROP TABLE IF EXISTS ml_features;
    CREATE TABLE ml_features (
        id SERIAL PRIMARY KEY,
        customer_id VARCHAR(20),
        f1 DECIMAL(8,4), f2 DECIMAL(8,4), f3 DECIMAL(8,4),
        f4 DECIMAL(8,4), f5 DECIMAL(8,4),
        label INTEGER,
        split VARCHAR(10)
    )
""")
conn.commit()

# Generate and insert data
X, y = make_classification(n_samples=500, n_features=5, random_state=42)
rows = []
for i, (x, label) in enumerate(zip(X, y)):
    rows.append((f"C{i:04d}", *x.tolist(), int(label), "train" if i < 400 else "test"))

cur.executemany(
    "INSERT INTO ml_features (customer_id,f1,f2,f3,f4,f5,label,split) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",
    rows
)
conn.commit()
print(f"Inserted {len(rows)} rows")

# Query
train_df = pd.read_sql("SELECT * FROM ml_features WHERE split='train'", conn)
print(train_df.shape)
print("Label distribution:", train_df['label'].value_counts().to_dict())
conn.close()` }
  ]
};

L['azure-w2-l3'] = {
  title: 'Azure Cosmos DB — Multi-Model NoSQL at Global Scale',
  sections: [
    { type: 'text', body: `<h2>What is Azure Cosmos DB?</h2>
<p>Azure Cosmos DB is a globally distributed, multi-model NoSQL database designed for single-digit millisecond latency at any scale. It is the go-to Azure service for applications requiring low-latency feature lookups, event storage, or global data distribution across multiple Azure regions.</p>
<h3>Key Differentiators</h3>
<ul>
  <li><strong>Multi-model APIs</strong> — a single Cosmos DB account can be accessed via: NoSQL (Core SQL, JSON documents), MongoDB API, Cassandra API, Gremlin (graph), and Table API. Choose the API your application already knows.</li>
  <li><strong>Turnkey global distribution</strong> — add any Azure region with one click. Cosmos DB automatically replicates data to all regions. Reads can be served from the nearest region; writes can be configured for single-region or multi-region.</li>
  <li><strong>Configurable consistency</strong> — five levels from strongest to weakest: Strong → Bounded Staleness → Session → Consistent Prefix → Eventual. Strong = always reads latest write (expensive). Eventual = reads may lag (cheapest). Session = most used in practice — reads your own writes.</li>
  <li><strong>Request Units (RUs)</strong> — the billing unit. 1 RU ≈ cost of reading a 1 KB item. Write operations consume more RUs than reads. You provision or auto-scale the RU/s capacity.</li>
</ul>` },
    { type: 'text', body: `<h3>Cosmos DB for ML Use Cases</h3>
<ul>
  <li><strong>Online feature store</strong> — store precomputed features keyed by entity ID (customer_id, product_id). Millisecond reads at inference time from any global region.</li>
  <li><strong>Prediction logging</strong> — append model predictions, inputs, and model version to a Cosmos DB container. Use the Change Feed to trigger downstream processing (retraining triggers, monitoring).</li>
  <li><strong>User event history</strong> — store clickstream, transaction, or interaction events as JSON documents. Query recent events per user for real-time recommendation features.</li>
</ul>
<pre><code>from azure.cosmos import CosmosClient, PartitionKey
from azure.identity import DefaultAzureCredential

ENDPOINT = "https://dsa-cosmos.documents.azure.com:443/"
credential = DefaultAzureCredential()
client = CosmosClient(ENDPOINT, credential)

# Create database and container
db = client.create_database_if_not_exists("mldb")
container = db.create_container_if_not_exists(
    id="customer-features",
    partition_key=PartitionKey(path="/customer_id"),
    offer_throughput=400  # 400 RU/s — minimum, $24/month
)

# Upsert feature documents
features = [
    {"id": "C001", "customer_id": "C001", "age": 34, "spend_30d": 450.5,
     "purchase_count_30d": 12, "churn_score": 0.12, "_ts": 1716393600},
    {"id": "C002", "customer_id": "C002", "age": 28, "spend_30d": 89.0,
     "purchase_count_30d": 3, "churn_score": 0.78, "_ts": 1716393600},
]
for doc in features:
    container.upsert_item(doc)
print("Features upserted")

# Point lookup — O(1) by partition key + id (single-digit ms)
item = container.read_item("C001", partition_key="C001")
print(f"Customer C001 churn score: {item['churn_score']}")</code></pre>` },
    { type: 'text', body: `<h3>Cosmos DB Change Feed</h3>
<p>The Change Feed is a persistent, ordered log of all changes (inserts and updates) to a Cosmos DB container. It enables event-driven architectures: trigger Azure Functions when new predictions are logged, stream changes to Azure Event Hubs for real-time analytics, or accumulate changes for batch reprocessing.</p>
<pre><code># Query via SQL API (NoSQL model)
query = "SELECT c.customer_id, c.churn_score FROM c WHERE c.churn_score > @threshold"
items = list(container.query_items(
    query=query,
    parameters=[{"name": "@threshold", "value": 0.6}],
    enable_cross_partition_query=True
))
print(f"High-risk customers: {len(items)}")
for item in items:
    print(f"  {item['customer_id']}: {item['churn_score']:.2f}")

# Batch upsert for feature store refresh
import pandas as pd
df = pd.read_parquet("features.parquet")
for _, row in df.iterrows():
    doc = row.to_dict()
    doc["id"] = doc["customer_id"]  # Cosmos requires 'id' field
    container.upsert_item(doc)
print(f"Refreshed {len(df)} feature records")</code></pre>` },
    { type: 'tip', body: `Choose the <strong>Serverless capacity mode</strong> for development, testing, and workloads with unpredictable or low traffic — you pay per actual RU consumed with no minimum. Switch to <strong>Provisioned Throughput with autoscale</strong> for production: set a max RU/s and Cosmos scales from 10% of that max down to the minimum — you get burst capacity without over-provisioning. Avoid fixed provisioned throughput unless your workload is perfectly predictable.` },
    { type: 'exercise', title: 'Build a simple feature store with Cosmos DB and serve features at inference time', hint: 'Create a Cosmos DB account (Serverless), create a container partitioned by customer_id, batch-upsert 100 features, then simulate an inference pipeline that looks up features', solution: `from azure.cosmos import CosmosClient, PartitionKey
from azure.identity import DefaultAzureCredential
import pandas as pd, numpy as np, time

ENDPOINT = "https://dsa-cosmos.documents.azure.com:443/"
credential = DefaultAzureCredential()
client = CosmosClient(ENDPOINT, credential)

db = client.create_database_if_not_exists("mldb")
container = db.create_container_if_not_exists(
    "churn-features",
    partition_key=PartitionKey("/customer_id")
)

# Generate and store 100 customer features
np.random.seed(42)
customer_ids = [f"C{i:04d}" for i in range(100)]
for cid in customer_ids:
    container.upsert_item({
        "id": cid,
        "customer_id": cid,
        "age": int(np.random.randint(18, 70)),
        "spend_30d": round(float(np.random.exponential(200)), 2),
        "purchase_count_30d": int(np.random.poisson(5)),
        "days_since_last_visit": int(np.random.randint(1, 60)),
        "updated_at": int(time.time())
    })
print(f"Stored {len(customer_ids)} features")

# Simulate real-time inference pipeline
def get_features_for_inference(customer_id):
    item = container.read_item(customer_id, partition_key=customer_id)
    return [item["age"], item["spend_30d"], item["purchase_count_30d"], item["days_since_last_visit"]]

# Lookup 5 customers and "score" them
from sklearn.ensemble import RandomForestClassifier
import joblib
# Assume model is pre-trained
for cid in customer_ids[:5]:
    features = get_features_for_inference(cid)
    # score = model.predict_proba([features])[0][1]  # when model is available
    print(f"{cid}: features={features}")` }
  ]
};

L['azure-w2-l4'] = {
  title: 'Azure Synapse Analytics — Unified Analytics Platform',
  sections: [
    { type: 'text', body: `<h2>What is Azure Synapse Analytics?</h2>
<p>Azure Synapse Analytics is a limitless analytics service that brings together enterprise data warehousing and big data analytics in a single, unified studio. It is the central analytics hub in the Azure data platform — replacing the traditional approach of separately managing a data warehouse, a Spark cluster, and a data integration tool.</p>
<h3>Synapse Components</h3>
<ul>
  <li><strong>Synapse Studio</strong> — a web-based unified workspace for data engineers, data scientists, and analysts. Develop SQL scripts, Spark notebooks, data flows, and pipelines in one interface connected to all Synapse services.</li>
  <li><strong>Dedicated SQL Pool (formerly SQL DW)</strong> — a massively parallel processing (MPP) data warehouse. Distributes data across 60 compute nodes for fast analytical queries on petabytes of structured data. Pay for provisioned DWUs (Data Warehouse Units). Pause when not in use to save cost.</li>
  <li><strong>Serverless SQL Pool</strong> — query files directly in ADLS Gen2 using T-SQL without provisioning a cluster. No data movement — reads Parquet, CSV, Delta, ORC in place. Pay per TB scanned. The fastest way to run SQL on your data lake.</li>
  <li><strong>Apache Spark Pool</strong> — managed Spark clusters for big data processing, ML, and data engineering. Integrates with Azure ML, Delta Lake, and Synapse ML library. Auto-scales and auto-pauses.</li>
  <li><strong>Synapse Link</strong> — zero-ETL analytical access to operational data: link Cosmos DB, Dataverse, or SQL Server databases and query them analytically from Synapse without impact on the source system.</li>
</ul>` },
    { type: 'text', body: `<h3>Serverless SQL Pool — Query Your Data Lake</h3>
<pre><code>-- In Synapse Studio → Develop → SQL Script → Built-in (Serverless SQL Pool)

-- Query Parquet files directly from ADLS Gen2
SELECT TOP 100
    region,
    SUM(sales) as total_sales,
    AVG(profit / NULLIF(sales, 0)) as avg_margin
FROM OPENROWSET(
    BULK 'https://dsadatalake.dfs.core.windows.net/processed/sales/**',
    FORMAT = 'PARQUET'
) AS r
GROUP BY region
ORDER BY total_sales DESC;

-- Create an external table for repeated queries (schema pinned)
CREATE EXTERNAL DATA SOURCE adls_processed
WITH (LOCATION = 'https://dsadatalake.dfs.core.windows.net/processed/');

CREATE EXTERNAL FILE FORMAT parquet_format
WITH (FORMAT_TYPE = PARQUET, DATA_COMPRESSION = 'org.apache.hadoop.io.compress.SnappyCodec');

CREATE EXTERNAL TABLE sales_ext (
    region VARCHAR(50),
    category VARCHAR(50),
    sales DECIMAL(12,2),
    profit DECIMAL(12,2),
    order_date DATE
)
WITH (LOCATION = 'sales/', DATA_SOURCE = adls_processed, FILE_FORMAT = parquet_format);

SELECT * FROM sales_ext WHERE YEAR(order_date) = 2024;</code></pre>
<h3>Spark Pool for ML</h3>
<pre><code>## In Synapse Studio → Develop → Notebook → Attach to Spark Pool
from pyspark.sql import SparkSession
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.classification import RandomForestClassifier

spark = SparkSession.builder.getOrCreate()

# Read from ADLS Gen2 via ABFS connector (auto-configured in Synapse)
df = spark.read.parquet("abfss://processed@dsadatalake.dfs.core.windows.net/features/")

# Feature engineering
assembler = VectorAssembler(inputCols=["age","spend_30d","purchase_count"], outputCol="features")
assembled = assembler.transform(df)

# Train with Spark ML
rf = RandomForestClassifier(labelCol="churned", featuresCol="features", numTrees=100)
train, test = assembled.randomSplit([0.8, 0.2], seed=42)
model = rf.fit(train)
print("Test AUC:", model.summary.areaUnderROC)</code></pre>` },
    { type: 'tip', body: `Use the <strong>Serverless SQL Pool for all ad-hoc exploration</strong> — it has no provisioning delay, costs $5/TB scanned, and requires zero setup beyond the workspace. Reserve the Dedicated SQL Pool for dashboards and reports that run the same queries repeatedly at high concurrency (where caching and materialised views pay off). Most data science teams only ever need Serverless SQL — Dedicated SQL is a separate purchase that many teams provision and never fully utilise.` },
    { type: 'exercise', title: 'Query ADLS Gen2 data with Synapse Serverless SQL and Spark', hint: 'In Synapse Studio, run a Serverless SQL query on a Parquet file using OPENROWSET, then attach a Spark pool and read the same file into a DataFrame', solution: `-- Step 1: Serverless SQL (in Synapse Studio → SQL Script → Built-in)
SELECT
    category,
    COUNT(*) as record_count,
    SUM(sales) as total_sales,
    AVG(sales) as avg_sale
FROM OPENROWSET(
    BULK 'https://dsacoursestorage.blob.core.windows.net/processed/sales/*.parquet',
    FORMAT='PARQUET'
) AS r
GROUP BY category
ORDER BY total_sales DESC;

-- Step 2: Create a view for easy reuse
CREATE VIEW sales_view AS
SELECT * FROM OPENROWSET(
    BULK 'https://dsacoursestorage.blob.core.windows.net/processed/sales/*.parquet',
    FORMAT='PARQUET'
) AS r;

SELECT TOP 10 * FROM sales_view;

## Step 3: Spark Pool Notebook (attach to Spark Pool)
df = spark.read.parquet(
    "https://dsacoursestorage.blob.core.windows.net/processed/sales/"
)
df.printSchema()
df.groupBy("category").agg({"sales":"sum","profit":"avg"}).show()

# Save aggregated result back to ADLS
df.groupBy("category").sum("sales").write.mode("overwrite") \
  .parquet("abfss://curated@dsacoursestorage.dfs.core.windows.net/sales_by_category/")` }
  ]
};

L['azure-w2-l5'] = {
  title: 'ADLS Gen2 & Delta Lake — The Azure Data Lakehouse',
  sections: [
    { type: 'text', body: `<h2>Azure Data Lake Storage Gen2</h2>
<p>Azure Data Lake Storage Gen2 (ADLS Gen2) is Azure Blob Storage with a Hierarchical Namespace (HNS) enabled. HNS transforms the flat blob namespace into a true directory structure — enabling atomic directory operations (rename, delete) that are critical for big data processing and dramatically reducing overhead for Spark and Databricks workloads.</p>
<h3>ADLS Gen2 vs Standard Blob Storage</h3>
<table>
  <tr><th>Feature</th><th>Standard Blob</th><th>ADLS Gen2 (HNS=on)</th></tr>
  <tr><td>Directory operations</td><td>Emulated (copy+delete)</td><td>Atomic (rename in O(1))</td></tr>
  <tr><td>POSIX-style ACLs</td><td>RBAC only</td><td>RBAC + fine-grained ACLs at file/directory level</td></tr>
  <tr><td>Spark/Hadoop compat.</td><td>Via WASB (slow)</td><td>Via ABFS (fast, native)</td></tr>
  <tr><td>Rename-as-commit</td><td>Expensive (copy all)</td><td>Instant (metadata update)</td></tr>
  <tr><td>Cost</td><td>Lower per GB</td><td>Slightly higher (HNS overhead)</td></tr>
</table>
<h3>ADLS Gen2 Zone Architecture for ML</h3>
<pre>
adls-account/
  ├── raw/           (Bronze) — original data as received, immutable
  │    ├── crm/date=2024-05-23/
  │    └── clickstream/hour=2024-05-23T14/
  ├── processed/     (Silver) — cleaned, validated, standardised Parquet
  │    └── features/date=2024-05-23/
  ├── curated/       (Gold) — aggregated, domain-specific, ML-ready
  │    └── churn_training_set/
  └── models/        — model artefacts, pipeline configs, metadata
       └── churn/v3/model.pkl
</pre>` },
    { type: 'text', body: `<h3>Delta Lake on ADLS Gen2</h3>
<p>Delta Lake is an open-source storage layer that brings ACID transactions, schema enforcement, and time travel to Parquet files on ADLS Gen2. It is the default storage format in Azure Databricks and is natively supported in Synapse Spark and Azure ML.</p>
<h3>Why Delta Lake for ML?</h3>
<ul>
  <li><strong>ACID transactions</strong> — multiple Spark jobs can safely write to the same table concurrently without corrupting data (solved the "broken Parquet" problem in classic data lakes).</li>
  <li><strong>Time travel</strong> — query any historical version of a table: <code>SELECT * FROM delta.\`/path/to/table\` VERSION AS OF 5</code>. Reproduce exact training data from 30 days ago.</li>
  <li><strong>Schema enforcement</strong> — prevent bad data from corrupting ML training sets by rejecting writes that don't match the defined schema.</li>
  <li><strong>DML operations</strong> — run UPDATE, DELETE, and MERGE directly on Delta tables (impossible with plain Parquet). Update stale features, delete PII records, upsert daily incremental data.</li>
</ul>
<pre><code>## In Azure Databricks or Synapse Spark notebook
from delta.tables import DeltaTable

# Write initial Delta table
df.write.format("delta").mode("overwrite").partitionBy("date") \
  .save("abfss://curated@dsadatalake.dfs.core.windows.net/features_delta/")

# Read the Delta table
df_delta = spark.read.format("delta") \
  .load("abfss://curated@dsadatalake.dfs.core.windows.net/features_delta/")

# Time travel — read version 0 (initial write)
df_v0 = spark.read.format("delta").option("versionAsOf", 0) \
  .load("abfss://curated@dsadatalake.dfs.core.windows.net/features_delta/")

# MERGE (upsert) daily incremental features
delta_table = DeltaTable.forPath(spark, "abfss://curated@dsadatalake.dfs.core.windows.net/features_delta/")
new_data = spark.read.parquet("abfss://processed@dsadatalake.dfs.core.windows.net/features/date=2024-05-23/")

delta_table.alias("existing").merge(
    new_data.alias("new"),
    "existing.customer_id = new.customer_id"
).whenMatchedUpdateAll() \
 .whenNotMatchedInsertAll() \
 .execute()

# Query table history
display(delta_table.history(10))</code></pre>` },
    { type: 'tip', body: `Run <strong>OPTIMIZE + ZORDER</strong> on Delta tables after large writes to compact small files and improve query performance: <code>OPTIMIZE delta.\`/path/\` ZORDER BY (customer_id, date)</code>. In Databricks this is a one-line SQL command. Small files (the "small file problem") are the #1 cause of slow Spark reads — Delta auto-handles most of it, but OPTIMIZE on large tables with frequent writes cuts query time by 5–20×.` },
    { type: 'exercise', title: 'Create a Delta Lake table, perform time travel, and run a MERGE upsert', hint: 'In Databricks or Synapse Spark, write a DataFrame as Delta to ADLS Gen2, update some rows, then query the original version using time travel', solution: `## Databricks / Synapse Spark notebook
from pyspark.sql.functions import col, lit
import pandas as pd

# Initial data
data = [("C001", 34, 450.5, 12), ("C002", 28, 89.0, 3), ("C003", 45, 1200.0, 27)]
df = spark.createDataFrame(data, ["customer_id","age","spend_30d","purchase_count"])

# Write as Delta
path = "abfss://curated@dsadatalake.dfs.core.windows.net/demo_delta/"
df.write.format("delta").mode("overwrite").save(path)
print("Version 0 written:", df.count(), "rows")

# Update — simulate spend refresh
from delta.tables import DeltaTable
dt = DeltaTable.forPath(spark, path)
dt.update(col("customer_id") == "C001", {"spend_30d": lit(520.0), "purchase_count": lit(15)})
print("Version 1 — C001 updated")

# Add new customer
new_row = spark.createDataFrame([("C004", 30, 300.0, 8)], ["customer_id","age","spend_30d","purchase_count"])
new_row.write.format("delta").mode("append").save(path)
print("Version 2 — C004 added")

# Time travel — read original version
df_v0 = spark.read.format("delta").option("versionAsOf", 0).load(path)
print("Version 0 snapshot:"); df_v0.show()

# Current version
spark.read.format("delta").load(path).show()

# Table history
dt.history().select("version","timestamp","operation").show()` }
  ]
};

/* ─── MODULE 3 — Data Processing & ETL ──────────────────────────────────── */

L['azure-w3-l1'] = {
  title: 'Azure Data Factory — Orchestrating Data Pipelines',
  sections: [
    { type: 'text', body: `<h2>What is Azure Data Factory?</h2>
<p>Azure Data Factory (ADF) is a cloud-based data integration service — the Azure equivalent of Apache Airflow or AWS Glue, purpose-built for ETL/ELT pipelines. It orchestrates data movement and transformation across 90+ source/destination connectors: Azure services, on-premises databases, SaaS platforms (Salesforce, SAP, Google BigQuery), and custom REST APIs.</p>
<h3>ADF Core Concepts</h3>
<ul>
  <li><strong>Linked Service</strong> — a named connection definition. Store the connection string and credentials (securely, via Azure Key Vault reference) for a data source or destination. Activities reference linked services by name — credentials never appear in pipeline code.</li>
  <li><strong>Dataset</strong> — a named, typed pointer to data within a linked service. E.g. "Blob Dataset" points to a specific container/path in a Blob Storage linked service. Activities use datasets as inputs and outputs.</li>
  <li><strong>Activity</strong> — a single step in a pipeline. Types include:
    <ul>
      <li><strong>Copy Activity</strong> — move data from source dataset to sink dataset. Handles format conversion, compression, column mapping.</li>
      <li><strong>Data Flow</strong> — visual, no-code transformation engine (filter, join, aggregate, derive columns, pivot). Runs on a Spark cluster managed by ADF.</li>
      <li><strong>Notebook Activity</strong> — run a Databricks or Synapse Spark notebook.</li>
      <li><strong>Web Activity</strong> — call any HTTP endpoint (REST API, Azure ML endpoints).</li>
      <li><strong>Execute Pipeline</strong> — invoke another ADF pipeline (modular composition).</li>
    </ul>
  </li>
  <li><strong>Pipeline</strong> — an ordered graph of activities with control flow: If Condition, ForEach, Until, Switch, Execute Pipeline. The main unit you deploy, monitor, and trigger.</li>
  <li><strong>Trigger</strong> — what starts a pipeline run. Schedule (cron), Tumbling Window (fixed intervals with backfill), Storage Event (blob arrive/delete), Custom Event (Event Grid).</li>
  <li><strong>Integration Runtime (IR)</strong> — the compute infrastructure for pipeline execution. Azure IR (cloud managed), Self-hosted IR (on-premises or other VNet), Azure-SSIS IR (SSIS package execution).</li>
</ul>` },
    { type: 'text', body: `<h3>Building a Pipeline via Python SDK</h3>
<pre><code>from azure.identity import DefaultAzureCredential
from azure.mgmt.datafactory import DataFactoryManagementClient
from azure.mgmt.datafactory.models import *

credential = DefaultAzureCredential()
adf_client = DataFactoryManagementClient(credential, "SUBSCRIPTION_ID")

# Create ADF instance
factory = Factory(location="centralindia")
adf_client.factories.create_or_update("dsa-ml-rg", "dsa-adf", factory)

# Create a Linked Service for ADLS Gen2 (using Managed Identity)
ls_adls = LinkedServiceResource(properties=AzureBlobFSLinkedService(
    url="https://dsadatalake.dfs.core.windows.net",
    # No credentials — uses ADF Managed Identity (assign Storage Blob Data Contributor)
))
adf_client.linked_services.create_or_update("dsa-ml-rg", "dsa-adf", "ADLS-LS", ls_adls)

# Create a pipeline with Copy Activity (JSON → Parquet conversion)
copy_source = BlobSource()
copy_sink = ParquetSink(store_settings=AzureBlobFSWriteSettings())

copy_activity = CopyActivity(
    name="CopyJsonToParquet",
    inputs=[DatasetReference(reference_name="RawJsonDataset")],
    outputs=[DatasetReference(reference_name="ProcessedParquetDataset")],
    source=copy_source,
    sink=copy_sink,
    translator=TabularTranslator(column_mappings=[
        ColumnMapping(source=ColumnReference(name="order_id"), sink=ColumnReference(name="order_id")),
        ColumnMapping(source=ColumnReference(name="sales_amount"), sink=ColumnReference(name="sales")),
    ])
)

pipeline = PipelineResource(activities=[copy_activity])
adf_client.pipelines.create_or_update("dsa-ml-rg", "dsa-adf", "IngestRawSales", pipeline)

# Create a Schedule Trigger (daily at 1 AM UTC)
trigger = TriggerResource(properties=ScheduleTrigger(
    pipelines=[TriggerPipelineReference(pipeline_reference=PipelineReference(reference_name="IngestRawSales"))],
    recurrence=ScheduleTriggerRecurrence(
        frequency="Day", interval=1,
        start_time="2024-01-01T01:00:00Z",
        time_zone="UTC"
    )
))
adf_client.triggers.create_or_update("dsa-ml-rg", "dsa-adf", "DailyIngestTrigger", trigger)</code></pre>` },
    { type: 'tip', body: `Use <strong>Azure Key Vault Linked Service</strong> in ADF and reference secrets by name instead of pasting connection strings. In the ADF Studio, set Linked Service → "Azure Key Vault" for credentials. This means no credentials exist inside ADF — a rotation in Key Vault propagates automatically. If ADF is compromised, attackers cannot extract secrets because ADF only ever calls Key Vault at runtime with its Managed Identity.` },
    { type: 'exercise', title: 'Create an ADF pipeline that copies a CSV from blob to ADLS as Parquet', hint: 'In ADF Studio: create linked services for source (Blob) and sink (ADLS), create datasets, build a Copy Activity with CSV source and Parquet sink, run the pipeline', solution: `# ADF Studio (UI) walkthrough:
# 1. ADF Studio → Manage → Linked Services → New
#    → Azure Blob Storage → Authentication: Managed Identity → Account: dsacoursestorage

# 2. Linked Services → New → Azure Data Lake Storage Gen2
#    → Authentication: Managed Identity → Account: dsadatalake

# 3. Author → Datasets → New Dataset
#    a. Source: Azure Blob Storage → CSV → name "RawSalesCSV"
#       → Linked service: BlobLS → File path: raw-data/sales/*.csv
#       → First row as header: Yes → Import schema: From connection/store
#    b. Sink: ADLS Gen2 → Parquet → name "ProcessedSalesParquet"
#       → Linked service: ADLS-LS → File path: processed/sales/

# 4. Author → Pipelines → New Pipeline → name "IngestRawSalesDaily"
#    → Drag "Copy data" activity onto canvas
#    → Source tab: Dataset = RawSalesCSV
#    → Sink tab: Dataset = ProcessedSalesParquet
#    → Mapping tab: Auto-map columns (or manually map)

# 5. Add trigger: Trigger → New/Edit → Schedule
#    → Recurrence: Every 1 Day at 1:00 AM

# 6. Debug run: Pipeline → Debug
#    → Monitor: Monitor → Pipeline Runs → view duration and status

# 7. Verify output:
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient
credential = DefaultAzureCredential()
bsc = BlobServiceClient("https://dsadatalake.dfs.core.windows.net", credential)
for b in bsc.get_container_client("processed").list_blobs(name_starts_with="sales/"):
    print(b.name, b.size)` }
  ]
};

L['azure-w3-l2'] = {
  title: 'Azure Databricks — Apache Spark on Azure',
  sections: [
    { type: 'text', body: `<h2>What is Azure Databricks?</h2>
<p>Azure Databricks is a fast, easy, and collaborative Apache Spark analytics platform optimised for Azure. It is a first-party Azure service jointly developed by Microsoft and Databricks, with deep integration into ADLS Gen2, Azure ML, Synapse Analytics, ADF, and Entra ID. For data science teams, it is the primary platform for large-scale ETL, feature engineering, and distributed ML training on Azure.</p>
<h3>Databricks Components</h3>
<ul>
  <li><strong>Workspace</strong> — collaborative environment with notebooks, repos (Git integration), jobs, experiments (MLflow), and cluster management.</li>
  <li><strong>Cluster</strong> — a Spark execution environment. All-purpose clusters (interactive notebooks) or Job clusters (single-job, auto-terminated). Configurable: VM size, min/max workers, auto-scaling, Spot VMs, Databricks Runtime version.</li>
  <li><strong>Databricks Runtime for ML</strong> — a pre-built cluster image with ML libraries: scikit-learn, TensorFlow, PyTorch, XGBoost, LightGBM, MLflow, Hugging Face Transformers, and RAPIDS (GPU). No setup needed.</li>
  <li><strong>MLflow</strong> — open-source experiment tracking, model packaging, and model registry built into every Databricks workspace. Log metrics, parameters, and artefacts from any notebook.</li>
  <li><strong>Delta Live Tables (DLT)</strong> — a declarative ETL framework where you define tables as SQL or Python, and Databricks automatically manages pipeline execution, data quality, and orchestration.</li>
</ul>` },
    { type: 'text', body: `<h3>PySpark for ML Feature Engineering</h3>
<pre><code>from pyspark.sql import SparkSession
from pyspark.sql.functions import (col, datediff, count, sum as spark_sum,
    avg, when, lit, to_date, months_between, current_date)
from pyspark.sql.window import Window
import mlflow

spark = SparkSession.builder.getOrCreate()

# Read from ADLS Gen2 (credential passthrough via Entra ID in Databricks)
orders = spark.read.format("delta") \
  .load("abfss://raw@dsadatalake.dfs.core.windows.net/orders/")
customers = spark.read.format("delta") \
  .load("abfss://raw@dsadatalake.dfs.core.windows.net/customers/")

# Feature engineering
window_30d = Window.partitionBy("customer_id") \
  .orderBy(col("order_date").cast("long")) \
  .rangeBetween(-30*86400, 0)

features = orders.join(customers, "customer_id") \
  .withColumn("purchase_count_30d", count("order_id").over(window_30d)) \
  .withColumn("spend_30d", spark_sum("amount").over(window_30d)) \
  .withColumn("account_age_days", datediff(current_date(), col("join_date"))) \
  .withColumn("days_since_last_order", datediff(current_date(), col("order_date"))) \
  .groupBy("customer_id") \
  .agg(
    avg("age").alias("age"),
    spark_sum("purchase_count_30d").alias("purchase_count_30d"),
    spark_sum("spend_30d").alias("spend_30d"),
    avg("account_age_days").alias("account_age_days"),
    spark_sum("days_since_last_order").alias("days_since_last_order"),
    avg("churned").alias("churn_label")
  )

# Write to curated Delta table
features.write.format("delta").mode("overwrite") \
  .partitionBy("churn_label") \
  .save("abfss://curated@dsadatalake.dfs.core.windows.net/churn_features/")</code></pre>
<h3>MLflow Experiment Tracking</h3>
<pre><code>import mlflow, mlflow.sklearn
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
import pandas as pd

features_pd = features.toPandas()
X = features_pd.drop(["customer_id","churn_label"], axis=1)
y = features_pd["churn_label"]
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

mlflow.set_experiment("/Users/you@company.com/churn-experiment")
with mlflow.start_run(run_name="gbm-depth4-lr01"):
    params = {"n_estimators": 200, "max_depth": 4, "learning_rate": 0.1}
    mlflow.log_params(params)
    model = GradientBoostingClassifier(**params, random_state=42)
    model.fit(X_tr, y_tr)
    auc = roc_auc_score(y_te, model.predict_proba(X_te)[:,1])
    mlflow.log_metric("val_auc", auc)
    mlflow.sklearn.log_model(model, "churn-gbm")
    print(f"AUC: {auc:.4f} | Run ID: {mlflow.active_run().info.run_id}")</code></pre>` },
    { type: 'tip', body: `Use <strong>Databricks Repos</strong> (Git integration) to version-control notebooks as .py or .ipynb files in a GitHub or Azure DevOps repo. Every pull request triggers CI checks (unit tests, linting) via GitHub Actions. When the PR merges, a Databricks Job automatically runs the updated notebook on a job cluster — giving you full MLOps without leaving the Databricks ecosystem.` },
    { type: 'exercise', title: 'Run a feature engineering and MLflow tracking notebook in Databricks', hint: 'Create a Databricks workspace, attach a cluster with ML Runtime, write features to Delta Lake, run an MLflow experiment, compare two runs in the Experiments UI', solution: `# 1. Create Databricks workspace (Portal → Azure Databricks → Create)
#    → Premium tier (required for Unity Catalog and RBAC)
#    → Launch Workspace → Create Cluster → ML Runtime 14.x → Standard_D4s_v5

# 2. In a notebook (attach to cluster):
import mlflow, pandas as pd, numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import GradientBoostingClassifier

X, y = make_classification(n_samples=5000, n_features=15, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

mlflow.set_experiment("/Users/you/churn-demo")

for model_class, params, name in [
    (LogisticRegression, {"C": 1.0, "max_iter": 500}, "logistic-C1"),
    (GradientBoostingClassifier, {"n_estimators": 100, "max_depth": 4}, "gbm-d4-n100")
]:
    with mlflow.start_run(run_name=name):
        mlflow.log_params(params)
        m = model_class(**params)
        m.fit(X_tr, y_tr)
        auc = roc_auc_score(y_te, m.predict_proba(X_te)[:,1])
        mlflow.log_metric("val_auc", auc)
        mlflow.sklearn.log_model(m, "model")
        print(f"{name}: AUC = {auc:.4f}")

# 3. Experiments UI → compare both runs → select best
# 4. Register best model: right-click run → Register Model → "churn-model"` }
  ]
};

L['azure-w3-l3'] = {
  title: 'Azure Stream Analytics — Real-Time Event Processing',
  sections: [
    { type: 'text', body: `<h2>What is Azure Stream Analytics?</h2>
<p>Azure Stream Analytics (ASA) is a fully managed, serverless real-time event processing service. It reads events from inputs (Event Hubs, IoT Hub, Blob Storage), applies SQL-like transformation logic (filtering, aggregation, joining, windowing) on live streams, and writes results to outputs (ADLS Gen2, Cosmos DB, Azure SQL, Power BI, Event Hubs) — all without managing any compute infrastructure.</p>
<h3>Azure Event Hubs — The Streaming Ingestion Layer</h3>
<p>Before data reaches Stream Analytics, it typically comes through Azure Event Hubs — a managed, high-throughput event streaming platform that can ingest millions of events per second. Event Hubs is the Azure equivalent of Apache Kafka and actually supports the Kafka protocol natively.</p>
<pre><code># Create an Event Hubs namespace and hub
az eventhubs namespace create \
  --name dsa-eventhubs \
  --resource-group dsa-ml-rg \
  --location centralindia \
  --sku Standard \
  --capacity 2       # 2 Throughput Units = 2 MB/s ingestion

az eventhubs eventhub create \
  --name clickstream \
  --namespace-name dsa-eventhubs \
  --resource-group dsa-ml-rg \
  --partition-count 4 \
  --message-retention 1  # retain events for 1 day

# Send events from Python
from azure.eventhub import EventHubProducerClient, EventData
import json, time, random

CONN_STR = "Endpoint=sb://dsa-eventhubs.servicebus.windows.net/;..."
producer = EventHubProducerClient.from_connection_string(CONN_STR, eventhub_name="clickstream")

events = [{"user_id": f"U{random.randint(1,100)}", "event": random.choice(["view","add_to_cart","checkout"]),
            "timestamp": time.time()} for _ in range(100)]
batch = producer.create_batch()
for e in events:
    batch.add(EventData(json.dumps(e)))
producer.send_batch(batch)
print("Sent 100 events")</code></pre>` },
    { type: 'text', body: `<h3>Stream Analytics Query Language</h3>
<p>ASA uses a SQL dialect with time-windowing extensions. The query runs continuously on the stream — each new event is processed within seconds.</p>
<pre><code>-- Window types in ASA SQL:

-- Tumbling Window: fixed, non-overlapping intervals
-- Count events per user per 5-minute window
SELECT
    System.Timestamp() AS window_end,
    user_id,
    event,
    COUNT(*) AS event_count
FROM clickstream TIMESTAMP BY timestamp
GROUP BY
    user_id,
    event,
    TumblingWindow(minute, 5)

-- Sliding Window: overlapping, triggers on every event
-- Alert when any user generates > 20 events in 1 minute (potential bot)
SELECT user_id, COUNT(*) AS events_in_1min
FROM clickstream TIMESTAMP BY timestamp
GROUP BY user_id, SlidingWindow(minute, 1)
HAVING COUNT(*) > 20

-- Hopping Window: overlapping fixed intervals
-- 10-minute totals updated every 1 minute
SELECT System.Timestamp() AS window_end,
    SUM(purchase_amount) AS revenue_10min
FROM purchases TIMESTAMP BY timestamp
GROUP BY HoppingWindow(minute, 10, 1)

-- Join two streams (within 10 seconds)
SELECT c.user_id, c.event, p.product_name
FROM clickstream c TIMESTAMP BY timestamp
JOIN products p
  ON c.product_id = p.id
  AND DATEDIFF(second, c, p) BETWEEN 0 AND 10</code></pre>
<h3>Output Routing</h3>
<p>A single ASA job can have multiple outputs — route different queries to different destinations simultaneously. Route anomaly detections to Cosmos DB for low-latency reads, aggregated metrics to Power BI for real-time dashboards, and raw enriched events to ADLS Gen2 for ML training.</p>` },
    { type: 'tip', body: `Use <strong>Reference Data</strong> in ASA to enrich streaming events with static lookup tables. Upload a CSV file to Blob Storage (e.g. product catalogue, customer segments, model score thresholds) and join it with your live stream in SQL: <code>JOIN products ON click.product_id = products.id</code>. ASA loads the reference data into memory and updates it periodically without restarting the job — enabling enrichment without an external database call per event.` },
    { type: 'exercise', title: 'Create an ASA job that counts events per user per minute and writes to ADLS', hint: 'Create an Event Hub, send 200 synthetic events, create an ASA job with Event Hub input and ADLS output, write a tumbling window query, start the job', solution: `# 1. Send test events to Event Hub
from azure.eventhub import EventHubProducerClient, EventData
import json, time, random

CONN_STR = "Endpoint=sb://dsa-eventhubs.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=YOUR_KEY"
producer = EventHubProducerClient.from_connection_string(CONN_STR, eventhub_name="clickstream")

for _ in range(200):
    batch = producer.create_batch()
    batch.add(EventData(json.dumps({
        "user_id": f"U{random.randint(1,10)}",
        "event": random.choice(["view","click","purchase"]),
        "amount": round(random.uniform(10,500),2),
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S")
    })))
    producer.send_batch(batch)
    time.sleep(0.2)
producer.close()

# 2. Create ASA Job (Portal → Stream Analytics jobs → Create)
#    → Name: clickstream-counter, Region: Central India

# 3. Inputs → Add stream input → Event Hub
#    → clickstream namespace, clickstream hub, Consumer group: $Default

# 4. Outputs → Add → ADLS Gen2
#    → Account: dsacoursestorage, Path: asa-output/{date}/{time}/, Format: JSON

# 5. Query tab → paste:
SELECT
    System.Timestamp() AS window_end,
    user_id,
    event,
    COUNT(*) AS count,
    SUM(amount) AS total_amount
INTO [adls-output]
FROM [clickstream-input] TIMESTAMP BY timestamp
GROUP BY user_id, event, TumblingWindow(minute, 1)

# 6. Start job → wait 2-3 minutes → check ADLS output folder
# az storage fs file list --account-name dsacoursestorage -f asa-output --auth-mode login` }
  ]
};

L['azure-w3-l4'] = {
  title: 'Azure Functions — Serverless Compute for Data Pipelines',
  sections: [
    { type: 'text', body: `<h2>What is Azure Functions?</h2>
<p>Azure Functions is Azure's serverless compute service — you write code (Python, C#, JavaScript, PowerShell, Java, TypeScript), deploy it, and Azure runs it in response to triggers. You pay only for execution time (per 100ms) and the number of executions — no idle cost. For data science pipelines, Functions are the glue: trigger ETL jobs on file arrival, validate data, invoke ML endpoints, and send alerts.</p>
<h3>Trigger Types for Data Pipelines</h3>
<ul>
  <li><strong>Blob Trigger</strong> — fires when a new file is created or updated in a specific blob container path. The ideal trigger for file-arrival ETL: when a new CSV lands in raw/, trigger validation and conversion to Parquet.</li>
  <li><strong>Timer Trigger</strong> — cron-expression-based schedule (e.g. <code>0 0 1 * * *</code> = daily at 1 AM). Trigger data quality checks, model retraining assessments, or report generation.</li>
  <li><strong>Event Hub Trigger</strong> — processes batches of events from an Event Hub. Enriches or routes streaming events to downstream systems.</li>
  <li><strong>HTTP Trigger</strong> — exposes the function as an HTTP endpoint. Build lightweight ML inference APIs backed by Azure ML endpoints.</li>
  <li><strong>Queue Trigger</strong> — processes messages from Azure Storage Queue or Service Bus. Fan-out pattern: a message per item triggers parallel processing.</li>
</ul>` },
    { type: 'text', body: `<h3>Blob-Triggered Data Validation Function</h3>
<pre><code>import azure.functions as func
import logging, io, json
from azure.storage.blob import BlobServiceClient
from azure.identity import DefaultAzureCredential
import pandas as pd

app = func.FunctionApp()

@app.blob_trigger(arg_name="myblob",
                  path="raw-data/{name}",
                  connection="AzureWebJobsStorage")
def validate_and_convert(myblob: func.InputStream, name: str):
    logging.info(f"Processing blob: {name} ({myblob.length} bytes)")

    if not name.endswith(".csv"):
        logging.info("Not a CSV, skipping")
        return

    # Read CSV
    df = pd.read_csv(io.BytesIO(myblob.read()))
    logging.info(f"Loaded {len(df)} rows, {len(df.columns)} columns")

    # Validate
    required_cols = ["customer_id", "sales", "region", "order_date"]
    missing = [c for c in required_cols if c not in df.columns]
    if missing:
        logging.error(f"Validation failed: missing columns {missing}")
        raise ValueError(f"Missing: {missing}")

    df = df.dropna(subset=["customer_id", "sales"])
    df["sales"] = df["sales"].clip(lower=0)
    df["order_date"] = pd.to_datetime(df["order_date"])

    # Write Parquet to processed/
    credential = DefaultAzureCredential()
    bsc = BlobServiceClient("https://dsadatalake.dfs.core.windows.net", credential)
    output_name = name.replace(".csv", ".parquet").replace("raw-data/", "processed/")
    buf = io.BytesIO()
    df.to_parquet(buf, index=False)
    buf.seek(0)
    bsc.get_blob_client("processed", output_name).upload_blob(buf, overwrite=True)
    logging.info(f"Written {len(df)} rows to {output_name}")

# requirements.txt:
# azure-functions
# azure-storage-blob
# azure-identity
# pandas
# pyarrow</code></pre>` },
    { type: 'tip', body: `Use the <strong>Consumption Plan</strong> for event-driven data pipeline functions — you get 1 million free executions/month and pay only for actual execution time. Upgrade to the <strong>Premium Plan</strong> only if you need: VNet integration (private data sources), always-warm instances (no cold start), or functions running longer than 10 minutes (Consumption Plan limit). Most data pipeline triggers (blob arrival, queue messages) are infrequent enough that Consumption Plan is near-free.` },
    { type: 'exercise', title: 'Deploy a blob-triggered Azure Function that validates CSVs and converts to Parquet', hint: 'Create a Function App, write a blob trigger function in Python, deploy via Azure Functions Core Tools or VS Code, upload a test CSV and verify Parquet output', solution: `# 1. Install Azure Functions Core Tools
npm install -g azure-functions-core-tools@4

# 2. Create function project
func init dsa-data-validator --python
cd dsa-data-validator
func new --name BlobValidator --template "Azure Blob Storage trigger"

# 3. Edit function_app.py with the blob trigger code above

# 4. requirements.txt:
# azure-functions
# azure-storage-blob>=12.0.0
# azure-identity
# pandas
# pyarrow

# 5. local.settings.json:
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=https;AccountName=dsacoursestorage;...",
    "FUNCTIONS_WORKER_RUNTIME": "python",
    "AZURE_STORAGE_ACCOUNT": "dsadatalake"
  }
}

# 6. Test locally
func start
# Upload a test CSV to raw-data container — watch console output

# 7. Deploy to Azure
az functionapp create \
  --resource-group dsa-ml-rg \
  --consumption-plan-location centralindia \
  --runtime python \
  --runtime-version 3.11 \
  --functions-version 4 \
  --name dsa-blob-validator \
  --storage-account dsacoursestorage \
  --assign-identity

func azure functionapp publish dsa-blob-validator

# 8. Assign Storage Blob Data Contributor to Function's Managed Identity
FUNC_ID=$(az functionapp identity show --name dsa-blob-validator --resource-group dsa-ml-rg --query principalId -o tsv)
az role assignment create --assignee-object-id $FUNC_ID --role "Storage Blob Data Contributor" --scope "/subscriptions/SUB_ID/resourceGroups/dsa-ml-rg"` }
  ]
};

L['azure-w3-l5'] = {
  title: 'Azure HDInsight — Managed Hadoop & Spark Clusters',
  sections: [
    { type: 'text', body: `<h2>What is Azure HDInsight?</h2>
<p>Azure HDInsight is a fully managed cloud service for deploying open-source big data frameworks — Apache Spark, Hadoop (HDFS/YARN/MapReduce), HBase, Kafka, Hive, and Storm. Unlike Azure Databricks (Databricks-optimised Spark with a proprietary runtime), HDInsight gives you standard, unmodified Apache distributions with full configuration access.</p>
<h3>HDInsight vs Azure Databricks</h3>
<table>
  <tr><th>Aspect</th><th>HDInsight</th><th>Azure Databricks</th></tr>
  <tr><td>Runtime</td><td>Standard Apache distribution</td><td>Databricks-optimised Spark (faster)</td></tr>
  <tr><td>Frameworks</td><td>Spark, Hadoop, HBase, Kafka, Hive, Storm</td><td>Spark only (+ Delta Lake)</td></tr>
  <tr><td>Configuration</td><td>Full cluster config (Ambari)</td><td>Managed, limited config</td></tr>
  <tr><td>Notebook</td><td>Zeppelin, Jupyter</td><td>Databricks Notebooks (collaborative)</td></tr>
  <tr><td>MLflow</td><td>Manual install</td><td>Built-in</td></tr>
  <tr><td>Cost</td><td>Lower for Spark-only</td><td>Higher (but faster = fewer hours)</td></tr>
  <tr><td>Best for</td><td>Existing Hadoop workloads, HBase, Kafka</td><td>New Spark + ML workloads</td></tr>
</table>
<h3>HDInsight Cluster Types</h3>
<ul>
  <li><strong>Spark</strong> — Spark compute for ETL and ML. Choose when you need specific Spark version control or want lower cost than Databricks for CPU-only Spark jobs.</li>
  <li><strong>Kafka</strong> — managed Apache Kafka for high-throughput event streaming. An alternative to Azure Event Hubs when you need full Kafka protocol control.</li>
  <li><strong>HBase</strong> — distributed NoSQL for very wide tables and real-time read/write at petabyte scale. Used for time-series feature storage at scale.</li>
  <li><strong>Interactive Query (LLAP)</strong> — Hive LLAP for sub-second interactive SQL on large datasets. Used by BI tools directly against data lake data.</li>
</ul>` },
    { type: 'text', body: `<h3>Creating an HDInsight Spark Cluster</h3>
<pre><code># Create HDInsight Spark cluster
az hdinsight create \
  --name dsa-hdinsight-spark \
  --resource-group dsa-ml-rg \
  --location centralindia \
  --type Spark \
  --version 5.1 \
  --component-version Spark=3.3 \
  --http-password "Admin@Pass123!" \
  --http-user admin \
  --ssh-password "Admin@Pass123!" \
  --ssh-user sshuser \
  --headnode-size Standard_D4_v3 \
  --workernode-count 3 \
  --workernode-size Standard_D4_v3 \
  --storage-account dsacoursestorage \
  --storage-account-key "ACCOUNT_KEY" \
  --storage-default-container hdinsight

# SSH into the head node
IP=$(az hdinsight show --name dsa-hdinsight-spark --resource-group dsa-ml-rg --query properties.connectivityEndpoints[0].location -o tsv)
ssh sshuser@$IP

# Submit a PySpark job via Livy REST API
curl -X POST http://HEAD_NODE:8998/batches \
  -H "Content-Type: application/json" \
  --data '{
    "file": "wasbs://hdinsight@dsacoursestorage.blob.core.windows.net/scripts/etl.py",
    "args": ["--date", "2024-05-23"],
    "conf": {"spark.executor.memory": "4g", "spark.executor.cores": "2"}
  }'</code></pre>
<h3>Running PySpark on HDInsight via Jupyter</h3>
<pre><code># Access Jupyter: https://CLUSTER_NAME.azurehdinsight.net/jupyter
# PySpark kernel automatically creates a SparkContext

# In notebook — Spark is pre-configured to read from Azure Blob/ADLS
df = spark.read.csv("wasbs://raw-data@dsacoursestorage.blob.core.windows.net/sales/", header=True, inferSchema=True)
df.printSchema()
df.groupBy("region").agg({"sales":"sum"}).show()

# Write results back to storage
result = df.groupBy("region","category").sum("sales","profit")
result.write.mode("overwrite").parquet(
    "wasbs://processed@dsacoursestorage.blob.core.windows.net/sales_by_region_category/")
print("Written", result.count(), "rows")</code></pre>` },
    { type: 'tip', body: `<strong>Delete HDInsight clusters when not in use.</strong> Unlike Databricks which can scale to 0 workers, HDInsight head nodes are always running even when no jobs are executing — head nodes on a Standard_D4_v3 cost ~$0.25/hour even idle. For batch workloads that run once daily, create the cluster at the start of your ADF pipeline and delete it at the end with the HDInsight ADF activity. Store all data in Azure Blob/ADLS Gen2 (not HDFS) so data persists after cluster deletion.` },
    { type: 'exercise', title: 'Submit a PySpark job to HDInsight and read results from ADLS', hint: 'Create a Spark cluster, SSH in, submit a pyspark script via spark-submit, write results to blob storage, and read back in pandas', solution: `# 1. Create cluster (5-10 min)
az hdinsight create --name dsa-hdi --resource-group dsa-ml-rg \
  --location centralindia --type Spark --version 5.1 \
  --component-version Spark=3.3 \
  --http-password "Admin@Pass123!" --http-user admin \
  --ssh-password "Admin@Pass123!" --ssh-user sshuser \
  --headnode-size Standard_D4_v3 --workernode-count 2 \
  --workernode-size Standard_D4_v3 \
  --storage-account dsacoursestorage --storage-default-container hdinsight

# 2. Upload script to blob
# etl.py:
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum as spark_sum
spark = SparkSession.builder.appName("SalesETL").getOrCreate()
df = spark.read.csv("wasbs://raw-data@dsacoursestorage.blob.core.windows.net/sales/", header=True, inferSchema=True)
result = df.filter(col("sales") > 0).groupBy("region").agg(spark_sum("sales").alias("total"))
result.write.mode("overwrite").parquet("wasbs://processed@dsacoursestorage.blob.core.windows.net/sales_by_region/")
print("Done:", result.count(), "regions")
spark.stop()

# az storage blob upload --account-name dsacoursestorage --container-name hdinsight --name scripts/etl.py --file etl.py --auth-mode login

# 3. SSH and submit
# ssh sshuser@dsa-hdi-ssh.azurehdinsight.net
# spark-submit wasbs://hdinsight@dsacoursestorage.blob.core.windows.net/scripts/etl.py

# 4. Read results in pandas
import pandas as pd
from azure.storage.blob import BlobServiceClient
from azure.identity import DefaultAzureCredential
import io
credential = DefaultAzureCredential()
bsc = BlobServiceClient("https://dsacoursestorage.blob.core.windows.net", credential)
for blob in bsc.get_container_client("processed").list_blobs(name_starts_with="sales_by_region/"):
    if blob.name.endswith(".parquet"):
        data = bsc.get_blob_client("processed", blob.name).download_blob().readall()
        df = pd.read_parquet(io.BytesIO(data))
        print(df)
        break

# 5. DELETE cluster to stop billing
az hdinsight delete --name dsa-hdi --resource-group dsa-ml-rg --yes` }
  ]
};


/* ─── MODULE 4 — Machine Learning with Azure ML ─────────────────────────── */

L['azure-w4-l1'] = {
  title: 'Azure Machine Learning Workspace & Studio',
  sections: [
    { type: 'text', body: `<h2>Azure Machine Learning Workspace</h2>
<p>The Azure ML Workspace is the top-level resource for everything ML in Azure. It acts as a central hub — every experiment run, dataset, compute target, model, and endpoint belongs to a workspace. When you create a workspace, Azure automatically provisions four companion resources: a Storage Account (artefacts), a Key Vault (secrets), a Container Registry (Docker images), and Application Insights (monitoring).</p>
<h3>Creating a Workspace</h3>
<pre><code>from azure.ai.ml import MLClient
from azure.ai.ml.entities import Workspace
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()

# Create workspace
ml_client = MLClient(credential, subscription_id="SUB_ID", resource_group_name="dsa-ml-rg")
ws = Workspace(
    name="dsa-ml-workspace",
    location="centralindia",
    display_name="DSA ML Workspace",
    description="Data Science Academia Azure ML workspace"
)
ws = ml_client.workspaces.begin_create(ws).result()
print("Workspace:", ws.name, ws.id)

# Connect to existing workspace
ml_client = MLClient(
    credential=credential,
    subscription_id="SUB_ID",
    resource_group_name="dsa-ml-rg",
    workspace_name="dsa-ml-workspace"
)</code></pre>
<h3>Azure ML Studio (ml.azure.com)</h3>
<p>Azure ML Studio is the web UI for the workspace — the primary interface for data scientists. Key sections:</p>
<ul>
  <li><strong>Notebooks</strong> — browser-based Jupyter notebooks running on a Compute Instance. Full VS Code integration, Git support, and terminal access.</li>
  <li><strong>Experiments</strong> — all training runs listed with metrics, parameters, and artefact links. Compare runs side-by-side.</li>
  <li><strong>Models</strong> — the Model Registry. Browse registered model versions, view metrics, and initiate deployment.</li>
  <li><strong>Endpoints</strong> — manage real-time and batch inference endpoints. View invocation metrics and logs.</li>
  <li><strong>Pipelines</strong> — view pipeline runs, step-by-step execution graphs, and intermediate outputs.</li>
  <li><strong>Data</strong> — registered datasets (URIs to ADLS/Blob with schema metadata).</li>
  <li><strong>Compute</strong> — manage Compute Instances, Compute Clusters, and attached Kubernetes clusters.</li>
</ul>` },
    { type: 'text', body: `<h3>Working with the Azure ML Python SDK v2</h3>
<pre><code>from azure.ai.ml import MLClient, command
from azure.ai.ml.entities import Data
from azure.ai.ml.constants import AssetTypes
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
ml_client = MLClient(credential, "SUB_ID", "dsa-ml-rg", "dsa-ml-workspace")

# Register a data asset (points to ADLS Gen2 path)
data_asset = Data(
    name="churn-training-data",
    version="1",
    description="Customer churn features — May 2024",
    path="azureml://datastores/workspaceblobstore/paths/processed/features/",
    type=AssetTypes.URI_FOLDER
)
ml_client.data.create_or_update(data_asset)
print("Data asset registered")

# List all registered models
for model in ml_client.models.list():
    print(f"{model.name} v{model.version}: {model.description}")

# List compute targets
for compute in ml_client.compute.list():
    print(f"{compute.name} ({compute.type}) — {compute.provisioning_state}")</code></pre>
<h3>Datastores</h3>
<p>A Datastore is a named reference to an Azure storage service registered with the workspace. It stores the connection info once and lets all pipelines, jobs, and notebooks reference data by name — no connection strings in code.</p>
<pre><code>from azure.ai.ml.entities import AzureBlobDatastore, AccountKeyConfiguration

# Register an ADLS Gen2 datastore
datastore = AzureBlobDatastore(
    name="adls-processed",
    description="Processed data lake zone",
    account_name="dsadatalake",
    container_name="processed",
    credentials=AccountKeyConfiguration(account_key="..."),  # or use Managed Identity
)
ml_client.datastores.create_or_update(datastore)</code></pre>` },
    { type: 'tip', body: `Connect Azure ML Studio to your <strong>GitHub or Azure DevOps repo</strong> from the Notebooks section (Notebooks → Manage files → Clone repo). Every notebook you write is version-controlled in your repo automatically. Push changes with a single click. This turns ad-hoc notebook exploration into tracked, reproducible work without requiring team members to copy notebooks manually.` },
    { type: 'exercise', title: 'Create an Azure ML workspace, register a data asset, and explore the Studio UI', hint: 'Create a workspace via SDK or CLI, register a dataset pointing to your ADLS storage, open ml.azure.com and verify the dataset appears, list compute targets', solution: `# 1. Create workspace via CLI
az ml workspace create \
  --name dsa-ml-workspace \
  --resource-group dsa-ml-rg \
  --location centralindia

# 2. Python SDK — register data and list resources
from azure.ai.ml import MLClient
from azure.ai.ml.entities import Data
from azure.ai.ml.constants import AssetTypes
from azure.identity import DefaultAzureCredential

ml_client = MLClient(DefaultAzureCredential(), "SUB_ID", "dsa-ml-rg", "dsa-ml-workspace")

# Register a dataset
data = Data(
    name="sample-features",
    version="1",
    description="Sample customer features",
    path="https://dsacoursestorage.blob.core.windows.net/processed/",
    type=AssetTypes.URI_FOLDER
)
ml_client.data.create_or_update(data)
print("Dataset registered")

# List all data assets
print("\nRegistered datasets:")
for d in ml_client.data.list():
    print(f"  {d.name} v{d.version}")

# 3. Open ml.azure.com → Data → verify "sample-features" appears
# 4. Compute → Compute Instances → create one (Standard_DS3_v2) for development` }
  ]
};

L['azure-w4-l2'] = {
  title: 'AutoML & Azure ML Designer — No-Code ML',
  sections: [
    { type: 'text', body: `<h2>Azure ML AutoML</h2>
<p>Azure ML Automated ML (AutoML) automatically trains and tunes many models for a given ML task, evaluating algorithms and hyperparameter combinations, and surfacing the best model ranked by a target metric. It supports classification, regression, time-series forecasting, natural language processing, and computer vision tasks.</p>
<h3>AutoML via Python SDK v2</h3>
<pre><code>from azure.ai.ml import MLClient, automl
from azure.ai.ml.constants import TabularTrainingMode
from azure.ai.ml.entities import Data
from azure.ai.ml.constants import AssetTypes
from azure.identity import DefaultAzureCredential
import pandas as pd, io
from azure.storage.blob import BlobServiceClient

credential = DefaultAzureCredential()
ml_client = MLClient(credential, "SUB_ID", "dsa-ml-rg", "dsa-ml-workspace")

# Register training data (must be in ADLS/Blob as a URI)
train_data = ml_client.data.get("churn-training-data", version="1")

# Configure AutoML classification job
classification_job = automl.classification(
    compute="cpu-cluster",              # Compute Cluster name
    experiment_name="churn-automl",
    training_data=train_data,
    target_column_name="churned",
    primary_metric="AUC_weighted",
    n_cross_validations=5,
    training_mode=TabularTrainingMode.ENSEMBLE,
    timeout_minutes=60,                 # stop after 60 min
    trial_timeout_minutes=15,           # each model gets 15 min max
    max_trials=20,                      # try up to 20 models
    enable_model_explainability=True    # generate SHAP feature importance
)

# Set allowed/blocked algorithms
classification_job.set_training(
    allowed_training_algorithms=["LightGBM", "XGBoostClassifier", "RandomForest",
                                  "LogisticRegression", "GradientBoosting"]
)

# Submit
returned_job = ml_client.jobs.create_or_update(classification_job)
print("AutoML job submitted:", returned_job.name)

# Wait and get best model
ml_client.jobs.stream(returned_job.name)  # blocks until complete
best_run = ml_client.jobs.get(returned_job.name)
print("Best model:", best_run.outputs)</code></pre>` },
    { type: 'text', body: `<h3>AutoML for Time Series Forecasting</h3>
<pre><code>from azure.ai.ml import automl

forecasting_job = automl.forecasting(
    compute="cpu-cluster",
    experiment_name="sales-forecast-automl",
    training_data=train_data,
    target_column_name="sales",
    primary_metric="NormalizedRootMeanSquaredError",
    forecasting_settings=automl.ForecastingSettings(
        time_column_name="date",
        time_series_id_column_names=["region", "category"],  # separate model per group
        forecast_horizon=30,     # predict 30 days ahead
        frequency="D",           # daily frequency
        seasonality=7,           # weekly seasonality
    ),
    timeout_minutes=120
)
ml_client.jobs.create_or_update(forecasting_job)</code></pre>
<h3>Azure ML Designer</h3>
<p>Azure ML Designer is a visual drag-and-drop canvas for building ML pipelines — no code required. Connect pre-built component blocks (data import, feature selection, normalisation, algorithm, evaluation) with arrows. Each component is configurable through a properties panel.</p>
<ul>
  <li>Good for: teaching ML concepts, prototyping, and non-programmers who need to run standard ML workflows.</li>
  <li>Limitations: no custom code in the drag-drop canvas (you can insert a Python Script module), fixed set of algorithms, limited for advanced use cases.</li>
  <li>Exports as YAML pipeline for version control.</li>
</ul>
<p>In Azure ML Studio → Designer → New pipeline → drag components from the asset library → connect → Submit.</p>` },
    { type: 'tip', body: `After AutoML completes, use the <strong>Model Explanability report</strong> generated automatically for the best model — it shows global and local SHAP feature importance. In Studio → Experiment → best run → Explanations tab. Share this with business stakeholders to get buy-in before deploying: "the model gives high churn scores to customers with low spend_30d and high days_since_last_visit" is a story stakeholders understand, validating the model's logic before production.` },
    { type: 'exercise', title: 'Run an AutoML classification job and inspect the best model', hint: 'Register a tabular dataset, configure an AutoML classification job targeting AUC_weighted, submit, wait for completion, print the best run metrics', solution: `from azure.ai.ml import MLClient, automl
from azure.ai.ml.entities import Data
from azure.ai.ml.constants import AssetTypes, TabularTrainingMode
from azure.identity import DefaultAzureCredential
import pandas as pd, io
from azure.storage.blob import BlobServiceClient

credential = DefaultAzureCredential()
ml_client = MLClient(credential, "SUB_ID", "dsa-ml-rg", "dsa-ml-workspace")

# Upload sample data to blob first
from sklearn.datasets import make_classification
import numpy as np
X, y = make_classification(n_samples=2000, n_features=10, random_state=42)
df = pd.DataFrame(X, columns=[f"f{i}" for i in range(10)])
df["churned"] = y
df.to_csv("/tmp/churn_train.csv", index=False)

bsc = BlobServiceClient("https://dsacoursestorage.blob.core.windows.net", credential)
with open("/tmp/churn_train.csv", "rb") as f:
    bsc.get_blob_client("processed", "automl/churn_train.csv").upload_blob(f, overwrite=True)

# Register dataset
data = Data(name="churn-automl-train", version="1",
    path="azureml://datastores/workspaceblobstore/paths/processed/automl/churn_train.csv",
    type=AssetTypes.URI_FILE)
ml_client.data.create_or_update(data)

# Submit AutoML job
job = automl.classification(
    compute="cpu-cluster",
    experiment_name="churn-automl-demo",
    training_data=data,
    target_column_name="churned",
    primary_metric="AUC_weighted",
    n_cross_validations=3,
    timeout_minutes=30,
    max_trials=10
)
returned = ml_client.jobs.create_or_update(job)
print("Job URL:", returned.studio_url)

# Monitor in Studio → Jobs → churn-automl-demo
# Best model appears in Models tab after completion` }
  ]
};

L['azure-w4-l3'] = {
  title: 'Compute Clusters, Environments & Training Jobs',
  sections: [
    { type: 'text', body: `<h2>Azure ML Compute Clusters</h2>
<p>A Compute Cluster is a managed pool of VMs that scales from 0 to N nodes automatically. Jobs are queued when the cluster is at 0 nodes; the cluster scales up, runs the job, then scales back to 0 (no idle cost). This is the primary compute for training jobs, pipelines, and batch inference in Azure ML.</p>
<pre><code>from azure.ai.ml import MLClient
from azure.ai.ml.entities import AmlCompute
from azure.identity import DefaultAzureCredential

ml_client = MLClient(DefaultAzureCredential(), "SUB_ID", "dsa-ml-rg", "dsa-ml-workspace")

# Create a CPU cluster (scales 0–4 nodes)
cpu_cluster = AmlCompute(
    name="cpu-cluster",
    type="amlcompute",
    size="Standard_D4s_v3",       # 4 vCPUs, 16 GB RAM
    min_instances=0,               # scale to zero — no idle cost
    max_instances=4,
    idle_time_before_scale_down=120,  # seconds before scaling down
    tier="Dedicated"               # or "LowPriority" for spot (cheaper, preemptible)
)
ml_client.compute.begin_create_or_update(cpu_cluster).result()

# GPU cluster for deep learning
gpu_cluster = AmlCompute(
    name="gpu-cluster",
    size="Standard_NC6s_v3",      # 1× V100 GPU
    min_instances=0, max_instances=2,
    tier="LowPriority"             # up to 80% cheaper; job may be preempted
)
ml_client.compute.begin_create_or_update(gpu_cluster).result()</code></pre>
<h3>Environments</h3>
<p>An Azure ML Environment defines the runtime for a training job — the Docker base image plus Python packages. Environments are versioned and cached so the same environment is reused across jobs without rebuilding.</p>
<pre><code>from azure.ai.ml.entities import Environment

# Curated environments (pre-built by Microsoft) — fastest startup
env_curated = ml_client.environments.get("AzureML-sklearn-1.0-ubuntu20.04-py38-cpu", version="1")

# Custom environment from conda spec
env_custom = Environment(
    name="dsa-ml-env",
    version="2",
    description="Custom env with LightGBM, SHAP, mlflow",
    conda_file="conda.yml",        # see below
    image="mcr.microsoft.com/azureml/openmpi4.1.0-ubuntu20.04"
)
ml_client.environments.create_or_update(env_custom)

# conda.yml:
# channels: [conda-forge, defaults]
# dependencies:
#   - python=3.10
#   - pip:
#     - lightgbm==4.2.0
#     - scikit-learn==1.4.0
#     - pandas==2.1.0
#     - mlflow==2.11.0
#     - shap==0.45.0
#     - azure-ai-ml</code></pre>` },
    { type: 'text', body: `<h3>Submitting a Training Job</h3>
<pre><code>from azure.ai.ml import MLClient, command
from azure.ai.ml import Input
from azure.ai.ml.constants import AssetTypes
from azure.identity import DefaultAzureCredential

ml_client = MLClient(DefaultAzureCredential(), "SUB_ID", "dsa-ml-rg", "dsa-ml-workspace")

# train.py — your training script
# --------------------------------
# import argparse, mlflow, pandas as pd
# from sklearn.ensemble import GradientBoostingClassifier
# from sklearn.metrics import roc_auc_score
# parser = argparse.ArgumentParser()
# parser.add_argument("--data", type=str)
# parser.add_argument("--n-estimators", type=int, default=100)
# parser.add_argument("--max-depth", type=int, default=4)
# args = parser.parse_args()
# df = pd.read_csv(args.data + "/churn_train.csv")
# X, y = df.drop("churned",axis=1), df["churned"]
# mlflow.sklearn.autolog()
# model = GradientBoostingClassifier(n_estimators=args.n_estimators, max_depth=args.max_depth)
# model.fit(X, y)
# mlflow.log_metric("val_auc", roc_auc_score(y, model.predict_proba(X)[:,1]))
# --------------------------------

job = command(
    code="./src",                  # local directory with train.py
    command="python train.py --data \${{inputs.data}} --n-estimators \${{inputs.n_estimators}} --max-depth \${{inputs.max_depth}}",
    inputs={
        "data": Input(type=AssetTypes.URI_FOLDER,
                      path="azureml:churn-training-data:1"),
        "n_estimators": 200,
        "max_depth": 5
    },
    environment="dsa-ml-env:2",
    compute="cpu-cluster",
    display_name="churn-gbm-training",
    experiment_name="churn-prediction",
    tags={"model": "GBM", "version": "v2"}
)

returned_job = ml_client.jobs.create_or_update(job)
print("Job:", returned_job.name)
print("Studio URL:", returned_job.studio_url)

ml_client.jobs.stream(returned_job.name)  # wait for completion</code></pre>` },
    { type: 'tip', body: `Use <strong>mlflow.autolog()</strong> in every training script — a single line that automatically logs all parameters, metrics, and the trained model to the Azure ML experiment without any manual log calls. For sklearn it logs: all hyperparameters, training/validation metrics, feature importance, confusion matrix, and the serialised model — all viewable in Studio without changing any other code.` },
    { type: 'exercise', title: 'Create a compute cluster, custom environment, and submit a training job', hint: 'Create a cpu-cluster (min=0, max=2, Standard_D2s_v3), define a conda environment with sklearn and mlflow, write train.py, submit a command job, and monitor in Studio', solution: `# src/train.py
import argparse, mlflow, mlflow.sklearn, pandas as pd, os
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
from sklearn.datasets import make_classification

parser = argparse.ArgumentParser()
parser.add_argument("--n-estimators", type=int, default=100)
parser.add_argument("--max-depth", type=int, default=5)
args = parser.parse_args()

X, y = make_classification(n_samples=5000, n_features=15, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2)

mlflow.sklearn.autolog()
with mlflow.start_run():
    model = RandomForestClassifier(n_estimators=args.n_estimators, max_depth=args.max_depth)
    model.fit(X_tr, y_tr)
    auc = roc_auc_score(y_te, model.predict_proba(X_te)[:,1])
    mlflow.log_metric("test_auc", auc)
    print(f"Test AUC: {auc:.4f}")

# Submit:
from azure.ai.ml import MLClient, command
from azure.identity import DefaultAzureCredential

ml_client = MLClient(DefaultAzureCredential(), "SUB_ID", "dsa-ml-rg", "dsa-ml-workspace")
job = command(
    code="./src",
    command="python train.py --n-estimators \${{inputs.n_estimators}} --max-depth \${{inputs.max_depth}}",
    inputs={"n_estimators": 150, "max_depth": 6},
    environment="AzureML-sklearn-1.0-ubuntu20.04-py38-cpu:1",
    compute="cpu-cluster",
    experiment_name="churn-demo"
)
returned = ml_client.jobs.create_or_update(job)
ml_client.jobs.stream(returned.name)` }
  ]
};

L['azure-w4-l4'] = {
  title: 'Model Registry & Managed Online Endpoints',
  sections: [
    { type: 'text', body: `<h2>Azure ML Model Registry</h2>
<p>The Model Registry stores versioned, metadata-enriched model artefacts in the workspace. Every registered model version has: the serialised model file(s), training metrics, the dataset and code that produced it, tags, and a description. It is the governance layer between training and deployment.</p>
<pre><code>from azure.ai.ml import MLClient
from azure.ai.ml.entities import Model
from azure.ai.ml.constants import AssetTypes
from azure.identity import DefaultAzureCredential

ml_client = MLClient(DefaultAzureCredential(), "SUB_ID", "dsa-ml-rg", "dsa-ml-workspace")

# Register a model from a training job output
model = Model(
    name="churn-predictor",
    version="3",
    description="GBM churn model — val AUC 0.91",
    path="azureml://jobs/JOB_ID/outputs/artifacts/paths/model/",
    type=AssetTypes.MLFLOW_MODEL,  # or CUSTOM_MODEL for non-MLflow
    tags={"framework": "sklearn", "val_auc": "0.91", "trained_on": "2024-05"}
)
registered = ml_client.models.create_or_update(model)
print("Registered:", registered.name, "v" + registered.version)

# List all versions
for m in ml_client.models.list(name="churn-predictor"):
    print(f"  v{m.version}: {m.tags}")

# Get a specific version
model_v3 = ml_client.models.get("churn-predictor", version="3")</code></pre>` },
    { type: 'text', body: `<h3>Managed Online Endpoints</h3>
<p>A Managed Online Endpoint is a fully managed HTTPS endpoint for real-time inference. Azure ML handles the container, load balancing, auto-scaling, health checks, TLS, and monitoring. You deploy a model version as a deployment — multiple deployments can share one endpoint (blue/green or A/B testing via traffic splitting).</p>
<pre><code>from azure.ai.ml.entities import (ManagedOnlineEndpoint, ManagedOnlineDeployment,
                                    CodeConfiguration)

# Create the endpoint (just the URL, no compute yet)
endpoint = ManagedOnlineEndpoint(
    name="churn-endpoint",
    description="Real-time churn prediction",
    auth_mode="key"  # or "aml_token"
)
ml_client.online_endpoints.begin_create_or_update(endpoint).result()

# Create a deployment (compute + model + scoring script)
deployment = ManagedOnlineDeployment(
    name="blue",
    endpoint_name="churn-endpoint",
    model=ml_client.models.get("churn-predictor", version="3"),
    instance_type="Standard_DS3_v2",
    instance_count=1,
    # For MLflow models, scoring script is auto-generated — no code needed
)
ml_client.online_deployments.begin_create_or_update(deployment).result()

# Route 100% traffic to this deployment
endpoint.traffic = {"blue": 100}
ml_client.online_endpoints.begin_create_or_update(endpoint).result()

# Invoke the endpoint
import json
response = ml_client.online_endpoints.invoke(
    endpoint_name="churn-endpoint",
    request_file="./sample_request.json"
)
print("Prediction:", response)

# sample_request.json:
# {"input_data": {"columns": ["age","spend_30d","purchase_count_30d"],
#                  "data": [[34, 450.5, 12], [28, 89.0, 3]]}}

# Get scoring URI and key for external calls
ep = ml_client.online_endpoints.get("churn-endpoint")
keys = ml_client.online_endpoints.get_keys("churn-endpoint")
print("URI:", ep.scoring_uri)
print("Key:", keys.primary_key[:20] + "...")</code></pre>` },
    { type: 'tip', body: `Use <strong>traffic splitting</strong> for safe model rollouts. Deploy the new model as a "green" deployment alongside the existing "blue": <code>endpoint.traffic = {"blue": 90, "green": 10}</code>. Monitor green's latency and accuracy metrics for 24 hours. If healthy, shift to 50/50, then 100% green. Delete blue. This gradual rollout prevents a bad model from affecting all users — and the rollback is a one-line traffic update, not a redeployment.` },
    { type: 'exercise', title: 'Register a model and deploy it to a Managed Online Endpoint', hint: 'Train a model with mlflow autolog, register it in the Model Registry, create a Managed Online Endpoint, create a blue deployment, invoke with test data', solution: `from azure.ai.ml import MLClient, command
from azure.ai.ml.entities import (Model, ManagedOnlineEndpoint,
    ManagedOnlineDeployment)
from azure.ai.ml.constants import AssetTypes
from azure.identity import DefaultAzureCredential

ml_client = MLClient(DefaultAzureCredential(), "SUB_ID", "dsa-ml-rg", "dsa-ml-workspace")

# 1. Train and auto-log model (src/train.py with mlflow.sklearn.autolog())
job = ml_client.jobs.get("JOB_NAME_FROM_PREV_EXERCISE")

# 2. Register the MLflow model from the job
model = Model(
    name="churn-rf-demo",
    version="1",
    path=f"azureml://jobs/{job.name}/outputs/artifacts/paths/model/",
    type=AssetTypes.MLFLOW_MODEL,
    description="Random Forest churn model"
)
registered = ml_client.models.create_or_update(model)
print("Model registered:", registered.id)

# 3. Create endpoint
endpoint = ManagedOnlineEndpoint(name="churn-demo-endpoint", auth_mode="key")
ml_client.online_endpoints.begin_create_or_update(endpoint).result()

# 4. Deploy
deployment = ManagedOnlineDeployment(
    name="blue",
    endpoint_name="churn-demo-endpoint",
    model=registered.id,
    instance_type="Standard_DS2_v2",
    instance_count=1
)
ml_client.online_deployments.begin_create_or_update(deployment).result()

# 5. Set traffic and test
endpoint.traffic = {"blue": 100}
ml_client.online_endpoints.begin_create_or_update(endpoint).result()

import json
result = ml_client.online_endpoints.invoke(
    "churn-demo-endpoint",
    request_file=None,
    request_body='{"input_data":{"columns":["f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12","f13","f14"],"data":[[0.5,1.2,-0.3,0.8,0.1,0.4,-0.9,1.1,0.2,0.6,0.3,-0.5,0.7,0.9,0.1]]}}'
)
print("Prediction:", result)` }
  ]
};

L['azure-w4-l5'] = {
  title: 'Azure ML Pipelines — Reproducible ML Workflows',
  sections: [
    { type: 'text', body: `<h2>Azure ML Pipelines</h2>
<p>An Azure ML Pipeline is a reusable, parameterised workflow of ML steps defined as code. Each step is a <strong>component</strong> — a self-contained, versioned unit with a defined interface (inputs, outputs, parameters). Steps are wired together into a DAG; Azure ML executes them in topological order, parallelising independent steps automatically and caching completed steps on reruns.</p>
<h3>Defining a Component</h3>
<pre><code>from azure.ai.ml import MLClient, Output, Input
from azure.ai.ml.entities import CommandComponent
from azure.ai.ml.constants import AssetTypes
from azure.ai.ml import command
from azure.identity import DefaultAzureCredential

ml_client = MLClient(DefaultAzureCredential(), "SUB_ID", "dsa-ml-rg", "dsa-ml-workspace")

# Method 1: @command_component decorator (SDK v2)
from azure.ai.ml import command_component

@command_component(
    name="prep_data",
    version="1",
    display_name="Prepare Training Data",
    description="Cleans raw data and splits into train/val",
    environment="dsa-ml-env:2",
    outputs={"train_data": Output(type=AssetTypes.URI_FOLDER),
             "val_data": Output(type=AssetTypes.URI_FOLDER)}
)
def prep_data_component(
    raw_data: Input(type=AssetTypes.URI_FOLDER),
    test_size: float = 0.2,
    train_data: Output(type=AssetTypes.URI_FOLDER) = None,
    val_data: Output(type=AssetTypes.URI_FOLDER) = None
):
    import pandas as pd
    from sklearn.model_selection import train_test_split
    import os

    df = pd.read_parquet(raw_data)
    train, val = train_test_split(df, test_size=test_size, random_state=42)
    os.makedirs(train_data, exist_ok=True)
    os.makedirs(val_data, exist_ok=True)
    train.to_parquet(os.path.join(train_data, "train.parquet"), index=False)
    val.to_parquet(os.path.join(val_data, "val.parquet"), index=False)

ml_client.components.create_or_update(prep_data_component)</code></pre>` },
    { type: 'text', body: `<h3>Building and Running a Pipeline</h3>
<pre><code>from azure.ai.ml.dsl import pipeline
from azure.ai.ml import Input
from azure.ai.ml.constants import AssetTypes

# Load components
prep = ml_client.components.get("prep_data", version="1")
train_comp = ml_client.components.get("train_model", version="1")
eval_comp = ml_client.components.get("evaluate_model", version="1")
register_comp = ml_client.components.get("register_model", version="1")

@pipeline(
    name="churn_ml_pipeline",
    description="End-to-end churn prediction pipeline",
    compute="cpu-cluster"
)
def churn_pipeline(
    raw_data: Input(type=AssetTypes.URI_FOLDER),
    n_estimators: int = 200,
    max_depth: int = 5,
    auc_threshold: float = 0.85
):
    # Step 1: Prepare data
    prep_step = prep(raw_data=raw_data, test_size=0.2)

    # Step 2: Train model
    train_step = train_comp(
        train_data=prep_step.outputs.train_data,
        n_estimators=n_estimators,
        max_depth=max_depth
    )

    # Step 3: Evaluate
    eval_step = eval_comp(
        model=train_step.outputs.model,
        val_data=prep_step.outputs.val_data
    )

    # Step 4: Register if AUC meets threshold
    register_step = register_comp(
        model=train_step.outputs.model,
        metrics=eval_step.outputs.metrics,
        auc_threshold=auc_threshold
    )

    return {"registered_model": register_step.outputs.registered_model}

# Build and submit
pipeline_job = churn_pipeline(
    raw_data=Input(path="azureml:churn-training-data:1", type=AssetTypes.URI_FOLDER),
    n_estimators=300,
    max_depth=6
)
returned = ml_client.jobs.create_or_update(pipeline_job, experiment_name="churn-pipeline")
print("Pipeline URL:", returned.studio_url)
ml_client.jobs.stream(returned.name)</code></pre>` },
    { type: 'tip', body: `Enable <strong>step caching</strong> on expensive pipeline steps. When a step's inputs (data + parameters + code) haven't changed since the last run, Azure ML skips re-running it and reuses the cached output. This makes iterative pipeline development fast — fix the evaluation step and rerun: prep and training are skipped instantly, only evaluation reruns. Set <code>component.is_deterministic = True</code> to opt in.` },
    { type: 'exercise', title: 'Build a two-step Azure ML Pipeline (prep + train) and run it', hint: 'Define prep_data and train_model components, wire them together in a @pipeline function, submit with custom parameters, monitor the DAG in Studio', solution: `from azure.ai.ml.dsl import pipeline
from azure.ai.ml import MLClient, Input, Output, command
from azure.ai.ml.constants import AssetTypes
from azure.identity import DefaultAzureCredential

ml_client = MLClient(DefaultAzureCredential(), "SUB_ID", "dsa-ml-rg", "dsa-ml-workspace")

# Inline components using command()
prep_component = command(
    name="prep_churn_data",
    display_name="Prep Churn Data",
    code="./src",
    command="python prep.py --raw \${{inputs.raw_data}} --train \${{outputs.train}} --val \${{outputs.val}}",
    inputs={"raw_data": Input(type=AssetTypes.URI_FOLDER)},
    outputs={"train": Output(type=AssetTypes.URI_FOLDER), "val": Output(type=AssetTypes.URI_FOLDER)},
    environment="AzureML-sklearn-1.0-ubuntu20.04-py38-cpu:1",
    compute="cpu-cluster"
)

train_component = command(
    name="train_churn_model",
    display_name="Train Churn GBM",
    code="./src",
    command="python train.py --train \${{inputs.train_data}} --depth \${{inputs.depth}}",
    inputs={"train_data": Input(type=AssetTypes.URI_FOLDER), "depth": 5},
    outputs={"model": Output(type=AssetTypes.URI_FOLDER)},
    environment="AzureML-sklearn-1.0-ubuntu20.04-py38-cpu:1",
    compute="cpu-cluster"
)

@pipeline(compute="cpu-cluster", experiment_name="churn-pipeline-demo")
def churn_pipeline(raw_data, depth=5):
    prep = prep_component(raw_data=raw_data)
    train = train_component(train_data=prep.outputs.train, depth=depth)
    return {"model": train.outputs.model}

pj = churn_pipeline(
    raw_data=Input(path="azureml:churn-training-data:1", type=AssetTypes.URI_FOLDER),
    depth=6
)
returned = ml_client.jobs.create_or_update(pj)
print("Pipeline:", returned.studio_url)` }
  ]
};

/* ─── MODULE 5 — AI Services & Cognitive APIs ───────────────────────────── */

L['azure-w5-l1'] = {
  title: 'Azure AI Services — The Cognitive Services Portfolio',
  sections: [
    { type: 'text', body: `<h2>Azure AI Services Overview</h2>
<p>Azure AI Services (formerly Azure Cognitive Services) is a family of pre-built AI capabilities accessible via REST APIs and client SDKs — no ML expertise required. They cover vision, speech, language, and decision domains, enabling data scientists to add AI features to applications without training custom models.</p>
<h3>Service Categories</h3>
<table>
  <tr><th>Category</th><th>Services</th><th>Use Cases</th></tr>
  <tr><td>Vision</td><td>Computer Vision, Custom Vision, Face API, Video Indexer</td><td>Image classification, OCR, face detection, video transcription</td></tr>
  <tr><td>Speech</td><td>Speech-to-Text, Text-to-Speech, Speech Translation, Speaker Recognition</td><td>Call centre transcription, voice assistants, subtitles</td></tr>
  <tr><td>Language</td><td>Text Analytics, Translator, Language Understanding (LUIS), Question Answering</td><td>Sentiment analysis, NER, translation, chatbots</td></tr>
  <tr><td>Decision</td><td>Anomaly Detector, Content Moderator, Personalizer</td><td>Time-series anomaly detection, content filtering, RL recommendations</td></tr>
  <tr><td>Document</td><td>Document Intelligence (Form Recognizer)</td><td>Invoice parsing, ID extraction, contract analysis</td></tr>
  <tr><td>OpenAI</td><td>Azure OpenAI Service</td><td>GPT-4, embeddings, DALL-E, Whisper</td></tr>
</table>` },
    { type: 'text', body: `<h3>Text Analytics — Sentiment, NER & Key Phrases</h3>
<pre><code>from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

endpoint = "https://dsa-language.cognitiveservices.azure.com/"
key = "YOUR_KEY"  # or use DefaultAzureCredential
client = TextAnalyticsClient(endpoint, AzureKeyCredential(key))

documents = [
    "The product quality is excellent but the delivery was delayed by two weeks.",
    "Customer service resolved my issue immediately. Very impressed!",
    "Invoice number 12345 is due on January 31st 2024 for $450.00."
]

# Sentiment analysis
sentiments = client.analyze_sentiment(documents, show_opinion_mining=True)
for doc in sentiments:
    print(f"Sentiment: {doc.sentiment} (pos:{doc.confidence_scores.positive:.2f} neg:{doc.confidence_scores.negative:.2f})")
    for opinion in doc.sentences[0].mined_opinions:
        print(f"  Target: {opinion.target.text} → {opinion.target.sentiment}")

# Key phrase extraction
keyphrases = client.extract_key_phrases(documents)
for doc in keyphrases:
    print("Key phrases:", doc.key_phrases)

# Named Entity Recognition
entities = client.recognize_entities(documents)
for doc in entities:
    for entity in doc.entities:
        print(f"  {entity.text} ({entity.category}/{entity.subcategory}) confidence={entity.confidence_score:.2f}")</code></pre>
<h3>Computer Vision — Image Analysis</h3>
<pre><code>from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
from azure.core.credentials import AzureKeyCredential

client = ImageAnalysisClient(
    endpoint="https://dsa-vision.cognitiveservices.azure.com/",
    credential=AzureKeyCredential("YOUR_KEY")
)

# Analyse an image URL
result = client.analyze_from_url(
    image_url="https://example.com/product_photo.jpg",
    visual_features=[VisualFeatures.CAPTION, VisualFeatures.TAGS,
                     VisualFeatures.OBJECTS, VisualFeatures.READ]
)
print("Caption:", result.caption.text, f"(confidence {result.caption.confidence:.2f})")
print("Tags:", [(t.name, t.confidence) for t in result.tags.list[:5]])
print("Detected objects:", [(o.tags[0].name, o.bounding_box) for o in result.objects.list])</code></pre>` },
    { type: 'tip', body: `Use the <strong>multi-service Cognitive Services resource</strong> (kind: CognitiveServices) instead of creating separate resources per service. One endpoint, one key, one resource group — covers Text Analytics, Vision, Speech, Translation, and more. Simplifies key management and reduces Azure resource sprawl. Only create service-specific resources when you need regional isolation or separate billing by service type.` },
    { type: 'exercise', title: 'Analyse customer review sentiment and extract entities with Text Analytics', hint: 'Create an Azure AI Language resource, install azure-ai-textanalytics, run sentiment analysis and NER on 5 sample reviews, print results', solution: `# 1. Create resource
# az cognitiveservices account create \
#   --name dsa-language --resource-group dsa-ml-rg \
#   --kind TextAnalytics --sku S --location centralindia

# 2. Get endpoint and key
# az cognitiveservices account show --name dsa-language --resource-group dsa-ml-rg --query properties.endpoint
# az cognitiveservices account keys list --name dsa-language --resource-group dsa-ml-rg --query key1

# 3. Python analysis
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
import pandas as pd

client = TextAnalyticsClient("https://dsa-language.cognitiveservices.azure.com/",
                              AzureKeyCredential("YOUR_KEY"))

reviews = [
    "Excellent product quality. Delivered on time to Mumbai.",
    "Terrible customer service. Waited 3 weeks with no update.",
    "Good value for money. Would recommend to colleagues.",
    "The new model released January 2024 is much better than v1.",
    "Order #AB123 was cancelled without notice. Very disappointed."
]

sentiments = client.analyze_sentiment(reviews, show_opinion_mining=True)
entities_list = client.recognize_entities(reviews)

results = []
for i, (sent, ents) in enumerate(zip(sentiments, entities_list)):
    results.append({
        "review": reviews[i][:50],
        "sentiment": sent.sentiment,
        "pos": round(sent.confidence_scores.positive, 2),
        "neg": round(sent.confidence_scores.negative, 2),
        "entities": [(e.text, e.category) for e in ents.entities]
    })

df = pd.DataFrame(results)
print(df[["review","sentiment","pos","neg"]])
for r in results:
    print(f"\n{r['review'][:40]}...")
    print(f"  Entities: {r['entities']}")` }
  ]
};

L['azure-w5-l2'] = {
  title: 'Azure OpenAI Service — GPT, Embeddings & DALL-E on Azure',
  sections: [
    { type: 'text', body: `<h2>Azure OpenAI Service</h2>
<p>Azure OpenAI Service deploys OpenAI's models within Microsoft's Azure infrastructure — the same GPT-4, GPT-4o, text-embedding-3, DALL-E 3, and Whisper models available from OpenAI, but with Azure's security, compliance, and data privacy guarantees. Your prompts and completions are not used for OpenAI model training, and data stays within your selected Azure region.</p>
<h3>Available Models</h3>
<ul>
  <li><strong>GPT-4o</strong> — multimodal (text + images), 128k context, fastest and cheapest GPT-4 class model. Use for most chat and completion tasks.</li>
  <li><strong>GPT-4 Turbo</strong> — 128k context, strongest reasoning. Use for complex analysis, code generation, and long document tasks.</li>
  <li><strong>text-embedding-3-large</strong> — 3072-dimension embeddings for semantic search, similarity, and RAG retrieval. Best quality; use text-embedding-3-small for cost-sensitivity.</li>
  <li><strong>DALL-E 3</strong> — text-to-image generation at 1024×1024, 1024×1792. Use for product images, marketing assets, data visualisation mockups.</li>
  <li><strong>Whisper</strong> — speech-to-text transcription. Use for meeting transcription, call centre audio processing.</li>
</ul>
<pre><code>from openai import AzureOpenAI

client = AzureOpenAI(
    azure_endpoint="https://dsa-openai.openai.azure.com/",
    api_key="YOUR_AZURE_OPENAI_KEY",
    api_version="2024-02-01"
)

# Chat completion
response = client.chat.completions.create(
    model="gpt-4o",               # your deployment name
    messages=[
        {"role": "system", "content": "You are a data science expert."},
        {"role": "user", "content": "Explain gradient boosting in 3 sentences."}
    ],
    temperature=0.3,
    max_tokens=200
)
print(response.choices[0].message.content)</code></pre>` },
    { type: 'text', body: `<h3>Embeddings for Semantic Search & RAG</h3>
<pre><code>import numpy as np
from openai import AzureOpenAI

client = AzureOpenAI(azure_endpoint="https://dsa-openai.openai.azure.com/",
                     api_key="KEY", api_version="2024-02-01")

def embed(texts: list[str]) -> np.ndarray:
    response = client.embeddings.create(model="text-embedding-3-small", input=texts)
    return np.array([e.embedding for e in response.data])

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Knowledge base
docs = [
    "Azure ML Compute Clusters scale from 0 to N nodes and bill only for active jobs.",
    "Delta Lake provides ACID transactions on Parquet files in Azure Data Lake Storage.",
    "SAS tokens grant time-limited delegated access to Azure Blob Storage resources.",
    "Azure Databricks uses Apache Spark for distributed data processing and ML training.",
]
doc_embeddings = embed(docs)

# Query
query = "How do I reduce costs for ML training jobs?"
q_emb = embed([query])[0]

scores = [cosine_similarity(q_emb, d) for d in doc_embeddings]
best_idx = np.argmax(scores)
print(f"Most relevant: {docs[best_idx]}")
print(f"Similarity: {scores[best_idx]:.4f}")

# RAG — pass retrieved context to GPT
context = "\n".join([docs[i] for i in np.argsort(scores)[-2:][::-1]])
answer = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": f"Answer using only this context:\n{context}"},
        {"role": "user", "content": query}
    ]
)
print("Answer:", answer.choices[0].message.content)</code></pre>` },
    { type: 'tip', body: `Always use <strong>DefaultAzureCredential with Azure OpenAI</strong> in production — not API keys. Configure the Azure OpenAI resource to use Entra ID authentication, assign the "Cognitive Services OpenAI User" role to your managed identity, and use <code>AzureOpenAI(azure_ad_token_provider=get_bearer_token_provider(DefaultAzureCredential(), "https://cognitiveservices.azure.com/.default"))</code>. API keys are rotation-prone and create a security risk in shared environments.` },
    { type: 'exercise', title: 'Build a RAG chatbot that answers questions from a custom knowledge base', hint: 'Embed 10 DSA FAQ documents, store embeddings in memory, retrieve top-2 by cosine similarity for each query, pass to GPT-4o, print the grounded answer', solution: `from openai import AzureOpenAI
import numpy as np

client = AzureOpenAI(azure_endpoint="https://dsa-openai.openai.azure.com/",
                     api_key="YOUR_KEY", api_version="2024-02-01")

# Knowledge base: DSA course FAQs
knowledge_base = [
    "Data Science Academia offers 18 courses covering Python, SQL, ML, DL, NLP, CV, and cloud platforms.",
    "Each course has 6 modules with 5 text lessons and 1 quiz per module, totalling 36 lessons.",
    "Students can track progress, earn certificates, and access lessons via the student portal.",
    "The Python course covers 47 lessons including pandas, NumPy, Matplotlib, and scikit-learn.",
    "Azure for Data Science covers Azure ML, Databricks, Synapse, ADF, and AI Services.",
    "Certificates are auto-generated upon completing all modules with a passing quiz score.",
    "Admins can seed course content using the seed tools in the admin panel.",
    "The platform is built with Supabase (Postgres), Vanilla JS frontend, and Flutter mobile app.",
    "Feature Engineering course covers missing values, encoding, scaling, and feature selection.",
    "Deep Learning course covers neural networks, CNNs, RNNs, transformers, and deployment."
]

# Embed knowledge base
kb_response = client.embeddings.create(model="text-embedding-3-small", input=knowledge_base)
kb_embeddings = np.array([e.embedding for e in kb_response.data])

def answer(question: str) -> str:
    # Embed query
    q_emb = np.array(client.embeddings.create(
        model="text-embedding-3-small", input=[question]).data[0].embedding)
    # Find top-2 similar docs
    sims = [np.dot(q_emb, d) / (np.linalg.norm(q_emb) * np.linalg.norm(d)) for d in kb_embeddings]
    top_indices = np.argsort(sims)[-2:][::-1]
    context = "\n".join([knowledge_base[i] for i in top_indices])
    # Generate answer
    resp = client.chat.completions.create(model="gpt-4o", messages=[
        {"role": "system", "content": f"Answer using only this context. Be concise.\n\nContext:\n{context}"},
        {"role": "user", "content": question}
    ], temperature=0)
    return resp.choices[0].message.content

print(answer("How many courses does the platform have?"))
print(answer("What does the Azure course cover?"))
print(answer("How do certificates work?"))` }
  ]
};

L['azure-w5-l3'] = {
  title: 'Azure AI Search — Vector, Semantic & Hybrid Search',
  sections: [
    { type: 'text', body: `<h2>What is Azure AI Search?</h2>
<p>Azure AI Search (formerly Cognitive Search) is a fully managed enterprise search service that supports keyword search, semantic ranking, and vector similarity search — including hybrid combinations of all three. It is the retrieval layer in production RAG (Retrieval-Augmented Generation) architectures on Azure, and scales to billions of documents without infrastructure management.</p>
<h3>Search Types</h3>
<ul>
  <li><strong>Keyword Search (BM25)</strong> — classic inverted index. Fast and precise for exact term matching. Best for structured queries with known terms.</li>
  <li><strong>Semantic Ranking</strong> — re-ranks BM25 results using a Microsoft-hosted cross-encoder language model. Understands intent and synonyms. Adds ~100ms but dramatically improves relevance for natural language queries.</li>
  <li><strong>Vector Search (HNSW)</strong> — approximate nearest neighbour search over embedding vectors. Finds semantically similar documents even with no keyword overlap. You store pre-computed embeddings in the index.</li>
  <li><strong>Hybrid Search</strong> — combines BM25 + vector search with Reciprocal Rank Fusion (RRF). Best of both worlds: precision of keyword + semantic breadth of vectors. The recommended approach for production RAG.</li>
</ul>` },
    { type: 'text', body: `<h3>Building an AI Search Index with Vector Fields</h3>
<pre><code>from azure.search.documents.indexes import SearchIndexClient
from azure.search.documents.indexes.models import (
    SearchIndex, SearchField, SearchFieldDataType,
    SimpleField, SearchableField, VectorSearch,
    HnswAlgorithmConfiguration, VectorSearchProfile
)
from azure.search.documents import SearchClient
from azure.core.credentials import AzureKeyCredential
from openai import AzureOpenAI
import json

SEARCH_ENDPOINT = "https://dsa-search.search.windows.net"
SEARCH_KEY = "YOUR_SEARCH_ADMIN_KEY"

# Create index with vector field
index_client = SearchIndexClient(SEARCH_ENDPOINT, AzureKeyCredential(SEARCH_KEY))

index = SearchIndex(
    name="course-content",
    fields=[
        SimpleField(name="id", type=SearchFieldDataType.String, key=True),
        SearchableField(name="title", type=SearchFieldDataType.String),
        SearchableField(name="content", type=SearchFieldDataType.String),
        SimpleField(name="course", type=SearchFieldDataType.String, filterable=True),
        SearchField(
            name="content_vector",
            type=SearchFieldDataType.Collection(SearchFieldDataType.Single),
            searchable=True,
            vector_search_dimensions=1536,
            vector_search_profile_name="hnsw-profile"
        )
    ],
    vector_search=VectorSearch(
        algorithms=[HnswAlgorithmConfiguration(name="hnsw", parameters={"m": 4, "efConstruction": 400})],
        profiles=[VectorSearchProfile(name="hnsw-profile", algorithm_configuration_name="hnsw")]
    )
)
index_client.create_or_update_index(index)
print("Index created")</code></pre>
<pre><code># Index documents with embeddings
oai = AzureOpenAI(azure_endpoint="https://dsa-openai.openai.azure.com/",
                  api_key="OAI_KEY", api_version="2024-02-01")

documents = [
    {"id": "1", "course": "Azure", "title": "Compute Clusters",
     "content": "Azure ML Compute Clusters scale from 0 to N nodes automatically."},
    {"id": "2", "course": "Azure", "title": "Delta Lake",
     "content": "Delta Lake provides ACID transactions on Parquet files in ADLS Gen2."},
]

# Embed content and add to documents
texts = [d["content"] for d in documents]
embeddings = oai.embeddings.create(model="text-embedding-3-small", input=texts)
for doc, emb in zip(documents, embeddings.data):
    doc["content_vector"] = emb.embedding

search_client = SearchClient(SEARCH_ENDPOINT, "course-content", AzureKeyCredential(SEARCH_KEY))
search_client.upload_documents(documents)

# Hybrid search
q_emb = oai.embeddings.create(model="text-embedding-3-small", input=["cost saving for training"]).data[0].embedding
from azure.search.documents.models import VectorizedQuery
results = search_client.search(
    search_text="cost saving for training",     # keyword component
    vector_queries=[VectorizedQuery(vector=q_emb, k_nearest_neighbors=3, fields="content_vector")],
    query_type="semantic",
    semantic_configuration_name="default",
    top=3
)
for r in results:
    print(f"{r['title']}: {r['content'][:80]}")</code></pre>` },
    { type: 'tip', body: `Configure <strong>Integrated Vectorisation</strong> in Azure AI Search (preview) to auto-embed documents and queries using Azure OpenAI without writing embedding code. The index automatically calls your Azure OpenAI embedding deployment when documents are indexed and when search queries arrive — turning AI Search into a zero-code vector store for RAG. Pair with ADF or Logic Apps to auto-index new content from Blob Storage.` },
    { type: 'exercise', title: 'Build a hybrid search index and query it with vector + keyword search', hint: 'Create an AI Search service, define an index with a vector field, embed and upload 10 documents, query with hybrid search and print ranked results', solution: `from azure.search.documents.indexes import SearchIndexClient
from azure.search.documents.indexes.models import *
from azure.search.documents import SearchClient
from azure.search.documents.models import VectorizedQuery
from azure.core.credentials import AzureKeyCredential
from openai import AzureOpenAI

SEARCH_EP = "https://dsa-search.search.windows.net"
SEARCH_KEY = "ADMIN_KEY"
OAI_EP = "https://dsa-openai.openai.azure.com/"
OAI_KEY = "OAI_KEY"

oai = AzureOpenAI(azure_endpoint=OAI_EP, api_key=OAI_KEY, api_version="2024-02-01")
idx_client = SearchIndexClient(SEARCH_EP, AzureKeyCredential(SEARCH_KEY))

# Create index
idx_client.create_or_update_index(SearchIndex(
    name="dsa-kb",
    fields=[
        SimpleField("id", SearchFieldDataType.String, key=True),
        SearchableField("text", SearchFieldDataType.String),
        SearchField("vec", SearchFieldDataType.Collection(SearchFieldDataType.Single),
                   searchable=True, vector_search_dimensions=1536,
                   vector_search_profile_name="p")
    ],
    vector_search=VectorSearch(
        algorithms=[HnswAlgorithmConfiguration("hnsw")],
        profiles=[VectorSearchProfile("p", "hnsw")]
    )
))

# Embed and upload documents
docs = [
    "Azure ML Compute Clusters scale to zero when idle, reducing cost.",
    "Delta Lake adds ACID transactions to Parquet files on ADLS Gen2.",
    "Azure OpenAI provides GPT-4 with enterprise security and data residency.",
    "Managed Online Endpoints handle TLS, load balancing, and auto-scaling.",
    "SAS tokens provide time-limited access to Blob Storage without sharing keys.",
]
embs = oai.embeddings.create(model="text-embedding-3-small", input=docs).data
records = [{"id": str(i), "text": t, "vec": e.embedding} for i, (t, e) in enumerate(zip(docs, embs))]
SearchClient(SEARCH_EP, "dsa-kb", AzureKeyCredential(SEARCH_KEY)).upload_documents(records)

# Hybrid search
q = "how to cut Azure ML training expenses"
q_vec = oai.embeddings.create(model="text-embedding-3-small", input=[q]).data[0].embedding
results = SearchClient(SEARCH_EP, "dsa-kb", AzureKeyCredential(SEARCH_KEY)).search(
    search_text=q,
    vector_queries=[VectorizedQuery(vector=q_vec, k_nearest_neighbors=3, fields="vec")],
    top=3
)
for r in results:
    print(f"Score {r['@search.score']:.3f}: {r['text']}")` }
  ]
};

L['azure-w5-l4'] = {
  title: 'Azure AI Document Intelligence & Applied AI Services',
  sections: [
    { type: 'text', body: `<h2>Azure AI Document Intelligence</h2>
<p>Azure AI Document Intelligence (formerly Form Recognizer) extracts structured data from documents — invoices, receipts, contracts, identity cards, tax forms, medical records — using pre-built and custom-trained models. It returns field-level key-value pairs, tables, bounding boxes, and confidence scores, enabling document automation without building a custom OCR pipeline.</p>
<h3>Pre-Built Models</h3>
<ul>
  <li><strong>Invoice</strong> — extracts: vendor name, invoice number, invoice date, due date, line items (description, quantity, unit price, amount), subtotal, tax, total.</li>
  <li><strong>Receipt</strong> — extracts: merchant name, date, items, quantities, prices, total, tip.</li>
  <li><strong>ID Document</strong> — extracts: first name, last name, date of birth, document number, expiry, country from passports and driving licences.</li>
  <li><strong>Business Card</strong> — extracts: name, title, company, email, phone, address.</li>
  <li><strong>General Document</strong> — extracts key-value pairs and tables from any document without a pre-defined template.</li>
  <li><strong>Layout</strong> — extracts text, tables, selection marks, and the document structure with bounding box coordinates.</li>
</ul>
<pre><code>from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential

client = DocumentAnalysisClient(
    endpoint="https://dsa-docint.cognitiveservices.azure.com/",
    credential=AzureKeyCredential("YOUR_KEY")
)

# Analyse an invoice
with open("invoice.pdf", "rb") as f:
    poller = client.begin_analyze_document("prebuilt-invoice", f)
result = poller.result()

for invoice in result.documents:
    fields = invoice.fields
    print(f"Vendor: {fields.get('VendorName', {}).value}")
    print(f"Invoice #: {fields.get('InvoiceId', {}).value}")
    print(f"Total: {fields.get('InvoiceTotal', {}).value}")
    for item in fields.get('Items', {}).value or []:
        desc = item.value.get('Description', {}).value
        amount = item.value.get('Amount', {}).value
        print(f"  Line item: {desc} — {amount}")</code></pre>` },
    { type: 'text', body: `<h3>Custom Document Models</h3>
<p>When pre-built models don't match your document type (custom insurance forms, proprietary purchase orders, internal report templates), train a custom extraction model with 5–500 labelled examples.</p>
<pre><code># Train a custom model (via Studio at documentintelligence.ai.azure.com)
# 1. Upload 5+ labelled documents to Blob Storage
# 2. Open Document Intelligence Studio → Custom extraction model → Create project
# 3. Label fields by drawing bounding boxes and assigning field names
# 4. Train → model ID returned

# Use the custom model in Python
custom_model_id = "YOUR_TRAINED_MODEL_ID"
with open("custom_form.pdf", "rb") as f:
    poller = client.begin_analyze_document(custom_model_id, f)
result = poller.result()
for doc in result.documents:
    for name, field in doc.fields.items():
        print(f"{name}: {field.value} (confidence {field.confidence:.2f})")</code></pre>
<h3>Other Applied AI Services</h3>
<ul>
  <li><strong>Azure Video Indexer</strong> — transcribes audio, detects speakers, identifies faces, extracts topics, OCR text in video, and detects brands and emotions. Upload an MP4 and get a structured JSON of everything that happened.</li>
  <li><strong>Azure Anomaly Detector</strong> — univariate and multivariate time-series anomaly detection. Upload your metrics series; the API returns which points are anomalies, their severity, and whether it is a spike, dip, or trend change.</li>
  <li><strong>Azure Content Safety</strong> — classify text and images for hate speech, violence, sexual content, and self-harm. Used to moderate LLM outputs and user-generated content before display.</li>
</ul>
<pre><code># Anomaly Detector — find anomalies in a time series
from azure.ai.anomalydetector import AnomalyDetectorClient
from azure.ai.anomalydetector.models import TimeSeriesPoint, DetectRequest
from azure.core.credentials import AzureKeyCredential
import datetime

client = AnomalyDetectorClient("https://dsa-anomaly.cognitiveservices.azure.com/",
                                AzureKeyCredential("KEY"))
series = [TimeSeriesPoint(timestamp=datetime.datetime(2024,1,i), value=v)
          for i, v in enumerate([10,11,10,12,11,10,9,11,50,10,11], start=1)]  # 50 is anomaly

request = DetectRequest(series=series, granularity="daily")
response = client.detect_univariate_entire_series(request)
for i, (is_anom, sev) in enumerate(zip(response.is_anomaly, response.severity)):
    if is_anom:
        print(f"Anomaly at point {i}: value={series[i].value}, severity={sev:.2f}")</code></pre>` },
    { type: 'tip', body: `Use <strong>Azure AI Document Intelligence Studio</strong> (documentintelligence.ai.azure.com) to test pre-built models on your actual documents before writing any code. Upload a PDF or image, select the model (invoice, receipt, layout), and see the extracted fields instantly with confidence scores highlighted. This tells you in 60 seconds whether the pre-built model covers your use case or whether you need a custom model — saving days of development time.` },
    { type: 'exercise', title: 'Extract invoice data with Document Intelligence and load into a DataFrame', hint: 'Create a Document Intelligence resource, use begin_analyze_document with prebuilt-invoice on a sample PDF, extract line items into a pandas DataFrame', solution: `from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential
import pandas as pd, requests, io

client = DocumentAnalysisClient(
    "https://dsa-docint.cognitiveservices.azure.com/",
    AzureKeyCredential("YOUR_KEY")
)

# Use a public sample invoice PDF
invoice_url = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-invoice.pdf"
resp = requests.get(invoice_url)

poller = client.begin_analyze_document("prebuilt-invoice", io.BytesIO(resp.content))
result = poller.result()

rows = []
for invoice in result.documents:
    f = invoice.fields
    vendor = f.get("VendorName", {}).value
    inv_id = f.get("InvoiceId", {}).value
    total = f.get("InvoiceTotal", {}).value
    items = f.get("Items", {})
    if items and items.value:
        for item in items.value:
            iv = item.value
            rows.append({
                "vendor": vendor,
                "invoice_id": inv_id,
                "invoice_total": total,
                "description": iv.get("Description", {}).value,
                "quantity": iv.get("Quantity", {}).value,
                "unit_price": iv.get("UnitPrice", {}).value,
                "amount": iv.get("Amount", {}).value,
            })

df = pd.DataFrame(rows)
print(df)
print(f"\nTotal items: {len(df)}")
print(f"Invoice total: {df['invoice_total'].iloc[0]}")` }
  ]
};

L['azure-w5-l5'] = {
  title: 'Responsible AI — Principles, Tools & Governance on Azure',
  sections: [
    { type: 'text', body: `<h2>Microsoft Responsible AI Framework</h2>
<p>Microsoft's Responsible AI standard defines six core principles for developing and deploying AI systems. These are not just guidelines — they are operationalised in Azure ML and Azure AI services as concrete tools data scientists and MLOps teams can use at every stage of the ML lifecycle.</p>
<h3>The Six Principles</h3>
<ul>
  <li><strong>Fairness</strong> — AI systems should treat all people fairly, avoiding disparate impact across demographic groups (gender, age, ethnicity). In practice: measure and report group-level accuracy, false positive rate, and recall for each subgroup.</li>
  <li><strong>Reliability &amp; Safety</strong> — AI systems should perform reliably and safely in expected and unexpected conditions, degrading gracefully under distributional shift rather than producing confidently wrong predictions.</li>
  <li><strong>Privacy &amp; Security</strong> — AI systems should protect individual data privacy. Techniques: differential privacy, federated learning, data minimisation, and access controls on training data.</li>
  <li><strong>Inclusiveness</strong> — AI should empower everyone, including people with disabilities. Models should perform equally well across language varieties, accessibility needs, and cultural contexts.</li>
  <li><strong>Transparency</strong> — people should understand what AI systems can and cannot do, and how decisions are made. Implemented via model explanations (SHAP, feature importance) and model cards.</li>
  <li><strong>Accountability</strong> — humans remain accountable for AI systems. Requires human oversight, audit trails, approval workflows, and incident response plans.</li>
</ul>` },
    { type: 'text', body: `<h3>Responsible AI Dashboard in Azure ML</h3>
<p>The Responsible AI Dashboard in Azure ML Studio consolidates fairness, explainability, error analysis, and data exploration into a single interface for any registered model.</p>
<pre><code>from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from raiutils.cohort import Cohort, CohortFilterMethods
import responsibleai

ml_client = MLClient(DefaultAzureCredential(), "SUB_ID", "dsa-ml-rg", "dsa-ml-workspace")

# Create a Responsible AI pipeline (adds RAI components to a training pipeline)
from azure.ai.ml.entities import (
    ResponsibleAIInsights, ResponsibleAITextInsights
)

# In Studio: Models → select model → Responsible AI → Create RAI Dashboard
# Generates: feature importance (SHAP), error analysis heatmap,
#            data explorer, counterfactuals, causal analysis

# Fairlearn — measure bias across groups
from fairlearn.metrics import MetricFrame, selection_rate, false_positive_rate
from sklearn.metrics import accuracy_score

metric_frame = MetricFrame(
    metrics={"accuracy": accuracy_score,
             "FPR": false_positive_rate,
             "selection_rate": selection_rate},
    y_true=y_test,
    y_pred=y_pred,
    sensitive_features=test_df["age_group"]  # "18-30", "31-50", "50+"
)
print("By group:")
print(metric_frame.by_group)
print("\nDisparity in accuracy:", metric_frame.difference(method="between_groups")["accuracy"])</code></pre>
<h3>InterpretML — Model Explanations</h3>
<pre><code>from interpret.ext.blackbox import TabularExplainer
from interpret import show

# Global explanations — feature importance across all predictions
explainer = TabularExplainer(model, X_train, features=feature_names)
global_exp = explainer.explain_global(X_test)
print("Global feature importance:")
for name, importance in sorted(zip(feature_names, global_exp.get_feature_importance_dict().values()),
                                key=lambda x: -x[1])[:5]:
    print(f"  {name}: {importance:.4f}")

# Local explanations — why did the model predict this for customer C001?
local_exp = explainer.explain_local(X_test[:1])
print("\nLocal explanation for row 0:")
show(local_exp)</code></pre>` },
    { type: 'tip', body: `Generate a <strong>Model Card</strong> for every model you deploy to production — a structured document capturing: intended use, training data characteristics, evaluation metrics by demographic group, known limitations, and responsible AI assessment. Azure ML now supports automated model card generation from the Responsible AI Dashboard. Model cards create accountability (who approved it, under what conditions) and are increasingly required by regulators and enterprise risk teams.` },
    { type: 'exercise', title: 'Measure model fairness across demographic groups with Fairlearn', hint: 'Train a classifier on a dataset with a sensitive attribute (age_group or gender), use Fairlearn MetricFrame to compute accuracy and FPR per group, identify the fairness gap', solution: `from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from fairlearn.metrics import MetricFrame, false_positive_rate, selection_rate
from sklearn.metrics import accuracy_score
import pandas as pd, numpy as np

np.random.seed(42)
n = 1000
df = pd.DataFrame({
    "age": np.random.randint(18, 70, n),
    "spend": np.random.exponential(300, n),
    "visits": np.random.poisson(5, n),
    "tenure": np.random.randint(1, 120, n),
})
df["age_group"] = pd.cut(df["age"], bins=[17,30,50,70], labels=["18-30","31-50","50+"])
# Introduce artificial bias: older customers have higher true churn
churn_prob = 0.1 + 0.3*(df["age_group"]=="50+") + 0.15*(df["spend"]<100)
df["churned"] = (np.random.random(n) < churn_prob).astype(int)

X = df[["age","spend","visits","tenure"]]
y = df["churned"]
groups = df["age_group"]

X_tr, X_te, y_tr, y_te, g_tr, g_te = train_test_split(X, y, groups, test_size=0.3, random_state=42)

model = GradientBoostingClassifier(n_estimators=100, random_state=42)
model.fit(X_tr, y_tr)
y_pred = model.predict(X_te)

# Fairness analysis
mf = MetricFrame(
    metrics={"accuracy": accuracy_score, "FPR": false_positive_rate, "selection_rate": selection_rate},
    y_true=y_te, y_pred=y_pred, sensitive_features=g_te
)
print("Overall:")
print(mf.overall)
print("\nBy age group:")
print(mf.by_group)
print("\nMax accuracy disparity:", mf.difference()["accuracy"])
print("Max FPR disparity:", mf.difference()["FPR"])
# High disparity → consider reweighting or Fairlearn's reductions (ExponentiatedGradient)` }
  ]
};

/* ─── MODULE 6 — MLOps, Monitoring & Capstone ───────────────────────────── */

L['azure-w6-l1'] = {
  title: 'Azure DevOps & GitHub Actions for ML CI/CD',
  sections: [
    { type: 'text', body: `<h2>MLOps CI/CD on Azure</h2>
<p>MLOps extends DevOps practices to the ML lifecycle — version-controlling data and code, automating training and evaluation, and deploying models through a governed pipeline. Azure supports MLOps via two complementary tools: <strong>Azure DevOps</strong> (enterprise pipelines, boards, repos) and <strong>GitHub Actions</strong> (lightweight, code-first, widely adopted in the open-source community).</p>
<h3>MLOps Maturity Levels</h3>
<ul>
  <li><strong>Level 0</strong> — manual: notebooks on a laptop, models deployed by hand. No reproducibility, no auditability.</li>
  <li><strong>Level 1</strong> — ML pipeline automation: training is a scheduled Azure ML Pipeline; model is registered automatically after training completes. Deployment is still manual.</li>
  <li><strong>Level 2</strong> — CI/CD for ML: every code commit triggers a pipeline (lint → test → train → evaluate → conditional deploy). Human approval gate before production. Full audit trail.</li>
</ul>
<h3>GitHub Actions MLOps Workflow</h3>
<pre><code># .github/workflows/ml-pipeline.yml
name: ML CI/CD Pipeline

on:
  push:
    branches: [main]
    paths: ['src/**', 'pipelines/**', 'requirements.txt']
  schedule:
    - cron: '0 1 * * *'   # nightly retraining at 1 AM UTC

env:
  RESOURCE_GROUP: dsa-ml-rg
  WORKSPACE: dsa-ml-workspace

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: {python-version: '3.11'}
      - run: pip install -r requirements.txt
      - run: python -m pytest tests/ -v --tb=short   # unit tests
      - run: flake8 src/ --max-line-length=100        # linting

  train-and-deploy:
    needs: ci
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Azure Login
        uses: azure/login@v2
        with:
          creds: \${{ secrets.AZURE_CREDENTIALS }}     # service principal JSON
      - name: Install Azure ML SDK
        run: pip install azure-ai-ml azure-identity
      - name: Submit Training Pipeline
        run: python pipelines/submit_pipeline.py
        env:
          SUBSCRIPTION_ID: \${{ secrets.AZURE_SUBSCRIPTION_ID }}
      - name: Register Best Model
        run: python pipelines/register_best_model.py
      - name: Deploy to Staging
        run: python pipelines/deploy_endpoint.py --env staging
      - name: Run Integration Tests on Staging
        run: python tests/integration_test.py --env staging
      - name: Deploy to Production (with approval)
        uses: trstringer/manual-approval@v1
        with:
          approvers: ml-leads-team
      - run: python pipelines/deploy_endpoint.py --env production</code></pre>` },
    { type: 'text', body: `<h3>Pipeline Submission Script</h3>
<pre><code># pipelines/submit_pipeline.py
import os
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential

ml_client = MLClient(
    DefaultAzureCredential(),
    os.environ["SUBSCRIPTION_ID"],
    os.environ.get("RESOURCE_GROUP", "dsa-ml-rg"),
    os.environ.get("WORKSPACE", "dsa-ml-workspace")
)

# Load and submit the pipeline
from azure.ai.ml import load_job
pipeline_job = load_job("pipelines/churn_pipeline.yml")
pipeline_job.settings.default_compute = "cpu-cluster"
returned = ml_client.jobs.create_or_update(pipeline_job, experiment_name="ci-cd-run")
ml_client.jobs.stream(returned.name)  # wait for completion

# Check if job succeeded
status = ml_client.jobs.get(returned.name).status
if status != "Completed":
    raise SystemExit(f"Pipeline failed with status: {status}")
print(f"Pipeline completed: {returned.name}")</code></pre>
<h3>Azure DevOps Pipelines (YAML)</h3>
<pre><code># azure-pipelines.yml
trigger:
  branches:
    include: [main]
  paths:
    include: ['src/*', 'pipelines/*']

pool:
  vmImage: ubuntu-latest

stages:
- stage: CI
  jobs:
  - job: TestAndLint
    steps:
    - task: UsePythonVersion@0
      inputs: {versionSpec: '3.11'}
    - script: pip install -r requirements.txt && pytest tests/ && flake8 src/
      displayName: 'Run tests and lint'

- stage: Train
  dependsOn: CI
  jobs:
  - job: SubmitPipeline
    steps:
    - task: AzureCLI@2
      inputs:
        azureSubscription: 'dsa-azure-service-connection'
        scriptType: bash
        scriptLocation: inlineScript
        inlineScript: python pipelines/submit_pipeline.py</code></pre>` },
    { type: 'tip', body: `Store all Azure ML Pipeline definitions as <strong>YAML component files</strong> in your git repo (<code>components/prep_data.yml</code>, <code>components/train_model.yml</code>, <code>pipelines/churn_pipeline.yml</code>). The <code>az ml job create --file pipelines/churn_pipeline.yml</code> CLI command submits the pipeline directly from YAML. This means the pipeline definition is code-reviewed in pull requests — a data scientist can't change training logic without a teammate's approval.` },
    { type: 'exercise', title: 'Set up a GitHub Actions workflow that submits an Azure ML training job on push', hint: 'Create AZURE_CREDENTIALS secret from az ad sp create-for-rbac, write a .github/workflows/train.yml that logs in to Azure and runs submit_pipeline.py, push a commit to trigger it', solution: `# 1. Create service principal
az ad sp create-for-rbac \
  --name "dsa-mlops-sp" \
  --role Contributor \
  --scopes /subscriptions/SUB_ID/resourceGroups/dsa-ml-rg \
  --sdk-auth > azure_credentials.json
# Copy JSON → GitHub repo → Settings → Secrets → AZURE_CREDENTIALS

# 2. .github/workflows/train.yml
cat > .github/workflows/train.yml << 'EOF'
name: Train Model on Push
on:
  push:
    branches: [main]
    paths: ['src/**']
jobs:
  train:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: {python-version: '3.11'}
      - name: Login to Azure
        uses: azure/login@v2
        with:
          creds: \${{ secrets.AZURE_CREDENTIALS }}
      - name: Install deps
        run: pip install azure-ai-ml azure-identity scikit-learn pandas
      - name: Submit training job
        run: python pipelines/submit_pipeline.py
        env:
          SUBSCRIPTION_ID: \${{ secrets.AZURE_SUBSCRIPTION_ID }}
EOF

# 3. pipelines/submit_pipeline.py (simplified)
import os
from azure.ai.ml import MLClient, command
from azure.identity import DefaultAzureCredential

ml = MLClient(DefaultAzureCredential(), os.environ["SUBSCRIPTION_ID"], "dsa-ml-rg", "dsa-ml-workspace")
job = command(code="./src", command="python train.py",
              environment="AzureML-sklearn-1.0-ubuntu20.04-py38-cpu:1",
              compute="cpu-cluster", experiment_name="ci-triggered")
returned = ml.jobs.create_or_update(job)
ml.jobs.stream(returned.name)

# 4. git add .github/ pipelines/ && git push → workflow triggers` }
  ]
};

L['azure-w6-l2'] = {
  title: 'Azure Monitor, Application Insights & ML Logging',
  sections: [
    { type: 'text', body: `<h2>Azure Monitor for ML Workloads</h2>
<p>Azure Monitor is the unified observability platform for Azure — collecting metrics, logs, and traces from all Azure resources including Azure ML training jobs, endpoints, Databricks clusters, and ADF pipelines. Data flows into a <strong>Log Analytics Workspace</strong> where you query it with KQL (Kusto Query Language).</p>
<h3>What Azure Monitor Collects from Azure ML</h3>
<ul>
  <li><strong>Endpoint metrics</strong> — ModelLatency (ms), Invocations (count), InvocationErrors, RequestsPerMinute. Automatically emitted to Azure Monitor Metrics with no configuration.</li>
  <li><strong>Training job logs</strong> — stdout/stderr from training jobs, stored in the workspace's Log Analytics workspace. View in Studio or query via KQL.</li>
  <li><strong>Resource metrics</strong> — CPU/GPU utilisation, memory, disk I/O for Compute Instances and Compute Clusters during training.</li>
  <li><strong>Quota usage</strong> — VM family quota consumption per region. Critical for avoiding "quota exceeded" failures in automated pipelines.</li>
</ul>
<pre><code># Set up diagnostic settings to send AML metrics to Log Analytics
az monitor diagnostic-settings create \
  --name "aml-to-loganalytics" \
  --resource /subscriptions/SUB_ID/resourceGroups/dsa-ml-rg/providers/Microsoft.MachineLearningServices/workspaces/dsa-ml-workspace \
  --workspace /subscriptions/SUB_ID/resourceGroups/dsa-ml-rg/providers/microsoft.operationalinsights/workspaces/dsa-log-analytics \
  --metrics '[{"category":"AllMetrics","enabled":true}]' \
  --logs '[{"category":"AmlComputeClusterEvent","enabled":true},
           {"category":"AmlRunStatusChangedEvent","enabled":true}]'</code></pre>` },
    { type: 'text', body: `<h3>Querying Logs with KQL</h3>
<pre><code>// In Log Analytics → Logs tab → KQL queries

// Training job failures in the last 7 days
AmlRunStatusChangedEvent
| where TimeGenerated > ago(7d)
| where RunStatus == "Failed"
| project TimeGenerated, RunId, ExperimentName, ErrorCode, ErrorMessage
| order by TimeGenerated desc

// Endpoint latency P99 over the last 24 hours
AzureMetrics
| where TimeGenerated > ago(24h)
| where ResourceProvider == "MICROSOFT.MACHINELEARNINGSERVICES"
| where MetricName == "ModelLatency"
| summarize P99=percentile(Total,99), P50=percentile(Total,50) by bin(TimeGenerated, 5m)
| render timechart

// Compute cluster utilisation
AmlComputeClusterNodeEvent
| where TimeGenerated > ago(24h)
| summarize avg(GPUUtilizationPercentage), avg(CPUUtilizationPercentage) by bin(TimeGenerated, 10m)
| render timechart</code></pre>
<h3>Application Insights for Endpoint Monitoring</h3>
<p>Azure ML endpoints automatically connect to Application Insights for request/response logging and custom telemetry from the scoring script.</p>
<pre><code># In your scoring script (score.py) — log custom telemetry
import logging
from applicationinsights import TelemetryClient

logger = logging.getLogger(__name__)
tc = TelemetryClient(instrumentation_key="YOUR_KEY")

def run(data):
    import json, time
    start = time.time()
    features = json.loads(data)["input_data"]
    prediction = model.predict(features)
    duration_ms = (time.time() - start) * 1000

    # Log custom metric — tracked in App Insights
    tc.track_metric("inference_duration_ms", duration_ms)
    tc.track_event("ChurnPrediction", {
        "model_version": "v3",
        "prediction": str(prediction[0]),
        "features_count": str(len(features))
    })
    tc.flush()

    logger.info(f"Predicted {prediction[0]} in {duration_ms:.1f}ms")
    return {"prediction": prediction.tolist(), "duration_ms": duration_ms}</code></pre>
<h3>Alert Rules</h3>
<pre><code># Create a metric alert: endpoint errors > 5 in 5 minutes
az monitor metrics alert create \
  --name "endpoint-error-spike" \
  --resource-group dsa-ml-rg \
  --scopes /subscriptions/SUB_ID/resourceGroups/dsa-ml-rg/providers/Microsoft.MachineLearningServices/workspaces/dsa-ml-workspace/onlineEndpoints/churn-endpoint \
  --condition "count InvocationErrors > 5" \
  --window-size 5m \
  --evaluation-frequency 1m \
  --action-groups /subscriptions/SUB_ID/resourceGroups/dsa-ml-rg/providers/microsoft.insights/actionGroups/ml-alerts \
  --description "Fires when endpoint errors exceed 5 in a 5-minute window"</code></pre>` },
    { type: 'tip', body: `Build a <strong>Workbook</strong> in Azure Monitor (Monitor → Workbooks → New) as a single-pane-of-glass ML operations dashboard: endpoint latency and error rate charts, training job status table, compute utilisation heatmap, and cost breakdown by resource group. Share the Workbook URL with the team lead — it updates in real time and requires no BI tool licence. Azure Monitor Workbooks are free.` },
    { type: 'exercise', title: 'Create an alert rule for endpoint latency and query training logs with KQL', hint: 'Set a metric alert on ModelLatency p99 > 500ms targeting an SNS action group; write a KQL query in Log Analytics to find failed jobs in the last 7 days', solution: `# 1. Create action group (email notification)
az monitor action-group create \
  --name "ml-ops-alerts" \
  --resource-group dsa-ml-rg \
  --short-name "mlopss" \
  --email-receiver name=lead email=you@email.com

# 2. Create latency alert
az monitor metrics alert create \
  --name "high-endpoint-latency" \
  --resource-group dsa-ml-rg \
  --scopes "/subscriptions/SUB_ID/resourceGroups/dsa-ml-rg/providers/Microsoft.MachineLearningServices/workspaces/dsa-ml-workspace/onlineEndpoints/churn-demo-endpoint" \
  --condition "avg ModelLatency > 500" \
  --window-size 5m \
  --evaluation-frequency 1m \
  --severity 2 \
  --action-groups "/subscriptions/SUB_ID/resourceGroups/dsa-ml-rg/providers/microsoft.insights/actionGroups/ml-ops-alerts"

# 3. KQL queries (run in Log Analytics → Logs):
# Recent failed training jobs:
# AmlRunStatusChangedEvent
# | where TimeGenerated > ago(7d) and RunStatus == "Failed"
# | project TimeGenerated, ExperimentName, RunId, ErrorCode
# | order by TimeGenerated desc
# | take 20

# 4. Python — query Log Analytics via API
from azure.monitor.query import LogsQueryClient
from azure.identity import DefaultAzureCredential
import datetime

client = LogsQueryClient(DefaultAzureCredential())
workspace_id = "YOUR_LOG_ANALYTICS_WORKSPACE_ID"
query = """
AmlRunStatusChangedEvent
| where TimeGenerated > ago(7d)
| where RunStatus in ("Failed", "Completed")
| summarize count() by RunStatus, ExperimentName
"""
resp = client.query_workspace(workspace_id, query, timespan=datetime.timedelta(days=7))
for row in resp.tables[0].rows:
    print(row)` }
  ]
};

L['azure-w6-l3'] = {
  title: 'Microsoft Purview — Data Governance & Cataloguing',
  sections: [
    { type: 'text', body: `<h2>What is Microsoft Purview?</h2>
<p>Microsoft Purview is a unified data governance service that helps organisations discover, understand, and manage their data assets across on-premises, multi-cloud, and SaaS environments. For data science teams, Purview provides three critical capabilities: a searchable data catalogue, automated data lineage tracking, and sensitivity classification for PII and confidential data.</p>
<h3>Why Governance Matters for ML</h3>
<ul>
  <li><strong>Reproducibility</strong> — know exactly which version of a dataset trained each model. Purview tracks lineage from raw source → ETL transformations → training dataset → model.</li>
  <li><strong>PII compliance</strong> — automatically classify columns containing names, emails, phone numbers, Aadhaar, PAN numbers as sensitive. Prevent PII from entering training data without explicit approval.</li>
  <li><strong>Data discovery</strong> — data scientists search the Purview catalogue (not SharePoint, not Confluence) to find existing datasets, understand their schema and quality, and avoid recreating features already built by another team.</li>
  <li><strong>Regulatory compliance</strong> — GDPR, PDPA, and sector-specific regulations require demonstrating that you know where PII lives, who accessed it, and how it was used in model training.</li>
</ul>` },
    { type: 'text', body: `<h3>Purview Core Capabilities</h3>
<ul>
  <li><strong>Data Map</strong> — automated scanning of registered sources (ADLS Gen2, Azure SQL, Synapse, Power BI, Cosmos DB, on-premises SQL Server, AWS S3, Snowflake). Discovers tables, columns, data types, and samples. Scheduled or on-demand scans.</li>
  <li><strong>Data Catalogue</strong> — searchable inventory of all discovered assets. Each asset has: technical metadata (columns, types, row count), business metadata (owners, descriptions, domain), classification labels, and lineage visualisation. Editable by data stewards.</li>
  <li><strong>Data Lineage</strong> — visual graph showing data movement. An Azure ML training job that reads from Synapse and writes a model is automatically captured as a lineage edge: Synapse table → AML training run → registered model → endpoint. No manual documentation needed.</li>
  <li><strong>Classifications</strong> — 200+ built-in classifiers for: credit card numbers, email addresses, passport numbers, government IDs (India: Aadhaar, PAN), SWIFT codes, and custom regex patterns.</li>
  <li><strong>Sensitivity Labels</strong> — apply Microsoft Information Protection labels (Confidential, Internal, Public) to data assets. Integrates with Azure Policy to enforce access controls based on sensitivity level.</li>
</ul>
<pre><code>from azure.purview.scanning import PurviewScanningClient
from azure.purview.catalog import PurviewCatalogClient
from azure.identity import DefaultAzureCredential

PURVIEW_ENDPOINT = "https://dsa-purview.purview.azure.com"
credential = DefaultAzureCredential()

# Catalog client — search and browse assets
catalog_client = PurviewCatalogClient(endpoint=PURVIEW_ENDPOINT, credential=credential)

# Search for datasets containing "customer"
results = catalog_client.discovery.search_advanced(
    search={"keywords": "customer churn features", "limit": 10}
)
for entity in results.get("value", []):
    print(f"{entity['qualifiedName']}: {entity.get('classification', [])}")</code></pre>` },
    { type: 'tip', body: `Register your <strong>Azure ML Workspace as a source in Purview</strong> to automatically capture ML lineage. When a training job completes, Purview shows: which data assets were consumed → which experiment run processed them → which model version was produced → which endpoint serves it. This lineage is the "data provenance" regulators and auditors ask for — and it's generated automatically, not maintained manually.` },
    { type: 'exercise', title: 'Register an ADLS Gen2 source in Purview and scan for PII classifications', hint: 'Create a Purview account, register your ADLS Gen2 storage as a source, run a scan with PII classification rules, view discovered tables and their sensitivity labels in the Data Catalogue', solution: `# 1. Create Purview account
az purview account create \
  --account-name dsa-purview \
  --resource-group dsa-ml-rg \
  --location centralindia

# 2. Register ADLS Gen2 source (via Purview Studio: purview.microsoft.com)
# Management → Sources → New → Azure Data Lake Storage Gen2
# Name: dsa-adls-source
# Azure subscription: your sub
# Storage account name: dsacoursestorage
# Select collection: root

# 3. Create a scan
# Sources → dsa-adls-source → New scan
# Name: weekly-pii-scan
# Credential: Managed Identity (grant Storage Blob Data Reader to Purview MSI)
# Scan rule set: AzureDataLakeStorage (includes PII classification rules)
# Schedule: Weekly Sunday 2 AM

# 4. Run scan now → Monitor → Scans → view progress

# 5. After scan: Data Catalog → Search "customer" → open a table asset
# View: schema, classifications (CreditCardNumber, Email, etc.), lineage

# 6. Python — search the catalogue
from azure.purview.catalog import PurviewCatalogClient
from azure.identity import DefaultAzureCredential

client = PurviewCatalogClient("https://dsa-purview.purview.azure.com", DefaultAzureCredential())

# Search for assets classified as email
results = client.discovery.search_advanced({
    "keywords": "*",
    "filter": {"classification": "MICROSOFT.PERSONAL.EMAIL"},
    "limit": 20
})
for asset in results.get("value", []):
    print(f"PII found in: {asset.get('qualifiedName', 'unknown')}")
    print(f"  Type: {asset.get('entityType')}, Owner: {asset.get('owner')}")` }
  ]
};

L['azure-w6-l4'] = {
  title: 'Azure Cost Management & FinOps for ML Workloads',
  sections: [
    { type: 'text', body: `<h2>Understanding Azure ML Costs</h2>
<p>Azure ML costs come from multiple sources — compute, storage, endpoints, and companion resources. Without active management, ML workloads can generate unexpected bills. Understanding the cost model is as important as understanding the technical model.</p>
<h3>Cost Sources in Azure ML</h3>
<table>
  <tr><th>Resource</th><th>Billing Unit</th><th>Key Cost Driver</th></tr>
  <tr><td>Compute Instance</td><td>$/hour (always-on)</td><td>Running while idle, forgotten VMs</td></tr>
  <tr><td>Compute Cluster</td><td>$/node-hour (only while running)</td><td>min_instances &gt; 0, Dedicated vs Spot</td></tr>
  <tr><td>Managed Online Endpoint</td><td>$/hour per instance</td><td>Over-provisioned instance count</td></tr>
  <tr><td>Blob Storage</td><td>$/GB/month + transactions</td><td>Storing all data in Hot tier; old artefacts</td></tr>
  <tr><td>Application Insights</td><td>$/GB ingested</td><td>Verbose logging, high-frequency endpoints</td></tr>
  <tr><td>Container Registry</td><td>$/GB stored + pull operations</td><td>Many large Docker images retained</td></tr>
</table>
<h3>Key Cost Optimisation Actions</h3>
<ul>
  <li><strong>min_instances=0 on all Compute Clusters</strong> — the single highest-impact action. A cluster at min=1 bills 24/7 even with no jobs.</li>
  <li><strong>Use LowPriority (Spot) VMs for training</strong> — up to 80% cheaper. Azure ML handles checkpointing and restart automatically for AML Pipelines.</li>
  <li><strong>Schedule Compute Instance auto-shutdown</strong> — configure daily shutdown at 6 PM to prevent overnight billing (forgot-to-stop-the-VM tax).</li>
  <li><strong>Right-size endpoints</strong> — start with Standard_DS2_v2 (2 vCPU, 7 GB). Only scale up if latency or CPU is consistently high. Use Serverless Inference for low-traffic endpoints (scale to zero).</li>
  <li><strong>Blob lifecycle policies</strong> — transition model artefacts and old training data to Cool/Cold/Archive tiers automatically.</li>
  <li><strong>Tag all resources</strong> — tag by <code>project</code>, <code>team</code>, and <code>environment</code>. Filter Cost Analysis by tag to understand which models and teams drive cost.</li>
</ul>` },
    { type: 'text', body: `<h3>Azure Cost Management</h3>
<pre><code># View current month spending by resource type
az consumption usage list \
  --billing-period-name 202405 \
  --query "[].{Service:consumedService, Cost:pretaxCost, Currency:currency}" \
  --output table | sort -k2 -rn | head -20

# Python — query costs by tag
from azure.mgmt.costmanagement import CostManagementClient
from azure.mgmt.costmanagement.models import QueryDefinition, TimeframeType, QueryDataset, QueryAggregation, QueryGrouping
from azure.identity import DefaultAzureCredential

cost_client = CostManagementClient(DefaultAzureCredential())
scope = f"/subscriptions/SUB_ID/resourceGroups/dsa-ml-rg"

result = cost_client.query.usage(scope, QueryDefinition(
    type="ActualCost",
    timeframe=TimeframeType.MONTH_TO_DATE,
    dataset=QueryDataset(
        granularity="Daily",
        aggregation={"totalCost": QueryAggregation(name="Cost", function="Sum")},
        grouping=[QueryGrouping(type="Dimension", name="ServiceName"),
                  QueryGrouping(type="TagKey", name="project")]
    )
))
for row in result.rows:
    print(f"Date: {row[1]}, Service: {row[2]}, Project: {row[3]}, Cost: \${row[0]:.2f}")</code></pre>
<h3>Budgets and Alerts</h3>
<pre><code># Create a budget with 80% alert
az consumption budget create \
  --budget-name "ml-monthly-budget" \
  --amount 500 \
  --category Cost \
  --time-grain Monthly \
  --resource-group dsa-ml-rg \
  --notifications '{"Actual_GreaterThan_80Percent":{"enabled":true,"operator":"GreaterThan","threshold":80,"contactEmails":["you@email.com"],"thresholdType":"Actual"}}'</code></pre>` },
    { type: 'tip', body: `Set up a <strong>monthly Azure Budget with 50% and 80% alerts</strong> from day one, before any substantial workloads run. It is far easier to catch cost overruns early (GPU cluster left at min_instances=2) than to explain a surprise bill to finance at month end. Combine the budget alert with an Azure Automation runbook that automatically scales Compute Clusters to min_instances=0 when the 80% threshold fires — self-healing cost governance.` },
    { type: 'exercise', title: 'Audit compute costs and set min_instances=0 on all compute clusters', hint: 'List all compute clusters via SDK, check min_instances, update any with min>0 to min=0, then set a monthly budget alert at 80% of $200', solution: `from azure.ai.ml import MLClient
from azure.ai.ml.entities import AmlCompute
from azure.identity import DefaultAzureCredential

ml_client = MLClient(DefaultAzureCredential(), "SUB_ID", "dsa-ml-rg", "dsa-ml-workspace")

print("Compute Cluster Audit:")
print(f"{'Name':30} {'Size':25} {'Min':5} {'Max':5} {'State':15} {'Issue'}")
print("-"*100)

for compute in ml_client.compute.list():
    if compute.type == "amlcompute":
        min_n = compute.min_instances
        max_n = compute.max_instances
        issue = "⚠️ IDLE BILLING" if min_n > 0 else "✓"
        print(f"{compute.name:30} {compute.size:25} {min_n:5} {max_n:5} {compute.provisioning_state:15} {issue}")

        # Fix: set min_instances to 0
        if min_n > 0:
            print(f"  → Fixing {compute.name}: setting min_instances=0")
            updated = AmlCompute(
                name=compute.name,
                min_instances=0,
                max_instances=max_n
            )
            ml_client.compute.begin_create_or_update(updated).result()
            print(f"  ✓ Fixed {compute.name}")

print("\nAll clusters now scale to zero when idle.")

# Set budget alert
import subprocess
subprocess.run([
    "az", "consumption", "budget", "create",
    "--budget-name", "ml-dev-budget",
    "--amount", "200",
    "--category", "Cost",
    "--time-grain", "Monthly",
    "--resource-group", "dsa-ml-rg",
    "--notifications",
    '{"Actual_80":{"enabled":true,"operator":"GreaterThan","threshold":80,"contactEmails":["you@email.com"],"thresholdType":"Actual"}}'
])` }
  ]
};

L['azure-w6-l5'] = {
  title: 'Capstone — End-to-End ML Pipeline on Azure',
  sections: [
    { type: 'text', body: `<h2>Capstone: Customer Churn Prediction on Azure</h2>
<p>This capstone integrates every service from the course into a production-grade ML system: data ingestion through ADF, feature engineering in Databricks, ML training and deployment via Azure ML, real-time inference through a Managed Online Endpoint, monitoring with Azure Monitor, and governance via Purview.</p>
<h3>Architecture</h3>
<pre>
[Sources]           [Ingest]        [Process]         [ML]              [Serve]
    │                   │               │                │                  │
CRM Database  ──→  Azure Data  ──→  Azure         ──→  Azure ML  ──→  Managed Online
(Azure SQL)        Factory         Databricks           Pipelines        Endpoint
                       │           (PySpark +          (Train →              │
Clickstream  ──→  Event Hubs  ──→  Delta Lake)         Register →        Real-time
(browser)          → ASA                               Deploy)          predictions
                       │               │                │                  │
                  ADLS Gen2 ──────────────────→  Azure ML              Application
                  (raw/processed/             Model Registry            Insights
                   curated zones)                    │                  (logging)
                       │                       Microsoft                    │
                   Purview        ←────────────── Purview  ────────→  Azure Monitor
                  (catalogue +                 (lineage, PII)          (alerts)
                   governance)
</pre>` },
    { type: 'text', body: `<h3>Phase 1: Data Ingestion (ADF)</h3>
<pre><code># ADF Pipeline: "IngestDaily"
# Trigger: Schedule — daily at 00:30 UTC

# Activity 1: Copy CRM data from Azure SQL → ADLS raw zone
# Source: Azure SQL → customers table (WHERE updated_date = @trigger_date)
# Sink: ADLS → raw/crm/date=@{formatDateTime(trigger().scheduledTime,'yyyy-MM-dd')}/

# Activity 2: Batch import Event Hubs → ADLS via Firehose-like Capture
# Event Hubs Capture → automatically writes Avro to ADLS hourly
# ADF copies Avro from capture → raw/clickstream/date=@{trigger_date}/

# Activity 3: Trigger Databricks notebook
# Databricks Notebook Activity → feature_engineering notebook
# Parameters: {"run_date": "@{trigger_date}"}</code></pre>
<h3>Phase 2: Feature Engineering (Databricks)</h3>
<pre><code># feature_engineering.py — runs as Databricks Job
import sys
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from delta.tables import DeltaTable

spark = SparkSession.builder.getOrCreate()
run_date = sys.argv[1] if len(sys.argv) > 1 else "2024-05-23"

# Read raw CRM data
crm = spark.read.parquet(f"abfss://raw@dsadatalake.dfs.core.windows.net/crm/date={run_date}/")
# Read 30-day clickstream window
clicks = spark.read.parquet("abfss://raw@dsadatalake.dfs.core.windows.net/clickstream/") \
    .filter(col("date").between(
        date_sub(lit(run_date), 30), lit(run_date)))

# Join and compute features
features = crm.join(
    clicks.groupBy("customer_id").agg(
        count("session_id").alias("sessions_30d"),
        sum("page_views").alias("page_views_30d"),
        countDistinct("date").alias("active_days_30d")
    ), "customer_id", "left"
).fillna(0, subset=["sessions_30d","page_views_30d","active_days_30d"]) \
 .withColumn("account_age_days", datediff(lit(run_date), col("join_date"))) \
 .withColumn("days_since_last_order", datediff(lit(run_date), col("last_order_date")))

# Write to Delta curated zone
features.write.format("delta").mode("overwrite") \
    .partitionBy("run_date") \
    .option("replaceWhere", f"run_date = '{run_date}'") \
    .save("abfss://curated@dsadatalake.dfs.core.windows.net/churn_features/")</code></pre>` },
    { type: 'text', body: `<h3>Phase 3: Training Pipeline (Azure ML)</h3>
<pre><code># Triggered by ADF Web Activity after Databricks completes
# OR by GitHub Actions on code push to main

# churn_pipeline.yml (Azure ML Pipeline as YAML)
# Steps: prep_data → train_model → evaluate → conditional_register → deploy

# The pipeline uses a ConditionStep:
# IF val_auc > 0.85:
#   → RegisterModel in Model Registry (status: PendingApproval)
#   → Send approval request email via Logic App
# ELSE:
#   → Send failure alert via Azure Monitor action group

# After team lead approves in Model Registry:
# GitHub Actions listens for approval event →
# Runs deploy_endpoint.py → updates "churn-prod" endpoint with new model version</code></pre>
<h3>Phase 4: Monitoring & Governance</h3>
<pre><code># After deployment:
# 1. Data drift monitoring: Azure ML data drift job (weekly)
#    Compare inference input distribution vs training data baseline
#    Alert via Azure Monitor when drift score > 0.1

# 2. Model quality: accuracy degrades as predictions vs ground truth (30-day lag)
#    Collect ground truth from CRM (did customer actually churn?)
#    Log accuracy weekly to Azure Monitor custom metric

# 3. Purview: all assets auto-catalogued
#    Lineage: SQL → ADF → Databricks → Delta → AML training → Model → Endpoint

# 4. Budget: $300/month alert at 80%
#    Compute Clusters: min_instances=0 (zero idle cost)
#    Endpoint: Standard_DS2_v2 × 2 instances (for HA)

# Full cost estimate:
# - Compute Cluster (training): ~$15/month (30 min daily on D4s_v3)
# - Managed Endpoint: ~$90/month (2× DS2_v2, 24/7)
# - ADLS Gen2: ~$5/month (100 GB processed data)
# - Azure ML workspace: free (pay only for compute)
# - Databricks: ~$50/month (2 node cluster, 30 min daily, Standard_D4s_v3, LowPriority)
# Total: ~$160/month</code></pre>` },
    { type: 'tip', body: `The most important operational habit: <strong>define a retraining trigger policy before deploying</strong>. Document: "retrain when weekly accuracy drops below 0.82, OR when data drift score exceeds 0.1, OR on the 1st of each month regardless." Without a written policy, retraining happens reactively after users complain — by which time the model has been underperforming for weeks. The trigger policy belongs in your model card and is enforced by the monitoring pipeline.` },
    { type: 'exercise', title: 'Assemble the full end-to-end pipeline and verify each phase', hint: 'Trace a record from ADF ingestion → Databricks features → AML training → endpoint prediction → Monitor alert. Verify lineage in Purview.', solution: `# Capstone verification checklist:

# Phase 1 — Data Layer
# [ ] ADF pipeline "IngestDaily" exists with Schedule trigger
# [ ] Azure SQL → ADLS raw/crm/ copy activity tested (run now)
# [ ] Event Hubs Capture writing Avro to ADLS raw/clickstream/
# [ ] Databricks Job "feature-engineering" runs successfully for test date
# [ ] Delta table at curated/churn_features/ has rows for test date

# Phase 2 — Model Training
# [ ] Azure ML compute cluster "cpu-cluster" exists (min=0, max=4, Spot)
# [ ] Custom environment "dsa-ml-env:2" registered
# [ ] Training pipeline with 4 steps defined and submitted
# [ ] Model registered in Model Registry after pipeline completes
# [ ] Responsible AI Dashboard generated for best model

# Phase 3 — Deployment
# [ ] Managed Online Endpoint "churn-prod" exists
# [ ] "blue" deployment serving 100% traffic
# [ ] Endpoint invocation test:
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
ml = MLClient(DefaultAzureCredential(), "SUB_ID", "dsa-ml-rg", "dsa-ml-workspace")
result = ml.online_endpoints.invoke("churn-prod",
    request_body='{"input_data":{"columns":["age","spend_30d","sessions_30d","active_days_30d","account_age_days","days_since_last_order"],"data":[[34,450.5,12,20,730,15]]}}')
print("Prediction:", result)

# Phase 4 — Monitoring
# [ ] Azure Monitor alert: InvocationErrors > 5 in 5 min → action group
# [ ] Budget alert: $200/month at 80% → email
# [ ] Purview scan completed on ADLS → assets visible in catalogue
# [ ] Lineage visible: SQL table → ADF pipeline → Delta table → AML run → Model

print("Capstone complete — Azure ML pipeline is live")` }
  ]
};

})();

