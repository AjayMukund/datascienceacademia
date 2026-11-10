(function(){
'use strict';
window.DSA_LESSON_CONTENT = window.DSA_LESSON_CONTENT || {};
const L = window.DSA_LESSON_CONTENT;

/* ─── MODULE 1 — AWS Foundations & Cloud Essentials ─────────────────────── */

L['aws-w1-l1'] = {
  title: 'The AWS Cloud — Regions, Availability Zones & Global Infrastructure',
  sections: [
    { type: 'text', body: `<h2>Why Cloud for Data Science?</h2>
<p>Cloud computing gives data scientists on-demand access to virtually unlimited compute, storage, and managed ML services — without buying hardware, managing data centres, or waiting weeks for procurement. AWS is the largest cloud provider with the broadest set of data and ML services.</p>
<h3>AWS Global Infrastructure</h3>
<ul>
  <li><strong>Regions</strong> — a geographic area (e.g. us-east-1 N. Virginia, ap-south-1 Mumbai, eu-west-1 Ireland) containing multiple isolated data centres. Each Region is completely independent — a failure in one does not affect others. Choose a Region close to your users for low latency, and aligned with your data residency requirements (GDPR, data sovereignty).</li>
  <li><strong>Availability Zones (AZs)</strong> — physically separate data centres within a Region, connected by low-latency private fibre. Each Region has at least 3 AZs. Deploying across multiple AZs provides fault tolerance — if one AZ loses power, your application keeps running in the others.</li>
  <li><strong>Edge Locations</strong> — 400+ points of presence worldwide used by CloudFront (CDN) and Route 53 (DNS). Not full Regions — they cache and serve content closer to end users.</li>
  <li><strong>Local Zones</strong> — AWS infrastructure placed in specific metropolitan areas (e.g. Los Angeles, Delhi) for ultra-low latency applications. A subset of Region services extended to a city.</li>
</ul>` },
    { type: 'text', body: `<h3>Core AWS Service Categories</h3>
<ul>
  <li><strong>Compute</strong>: EC2 (virtual machines), Lambda (serverless), ECS/EKS (containers), SageMaker (ML).</li>
  <li><strong>Storage</strong>: S3 (object), EBS (block, attached to EC2), EFS (managed NFS), Glacier (archival).</li>
  <li><strong>Database</strong>: RDS (relational), DynamoDB (NoSQL), Redshift (warehouse), ElastiCache (in-memory).</li>
  <li><strong>Networking</strong>: VPC (virtual private cloud), Route 53 (DNS), CloudFront (CDN), Direct Connect.</li>
  <li><strong>Analytics</strong>: Glue (ETL), Athena (serverless SQL), EMR (Spark/Hadoop), Kinesis (streaming), QuickSight (BI).</li>
  <li><strong>ML/AI</strong>: SageMaker (full ML lifecycle), Rekognition (vision), Comprehend (NLP), Translate, Forecast, Personalize.</li>
  <li><strong>Management</strong>: CloudWatch (monitoring), CloudTrail (audit log), CloudFormation (IaC), Config (compliance).</li>
</ul>
<h3>The AWS Management Console</h3>
<p>The web interface at console.aws.amazon.com. Log in with your root account or an IAM user. The console provides a GUI for every service. For data science work you will spend most time in: S3, SageMaker, Glue, Athena, EC2, and IAM.</p>` },
    { type: 'tip', body: `Always work in the <strong>AWS Free Tier</strong> when learning. The free tier gives 750 hours/month of t2.micro EC2, 5 GB of S3 storage, 25 GB of DynamoDB, and limited SageMaker Studio time — enough to complete all exercises in this course without charges. Set a <strong>billing alarm</strong> on day 1: CloudWatch → Alarms → Create Alarm → Billing → set $5 threshold. AWS will email you before you incur significant costs.` },
    { type: 'text', body: `<h3>AWS Pricing Model</h3>
<p>AWS uses a pay-as-you-go model — you pay only for what you use, with no upfront commitment for most services. Key pricing dimensions:</p>
<ul>
  <li><strong>Compute</strong>: per second or per hour (EC2), per invocation + duration (Lambda), per training job hour (SageMaker).</li>
  <li><strong>Storage</strong>: per GB-month (S3, EBS), per request (S3 PUT/GET).</li>
  <li><strong>Data transfer</strong>: inbound to AWS is free; outbound (AWS → internet) is charged per GB.</li>
  <li><strong>Managed services</strong>: per DPU-hour (Glue), per query per TB scanned (Athena), per shard-hour (Kinesis).</li>
</ul>
<p>Cost optimisation strategies: Spot Instances (up to 90% off EC2 for fault-tolerant workloads), Reserved Instances (1–3 year commitment, up to 72% off), Savings Plans (flexible commitment), and S3 Lifecycle policies (auto-tier cold data to Glacier).</p>` },
    { type: 'exercise', title: 'Set up your AWS account and billing alarm', hint: 'Create an IAM admin user, enable MFA on root, and set a $5 billing alarm in CloudWatch', solution: `1. Sign up at aws.amazon.com → verify email → add payment method.
2. Console → IAM → Users → Create user → "admin" → AdministratorAccess policy → create.
3. Log out of root → log in as the admin IAM user from now on (never use root for daily work).
4. Root account: enable MFA (IAM → My Security Credentials → MFA → Assign MFA device).
5. Console → CloudWatch → Alarms → Create Alarm → Select metric → Billing → Total Estimated Charge.
6. Conditions: Greater than $5 → next → Create new SNS topic → enter your email → Create alarm.
7. Confirm the SNS subscription email → alarm is now active.
8. Console → EC2 → check you are in your desired Region (top-right dropdown).` }
  ]
};

L['aws-w1-l2'] = {
  title: 'IAM — Users, Groups, Roles & Policies',
  sections: [
    { type: 'text', body: `<h2>AWS Identity and Access Management</h2>
<p>IAM is the security foundation of every AWS account. It controls <em>who</em> can do <em>what</em> on <em>which</em> AWS resources. IAM is global (not Region-specific) and free.</p>
<h3>Core IAM Concepts</h3>
<ul>
  <li><strong>Root user</strong> — the account owner, created when you sign up with an email address. Has unrestricted access to everything. Should be used only for initial account setup and billing. Enable MFA immediately, then never use root again.</li>
  <li><strong>IAM User</strong> — a persistent identity (person or application) with a username/password for console access and/or access keys for CLI/API access. Users have no permissions by default — permissions are granted via policies.</li>
  <li><strong>IAM Group</strong> — a collection of users. Attach policies to a group and all members inherit those permissions. E.g. a "DataScientists" group with S3 read, SageMaker, and Athena access.</li>
  <li><strong>IAM Role</strong> — an identity with no static credentials. Instead, any trusted entity (an EC2 instance, a Lambda function, another AWS account, a user assuming the role) can temporarily assume it and inherit its permissions for the session duration. The most secure way to grant AWS service access.</li>
  <li><strong>IAM Policy</strong> — a JSON document defining permissions: which Actions are allowed/denied on which Resources under which Conditions.</li>
</ul>` },
    { type: 'text', body: `<h3>IAM Policies</h3>
<p>A policy JSON has this structure:</p>
<pre><code>{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-data-bucket",
        "arn:aws:s3:::my-data-bucket/*"
      ]
    }
  ]
}</code></pre>
<ul>
  <li><strong>Effect</strong>: Allow or Deny. Explicit Deny always overrides Allow.</li>
  <li><strong>Action</strong>: the API operation (s3:GetObject, ec2:DescribeInstances, sagemaker:CreateTrainingJob, *).</li>
  <li><strong>Resource</strong>: the ARN (Amazon Resource Name) of the resource. Use * for all resources of that type.</li>
  <li><strong>Condition</strong>: optional — restrict by IP address, MFA, time of day, tag values, etc.</li>
</ul>
<p>Types of policies: <strong>AWS Managed</strong> (pre-built by AWS, e.g. AmazonS3ReadOnlyAccess), <strong>Customer Managed</strong> (you create and own), <strong>Inline</strong> (embedded directly in a user/role, avoid for reusability).</p>` },
    { type: 'tip', body: `Follow the <strong>principle of least privilege</strong>: grant only the permissions actually needed, nothing more. Start with AWS managed policies for common use cases (AmazonSageMakerFullAccess, AmazonS3ReadOnlyAccess), then refine to customer-managed policies as you understand exactly what your workloads need. Never use AdministratorAccess for production workloads or service roles.` },
    { type: 'text', body: `<h3>Service Roles</h3>
<p>When an AWS service (EC2, Lambda, SageMaker, Glue) needs to access other AWS services on your behalf, it uses an <strong>IAM Role with a trust policy</strong>. The trust policy defines which service can assume the role.</p>
<p>Example: SageMaker needs to read training data from S3 and write model artifacts back. You create a role with:</p>
<ul>
  <li><strong>Trust policy</strong>: <code>{ "Service": "sagemaker.amazonaws.com" }</code> — allows SageMaker to assume this role.</li>
  <li><strong>Permission policy</strong>: AmazonS3FullAccess (or a scoped custom policy) — what SageMaker can do once it assumes the role.</li>
</ul>
<p>You never handle credentials manually — SageMaker automatically assumes the role and gets temporary credentials via the AWS Security Token Service (STS). This is far more secure than embedding access keys in code.</p>
<h3>IAM Best Practices</h3>
<ul>
  <li>Enable MFA for all human users, especially root and admins.</li>
  <li>Rotate access keys every 90 days; prefer roles over access keys where possible.</li>
  <li>Use IAM Access Analyzer to identify unintended public or cross-account access.</li>
  <li>Tag all IAM users and roles with owner, team, and purpose for auditability.</li>
</ul>` },
    { type: 'exercise', title: 'Create a data science IAM user and role', hint: 'Create a DataScientist group with S3 and SageMaker policies, add a user to it, and create a SageMaker execution role', solution: `1. IAM → Groups → Create group → "DataScientists".
2. Attach policies: AmazonS3FullAccess, AmazonSageMakerFullAccess, AmazonAthenaFullAccess.
3. IAM → Users → Create user → "ds-student-1" → Programmatic + Console access.
4. Add to "DataScientists" group → create → download credentials CSV.
5. IAM → Roles → Create role → AWS Service → SageMaker.
6. Attach policies: AmazonSageMakerFullAccess, AmazonS3FullAccess.
7. Name role "SageMakerExecutionRole" → create.
8. Note the Role ARN — you will use this when creating SageMaker training jobs.
9. Enable MFA for the new user: IAM → Users → ds-student-1 → Security credentials → Assign MFA.` }
  ]
};

L['aws-w1-l3'] = {
  title: 'AWS CLI, SDK & the Console — Three Ways to Control AWS',
  sections: [
    { type: 'text', body: `<h2>Three Interfaces to AWS</h2>
<p>Every AWS operation — creating an S3 bucket, launching a training job, querying Athena — is ultimately an API call. Three interfaces wrap those API calls:</p>
<ul>
  <li><strong>AWS Management Console</strong> — the browser-based GUI. Good for exploration, first-time setup, and visual debugging. Slow for repetitive tasks. Every action you take in the console is secretly an API call — you can watch it in CloudTrail.</li>
  <li><strong>AWS CLI</strong> — command-line tool. Scriptable, automatable, fast. Run in a terminal (Linux, macOS, Windows). Perfect for batch operations, CI/CD pipelines, and automating repetitive tasks.</li>
  <li><strong>AWS SDK</strong> — language-specific libraries (Python boto3, JavaScript aws-sdk, Java, Go, etc.). Embed AWS calls directly in your application or notebook code. The most common interface for data science workflows.</li>
</ul>` },
    { type: 'text', body: `<h3>Installing and Configuring the AWS CLI</h3>
<pre><code># Install (macOS/Linux)
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o awscliv2.zip
unzip awscliv2.zip && sudo ./aws/install

# Windows: download the MSI installer from aws.amazon.com/cli

# Verify
aws --version</code></pre>
<pre><code># Configure with your IAM access keys
aws configure
# Prompts:
# AWS Access Key ID: AKIA...
# AWS Secret Access Key: ****
# Default region name: ap-south-1
# Default output format: json</code></pre>
<p>Credentials are stored in <code>~/.aws/credentials</code>. Multiple profiles for multiple accounts:</p>
<pre><code>aws configure --profile prod
aws s3 ls --profile prod</code></pre>
<h3>Common CLI Commands for Data Science</h3>
<pre><code># S3
aws s3 ls s3://my-bucket/
aws s3 cp data.csv s3://my-bucket/raw/
aws s3 sync ./local-folder s3://my-bucket/folder/ --delete

# SageMaker
aws sagemaker list-training-jobs
aws sagemaker describe-training-job --training-job-name my-job

# Athena
aws athena start-query-execution \
  --query-string "SELECT * FROM mydb.sales LIMIT 10" \
  --result-configuration OutputLocation=s3://my-bucket/results/</code></pre>` },
    { type: 'text', body: `<h3>boto3 — The Python SDK</h3>
<p>boto3 is the AWS SDK for Python and the primary tool for data science workflows on AWS. Install: <code>pip install boto3</code></p>
<pre><code>import boto3

# S3 client
s3 = boto3.client('s3', region_name='ap-south-1')

# List buckets
response = s3.list_buckets()
for bucket in response['Buckets']:
    print(bucket['Name'])

# Upload a file
s3.upload_file('local_data.csv', 'my-bucket', 'raw/data.csv')

# Download a file
s3.download_file('my-bucket', 'raw/data.csv', 'local_data.csv')

# Read CSV directly into pandas (no download needed)
import pandas as pd
df = pd.read_csv('s3://my-bucket/raw/data.csv')  # requires s3fs: pip install s3fs</code></pre>
<pre><code># SageMaker session
import sagemaker
sess = sagemaker.Session()
role = sagemaker.get_execution_role()  # inside SageMaker Studio/notebook
print(f"SageMaker role: {role}")
print(f"Default bucket: {sess.default_bucket()}")</code></pre>` },
    { type: 'tip', body: `In SageMaker Studio notebooks, <strong>never hardcode AWS access keys</strong>. The notebook runs on a managed instance that already has the SageMaker execution role attached — call <code>sagemaker.get_execution_role()</code> and boto3 picks up credentials automatically from the instance metadata service. Hardcoded keys in notebooks are a security risk and will be rejected by automated secret scanning in CI/CD.` },
    { type: 'exercise', title: 'Use boto3 to create an S3 bucket and upload a file', hint: 'Install boto3, configure credentials, create a bucket with a unique name, upload a CSV', solution: `import boto3
import pandas as pd
from io import StringIO

# Create S3 client
s3 = boto3.client('s3', region_name='ap-south-1')

# Create a bucket (name must be globally unique)
bucket_name = 'dsa-data-science-2024-yourname'
s3.create_bucket(
    Bucket=bucket_name,
    CreateBucketConfiguration={'LocationConstraint': 'ap-south-1'}
)
print(f"Bucket {bucket_name} created.")

# Create a sample DataFrame and upload as CSV
df = pd.DataFrame({'name': ['Alice', 'Bob'], 'score': [95, 87]})
csv_buffer = StringIO()
df.to_csv(csv_buffer, index=False)
s3.put_object(Bucket=bucket_name, Key='data/students.csv', Body=csv_buffer.getvalue())
print("File uploaded.")

# Read back
obj = s3.get_object(Bucket=bucket_name, Key='data/students.csv')
df_back = pd.read_csv(obj['Body'])
print(df_back)` }
  ]
};

L['aws-w1-l4'] = {
  title: 'Amazon EC2 — Virtual Machines in the Cloud',
  sections: [
    { type: 'text', body: `<h2>What is EC2?</h2>
<p>Amazon EC2 (Elastic Compute Cloud) provides on-demand virtual machines (instances) running in AWS data centres. For data science, EC2 is used for: custom training environments not covered by SageMaker, long-running batch jobs, hosting APIs, and Jupyter notebooks on GPU instances.</p>
<h3>Instance Types</h3>
<p>EC2 instance types encode the hardware configuration. The naming convention: <code>family.size</code></p>
<ul>
  <li><strong>General purpose</strong> (t3, m6i) — balanced CPU/RAM. t3.micro is free tier eligible.</li>
  <li><strong>Compute optimised</strong> (c6i, c7g) — high vCPU:RAM ratio. Preprocessing, feature engineering.</li>
  <li><strong>Memory optimised</strong> (r6i, x2idn) — large RAM. In-memory analytics, large dataset joins.</li>
  <li><strong>GPU instances</strong> (p3, p4d, g4dn, g5) — NVIDIA GPUs. Deep learning training and inference. p3.2xlarge has 1 V100 GPU; p4d.24xlarge has 8 A100s.</li>
  <li><strong>Inference optimised</strong> (inf1, inf2) — AWS Inferentia chips. Cost-effective inference for transformer models.</li>
</ul>
<p>For most data science learning, use <strong>t3.medium or t3.large</strong> (2–4 vCPU, 4–8 GB RAM). For GPU training, start with <strong>g4dn.xlarge</strong> (1 T4 GPU, ~$0.53/hr) or use SageMaker Training Jobs which are cheaper than a persistent GPU instance.</p>` },
    { type: 'text', body: `<h3>Launching an EC2 Instance</h3>
<ol>
  <li>EC2 Console → Launch Instance.</li>
  <li><strong>Name</strong>: descriptive name (e.g. "ds-jupyter-server").</li>
  <li><strong>AMI</strong> (Amazon Machine Image): the OS + pre-installed software. Choose "Deep Learning AMI" (has CUDA, PyTorch, TensorFlow pre-installed) or a standard Amazon Linux 2 / Ubuntu AMI.</li>
  <li><strong>Instance type</strong>: t3.medium for CPU, g4dn.xlarge for GPU.</li>
  <li><strong>Key pair</strong>: create a .pem key for SSH access. Download and store it — you cannot re-download it.</li>
  <li><strong>Security group</strong>: firewall rules. Allow SSH (port 22) from your IP only. If running Jupyter, also allow port 8888 from your IP.</li>
  <li><strong>Storage</strong>: add an EBS root volume (30 GB minimum for Deep Learning AMI).</li>
  <li>Launch → wait ~60 seconds for the instance to start.</li>
</ol>
<pre><code># SSH into the instance
chmod 400 my-key.pem
ssh -i my-key.pem ec2-user@ec2-XX-XX-XX-XX.compute.amazonaws.com

# For Ubuntu AMIs, use 'ubuntu' instead of 'ec2-user'</code></pre>` },
    { type: 'tip', body: `<strong>Always stop EC2 instances when not in use.</strong> A stopped instance does not incur compute charges (only EBS storage charges). Set an AWS Budget alert for $10/month. Better yet, for data science work use <strong>SageMaker Studio</strong> which auto-shuts down idle kernels — you cannot forget to stop it. Reserve EC2 for workloads that need persistent processes or custom environments.` },
    { type: 'text', body: `<h3>Spot Instances</h3>
<p>Spot Instances use spare AWS capacity at up to 90% discount compared to On-Demand prices. The trade-off: AWS can reclaim a Spot Instance with a 2-minute warning when it needs the capacity back.</p>
<p>For data science, Spot Instances are excellent for:</p>
<ul>
  <li>SageMaker Training Jobs with checkpointing (re-run from last checkpoint if interrupted).</li>
  <li>EMR cluster worker nodes (fault-tolerant Spark jobs).</li>
  <li>AWS Batch jobs (automatically retried on interruption).</li>
</ul>
<p>Spot Instances are not suitable for: persistent Jupyter notebooks, inference endpoints serving live traffic, or any job that cannot tolerate interruption without checkpointing.</p>
<h3>Key EC2 Concepts</h3>
<ul>
  <li><strong>EBS</strong> (Elastic Block Store) — persistent block storage attached to EC2. Survives instance stop/start. Delete on termination: off (default) means your data persists even after terminate.</li>
  <li><strong>Elastic IP</strong> — a static public IP address that stays fixed across stop/start. Useful if you are running a server with a fixed URL.</li>
  <li><strong>User Data</strong> — a startup script that runs on first launch. Automate Jupyter installation, package installs, and environment setup.</li>
</ul>` },
    { type: 'exercise', title: 'Launch a t3.micro instance and run a Python script', hint: 'Launch from Amazon Linux 2, SSH in, install pandas, run a data analysis script', solution: `1. EC2 Console → Launch Instance → name "test-ds" → Amazon Linux 2023 AMI → t3.micro → create new key pair "ds-key" → download.
2. Security group: Allow SSH from My IP.
3. Launch → wait for "running" status.
4. In terminal:
   chmod 400 ds-key.pem
   ssh -i ds-key.pem ec2-user@<public-ip>
5. On the instance:
   sudo yum update -y
   sudo yum install python3-pip -y
   pip3 install pandas boto3
6. Create a script:
   cat > analyze.py << 'EOF'
   import pandas as pd
   data = {'month': ['Jan','Feb','Mar'], 'sales': [120000, 135000, 148000]}
   df = pd.DataFrame(data)
   print(df)
   print(f"Total: {df['sales'].sum():,}")
   EOF
   python3 analyze.py
7. EC2 Console → Stop Instance (not terminate) to avoid charges.` }
  ]
};

L['aws-w1-l5'] = {
  title: 'Amazon S3 Introduction — Object Storage Fundamentals',
  sections: [
    { type: 'text', body: `<h2>What is Amazon S3?</h2>
<p>Amazon S3 (Simple Storage Service) is AWS's object storage service. It stores any file — CSVs, Parquet files, model artifacts, images, notebooks, compressed archives — as objects in containers called buckets. S3 is the backbone of data lakes and ML pipelines on AWS: virtually every other AWS data service reads from and writes to S3.</p>
<h3>Core Concepts</h3>
<ul>
  <li><strong>Bucket</strong> — the top-level container. Bucket names must be globally unique across all AWS accounts. A bucket belongs to a single Region. You can have up to 100 buckets per account (soft limit, can be raised).</li>
  <li><strong>Object</strong> — a file stored in a bucket. Each object has: a Key (the full "path", e.g. <code>raw/2024/sales.csv</code>), a Value (the data bytes, up to 5 TB), and Metadata (content type, custom key-value tags).</li>
  <li><strong>Key prefix</strong> — the portion of the key before the filename. Keys look like file paths (<code>data/raw/</code>) but S3 is flat — there are no real directories, only prefixes. The console displays them as folders for convenience.</li>
  <li><strong>URL format</strong>: <code>s3://bucket-name/key</code> (SDK/CLI) or <code>https://bucket-name.s3.amazonaws.com/key</code> (HTTPS).</li>
</ul>` },
    { type: 'text', body: `<h3>S3 Durability and Availability</h3>
<p>S3 Standard provides <strong>11 nines of durability</strong> (99.999999999%) — data is automatically replicated across at least 3 Availability Zones. The probability of losing an object stored in S3 Standard is vanishingly small. S3 is also highly available: 99.99% uptime SLA.</p>
<h3>Bucket Creation and Basic Operations</h3>
<pre><code># AWS CLI
aws s3 mb s3://my-ds-bucket-2024 --region ap-south-1

# Upload a file
aws s3 cp model.pkl s3://my-ds-bucket-2024/models/v1/model.pkl

# Upload a directory (recursive)
aws s3 cp ./data/ s3://my-ds-bucket-2024/data/ --recursive

# List objects with a prefix
aws s3 ls s3://my-ds-bucket-2024/data/raw/

# Download
aws s3 cp s3://my-ds-bucket-2024/data/raw/sales.csv ./sales.csv

# Delete an object
aws s3 rm s3://my-ds-bucket-2024/data/old/file.csv

# Sync a local directory to S3 (only copies changed files)
aws s3 sync ./results/ s3://my-ds-bucket-2024/results/ --delete</code></pre>` },
    { type: 'text', body: `<h3>Access Control</h3>
<p>By default, all S3 buckets and objects are <strong>private</strong>. Only the bucket owner can access them. Access is granted via:</p>
<ul>
  <li><strong>IAM policies</strong> — attached to users or roles. "Allow s3:GetObject on arn:aws:s3:::my-bucket/*". Controls who in your account can access.</li>
  <li><strong>Bucket policy</strong> — a JSON resource policy attached to the bucket. Can grant access to other AWS accounts or the public. Always use the least permissive policy possible.</li>
  <li><strong>Block Public Access settings</strong> — four account-level and bucket-level settings that override any bucket policy that would make objects public. Leave all four enabled (the default) unless you intentionally need public objects.</li>
  <li><strong>Pre-signed URLs</strong> — a time-limited URL that grants temporary access to a specific object. Useful for sharing a file with someone outside your AWS account without making it public.</li>
</ul>
<pre><code># Generate a pre-signed URL valid for 1 hour
import boto3
s3 = boto3.client('s3')
url = s3.generate_presigned_url(
    'get_object',
    Params={'Bucket': 'my-bucket', 'Key': 'report.pdf'},
    ExpiresIn=3600
)
print(url)  # share this URL — expires in 1 hour</code></pre>` },
    { type: 'tip', body: `Organise your S3 bucket with a consistent <strong>data lake zone structure</strong>: <code>raw/</code> (original data, never modified), <code>processed/</code> (cleaned and transformed), <code>curated/</code> (aggregated, model-ready features), <code>models/</code> (trained model artifacts), <code>results/</code> (predictions, reports). This makes permissions, lifecycle policies, and cross-team collaboration much simpler to manage.` },
    { type: 'exercise', title: 'Create a data lake bucket structure and upload sample data', hint: 'Create a bucket, create zone prefixes, upload a CSV to raw/, and list with CLI', solution: `# 1. Create the bucket
aws s3 mb s3://dsa-datalake-yourname --region ap-south-1

# 2. Create placeholder files to simulate zone structure
echo "placeholder" | aws s3 cp - s3://dsa-datalake-yourname/raw/.keep
echo "placeholder" | aws s3 cp - s3://dsa-datalake-yourname/processed/.keep
echo "placeholder" | aws s3 cp - s3://dsa-datalake-yourname/curated/.keep
echo "placeholder" | aws s3 cp - s3://dsa-datalake-yourname/models/.keep

# 3. Upload sample data to raw zone
aws s3 cp sales_2024.csv s3://dsa-datalake-yourname/raw/sales/year=2024/sales.csv

# 4. List the bucket structure
aws s3 ls s3://dsa-datalake-yourname/ --recursive

# 5. In Python — read directly from S3 into pandas
import pandas as pd
df = pd.read_csv('s3://dsa-datalake-yourname/raw/sales/year=2024/sales.csv')
print(df.head())` }
  ]
};

/* ─── MODULE 2 — Data Storage on AWS ────────────────────────────────────── */

L['aws-w2-l1'] = {
  title: 'Amazon S3 Deep Dive — Versioning, Lifecycle, Encryption & Glacier',
  sections: [
    { type: 'text', body: `<h2>S3 Versioning</h2>
<p>Versioning keeps multiple versions of every object in a bucket. When enabled, every PUT to an existing key creates a new version rather than overwriting. DELETE adds a delete marker — the data still exists and can be recovered by removing the marker.</p>
<pre><code># Enable versioning via CLI
aws s3api put-bucket-versioning \
  --bucket my-bucket \
  --versioning-configuration Status=Enabled

# List all versions of an object
aws s3api list-object-versions \
  --bucket my-bucket --prefix data/sales.csv

# Restore a previous version
aws s3api copy-object \
  --bucket my-bucket --copy-source my-bucket/data/sales.csv?versionId=abc123 \
  --key data/sales.csv</code></pre>
<p>Versioning is critical for: model artifact lineage (keep every trained model version), data pipeline recovery (reprocess from a previous raw data version), and compliance (audit trail of every data change).</p>
<p><strong>Cost note</strong>: all versions consume storage and are billed. Add an expiration lifecycle rule to delete old versions automatically.</p>` },
    { type: 'text', body: `<h3>S3 Lifecycle Policies</h3>
<p>Lifecycle rules automate transitioning objects to cheaper storage classes or deleting them after a set time. Configure in the S3 console (Bucket → Management → Lifecycle rules) or via CLI/SDK.</p>
<p>Storage class tiers (by access frequency / cost):</p>
<ul>
  <li><strong>S3 Standard</strong> — frequent access. Highest cost. Default for all new objects.</li>
  <li><strong>S3 Intelligent-Tiering</strong> — auto-moves objects between frequent and infrequent tiers based on access patterns. Best for unpredictable access.</li>
  <li><strong>S3 Standard-IA</strong> (Infrequent Access) — lower cost, minimum 30-day storage, per-retrieval fee. Good for backups accessed monthly.</li>
  <li><strong>S3 One Zone-IA</strong> — cheaper than Standard-IA but stored in a single AZ. Less durable.</li>
  <li><strong>S3 Glacier Instant Retrieval</strong> — millisecond retrieval, very low storage cost. Archive data accessed a few times per year.</li>
  <li><strong>S3 Glacier Flexible Retrieval</strong> — retrieval in minutes to hours. Long-term archives.</li>
  <li><strong>S3 Glacier Deep Archive</strong> — 12-hour retrieval. Lowest cost. 7–10 year compliance archives.</li>
</ul>` },
    { type: 'text', body: `<h3>S3 Encryption</h3>
<p>All S3 objects should be encrypted at rest. Options:</p>
<ul>
  <li><strong>SSE-S3</strong> (Server-Side Encryption with S3-managed keys) — AWS manages the encryption keys. Enabled by default on all new buckets since 2023. Zero cost.</li>
  <li><strong>SSE-KMS</strong> — AWS Key Management Service manages the keys. You control key rotation and access. Provides CloudTrail audit log of every key usage. Small cost per API call. Recommended for sensitive data.</li>
  <li><strong>SSE-C</strong> — customer provides the encryption key with every PUT/GET request. AWS does not store the key. Highest control, highest complexity.</li>
  <li><strong>Client-side encryption</strong> — you encrypt data before uploading. AWS sees only ciphertext. Maximum security.</li>
</ul>
<h3>S3 Replication</h3>
<p>Cross-Region Replication (CRR): automatically copies objects to a bucket in a different Region. Use for disaster recovery, legal compliance (data residency in multiple regions), or reducing latency for global users. Same-Region Replication (SRR): copies within the same Region — for log aggregation or sharing data between accounts.</p>` },
    { type: 'tip', body: `Enable <strong>S3 Intelligent-Tiering</strong> for any bucket storing data science artifacts (datasets, model checkpoints, experiment outputs) where access patterns are unpredictable. It automatically moves objects to the most cost-effective tier with no retrieval fees for the frequent-access tier. For training data accessed daily during active projects, it stays in Standard; after project completion, it moves to infrequent access automatically.` },
    { type: 'exercise', title: 'Set up a lifecycle policy to archive old model artifacts', hint: 'Enable versioning, create a lifecycle rule to transition objects after 30 days to Glacier, delete expired versions after 90 days', solution: `# Via CLI
aws s3api put-bucket-lifecycle-configuration \
  --bucket my-ds-bucket \
  --lifecycle-configuration '{
    "Rules": [{
      "ID": "archive-old-models",
      "Status": "Enabled",
      "Filter": {"Prefix": "models/"},
      "Transitions": [{
        "Days": 30,
        "StorageClass": "GLACIER"
      }],
      "NoncurrentVersionTransitions": [{
        "NoncurrentDays": 7,
        "StorageClass": "GLACIER"
      }],
      "NoncurrentVersionExpiration": {"NoncurrentDays": 90}
    }]
  }'

# Verify
aws s3api get-bucket-lifecycle-configuration --bucket my-ds-bucket` }
  ]
};

L['aws-w2-l2'] = {
  title: 'Amazon RDS — Managed Relational Databases on AWS',
  sections: [
    { type: 'text', body: `<h2>What is Amazon RDS?</h2>
<p>Amazon RDS (Relational Database Service) is a managed service that runs relational databases in the cloud — eliminating the operational burden of provisioning servers, patching OS and database software, taking backups, and managing failover. RDS supports: PostgreSQL, MySQL, MariaDB, Oracle, Microsoft SQL Server, and Amazon Aurora.</p>
<h3>Key RDS Features</h3>
<ul>
  <li><strong>Automated backups</strong> — daily snapshots retained for 1–35 days. Point-in-time recovery to any second within the retention window.</li>
  <li><strong>Multi-AZ deployment</strong> — a standby replica in a second AZ. Automatic failover in 60–120 seconds if the primary fails. Zero data loss (synchronous replication). Recommended for production.</li>
  <li><strong>Read Replicas</strong> — asynchronous copies of the primary DB for read scaling. Up to 5 replicas per instance. Can be promoted to standalone DB for DR. Useful for offloading analytics queries from the production OLTP database.</li>
  <li><strong>Automated patching</strong> — OS and database engine patches applied during a maintenance window you define.</li>
  <li><strong>Encryption</strong> — at-rest encryption using KMS keys. In-transit encryption via SSL/TLS.</li>
</ul>` },
    { type: 'text', body: `<h3>RDS for Data Science Use Cases</h3>
<ul>
  <li>Storing cleaned, structured training data in a PostgreSQL or MySQL database for reproducible ML pipelines.</li>
  <li>A feature store for pre-computed features (simpler than SageMaker Feature Store for small teams).</li>
  <li>Storing model predictions and inference results for analysis.</li>
  <li>Application backend databases that your ML API reads from (e.g. customer data for personalisation).</li>
</ul>
<h3>Connecting to RDS from Python</h3>
<pre><code>import psycopg2  # pip install psycopg2-binary
import pandas as pd

conn = psycopg2.connect(
    host='mydb.cluster.ap-south-1.rds.amazonaws.com',
    database='sales',
    user='admin',
    password='your-password',  # use AWS Secrets Manager in production
    port=5432
)

df = pd.read_sql("SELECT * FROM orders WHERE year = 2024", conn)
conn.close()
print(df.head())</code></pre>
<p>In production, retrieve credentials from <strong>AWS Secrets Manager</strong> instead of hardcoding:</p>
<pre><code>import boto3, json
client = boto3.client('secretsmanager', region_name='ap-south-1')
secret = json.loads(client.get_secret_value(SecretId='prod/rds/credentials')['SecretString'])
conn = psycopg2.connect(host=secret['host'], user=secret['username'], password=secret['password'], ...)</code></pre>` },
    { type: 'tip', body: `Always place RDS instances inside a <strong>private VPC subnet</strong> — never expose them to the public internet. Connect from EC2 instances, Lambda functions, or SageMaker instances in the same VPC. Use a <strong>Security Group</strong> on the RDS instance that only allows inbound on port 5432/3306 from the security group of your application servers — not from 0.0.0.0/0.` },
    { type: 'text', body: `<h3>Amazon Aurora</h3>
<p>Aurora is AWS's proprietary cloud-native relational database — MySQL and PostgreSQL compatible but 5× faster than standard MySQL and 3× faster than standard PostgreSQL, at 1/10th the cost of commercial databases (Oracle, SQL Server).</p>
<p>Aurora key advantages for data science:</p>
<ul>
  <li><strong>Aurora Serverless v2</strong> — auto-scales capacity up and down based on load. Ideal for variable ML workloads: scales to 0 when idle (near-zero cost), scales up instantly during training data queries.</li>
  <li><strong>Aurora Global Database</strong> — replicates to 5 other Regions with &lt;1s lag. For global ML applications.</li>
  <li><strong>Parallel Query</strong> — pushes analytical query processing to the distributed Aurora storage layer, accelerating large analytical queries without affecting OLTP performance.</li>
</ul>` },
    { type: 'exercise', title: 'Create an RDS PostgreSQL instance and load a dataset', hint: 'Launch a free-tier RDS PostgreSQL instance in a VPC, connect via psycopg2, create a table, and load a CSV', solution: `1. RDS Console → Create database → Standard create → PostgreSQL → Free tier template.
2. Settings: DB identifier "ds-postgres", Master username "admin", auto-generate password.
3. Instance: db.t3.micro (free tier). Storage: 20 GB gp2.
4. Connectivity: VPC default, public access: No (or Yes for initial testing only). Create.
5. Wait ~5 minutes for "Available" status. Note endpoint.

import psycopg2, pandas as pd

# Connect (use public access temporarily for testing)
conn = psycopg2.connect(
    host='ds-postgres.xxxx.ap-south-1.rds.amazonaws.com',
    database='postgres', user='admin', password='your-password', port=5432)

cur = conn.cursor()
cur.execute("""
  CREATE TABLE IF NOT EXISTS sales (
    order_id VARCHAR(20), order_date DATE, region VARCHAR(50),
    product VARCHAR(100), sales NUMERIC(12,2))""")
conn.commit()

# Load CSV into the table
df = pd.read_csv('sales.csv')
for _, row in df.iterrows():
    cur.execute("INSERT INTO sales VALUES (%s,%s,%s,%s,%s)", tuple(row))
conn.commit()
print(f"Loaded {len(df)} rows")
cur.close(); conn.close()` }
  ]
};

L['aws-w2-l3'] = {
  title: 'Amazon DynamoDB — NoSQL at Scale',
  sections: [
    { type: 'text', body: `<h2>What is DynamoDB?</h2>
<p>Amazon DynamoDB is a fully managed serverless NoSQL key-value and document database. It delivers single-digit millisecond read/write latency at any scale — from 1 request/second to millions — with automatic scaling, built-in redundancy, and no server management.</p>
<h3>DynamoDB Data Model</h3>
<ul>
  <li><strong>Table</strong> — the top-level container. Unlike relational tables, DynamoDB tables have no fixed schema except for the primary key.</li>
  <li><strong>Item</strong> — equivalent to a row. Each item is a collection of attributes (JSON-like). Different items in the same table can have different attributes.</li>
  <li><strong>Attribute</strong> — a key-value pair within an item. Supported types: String, Number, Binary, Boolean, Null, List, Map, Set.</li>
  <li><strong>Primary Key</strong> — uniquely identifies each item. Two options:
    <ul>
      <li><strong>Partition key only</strong> (simple primary key) — a single attribute. DynamoDB hashes it to determine the physical partition storing the item.</li>
      <li><strong>Partition key + Sort key</strong> (composite primary key) — two attributes. Items with the same partition key are stored together, sorted by sort key. Enables efficient range queries within a partition.</li>
    </ul>
  </li>
</ul>` },
    { type: 'text', body: `<h3>DynamoDB for Data Science Use Cases</h3>
<ul>
  <li><strong>Feature store (online)</strong> — real-time feature lookup for ML inference. Fetch a user's features (age, purchase history, segment) in &lt;10ms for a recommendation API.</li>
  <li><strong>Model registry metadata</strong> — store metadata about model versions, training run IDs, evaluation metrics, and deployment status.</li>
  <li><strong>Prediction cache</strong> — cache inference results keyed by input hash to avoid redundant model calls for identical inputs.</li>
  <li><strong>Session/state storage</strong> — store ML pipeline state, job status, and intermediate results for multi-step workflows.</li>
</ul>
<h3>Working with DynamoDB in Python</h3>
<pre><code>import boto3

dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')
table = dynamodb.Table('ModelRegistry')

# Write an item
table.put_item(Item={
    'model_name': 'churn-predictor',  # partition key
    'version': 'v2.1',               # sort key
    'accuracy': '0.923',
    'training_date': '2024-05-01',
    'status': 'production',
    's3_uri': 's3://my-bucket/models/churn/v2.1/model.pkl'
})

# Read an item
response = table.get_item(Key={'model_name': 'churn-predictor', 'version': 'v2.1'})
item = response['Item']
print(item['accuracy'])

# Query all versions of a model
response = table.query(
    KeyConditionExpression='model_name = :mn',
    ExpressionAttributeValues={':mn': 'churn-predictor'}
)
for item in response['Items']:
    print(item['version'], item['status'])</code></pre>` },
    { type: 'tip', body: `Design your DynamoDB <strong>access patterns first</strong>, then choose your primary key and indexes. DynamoDB is the opposite of relational databases — you design the schema around how you will query, not around the relationships between entities. The most common mistake is treating DynamoDB like a relational database and trying to do flexible ad-hoc queries — it does not support them efficiently without proper key design.` },
    { type: 'text', body: `<h3>DynamoDB Capacity Modes</h3>
<ul>
  <li><strong>Provisioned</strong> — you specify Read Capacity Units (RCU) and Write Capacity Units (WCU). 1 RCU = 1 strongly consistent read of up to 4 KB/s. 1 WCU = 1 write of up to 1 KB/s. Auto Scaling adjusts within min/max bounds. More predictable cost.</li>
  <li><strong>On-Demand</strong> — no capacity planning. DynamoDB auto-scales to handle any traffic. Pay per request. More expensive at high steady-state throughput, but zero management. Best for unpredictable workloads and new applications.</li>
</ul>
<h3>Global Secondary Indexes (GSI)</h3>
<p>A GSI lets you query on an attribute other than the primary key — essentially a separate view of the table with a different key. Example: a "ModelRegistry" table keyed on (model_name, version) might have a GSI on (status, training_date) so you can query "all production models trained in 2024" efficiently.</p>` },
    { type: 'exercise', title: 'Build a real-time feature store table in DynamoDB', hint: 'Create a table with customer_id as partition key, write feature items, and query them for inference', solution: `import boto3

dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')

# Create table (one-time setup)
table = dynamodb.create_table(
    TableName='CustomerFeatures',
    KeySchema=[{'AttributeName': 'customer_id', 'KeyType': 'HASH'}],
    AttributeDefinitions=[{'AttributeName': 'customer_id', 'AttributeType': 'S'}],
    BillingMode='PAY_PER_REQUEST'
)
table.wait_until_exists()

table = dynamodb.Table('CustomerFeatures')

# Write features (simulates ETL pipeline updating features)
features = [
    {'customer_id': 'C001', 'age': 34, 'tenure_months': 24, 'segment': 'Premium',
     'avg_monthly_spend': '4500.50', 'churn_risk': '0.12'},
    {'customer_id': 'C002', 'age': 28, 'tenure_months': 6, 'segment': 'Standard',
     'avg_monthly_spend': '1200.00', 'churn_risk': '0.67'},
]
with table.batch_writer() as batch:
    for feat in features:
        batch.put_item(Item=feat)

# Real-time inference lookup (simulates API handler)
def get_features_for_inference(customer_id):
    resp = table.get_item(Key={'customer_id': customer_id})
    return resp.get('Item', {})

print(get_features_for_inference('C001'))` }
  ]
};

L['aws-w2-l4'] = {
  title: 'Amazon Redshift — Cloud Data Warehouse',
  sections: [
    { type: 'text', body: `<h2>What is Amazon Redshift?</h2>
<p>Amazon Redshift is a fully managed cloud data warehouse designed for OLAP (Online Analytical Processing) — running complex analytical queries across petabytes of structured data. It uses columnar storage and MPP (Massively Parallel Processing) across multiple nodes, making it far faster than a standard relational database for large-scale analytics.</p>
<h3>Architecture</h3>
<ul>
  <li><strong>Leader node</strong> — receives SQL queries, generates execution plans, coordinates worker nodes, and returns results. Users connect to the leader node via JDBC/ODBC.</li>
  <li><strong>Compute nodes</strong> — store data in columnar format and execute query slices in parallel. Node types: ra3 (recommended, storage on S3 via Redshift Managed Storage), dc2 (fast SSD, fixed local storage).</li>
  <li><strong>Redshift Serverless</strong> — no cluster to provision or manage. Automatically scales compute to meet query demand. Pay per RPU-second. Best for unpredictable analytics workloads.</li>
</ul>
<h3>Why Columnar Storage?</h3>
<p>Analytical queries typically read a few columns across millions of rows. Columnar storage keeps each column's values contiguous on disk — so a <code>SUM(sales)</code> query reads only the sales column, not the entire row. This dramatically reduces I/O and enables high compression ratios (columns of the same data type compress well).</p>` },
    { type: 'text', body: `<h3>Loading Data into Redshift</h3>
<p>The recommended approach for large loads is the <strong>COPY command</strong> — reads data directly from S3 in parallel across all compute nodes:</p>
<pre><code>-- Load CSV from S3
COPY sales
FROM 's3://my-bucket/processed/sales/'
IAM_ROLE 'arn:aws:iam::123456789:role/RedshiftS3Role'
FORMAT AS CSV IGNOREHEADER 1
REGION 'ap-south-1';

-- Load Parquet (preferred — preserves types, much faster)
COPY sales
FROM 's3://my-bucket/processed/sales/'
IAM_ROLE 'arn:aws:iam::123456789:role/RedshiftS3Role'
FORMAT AS PARQUET;</code></pre>
<h3>Redshift Spectrum</h3>
<p>Query S3 data directly without loading it into Redshift. Define external tables pointing to S3 files, then join them with Redshift-resident tables in a single SQL query. Ideal for querying historical data in a data lake without the cost of loading everything into Redshift.</p>
<pre><code>-- Create external schema pointing to Glue Data Catalog
CREATE EXTERNAL SCHEMA data_lake
FROM DATA CATALOG DATABASE 'my_glue_db'
IAM_ROLE 'arn:aws:iam::123456789:role/RedshiftSpectrumRole'
REGION 'ap-south-1';

-- Query S3 data lake table joined with Redshift table
SELECT r.region, s.product, SUM(s.sales)
FROM data_lake.raw_sales s
JOIN redshift_schema.regions r ON s.region_code = r.code
GROUP BY 1, 2;</code></pre>` },
    { type: 'tip', body: `Use <strong>Parquet format</strong> for all data going into Redshift Spectrum and Redshift COPY. Parquet is columnar, compressed, and schema-embedded — COPY runs 10–20× faster than CSV, uses less S3 storage, and supports predicate pushdown (Redshift reads only the row groups that match your WHERE clause). Convert CSVs to Parquet in AWS Glue before loading.` },
    { type: 'text', body: `<h3>Connecting to Redshift from Python</h3>
<pre><code>import redshift_connector  # pip install redshift-connector
import pandas as pd

conn = redshift_connector.connect(
    host='my-cluster.xxxx.ap-south-1.redshift.amazonaws.com',
    database='analytics',
    user='admin',
    password='your-password',
    port=5439
)

df = pd.read_sql("""
  SELECT category, SUM(sales) as total_sales, AVG(profit_margin) as avg_margin
  FROM sales_fact
  WHERE order_year = 2024
  GROUP BY category
  ORDER BY total_sales DESC
""", conn)
conn.close()
print(df)</code></pre>
<h3>Performance Best Practices</h3>
<ul>
  <li><strong>Distribution key</strong> — choose a column that evenly distributes data across nodes and minimises data movement for joins (usually the join key between your fact and largest dimension).</li>
  <li><strong>Sort key</strong> — columns commonly in WHERE and ORDER BY clauses. Redshift skips unsorted blocks.</li>
  <li><strong>Use VACUUM and ANALYZE</strong> — reclaim space from deleted rows and update table statistics for the query planner.</li>
  <li><strong>Result caching</strong> — Redshift caches query results. Identical queries return instantly without compute cost.</li>
</ul>` },
    { type: 'exercise', title: 'Load a Parquet dataset into Redshift and run analytics queries', hint: 'Convert a CSV to Parquet with pandas, upload to S3, create a Redshift table, COPY the data, and run aggregation queries', solution: `# Step 1: Convert CSV to Parquet
import pandas as pd
df = pd.read_csv('sales.csv', parse_dates=['order_date'])
df.to_parquet('sales.parquet', index=False)

import boto3
boto3.client('s3').upload_file('sales.parquet', 'my-bucket', 'processed/sales/sales.parquet')

# Step 2: In Redshift (SQL console or psycopg2)
# CREATE TABLE
"""
CREATE TABLE sales_fact (
  order_id VARCHAR(20),
  order_date DATE SORTKEY,
  region VARCHAR(50),
  category VARCHAR(50) DISTKEY,
  sales DECIMAL(12,2),
  profit DECIMAL(12,2)
);
"""

# COPY from S3
"""
COPY sales_fact
FROM 's3://my-bucket/processed/sales/'
IAM_ROLE 'arn:aws:iam::ACCOUNT:role/RedshiftS3Role'
FORMAT AS PARQUET;
"""

# Analytics queries
"""
SELECT category, SUM(sales) as revenue, AVG(profit/sales) as margin
FROM sales_fact WHERE EXTRACT(YEAR FROM order_date) = 2024
GROUP BY category ORDER BY revenue DESC;
"""` }
  ]
};

L['aws-w2-l5'] = {
  title: 'Data Lake Architecture on AWS',
  sections: [
    { type: 'text', body: `<h2>What is a Data Lake?</h2>
<p>A data lake is a centralised repository that stores all structured, semi-structured, and unstructured data at any scale — in its native format. Unlike a data warehouse (which requires data to be structured and schema-defined before loading), a data lake accepts raw data first and applies schema when reading (schema-on-read).</p>
<h3>The AWS Data Lake Reference Architecture</h3>
<pre>
Ingestion → Storage → Processing → Consumption
  │              │         │             │
  ├─ Kinesis   S3 Zones  Glue ETL    Athena
  ├─ Glue     ─────────  EMR Spark   Redshift Spectrum
  ├─ DMS        raw/     SageMaker   QuickSight
  └─ Direct     processed/            SageMaker
     Upload      curated/
</pre>
<h3>Data Lake Zones</h3>
<ul>
  <li><strong>Raw zone</strong> (bronze) — original data exactly as received. Never modified. CSV, JSON, Parquet, images — whatever format the source produces. This is the source of truth and the recovery point for reprocessing.</li>
  <li><strong>Processed zone</strong> (silver) — cleaned, validated, and standardised. Standardised formats (Parquet), correct data types, deduplication, null handling, schema enforcement. Built by Glue ETL or EMR jobs from the raw zone.</li>
  <li><strong>Curated zone</strong> (gold) — business-ready, domain-specific datasets. Aggregations, joins across sources, feature-engineered datasets for ML. What data scientists and BI analysts primarily query.</li>
</ul>` },
    { type: 'text', body: `<h3>AWS Lake Formation</h3>
<p>AWS Lake Formation is a managed service that simplifies building and securing a data lake on top of S3 and Glue. Key features:</p>
<ul>
  <li><strong>Data lake permissions</strong> — fine-grained access control at the database, table, and column level — applied consistently to Athena, Glue, Redshift Spectrum, and EMR queries through a central policy engine.</li>
  <li><strong>Data catalog</strong> — uses the Glue Data Catalog. Register S3 locations, define databases and tables, and crawl new data to auto-discover schema.</li>
  <li><strong>Blueprints</strong> — workflow templates that ingest data from RDS, relational databases, or S3 into the data lake, including incremental loads.</li>
  <li><strong>Row and column level security</strong> — restrict specific users to specific rows (e.g. a regional analyst sees only their region's data) and hide sensitive columns (PII masking).</li>
</ul>
<h3>Data Lake vs Data Warehouse</h3>
<table>
  <tr><th>Aspect</th><th>Data Lake (S3)</th><th>Data Warehouse (Redshift)</th></tr>
  <tr><td>Schema</td><td>Schema-on-read (flexible)</td><td>Schema-on-write (rigid)</td></tr>
  <tr><td>Data types</td><td>All (structured, semi, unstructured)</td><td>Structured only</td></tr>
  <tr><td>Cost</td><td>Very low storage ($0.023/GB/month)</td><td>Higher (compute + storage)</td></tr>
  <tr><td>Query speed</td><td>Slower (Athena, EMR)</td><td>Very fast (optimised)</td></tr>
  <tr><td>Best for</td><td>ML training data, raw storage, exploration</td><td>BI dashboards, regular reports</td></tr>
</table>` },
    { type: 'tip', body: `Use the <strong>lakehouse pattern</strong>: store everything in S3 (cheap, flexible), run ML workloads directly on S3 via Athena and SageMaker, and load only the most-queried, well-defined business datasets into Redshift. This gives you the flexibility of a data lake for ML and the performance of a data warehouse for BI — without paying to store all raw data in Redshift.` },
    { type: 'exercise', title: 'Design a data lake zone structure with Glue catalog tables', hint: 'Create S3 zone prefixes, run a Glue crawler on the processed zone, and query with Athena', solution: `# Zone structure in S3
zones = ['raw', 'processed', 'curated']
import boto3
s3 = boto3.client('s3')
for zone in zones:
    s3.put_object(Bucket='my-datalake', Key=f'{zone}/.keep', Body=b'')

# Upload Parquet to processed zone
import pandas as pd
df = pd.read_csv('sales.csv')
df.to_parquet('/tmp/sales.parquet', index=False)
s3.upload_file('/tmp/sales.parquet', 'my-datalake', 'processed/sales/sales.parquet')

# Create Glue crawler (via console or CLI):
# aws glue create-crawler \
#   --name "processed-sales-crawler" \
#   --role "GlueServiceRole" \
#   --database-name "datalake_db" \
#   --targets '{"S3Targets": [{"Path": "s3://my-datalake/processed/sales/"}]}'

# aws glue start-crawler --name "processed-sales-crawler"

# After crawler completes, query in Athena:
# SELECT region, SUM(sales) as total FROM datalake_db.sales GROUP BY region;` }
  ]
};

/* ─── MODULE 3 — Data Processing & ETL ──────────────────────────────────── */

L['aws-w3-l1'] = {
  title: 'AWS Glue — Crawlers, Data Catalog & ETL Jobs',
  sections: [
    { type: 'text', body: `<h2>What is AWS Glue?</h2>
<p>AWS Glue is a serverless data integration service for ETL (Extract, Transform, Load) at any scale. Key components: the <strong>Data Catalog</strong> (a central metadata store), <strong>Crawlers</strong> (auto-detect schemas from data sources), and <strong>ETL Jobs</strong> (PySpark or Python scripts that transform data).</p>
<h3>The Glue Data Catalog</h3>
<p>The Glue Data Catalog is a managed Hive Metastore — it stores metadata (database names, table names, column names, data types, partition information, S3 locations) for data stored anywhere: S3, RDS, Redshift, DynamoDB. Once registered in the Catalog, tables can be queried by Athena, EMR, Redshift Spectrum, and SageMaker.</p>
<ul>
  <li><strong>Database</strong> — a logical grouping of tables. Not the actual data — just a namespace.</li>
  <li><strong>Table</strong> — metadata definition of a dataset (column names, types, S3 location, format). Pointing to a Parquet file in S3 as a table makes it queryable via SQL without moving data.</li>
  <li><strong>Partition</strong> — a subset of table data defined by a column value (e.g. year=2024/month=05). Enables partition pruning — Athena only reads the partitions matching your WHERE clause.</li>
</ul>` },
    { type: 'text', body: `<h3>Glue Crawlers</h3>
<p>A Crawler connects to a data source, samples files, infers the schema, and populates the Data Catalog automatically. Supports: S3, JDBC (RDS, Redshift), DynamoDB, Kafka, and more.</p>
<pre><code># Create and run a crawler via CLI
aws glue create-crawler \
  --name "raw-sales-crawler" \
  --role "arn:aws:iam::ACCOUNT:role/GlueServiceRole" \
  --database-name "datalake_raw" \
  --targets '{"S3Targets": [{"Path": "s3://my-lake/raw/sales/"}]}'

aws glue start-crawler --name "raw-sales-crawler"
aws glue get-crawler --name "raw-sales-crawler" --query 'Crawler.State'</code></pre>
<p>After the crawler completes, a table called "sales" appears in the "datalake_raw" database with the inferred schema — queryable immediately in Athena.</p>
<h3>Glue ETL Jobs</h3>
<p>Glue ETL Jobs run PySpark or Python (shell) scripts on a managed cluster. Key concepts:</p>
<ul>
  <li><strong>DPU (Data Processing Unit)</strong> — the billing unit. 1 DPU = 4 vCPUs, 16 GB RAM. Jobs are billed per DPU-second consumed.</li>
  <li><strong>Glue DynamicFrame</strong> — Glue's enhanced version of a Spark DataFrame. Handles schema inconsistencies across records (semi-structured data with varying schemas).</li>
  <li><strong>Job bookmarks</strong> — track which data has been processed. On rerun, only process new records since the last successful run (incremental ETL).</li>
</ul>` },
    { type: 'text', body: `<h3>Writing a Glue ETL Script</h3>
<pre><code>import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

args = getResolvedOptions(sys.argv, ['JOB_NAME'])
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Read from Glue Data Catalog (S3 via metadata)
raw = glueContext.create_dynamic_frame.from_catalog(
    database="datalake_raw", table_name="sales")

# Convert to Spark DataFrame for standard transformations
df = raw.toDF()

# Transform
df = df.filter(df['status'] == 'completed')
df = df.dropDuplicates(['order_id'])
df = df.withColumn('profit_margin', df['profit'] / df['sales'])

# Write to processed zone as Parquet
df.write.mode('overwrite').partitionBy('year', 'month').parquet(
    's3://my-lake/processed/sales/')

job.commit()</code></pre>` },
    { type: 'tip', body: `Use <strong>Glue job bookmarks</strong> for incremental ETL. On the first run, the bookmark is empty and the job processes all data. On subsequent runs, it tracks the high-water mark (last processed S3 path or timestamp) and only processes new data. This makes nightly ETL jobs run in minutes rather than hours by skipping already-processed files.` },
    { type: 'exercise', title: 'Create a Glue crawler and ETL job to process raw sales data', hint: 'Create a Glue service role, run a crawler on your raw zone, write a PySpark ETL script to filter and convert to Parquet', solution: `# 1. Create Glue service role in IAM with:
#    - AWSGlueServiceRole (managed policy)
#    - AmazonS3FullAccess (or scoped bucket policy)

# 2. Via Glue Console: Crawlers → Add crawler
#    Source: s3://my-lake/raw/sales/ → Database: datalake_raw
#    Run crawler → verify table appears in catalog

# 3. Glue Console: Jobs → Add job → PySpark script → paste:
import sys
from awsglue.context import GlueContext
from awsglue.job import Job
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext

args = getResolvedOptions(sys.argv, ['JOB_NAME'])
sc = SparkContext()
gc = GlueContext(sc)
job = Job(gc); job.init(args['JOB_NAME'], args)

df = gc.create_dynamic_frame.from_catalog(
    database='datalake_raw', table_name='sales').toDF()

clean = df.filter(df.status == 'completed').dropDuplicates(['order_id'])
clean.write.mode('overwrite').parquet('s3://my-lake/processed/sales/')
job.commit()

# 4. Run the job → monitor in Glue Console → verify Parquet files in processed zone` }
  ]
};

L['aws-w3-l2'] = {
  title: 'Amazon Athena — Serverless SQL on S3',
  sections: [
    { type: 'text', body: `<h2>What is Amazon Athena?</h2>
<p>Amazon Athena is a serverless interactive query service that lets you query data directly in S3 using standard SQL — no servers to provision, no ETL required. You pay only for the data scanned per query ($5 per TB). Athena is powered by Presto (now Trino) under the hood.</p>
<h3>How Athena Works</h3>
<ol>
  <li>Your data lives in S3 (CSV, JSON, Parquet, ORC, Avro, compressed files).</li>
  <li>You define a table in the Glue Data Catalog pointing to the S3 location.</li>
  <li>You run SQL in the Athena console or via API.</li>
  <li>Athena reads the data from S3, executes the query in a distributed cluster, and writes results to a designated S3 output bucket.</li>
  <li>You view results immediately or retrieve them from S3.</li>
</ol>
<h3>Setting Up Athena</h3>
<pre><code># First-time setup: set query results location
# Athena Console → Settings → Query result location → s3://my-bucket/athena-results/

# Create a database (if not already in Glue catalog)
CREATE DATABASE IF NOT EXISTS datalake_db;

-- Create a table pointing to S3 Parquet files
CREATE EXTERNAL TABLE datalake_db.sales (
  order_id STRING,
  order_date DATE,
  region STRING,
  category STRING,
  sales DOUBLE,
  profit DOUBLE
)
PARTITIONED BY (year INT, month INT)
STORED AS PARQUET
LOCATION 's3://my-lake/processed/sales/';

-- Load partition metadata
MSCK REPAIR TABLE datalake_db.sales;</code></pre>` },
    { type: 'text', body: `<h3>Querying Data</h3>
<pre><code>-- Basic aggregation
SELECT region, SUM(sales) as total_sales, AVG(profit/sales) as avg_margin
FROM datalake_db.sales
WHERE year = 2024
GROUP BY region
ORDER BY total_sales DESC;

-- Partition pruning — reads only year=2024 partitions (fast, cheap)
SELECT * FROM datalake_db.sales WHERE year = 2024 AND month = 3;

-- Join across two S3 tables
SELECT p.category, SUM(s.sales) as revenue
FROM datalake_db.sales s
JOIN datalake_db.products p ON s.product_id = p.product_id
WHERE s.year = 2024
GROUP BY p.category;</code></pre>
<h3>Querying from Python with boto3</h3>
<pre><code>import boto3, time, pandas as pd
from io import StringIO

athena = boto3.client('athena', region_name='ap-south-1')
s3 = boto3.client('s3')

# Start query
response = athena.start_query_execution(
    QueryString="SELECT region, SUM(sales) FROM datalake_db.sales WHERE year=2024 GROUP BY region",
    QueryExecutionContext={'Database': 'datalake_db'},
    ResultConfiguration={'OutputLocation': 's3://my-bucket/athena-results/'}
)
execution_id = response['QueryExecutionId']

# Wait for completion
while True:
    status = athena.get_query_execution(QueryExecutionId=execution_id)['QueryExecution']['Status']['State']
    if status in ['SUCCEEDED', 'FAILED', 'CANCELLED']: break
    time.sleep(2)

# Read results
result_file = f"athena-results/{execution_id}.csv"
obj = s3.get_object(Bucket='my-bucket', Key=result_file)
df = pd.read_csv(obj['Body'])
print(df)</code></pre>` },
    { type: 'tip', body: `<strong>Use Parquet + partitioning to reduce Athena costs by 95%+.</strong> A 100 GB CSV scans 100 GB at $0.50/query. The same data in Parquet scans 5–10 GB (columnar compression). Add date partitioning and a WHERE year=2024 filter — Athena reads only 1 month of data instead of 5 years. A query that cost $0.50 on CSV can cost $0.002 on partitioned Parquet.` },
    { type: 'text', body: `<h3>Athena Federated Query</h3>
<p>Athena can query data sources beyond S3 using Lambda-based connectors. Query RDS, DynamoDB, Redshift, CloudWatch Logs, DocumentDB, and even on-premises JDBC sources directly from Athena SQL — joining them with S3 data in a single query.</p>
<pre><code>-- Join S3 data with RDS data (via federated connector)
SELECT s.order_id, c.customer_name, s.sales
FROM datalake_db.sales s
JOIN lambda:rds_connector.customers c ON s.customer_id = c.id
WHERE s.year = 2024;</code></pre>
<h3>Athena for ML</h3>
<p>Athena integrates with SageMaker via the <strong>Athena ML</strong> feature — invoke a SageMaker endpoint directly from a SQL query:</p>
<pre><code>-- Score every customer using a deployed SageMaker model
SELECT customer_id, age, spend,
  ML_PREDICT(USING FUNCTION predict_churn(age INT, spend DOUBLE)
  RETURNS DOUBLE TYPE SAGEMAKER_INVOKE_ENDPOINT
  WITH (sagemaker_endpoint = 'churn-endpoint-v2'))(age, spend) as churn_score
FROM datalake_db.customers;</code></pre>` },
    { type: 'exercise', title: 'Run partitioned Athena queries and measure cost savings', hint: 'Create a partitioned Parquet table, run a query with and without partition filter, compare data scanned', solution: `-- 1. Create partitioned table
CREATE EXTERNAL TABLE datalake_db.sales_partitioned (
  order_id STRING, region STRING, category STRING,
  sales DOUBLE, profit DOUBLE
)
PARTITIONED BY (year INT, month INT)
STORED AS PARQUET
LOCATION 's3://my-lake/processed/sales/';

MSCK REPAIR TABLE datalake_db.sales_partitioned;

-- 2. Query WITHOUT partition filter (expensive — scans all years)
SELECT SUM(sales) FROM datalake_db.sales_partitioned;
-- Note the "Data scanned" value in Athena results

-- 3. Query WITH partition filter (cheap — reads only one month)
SELECT SUM(sales) FROM datalake_db.sales_partitioned
WHERE year = 2024 AND month = 3;
-- Compare data scanned — should be 10-100x less

-- 4. From Python: use PyAthena for easier querying
-- pip install pyathena
from pyathena import connect
conn = connect(s3_staging_dir='s3://my-bucket/athena-results/', region_name='ap-south-1')
df = pd.read_sql("SELECT * FROM datalake_db.sales_partitioned WHERE year=2024 LIMIT 100", conn)
print(df.head())` }
  ]
};

L['aws-w3-l3'] = {
  title: 'Amazon EMR — Spark & Hadoop Clusters on AWS',
  sections: [
    { type: 'text', body: `<h2>What is Amazon EMR?</h2>
<p>Amazon EMR (Elastic MapReduce) is a managed cluster platform for running distributed data processing frameworks — Apache Spark, Hadoop, Hive, Presto, Flink, HBase — on AWS. It provisions EC2 instances, installs the frameworks, and manages cluster lifecycle. You bring the code; EMR handles the infrastructure.</p>
<h3>EMR Architecture</h3>
<ul>
  <li><strong>Primary node</strong> — runs cluster management, YARN ResourceManager, and Spark master. Coordinates all work.</li>
  <li><strong>Core nodes</strong> — persistent worker nodes. Run YARN NodeManager and DataNode (HDFS storage). Cannot be removed without risking data loss on HDFS.</li>
  <li><strong>Task nodes</strong> — worker nodes for compute only, no HDFS storage. Can be Spot Instances — if interrupted, work is rescheduled on other nodes with no data loss.</li>
</ul>
<h3>EMR Storage Options</h3>
<ul>
  <li><strong>HDFS</strong> — on-cluster distributed filesystem. Fast for iterative algorithms (data stays in cluster memory/disk). Lost when cluster terminates.</li>
  <li><strong>EMRFS (S3)</strong> — use S3 as the data layer instead of HDFS. Persistent beyond cluster lifetime. The recommended approach: store input and output in S3, terminate the cluster when done. S3 + transient cluster = lowest cost.</li>
</ul>` },
    { type: 'text', body: `<h3>Submitting a Spark Job to EMR</h3>
<pre><code># Launch a transient cluster, run a Spark step, and auto-terminate
aws emr create-cluster \
  --name "sales-etl-cluster" \
  --release-label emr-6.15.0 \
  --applications Name=Spark Name=Hadoop \
  --instance-groups '[
    {"InstanceRole":"MASTER","InstanceType":"m5.xlarge","InstanceCount":1},
    {"InstanceRole":"CORE","InstanceType":"m5.xlarge","InstanceCount":2},
    {"InstanceRole":"TASK","InstanceType":"m5.xlarge","InstanceCount":4,
     "Market":"SPOT","BidPrice":"0.10"}
  ]' \
  --steps '[{
    "Type":"Spark",
    "Name":"SalesETL",
    "ActionOnFailure":"TERMINATE_CLUSTER",
    "Args":["--deploy-mode","cluster","s3://my-bucket/scripts/etl.py"]
  }]' \
  --auto-terminate \
  --service-role EMR_DefaultRole \
  --ec2-attributes KeyName=my-key,InstanceProfile=EMR_EC2_DefaultRole \
  --region ap-south-1</code></pre>
<h3>PySpark on EMR</h3>
<pre><code># etl.py — stored in S3, run as an EMR step
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum as spark_sum, year, month

spark = SparkSession.builder.appName("SalesETL").getOrCreate()

# Read from S3 (EMRFS)
df = spark.read.parquet("s3://my-lake/raw/sales/")

# Transform
clean = (df
  .filter(col('status') == 'completed')
  .withColumn('year', year(col('order_date')))
  .withColumn('month', month(col('order_date')))
  .groupBy('region', 'category', 'year', 'month')
  .agg(spark_sum('sales').alias('total_sales'))
)

# Write back to S3 as partitioned Parquet
clean.write.mode('overwrite').partitionBy('year', 'month').parquet(
    "s3://my-lake/processed/sales_agg/")
spark.stop()</code></pre>` },
    { type: 'tip', body: `Use <strong>transient clusters</strong> for cost efficiency: launch → run job → auto-terminate. A cluster sitting idle costs money. For interactive development, use <strong>EMR Studio</strong> (managed Jupyter on EMR) or <strong>EMR Serverless</strong> which bills only for actual compute used during job execution with no idle time — even cheaper than transient clusters for sporadic workloads.` },
    { type: 'text', body: `<h3>EMR Serverless</h3>
<p>EMR Serverless removes cluster management entirely. Submit Spark or Hive jobs; AWS automatically provisions compute, runs the job, and deallocates resources. You pay only for vCPU-seconds and GB-seconds of memory used during job execution — no idle instance costs.</p>
<pre><code># Submit a job to EMR Serverless via CLI
aws emr-serverless start-job-run \
  --application-id "APP_ID" \
  --execution-role-arn "arn:aws:iam::ACCOUNT:role/EMRServerlessRole" \
  --job-driver '{
    "sparkSubmit": {
      "entryPoint": "s3://my-bucket/scripts/etl.py",
      "sparkSubmitParameters": "--conf spark.executor.memory=4g --conf spark.executor.cores=2"
    }
  }' \
  --configuration-overrides '{
    "monitoringConfiguration": {
      "s3MonitoringConfiguration": {"logUri": "s3://my-bucket/emr-logs/"}
    }
  }'</code></pre>` },
    { type: 'exercise', title: 'Run a PySpark word count on EMR Serverless', hint: 'Create an EMR Serverless application, upload a PySpark script to S3, submit the job, and check output', solution: `# 1. Upload PySpark script to S3
# wordcount.py:
from pyspark.sql import SparkSession
spark = SparkSession.builder.appName("WordCount").getOrCreate()
lines = spark.read.text("s3://my-bucket/input/text.txt")
words = lines.selectExpr("explode(split(value, ' ')) as word")
counts = words.groupBy("word").count().orderBy("count", ascending=False)
counts.write.mode("overwrite").csv("s3://my-bucket/output/wordcount/")
spark.stop()

# 2. EMR Console → EMR Serverless → Create application → Spark → name "wordcount-app"
# 3. Submit job:
aws emr-serverless start-job-run \
  --application-id "YOUR_APP_ID" \
  --execution-role-arn "arn:aws:iam::ACCOUNT:role/EMRServerlessRole" \
  --job-driver '{"sparkSubmit":{"entryPoint":"s3://my-bucket/scripts/wordcount.py"}}'

# 4. Monitor: aws emr-serverless get-job-run --application-id APP_ID --job-run-id JOB_ID
# 5. Check results: aws s3 ls s3://my-bucket/output/wordcount/` }
  ]
};

L['aws-w3-l4'] = {
  title: 'AWS Lambda — Serverless Functions for Data Transforms',
  sections: [
    { type: 'text', body: `<h2>What is AWS Lambda?</h2>
<p>AWS Lambda runs code in response to events — without provisioning or managing servers. You write a function (Python, Node.js, Java, Go, etc.), Lambda handles execution environment, scaling, and infrastructure. You pay only for compute time consumed (per 1ms of execution) and the number of requests.</p>
<h3>Lambda Limits</h3>
<ul>
  <li><strong>Maximum execution time</strong>: 15 minutes per invocation.</li>
  <li><strong>Memory</strong>: 128 MB to 10 GB (vCPU scales proportionally).</li>
  <li><strong>Ephemeral storage</strong>: /tmp directory up to 10 GB.</li>
  <li><strong>Deployment package</strong>: 50 MB zipped, 250 MB unzipped. For larger dependencies, use Lambda Layers or container images (up to 10 GB).</li>
  <li><strong>Concurrency</strong>: up to 1,000 concurrent executions per Region (soft limit, can be raised).</li>
</ul>
<h3>Lambda for Data Science Use Cases</h3>
<ul>
  <li>Trigger a Glue ETL job when a new file arrives in S3.</li>
  <li>Validate and clean small data files on arrival before landing in the data lake.</li>
  <li>Invoke a SageMaker endpoint for real-time inference in a microservice architecture.</li>
  <li>Transform Kinesis stream records before loading to a destination.</li>
  <li>Scheduled data quality checks (EventBridge cron → Lambda → alert).</li>
</ul>` },
    { type: 'text', body: `<h3>S3-Triggered Lambda</h3>
<pre><code>import json, boto3, pandas as pd
from io import StringIO

s3 = boto3.client('s3')

def lambda_handler(event, context):
    # Get bucket and key from the S3 event
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    # Read the uploaded CSV
    obj = s3.get_object(Bucket=bucket, Key=key)
    df = pd.read_csv(obj['Body'])

    # Validate
    required_cols = ['order_id', 'sales', 'region']
    missing = [c for c in required_cols if c not in df.columns]
    if missing:
        raise ValueError(f"Missing columns: {missing}")

    # Clean
    df = df.dropna(subset=['order_id', 'sales'])
    df['sales'] = df['sales'].clip(lower=0)

    # Write to processed zone
    output_key = key.replace('raw/', 'processed/').replace('.csv', '.parquet')
    buffer = df.to_parquet(index=False)
    s3.put_object(Bucket=bucket, Key=output_key, Body=buffer)

    return {'statusCode': 200, 'processed_rows': len(df)}</code></pre>
<h3>Adding Dependencies</h3>
<p>pandas and other data science libraries are not pre-installed in Lambda. Options:</p>
<ul>
  <li><strong>Lambda Layers</strong> — a zip archive of pre-built packages shared across functions. AWS publishes AWSSDKPandas (formerly AWS Data Wrangler) as a public layer — includes pandas, numpy, pyarrow, boto3.</li>
  <li><strong>Container image</strong> — package your function + all dependencies in a Docker image. Upload to ECR, deploy as a container Lambda. Supports images up to 10 GB.</li>
</ul>` },
    { type: 'tip', body: `Use the <strong>AWS SDK for Pandas (awswrangler)</strong> Lambda layer — it ships with pandas, numpy, pyarrow, and tight AWS service integrations in a pre-built layer. It simplifies reading/writing S3, Athena, Redshift, DynamoDB, and Glue Catalog in just a few lines: <code>import awswrangler as wr; df = wr.s3.read_parquet("s3://bucket/key/")</code>. Faster than using boto3 directly for data operations.` },
    { type: 'text', body: `<h3>Lambda + SageMaker Inference</h3>
<pre><code>import boto3, json

runtime = boto3.client('sagemaker-runtime', region_name='ap-south-1')

def lambda_handler(event, context):
    # event contains customer features from API Gateway
    features = event['features']  # e.g. [34, 24, 4500.50]

    # Invoke SageMaker endpoint
    response = runtime.invoke_endpoint(
        EndpointName='churn-predictor-v2',
        ContentType='application/json',
        Body=json.dumps({'instances': [features]})
    )

    result = json.loads(response['Body'].read())
    churn_probability = result['predictions'][0]['score']

    return {
        'statusCode': 200,
        'churn_probability': churn_probability,
        'risk_level': 'HIGH' if churn_probability > 0.6 else 'MEDIUM' if churn_probability > 0.3 else 'LOW'
    }</code></pre>` },
    { type: 'exercise', title: 'Create an S3-triggered Lambda that validates and transforms data', hint: 'Write a Lambda function, add the AWSSDKPandas layer, configure S3 event trigger, and test with a CSV upload', solution: `# Lambda function code (Python 3.11):
import awswrangler as wr
import boto3

def lambda_handler(event, context):
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    if not key.endswith('.csv') or not key.startswith('raw/'):
        return {'skipped': True}

    df = wr.s3.read_csv(f"s3://{bucket}/{key}")

    # Validate
    assert 'order_id' in df.columns, "Missing order_id"
    df = df.dropna(subset=['order_id'])

    # Write processed Parquet
    out_key = key.replace('raw/', 'processed/').replace('.csv', '')
    wr.s3.to_parquet(df, path=f"s3://{bucket}/{out_key}/", dataset=True)

    return {'rows': len(df), 'output': out_key}

# Setup:
# 1. Lambda Console → Create function → Python 3.11 → name "s3-data-validator"
# 2. Layers → Add layer → AWS-provided → AWSSDKPandas
# 3. IAM role: add S3 read+write permissions
# 4. S3 → your bucket → Properties → Event notifications → Add:
#    Event type: s3:ObjectCreated:* → Prefix: raw/ → Destination: Lambda → select function
# 5. Upload a CSV to raw/ → check CloudWatch logs for function output` }
  ]
};

L['aws-w3-l5'] = {
  title: 'AWS Glue DataBrew — No-Code Data Preparation',
  sections: [
    { type: 'text', body: `<h2>What is AWS Glue DataBrew?</h2>
<p>AWS Glue DataBrew is a visual, no-code data preparation tool that lets data analysts and scientists clean and normalise data using a point-and-click interface — without writing PySpark or Python code. DataBrew profiles your data, identifies quality issues, and lets you apply 250+ pre-built transformations through a visual recipe.</p>
<h3>Core DataBrew Concepts</h3>
<ul>
  <li><strong>Dataset</strong> — a connection to a data source: S3 file, Glue Data Catalog table, RDS, Redshift, or a file uploaded directly. DataBrew samples the first 500 rows for the interactive preview.</li>
  <li><strong>Project</strong> — an interactive workspace that combines a dataset with a recipe. This is where you explore data and build transformations visually.</li>
  <li><strong>Recipe</strong> — an ordered list of transformation steps. Every action you take in the project UI is recorded as a recipe step. Recipes are reusable — apply the same recipe to new monthly data files.</li>
  <li><strong>Job</strong> — runs a recipe against the full dataset (not just the sample). Outputs clean data to S3 in CSV, JSON, or Parquet format. Can be scheduled to run on a trigger or on a cron schedule.</li>
  <li><strong>Data profile</strong> — an automated statistical analysis: missing values, distinct counts, min/max, data type inferences, correlations, and outlier detection. Runs as a separate job.</li>
</ul>` },
    { type: 'text', body: `<h3>The Data Profiling Workflow</h3>
<ol>
  <li>Create a Dataset → point to your S3 CSV or Parquet file.</li>
  <li>Create a Profile Job → runs statistical analysis on the full dataset.</li>
  <li>View the Profile results: column-level statistics, missing value %, data type, value distribution histogram, and correlation matrix.</li>
  <li>Use the profile to identify which columns need cleaning before building your recipe.</li>
</ol>
<h3>Common DataBrew Transformations</h3>
<ul>
  <li><strong>Handle missing values</strong>: delete rows with nulls, fill with mean/median/mode, fill with a custom value, or flag nulls in a new boolean column.</li>
  <li><strong>Remove duplicates</strong>: deduplicate on selected key columns.</li>
  <li><strong>Change data types</strong>: convert text to date, number to string, etc.</li>
  <li><strong>Normalise / Standardise</strong>: min-max scaling, z-score standardisation — built-in, no code needed.</li>
  <li><strong>Encode categoricals</strong>: one-hot encoding, label encoding.</li>
  <li><strong>Date extraction</strong>: extract year, month, day, day of week, is_weekend from a date column.</li>
  <li><strong>Text cleaning</strong>: trim whitespace, remove special characters, uppercase/lowercase, regex replace.</li>
  <li><strong>Outlier handling</strong>: remove or clip values beyond N standard deviations or IQR thresholds.</li>
</ul>` },
    { type: 'tip', body: `Run a <strong>DataBrew Profile Job</strong> on every new dataset before any transformation work. The profile takes minutes and shows: percentage of missing values per column, unique value counts (useful for detecting high-cardinality columns), data type mismatches, and value distributions. It replaces hours of exploratory pandas code and gives you a shareable HTML report for stakeholder sign-off on data quality.` },
    { type: 'text', body: `<h3>DataBrew vs Glue ETL — When to Use Each</h3>
<table>
  <tr><th>Scenario</th><th>DataBrew</th><th>Glue ETL</th></tr>
  <tr><td>First-time data exploration</td><td>✓ Visual profiling</td><td>—</td></tr>
  <tr><td>Analyst with no coding background</td><td>✓ No-code UI</td><td>—</td></tr>
  <tr><td>Simple cleaning (nulls, types, dedup)</td><td>✓ Fast</td><td>✓ Overkill</td></tr>
  <tr><td>Complex joins across multiple datasets</td><td>— Limited</td><td>✓ PySpark</td></tr>
  <tr><td>Custom business logic / ML transforms</td><td>— No custom code</td><td>✓ Full Python</td></tr>
  <tr><td>Scheduled repeatable ETL pipeline</td><td>✓ Recipe jobs</td><td>✓ More flexible</td></tr>
  <tr><td>Multi-terabyte data at scale</td><td>— Has limits</td><td>✓ MPP Spark</td></tr>
</table>
<p>In practice: use DataBrew for the initial data quality assessment and simple cleaning; graduate to Glue ETL jobs when the transformation logic exceeds what the DataBrew UI can express.</p>` },
    { type: 'exercise', title: 'Profile a dataset and build a DataBrew cleaning recipe', hint: 'Create a DataBrew dataset from S3, run a profile job, build a recipe to handle nulls and standardise a numeric column, run the recipe job', solution: `1. DataBrew Console → Datasets → Create dataset
   Name: "raw-sales" → Source: Amazon S3 → select s3://my-lake/raw/sales/sales.csv → Create.

2. Projects → Create project
   Name: "sales-cleaning" → Dataset: raw-sales → Create new recipe → IAM role → Create.

3. In the DataBrew project grid:
   a. Click "sales" column header → Missing values → Fill with mode.
   b. Click "order_date" column → Change type → Date → format MM/DD/YYYY.
   c. Click "sales" column → Normalise → Min-Max scaling (0–1 range).
   d. Remove "internal_notes" column (irrelevant).

4. Profile Job → Create profile job → Name: "sales-profile" → Full dataset → S3 output → Run.
   View profile: note missing value % per column, value distributions.

5. Recipe Job → Publish recipe → Create job → Name: "sales-clean-job"
   Output: s3://my-lake/processed/sales/ → Format: Parquet → Run.

6. Check processed zone: aws s3 ls s3://my-lake/processed/sales/` }
  ]
};


/* ─── MODULE 4 — Machine Learning with Amazon SageMaker ─────────────────── */

L['aws-w4-l1'] = {
  title: 'Amazon SageMaker Studio — Unified ML IDE',
  sections: [
    { type: 'text', body: `<h2>What is Amazon SageMaker Studio?</h2>
<p>Amazon SageMaker Studio is a web-based, fully integrated development environment (IDE) for machine learning. It brings together every SageMaker capability — notebooks, training jobs, experiments, model registry, pipelines, feature store, and monitoring — into a single interface accessible from a browser.</p>
<h3>SageMaker Studio Components</h3>
<ul>
  <li><strong>Studio Notebooks</strong> — Jupyter-compatible notebooks running on dedicated persistent storage (EFS). Unlike local notebooks, the kernel runs on a managed EC2 instance (configurable: ml.t3.medium through ml.p4d.24xlarge). You can switch instance type mid-session without losing work.</li>
  <li><strong>Launcher</strong> — the home page. Launch notebooks, open terminals, access JumpStart, view running instances.</li>
  <li><strong>SageMaker JumpStart</strong> — a model hub with pre-built ML solutions and foundation models (Llama 2, Stable Diffusion, Hugging Face models) that can be deployed to a SageMaker endpoint in a few clicks.</li>
  <li><strong>Canvas</strong> — no-code AutoML tool for business analysts. Upload data, select target column, AutoML trains and evaluates models, generates predictions.</li>
</ul>` },
    { type: 'text', body: `<h3>Setting Up SageMaker Studio</h3>
<pre><code># SageMaker Studio uses a Domain (per-account/VPC) and User Profiles
# Setup via Console: SageMaker → Domains → Create Domain
# Or via CLI:
aws sagemaker create-domain \
  --domain-name "my-ml-domain" \
  --auth-mode IAM \
  --default-user-settings '{"ExecutionRole":"arn:aws:iam::ACCOUNT:role/SageMakerStudioRole"}' \
  --subnet-ids subnet-xxxx \
  --vpc-id vpc-xxxx

# Create a user profile
aws sagemaker create-user-profile \
  --domain-id "DOMAIN_ID" \
  --user-profile-name "data-scientist-1"</code></pre>
<h3>SageMaker SDK Basics</h3>
<pre><code>import sagemaker
from sagemaker import Session, get_execution_role

session = Session()
role = get_execution_role()
bucket = session.default_bucket()
region = session.boto_region_name

print(f"Role: {role}")
print(f"Bucket: {bucket}")
print(f"Region: {region}")

# Upload training data to S3
import boto3
s3 = boto3.client('s3')
s3.upload_file('train.csv', bucket, 'data/train.csv')
train_input = f"s3://{bucket}/data/train.csv"</code></pre>` },
    { type: 'tip', body: `Create a <strong>SageMaker Lifecycle Configuration</strong> to auto-install packages when a notebook kernel starts. Add pip installs, conda installs, or custom setup scripts that run every time a user opens a notebook — so every team member gets a consistent environment without manual setup. This also pre-warms expensive GPU kernels so the first cell runs immediately.` },
    { type: 'text', body: `<h3>SageMaker Studio vs Local Jupyter</h3>
<table>
  <tr><th>Feature</th><th>Local Jupyter</th><th>SageMaker Studio</th></tr>
  <tr><td>Instance type</td><td>Fixed (your laptop/server)</td><td>Choose per notebook (CPU→GPU)</td></tr>
  <tr><td>Persistent storage</td><td>Local disk</td><td>Amazon EFS (shared, persists)</td></tr>
  <tr><td>Training at scale</td><td>Limited to local RAM/CPU</td><td>Managed training jobs on any instance</td></tr>
  <tr><td>Experiment tracking</td><td>Manual (MLflow etc.)</td><td>Built-in SageMaker Experiments</td></tr>
  <tr><td>Model deployment</td><td>Flask/FastAPI yourself</td><td>One-line endpoint deployment</td></tr>
  <tr><td>Cost</td><td>Flat (always running)</td><td>Pay per use (stop kernels when idle)</td></tr>
</table>` },
    { type: 'exercise', title: 'Launch a SageMaker Studio notebook and explore the SDK', hint: 'Create a Studio domain, add a user profile, launch a notebook on ml.t3.medium, run SageMaker SDK to list S3 default bucket', solution: `# In a SageMaker Studio notebook (ml.t3.medium kernel):
import sagemaker, boto3

session = sagemaker.Session()
role = sagemaker.get_execution_role()
print("Execution role ARN:", role)
print("Default bucket:", session.default_bucket())
print("Region:", session.boto_region_name)

# List training jobs in this account
sm = boto3.client('sagemaker')
jobs = sm.list_training_jobs(MaxResults=5)
for j in jobs['TrainingJobSummaries']:
    print(j['TrainingJobName'], j['TrainingJobStatus'])

# Upload a sample dataset
import pandas as pd
df = pd.DataFrame({'x': range(100), 'y': [i*2+1 for i in range(100)]})
df.to_csv('/tmp/train.csv', index=False)
s3_path = session.upload_data('/tmp/train.csv', key_prefix='demo/data')
print("Uploaded to:", s3_path)` }
  ]
};

L['aws-w4-l2'] = {
  title: 'Built-in Algorithms & SageMaker Training Jobs',
  sections: [
    { type: 'text', body: `<h2>SageMaker Built-in Algorithms</h2>
<p>SageMaker ships with optimised, distributed implementations of 17+ ML algorithms — no framework to install, no code to write for the algorithm itself. You configure hyperparameters, point to data in S3, and SageMaker trains on managed EC2 at any scale. Built-in algorithms run in optimised Docker containers and support multi-instance distributed training out of the box.</p>
<h3>Key Built-in Algorithms</h3>
<ul>
  <li><strong>XGBoost</strong> — gradient-boosted trees for tabular data. Most-used built-in. Supports CSV and LibSVM from S3, distributed across multiple instances.</li>
  <li><strong>Linear Learner</strong> — linear/logistic regression with L1/L2 regularisation. Very fast, good for baselines.</li>
  <li><strong>K-Means</strong> — clustering. Mini-batch implementation scales to billions of points.</li>
  <li><strong>Random Cut Forest (RCF)</strong> — unsupervised anomaly detection for time series and tabular data.</li>
  <li><strong>BlazingText</strong> — word2vec and text classification at scale. Trains on billions of tokens on a single instance.</li>
  <li><strong>DeepAR</strong> — probabilistic time-series forecasting using RNN. Trains a single model across many related time series simultaneously.</li>
  <li><strong>Image Classification / Object Detection</strong> — CV algorithms using ResNet/SSD, trainable on GPU clusters.</li>
</ul>` },
    { type: 'text', body: `<h3>Running a Training Job with XGBoost</h3>
<pre><code>import sagemaker
from sagemaker.inputs import TrainingInput
from sagemaker.estimator import Estimator

session = sagemaker.Session()
role = sagemaker.get_execution_role()
bucket = session.default_bucket()
region = session.boto_region_name

# Get XGBoost container URI
container = sagemaker.image_uris.retrieve(
    framework='xgboost', region=region, version='1.7-1')

# Define the Estimator
xgb = Estimator(
    image_uri=container,
    role=role,
    instance_count=1,
    instance_type='ml.m5.xlarge',
    output_path=f's3://{bucket}/models/',
    sagemaker_session=session
)

# Set hyperparameters
xgb.set_hyperparameters(
    max_depth=5, eta=0.2, gamma=4, min_child_weight=6,
    subsample=0.8, objective='binary:logistic',
    num_round=100, eval_metric='auc'
)

# Define S3 data channels
train_input = TrainingInput(f's3://{bucket}/data/train/', content_type='text/csv')
val_input   = TrainingInput(f's3://{bucket}/data/val/',   content_type='text/csv')

# Launch the training job
xgb.fit({'train': train_input, 'validation': val_input})
print("Model artifact:", xgb.model_data)</code></pre>` },
    { type: 'tip', body: `Use <strong>Managed Spot Training</strong> to cut training costs by up to 90%. Add <code>use_spot_instances=True, max_wait=3600, max_run=1800</code> to your Estimator. SageMaker uses Spot EC2 instances and automatically resumes from the last checkpoint if the instance is interrupted — so you get the same result as on-demand training at a fraction of the cost.` },
    { type: 'text', body: `<h3>Bring Your Own Script — Script Mode</h3>
<p>For custom models (sklearn, TensorFlow, PyTorch), use Script Mode: write your training code in a Python script and pass it to a framework Estimator. SageMaker installs the framework in the container and runs your script.</p>
<pre><code"># train.py — your training script
import argparse, os, pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score
import joblib

parser = argparse.ArgumentParser()
parser.add_argument('--n-estimators', type=int, default=100)
parser.add_argument('--max-depth', type=int, default=5)
parser.add_argument('--train', type=str, default=os.environ['SM_CHANNEL_TRAIN'])
parser.add_argument('--model-dir', type=str, default=os.environ['SM_MODEL_DIR'])
args, _ = parser.parse_known_args()

df = pd.read_csv(os.path.join(args.train, 'train.csv'))
X, y = df.drop('target', axis=1), df['target']

model = RandomForestClassifier(n_estimators=args.n_estimators, max_depth=args.max_depth)
model.fit(X, y)
print("Train AUC:", roc_auc_score(y, model.predict_proba(X)[:,1]))
joblib.dump(model, os.path.join(args.model_dir, 'model.joblib'))

# ────────────────────────────────────────────────────────────
# In notebook — launch the training job:
from sagemaker.sklearn.estimator import SKLearn

estimator = SKLearn(
    entry_point='train.py', role=role,
    instance_type='ml.m5.large', framework_version='1.2-1',
    hyperparameters={'n-estimators': 200, 'max-depth': 6}
)
estimator.fit({'train': train_input})</code></pre>` },
    { type: 'exercise', title: 'Train an XGBoost classifier on SageMaker using built-in algorithm', hint: 'Upload train/val CSVs to S3, configure an XGBoost Estimator, set hyperparameters, call fit(), check model artifact in S3', solution: `import sagemaker, boto3, pandas as pd
from sagemaker.inputs import TrainingInput
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split

session = sagemaker.Session()
role = sagemaker.get_execution_role()
bucket = session.default_bucket()

# Generate synthetic data
X, y = make_classification(n_samples=5000, n_features=20, random_state=42)
df = pd.DataFrame(X, columns=[f'f{i}' for i in range(20)])
df.insert(0, 'target', y)  # XGBoost built-in needs label in col 0

train_df, val_df = train_test_split(df, test_size=0.2, random_state=42)
train_df.to_csv('/tmp/train.csv', index=False, header=False)
val_df.to_csv('/tmp/val.csv', index=False, header=False)

s3 = boto3.client('s3')
s3.upload_file('/tmp/train.csv', bucket, 'xgb-demo/train/train.csv')
s3.upload_file('/tmp/val.csv', bucket, 'xgb-demo/val/val.csv')

container = sagemaker.image_uris.retrieve('xgboost', session.boto_region_name, '1.7-1')
xgb = sagemaker.estimator.Estimator(
    image_uri=container, role=role,
    instance_count=1, instance_type='ml.m5.xlarge',
    output_path=f's3://{bucket}/xgb-demo/output/')
xgb.set_hyperparameters(max_depth=5, eta=0.2, num_round=50,
    objective='binary:logistic', eval_metric='auc')
xgb.fit({'train': TrainingInput(f's3://{bucket}/xgb-demo/train/', content_type='text/csv'),
         'validation': TrainingInput(f's3://{bucket}/xgb-demo/val/', content_type='text/csv')})
print("Model:", xgb.model_data)` }
  ]
};

L['aws-w4-l3'] = {
  title: 'SageMaker Experiments & Debugger',
  sections: [
    { type: 'text', body: `<h2>SageMaker Experiments</h2>
<p>SageMaker Experiments is an experiment management tool built into SageMaker Studio. It automatically tracks training job metadata — hyperparameters, metrics, input data, and output artifacts — and lets you compare runs side-by-side to find the best model.</p>
<h3>How Experiments Work</h3>
<ul>
  <li><strong>Experiment</strong> — a logical grouping of related trials. E.g. "churn-prediction-v2".</li>
  <li><strong>Trial</strong> — a single training run within an experiment. Automatically created when you associate a training job with an experiment.</li>
  <li><strong>Trial Component</strong> — a processing step, training step, or transform step within a trial. Each component tracks: parameters, metrics, input artifacts, output artifacts.</li>
</ul>
<pre><code>import sagemaker
from sagemaker.experiments.run import Run

session = sagemaker.Session()

# Start an experiment run (wraps your training code)
with Run(experiment_name="churn-v2", run_name="xgb-depth5-eta02", sagemaker_session=session) as run:
    # Log parameters
    run.log_parameter("max_depth", 5)
    run.log_parameter("eta", 0.2)
    run.log_parameter("num_round", 100)

    # Train model (your training code here)
    # ...

    # Log metrics
    run.log_metric("train_auc", 0.94)
    run.log_metric("val_auc", 0.89)

    # Log artifacts
    run.log_artifact("model", "s3://bucket/models/model.tar.gz")</code></pre>` },
    { type: 'text', body: `<h3>Comparing Experiments in Studio</h3>
<p>In SageMaker Studio: Home → Experiments → open your experiment. All trials appear in a table with their hyperparameters and metrics. Select multiple trials → "Add chart" to plot metric comparison. Filter and sort by any metric to identify the best run.</p>
<h3>SageMaker Debugger</h3>
<p>SageMaker Debugger monitors training in real time — capturing tensors, detecting training issues, and providing automated analysis — without modifying your training code.</p>
<ul>
  <li><strong>Built-in rules</strong> — pre-written checks: vanishing gradient, exploding tensor, overfitting, poor weight initialisation, class imbalance, dead relu. SageMaker automatically stops the training job if a critical rule fires.</li>
  <li><strong>Tensor collections</strong> — specify which tensors to save (weights, gradients, activations, losses) at which intervals.</li>
  <li><strong>Profiler</strong> — CPU/GPU utilisation, data loading bottlenecks, framework overhead. Generates a Profiler Report identifying the largest time consumers.</li>
</ul>
<pre><code>from sagemaker.debugger import Rule, rule_configs, DebuggerHookConfig, CollectionConfig

rules = [
    Rule.sagemaker(rule_configs.vanishing_gradient()),
    Rule.sagemaker(rule_configs.overfit()),
    Rule.sagemaker(rule_configs.poor_weight_initialization())
]

hook_config = DebuggerHookConfig(
    s3_output_path=f"s3://{bucket}/debugger/",
    collection_configs=[
        CollectionConfig("losses", {"save_interval": "10"}),
        CollectionConfig("weights", {"save_interval": "50"})
    ]
)

estimator = sagemaker.estimator.Estimator(
    ..., rules=rules, debugger_hook_config=hook_config)
estimator.fit(inputs)</code></pre>` },
    { type: 'tip', body: `Enable the <strong>SageMaker Profiler</strong> on all GPU training jobs. The profiler report often reveals that 30–60% of GPU time is spent waiting for data — not computing. The fix is usually increasing DataLoader workers or switching to S3 Pipe Mode (streaming directly from S3 without download). Identifying and fixing data loading bottlenecks can cut training time in half.` },
    { type: 'exercise', title: 'Run two experiment trials with different hyperparameters and compare in Studio', hint: 'Create a Run for each trial, log hyperparameters and metrics, then open Studio Experiments tab to compare', solution: `import sagemaker
from sagemaker.experiments.run import Run
from sagemaker.sklearn.estimator import SKLearn
from sagemaker.inputs import TrainingInput

session = sagemaker.Session()
role = sagemaker.get_execution_role()
bucket = session.default_bucket()

configs = [
    {"n-estimators": 100, "max-depth": 3},
    {"n-estimators": 200, "max-depth": 6}
]

for cfg in configs:
    run_name = f"rf-e{cfg['n-estimators']}-d{cfg['max-depth']}"
    with Run(experiment_name="churn-rf-exp", run_name=run_name,
             sagemaker_session=session) as run:
        run.log_parameters(cfg)
        est = SKLearn(
            entry_point="train.py", role=role,
            instance_type="ml.m5.large", framework_version="1.2-1",
            hyperparameters=cfg
        )
        est.fit({"train": TrainingInput(f"s3://{bucket}/data/train/", content_type="text/csv")})
        # After training, log val AUC from training job metrics
        # run.log_metric("val_auc", get_val_auc(est))

# In Studio: Experiments → churn-rf-exp → select both trials → Compare
# Hyperparameter columns + metric columns side by side` }
  ]
};

L['aws-w4-l4'] = {
  title: 'Deploying Models — Real-Time & Batch Endpoints',
  sections: [
    { type: 'text', body: `<h2>Deployment Options in SageMaker</h2>
<p>After training, SageMaker offers multiple deployment patterns depending on your latency, throughput, and cost requirements:</p>
<ul>
  <li><strong>Real-Time Endpoint</strong> — a persistent HTTPS endpoint backed by one or more EC2 instances. Responds to inference requests in milliseconds. Best for: user-facing applications, fraud detection, recommendation APIs.</li>
  <li><strong>Batch Transform</strong> — run inference on an entire S3 dataset in one job, output predictions to S3. No persistent infrastructure. Best for: nightly scoring of millions of records, offline prediction pipelines.</li>
  <li><strong>Serverless Inference</strong> — endpoint that scales to zero when idle, cold-starts in seconds. Best for: infrequent traffic where idle cost matters.</li>
  <li><strong>Asynchronous Inference</strong> — submit large payloads (up to 1 GB) asynchronously; results written to S3 when complete. Best for: video analysis, document processing, long-running inference.</li>
</ul>` },
    { type: 'text', body: `<h3>Deploying a Real-Time Endpoint</h3>
<pre><code># Deploy immediately after training
predictor = xgb.deploy(
    initial_instance_count=1,
    instance_type='ml.m5.large',
    endpoint_name='churn-predictor-v1'
)

# Invoke the endpoint
import numpy as np
test_data = np.array([[0.5, 1.2, -0.3, 0.8, 0.1] * 4])  # 20 features
result = predictor.predict(test_data)
print("Prediction:", result)

# Delete endpoint when done (to stop billing)
predictor.delete_endpoint()</code></pre>
<h3>Deploying a Pre-Existing Model</h3>
<pre><code>from sagemaker.sklearn.model import SKLearnModel

# Load model from S3 artifact
model = SKLearnModel(
    model_data='s3://my-bucket/models/model.tar.gz',
    role=role,
    entry_point='inference.py',  # must define model_fn and predict_fn
    framework_version='1.2-1'
)

predictor = model.deploy(
    initial_instance_count=1,
    instance_type='ml.m5.large',
    endpoint_name='churn-sklearn-v1'
)

# inference.py (served alongside the model):
# def model_fn(model_dir):
#     return joblib.load(os.path.join(model_dir, 'model.joblib'))
# def predict_fn(input_data, model):
#     return model.predict_proba(input_data)</code></pre>` },
    { type: 'text', body: `<h3>Batch Transform</h3>
<pre><code># Run batch inference on 1M rows in S3
transformer = xgb.transformer(
    instance_count=1,
    instance_type='ml.m5.xlarge',
    output_path=f's3://{bucket}/predictions/',
    assemble_with='Line',
    accept='text/csv'
)

transformer.transform(
    data=f's3://{bucket}/data/test/',
    data_type='S3Prefix',
    content_type='text/csv',
    split_type='Line'
)
transformer.wait()

# Results in s3://bucket/predictions/test.csv.out</code></pre>
<h3>Auto Scaling</h3>
<p>Real-time endpoints support Application Auto Scaling — scale instance count up/down based on InvocationsPerInstance CloudWatch metric. Set a target of 100 invocations/instance and the endpoint automatically adds instances when traffic spikes.</p>` },
    { type: 'tip', body: `Use <strong>Multi-Model Endpoints (MME)</strong> when you have dozens or hundreds of similar models (e.g., one model per customer/store). MME hosts multiple model artifacts behind a single endpoint. Models are loaded into memory on the first request and cached for subsequent calls. Cost: you pay for one endpoint instance instead of N endpoints — 90%+ cost reduction for multi-tenant ML.` },
    { type: 'exercise', title: 'Deploy a trained model as a real-time endpoint and invoke it', hint: 'Call .deploy() on your trained estimator, invoke with test data, check prediction output, then delete the endpoint', solution: `# After training (xgb.fit() complete):
predictor = xgb.deploy(
    initial_instance_count=1,
    instance_type='ml.m5.large',
    endpoint_name='churn-xgb-demo'
)

# Test with a sample row (20 features, CSV format for XGBoost built-in)
import io
test_row = ",".join([str(x) for x in val_df.drop('target', axis=1).iloc[0]])
result = predictor.predict(test_row, initial_args={"ContentType": "text/csv"})
print("Prediction:", result)

# Check actual label
print("True label:", val_df['target'].iloc[0])

# Invoke via boto3 (production pattern)
import boto3, json
runtime = boto3.client('sagemaker-runtime')
resp = runtime.invoke_endpoint(
    EndpointName='churn-xgb-demo',
    ContentType='text/csv',
    Body=test_row
)
print("boto3 result:", resp['Body'].read().decode())

# Clean up — ALWAYS delete unused endpoints to avoid charges
predictor.delete_endpoint()
print("Endpoint deleted")` }
  ]
};

L['aws-w4-l5'] = {
  title: 'SageMaker Feature Store & Data Wrangler',
  sections: [
    { type: 'text', body: `<h2>SageMaker Feature Store</h2>
<p>Feature Store is a managed, purpose-built repository for ML features. It solves the feature reuse problem: teams independently compute the same features (e.g. "30-day purchase count") in different ways, leading to inconsistency between training and serving. Feature Store centralises feature definitions, ensures training/serving consistency, and enables cross-team feature sharing.</p>
<h3>Core Concepts</h3>
<ul>
  <li><strong>Feature Group</strong> — a named collection of related features (analogous to a table). Defined with an Entity ID column (e.g. customer_id) and a record timestamp.</li>
  <li><strong>Online Store</strong> — a low-latency key-value store backed by DynamoDB. Serves single-entity feature lookups in milliseconds for real-time inference. Example: fetch all features for customer_id=12345 in &lt;10ms.</li>
  <li><strong>Offline Store</strong> — a full historical feature record stored as Parquet in S3. Used for training data generation, point-in-time correct joins, and batch inference. Queryable via Athena.</li>
  <li><strong>Record</strong> — one row: entity_id + timestamp + feature values. Feature Store uses the timestamp for point-in-time correct queries — so training data reflects the feature values that would have been available at inference time, preventing data leakage.</li>
</ul>` },
    { type: 'text', body: `<h3>Creating and Ingesting a Feature Group</h3>
<pre><code>import sagemaker, boto3, pandas as pd, time
from sagemaker.feature_store.feature_group import FeatureGroup

session = sagemaker.Session()
role = sagemaker.get_execution_role()

# Feature data
df = pd.DataFrame({
    'customer_id': ['C001', 'C002', 'C003'],
    'age': [34, 28, 45],
    'purchase_count_30d': [12, 3, 27],
    'total_spend_30d': [450.5, 89.0, 1200.75],
    'event_time': [time.time(), time.time(), time.time()]
})
df['event_time'] = df['event_time'].astype('float64')

# Create Feature Group
fg = FeatureGroup(name='customer-features', sagemaker_session=session)
fg.load_feature_definitions(data_frame=df)
fg.create(
    s3_uri=f"s3://{session.default_bucket()}/feature-store/",
    record_identifier_name='customer_id',
    event_time_feature_name='event_time',
    role_arn=role,
    enable_online_store=True
)
time.sleep(30)  # wait for feature group to be active

# Ingest features
fg.ingest(data_frame=df, max_workers=3, wait=True)</code></pre>` },
    { type: 'text', body: `<h3>SageMaker Data Wrangler</h3>
<p>Data Wrangler is a visual data preparation tool in SageMaker Studio. Unlike DataBrew (which is standalone), Data Wrangler is ML-focused and outputs directly to SageMaker training pipelines.</p>
<ul>
  <li><strong>Import</strong> — connect to S3, Athena, Redshift, Feature Store, EMR, or Snowflake. Samples data for the UI.</li>
  <li><strong>Transform</strong> — 300+ transforms with a visual editor: handle missing values, encode categoricals, scale numerics, feature engineering (custom Pandas transform supported).</li>
  <li><strong>Analyse</strong> — built-in analysis tabs: histograms, scatter plots, target leakage detection, feature correlation, class imbalance, quick model (trains a simple model to estimate feature importance).</li>
  <li><strong>Export</strong> — one-click export to: a SageMaker Processing Job (generates clean dataset in S3), a SageMaker Pipeline step, a Feature Store ingestion job, or a Jupyter notebook with equivalent Pandas code.</li>
</ul>
<h3>Online Store Lookup for Inference</h3>
<pre><code>featurestore_runtime = boto3.client('sagemaker-featurestore-runtime')

# Fetch features for a single customer at inference time
record = featurestore_runtime.get_record(
    FeatureGroupName='customer-features',
    RecordIdentifierValueAsString='C001'
)['Record']

features = {f['FeatureName']: f['ValueAsString'] for f in record}
print(features)  # {'customer_id': 'C001', 'age': '34', ...}</code></pre>` },
    { type: 'exercise', title: 'Create a Feature Group, ingest records, and query the offline store', hint: 'Define a feature group with online+offline store, ingest a sample DataFrame, wait for offline sync, query via Athena', solution: `# (Assumes feature group 'customer-features' created above)
# Query offline store via Athena after ~15 min for data to sync

import awswrangler as wr

# Get the Athena table name from Feature Group
fg_desc = boto3.client('sagemaker').describe_feature_group(
    FeatureGroupName='customer-features')
offline_config = fg_desc['OfflineStoreConfig']
glue_table = fg_desc['OfflineStoreConfig']['DataCatalogConfig']['TableName']
glue_db = fg_desc['OfflineStoreConfig']['DataCatalogConfig']['Database']

query = f"""
SELECT customer_id, age, purchase_count_30d, total_spend_30d
FROM "{glue_db}"."{glue_table}"
WHERE is_deleted = false
"""
df = wr.athena.read_sql_query(
    sql=query,
    database=glue_db,
    s3_output=f"s3://{session.default_bucket()}/athena-results/"
)
print(df)

# Point-in-time correct join for training:
# fg.athena_query() returns a helper for point-in-time joins
# to prevent data leakage in training datasets` }
  ]
};

/* ─── MODULE 5 — Data Pipelines & Streaming ─────────────────────────────── */

L['aws-w5-l1'] = {
  title: 'Amazon Kinesis — Real-Time Data Streaming',
  sections: [
    { type: 'text', body: `<h2>The Amazon Kinesis Family</h2>
<p>Amazon Kinesis is a suite of services for collecting, processing, and analysing real-time streaming data at any scale — clickstreams, IoT sensors, server logs, financial transactions, social media feeds.</p>
<ul>
  <li><strong>Kinesis Data Streams (KDS)</strong> — a durable, real-time data stream. Producers write records; multiple consumers read independently. Retention: 24 hours (default) to 365 days. You manage throughput by choosing the number of shards.</li>
  <li><strong>Kinesis Data Firehose</strong> — a fully managed, zero-code data delivery pipeline. Reads from KDS, HTTP endpoints, or MSK; buffers; and delivers to S3, Redshift, OpenSearch, Splunk, or a custom HTTP endpoint. No consumer code needed — configure, and data flows automatically.</li>
  <li><strong>Kinesis Data Analytics</strong> — run Apache Flink applications on streaming data without managing Flink infrastructure. Write Flink SQL or Java/Python Flink code; Analytics manages the cluster.</li>
  <li><strong>Kinesis Video Streams</strong> — purpose-built for streaming video from devices to AWS for ML analysis (SageMaker, Rekognition Video).</li>
</ul>` },
    { type: 'text', body: `<h3>Kinesis Data Streams Deep Dive</h3>
<p>A KDS stream is divided into <strong>shards</strong>. Each shard handles:</p>
<ul>
  <li>1,000 records/second write, up to 1 MB/s</li>
  <li>2 MB/s read (shared among all consumers on that shard)</li>
</ul>
<p>Records are distributed across shards by a partition key (hash). Records from the same partition key always land on the same shard — maintaining order for that key (e.g. all events for customer_id=12345 in order).</p>
<pre><code">import boto3, json, time

kinesis = boto3.client('kinesis', region_name='ap-south-1')

# Producer — write records
def put_record(stream_name, data, partition_key):
    kinesis.put_record(
        StreamName=stream_name,
        Data=json.dumps(data).encode('utf-8'),
        PartitionKey=partition_key
    )

for i in range(10):
    put_record(
        'clickstream-events',
        {'user_id': f'U{i%3}', 'event': 'page_view', 'ts': time.time()},
        f'U{i%3}'
    )
    time.sleep(0.1)</code></pre>
<pre><code">import boto3, json, time

kinesis = boto3.client('kinesis', region_name='ap-south-1')

# Consumer — read a shard
shard_iterator = kinesis.get_shard_iterator(
    StreamName='clickstream-events',
    ShardId='shardId-000000000000',
    ShardIteratorType='TRIM_HORIZON'
)['ShardIterator']

while True:
    resp = kinesis.get_records(ShardIterator=shard_iterator, Limit=10)
    for record in resp['Records']:
        data = json.loads(record['Data'])
        print(data)
    shard_iterator = resp['NextShardIterator']
    time.sleep(1)</code></pre>` },
    { type: 'tip', body: `Use <strong>Kinesis Data Firehose over KDS</strong> for simple S3/Redshift delivery — Firehose is zero-maintenance and handles buffering, compression, format conversion (JSON → Parquet), encryption, and retry automatically. KDS is for use cases where you need custom processing logic, multiple independent consumers, or sub-second latency. For ML feature pipelines that land enriched data in S3 for training, Firehose is almost always the right choice.` },
    { type: 'text', body: `<h3>Kinesis Data Firehose — Zero-Code Delivery</h3>
<pre><code"># Firehose delivery stream: KDS → Firehose → S3
# Configure via Console: Kinesis → Firehose → Create delivery stream
# Source: Kinesis Data Streams → clickstream-events
# Destination: Amazon S3 → s3://my-lake/raw/clickstream/
# Buffer: 5 MB or 300 seconds (whichever comes first)
# Compression: GZIP
# Format conversion: Record format conversion → Input: JSON → Output: Apache Parquet
#   → Schema from Glue table: datalake_raw.clickstream_schema

# Firehose automatically writes partitioned Parquet:
# s3://my-lake/raw/clickstream/2024/05/23/12/
# ── clickstream-1-2024-05-23-12-00-00-abc.parquet

# Put records into Firehose directly (bypassing KDS)
firehose = boto3.client('firehose', region_name='ap-south-1')
firehose.put_record(
    DeliveryStreamName='clickstream-to-s3',
    Record={'Data': json.dumps({'user_id': 'U001', 'event': 'add_to_cart', 'ts': time.time()}).encode()}
)</code></pre>` },
    { type: 'exercise', title: 'Build a Kinesis → Firehose → S3 pipeline and query with Athena', hint: 'Create a KDS stream (1 shard), a Firehose delivery stream sourced from KDS with S3 destination, produce 50 events, wait for delivery, query S3 with Athena', solution: `# 1. Create stream
aws kinesis create-stream --stream-name clickstream-demo --shard-count 1

# 2. Create Firehose via Console (Console is easier than CLI for Firehose):
# Source: Kinesis Data Streams → clickstream-demo
# Destination: S3 → s3://my-lake/firehose/clickstream/
# Buffer: 1 MB / 60 seconds (for testing, smallest values)

# 3. Produce 50 events from Python
import boto3, json, time, random
k = boto3.client('kinesis', region_name='ap-south-1')
users = ['U001','U002','U003']
events = ['page_view','add_to_cart','checkout','search']
for i in range(50):
    user = random.choice(users)
    k.put_record(StreamName='clickstream-demo',
                 Data=json.dumps({'user_id':user,'event':random.choice(events),'ts':time.time()}).encode(),
                 PartitionKey=user)
    time.sleep(0.2)

# 4. Wait 60-90 seconds for Firehose buffer to flush
# 5. Verify: aws s3 ls s3://my-lake/firehose/clickstream/ --recursive
# 6. Create Athena table and query:
# CREATE EXTERNAL TABLE firehose_clickstream (user_id STRING, event STRING, ts DOUBLE)
# STORED AS ... LOCATION 's3://my-lake/firehose/clickstream/'
# SELECT user_id, COUNT(*) as cnt FROM firehose_clickstream GROUP BY user_id;` }
  ]
};

L['aws-w5-l2'] = {
  title: 'AWS Step Functions — Orchestrating ML Workflows',
  sections: [
    { type: 'text', body: `<h2>What is AWS Step Functions?</h2>
<p>AWS Step Functions is a serverless orchestration service that lets you coordinate multiple AWS services into automated workflows using visual state machines. For ML, it connects data preprocessing, training, evaluation, and deployment into a reliable, retryable, observable pipeline.</p>
<h3>State Machine Concepts</h3>
<ul>
  <li><strong>State Machine</strong> — the workflow definition: a JSON/YAML specification of states and transitions. Visual representation available in the Step Functions console.</li>
  <li><strong>State</strong> — a single step. Types: Task (call a service), Choice (conditional branch), Wait (pause for duration/timestamp), Parallel (run branches concurrently), Map (fan-out over a list), Pass (transform/inject data), Succeed, Fail.</li>
  <li><strong>Execution</strong> — one run of the state machine with specific input data. Step Functions maintains execution history, input/output at each state, and error details.</li>
  <li><strong>Task State</strong> — invokes a service: Lambda, SageMaker, Glue, EMR, ECS, SNS, DynamoDB, and 200+ others via SDK integrations. Supports retry (with exponential backoff), catch (error handling), and timeout.</li>
</ul>` },
    { type: 'text', body: `<h3>ML Pipeline with Step Functions</h3>
<pre><code">{
  "Comment": "Churn prediction ML pipeline",
  "StartAt": "PreprocessData",
  "States": {
    "PreprocessData": {
      "Type": "Task",
      "Resource": "arn:aws:states:::glue:startJobRun.sync:2",
      "Parameters": {
        "JobName": "churn-feature-engineering",
        "Arguments": {"--input_path.$": "$.s3_raw_path"}
      },
      "Next": "TrainModel",
      "Retry": [{"ErrorEquals": ["States.ALL"], "MaxAttempts": 2, "IntervalSeconds": 30}]
    },
    "TrainModel": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sagemaker:createTrainingJob.sync:2",
      "Parameters": {
        "TrainingJobName.$": "States.Format('churn-{}', $$.Execution.Name)",
        "AlgorithmSpecification": {"TrainingInputMode": "File",
          "TrainingImage": "XGBOOST_CONTAINER_URI"},
        "HyperParameters": {"max_depth": "5", "num_round": "100"},
        "InputDataConfig": [{"ChannelName": "train",
          "DataSource": {"S3DataSource": {"S3Uri.$": "$.processed_path"}}}],
        "OutputDataConfig": {"S3OutputPath.$": "$.model_output_path"},
        "ResourceConfig": {"InstanceType": "ml.m5.xlarge", "InstanceCount": 1, "VolumeSizeInGB": 30},
        "RoleArn": "SAGEMAKER_ROLE_ARN"
      },
      "Next": "EvaluateModel"
    },
    "EvaluateModel": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Parameters": {
        "FunctionName": "evaluate-churn-model",
        "Payload.$": "$"
      },
      "Next": "IsAccurate"
    },
    "IsAccurate": {
      "Type": "Choice",
      "Choices": [{"Variable": "$.val_auc", "NumericGreaterThan": 0.85, "Next": "DeployModel"}],
      "Default": "NotifyFailure"
    },
    "DeployModel": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sagemaker:createEndpoint.sync:2",
      "Parameters": {"EndpointName": "churn-predictor", "...": "..."},
      "End": true
    },
    "NotifyFailure": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Parameters": {"TopicArn": "SNS_TOPIC_ARN", "Message": "Model accuracy below threshold"},
      "End": true
    }
  }
}</code></pre>` },
    { type: 'tip', body: `Use <strong>Express Workflows</strong> (not Standard) for high-volume, short-duration ML inference pipelines — e.g., a pipeline that runs every time a batch of customer records arrives (many executions per minute, each finishing in &lt;5 minutes). Express Workflows are 10× cheaper than Standard and support 100,000 executions/second. Standard Workflows are for long-running pipelines (hours to days) with strong exactly-once execution guarantees.` },
    { type: 'exercise', title: 'Create a Step Functions state machine that orchestrates a Glue job and Lambda', hint: 'Define a simple state machine: Glue ETL → Lambda evaluation → Choice → SNS notification; deploy and execute', solution: `# Simple two-step state machine: Glue → Lambda
import boto3, json

sf = boto3.client('stepfunctions', region_name='ap-south-1')

definition = {
  "Comment": "ETL + evaluation pipeline",
  "StartAt": "RunGlueETL",
  "States": {
    "RunGlueETL": {
      "Type": "Task",
      "Resource": "arn:aws:states:::glue:startJobRun.sync:2",
      "Parameters": {"JobName": "my-etl-job"},
      "Next": "EvaluateOutput"
    },
    "EvaluateOutput": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Parameters": {"FunctionName": "my-eval-function", "Payload.$": "$"},
      "End": True
    }
  }
}

# Create state machine
resp = sf.create_state_machine(
    name='etl-eval-pipeline',
    definition=json.dumps(definition),
    roleArn='arn:aws:iam::ACCOUNT:role/StepFunctionsRole',
    type='STANDARD'
)
print("ARN:", resp['stateMachineArn'])

# Execute
exec_resp = sf.start_execution(
    stateMachineArn=resp['stateMachineArn'],
    name='run-001',
    input=json.dumps({'bucket': 'my-bucket', 'key': 'raw/sales.csv'})
)
print("Execution:", exec_resp['executionArn'])` }
  ]
};

L['aws-w5-l3'] = {
  title: 'Amazon MWAA — Managed Apache Airflow',
  sections: [
    { type: 'text', body: `<h2>What is Amazon MWAA?</h2>
<p>Amazon Managed Workflows for Apache Airflow (MWAA) is a fully managed Airflow service — AWS provisions the scheduler, webserver, and worker fleet; manages upgrades, scaling, and HA; and integrates natively with S3 (for DAG storage), CloudWatch (logs), and IAM (permissions). You write standard Airflow DAGs and deploy by dropping Python files into an S3 bucket.</p>
<h3>MWAA vs Self-Hosted Airflow vs Step Functions</h3>
<table>
  <tr><th>Aspect</th><th>MWAA</th><th>Self-Hosted Airflow</th><th>Step Functions</th></tr>
  <tr><td>Setup</td><td>Managed (1-click)</td><td>Complex (EC2/EKS)</td><td>No setup</td></tr>
  <tr><td>Code</td><td>Standard Airflow DAGs (Python)</td><td>Standard Airflow DAGs</td><td>JSON state machine</td></tr>
  <tr><td>Operators</td><td>Any Airflow operator</td><td>Any Airflow operator</td><td>AWS SDK only</td></tr>
  <tr><td>Cost</td><td>Per environment-hour</td><td>EC2 costs (more ops)</td><td>Per state transition</td></tr>
  <tr><td>Best for</td><td>Existing Airflow teams, rich scheduling</td><td>Full control</td><td>AWS-native, serverless</td></tr>
</table>
<h3>MWAA Architecture</h3>
<ul>
  <li><strong>DAG storage</strong> — S3 bucket folder (e.g. <code>s3://my-airflow/dags/</code>). MWAA polls this bucket every 30 seconds and auto-loads new/changed DAGs. No SSH or deployment pipeline needed — upload a .py file and it appears in the Airflow UI within a minute.</li>
  <li><strong>Plugins and requirements</strong> — S3 bucket for plugins.zip (custom operators, hooks) and requirements.txt (pip packages). Environment restarts on change.</li>
  <li><strong>Workers</strong> — auto-scaled Fargate containers running Airflow tasks. Scale from 1 to N workers based on task queue depth.</li>
</ul>` },
    { type: 'text', body: `<h3>Writing a MWAA DAG for ML</h3>
<pre><code">from airflow import DAG
from airflow.providers.amazon.aws.operators.glue import GlueJobOperator
from airflow.providers.amazon.aws.operators.sagemaker import SageMakerTrainingOperator
from airflow.providers.amazon.aws.operators.sagemaker import SageMakerEndpointOperator
from airflow.providers.amazon.aws.sensors.sagemaker import SageMakerTrainingJobSensor
from datetime import datetime, timedelta

default_args = {
    'owner': 'data-science-team',
    'retries': 2,
    'retry_delay': timedelta(minutes=10),
    'email_on_failure': True,
    'email': ['alerts@mycompany.com']
}

with DAG(
    dag_id='churn_ml_pipeline',
    schedule_interval='0 2 * * *',  # 2 AM daily
    start_date=datetime(2024, 1, 1),
    default_args=default_args,
    catchup=False,
    tags=['ml', 'churn']
) as dag:

    feature_engineering = GlueJobOperator(
        task_id='run_feature_engineering',
        job_name='churn-feature-eng',
        script_args={'--run_date': '{{ ds }}'},
        aws_conn_id='aws_default'
    )

    train_model = SageMakerTrainingOperator(
        task_id='train_xgboost',
        config={
            'TrainingJobName': 'churn-{{ ds_nodash }}',
            'AlgorithmSpecification': {'TrainingInputMode': 'File',
                                        'TrainingImage': 'XGBOOST_IMAGE'},
            'HyperParameters': {'max_depth': '5', 'num_round': '100'},
            # ... (full config)
        },
        aws_conn_id='aws_default',
        wait_for_completion=True
    )

    deploy = SageMakerEndpointOperator(
        task_id='update_endpoint',
        config={'EndpointName': 'churn-prod', '...': '...'},
        aws_conn_id='aws_default'
    )

    feature_engineering >> train_model >> deploy</code></pre>` },
    { type: 'tip', body: `Use Airflow's <strong>{{ ds }}</strong> and <strong>{{ ds_nodash }}</strong> template variables in task parameters to make DAGs date-aware. <code>{{ ds }}</code> renders to the logical run date (e.g. "2024-05-23"), making it trivial to pass the correct date partition to Glue jobs, S3 paths, and training job names without hardcoding anything. This is the key pattern for idempotent, rerunnable ML pipelines.` },
    { type: 'exercise', title: 'Deploy a DAG to MWAA that runs a daily Glue job', hint: 'Write a DAG with GlueJobOperator, upload to the S3 dags/ folder, trigger it manually in the Airflow UI, check logs', solution: `# my_etl_dag.py — upload to s3://my-airflow-env/dags/
from airflow import DAG
from airflow.providers.amazon.aws.operators.glue import GlueJobOperator
from datetime import datetime

with DAG(
    dag_id='daily_sales_etl',
    schedule_interval='0 1 * * *',
    start_date=datetime(2024, 1, 1),
    catchup=False
) as dag:

    run_etl = GlueJobOperator(
        task_id='run_sales_etl',
        job_name='daily-sales-etl',
        script_args={'--run_date': '{{ ds }}'},
        aws_conn_id='aws_default'
    )

# Upload to S3:
# aws s3 cp my_etl_dag.py s3://my-airflow-env/dags/

# MWAA picks up the DAG within ~30 seconds
# Airflow UI: DAGs → daily_sales_etl → Trigger DAG ▶
# View logs: Airflow UI → Task Instance → Log

# Verify Glue job ran:
aws glue get-job-runs --job-name daily-sales-etl --max-results 1` }
  ]
};

L['aws-w5-l4'] = {
  title: 'Amazon EventBridge & AWS SNS for ML Pipelines',
  sections: [
    { type: 'text', body: `<h2>Amazon EventBridge</h2>
<p>Amazon EventBridge is a serverless event bus that connects AWS services, SaaS applications, and your own applications through events. In ML pipelines, EventBridge is the glue that triggers automated responses to AWS service state changes — model training completion, data file arrival, scheduled pipeline runs, and SageMaker alerts.</p>
<h3>EventBridge Concepts</h3>
<ul>
  <li><strong>Event</strong> — a JSON message describing a change in state. Every AWS service emits events: S3 object created, SageMaker training job status change, Glue job succeeded/failed, CloudWatch alarm triggered.</li>
  <li><strong>Event Bus</strong> — a router that receives events. The default event bus receives all AWS service events for your account. You can create custom event buses for cross-account or SaaS events.</li>
  <li><strong>Rule</strong> — a pattern + target. The pattern filters events (by source, detail-type, or any JSON field). The target is what runs when the pattern matches: Lambda, Step Functions, SageMaker Pipeline, SNS, SQS, Kinesis, and 20+ others.</li>
  <li><strong>Schedule</strong> — a cron or rate expression that triggers a target on a time schedule. E.g. trigger a Step Functions ML pipeline every day at 2 AM.</li>
</ul>` },
    { type: 'text', body: `<h3>EventBridge Rule Examples for ML</h3>
<pre><code"># Rule: trigger Step Functions when SageMaker training job completes
{
  "source": ["aws.sagemaker"],
  "detail-type": ["SageMaker Training Job State Change"],
  "detail": {
    "TrainingJobStatus": ["Completed"]
  }
}
# Target: Step Functions state machine (ModelEvaluation pipeline)

# Rule: run ML pipeline daily at 2 AM IST (8:30 PM UTC)
Schedule: cron(30 20 * * ? *)
Target: Step Functions → ML pipeline ARN

# Rule: trigger Lambda when new data file lands in S3
{
  "source": ["aws.s3"],
  "detail-type": ["Object Created"],
  "detail": {
    "bucket": {"name": ["my-data-lake"]},
    "object": {"key": [{"prefix": "raw/sales/"}]}
  }
}
# Target: Lambda → validate_and_trigger_etl</code></pre>
<pre><code"># Create an EventBridge rule via boto3
events = boto3.client('events', region_name='ap-south-1')

# Scheduled rule: daily ML pipeline
events.put_rule(
    Name='daily-ml-pipeline',
    ScheduleExpression='cron(30 20 * * ? *)',
    State='ENABLED',
    Description='Trigger churn ML pipeline daily at 2 AM IST'
)

events.put_targets(
    Rule='daily-ml-pipeline',
    Targets=[{
        'Id': 'step-functions-target',
        'Arn': 'arn:aws:states:ap-south-1:ACCOUNT:stateMachine:ChurnPipeline',
        'RoleArn': 'arn:aws:iam::ACCOUNT:role/EventBridgeStepFunctionsRole',
        'Input': json.dumps({"bucket": "my-lake", "run_type": "scheduled"})
    }]
)</code></pre>` },
    { type: 'text', body: `<h3>Amazon SNS for ML Alerts</h3>
<p>Amazon Simple Notification Service (SNS) is a pub/sub messaging service. In ML pipelines, SNS sends notifications to human operators or downstream systems when important events occur: model accuracy drops below threshold, training job fails, data drift detected, endpoint latency spikes.</p>
<pre><code">sns = boto3.client('sns', region_name='ap-south-1')

# Create topic
topic = sns.create_topic(Name='ml-pipeline-alerts')
topic_arn = topic['TopicArn']

# Subscribe a team email
sns.subscribe(TopicArn=topic_arn, Protocol='email', Endpoint='team@mycompany.com')

# Publish an alert from a Lambda or Step Functions task
def notify_model_drift(topic_arn, feature_name, drift_score):
    sns.publish(
        TopicArn=topic_arn,
        Subject='⚠️ Data Drift Detected — Churn Model',
        Message=f"""Data drift detected in feature: {feature_name}
Drift score: {drift_score:.3f} (threshold: 0.05)
Action required: review feature distribution and consider retraining.
Dashboard: https://console.aws.amazon.com/sagemaker/home#/model-monitoring"""
    )</code></pre>` },
    { type: 'exercise', title: 'Create an EventBridge rule to trigger a Lambda when a training job completes', hint: 'Create an EventBridge rule matching SageMaker training completion, target a Lambda that sends an SNS notification', solution: `# 1. Create SNS topic and subscribe
import boto3, json
sns = boto3.client('sns', region_name='ap-south-1')
topic_arn = sns.create_topic(Name='training-alerts')['TopicArn']
sns.subscribe(TopicArn=topic_arn, Protocol='email', Endpoint='you@email.com')

# 2. Lambda function (paste in Console, name "notify-training-done"):
def lambda_handler(event, context):
    import boto3, json
    detail = event.get('detail', {})
    job_name = detail.get('TrainingJobName', 'Unknown')
    status = detail.get('TrainingJobStatus', 'Unknown')
    sns = boto3.client('sns')
    sns.publish(
        TopicArn='TOPIC_ARN',  # replace with actual ARN
        Subject=f'Training Job {status}: {job_name}',
        Message=json.dumps(detail, indent=2)
    )

# 3. EventBridge rule (Console: EventBridge → Rules → Create):
# Pattern:
{
  "source": ["aws.sagemaker"],
  "detail-type": ["SageMaker Training Job State Change"],
  "detail": {"TrainingJobStatus": ["Completed", "Failed"]}
}
# Target: Lambda → notify-training-done

# 4. Run a short training job and verify email arrives` }
  ]
};

L['aws-w5-l5'] = {
  title: 'AWS Batch — Large-Scale Batch ML Workloads',
  sections: [
    { type: 'text', body: `<h2>What is AWS Batch?</h2>
<p>AWS Batch is a fully managed service for running large-scale batch computing jobs. It dynamically provisions EC2 (or Fargate) instances based on the job queue, runs your containerised jobs, and terminates instances when work is complete. It handles scheduling, dependency management, retries, and resource provisioning — you focus on the job logic.</p>
<h3>AWS Batch vs SageMaker Batch Transform vs EMR</h3>
<table>
  <tr><th>Service</th><th>Best For</th><th>Programming Model</th></tr>
  <tr><td>AWS Batch</td><td>General containerised batch jobs</td><td>Any Docker container, any code</td></tr>
  <tr><td>SageMaker Batch Transform</td><td>ML model inference on S3 datasets</td><td>SageMaker model artifact</td></tr>
  <tr><td>Amazon EMR</td><td>Big data processing (Spark/Hadoop)</td><td>PySpark, Hive, Flink</td></tr>
  <tr><td>Glue ETL</td><td>Serverless ETL with Glue Catalog</td><td>PySpark or Python shell</td></tr>
</table>
<h3>Core AWS Batch Concepts</h3>
<ul>
  <li><strong>Compute Environment</strong> — a pool of EC2 or Fargate resources. Managed: Batch provisions/terminates instances automatically based on demand. Unmanaged: you bring your own instances.</li>
  <li><strong>Job Queue</strong> — jobs are submitted to a queue. The queue is associated with one or more compute environments (ordered by priority). Jobs wait in the queue until compute capacity is available.</li>
  <li><strong>Job Definition</strong> — a reusable template: Docker image, vCPU, memory, IAM role, environment variables, mount points, retry strategy.</li>
  <li><strong>Job</strong> — a single execution of a Job Definition. Can be standalone, part of an array job (fan-out: submit 1 job, Batch runs N parallel copies), or part of a dependency graph (Job B waits for Job A).</li>
</ul>` },
    { type: 'text', body: `<h3>Running a Batch ML Job</h3>
<pre><code">import boto3

batch = boto3.client('batch', region_name='ap-south-1')

# 1. Register a Job Definition
batch.register_job_definition(
    jobDefinitionName='churn-feature-engineering',
    type='container',
    containerProperties={
        'image': 'ACCOUNT.dkr.ecr.ap-south-1.amazonaws.com/feature-eng:latest',
        'vcpus': 4,
        'memory': 8192,  # MB
        'jobRoleArn': 'arn:aws:iam::ACCOUNT:role/BatchJobRole',
        'environment': [
            {'name': 'INPUT_BUCKET', 'value': 'my-data-lake'},
            {'name': 'OUTPUT_PREFIX', 'value': 'processed/features/'}
        ],
        'logConfiguration': {
            'logDriver': 'awslogs',
            'options': {'awslogs-group': '/aws/batch/churn-feature-eng'}
        }
    },
    retryStrategy={'attempts': 3},
    timeout={'attemptDurationSeconds': 3600}
)

# 2. Submit a job
response = batch.submit_job(
    jobName='churn-features-2024-05-23',
    jobQueue='ml-pipeline-queue',
    jobDefinition='churn-feature-engineering',
    containerOverrides={
        'environment': [
            {'name': 'RUN_DATE', 'value': '2024-05-23'}
        ]
    }
)
print("Job ID:", response['jobId'])

# 3. Monitor job status
job_id = response['jobId']
status = batch.describe_jobs(jobs=[job_id])['jobs'][0]['status']
print("Status:", status)  # SUBMITTED → PENDING → RUNNABLE → STARTING → RUNNING → SUCCEEDED</code></pre>` },
    { type: 'tip', body: `Use <strong>Array Jobs</strong> for embarrassingly parallel ML tasks — e.g. generating features for 1000 customers, scoring 500 customer segments, or running hyperparameter search over 100 configs. Submit one array job with size=100; Batch fans out to 100 parallel container instances, each receiving an <code>AWS_BATCH_JOB_ARRAY_INDEX</code> environment variable (0–99) to identify which slice to process. No Spark cluster needed for this pattern.` },
    { type: 'exercise', title: 'Submit an array job to AWS Batch that processes data partitions in parallel', hint: 'Create a compute environment and job queue, register a job definition with your Docker image, submit an array job of size 10, monitor completion', solution: `# 1. Create Compute Environment (Console: Batch → Compute Environments → Create)
# Type: Managed → EC2 → Spot → min 0, max 4 vCPUs → instance type: optimal

# 2. Create Job Queue → associate compute environment

# 3. Register job definition
import boto3
batch = boto3.client('batch', region_name='ap-south-1')

batch.register_job_definition(
    jobDefinitionName='partition-processor',
    type='container',
    containerProperties={
        'image': 'python:3.11-slim',
        'vcpus': 1, 'memory': 2048,
        'command': ['python', '-c',
            'import os; idx=int(os.environ["AWS_BATCH_JOB_ARRAY_INDEX"]); '
            'print(f"Processing partition {idx}"); '
            'import time; time.sleep(5)']
    }
)

# 4. Submit array job (10 parallel instances)
resp = batch.submit_job(
    jobName='test-array-job',
    jobQueue='ml-pipeline-queue',
    jobDefinition='partition-processor',
    arrayProperties={'size': 10}
)
print("Array Job ID:", resp['jobId'])

# 5. Monitor
import time
while True:
    jobs = batch.list_jobs(jobQueue='ml-pipeline-queue', jobStatus='RUNNING')
    print(f"Running: {len(jobs['jobSummaryList'])} jobs")
    if not jobs['jobSummaryList']: break
    time.sleep(10)
print("All partitions complete")` }
  ]
};

/* ─── MODULE 6 — MLOps, Monitoring & Capstone ───────────────────────────── */

L['aws-w6-l1'] = {
  title: 'SageMaker Pipelines — CI/CD for ML',
  sections: [
    { type: 'text', body: `<h2>What is SageMaker Pipelines?</h2>
<p>SageMaker Pipelines is a CI/CD service specifically designed for ML workflows. It defines ML pipelines as code (Python SDK), executes them reproducibly, tracks every run with full metadata and lineage, and integrates with SageMaker Experiments, the Model Registry, and Studio for a complete MLOps platform.</p>
<h3>Pipeline Components</h3>
<ul>
  <li><strong>Pipeline Parameters</strong> — inputs to the pipeline at execution time (dataset S3 path, training instance type, hyperparameters). Defined upfront with types and defaults. Runs with different parameters are tracked separately for comparison.</li>
  <li><strong>Steps</strong> — individual pipeline stages:
    <ul>
      <li><strong>ProcessingStep</strong> — runs a SageMaker Processing Job (feature engineering, evaluation, custom Python code).</li>
      <li><strong>TrainingStep</strong> — runs a SageMaker Training Job.</li>
      <li><strong>ConditionStep</strong> — branches the pipeline based on a metric comparison (e.g. only deploy if val_auc > 0.85).</li>
      <li><strong>ModelStep</strong> — creates a SageMaker Model artifact from training output.</li>
      <li><strong>RegisterModel</strong> — registers the model in the Model Registry with its metadata.</li>
      <li><strong>TransformStep</strong> — runs a Batch Transform job.</li>
    </ul>
  </li>
  <li><strong>Step dependencies</strong> — declared via Python: <code>train_step = TrainingStep(..., depends_on=[processing_step])</code>. Pipelines executes steps in topological order, parallelising independent steps automatically.</li>
</ul>` },
    { type: 'text', body: `<h3>Building a SageMaker Pipeline</h3>
<pre><code">import sagemaker
from sagemaker.workflow.pipeline import Pipeline
from sagemaker.workflow.steps import ProcessingStep, TrainingStep
from sagemaker.workflow.parameters import ParameterString, ParameterFloat
from sagemaker.workflow.conditions import ConditionGreaterThan
from sagemaker.workflow.condition_step import ConditionStep
from sagemaker.workflow.functions import JsonGet
from sagemaker.sklearn.processing import SKLearnProcessor
from sagemaker.processing import ProcessingInput, ProcessingOutput

session = sagemaker.Session()
role = sagemaker.get_execution_role()

# Pipeline Parameters
input_data = ParameterString(name="InputData", default_value="s3://bucket/raw/sales/")
accuracy_threshold = ParameterFloat(name="AccuracyThreshold", default_value=0.85)

# Step 1: Feature Engineering
processor = SKLearnProcessor(framework_version="1.2-1", instance_type="ml.m5.large",
                              instance_count=1, role=role)
processing_step = ProcessingStep(
    name="FeatureEngineering",
    processor=processor,
    inputs=[ProcessingInput(source=input_data, destination="/opt/ml/processing/input")],
    outputs=[ProcessingOutput(output_name="train", source="/opt/ml/processing/output/train"),
             ProcessingOutput(output_name="val", source="/opt/ml/processing/output/val")],
    code="feature_engineering.py"
)

# Step 2: Training
from sagemaker.estimator import Estimator
from sagemaker.workflow.steps import TrainingStep
from sagemaker.inputs import TrainingInput

xgb_image = sagemaker.image_uris.retrieve("xgboost", session.boto_region_name, "1.7-1")
estimator = Estimator(image_uri=xgb_image, role=role,
                       instance_count=1, instance_type="ml.m5.xlarge",
                       output_path="s3://bucket/models/")
estimator.set_hyperparameters(max_depth=5, num_round=100,
    objective="binary:logistic", eval_metric="auc")

train_step = TrainingStep(
    name="TrainXGBoost",
    estimator=estimator,
    inputs={"train": TrainingInput(processing_step.properties.ProcessingOutputConfig.Outputs["train"].S3Output.S3Uri),
            "validation": TrainingInput(processing_step.properties.ProcessingOutputConfig.Outputs["val"].S3Output.S3Uri)}
)

# Step 3: Condition — only register if accurate
cond_step = ConditionStep(
    name="CheckAccuracy",
    conditions=[ConditionGreaterThan(
        left=JsonGet(step_name=train_step.name, property_file="evaluation.json", json_path="val_auc"),
        right=accuracy_threshold
    )],
    if_steps=[],  # RegisterModel step here
    else_steps=[]
)

# Build and execute
pipeline = Pipeline(name="ChurnPredictionPipeline",
    parameters=[input_data, accuracy_threshold],
    steps=[processing_step, train_step, cond_step],
    sagemaker_session=session)

pipeline.upsert(role_arn=role)
pipeline.start(parameters={"InputData": "s3://bucket/raw/sales/2024/"})</code></pre>` },
    { type: 'tip', body: `Use <strong>SageMaker Model Registry</strong> with Pipelines for a human-in-the-loop approval gate. The pipeline auto-registers the model with status "PendingManualApproval". A team lead reviews model metrics in the Registry and clicks Approve. A separate EventBridge rule watches for the approval event and triggers the deployment pipeline automatically. This separates the science team (who trains) from the platform team (who deploys) with a clear audit trail.` },
    { type: 'exercise', title: 'Build a two-step Pipeline (Processing → Training) and execute it', hint: 'Define pipeline parameters, create ProcessingStep and TrainingStep with step property references, call pipeline.upsert() and pipeline.start()', solution: `import sagemaker
from sagemaker.workflow.pipeline import Pipeline
from sagemaker.workflow.steps import ProcessingStep, TrainingStep
from sagemaker.workflow.parameters import ParameterString
from sagemaker.sklearn.processing import SKLearnProcessor
from sagemaker.processing import ProcessingInput, ProcessingOutput
from sagemaker.estimator import Estimator
from sagemaker.inputs import TrainingInput

session = sagemaker.Session()
role = sagemaker.get_execution_role()
bucket = session.default_bucket()

# Parameters
raw_data = ParameterString(name="RawData", default_value=f"s3://{bucket}/raw/")

# Processing step
proc = SKLearnProcessor(framework_version="1.2-1", role=role,
    instance_type="ml.m5.large", instance_count=1)
proc_step = ProcessingStep(name="PrepData", processor=proc,
    inputs=[ProcessingInput(source=raw_data, destination="/opt/ml/processing/input")],
    outputs=[ProcessingOutput(output_name="train", source="/opt/ml/processing/output")],
    code="prep.py")  # prep.py reads input, writes train.csv to output

# Training step
img = sagemaker.image_uris.retrieve("xgboost", session.boto_region_name, "1.7-1")
est = Estimator(image_uri=img, role=role, instance_count=1,
    instance_type="ml.m5.large", output_path=f"s3://{bucket}/models/")
est.set_hyperparameters(max_depth=4, num_round=50, objective="binary:logistic")

train_step = TrainingStep(name="Train", estimator=est,
    inputs={"train": TrainingInput(
        proc_step.properties.ProcessingOutputConfig.Outputs["train"].S3Output.S3Uri,
        content_type="text/csv")})

pipeline = Pipeline(name="QuickMLPipeline",
    parameters=[raw_data], steps=[proc_step, train_step], sagemaker_session=session)

pipeline.upsert(role_arn=role)
exec = pipeline.start()
print("Execution:", exec.arn)
exec.wait()  # blocks until complete` }
  ]
};

L['aws-w6-l2'] = {
  title: 'SageMaker Model Monitor — Detecting Data & Model Drift',
  sections: [
    { type: 'text', body: `<h2>Why Model Monitoring?</h2>
<p>A model trained on historical data degrades over time as the real world changes — new product categories, economic shifts, seasonal patterns. Without monitoring, production models silently deliver wrong predictions. SageMaker Model Monitor continuously analyses inference traffic and compares it against a baseline to detect data quality, model quality, feature attribution, and model bias drift.</p>
<h3>Model Monitor Types</h3>
<ul>
  <li><strong>Data Quality Monitor</strong> — compares the statistical distribution of incoming inference inputs (feature values) against the baseline statistics from training data. Detects: new null values, out-of-range values, schema changes, distribution shift (high/low chi-squared divergence).</li>
  <li><strong>Model Quality Monitor</strong> — compares model predictions against ground-truth labels (when labels become available later). Tracks: accuracy, AUC, F1, precision, recall over time. Detects accuracy degradation.</li>
  <li><strong>Feature Attribution Drift Monitor</strong> — uses SHAP values to compare feature importance distributions over time. Detects when important features become unimportant (upstream data change).</li>
  <li><strong>Model Bias Monitor</strong> — detects changes in fairness metrics (disparate impact, statistical parity) across demographic groups as the serving population shifts.</li>
</ul>` },
    { type: 'text', body: `<h3>Setting Up Data Quality Monitoring</h3>
<pre><code">import sagemaker
from sagemaker.model_monitor import DefaultModelMonitor, DatasetFormat
from sagemaker.model_monitor.dataset_format import DatasetFormat

session = sagemaker.Session()
role = sagemaker.get_execution_role()
bucket = session.default_bucket()

# Step 1: Enable data capture on the endpoint
from sagemaker.model_monitor import DataCaptureConfig
capture_config = DataCaptureConfig(
    enable_capture=True,
    sampling_percentage=100,
    destination_s3_uri=f"s3://{bucket}/monitoring/data-capture/",
    capture_options=[{"CaptureMode": "Input"}, {"CaptureMode": "Output"}]
)
# Pass capture_config to predictor.deploy() or endpoint update

# Step 2: Run a baseline job (on training/validation data)
monitor = DefaultModelMonitor(
    role=role,
    instance_count=1,
    instance_type="ml.m5.xlarge",
    volume_size_in_gb=20,
    max_runtime_in_seconds=3600
)

monitor.suggest_baseline(
    baseline_dataset=f"s3://{bucket}/data/val/val.csv",
    dataset_format=DatasetFormat.csv(header=True),
    output_s3_uri=f"s3://{bucket}/monitoring/baseline/"
)
monitor.baseline_job.wait()

# Baseline statistics and constraints are now at:
# s3://bucket/monitoring/baseline/statistics.json
# s3://bucket/monitoring/baseline/constraints.json</code></pre>
<pre><code"># Step 3: Create a monitoring schedule (runs hourly)
from sagemaker.model_monitor import CronExpressionGenerator

monitor.create_monitoring_schedule(
    monitor_schedule_name="churn-monitor-hourly",
    endpoint_input="churn-predictor-v1",
    output_s3_uri=f"s3://{bucket}/monitoring/reports/",
    statistics=monitor.baseline_statistics(),
    constraints=monitor.suggested_constraints(),
    schedule_cron_expression=CronExpressionGenerator.hourly(),
    enable_cloudwatch_metrics=True
)</code></pre>` },
    { type: 'tip', body: `Connect Model Monitor CloudWatch metrics to an <strong>SNS alert</strong> via CloudWatch Alarm. When the data quality violation count exceeds 0, the alarm fires and sends an email/Slack notification. Combine this with an EventBridge rule that triggers a SageMaker Pipeline retraining run — giving you a fully automated retraining loop: drift detected → new training run launched → model evaluated → approval gate → deployment. No human needs to initiate the retraining.` },
    { type: 'text', body: `<h3>Interpreting Monitoring Reports</h3>
<p>Each monitoring report is a JSON file at s3://bucket/monitoring/reports/{date}/. Key fields to check:</p>
<ul>
  <li><strong>violations</strong> — list of constraint violations: feature name, type of violation, actual value vs. baseline constraint.</li>
  <li><strong>completeness</strong> — % of non-null values per feature. A sudden drop means upstream data is missing.</li>
  <li><strong>numerical_statistics</strong> — mean, std, min, max, percentiles. Compare current vs. baseline — large shifts indicate distribution change.</li>
  <li><strong>categorical_statistics</strong> — for string features: distinct count, value frequency distribution. New categories appearing in inference that weren't in training cause model to extrapolate.</li>
</ul>
<p>In SageMaker Studio: Endpoint details → Monitor tab → Monitoring schedules → View report. Visual charts show distribution shifts over time with flagged violations highlighted.</p>` },
    { type: 'exercise', title: 'Set up data capture and a baseline monitoring schedule on an endpoint', hint: 'Enable data capture on your endpoint, run suggest_baseline on your validation set, create an hourly monitoring schedule, send test traffic, check the report', solution: `import sagemaker, boto3, time, json
from sagemaker.model_monitor import DefaultModelMonitor, DataCaptureConfig, DatasetFormat, CronExpressionGenerator

session = sagemaker.Session()
role = sagemaker.get_execution_role()
bucket = session.default_bucket()

# 1. Update endpoint with data capture (or redeploy with capture config)
capture_config = DataCaptureConfig(
    enable_capture=True, sampling_percentage=100,
    destination_s3_uri=f"s3://{bucket}/monitor/capture/")
# predictor.update_data_capture_config(capture_config)  # if endpoint exists

# 2. Create monitor and baseline
monitor = DefaultModelMonitor(role=role, instance_type="ml.m5.large",
    instance_count=1, volume_size_in_gb=20)

monitor.suggest_baseline(
    baseline_dataset=f"s3://{bucket}/data/val/val.csv",
    dataset_format=DatasetFormat.csv(header=True),
    output_s3_uri=f"s3://{bucket}/monitor/baseline/",
    wait=True
)
print("Baseline stats:", monitor.baseline_statistics().body_dict)

# 3. Create schedule
monitor.create_monitoring_schedule(
    monitor_schedule_name="churn-hourly-monitor",
    endpoint_input="churn-xgb-demo",
    output_s3_uri=f"s3://{bucket}/monitor/reports/",
    statistics=monitor.baseline_statistics(),
    constraints=monitor.suggested_constraints(),
    schedule_cron_expression=CronExpressionGenerator.hourly()
)

# 4. Send traffic to endpoint (generates captured data)
# predictor.predict(test_data)  # 100 rows

# 5. After 1 hour, check reports:
# aws s3 ls s3://{bucket}/monitor/reports/ --recursive
# Reports show any distribution violations` }
  ]
};

L['aws-w6-l3'] = {
  title: 'Amazon QuickSight — Cloud-Native BI for AWS Data',
  sections: [
    { type: 'text', body: `<h2>What is Amazon QuickSight?</h2>
<p>Amazon QuickSight is AWS's cloud-native business intelligence service. It connects directly to AWS data sources (S3, Athena, Redshift, RDS, Aurora), renders interactive dashboards in a browser, and scales to tens of thousands of users without infrastructure management. Unlike Tableau/Power BI, there is no server to maintain — it's fully serverless.</p>
<h3>QuickSight Key Concepts</h3>
<ul>
  <li><strong>SPICE</strong> (Super-fast, Parallel, In-memory Calculation Engine) — QuickSight's in-memory engine. When you import data into SPICE, queries run against an optimised columnar in-memory store — not the source database. Dashboards load instantly even with millions of rows. SPICE data is refreshed on a schedule.</li>
  <li><strong>Dataset</strong> — a connection to a data source plus transformation logic (joins, calculated fields, filters). Multiple datasets can join in a single analysis.</li>
  <li><strong>Analysis</strong> — the design workspace. Drag fields onto canvases, choose chart types, add filters and parameters. Not shared directly — published as dashboards.</li>
  <li><strong>Dashboard</strong> — a published, read-only view of an analysis. Shared with users or groups. Supports filters, drill-downs, and cross-visual filtering. Embeddable in web applications via QuickSight Embedding SDK.</li>
  <li><strong>ML Insights</strong> — built-in AutoML features: Anomaly Detection (flags outlier data points), Forecasting (ARIMA/Prophet-based predictions), Key Drivers (explains what factors drive a metric). Available from any visual's context menu.</li>
</ul>` },
    { type: 'text', body: `<h3>Connecting QuickSight to Athena</h3>
<ol>
  <li>QuickSight Console → Datasets → New dataset → Athena</li>
  <li>Select your Athena workgroup and database (datalake_db)</li>
  <li>Select a table (e.g. sales_partitioned) or write a custom SQL query</li>
  <li>Choose: Direct query (queries Athena live on each dashboard open) or Import to SPICE (one-time import, instant queries)</li>
  <li>Add calculated fields: <code>Profit Margin = profit / sales</code>, <code>YoY Growth = (this_year - last_year) / last_year</code></li>
</ol>
<h3>QuickSight Calculated Fields for ML Teams</h3>
<pre><code"># In QuickSight's calculated field editor (pseudo-code):

# Model accuracy over time
rolling_accuracy = avgOver(
    {correct_predictions} / {total_predictions},
    [{date}], PRE_FILTER
)

# Prediction confidence
high_confidence = ifelse({churn_probability} > 0.8, 1, 0)

# Data drift indicator (compare feature mean to baseline)
drift_flag = ifelse(abs({feature_mean} - 3.45) / 3.45 > 0.1, 'DRIFT', 'OK')

# Cohort analysis: days since first purchase
days_since_first = dateDiff({first_purchase_date}, now(), 'DD')</code></pre>
<h3>Publishing and Sharing</h3>
<p>Analysis → Publish → Dashboard → set name → Publish. Share with: specific users/groups, all users in the account, or externally via embedded URL. Row-Level Security restricts which data rows each user sees — configured with a permission dataset (user → allowed_regions mapping).</p>` },
    { type: 'tip', body: `Use <strong>QuickSight Q</strong> (natural language querying) to let non-technical stakeholders self-serve answers from ML pipeline data. A product manager can type "show me churn rate by region this month vs last month" and Q generates the correct visualisation from the dataset — no SQL, no waiting for a data analyst. This reduces ad-hoc analysis requests to the data science team by 60–80%.` },
    { type: 'exercise', title: 'Build a QuickSight dashboard from Athena data', hint: 'Create a QuickSight Athena dataset, build an analysis with a bar chart (sales by region) and a line chart (monthly trend), add a filter widget, publish as a dashboard', solution: `# QuickSight is a console-only workflow — steps:

1. QuickSight Console (https://quicksight.aws.amazon.com) → Datasets → New dataset → Athena
   → Workgroup: primary → Database: datalake_db → Table: sales_partitioned → Import to SPICE

2. Once dataset created → Create analysis
   → Add visual: Bar chart → X-axis: region → Value: SUM(sales)

3. Add second visual: Line chart → X-axis: order_date (by month) → Value: SUM(sales)
   → Right-click order_date → Format → Aggregate: Month

4. Add calculated field: "Profit Margin" = profit / sales
   → Add KPI visual: Value: AVG(Profit Margin) → Comparison: SPICE previous period

5. Add filter widget: date range filter on order_date
   → Filter type: Date range → Apply to all visuals in sheet

6. Publish: Share → Publish dashboard → "Sales Performance Dashboard"
   → Share with: your email → Viewer

7. Open dashboard link — verify filters work, visuals update interactively
   → Enable ML Insights: select Sales line chart → Insights → Add anomaly detection → weekly granularity` }
  ]
};

L['aws-w6-l4'] = {
  title: 'CloudWatch & Cost Optimisation for ML on AWS',
  sections: [
    { type: 'text', body: `<h2>CloudWatch for ML Workloads</h2>
<p>Amazon CloudWatch is the unified observability service for AWS. Every SageMaker resource — training jobs, endpoints, processing jobs, batch transform — publishes metrics and logs to CloudWatch automatically. Understanding CloudWatch is essential for debugging ML pipeline failures, monitoring endpoint health, and controlling costs.</p>
<h3>Key CloudWatch Metrics for SageMaker</h3>
<ul>
  <li><strong>Training Job Metrics</strong>: <code>/aws/sagemaker/TrainingJobs</code> — framework-emitted metrics (train:loss, validation:auc) are available as CloudWatch metrics for charting and alerting.</li>
  <li><strong>Endpoint Metrics</strong>: ModelLatency (ms per inference), InvocationsPerInstance (requests/min), OverheadLatency, Invocations (total). All in the <code>AWS/SageMaker</code> namespace.</li>
  <li><strong>Instance Metrics</strong>: CPUUtilization, MemoryUtilization, GPUUtilization, GPUMemoryUtilization, DiskUtilization — per training job and processing job. View in CloudWatch → Metrics → SageMaker.</li>
  <li><strong>Model Monitor Metrics</strong>: feature_baseline_drift, data_missing_count, content_type_mismatch — emitted by monitoring schedule executions.</li>
</ul>
<h3>CloudWatch Logs for Debugging</h3>
<pre><code">import boto3

logs = boto3.client('logs', region_name='ap-south-1')

# Training job logs: /aws/sagemaker/TrainingJobs/{job-name}/algo-1-{timestamp}
log_group = '/aws/sagemaker/TrainingJobs'
job_name = 'churn-2024-05-23'

streams = logs.describe_log_streams(
    logGroupName=log_group,
    logStreamNamePrefix=job_name
)['logStreams']

for stream in streams:
    events = logs.get_log_events(
        logGroupName=log_group,
        logStreamName=stream['logStreamName'],
        limit=50
    )['events']
    for e in events:
        print(e['message'])</code></pre>` },
    { type: 'text', body: `<h3>ML Cost Optimisation on AWS</h3>
<p>ML workloads can be expensive if not managed carefully. The key levers:</p>
<ul>
  <li><strong>Spot Instances for Training</strong> — use <code>use_spot_instances=True</code> on SageMaker Estimators. Save 70–90% on training costs. SageMaker handles checkpointing and auto-resume on interruption.</li>
  <li><strong>Right-size Endpoints</strong> — start with ml.m5.large, load-test, then size down or use Serverless Inference for low-traffic endpoints (scale to zero, no idle cost).</li>
  <li><strong>Stop Idle Studio Kernels</strong> — Studio kernels are billed per hour even when idle. Configure a Lifecycle Configuration that shuts down idle kernels after 1 hour: <code>jupyter notebook --KernelManager.cull_idle_timeout=3600</code>.</li>
  <li><strong>Transient EMR Clusters</strong> — never leave an EMR cluster running. Use auto-termination or Step Functions to terminate the cluster after the job completes.</li>
  <li><strong>S3 Lifecycle Policies</strong> — move old model artifacts to S3 Glacier after 90 days. Training checkpoint data is often large and rarely accessed.</li>
  <li><strong>AWS Cost Explorer + Budgets</strong> — set a monthly budget with an SNS alert at 80% consumption. Filter by service (SageMaker) and by tag (project=churn-model) to attribute costs to teams.</li>
</ul>` },
    { type: 'tip', body: `Tag every SageMaker resource (<code>project</code>, <code>team</code>, <code>environment</code>) from day one. AWS Cost Explorer can break costs by tag, showing exactly how much each project spends per week. Without tags, a $50K/month SageMaker bill is a single opaque number — with tags, you see that 70% comes from one team's unoptimised GPU training jobs that are running 24/7 on on-demand instances.` },
    { type: 'exercise', title: 'Create a CloudWatch alarm on endpoint latency and a monthly budget alert', hint: 'Create a CloudWatch alarm on SageMaker/ModelLatency > 500ms targeting an SNS topic; create a Cost Explorer budget for SageMaker at $100/month', solution: `import boto3

cw = boto3.client('cloudwatch', region_name='ap-south-1')
sns = boto3.client('sns', region_name='ap-south-1')

# 1. Create SNS topic for alerts
topic_arn = sns.create_topic(Name='ml-cost-alerts')['TopicArn']
sns.subscribe(TopicArn=topic_arn, Protocol='email', Endpoint='you@email.com')

# 2. CloudWatch alarm: endpoint latency > 500ms
cw.put_metric_alarm(
    AlarmName='churn-endpoint-high-latency',
    ComparisonOperator='GreaterThanThreshold',
    EvaluationPeriods=3,
    MetricName='ModelLatency',
    Namespace='AWS/SageMaker',
    Period=60,  # 1 minute
    Statistic='p99',
    Threshold=500000,  # microseconds (500ms)
    AlarmDescription='Churn endpoint p99 latency > 500ms',
    AlarmActions=[topic_arn],
    OKActions=[topic_arn],
    Dimensions=[
        {'Name': 'EndpointName', 'Value': 'churn-xgb-demo'},
        {'Name': 'VariantName', 'Value': 'AllTraffic'}
    ]
)
print("Latency alarm created")

# 3. Cost budget: $100/month for SageMaker
budgets = boto3.client('budgets', region_name='us-east-1')  # budgets API is global
budgets.create_budget(
    AccountId=boto3.client('sts').get_caller_identity()['Account'],
    Budget={
        'BudgetName': 'SageMaker-Monthly',
        'BudgetLimit': {'Amount': '100', 'Unit': 'USD'},
        'TimeUnit': 'MONTHLY',
        'BudgetType': 'COST',
        'CostFilters': {'Service': ['Amazon SageMaker']}
    },
    NotificationsWithSubscribers=[{
        'Notification': {'NotificationType': 'ACTUAL', 'ComparisonOperator': 'GREATER_THAN',
                         'Threshold': 80.0, 'ThresholdType': 'PERCENTAGE'},
        'Subscribers': [{'SubscriptionType': 'SNS', 'Address': topic_arn}]
    }]
)
print("Budget alert created at 80% of $100")` }
  ]
};

L['aws-w6-l5'] = {
  title: 'Capstone — End-to-End ML Pipeline on AWS',
  sections: [
    { type: 'text', body: `<h2>Capstone Project: Customer Churn Prediction Pipeline</h2>
<p>This capstone brings together every AWS service covered in the course — from raw data ingestion through a production-monitored endpoint — into a complete, automated ML pipeline. You will build the architecture that a real company would deploy for a churn prediction system serving 10 million customers.</p>
<h3>Architecture Overview</h3>
<pre>
[Raw Data]          [Orchestration]         [ML]               [Serving]
    │                     │                   │                    │
S3 Raw Zone  ──→  EventBridge (daily)  ──→  SageMaker       ──→  Real-Time
(CRM export)           │                   Pipelines           Endpoint
                   Step Functions      ┌──  Processing          │
                       │               ├──  Training         Feature
                   MWAA DAG        ────┤   Evaluation         Store
                       │               └──  Registration      │
                   Glue ETL                    │            CloudWatch
                       │               Model Registry         │
                   Feature Store ────────┘    │               │
                       │                   Approve        Model Monitor
                   Athena queries             │                │
                       │               Deploy to Endpoint ────┘
                   QuickSight            │
                   Dashboard        SNS Alerts
</pre>` },
    { type: 'text', body: `<h3>Phase 1: Data Layer</h3>
<pre><code"># Data Lake Setup
# S3 zones: raw/ processed/ curated/ models/ monitoring/

# Glue Crawler: discover schema of daily CRM export
aws glue start-crawler --name "crm-raw-crawler"

# Glue ETL Job: feature_engineering.py
# Reads raw CRM data, computes:
# - purchase_count_30d, purchase_count_90d
# - avg_order_value_30d
# - days_since_last_purchase
# - support_tickets_30d
# - account_age_days
# Writes Parquet to processed/features/ partitioned by date

# SageMaker Feature Store ingestion (from Glue ETL output)
import awswrangler as wr
import boto3, time, sagemaker
from sagemaker.feature_store.feature_group import FeatureGroup

df = wr.s3.read_parquet("s3://my-lake/processed/features/date=2024-05-23/")
df['event_time'] = time.time()
df['event_time'] = df['event_time'].astype('float64')

fg = FeatureGroup(name='churn-features', sagemaker_session=sagemaker.Session())
fg.ingest(data_frame=df, max_workers=5, wait=True)</code></pre>
<h3>Phase 2: SageMaker Pipeline</h3>
<pre><code"># pipeline.py — define and register the pipeline
# Steps:
# 1. ProcessingStep: pull features from Feature Store (offline), create train/val/test splits
# 2. TrainingStep: XGBoost on ml.m5.xlarge with Spot Instances
# 3. ProcessingStep (evaluation): compute val_auc, save to evaluation.json
# 4. ConditionStep: val_auc > 0.85
#    → True: RegisterModel → Model Registry (PendingApproval)
#    → False: SNS alert → retrain with different hyperparameters

# Deploy via boto3 trigger or MWAA DAG:
pipeline.upsert(role_arn=role)
execution = pipeline.start(parameters={
    "TrainDate": "2024-05-23",
    "AccuracyThreshold": 0.85
})</code></pre>` },
    { type: 'text', body: `<h3>Phase 3: Deployment & Monitoring</h3>
<pre><code"># After team lead approves in Model Registry:
# EventBridge rule on "SageMaker Model Package State Change" → APPROVED
# → Triggers deployment Lambda:

def lambda_handler(event, context):
    import boto3, json
    sm = boto3.client('sagemaker')
    model_pkg_arn = event['detail']['ModelPackageArn']

    # Create model from approved package
    sm.create_model(
        ModelName='churn-model-latest',
        ExecutionRoleArn='SAGEMAKER_ROLE',
        Containers=[{'ModelPackageName': model_pkg_arn}]
    )

    # Update endpoint (blue/green deploy)
    sm.update_endpoint(
        EndpointName='churn-predictor-prod',
        EndpointConfigName='churn-config-latest',
        DeploymentConfig={
            'BlueGreenUpdatePolicy': {
                'TrafficRoutingConfiguration': {
                    'Type': 'LINEAR', 'LinearStepSize': {'Value': 10, 'Type': 'CAPACITY_PERCENT'},
                    'WaitIntervalInSeconds': 300}
            }
        }
    )

# Model Monitor: hourly data quality check
# CloudWatch alarm: violations > 0 → SNS → retraining pipeline triggered
# QuickSight dashboard: churn rate by segment, model accuracy over time, drift alerts</code></pre>` },
    { type: 'tip', body: `The most important MLOps habit: <strong>never deploy directly from a notebook</strong>. Always route through a Pipeline (reproducible) → Model Registry (versioned and audited) → approval gate → automated deployment. This gives you: full lineage (which data trained which model serving which endpoint), rollback capability (approve the previous model version), and compliance evidence (who approved what, when). Ad-hoc notebook deployments are the #1 source of "which model is in production?" confusion in ML teams.` },
    { type: 'exercise', title: 'Build and run the complete churn pipeline end-to-end', hint: 'Assemble all phases: data prep → Feature Store ingest → Pipeline execution → endpoint deployment → monitoring schedule. Document the execution trace in SageMaker Studio.', solution: `# Full capstone checklist:

# Phase 1 — Data Layer ✓
# [ ] S3 bucket with raw/, processed/, curated/, models/, monitoring/ prefixes
# [ ] Glue Crawler on raw/crm/ → datalake_raw.crm table
# [ ] Glue ETL job: feature_engineering.py (reads crm table, writes features Parquet)
# [ ] Feature Group: churn-features (online + offline, 8 feature columns + event_time)
# [ ] MWAA DAG: daily at 1 AM → run Glue ETL → ingest to Feature Store

# Phase 2 — SageMaker Pipeline ✓
# [ ] processing_step: reads Feature Store offline, writes train.csv / val.csv to S3
# [ ] train_step: XGBoost, Spot, ml.m5.xlarge, 100 rounds, eval_metric=auc
# [ ] eval_step: reads model artifact + val data, writes evaluation.json with val_auc
# [ ] condition_step: val_auc > 0.85 → RegisterModel; else → SNS alert
# [ ] pipeline.upsert() + pipeline.start() → execution completes in ~20 min

# Phase 3 — Deployment & Monitoring ✓
# [ ] Approve model in Model Registry (Studio → Model Registry → Approve)
# [ ] EventBridge rule → Lambda → create model → update endpoint (blue/green)
# [ ] Verify endpoint invocation: predictor.predict([test_row])
# [ ] DataCapture enabled: 100% sampling → s3://.../monitoring/capture/
# [ ] Baseline job: suggest_baseline on val.csv
# [ ] Monitoring schedule: hourly, compare captured vs baseline
# [ ] CloudWatch alarm: violations > 0 → SNS → pipeline trigger
# [ ] QuickSight: Athena dataset → Sales + Churn dashboard → published

# Final verification:
import boto3
sm = boto3.client('sagemaker')
resp = sm.describe_endpoint(EndpointName='churn-predictor-prod')
print("Endpoint status:", resp['EndpointStatus'])  # InService
print("Current model:", resp['ProductionVariants'][0]['DeployedImages'])` }
  ]
};


L['aws-w1-quiz'] = { duration_mins: 15, sections: [
  { type:'text', body:`<h2>Module 1 Quiz — AWS Foundations &amp; Cloud Essentials</h2><p>Test your knowledge of cloud computing concepts (IaaS/PaaS/SaaS), AWS global infrastructure (regions, AZs), IAM (users, roles, policies, least-privilege), EC2 instance types, and the AWS Free Tier.</p>` }
]};

L['aws-w2-quiz'] = { duration_mins: 15, sections: [
  { type:'text', body:`<h2>Module 2 Quiz — Data Storage on AWS</h2><p>Test your knowledge of Amazon S3 (buckets, objects, versioning, storage classes, lifecycle policies), Amazon RDS (engines, read replicas, Multi-AZ), DynamoDB, Amazon Glacier, and selecting the right storage service for a use case.</p>` }
]};

L['aws-w3-quiz'] = { duration_mins: 15, sections: [
  { type:'text', body:`<h2>Module 3 Quiz — Data Processing &amp; ETL</h2><p>Test your knowledge of AWS Glue (crawlers, data catalog, ETL jobs), Amazon Athena (querying S3 with SQL), Amazon EMR (Spark on AWS), AWS Lambda (serverless compute triggers), and building serverless ETL pipelines.</p>` }
]};

L['aws-w4-quiz'] = { duration_mins: 15, sections: [
  { type:'text', body:`<h2>Module 4 Quiz — Machine Learning with Amazon SageMaker</h2><p>Test your knowledge of SageMaker Studio, training jobs (built-in algorithms, custom containers), SageMaker Feature Store, model hosting (real-time and batch endpoints), SageMaker Pipelines, and Model Registry.</p>` }
]};

L['aws-w5-quiz'] = { duration_mins: 15, sections: [
  { type:'text', body:`<h2>Module 5 Quiz — Data Pipelines &amp; Streaming</h2><p>Test your knowledge of Amazon Kinesis (Data Streams, Firehose, Analytics), AWS Step Functions for workflow orchestration, Amazon MWAA (managed Airflow), and designing event-driven data pipeline architectures on AWS.</p>` }
]};

L['aws-w6-quiz'] = { duration_mins: 15, sections: [
  { type:'text', body:`<h2>Module 6 Quiz — MLOps, Monitoring &amp; Capstone</h2><p>Test your knowledge of AWS CodePipeline and CodeBuild for ML CI/CD, Amazon CloudWatch for logging and alerting, SageMaker Model Monitor for drift detection, and the end-to-end capstone ML deployment on AWS.</p>` }
]};

})();

