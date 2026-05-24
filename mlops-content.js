(()=>{
const L = window.DSA_LESSON_CONTENT || {};

/* ── MODULE 1: MLOps Foundations ── */

L['mlops-w1-l1'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>What is MLOps? The ML Lifecycle</h2><p><strong>MLOps</strong> (Machine Learning Operations) is the discipline of deploying, monitoring, and maintaining machine learning models in production reliably and efficiently. It merges ML development with software engineering and DevOps practices — closing the gap between the notebook where a model is trained and the production system where it creates value.</p><p>The gap is staggering: studies consistently show that 85–90% of ML projects never reach production. Those that do often fail within months due to data drift, infrastructure problems, or the inability to update models reliably. MLOps exists to fix this.</p>` },
  { type:'text', body:`<h3>The ML Lifecycle</h3><p>ML projects have a fundamentally different lifecycle from traditional software. Unlike software that runs deterministically from fixed code, ML systems depend on <em>data</em> — and data changes, degrades, and surprises. The ML lifecycle has six phases that cycle continuously:</p><ol><li><strong>Problem framing:</strong> Define the task, success metrics, and data requirements</li><li><strong>Data engineering:</strong> Collect, clean, version, and pipeline data</li><li><strong>Model development:</strong> Experiment, train, evaluate models (the notebook phase)</li><li><strong>Model deployment:</strong> Package, serve, and expose models as APIs or batch jobs</li><li><strong>Monitoring:</strong> Track model performance, data drift, and system health</li><li><strong>Retraining:</strong> Trigger updates when quality degrades; return to step 2</li></ol>` },
  { type:'text', body:`<h3>Why MLOps is Hard</h3><p>Traditional software has one source of failure: bugs in code. ML systems have three:</p><ul><li><strong>Code bugs:</strong> Errors in training, pre/post-processing, feature engineering</li><li><strong>Data issues:</strong> Schema changes, distribution shift, missing values, pipeline failures</li><li><strong>Model degradation:</strong> The world changes; the model doesn't. A fraud detection model trained in 2022 may miss 2024 fraud patterns entirely.</li></ul><p>The first MLOps principle: <strong>treat data, models, and code as equally first-class artifacts</strong> — version all three, test all three, monitor all three.</p>` },
  { type:'code', lang:'python', src:`# The hidden technical debt in ML systems (Sculley et al., 2015)
# Only a small fraction of real-world ML code is the model itself

ml_system_components = {
    "Model code": "~5% of total codebase",
    "Data collection": "Scraping, ETL, data pipelines",
    "Feature engineering": "Feature extraction, transformation, store",
    "Analysis tools": "Notebooks, evaluation scripts, dashboards",
    "Process management": "Job scheduling, orchestration, resource management",
    "Serving infrastructure": "APIs, load balancers, caching layers",
    "Monitoring": "Data quality, model performance, system health",
    "Configuration": "Hyperparameters, thresholds, model versions",
    "Testing": "Unit tests, integration tests, model validation",
}

# The iceberg: the model is the tip; infrastructure is the bulk
print("The Model is just 5% of the ML system.")
print("Everything else is infrastructure, data, and operations.")
print()
print("ML Technical Debt examples:")
print("  - Undeclared consumers: other teams/services depending on your model output")
print("  - Feedback loops: model output affects training data for next model")
print("  - Pipeline jungles: spaghetti of data transformations")
print("  - Glue code: one-off scripts that become production dependencies")`,out:`The Model is just 5% of the ML system.
Everything else is infrastructure, data, and operations.

ML Technical Debt examples:
  - Undeclared consumers: other teams/services depending on your model output
  - Feedback loops: model output affects training data for next model
  - Pipeline jungles: spaghetti of data transformations
  - Glue code: one-off scripts that become production dependencies`},
  { type:'tip', body:`The "throw it over the wall" anti-pattern: data scientists train a model and hand a notebook to engineers to "put it in production." This fails because notebooks are not reproducible, they don't document dependencies, and they skip crucial validation. MLOps starts by establishing shared responsibility from day one.` }
]};

L['mlops-w1-l2'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Experiment Tracking with MLflow</h2><p>In a typical ML project, a data scientist runs dozens or hundreds of experiments: different models, hyperparameters, features, datasets. Without tracking, this is chaos — it becomes impossible to reproduce the best result, compare experiments fairly, or explain to stakeholders what was tried and why the final model was chosen.</p><p><strong>MLflow</strong> is the most widely adopted open-source experiment tracking platform. It automatically logs parameters, metrics, and artefacts for every run, and provides a visual UI for comparison. It integrates with every major ML framework.</p>` },
  { type:'code', lang:'python', src:`import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
import pandas as pd

# Set tracking URI (local file system or remote server)
mlflow.set_tracking_uri("mlruns")  # or "http://mlflow-server:5000"
mlflow.set_experiment("fraud-detection-v2")

X, y = make_classification(n_samples=10000, n_features=20, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Hyperparameter grid to explore
configs = [
    {"n_estimators": 100, "max_depth": 5,  "min_samples_leaf": 1},
    {"n_estimators": 200, "max_depth": 10, "min_samples_leaf": 2},
    {"n_estimators": 300, "max_depth": None,"min_samples_leaf": 5},
]

for params in configs:
    with mlflow.start_run(run_name=f"rf-d{params['max_depth']}-e{params['n_estimators']}"):
        # Log hyperparameters
        mlflow.log_params(params)
        mlflow.log_param("dataset_size", len(X_train))

        # Train
        model = RandomForestClassifier(**params, random_state=42, n_jobs=-1)
        model.fit(X_train, y_train)
        preds = model.predict(X_test)
        proba = model.predict_proba(X_test)[:, 1]

        # Log metrics
        mlflow.log_metrics({
            "accuracy": accuracy_score(y_test, preds),
            "f1":       f1_score(y_test, preds),
            "roc_auc":  roc_auc_score(y_test, proba),
        })

        # Log the model artefact (with signature for serving)
        signature = mlflow.models.infer_signature(X_train, preds)
        mlflow.sklearn.log_model(model, "model", signature=signature)
        print(f"Run: {params} → AUC={roc_auc_score(y_test, proba):.4f}")`,out:`Run: {'n_estimators': 100, 'max_depth': 5,  ...} → AUC=0.9612
Run: {'n_estimators': 200, 'max_depth': 10, ...} → AUC=0.9748
Run: {'n_estimators': 300, 'max_depth': None,...} → AUC=0.9721`},
  { type:'code', lang:'python', src:`# Load and serve the best model from MLflow registry
import mlflow

# Query runs and find the best by AUC
client = mlflow.tracking.MlflowClient()
experiment = client.get_experiment_by_name("fraud-detection-v2")
runs = client.search_runs(
    experiment_ids=[experiment.experiment_id],
    order_by=["metrics.roc_auc DESC"],
    max_results=1
)
best_run = runs[0]
print(f"Best run: {best_run.info.run_id}")
print(f"Best AUC: {best_run.data.metrics['roc_auc']:.4f}")
print(f"Params: {best_run.data.params}")

# Register the best model to the Model Registry
model_uri = f"runs:/{best_run.info.run_id}/model"
registered = mlflow.register_model(model_uri, "fraud-detector")
print(f"Registered: version {registered.version}")

# Load model directly from registry for inference
loaded = mlflow.sklearn.load_model(f"models:/fraud-detector/latest")
predictions = loaded.predict(X_test[:5])
print(f"Predictions: {predictions}")`,out:`Best run: 3f8a2c1d...
Best AUC: 0.9748
Params: {'n_estimators': '200', 'max_depth': '10', ...}
Registered: version 1
Predictions: [0 1 0 0 1]`},
  { type:'tip', body:`MLflow's Model Registry has three stages: Staging (under evaluation), Production (live), and Archived. Use client.transition_model_version_stage() to promote models through stages as part of your CI/CD pipeline. This creates an auditable, governed promotion process — essential for regulated industries (finance, healthcare).` }
]};

L['mlops-w1-l3'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Data Versioning with DVC</h2><p>Git versions code. But ML models are only reproducible if you also version the <em>data</em> that trained them. A model trained on data from January is different from one trained on February data, even with identical code. <strong>DVC</strong> (Data Version Control) extends Git to version datasets, models, and ML pipelines — without storing large files in Git itself.</p><p>DVC stores a small metadata file (.dvc) in Git that points to the actual data stored remotely (S3, GCS, Azure Blob, SSH). This gives you Git-level versioning of arbitrarily large datasets with minimal overhead.</p>` },
  { type:'code', lang:'bash', src:`# DVC setup and workflow
pip install dvc dvc-s3  # install DVC with S3 remote support

# Initialise DVC in a Git repo
git init my-ml-project && cd my-ml-project
dvc init                        # creates .dvc/ directory
git add .dvc && git commit -m "Init DVC"

# Configure remote storage (S3, GCS, local, SSH, etc.)
dvc remote add -d myremote s3://my-bucket/dvc-store
git add .dvc/config && git commit -m "Add DVC remote"

# Track a large dataset
dvc add data/training.csv       # creates data/training.csv.dvc
git add data/training.csv.dvc data/.gitignore
git commit -m "Add training data v1"
dvc push                        # upload data to remote

# Update data and track new version
# (after updating data/training.csv)
dvc add data/training.csv       # updates .dvc file
git add data/training.csv.dvc
git commit -m "Add training data v2 — added February records"
dvc push

# Switch between data versions
git checkout HEAD~1             # go back to previous commit
dvc pull                        # download corresponding data version`,out:`Initialised DVC repository.
Adding...
To track the changes with git, run: git add data/training.csv.dvc
Uploading: 100%|████████| 450M/450M [02:15]`},
  { type:'code', lang:'yaml', src:`# dvc.yaml — define reproducible ML pipeline stages
stages:
  prepare:
    cmd: python src/prepare.py
    deps:
      - src/prepare.py
      - data/raw/training.csv     # input data (DVC-tracked)
    outs:
      - data/processed/train.csv  # output (auto-tracked by DVC)
      - data/processed/test.csv

  train:
    cmd: python src/train.py --config params.yaml
    deps:
      - src/train.py
      - data/processed/train.csv
      - params.yaml
    outs:
      - models/model.pkl          # output model (auto-tracked)
    metrics:
      - metrics/scores.json:      # metrics file (not cached)
          cache: false

  evaluate:
    cmd: python src/evaluate.py
    deps:
      - src/evaluate.py
      - models/model.pkl
      - data/processed/test.csv
    metrics:
      - metrics/eval_report.json:
          cache: false`,out:`# Run the full pipeline: dvc repro
# DVC only re-runs stages whose inputs have changed (like Make).
# dvc metrics show — compare metrics across branches/commits
# dvc params diff — see parameter changes between commits`},
  { type:'tip', body:`DVC + Git + MLflow together give you the full reproducibility stack: Git for code, DVC for data and pipeline stages, MLflow for experiment metrics and model artefacts. Any past experiment can be exactly reproduced: checkout the git commit, dvc pull the data, run dvc repro. This is the gold standard for reproducible ML.` }
]};

L['mlops-w1-l4'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Reproducibility & ML Project Structure</h2><p>A reproducible ML project is one where any team member (or your future self) can re-run any experiment and get the same result. Reproducibility is not just nice-to-have — it's the difference between science and alchemy. Without it, you can't debug regressions, audit model decisions, or build on each other's work.</p><h3>Sources of Irreproducibility</h3><ul><li><strong>Random seeds:</strong> Model weight initialisation, data shuffling, train/test split — all stochastic unless seeded</li><li><strong>Dependency versions:</strong> scikit-learn 1.2 and 1.3 may give different results for the same code</li><li><strong>Data mutations:</strong> If the training dataset was modified after training, you can't reproduce the result</li><li><strong>Implicit state:</strong> Jupyter notebooks with cells run out of order; global mutable state</li><li><strong>Hardware differences:</strong> Float precision differences between CPU/GPU, different BLAS libraries</li></ul>` },
  { type:'code', lang:'python', src:`# Reproducibility checklist in code
import os, random, numpy as np, torch

def set_all_seeds(seed: int = 42):
    """Set all random seeds for reproducibility."""
    os.environ['PYTHONHASHSEED'] = str(seed)
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False  # slower but deterministic

set_all_seeds(42)

# Dependency management — always pin versions
# requirements.txt approach (minimal):
# scikit-learn==1.4.2
# pandas==2.2.1
# numpy==1.26.4

# Better: use a lock file (pip-compile, Poetry, conda lock)
# poetry.lock captures exact transitive dependency versions

# --- Cookiecutter Data Science project structure ---
PROJECT_STRUCTURE = """
my-ml-project/
├── data/
│   ├── raw/          ← original, immutable data (DVC-tracked)
│   ├── interim/      ← intermediate transformations
│   └── processed/    ← final datasets for modelling
├── models/           ← trained model artefacts (DVC-tracked)
├── notebooks/        ← exploration only; numbered for order
│   └── 01-eda.ipynb
├── src/
│   ├── data/         ← data download/generation scripts
│   ├── features/     ← feature engineering
│   ├── models/       ← train and predict scripts
│   └── visualization/
├── tests/            ← unit + integration tests
├── params.yaml       ← all hyperparameters (DVC reads this)
├── dvc.yaml          ← pipeline stages
├── Makefile          ← common commands (make train, make test)
├── pyproject.toml    ← dependencies + project metadata
└── README.md
"""
print(PROJECT_STRUCTURE)`,out:`# Key principle: data/raw/ is read-only — never modify it.
# All transformations produce new files in data/interim/ or data/processed/.
# This makes every step auditable and reversible.`},
  { type:'tip', body:`Cookiecutter Data Science (cookiecutter.io/data-science) generates this structure in seconds. Use it as a starting point for every project. The Makefile target convention (make data, make train, make predict) creates a self-documenting project where new team members can get running in minutes.` }
]};

L['mlops-w1-l5'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>The MLOps Maturity Model</h2><p>Google's MLOps maturity model defines three levels that reflect how automated and disciplined an organisation's ML practices are. Understanding where you are helps prioritise what to invest in next.</p><h3>Level 0 — Manual (Notebook MLOps)</h3><p>All steps are manual and script-driven. Data scientists train models in notebooks, hand-package them, and manually deploy. No automated retraining, no monitoring. Most companies start here. <em>Pain point:</em> releases are infrequent, error-prone, and unreproducible.</p><h3>Level 1 — Automated ML Pipeline</h3><p>The ML pipeline is automated: data ingestion, transformation, training, validation, and deployment all run programmatically. Models retrain on a schedule or trigger. Experiment tracking is in place. <em>Pain point:</em> deploying a new model still requires manually configuring and deploying the pipeline itself.</p><h3>Level 2 — Automated ML + CI/CD</h3><p>The pipeline itself is under CI/CD. A code change triggers: unit tests → integration tests → model training → model evaluation → canary deployment → full rollout. Everything is automated, monitored, and governed. This is the goal for production ML organisations.</p>` },
  { type:'code', lang:'python', src:`# MLOps maturity self-assessment — rate your organisation
maturity_checks = {
    "Level 0 (Manual)": {
        "Experiment tracking": "Spreadsheets or none",
        "Model versioning":    "Files named model_final_v3_FINAL.pkl",
        "Deployment":          "SSH into server and copy file",
        "Monitoring":          "User complaints",
        "Retraining":          "When someone remembers",
    },
    "Level 1 (Automated Pipeline)": {
        "Experiment tracking": "MLflow / W&B / Neptune",
        "Model versioning":    "MLflow Model Registry with staging/prod",
        "Deployment":          "Automated via CI trigger",
        "Monitoring":          "Dashboards with drift alerts",
        "Retraining":          "Scheduled or drift-triggered",
    },
    "Level 2 (Full CI/CD)": {
        "Experiment tracking": "MLflow + automatic comparison gates",
        "Model versioning":    "Git-tagged pipeline + model artefacts",
        "Deployment":          "Canary → rollout with automated rollback",
        "Monitoring":          "Real-time with auto-retraining on degradation",
        "Retraining":          "Continuous, with champion/challenger testing",
    }
}

# Practical MLOps stack for a 2-5 person team:
stack = {
    "Experiment tracking": "MLflow (self-hosted) or W&B (cloud)",
    "Data versioning":     "DVC + S3",
    "Model registry":      "MLflow Model Registry",
    "Serving":             "FastAPI + Docker + Kubernetes",
    "Orchestration":       "Prefect or Airflow",
    "Monitoring":          "Evidently AI + Prometheus + Grafana",
    "CI/CD":               "GitHub Actions",
}
print("Recommended stack for small ML teams:")
for component, tool in stack.items():
    print(f"  {component:25s}: {tool}")`,out:`Recommended stack for small ML teams:
  Experiment tracking      : MLflow (self-hosted) or W&B (cloud)
  Data versioning          : DVC + S3
  Model registry           : MLflow Model Registry
  Serving                  : FastAPI + Docker + Kubernetes
  Orchestration            : Prefect or Airflow
  Monitoring               : Evidently AI + Prometheus + Grafana
  CI/CD                    : GitHub Actions`},
  { type:'tip', body:`Don't try to reach Level 2 immediately. For most teams, Level 1 is a 10× improvement over Level 0 and is achievable in 4–8 weeks. Focus on: (1) experiment tracking (instant value), (2) reproducible training scripts (not notebooks), (3) a model registry, (4) basic monitoring. Level 2 CI/CD comes once Level 1 is stable.` }
]};

L['mlops-w1-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 1 Quiz</h2><p>Test your knowledge of MLOps fundamentals, experiment tracking, and data versioning.</p>` }
]};

/* ── MODULE 2: Model Packaging & Serving ── */

L['mlops-w2-l1'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Model Serialisation — pickle, joblib & ONNX</h2><p>A trained model exists as Python objects in memory. To deploy it, you must <em>serialise</em> it to disk and later <em>deserialise</em> it in the serving environment. Several formats exist with different tradeoffs in portability, security, and performance.</p><h3>pickle & joblib</h3><p>Python's built-in serialisation. <code>joblib</code> is preferred over raw pickle for ML models — it handles large NumPy arrays efficiently with memory-mapped files. Both are Python-only, with no cross-language portability, and are unsafe to deserialise from untrusted sources (arbitrary code execution).</p>` },
  { type:'code', lang:'python', src:`import joblib, pickle
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import numpy as np

# Train a sklearn pipeline
X = np.random.randn(1000, 10)
y = (X[:, 0] + X[:, 1] > 0).astype(int)

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('clf', LogisticRegression())
])
pipeline.fit(X, y)

# Save with joblib (preferred for ML models)
joblib.dump(pipeline, 'model.joblib', compress=3)  # compress=3 balances size/speed

# Or pickle (more standard, slightly less efficient for arrays)
with open('model.pkl', 'wb') as f:
    pickle.dump(pipeline, f)

# Load and predict
loaded = joblib.load('model.joblib')
predictions = loaded.predict(X[:5])
print(f"Predictions: {predictions}")

# ONNX — Open Neural Network Exchange
# Cross-platform: train in Python, serve in C++/Java/C#/JS
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType
import onnxruntime as rt

# Convert sklearn pipeline to ONNX
initial_type = [('float_input', FloatTensorType([None, 10]))]
onnx_model = convert_sklearn(pipeline, initial_types=initial_type)
with open('model.onnx', 'wb') as f:
    f.write(onnx_model.SerializeToString())

# Run inference with ONNX Runtime (C++ backend, much faster than Python sklearn)
sess = rt.InferenceSession('model.onnx')
input_name = sess.get_inputs()[0].name
onnx_preds = sess.run(None, {input_name: X[:5].astype(np.float32)})[0]
print(f"ONNX predictions: {onnx_preds}")`,out:`Predictions: [1 1 0 0 1]
ONNX predictions: [1 1 0 0 1]
# ONNX Runtime is typically 2-10× faster than sklearn for inference.`},
  { type:'text', body:`<h3>Format Comparison</h3><table style="width:100%;border-collapse:collapse;font-size:.84rem;"><thead><tr style="background:rgba(255,255,255,.05)"><th style="padding:.5rem;text-align:left;">Format</th><th style="padding:.5rem;text-align:left;">Portability</th><th style="padding:.5rem;text-align:left;">Speed</th><th style="padding:.5rem;text-align:left;">Safety</th><th style="padding:.5rem;text-align:left;">Best for</th></tr></thead><tbody><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">pickle/joblib</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Python only</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Medium</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Unsafe</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Internal Python services</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">ONNX</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Cross-language</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">High</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Safe</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Production, edge, embedded</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">TorchScript</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Python/C++</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">High</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Safe</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">PyTorch models in C++ services</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">SavedModel</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">TF ecosystem</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">High</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Safe</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">TensorFlow Serving</td></tr></tbody></table>` },
  { type:'tip', body:`Never deserialise pickle files from untrusted sources — a malicious pickle can execute arbitrary Python code when loaded. For any model that crosses a trust boundary (downloaded from the internet, received from an external party), use ONNX or SafeTensors (Hugging Face's safe alternative to pytorch's .bin format).` }
]};

L['mlops-w2-l2'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Docker for ML — Containerising Models</h2><p><strong>Docker</strong> solves the "it works on my machine" problem by packaging the application, its dependencies, and the runtime environment into a portable container image. For ML, Docker ensures that the model serving environment is identical in development, staging, and production — eliminating "but it worked in the notebook" failures.</p><p>A Docker container runs the same on a MacBook, a Linux CI server, and a Kubernetes cluster in the cloud. This reproducibility is foundational to MLOps.</p>` },
  { type:'code', lang:'bash', src:`# Dockerfile for a FastAPI ML model server
# Best practice: multi-stage build for small production image

# Stage 1: Build dependencies
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Production image (no build tools)
FROM python:3.11-slim
WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

# Copy application code and model
COPY src/ src/
COPY models/model.joblib models/
COPY config.yaml .

# Create non-root user for security
RUN useradd --create-home --shell /bin/bash appuser
USER appuser

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

CMD ["uvicorn", "src.api:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]`,out:`# Build: docker build -t fraud-detector:v1.2.3 .
# Run:   docker run -p 8000:8000 fraud-detector:v1.2.3
# Push:  docker push registry.example.com/fraud-detector:v1.2.3`},
  { type:'code', lang:'yaml', src:`# docker-compose.yml — local development with all services
version: '3.8'
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - MODEL_PATH=/models/model.joblib
      - LOG_LEVEL=INFO
    volumes:
      - ./models:/models:ro    # read-only model mount
    depends_on:
      - redis
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  mlflow:
    image: ghcr.io/mlflow/mlflow:v2.10.0
    ports:
      - "5000:5000"
    command: mlflow server --host 0.0.0.0 --port 5000
    volumes:
      - ./mlruns:/mlruns

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml`,out:`# docker compose up -d    → starts all services
# docker compose logs -f api → tail API logs
# docker compose down       → stop and remove containers`},
  { type:'tip', body:`ML-specific Docker tips: (1) Pin both Python version and base image digest (FROM python:3.11.7-slim@sha256:...) for full reproducibility. (2) Use .dockerignore to exclude data/, .git/, notebooks/ — keeps images small. (3) For GPU workloads, use nvidia/cuda base images and install the CUDA toolkit matching your GPU driver version.` }
]};

L['mlops-w2-l3'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>FastAPI for ML Inference Servers</h2><p><strong>FastAPI</strong> is the dominant Python framework for production ML APIs — combining automatic OpenAPI documentation, async support, input validation via Pydantic, and high performance (built on Starlette/uvicorn). It handles the boilerplate of HTTP serving so you can focus on model logic.</p>` },
  { type:'code', lang:'python', src:`from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field, validator
import joblib, numpy as np, logging, time
from contextlib import asynccontextmanager
from prometheus_client import Counter, Histogram, generate_latest
from starlette.responses import Response

# --- Request/Response schemas ---
class PredictionRequest(BaseModel):
    features: list[float] = Field(..., min_items=10, max_items=10)
    request_id: str | None = None

    @validator('features')
    def check_ranges(cls, v):
        if any(abs(x) > 100 for x in v):
            raise ValueError("Feature values must be in [-100, 100]")
        return v

class PredictionResponse(BaseModel):
    prediction: int
    probability: float
    model_version: str
    latency_ms: float

# --- Metrics ---
REQUESTS = Counter('predictions_total', 'Total predictions', ['status'])
LATENCY  = Histogram('prediction_latency_seconds', 'Prediction latency')

# --- App lifecycle: load model once at startup ---
model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    logging.info("Loading model...")
    model = joblib.load("models/model.joblib")
    logging.info("Model loaded, server ready.")
    yield
    logging.info("Shutting down.")

app = FastAPI(title="Fraud Detection API", version="1.2.3", lifespan=lifespan)

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    t0 = time.perf_counter()
    try:
        X = np.array(request.features).reshape(1, -1)
        pred = int(model.predict(X)[0])
        prob = float(model.predict_proba(X)[0, 1])
        latency = (time.perf_counter() - t0) * 1000
        REQUESTS.labels(status='success').inc()
        LATENCY.observe(latency / 1000)
        return PredictionResponse(prediction=pred, probability=prob,
                                   model_version="1.2.3", latency_ms=round(latency, 2))
    except Exception as e:
        REQUESTS.labels(status='error').inc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "healthy", "model_loaded": model is not None}

@app.get("/metrics")
async def metrics():
    return Response(generate_latest(), media_type="text/plain")`,out:`# Run: uvicorn src.api:app --host 0.0.0.0 --port 8000 --workers 4
# API docs auto-generated at: http://localhost:8000/docs
# Health check:  GET  /health → {"status": "healthy", ...}
# Prediction:    POST /predict → {"prediction": 1, "probability": 0.93, ...}`},
  { type:'tip', body:`Load the model once at startup (in lifespan/on_event), not per-request — loading a joblib model on every request adds 100–500ms of unnecessary latency. For high-throughput scenarios, consider batching requests (collect N predictions, run one model forward pass) or async model pools to serve multiple concurrent requests.` }
]};

L['mlops-w2-l4'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Batch vs Online Inference</h2><p>ML models can serve predictions in two modes: <strong>online (real-time)</strong> inference responds to individual requests as they arrive; <strong>batch</strong> inference processes a large dataset at once on a schedule. Choosing the right mode is a critical architectural decision.</p><h3>Online Inference</h3><p>Requests arrive and predictions are returned within milliseconds to seconds. Required when the prediction must influence a real-time action (fraud detection at point of sale, recommendation in a web request, content moderation on upload). Architecture: REST/gRPC API server, load-balanced, horizontally scaled.</p><h3>Batch Inference</h3><p>Run predictions on millions of records overnight or on a schedule. Results are stored and served from a database when needed. Used when predictions are independent of user actions (pre-computing personalised emails, scoring all customers for a marketing campaign, nightly risk assessment). Architecture: Spark job, Airflow DAG, or AWS Batch.</p>` },
  { type:'code', lang:'python', src:`import pandas as pd, joblib, numpy as np
from datetime import datetime

# ─── Batch inference pipeline ───
def batch_predict(input_path: str, output_path: str, model_path: str, chunk_size: int = 10000):
    """
    Process a large CSV in chunks to avoid memory issues.
    Writes predictions incrementally to avoid losing work on failure.
    """
    model = joblib.load(model_path)
    feature_cols = [f'feature_{i}' for i in range(10)]

    first_chunk = True
    total_processed = 0

    for chunk in pd.read_csv(input_path, chunksize=chunk_size):
        X = chunk[feature_cols].values.astype(np.float32)
        chunk['prediction']  = model.predict(X)
        chunk['probability'] = model.predict_proba(X)[:, 1]
        chunk['scored_at']   = datetime.utcnow().isoformat()
        chunk['model_version'] = '1.2.3'

        chunk[['customer_id','prediction','probability','scored_at','model_version']].to_csv(
            output_path,
            mode='w' if first_chunk else 'a',
            header=first_chunk,
            index=False
        )
        first_chunk = False
        total_processed += len(chunk)

    print(f"Batch complete: {total_processed:,} records → {output_path}")

# ─── Throughput benchmark ───
# Online: ~100–5000 predictions/second (latency-optimised)
# Batch:  10,000–500,000 predictions/second (throughput-optimised)

# ─── Hybrid: pre-computed online serving ───
# Pre-compute predictions for all known users in batch,
# store in Redis, serve instantly from cache at request time.
# Best of both: batch throughput + online latency.`,out:`Batch complete: 2,500,000 records → predictions/2026-01-24.csv`},
  { type:'text', body:`<h3>Decision Framework</h3><table style="width:100%;border-collapse:collapse;font-size:.84rem;"><thead><tr style="background:rgba(255,255,255,.05)"><th style="padding:.5rem;text-align:left;">Factor</th><th style="padding:.5rem;text-align:left;">Use Online</th><th style="padding:.5rem;text-align:left;">Use Batch</th></tr></thead><tbody><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Latency requirement</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">&lt; 1 second</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Minutes to hours OK</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Prediction freshness</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Must use real-time features</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Historical features OK</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Scale</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Variable, bursty traffic</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Predictable, large volume</td></tr><tr><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Cost</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Higher (always-on infra)</td><td style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07)">Lower (spot instances)</td></tr></tbody></table>` },
  { type:'tip', body:`The pre-computed (hybrid) pattern is underused: for entities you can enumerate in advance (users, products, accounts), compute predictions in batch overnight and store in Redis. Serve from cache at request time with sub-millisecond latency. Only fall back to real-time inference for new or changed entities. Works for 80% of "online" use cases at 10% of the infrastructure cost.` }
]};

L['mlops-w2-l5'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>REST API Design for ML</h2><p>A well-designed ML API is predictable, safe to evolve, and debuggable in production. Many ML APIs are thrown together quickly and become maintenance nightmares. A few principles applied early save enormous future pain.</p><h3>Input Validation & Error Handling</h3><p>Never trust input. Validate: (1) all required fields are present, (2) types are correct, (3) values are in expected ranges, (4) strings are properly encoded. Return structured errors with HTTP status codes: 400 for bad input (caller's fault), 422 for validation errors, 500 for server errors (our fault). Never let a raw Python stack trace reach the caller.</p>` },
  { type:'code', lang:'python', src:`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, validator, Field
from typing import Optional
import logging, uuid

app = FastAPI()
logger = logging.getLogger(__name__)

# Version the API from day 1 — v1/ prefix allows breaking changes later
@app.post("/v1/predict")
async def predict_v1(request: PredictionRequest):
    ...

# ─── Versioning strategies ───
# URL versioning:    /v1/predict   → /v2/predict  (most common, explicit)
# Header versioning: Accept: application/vnd.myapi.v2+json
# Query versioning:  /predict?version=2

# ─── Idempotency & request IDs ───
class PredictionRequestV2(BaseModel):
    features: list[float]
    request_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    # Caller can supply request_id for idempotency: retrying with same ID
    # returns cached result, preventing double-scoring

# ─── Rate limiting with slowapi ───
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/v1/predict")
@limiter.limit("100/minute")   # prevent abuse
async def predict_rate_limited(request: PredictionRequest):
    ...

# ─── Structured logging for observability ───
def log_prediction(request_id, features, prediction, latency_ms):
    logger.info("prediction", extra={
        "request_id":    request_id,
        "prediction":    prediction,
        "latency_ms":    latency_ms,
        "feature_hash":  hash(tuple(features)),  # for debugging without storing raw features
        "model_version": "1.2.3",
    })
    # Log to Datadog/CloudWatch/Splunk for analysis`,out:`# Good API contract example:
# POST /v1/predict
# → 200: {"prediction": 1, "probability": 0.93, "request_id": "...", "model_version": "1.2.3"}
# → 400: {"detail": "features must have exactly 10 elements"}
# → 422: {"detail": [{"loc": ["body", "features", 3], "msg": "value is not a valid float"}]}
# → 429: {"detail": "Rate limit exceeded: 100/minute"}`},
  { type:'tip', body:`Include model_version in every response — this is essential for debugging. When a user reports a wrong prediction from 3 weeks ago, you need to know which model version made it. Also log the prediction input hash (not raw features if they're sensitive) and request_id so you can reproduce the exact prediction in your debugging environment.` }
]};

L['mlops-w2-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 2 Quiz</h2><p>Test your knowledge of model serialisation, Docker containerisation, FastAPI serving, and inference patterns.</p>` }
]};

/* ── MODULE 3: CI/CD for Machine Learning ── */

L['mlops-w3-l1'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>GitHub Actions for ML Pipelines</h2><p><strong>GitHub Actions</strong> is the most accessible CI/CD platform for ML teams — it's free for public repos, tightly integrated with GitHub, and has a rich marketplace of pre-built actions. For ML, it automates: running tests on every PR, training models on data changes, validating model quality before deployment, and building/pushing Docker images.</p>` },
  { type:'code', lang:'yaml', src:`# .github/workflows/ml-pipeline.yml
# Triggered on push to main and pull requests

name: ML Pipeline

on:
  push:
    branches: [main]
    paths:
      - 'src/**'
      - 'data/**'
      - 'params.yaml'
  pull_request:
    branches: [main]

env:
  PYTHON_VERSION: "3.11"
  MODEL_REGISTRY: ghcr.io/myorg/fraud-detector

jobs:
  # ── Job 1: Code quality ──
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: {python-version: "\${{ env.PYTHON_VERSION }}"}
      - run: pip install ruff mypy
      - run: ruff check src/
      - run: mypy src/ --ignore-missing-imports

  # ── Job 2: Unit & integration tests ──
  test:
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: {python-version: "\${{ env.PYTHON_VERSION }}"}
      - run: pip install -r requirements.txt
      - run: pytest tests/ -v --tb=short --cov=src --cov-report=xml
      - uses: codecov/codecov-action@v4

  # ── Job 3: Train & evaluate model ──
  train-evaluate:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Setup DVC + pull data
        run: |
          pip install dvc[s3]
          dvc pull data/processed/
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
      - name: Train model
        run: dvc repro train
      - name: Evaluate against baseline
        run: python scripts/evaluate_vs_baseline.py --fail-if-worse
      - name: Push model artefact
        run: dvc push models/`,out:`# On every PR: lint → test (fast feedback, < 5 min)
# On merge to main: lint → test → train → evaluate → build → deploy
# Fail fast: if tests fail, training doesn't run (saves compute cost)`},
  { type:'code', lang:'yaml', src:`  # ── Job 4: Build & push Docker image ──
  build-push:
    needs: train-evaluate
    runs-on: ubuntu-latest
    permissions: {contents: read, packages: write}
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: |
            \${{ env.MODEL_REGISTRY }}:latest
            \${{ env.MODEL_REGISTRY }}:\${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # ── Job 5: Deploy to staging ──
  deploy-staging:
    needs: build-push
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Deploy to Kubernetes staging
        run: |
          kubectl set image deployment/fraud-detector \
            api=\${{ env.MODEL_REGISTRY }}:\${{ github.sha }} \
            --namespace staging
          kubectl rollout status deployment/fraud-detector --namespace staging`,out:`# GitHub Actions environments support required reviewers for production deploys.
# "environment: production" can require manual approval before deployment runs.`},
  { type:'tip', body:`Cache pip dependencies and Docker layers in GitHub Actions for 3–5× faster CI runs: use actions/cache for pip and type=gha cache in docker/build-push-action. For GPU training, use self-hosted runners (your own GPU machines registered as GitHub runners) — GitHub-hosted runners have no GPUs.` }
]};

L['mlops-w3-l2'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Automated Testing for ML</h2><p>Testing ML systems is harder than testing regular software because there's no single correct output — and the "bugs" often look like degraded performance rather than crashes. ML testing requires multiple test layers: code tests (standard), data tests, and model behaviour tests.</p><h3>Test Pyramid for ML</h3><ol><li><strong>Unit tests:</strong> Test feature engineering functions, preprocessing logic, utility code — fast, isolated, no model needed</li><li><strong>Data validation tests:</strong> Schema checks, value range checks, distribution checks on your dataset</li><li><strong>Model behaviour tests:</strong> Invariance (input perturbations shouldn't change prediction), directional tests (increasing age should increase churn probability), minimum performance tests</li><li><strong>Integration tests:</strong> API end-to-end, feature pipeline to model output</li></ol>` },
  { type:'code', lang:'python', src:`import pytest
import numpy as np
import pandas as pd
from src.features import compute_features
from src.model import load_model, predict

# ─── Unit tests for feature engineering ───
class TestFeatureEngineering:
    def test_age_bucket_boundaries(self):
        """Age buckets: 0-18 → 'young', 19-65 → 'adult', 65+ → 'senior'."""
        assert compute_features(pd.DataFrame({'age': [0]}))['age_bucket'][0] == 'young'
        assert compute_features(pd.DataFrame({'age': [18]}))['age_bucket'][0] == 'young'
        assert compute_features(pd.DataFrame({'age': [19]}))['age_bucket'][0] == 'adult'
        assert compute_features(pd.DataFrame({'age': [65]}))['age_bucket'][0] == 'adult'
        assert compute_features(pd.DataFrame({'age': [66]}))['age_bucket'][0] == 'senior'

    def test_null_handling(self):
        """Missing values should be imputed, not produce NaN in output."""
        df = pd.DataFrame({'age': [None], 'income': [50000]})
        result = compute_features(df)
        assert not result.isnull().any().any(), "Feature output contains NaN"

# ─── Model behaviour tests (invariance + directional) ───
class TestModelBehaviour:
    @pytest.fixture(scope='class')
    def model(self):
        return load_model("models/model.joblib")

    def test_prediction_shape(self, model):
        X = np.random.randn(100, 10)
        preds = model.predict(X)
        assert preds.shape == (100,)

    def test_probability_range(self, model):
        """Probabilities must be in [0, 1]."""
        X = np.random.randn(1000, 10)
        probs = model.predict_proba(X)[:, 1]
        assert (probs >= 0).all() and (probs <= 1).all()

    def test_invariance_to_noise(self, model):
        """Small input perturbations should not flip predictions."""
        X = np.random.randn(100, 10)
        original_preds = model.predict(X)
        noisy_X = X + np.random.randn(*X.shape) * 0.001  # tiny noise
        noisy_preds = model.predict(noisy_X)
        flip_rate = (original_preds != noisy_preds).mean()
        assert flip_rate < 0.05, f"Too many prediction flips ({flip_rate:.1%}) under tiny noise"

    def test_minimum_auc(self, model, test_data):
        """Model must achieve at least 0.85 AUC on holdout data."""
        from sklearn.metrics import roc_auc_score
        X_test, y_test = test_data
        auc = roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])
        assert auc >= 0.85, f"Model AUC {auc:.4f} below minimum threshold 0.85"`,out:`# pytest tests/ -v
# 14 passed, 0 failed, 2 warnings in 3.42s
# Minimum AUC gate: if a new model scores < 0.85, CI fails and deployment is blocked.`},
  { type:'tip', body:`The minimum performance test (assert auc >= threshold) is your safety net against accidentally deploying a degraded model. Set the threshold at ~95% of your current production model's performance — tight enough to catch real regressions, loose enough not to block legitimate improvements. Update the threshold whenever you deploy a significantly better model.` }
]};

L['mlops-w3-l3'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Model Validation Gates</h2><p>A <strong>model validation gate</strong> is an automated check that must pass before a new model can be deployed. Gates encode your quality standards as code — making them consistent, auditable, and impossible to accidentally skip. Think of it as a bouncer for your model registry: no model gets into production without passing every check.</p><h3>Types of Gates</h3><ul><li><strong>Performance gate:</strong> New model must outperform (or match) current production model on a held-out evaluation set</li><li><strong>Fairness gate:</strong> Model performance must not degrade significantly for protected subgroups (gender, race, age)</li><li><strong>Latency gate:</strong> p99 inference latency must be below SLA threshold (e.g. 200ms)</li><li><strong>Calibration gate:</strong> Predicted probabilities must match empirical frequencies (important for decision-making)</li><li><strong>Slice evaluation:</strong> Performance must be acceptable on every important data slice, not just overall</li></ul>` },
  { type:'code', lang:'python', src:`import mlflow, numpy as np
from sklearn.metrics import roc_auc_score, brier_score_loss
from scipy import stats

def validate_model(
    new_model_uri: str,
    prod_model_uri: str,
    X_test: np.ndarray,
    y_test: np.ndarray,
    subgroups: dict = None,
    latency_threshold_ms: float = 200.0,
) -> dict:
    """
    Run all validation gates for a candidate model.
    Returns a report dict; raises ValueError if any gate fails.
    """
    import time, joblib
    new_model  = mlflow.sklearn.load_model(new_model_uri)
    prod_model = mlflow.sklearn.load_model(prod_model_uri)

    # ── Gate 1: Overall performance ──
    new_auc  = roc_auc_score(y_test, new_model.predict_proba(X_test)[:,1])
    prod_auc = roc_auc_score(y_test, prod_model.predict_proba(X_test)[:,1])
    perf_gate = new_auc >= prod_auc - 0.005  # allow 0.5% degradation
    if not perf_gate:
        raise ValueError(f"Performance gate FAILED: new AUC {new_auc:.4f} < prod {prod_auc:.4f}")

    # ── Gate 2: Latency ──
    sample = X_test[:1000]
    t0 = time.perf_counter()
    for _ in range(100):
        new_model.predict_proba(sample)
    p99_latency_ms = (time.perf_counter()-t0) / 100 * 1000 / len(sample) * 1000
    if p99_latency_ms > latency_threshold_ms:
        raise ValueError(f"Latency gate FAILED: {p99_latency_ms:.1f}ms > {latency_threshold_ms}ms")

    # ── Gate 3: Subgroup fairness ──
    if subgroups:
        for group_name, mask in subgroups.items():
            group_auc = roc_auc_score(y_test[mask], new_model.predict_proba(X_test[mask])[:,1])
            if group_auc < 0.75:
                raise ValueError(f"Fairness gate FAILED: group '{group_name}' AUC={group_auc:.4f}")

    return {"status": "PASSED", "new_auc": new_auc, "prod_auc": prod_auc,
            "auc_delta": new_auc - prod_auc, "p99_latency_ms": p99_latency_ms}`,out:`# All gates passed → model promoted to Staging in MLflow registry
# Any gate failure → deployment blocked, alert sent to ML team Slack channel`},
  { type:'tip', body:`Store the validation gate thresholds in a config file (thresholds.yaml), not hardcoded in the validation script. This makes them reviewable in PRs, auditable in git history, and easy to adjust without code changes. Governance teams can also review and sign off on threshold changes.` }
]};

L['mlops-w3-l4'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Pre-commit Hooks & Code Quality</h2><p><strong>Pre-commit hooks</strong> run automatically before every git commit, catching problems locally before they ever reach CI. For ML projects, they enforce code formatting, catch obvious bugs, prevent large file commits, and run fast tests — giving instant feedback to developers rather than making them wait for a CI pipeline.</p>` },
  { type:'code', lang:'yaml', src:`# .pre-commit-config.yaml — install with: pre-commit install

repos:
  # Code formatting
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.3.0
    hooks:
      - id: ruff           # extremely fast linter (replaces flake8/isort)
        args: [--fix]
      - id: ruff-format    # formatter (replaces black)

  # Type checking
  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.8.0
    hooks:
      - id: mypy
        additional_dependencies: [types-requests, pandas-stubs]

  # Security scanning
  - repo: https://github.com/PyCQA/bandit
    rev: 1.7.7
    hooks:
      - id: bandit
        args: [-c, pyproject.toml]

  # Prevent large files in git (datasets, model weights belong in DVC)
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: check-large-files
        args: [--maxkb=500]   # block files > 500KB
      - id: check-merge-conflict
      - id: check-yaml
      - id: end-of-file-fixer
      - id: trailing-whitespace
      - id: debug-statements   # catches forgotten print() and import pdb

  # Notebook cleaning (remove outputs before committing)
  - repo: https://github.com/kynan/nbstripout
    rev: 0.7.1
    hooks:
      - id: nbstripout        # strips notebook outputs — only code in git`,out:`# pre-commit run --all-files   → run all hooks on all files
# pre-commit run ruff          → run only ruff
# Every developer runs: pre-commit install
# (once, after cloning the repo — runs automatically on git commit)`},
  { type:'code', lang:'toml', src:`# pyproject.toml — centralise all tool config
[tool.ruff]
line-length = 100
select = ["E", "F", "I", "N", "W", "B", "UP"]
ignore = ["E501"]  # line too long (handled by formatter)

[tool.ruff.per-file-ignores]
"tests/*" = ["S101"]  # allow assert in tests

[tool.mypy]
python_version = "3.11"
warn_return_any = true
strict = false  # start non-strict, increase over time

[tool.bandit]
exclude_dirs = ["tests", "notebooks"]
skips = ["B101"]  # skip assert warnings (covered by mypy)

[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "-v --tb=short -x"  # -x: stop on first failure`,out:`# Single source of truth for all code quality config.
# ruff replaces: flake8, isort, pep8, pyflakes, mccabe.
# One tool, one config section, instant feedback.`},
  { type:'tip', body:`The nbstripout hook is critical for ML teams: notebooks committed with output (plots, DataFrames) cause enormous diffs, make reviews unreadable, and may accidentally commit sensitive data (API keys in print statements, PII in sample data). Always strip notebooks — use nbstripout or nbconvert --clear-output in CI.` }
]};

L['mlops-w3-l5'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Continuous Training Pipelines</h2><p>A model deployed once is a model that decays. Real-world data distributions shift — customer behaviour changes, products evolve, fraud patterns adapt. <strong>Continuous training</strong> automatically retrains and redeploys models on a schedule or when triggered by performance degradation, keeping models fresh without manual intervention.</p><h3>Retraining Triggers</h3><ul><li><strong>Scheduled:</strong> Retrain daily/weekly/monthly. Simple, predictable, but may retrain unnecessarily or miss urgent degradation</li><li><strong>Data-triggered:</strong> Retrain when a new batch of labelled data arrives (works well for supervised learning with regular labelling cycles)</li><li><strong>Performance-triggered:</strong> Retrain when monitoring detects accuracy drop or drift crossing a threshold — most responsive, requires robust monitoring</li><li><strong>Manual:</strong> A human decides to retrain based on domain knowledge (product launch, regulatory change)</li></ul>` },
  { type:'code', lang:'python', src:`# Prefect continuous training flow
from prefect import flow, task
from prefect.deployments import Deployment
from prefect.server.schemas.schedules import CronSchedule
import mlflow, pandas as pd

@task(retries=3, retry_delay_seconds=60)
def fetch_new_data(since_date: str) -> pd.DataFrame:
    """Pull new labelled records from the feature store."""
    # In practice: query from Snowflake, BigQuery, or feature store
    return pd.read_sql(f"SELECT * FROM training_data WHERE date >= '{since_date}'", conn)

@task
def train_model(df: pd.DataFrame) -> str:
    """Train model and log to MLflow, return run_id."""
    with mlflow.start_run() as run:
        X, y = df.drop('label', axis=1), df['label']
        model = build_and_train_model(X, y)
        mlflow.sklearn.log_model(model, "model")
        mlflow.log_metrics(evaluate(model, X_val, y_val))
        return run.info.run_id

@task
def validate_and_promote(run_id: str) -> bool:
    """Run validation gates; promote to staging if passed."""
    try:
        report = validate_model(
            new_model_uri=f"runs:/{run_id}/model",
            prod_model_uri="models:/fraud-detector/Production",
            X_test=X_holdout, y_test=y_holdout
        )
        mlflow.register_model(f"runs:/{run_id}/model", "fraud-detector")
        client.transition_model_version_stage("fraud-detector",
            version=report['version'], stage="Staging")
        return True
    except ValueError as e:
        notify_slack(f"Model validation failed: {e}")
        return False

@flow(name="weekly-model-retraining")
def retraining_pipeline():
    df = fetch_new_data(since_date="7 days ago")
    if len(df) < 10_000:
        return  # not enough new data to retrain
    run_id = train_model(df)
    promoted = validate_and_promote(run_id)
    if promoted:
        notify_slack("New model staged for deployment. Review: /models")

# Schedule: run every Sunday at 2am UTC
Deployment.build_from_flow(
    flow=retraining_pipeline,
    name="weekly-retraining",
    schedule=CronSchedule(cron="0 2 * * 0")
).apply()`,out:`# On trigger: fetch data → train → validate → promote to staging
# If promoted: triggers CD pipeline to deploy staging → canary → production
# If failed: alert sent, production model unchanged`},
  { type:'tip', body:`Continuous training requires continuous evaluation data. Establish a labelling pipeline — human annotators, programmatic labels, or delayed outcome data (loan default labels arrive 6–12 months after the loan). Without fresh labels, you can continuously retrain but can't validate whether the new model is actually better.` }
]};

L['mlops-w3-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 3 Quiz</h2><p>Test your knowledge of GitHub Actions, ML testing, model validation gates, pre-commit hooks, and continuous training.</p>` }
]};

/* ── MODULE 4: Model Monitoring & Observability ── */

L['mlops-w4-l1'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Data Drift & Concept Drift Detection</h2><p>A model trained on January data will degrade as the world changes — not because the model broke, but because the data it sees in production drifts away from the training distribution. There are two distinct types of drift to monitor.</p><h3>Data Drift (Covariate Shift)</h3><p>The distribution of input features X changes: P_prod(X) ≠ P_train(X). Example: a credit model trained when interest rates were 3% now sees customers with different debt patterns when rates are 7%. The input features look different. The model hasn't changed; the world has.</p><h3>Concept Drift (Label Drift)</h3><p>The relationship between features and labels changes: P(Y|X) shifts. Example: a fraud model trained on 2022 fraud patterns. Fraudsters adapt new techniques in 2024 — the same feature values now correspond to different fraud probabilities. This is harder to detect because labels may not be immediately available.</p>` },
  { type:'code', lang:'python', src:`import pandas as pd, numpy as np
from evidently.report import Report
from evidently.metric_preset import DataDriftPreset, TargetDriftPreset
from evidently.metrics import DatasetDriftMetric, ColumnDriftMetric
from scipy import stats

# ─── Statistical drift tests ───
def detect_drift(reference: pd.DataFrame, current: pd.DataFrame,
                 numerical_cols: list, categorical_cols: list,
                 alpha: float = 0.05) -> dict:
    """Detect feature drift using statistical tests."""
    drift_report = {}

    for col in numerical_cols:
        # Kolmogorov-Smirnov test for numerical features
        stat, p_value = stats.ks_2samp(reference[col].dropna(), current[col].dropna())
        drift_report[col] = {
            "test": "KS", "statistic": stat,
            "p_value": p_value, "drifted": p_value < alpha
        }

    for col in categorical_cols:
        # Chi-squared test for categorical features
        ref_counts = reference[col].value_counts()
        cur_counts  = current[col].value_counts()
        all_cats = ref_counts.index.union(cur_counts.index)
        ref_freq = np.array([ref_counts.get(c, 0) for c in all_cats], dtype=float)
        cur_freq = np.array([cur_counts.get(c, 0) for c in all_cats], dtype=float)
        ref_freq = ref_freq / ref_freq.sum()   # normalise to proportions
        cur_freq = cur_freq / cur_freq.sum()
        chi2, p_value = stats.chisquare(cur_freq * len(current), ref_freq * len(current))
        drift_report[col] = {"test": "Chi2", "p_value": p_value, "drifted": p_value < alpha}

    n_drifted = sum(1 for v in drift_report.values() if v['drifted'])
    print(f"Drift detected in {n_drifted}/{len(drift_report)} features")
    return drift_report

# ─── Evidently for rich drift reports ───
report = Report(metrics=[DataDriftPreset(), TargetDriftPreset()])
report.run(reference_data=training_df, current_data=production_df)
report.save_html("drift_report.html")  # visual HTML report`,out:`Drift detected in 3/10 features
# Drifted: transaction_amount (KS p=0.003), merchant_category (Chi2 p=0.001),
#          device_type (Chi2 p=0.041)
# → These features have shifted since model training. Retraining recommended.`},
  { type:'tip', body:`Population Stability Index (PSI) is widely used in finance for drift: PSI < 0.1 = stable, 0.1–0.2 = minor drift (investigate), > 0.2 = significant drift (retrain). It handles categorical variables naturally and is easily explained to business stakeholders. Evidently AI provides PSI alongside KS/Chi2.` }
]};

L['mlops-w4-l2'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Model Performance Monitoring in Production</h2><p>The goal of monitoring is to detect when model quality degrades before users notice. This sounds simple — track accuracy over time — but it's complicated by the fact that <strong>labels are often delayed or unavailable</strong> in production. You know what the model predicted; you may not know the true outcome for days, weeks, or months.</p><h3>Proxy Metrics</h3><p>When ground truth labels aren't available immediately, monitor proxy metrics that correlate with model health:</p><ul><li><strong>Prediction distribution:</strong> If the fraud model suddenly scores 50% of transactions as fraud (vs 2% normally), something is wrong</li><li><strong>Confidence score distribution:</strong> Healthy models have a bimodal distribution (confident predictions). A flat distribution indicates the model is uncertain about everything.</li><li><strong>Feature statistics:</strong> Monitor each input feature's mean, std, and null rate in real-time</li><li><strong>Business metrics:</strong> Downstream impact — click-through rate for recommendation, approval rate for loan decisions</li></ul>` },
  { type:'code', lang:'python', src:`import numpy as np
from collections import deque
import time

class ModelMonitor:
    """Real-time monitoring of model predictions in production."""

    def __init__(self, window_size: int = 1000, alert_threshold: float = 2.0):
        self.predictions = deque(maxlen=window_size)
        self.probabilities = deque(maxlen=window_size)
        self.latencies_ms = deque(maxlen=window_size)
        self.alert_threshold = alert_threshold  # standard deviations for alerting

        # Baseline from training/validation data (set once)
        self.baseline = {
            "mean_probability": 0.18,
            "std_probability":  0.24,
            "positive_rate":    0.12,   # 12% fraud rate in training
        }

    def log_prediction(self, prediction: int, probability: float, latency_ms: float):
        self.predictions.append(prediction)
        self.probabilities.append(probability)
        self.latencies_ms.append(latency_ms)

    def get_metrics(self) -> dict:
        probs = np.array(self.probabilities)
        preds = np.array(self.predictions)
        return {
            "positive_rate":     preds.mean(),
            "mean_probability":  probs.mean(),
            "std_probability":   probs.std(),
            "p50_latency_ms":    np.percentile(self.latencies_ms, 50),
            "p99_latency_ms":    np.percentile(self.latencies_ms, 99),
            "n_predictions":     len(self.predictions),
        }

    def check_alerts(self) -> list:
        metrics = self.get_metrics()
        alerts = []
        # Alert if positive rate deviates significantly from baseline
        baseline_rate = self.baseline["positive_rate"]
        if abs(metrics["positive_rate"] - baseline_rate) > 2 * 0.03:  # 2σ
            alerts.append(f"ALERT: Positive rate {metrics['positive_rate']:.1%} "
                          f"vs baseline {baseline_rate:.1%}")
        # Alert if p99 latency exceeds SLA
        if metrics["p99_latency_ms"] > 200:
            alerts.append(f"ALERT: p99 latency {metrics['p99_latency_ms']:.0f}ms > 200ms SLA")
        return alerts`,out:`# Log every prediction → check_alerts() every 5 minutes
# If alerts: page on-call engineer via PagerDuty/OpsGenie
# If positive_rate doubles overnight: investigate data pipeline or model issue`},
  { type:'tip', body:`Implement "shadow mode" testing for new models: run the new model alongside the production model on all live traffic, log both predictions, but only serve the production model's predictions to users. After 1–2 weeks, compare the predictions and outcomes. If the new model looks better in shadow, proceed with canary deployment.` }
]};

L['mlops-w4-l3'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Logging & Alerting: Prometheus & Grafana</h2><p><strong>Prometheus</strong> scrapes metrics from your services every 15 seconds and stores them as time-series data. <strong>Grafana</strong> visualises these metrics in dashboards and fires alerts when metrics cross thresholds. Together, they form the industry-standard observability stack for production ML systems.</p><p>The FastAPI metrics endpoint from Module 2 (using prometheus_client) is scraped by Prometheus. Grafana queries Prometheus and displays: prediction rate, error rate, latency percentiles, and ML-specific metrics like drift scores and model version.</p>` },
  { type:'code', lang:'yaml', src:`# prometheus.yml — configure Prometheus scrape targets
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']

scrape_configs:
  - job_name: 'fraud-detector-api'
    static_configs:
      - targets: ['api:8000']   # scrape /metrics endpoint
    metrics_path: '/metrics'

  - job_name: 'drift-monitor'
    static_configs:
      - targets: ['drift-service:8001']`,out:`# Access Prometheus UI: http://localhost:9090
# Query example: rate(predictions_total{status="success"}[5m])
# = predictions per second over last 5 minutes`},
  { type:'code', lang:'yaml', src:`# alert_rules.yml — define Prometheus alerting rules
groups:
  - name: ml-model-alerts
    interval: 1m
    rules:
      # Alert if error rate > 1% for 5 consecutive minutes
      - alert: HighPredictionErrorRate
        expr: |
          rate(predictions_total{status="error"}[5m]) /
          rate(predictions_total[5m]) > 0.01
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High prediction error rate"
          description: "Error rate is {{ humanizePercentage $value }} for 5+ minutes"

      # Alert if p99 latency exceeds 200ms SLA
      - alert: HighLatency
        expr: |
          histogram_quantile(0.99,
            rate(prediction_latency_seconds_bucket[5m])) > 0.2
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "P99 prediction latency exceeds 200ms SLA"

      # ML-specific: alert if no predictions for 10 minutes (dead service)
      - alert: NoPredictions
        expr: rate(predictions_total[10m]) == 0
        for: 10m
        labels:
          severity: critical
        annotations:
          summary: "Model API not serving predictions"`,out:`# Alerts route to: Slack (#ml-alerts), PagerDuty (critical), email (daily digest)
# Grafana dashboard: import template 14981 for FastAPI + Prometheus monitoring`},
  { type:'tip', body:`ML-specific Grafana panels to build: (1) Model version currently serving (label query), (2) Predictions per minute split by class, (3) Confidence score distribution histogram, (4) Feature drift score over time (from your drift monitor), (5) Business metric (approval rate, click-through) correlated with model version changes.` }
]};

L['mlops-w4-l4'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>A/B Testing & Shadow Deployment</h2><p>Deploying a new model is risky. Even a well-validated model can behave unexpectedly on production traffic. <strong>A/B testing</strong> and <strong>shadow deployment</strong> are controlled rollout strategies that limit risk by exposing only a fraction of users to the new model.</p><h3>Shadow Deployment</h3><p>The new model runs in parallel with the production model, receives all traffic, and logs predictions — but the production model's predictions are served to users. Shadow mode is risk-free: users see no difference. It validates the new model on live traffic before any user exposure.</p><h3>Canary Deployment</h3><p>Route a small percentage of real traffic (1–10%) to the new model. Compare key metrics (accuracy on labelled data, business metrics, latency) between canary and production. If metrics look good, gradually increase the canary percentage. At 100%, the new model becomes the new production model.</p>` },
  { type:'code', lang:'python', src:`import hashlib, time
from fastapi import FastAPI, Request

app = FastAPI()
models = {
    "production": load_model("models/prod/model.joblib"),
    "canary":     load_model("models/canary/model.joblib"),
}

def route_request(request_id: str, canary_fraction: float = 0.1) -> str:
    """Deterministic routing: same request_id always goes to same model."""
    # Hash ensures the same user always sees the same model (consistency)
    hash_val = int(hashlib.md5(request_id.encode()).hexdigest(), 16)
    return "canary" if (hash_val % 100) < (canary_fraction * 100) else "production"

@app.post("/v1/predict")
async def predict(request: PredictionRequest):
    # ── Shadow mode: always run both, serve production ──
    prod_pred = models["production"].predict([request.features])
    canary_pred = models["canary"].predict([request.features])  # shadow

    # Log canary prediction for offline analysis (don't serve it)
    log_shadow_prediction(request.request_id, "canary", canary_pred[0])

    # ── Canary mode: route some traffic to canary ──
    model_name = route_request(request.request_id, canary_fraction=0.10)
    model = models[model_name]
    pred = int(model.predict([request.features])[0])
    prob = float(model.predict_proba([request.features])[0, 1])

    return PredictionResponse(
        prediction=pred, probability=prob,
        model_version=model_name,   # log which model served this request
        latency_ms=elapsed_ms
    )`,out:`# Monitor canary vs production in Grafana:
# - Prediction distribution (should match if model is similar)
# - Error rate, latency (should not be worse)
# - Business metric (e.g. fraud capture rate on labelled holdout)
# If all metrics match or improve: promote canary to 100% (new production)`},
  { type:'tip', body:`Use deterministic routing (hash-based) rather than random routing for A/B tests. Random routing means the same user might see both models on different requests, leading to inconsistent experiences and confounded analytics. Hash-based routing ensures each user consistently sees the same model for the duration of the experiment.` }
]};

L['mlops-w4-l5'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Feedback Loops & Retraining Triggers</h2><p>Closing the loop is the final piece of the monitoring puzzle. Monitoring without action is just watching things break. A complete ML system automatically connects degradation signals to retraining actions.</p><h3>Types of Feedback Loops</h3><ul><li><strong>Implicit feedback:</strong> User actions reveal label ground truth (click = relevant, return = not relevant). Available immediately; may be noisy or biased.</li><li><strong>Explicit feedback:</strong> Users provide ratings or corrections ("this recommendation is wrong"). Higher quality but sparse.</li><li><strong>Delayed labels:</strong> The true outcome arrives later (loan default in 6 months, medical diagnosis confirmed by test). Most common in finance, healthcare, insurance.</li><li><strong>Business outcomes:</strong> Revenue, conversion, churn — aggregate downstream metrics that reflect model quality indirectly.</li></ul>` },
  { type:'code', lang:'python', src:`from datetime import datetime, timedelta
import pandas as pd

class RetrainingOrchestrator:
    """Monitors metrics and triggers retraining when needed."""

    def __init__(self, drift_threshold=0.2, performance_threshold=0.85,
                 min_new_samples=10_000, cooldown_hours=24):
        self.drift_threshold = drift_threshold
        self.performance_threshold = performance_threshold
        self.min_new_samples = min_new_samples
        self.cooldown_hours = cooldown_hours
        self.last_retrained_at = None

    def should_retrain(self, monitor: ModelMonitor, drift_scores: dict,
                        labelled_df: pd.DataFrame) -> tuple[bool, str]:
        # Cooldown: don't retrain more than once every N hours
        if self.last_retrained_at:
            hours_since = (datetime.utcnow() - self.last_retrained_at).total_seconds() / 3600
            if hours_since < self.cooldown_hours:
                return False, f"In cooldown ({hours_since:.1f}h < {self.cooldown_hours}h)"

        # Trigger 1: Significant feature drift
        n_drifted = sum(1 for v in drift_scores.values() if v['drifted'])
        drift_fraction = n_drifted / len(drift_scores)
        if drift_fraction > self.drift_threshold:
            return True, f"Drift trigger: {drift_fraction:.0%} of features drifted"

        # Trigger 2: Performance degradation on newly labelled data
        if len(labelled_df) >= self.min_new_samples:
            current_auc = evaluate_on_labelled(labelled_df)
            if current_auc < self.performance_threshold:
                return True, f"Performance trigger: AUC={current_auc:.4f} < {self.performance_threshold}"

        # Trigger 3: Positive rate deviation
        metrics = monitor.get_metrics()
        alerts = monitor.check_alerts()
        if any("Positive rate" in a for a in alerts):
            return True, "Distribution shift: positive rate anomaly detected"

        return False, "All checks passed — no retraining needed"

    def trigger_retraining(self, reason: str):
        print(f"Triggering retraining: {reason}")
        self.last_retrained_at = datetime.utcnow()
        # In practice: kick off a Prefect/Airflow DAG
        trigger_prefect_flow("weekly-model-retraining")
        notify_slack(f"Retraining triggered: {reason}")`,out:`# Automated retraining decision:
# Every 6 hours: check drift scores + check labelled holdout AUC
# If trigger: start retraining DAG → validate → stage → deploy
# Alert on Slack with reason and metrics summary`},
  { type:'tip', body:`Positive feedback loops are dangerous in ML systems: if a fraud model flags suspicious transactions, those transactions are declined and never complete — so they never appear in labelled training data as fraud. The model gets systematically deprived of positive-class examples, causing class imbalance to worsen over time. Design your feedback loop to account for this "censoring" bias.` }
]};

L['mlops-w4-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 4 Quiz</h2><p>Test your knowledge of drift detection, model monitoring, Prometheus/Grafana, A/B testing, and retraining triggers.</p>` }
]};

/* ── MODULE 5: Feature Stores & Data Pipelines ── */

L['mlops-w5-l1'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Feature Stores: Solving the Feature Engineering Problem</h2><p>Feature engineering — transforming raw data into model-ready numerical representations — is typically 60–80% of a data scientist's time. Worse, features built for one model get reimplemented (differently) for the next model, creating inconsistency between training and serving (<em>training–serving skew</em>). A <strong>feature store</strong> centralises feature computation, storage, and serving so features are defined once and reused everywhere.</p><p>The two core components of a feature store:</p><ul><li><strong>Offline store:</strong> historical features for training (S3/GCS + Parquet, Hive, BigQuery) — low latency matters less; completeness and correctness matter more</li><li><strong>Online store:</strong> latest feature values for real-time serving (Redis, DynamoDB, Bigtable) — sub-millisecond reads, point-in-time correct</li></ul>` },
  { type:'text', body:`<h3>Point-in-Time Correctness</h3><p>Training data must only use features that were available at the time the label was generated — no peeking into the future. This is called <strong>point-in-time correct joins</strong> (also: temporal joins, as-of joins). Without it, you get <em>feature leakage</em>: the model learns from information it won't have at inference time, producing optimistically inflated evaluation metrics that collapse in production.</p><p>A feature store handles this automatically: when you request historical features for a training dataset, it joins each event to the feature values that existed at <em>that event's timestamp</em>, not the latest values.</p>` },
  { type:'code', lang:'python', src:`# Feast — the most popular open-source feature store
# pip install feast[redis]

from feast import FeatureStore, Entity, FeatureView, Field
from feast.types import Float64, Int64, String
from feast.infra.offline_stores.file_source import FileSource
from datetime import timedelta

# Define data source
customer_source = FileSource(
    path="s3://my-bucket/features/customer_features.parquet",
    timestamp_field="event_timestamp",
)

# Define entity (the "join key")
customer = Entity(name="customer_id", join_keys=["customer_id"])

# Define feature view (a logical group of features)
customer_stats_fv = FeatureView(
    name="customer_stats",
    entities=[customer],
    ttl=timedelta(days=30),  # how long features are valid
    schema=[
        Field(name="total_transactions_30d", dtype=Float64),
        Field(name="avg_transaction_value", dtype=Float64),
        Field(name="days_since_last_login", dtype=Int64),
        Field(name="account_tier", dtype=String),
    ],
    source=customer_source,
)

# Materialise features to offline + online stores
# feast apply        → register feature views
# feast materialize  → push features to online store

store = FeatureStore(repo_path=".")

# Training: point-in-time correct historical features
entity_df = pd.DataFrame({
    "customer_id": ["c001", "c002", "c003"],
    "event_timestamp": pd.to_datetime(["2024-01-15", "2024-01-20", "2024-02-01"]),
})
training_df = store.get_historical_features(
    entity_df=entity_df,
    features=["customer_stats:total_transactions_30d",
              "customer_stats:avg_transaction_value"],
).to_df()

# Serving: latest feature values for online inference
online_features = store.get_online_features(
    features=["customer_stats:total_transactions_30d",
              "customer_stats:avg_transaction_value"],
    entity_rows=[{"customer_id": "c001"}],
).to_dict()`,out:`# Training–serving consistency guaranteed:
# Training uses point-in-time correct values (no leakage)
# Serving uses same feature definitions → same transformations
# Result: feature parity between offline and online environments`},
  { type:'tip', body:`Always run a "feature freshness" check before serving. If your fraud model expects transaction count from the last 24 hours but the feature was last materialised 6 hours ago and you've had an ETL failure since, you're serving stale features. Build a freshness monitor that alerts if online store values are older than your SLA.` },
  { type:'text', body:`<h3>Feature Store Architecture Patterns</h3><p>Three patterns for structuring feature computation:</p><ol><li><strong>Push model:</strong> Upstream pipelines write to the feature store when new data arrives. Simple, but the feature store becomes tightly coupled to pipeline schedules.</li><li><strong>Pull model (on-demand):</strong> The serving layer computes features at request time. Zero staleness, but adds latency; only works for lightweight transformations.</li><li><strong>Hybrid:</strong> Pre-compute slow/expensive features (offline store → materialise → online store); compute fast/cheap features on demand. Most production systems use this.</li></ol>` },
  { type:'exercise', title:'Feature Freshness Monitor', body:`Write a <code>FeatureFreshnessMonitor</code> class that checks an online Redis store for feature freshness. It should accept a list of <code>(feature_key, max_age_seconds)</code> tuples and expose a <code>check_all()</code> method that returns a dict of <code>{feature_key: "OK" | "STALE" | "MISSING"}</code>.`, hint:`Use Redis TTL or a separate timestamp key alongside each feature value. <code>redis_client.get(f"{key}:updated_at")</code> → parse the timestamp → compare with <code>datetime.utcnow()</code>.`, solution:`import redis
from datetime import datetime

class FeatureFreshnessMonitor:
    def __init__(self, redis_url: str, checks: list[tuple[str, int]]):
        self.r = redis.from_url(redis_url)
        self.checks = checks  # [(feature_key, max_age_seconds)]

    def check_all(self) -> dict[str, str]:
        results = {}
        now = datetime.utcnow()
        for key, max_age in self.checks:
            ts_raw = self.r.get(f"{key}:updated_at")
            if ts_raw is None:
                results[key] = "MISSING"
                continue
            updated_at = datetime.fromisoformat(ts_raw.decode())
            age = (now - updated_at).total_seconds()
            results[key] = "OK" if age <= max_age else "STALE"
        return results` }
]};

L['mlops-w5-l2'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Apache Airflow for ML Orchestration</h2><p><strong>Apache Airflow</strong> is the de facto standard for orchestrating data and ML pipelines. Unlike simple cron jobs, Airflow gives you dependency management, retries, monitoring, parallelism, and a rich UI — all backed by a DAG (Directed Acyclic Graph) model that makes pipeline structure explicit and auditable.</p><p>Core concepts:</p><ul><li><strong>DAG:</strong> A Python file describing your pipeline's tasks and their dependencies</li><li><strong>Operator:</strong> A template for a task (PythonOperator, BashOperator, SparkSubmitOperator, etc.)</li><li><strong>Task Instance:</strong> A run of an operator for a specific DAG run</li><li><strong>XCom:</strong> Cross-communication — a way for tasks to pass small data (metadata, paths, metrics) between each other</li><li><strong>Sensor:</strong> An operator that waits for a condition (S3KeySensor, SqlSensor, ExternalTaskSensor)</li></ul>` },
  { type:'code', lang:'python', src:`# Airflow ML training pipeline
# dags/ml_training_dag.py

from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.amazon.aws.sensors.s3 import S3KeySensor
from datetime import datetime, timedelta

default_args = {
    "owner": "mlops-team",
    "retries": 2,
    "retry_delay": timedelta(minutes=5),
    "email_on_failure": True,
    "email": ["mlops@company.com"],
}

def validate_data(**context):
    import great_expectations as gx
    context_gx = gx.get_context()
    result = context_gx.run_checkpoint("daily_training_data_checkpoint")
    if not result["success"]:
        raise ValueError(f"Data validation failed: {result}")
    # Push path to XCom for downstream tasks
    context["ti"].xcom_push(key="data_path", value="s3://bucket/data/2024-01-15/")

def train_model(**context):
    import mlflow
    data_path = context["ti"].xcom_pull(task_ids="validate_data", key="data_path")
    with mlflow.start_run():
        # ... training code ...
        mlflow.log_param("data_path", data_path)
        mlflow.log_metric("auc", 0.91)
        model_uri = mlflow.sklearn.log_model(model, "model").model_uri
    context["ti"].xcom_push(key="model_uri", value=model_uri)

def validate_and_promote(**context):
    model_uri = context["ti"].xcom_pull(task_ids="train_model", key="model_uri")
    client = mlflow.tracking.MlflowClient()
    # Promote to staging if AUC >= 0.88
    run_id = model_uri.split("/")[1]
    auc = float(client.get_run(run_id).data.metrics["auc"])
    if auc >= 0.88:
        client.transition_model_version_stage("fraud_model", version=1, stage="Staging")
    else:
        raise ValueError(f"Model AUC {auc:.3f} below threshold 0.88")

with DAG(
    dag_id="ml_training_pipeline",
    default_args=default_args,
    schedule_interval="0 2 * * *",  # 2am daily
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=["ml", "training"],
) as dag:

    wait_for_data = S3KeySensor(
        task_id="wait_for_data",
        bucket_name="my-data-bucket",
        bucket_key="data/{{ ds }}/",  # Jinja templating with execution date
        timeout=3600,
    )

    validate = PythonOperator(task_id="validate_data", python_callable=validate_data)
    train = PythonOperator(task_id="train_model", python_callable=train_model)
    promote = PythonOperator(task_id="validate_and_promote", python_callable=validate_and_promote)

    wait_for_data >> validate >> train >> promote`,out:`# DAG dependency graph:
# wait_for_data → validate_data → train_model → validate_and_promote
#
# Airflow handles: retries, backfill, SLA monitoring, alerting
# XCom handles: passing data_path and model_uri between tasks`},
  { type:'text', body:`<h3>Airflow Best Practices for ML</h3><ul><li><strong>Idempotency:</strong> Every task should produce the same output when run multiple times. Write to versioned paths (include execution_date), not fixed paths. Use <code>{{ ds }}</code> templating.</li><li><strong>Atomic tasks:</strong> Each task should do one thing. Don't combine data download + training + upload in one PythonOperator.</li><li><strong>Keep DAGs clean:</strong> No heavy computation in the DAG file itself — import and call functions from your project package.</li><li><strong>Use sensors sparingly:</strong> Sensors poll and hold a worker slot. For long waits, use deferred (async) sensors or trigger-based approaches.</li><li><strong>Dynamic DAGs:</strong> Use <code>dag_run.conf</code> to parameterise runs (e.g., pass a custom date range or model config).</li></ul>` },
  { type:'tip', body:`Airflow schedules are offset by default. A DAG with <code>schedule_interval="@daily"</code> and <code>start_date=2024-01-01</code> runs its first DAG run at 2024-01-02 00:00, covering the interval 2024-01-01. This "end-of-period" convention trips up everyone the first time. Use <code>data_interval_start</code> and <code>data_interval_end</code> in your tasks to be explicit.` },
  { type:'warn', body:`Never use <code>catchup=True</code> without thinking through the consequences. If your DAG has been paused for 30 days and you unpause it with catchup enabled, Airflow will enqueue 30 DAG runs simultaneously — potentially overwhelming your training infrastructure, blowing your cloud budget, and creating 30 versions of a model you don't want.` }
]};

L['mlops-w5-l3'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Data Quality with Great Expectations</h2><p><strong>Great Expectations (GX)</strong> is a Python library for defining, documenting, and enforcing data quality contracts. Instead of ad hoc assertions scattered through notebooks, GX lets you define <em>expectations</em> — declarative statements about what your data should look like — and run them as <em>checkpoints</em> that integrate with your pipeline.</p><p>The key insight: <strong>data quality rules are specifications, not just tests</strong>. They should be version-controlled, reviewed by domain experts, and run at every pipeline step where data moves between systems.</p>` },
  { type:'code', lang:'python', src:`import great_expectations as gx

context = gx.get_context()

# Define data source
datasource = context.sources.add_pandas("my_datasource")
asset = datasource.add_csv_asset("training_data", filepath_or_buffer="data/train.csv")
batch = asset.get_batch_request()

# Create expectation suite
suite = context.add_expectation_suite("training_data_suite")
validator = context.get_validator(
    batch_request=batch,
    expectation_suite=suite,
)

# Schema expectations
validator.expect_column_to_exist("customer_id")
validator.expect_column_values_to_not_be_null("customer_id")
validator.expect_column_values_to_be_unique("customer_id")

# Value range expectations
validator.expect_column_values_to_be_between("age", min_value=18, max_value=120)
validator.expect_column_values_to_be_in_set("account_tier", value_set=["bronze","silver","gold","platinum"])

# Distribution expectations (catch drift!)
validator.expect_column_mean_to_be_between("transaction_amount", min_value=50.0, max_value=500.0)
validator.expect_column_proportion_of_unique_values_to_be_between(
    "product_category", min_value=0.05, max_value=0.30
)

# Statistical expectations
validator.expect_column_kl_divergence_to_be_less_than(
    "age", partition_object=baseline_age_distribution, threshold=0.1
)

# Save and run
validator.save_expectation_suite()

# Create a checkpoint (runnable in Airflow/CI)
checkpoint = context.add_or_update_checkpoint(
    name="daily_training_checkpoint",
    validations=[{"batch_request": batch, "expectation_suite_name": "training_data_suite"}],
)
results = context.run_checkpoint("daily_training_checkpoint")

if not results["success"]:
    failed = [r for r in results.run_results.values() if not r["success"]]
    raise ValueError(f"Data quality check failed: {len(failed)} expectations not met")`,out:`# Validation results:
# ✓ customer_id: not null (100%)
# ✓ age: between 18-120 (99.97%)
# ✗ transaction_amount: mean=623.4 outside [50, 500]  ← pipeline should fail here
#
# Data Docs: HTML report auto-generated at gx/uncommitted/data_docs/`},
  { type:'tip', body:`Run Great Expectations in two modes: <strong>strict mode</strong> in CI/CD (fail the pipeline on any expectation failure) and <strong>warn mode</strong> in production monitoring (log failures but don't block serving — you still need to serve predictions even if new data looks different). Alert on warnings; page on critical failures.` },
  { type:'text', body:`<h3>Expectation Types and When to Use Them</h3><table><thead><tr><th>Category</th><th>Expectation</th><th>Use case</th></tr></thead><tbody><tr><td>Schema</td><td><code>expect_column_to_exist</code></td><td>Catch upstream schema changes</td></tr><tr><td>Completeness</td><td><code>expect_column_values_to_not_be_null</code></td><td>Critical ID fields, required labels</td></tr><tr><td>Range</td><td><code>expect_column_values_to_be_between</code></td><td>Age, amount, count features</td></tr><tr><td>Set membership</td><td><code>expect_column_values_to_be_in_set</code></td><td>Categorical features with fixed vocab</td></tr><tr><td>Distribution</td><td><code>expect_column_mean_to_be_between</code></td><td>Numerical drift detection</td></tr><tr><td>Statistical</td><td><code>expect_column_kl_divergence_to_be_less_than</code></td><td>Distribution shift (advanced drift detection)</td></tr><tr><td>Custom</td><td><code>expect_column_pair_values_to_be_in_set</code></td><td>Business rules, cross-column constraints</td></tr></tbody></table>` },
  { type:'exercise', title:'Write a Data Contract', body:`You have an <code>orders.csv</code> file with columns: <code>order_id</code> (unique string), <code>customer_id</code> (string), <code>amount</code> (float, must be positive), <code>status</code> (one of: pending/paid/shipped/cancelled), <code>created_at</code> (ISO datetime string). Write a GX expectation suite covering completeness, uniqueness, value ranges, and set membership for all five columns.`, hint:`For datetime strings, use <code>expect_column_values_to_match_strftime_format</code> with <code>"%Y-%m-%dT%H:%M:%S"</code>.`, solution:`validator.expect_column_to_exist("order_id")
validator.expect_column_values_to_not_be_null("order_id")
validator.expect_column_values_to_be_unique("order_id")

validator.expect_column_values_to_not_be_null("customer_id")

validator.expect_column_values_to_not_be_null("amount")
validator.expect_column_values_to_be_between("amount", min_value=0.01)

validator.expect_column_values_to_be_in_set(
    "status", value_set=["pending", "paid", "shipped", "cancelled"]
)

validator.expect_column_values_to_match_strftime_format(
    "created_at", strftime_format="%Y-%m-%dT%H:%M:%S"
)` }
]};

L['mlops-w5-l4'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Streaming Features with Apache Kafka</h2><p>Batch pipelines process data on a schedule (hourly, daily). But some ML models — fraud detection, recommendation, anomaly detection — need features computed from events happening <em>right now</em>, not from yesterday's batch. <strong>Apache Kafka</strong> is the standard backbone for streaming ML architectures: a distributed, durable, high-throughput event streaming platform.</p><p>Core Kafka concepts:</p><ul><li><strong>Topic:</strong> A named log of events (like a table in a database, but append-only)</li><li><strong>Partition:</strong> A topic is split into partitions for parallelism; each partition is ordered</li><li><strong>Producer:</strong> A service that writes events to a topic</li><li><strong>Consumer:</strong> A service that reads events from a topic</li><li><strong>Consumer group:</strong> Multiple consumers sharing work (each partition read by one consumer in the group)</li><li><strong>Offset:</strong> The position of a consumer in a partition; committed after processing</li></ul>` },
  { type:'code', lang:'python', src:`# Kafka for real-time feature computation
# pip install confluent-kafka faust-streaming

import faust
from datetime import datetime

# Define Kafka event schemas
class TransactionEvent(faust.Record):
    customer_id: str
    amount: float
    merchant_category: str
    timestamp: str

class CustomerFeatures(faust.Record):
    customer_id: str
    transactions_last_1h: int
    total_amount_last_1h: float
    unique_merchants_last_1h: int
    updated_at: str

app = faust.App("feature-computation", broker="kafka://localhost:9092")

transactions_topic = app.topic("transactions", value_type=TransactionEvent)
features_topic = app.topic("customer-features", value_type=CustomerFeatures)

# Tumbling window: aggregate over last 1 hour
transaction_table = app.Table(
    "transaction_counts",
    default=dict,
    partitions=8,
).tumbling(3600)  # 1-hour window

@app.agent(transactions_topic)
async def compute_features(transactions):
    async for transaction in transactions:
        cid = transaction.customer_id
        window = transaction_table["counts"][cid]

        # Update running aggregates in window
        window["count"] = window.get("count", 0) + 1
        window["total_amount"] = window.get("total_amount", 0.0) + transaction.amount
        merchants = window.get("merchants", set())
        merchants.add(transaction.merchant_category)
        window["merchants"] = merchants

        # Emit computed features
        await features_topic.send(value=CustomerFeatures(
            customer_id=cid,
            transactions_last_1h=window["count"],
            total_amount_last_1h=round(window["total_amount"], 2),
            unique_merchants_last_1h=len(merchants),
            updated_at=datetime.utcnow().isoformat(),
        ))

# Downstream: feature consumer writes to Redis (online store)
@app.agent(features_topic)
async def write_to_feature_store(features):
    async for feature in features:
        r.hset(f"features:{feature.customer_id}", mapping={
            "txn_1h": feature.transactions_last_1h,
            "amt_1h": feature.total_amount_last_1h,
            "merchants_1h": feature.unique_merchants_last_1h,
            "updated_at": feature.updated_at,
        })
        r.expire(f"features:{feature.customer_id}", 7200)  # 2h TTL`,out:`# Real-time feature pipeline:
# transaction event → Faust stream processor → windowed aggregates
#                   → customer-features topic → Redis online store
#
# Latency: event → feature in Redis typically < 500ms
# Throughput: 100K+ events/second with 8 partitions`},
  { type:'text', body:`<h3>Real-Time vs Batch Feature Engineering Comparison</h3><table><thead><tr><th>Aspect</th><th>Batch</th><th>Real-Time (Streaming)</th></tr></thead><tbody><tr><td>Latency</td><td>Minutes to hours</td><td>Milliseconds to seconds</td></tr><tr><td>Complexity</td><td>Low</td><td>High (windowing, state, exactly-once)</td></tr><tr><td>Cost</td><td>Lower (compute on schedule)</td><td>Higher (always-on cluster)</td></tr><tr><td>Feature types</td><td>Aggregations over full history</td><td>Aggregations over recent window</td></tr><tr><td>Use cases</td><td>Daily recommendation refresh, risk scoring</td><td>Fraud detection, live recommendations</td></tr><tr><td>Infrastructure</td><td>Airflow + Spark/dbt</td><td>Kafka + Faust/Spark Streaming/Flink</td></tr></tbody></table>` },
  { type:'warn', body:`Exactly-once semantics in Kafka streaming are achievable but expensive. Faust and Kafka Streams offer at-least-once by default (duplicates possible). For financial features (transaction amounts, counts used in fraud scoring), duplicates in your feature aggregation will cause errors. Enable <code>processing.guarantee=exactly_once_v2</code> in Kafka Streams, or design your state updates to be idempotent.` }
]};

L['mlops-w5-l5'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Real-Time vs Batch: Architectural Decisions</h2><p>Choosing between batch and real-time feature pipelines is one of the most consequential architectural decisions in an ML system — it affects cost, latency, complexity, and team capabilities. The answer is rarely "just pick one": most production systems use <strong>hybrid architectures</strong> where different features are computed in different ways based on their freshness requirements.</p><h3>The Lambda Architecture for ML</h3><p>Lambda architecture uses two processing layers running in parallel:</p><ul><li><strong>Batch layer:</strong> Processes all historical data on a schedule (daily/hourly); produces accurate but potentially stale features</li><li><strong>Speed layer (streaming):</strong> Processes only recent events in real time; produces approximate but fresh features</li><li><strong>Serving layer:</strong> Merges batch and speed layers; queries check the speed layer first (for recency) and fall back to the batch layer</li></ul>` },
  { type:'code', lang:'python', src:`# Hybrid feature retrieval: Lambda architecture for ML serving
import redis
import pandas as pd
from datetime import datetime, timedelta

class HybridFeatureStore:
    def __init__(self, redis_client, batch_db_connection):
        self.redis = redis_client
        self.db = batch_db_connection

    def get_features(self, customer_id: str) -> dict:
        features = {}

        # 1. Check speed layer (Redis) for real-time features (last 1h)
        realtime = self.redis.hgetall(f"features:{customer_id}")
        if realtime:
            features.update({
                "txn_count_1h": int(realtime.get(b"txn_1h", 0)),
                "txn_amount_1h": float(realtime.get(b"amt_1h", 0.0)),
                "feature_freshness": "realtime",
            })
        else:
            # Fall back to batch layer if streaming is unavailable
            features.update({
                "txn_count_1h": 0,
                "txn_amount_1h": 0.0,
                "feature_freshness": "batch_fallback",
            })

        # 2. Always use batch layer for slow-moving features (last 30d)
        row = self.db.execute(
            "SELECT avg_30d_amount, tenure_days, account_tier "
            "FROM customer_batch_features WHERE customer_id = ?",
            (customer_id,)
        ).fetchone()
        if row:
            features.update({
                "avg_30d_amount": row["avg_30d_amount"],
                "tenure_days": row["tenure_days"],
                "account_tier": row["account_tier"],
            })

        return features

    def health_check(self) -> dict:
        redis_ok = bool(self.redis.ping())
        # Check last batch job timestamp
        last_batch = self.db.execute(
            "SELECT MAX(computed_at) FROM customer_batch_features"
        ).fetchone()[0]
        batch_age_hours = (datetime.utcnow() - last_batch).total_seconds() / 3600
        return {
            "redis_ok": redis_ok,
            "batch_age_hours": round(batch_age_hours, 1),
            "batch_stale": batch_age_hours > 25,  # alert if > 25h old
        }`,out:`# Feature routing in production:
# - Real-time features (last 1h): Redis → <1ms latency
# - Batch features (last 30d): PostgreSQL → ~5ms latency
# - If Redis down: graceful degradation (use 0 for recent counts)
# - If batch stale: alert ops team; model still serves with stale features`},
  { type:'text', body:`<h3>Decision Framework: When to Use Each Approach</h3><p>Use this framework to decide how to compute each feature:</p><ol><li><strong>Does this feature need to reflect events from the last few minutes?</strong> → Streaming (Kafka + Faust/Flink)</li><li><strong>Does this feature require joining large historical datasets?</strong> → Batch (Spark, dbt, Airflow)</li><li><strong>Can this feature be computed cheaply at request time?</strong> → On-demand / request-time computation (no pre-storage needed)</li><li><strong>Is this feature shared across multiple models?</strong> → Feature store (centralise computation, avoid reimplementation)</li><li><strong>Is this feature model-specific?</strong> → Compute inline in the model serving code</li></ol>` },
  { type:'tip', body:`Start with batch. Real-time streaming pipelines are significantly harder to operate: they require 24/7 Kafka clusters, stateful stream processing, exactly-once semantics, and on-call engineers who understand Kafka internals. Most ML use cases can tolerate hourly staleness. Add streaming only when you have a clear, measured business requirement for lower latency — and when you have the team to operate it.` }
]};

L['mlops-w5-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 5 Quiz</h2><p>Test your knowledge of feature stores, Apache Airflow, data quality with Great Expectations, Kafka streaming, and batch vs real-time architectures.</p>` }
]};

/* ── MODULE 6: Cloud ML Platforms ── */

L['mlops-w6-l1'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>AWS SageMaker: End-to-End ML on AWS</h2><p><strong>Amazon SageMaker</strong> is AWS's managed ML platform — a suite of services covering every phase of the ML lifecycle: data labelling, experiment tracking, training (managed clusters), model registry, inference (real-time, batch, async, serverless), and MLOps pipelines. It removes the infrastructure burden of provisioning, scaling, and securing ML workloads.</p><p>Key SageMaker components:</p><ul><li><strong>SageMaker Studio:</strong> Cloud IDE (JupyterLab-based) for notebooks, experiments, and pipelines</li><li><strong>Training Jobs:</strong> Managed compute (choose instance type; SageMaker handles cluster lifecycle)</li><li><strong>Model Registry:</strong> Version and approve models; integrates with CI/CD</li><li><strong>Endpoints:</strong> Managed real-time inference (auto-scaling, A/B testing, multi-model)</li><li><strong>Pipelines:</strong> DAG-based ML workflow orchestrator (similar to Airflow but AWS-native)</li><li><strong>Feature Store:</strong> Managed feature store with offline (S3) and online (Redis) stores</li></ul>` },
  { type:'code', lang:'python', src:`import boto3
import sagemaker
from sagemaker.sklearn import SKLearn
from sagemaker.model import Model

session = sagemaker.Session()
role = "arn:aws:iam::123456789:role/SageMakerRole"
bucket = session.default_bucket()

# ── Training ──
estimator = SKLearn(
    entry_point="train.py",           # Your training script
    framework_version="1.2-1",
    instance_type="ml.m5.xlarge",    # 4 vCPU, 16GB RAM
    instance_count=1,
    role=role,
    hyperparameters={
        "n-estimators": 200,
        "max-depth": 8,
        "learning-rate": 0.05,
    },
    use_spot_instances=True,          # Up to 90% cost savings
    max_wait=7200,
)
estimator.fit({"train": f"s3://{bucket}/data/train/",
               "validation": f"s3://{bucket}/data/val/"})

# ── Register model in Model Registry ──
model_package_group = "fraud-detection-models"
model = estimator.create_model(role=role)
model_package = model.register(
    model_package_group_name=model_package_group,
    approval_status="PendingManualApproval",  # Requires human approval
    description="XGBoost fraud model v3.1, AUC=0.934",
    domain="BINARY_CLASSIFICATION",
    task="FRAUD_DETECTION",
)

# ── Deploy approved model to endpoint ──
approved_model = sagemaker.model.ModelPackage(
    role=role,
    model_package_arn=model_package.model_package_arn,
)
predictor = approved_model.deploy(
    initial_instance_count=2,
    instance_type="ml.c5.large",
    endpoint_name="fraud-detection-prod",
    data_capture_config=sagemaker.model_monitor.DataCaptureConfig(
        enable_capture=True,
        sampling_percentage=20,       # Capture 20% of requests for monitoring
        destination_s3_uri=f"s3://{bucket}/data-capture/",
    ),
)

# ── Inference ──
result = predictor.predict({"features": [0.5, 1.2, -0.3, 2.1]})`,out:`# SageMaker handles:
# - Cluster provisioning and teardown (training jobs)
# - Model storage in S3 + registration with metadata
# - Endpoint scaling (auto-scales 2-20 instances based on invocations)
# - Data capture for model monitoring (20% sampling)
# Spot instances: Training cost ~$0.40/hr vs $1.92/hr on-demand`},
  { type:'text', body:`<h3>SageMaker Pipelines for ML CI/CD</h3><p>SageMaker Pipelines is a native ML workflow orchestrator — define a DAG of ML steps (processing, training, evaluation, registration) that runs on managed compute. Unlike Airflow, it's tightly integrated with SageMaker's tracking, metrics, and model registry.</p>` },
  { type:'code', lang:'python', src:`from sagemaker.workflow.pipeline import Pipeline
from sagemaker.workflow.steps import ProcessingStep, TrainingStep, ConditionStep
from sagemaker.workflow.conditions import ConditionGreaterThanOrEqualTo
from sagemaker.workflow.condition_step import ConditionStep

# Step 1: Data preprocessing
processing_step = ProcessingStep(
    name="PreprocessData",
    processor=processor,  # SKLearnProcessor or SparkProcessor
    inputs=[...], outputs=[...],
    code="preprocess.py",
)

# Step 2: Model training
training_step = TrainingStep(
    name="TrainModel",
    estimator=estimator,
    inputs={"train": training_step_output, "validation": val_step_output},
)

# Step 3: Evaluate model (custom evaluation script → JSON output)
eval_step = ProcessingStep(
    name="EvaluateModel",
    processor=eval_processor,
    inputs=[...model artifacts, test data...],
    code="evaluate.py",
    property_files=[PropertyFile(name="EvalReport", output_name="evaluation")],
)

# Step 4: Conditional registration — only if AUC >= 0.88
auc_condition = ConditionGreaterThanOrEqualTo(
    left=JsonGet(step_name="EvaluateModel", property_file="EvalReport", json_path="auc"),
    right=0.88,
)
condition_step = ConditionStep(
    name="CheckModelQuality",
    conditions=[auc_condition],
    if_steps=[model_register_step],   # Register if passes
    else_steps=[fail_step],           # Fail pipeline if doesn't
)

pipeline = Pipeline(
    name="fraud-detection-pipeline",
    steps=[processing_step, training_step, eval_step, condition_step],
    sagemaker_session=session,
)
pipeline.upsert(role_arn=role)
pipeline.start()`,out:`# Pipeline execution:
# PreprocessData → TrainModel → EvaluateModel → CheckModelQuality
# If AUC >= 0.88: register to Model Registry (PendingApproval)
# If AUC < 0.88: pipeline fails with clear error
# Full audit trail in SageMaker Studio`},
  { type:'tip', body:`Use <strong>Spot Instances</strong> for training (up to 90% savings) but never for inference endpoints. Spot interruptions during training are handled by SageMaker checkpointing — the job resumes from the last checkpoint when a new instance becomes available. For endpoints, always use on-demand to guarantee availability.` }
]};

L['mlops-w6-l2'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Google Vertex AI & Azure ML</h2><p>All three major clouds offer fully managed ML platforms with broadly similar capabilities: managed training, model registries, serving endpoints, and pipeline orchestration. The right choice depends on your existing cloud footprint, team expertise, and specific use cases.</p><h3>Google Vertex AI</h3><p>Vertex AI is Google's unified ML platform, notable for tight integration with BigQuery (data warehouse), Dataflow (streaming), and Google's own foundation models (Gemini) via Model Garden. Key differentiators:</p><ul><li><strong>AutoML:</strong> No-code model training for tabular, image, text, and video data</li><li><strong>Vertex Pipelines:</strong> Kubeflow Pipelines-based orchestration (portable: also runs on-prem)</li><li><strong>Model Garden:</strong> Access to Google's models (Gemini, Imagen, Codey) and open-source models</li><li><strong>Feature Store:</strong> Managed feature store with BigQuery backend and online serving</li><li><strong>Explainable AI:</strong> SHAP, LIME, and Integrated Gradients built in to all endpoints</li></ul>` },
  { type:'code', lang:'python', src:`# Google Vertex AI: training + deployment
from google.cloud import aiplatform

aiplatform.init(project="my-project", location="us-central1")

# Custom training job
job = aiplatform.CustomTrainingJob(
    display_name="fraud-model-training",
    script_path="trainer/train.py",
    container_uri="gcr.io/cloud-aiplatform/training/scikit-learn-cpu.1-0:latest",
    requirements=["scikit-learn==1.3.0", "mlflow==2.8.0"],
    model_serving_container_image_uri="gcr.io/cloud-aiplatform/prediction/sklearn-cpu.1-0:latest",
)
model = job.run(
    dataset=tabular_dataset,
    target_column="is_fraud",
    training_fraction_split=0.8,
    validation_fraction_split=0.1,
    test_fraction_split=0.1,
    machine_type="n1-standard-4",
    replica_count=1,
)

# Deploy to endpoint
endpoint = model.deploy(
    machine_type="n1-standard-2",
    min_replica_count=1,
    max_replica_count=10,   # Auto-scaling
    traffic_split={"0": 100},
    explanation_metadata=explanation_metadata,    # Enable Explainable AI
    explanation_parameters=explanation_parameters,
)

# Predict with explanation
response = endpoint.explain(instances=[{"feature1": 0.5, "feature2": 1.2}])
print(response.predictions)
print(response.explanations)   # SHAP values for each feature

# Azure ML (brief comparison)
# from azure.ai.ml import MLClient, command
# ml_client = MLClient(credential, subscription_id, resource_group, workspace_name)
# job = command(code="./src", command="python train.py", environment="sklearn-env@latest",
#               compute="cpu-cluster", experiment_name="fraud-experiment")
# returned_job = ml_client.jobs.create_or_update(job)`,out:`# Vertex AI vs Azure ML key differences:
# Vertex: tighter BigQuery/GCS integration, Model Garden for foundation models
# Azure: better enterprise Active Directory integration, OpenAI partnership
# Both: managed endpoints, pipelines, model registries, monitoring
# Both: per-second billing on training instances (no minimum)`},
  { type:'text', body:`<h3>Cross-Cloud Comparison</h3><table><thead><tr><th>Capability</th><th>AWS SageMaker</th><th>Google Vertex AI</th><th>Azure ML</th></tr></thead><tbody><tr><td>Training</td><td>Training Jobs, Spot</td><td>Custom Training, preemptible</td><td>Compute Clusters</td></tr><tr><td>Registry</td><td>Model Registry + approval</td><td>Model Registry</td><td>Model Registry</td></tr><tr><td>Serving</td><td>Real-time, batch, async, serverless</td><td>Online, batch, dedicated</td><td>Managed online, batch</td></tr><tr><td>Pipelines</td><td>SageMaker Pipelines</td><td>Vertex Pipelines (Kubeflow)</td><td>Azure ML Pipelines</td></tr><tr><td>Feature Store</td><td>SageMaker Feature Store</td><td>Vertex Feature Store</td><td>Limited (use external)</td></tr><tr><td>Foundation Models</td><td>Bedrock (separate service)</td><td>Model Garden (Gemini)</td><td>Azure OpenAI</td></tr><tr><td>Strength</td><td>Breadth of ML services</td><td>Data warehouse integration</td><td>Enterprise/AD integration</td></tr></tbody></table>` },
  { type:'tip', body:`All three clouds support <strong>multi-cloud inference</strong> via ONNX: train on any cloud, export to ONNX, serve anywhere. This avoids vendor lock-in at the model level. For data pipelines and feature stores, lock-in is harder to avoid — choose your primary cloud deliberately and use open tools (Feast, Kubeflow Pipelines, MLflow) where possible.` }
]};

L['mlops-w6-l3'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Kubernetes & KServe for ML Serving</h2><p>Managed cloud ML endpoints are convenient but expensive and inflexible. For organisations with existing Kubernetes infrastructure, <strong>KServe</strong> (formerly KFServing) provides a standardised, cloud-agnostic model serving framework that runs on any Kubernetes cluster — on-prem, EKS, GKE, or AKS.</p><p>KServe wraps your model in a standardised InferenceService CRD (Custom Resource Definition) and provides:</p><ul><li>Automatic scaling (including scale-to-zero via Knative)</li><li>Canary deployments (traffic splitting between model versions)</li><li>Pre/post-processing transformers</li><li>Explainability (SHAP/LIME endpoints)</li><li>Multi-model serving (ModelMesh) — pack many models on one set of pods</li></ul>` },
  { type:'code', lang:'yaml', src:`# KServe InferenceService manifest
# kubectl apply -f fraud-model.yaml

apiVersion: serving.kserve.io/v1beta1
kind: InferenceService
metadata:
  name: fraud-detection
  namespace: ml-serving
  annotations:
    autoscaling.knative.dev/target: "100"  # Scale up when >100 concurrent requests
spec:
  predictor:
    minReplicas: 2
    maxReplicas: 20
    sklearn:
      storageUri: "s3://my-bucket/models/fraud/v3/"
      protocolVersion: v2
      resources:
        requests:
          cpu: "500m"
          memory: "512Mi"
        limits:
          cpu: "2"
          memory: "2Gi"
    canaryTrafficPercent: 10   # 10% traffic to canary
  transformer:
    containers:
      - name: feature-transformer
        image: my-registry/fraud-transformer:v2
        resources:
          requests: {cpu: "200m", memory: "256Mi"}
  explainer:
    alibi:
      type: AnchorTabular
      storageUri: "s3://my-bucket/explainers/fraud/"`,out:`# After kubectl apply:
# - KServe creates 2 pods (minReplicas) immediately
# - Knative auto-scales 2→20 pods based on concurrency
# - 10% traffic → canary (new version); 90% → stable
# - /v2/models/fraud-detection/infer  → prediction
# - /v2/models/fraud-detection/explain → SHAP explanation
# Scale-to-zero available for dev/staging (latency trade-off)`},
  { type:'code', lang:'python', src:`# KServe client — sending inference requests
import requests
import json

KSERVE_URL = "http://fraud-detection.ml-serving.svc.cluster.local"

# V2 inference protocol (standard across all serving frameworks)
payload = {
    "inputs": [{
        "name": "features",
        "shape": [1, 10],
        "datatype": "FP32",
        "data": [[0.5, 1.2, -0.3, 2.1, 0.8, 1.5, 0.0, 3.2, -1.1, 0.7]],
    }]
}

response = requests.post(
    f"{KSERVE_URL}/v2/models/fraud-detection/infer",
    json=payload,
    headers={"Content-Type": "application/json"},
    timeout=2.0,
)
result = response.json()
probability = result["outputs"][0]["data"][0]

# Horizontal Pod Autoscaler metrics query (for capacity planning)
from kubernetes import client, config
config.load_incluster_config()
v1 = client.AppsV1Api()
deployment = v1.read_namespaced_deployment("fraud-detection-predictor-default", "ml-serving")
print(f"Current replicas: {deployment.status.ready_replicas}")`,out:`# V2 inference protocol is framework-agnostic:
# Same client code works for sklearn, TensorFlow, PyTorch, XGBoost, ONNX
# KServe handles model format detection from storageUri
# Istio service mesh (optional): mTLS, circuit breaking, traffic policies`},
  { type:'text', body:`<h3>When to Use KServe vs Managed Endpoints</h3><table><thead><tr><th>Factor</th><th>Managed Endpoint (SageMaker/Vertex)</th><th>KServe on Kubernetes</th></tr></thead><tbody><tr><td>Setup complexity</td><td>Low (click/API)</td><td>High (K8s expertise needed)</td></tr><tr><td>Vendor lock-in</td><td>High</td><td>Low (portable)</td></tr><tr><td>Cost</td><td>Higher (managed premium)</td><td>Lower if you already have K8s</td></tr><tr><td>Scale-to-zero</td><td>Yes (serverless endpoints)</td><td>Yes (Knative)</td></tr><tr><td>Multi-model</td><td>Multi-model endpoints</td><td>ModelMesh</td></tr><tr><td>GPU sharing</td><td>Limited</td><td>Full control (MIG, time-slicing)</td></tr><tr><td>Best for</td><td>Teams without K8s expertise</td><td>Large orgs with existing K8s infra</td></tr></tbody></table>` },
  { type:'tip', body:`KServe's ModelMesh dramatically improves GPU utilisation for teams running many models. Instead of one model per pod (wasting idle GPU memory), ModelMesh loads models dynamically across a shared pool of GPU pods — routing requests to whichever pod currently has the model loaded, or loading it on demand with a brief warm-up latency. Typical result: 5-10× more models served per GPU dollar.` }
]};

L['mlops-w6-l4'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Cloud Cost Optimisation for ML Workloads</h2><p>ML workloads are compute-intensive and their cost can balloon rapidly without discipline. A single A100 GPU instance costs $3–$32/hour depending on cloud and region. Running even two of these continuously for a month costs $4,300–$46,000. Cost awareness is not optional in production ML.</p><h3>Training Cost Optimisation</h3><ul><li><strong>Spot/preemptible instances:</strong> 70–90% savings; handle interruptions with checkpointing</li><li><strong>Right-size instances:</strong> Profile GPU utilisation before scaling. If GPU utilisation is 30%, you're on the wrong instance type — use a smaller GPU or CPU</li><li><strong>Distributed training only when needed:</strong> Communication overhead means 2× instances rarely means 2× speed. Profile first.</li><li><strong>Mixed precision (FP16/BF16):</strong> 2× memory savings, 2–3× throughput improvement on modern GPUs</li><li><strong>Compile models:</strong> <code>torch.compile()</code>, XLA (TF/JAX) — 20–50% throughput improvement with no accuracy loss</li></ul>` },
  { type:'code', lang:'python', src:`# Cost-aware training configuration

# 1. Spot instances with checkpointing (PyTorch)
import torch

class CheckpointedTrainer:
    def __init__(self, checkpoint_dir: str, checkpoint_every: int = 100):
        self.checkpoint_dir = checkpoint_dir
        self.checkpoint_every = checkpoint_every

    def save_checkpoint(self, model, optimizer, epoch, step, loss):
        torch.save({
            "epoch": epoch, "step": step, "loss": loss,
            "model_state": model.state_dict(),
            "optimizer_state": optimizer.state_dict(),
        }, f"{self.checkpoint_dir}/ckpt_e{epoch}_s{step}.pt")

    def load_latest(self, model, optimizer):
        checkpoints = sorted(Path(self.checkpoint_dir).glob("ckpt_*.pt"))
        if not checkpoints:
            return 0, 0  # Start fresh
        ckpt = torch.load(checkpoints[-1])
        model.load_state_dict(ckpt["model_state"])
        optimizer.load_state_dict(ckpt["optimizer_state"])
        return ckpt["epoch"], ckpt["step"]

# 2. Mixed precision training
from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()
for batch in dataloader:
    optimizer.zero_grad()
    with autocast():  # FP16 forward pass
        output = model(batch)
        loss = criterion(output, labels)
    scaler.scale(loss).backward()  # Scale gradients to prevent underflow
    scaler.step(optimizer)
    scaler.update()

# 3. Inference cost optimisation
# Cost comparison per 1M predictions:
inference_costs = {
    "ml.g4dn.xlarge (T4 GPU)": "$0.736/hr → ~$0.37 per 1M preds",
    "ml.c5.xlarge (CPU)":      "$0.238/hr → ~$0.12 per 1M preds (for small models)",
    "ml.inf1.xlarge (Inferentia)": "$0.228/hr → ~$0.11 per 1M preds (compiled models only)",
    "Serverless (SageMaker)":  "$0.00002/invocation → $20 per 1M preds (no idle cost)",
}

# 4. Serverless inference — best for sporadic traffic
endpoint_config = {
    "ServerlessConfig": {
        "MemorySizeInMB": 2048,     # 512 to 6144
        "MaxConcurrency": 50,       # Max parallel requests
    }
}
# Cost: pay only per invocation; cold start ~1-3s`,out:`# Cost optimisation summary:
# Spot training: 80% savings (require checkpointing every 100-500 steps)
# Mixed precision: 2x throughput on GPU (no accuracy loss for most models)
# Serverless inference: $0/hr idle vs $0.24/hr on CPU endpoint
# Right-sizing: always profile before scaling — GPU utilisation < 50% = wrong instance`},
  { type:'text', body:`<h3>Inference Cost Patterns</h3><p>Choose your serving pattern based on traffic shape:</p><ul><li><strong>Steady, high-volume traffic:</strong> Reserved instances + auto-scaling (predictable cost)</li><li><strong>Bursty, unpredictable traffic:</strong> Serverless (pay per use; accept cold-start latency)</li><li><strong>Latency-critical:</strong> Provisioned throughput (guaranteed capacity, premium cost)</li><li><strong>Batch jobs:</strong> Spot instances; no real-time SLA → maximum savings</li><li><strong>Multiple small models:</strong> Multi-model endpoint or ModelMesh (amortise fixed costs)</li></ul>` },
  { type:'warn', body:`Reserved instances (1-year or 3-year commitments) offer 30–60% savings but are commitments. Don't reserve until you have 6 months of production traffic data showing stable load. Teams that reserve too early — before product-market fit or before load patterns stabilise — often find themselves locked into the wrong instance type.` }
]};

L['mlops-w6-l5'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Infrastructure as Code for ML Systems</h2><p>ML infrastructure — clusters, endpoints, storage, networking — should be defined in code, version-controlled, and deployed reproducibly. <strong>Terraform</strong> is the standard tool for this: a declarative IaC language that manages cloud resources across all three major providers.</p><p>For ML systems specifically, IaC provides:</p><ul><li><strong>Reproducibility:</strong> Spin up an identical staging environment from the same Terraform config</li><li><strong>Auditability:</strong> Git history shows who changed what infrastructure, when, and why (via PR descriptions)</li><li><strong>Disaster recovery:</strong> Recreate destroyed infrastructure from code in minutes</li><li><strong>Environment parity:</strong> Dev, staging, and prod are the same Terraform config, parameterised by environment</li></ul>` },
  { type:'code', lang:'python', src:`# Terraform for SageMaker endpoint (HCL syntax shown as Python comment for readability)

# main.tf (HCL)
#
# resource "aws_sagemaker_endpoint_configuration" "fraud_model" {
#   name = "fraud-model-${var.environment}-${var.model_version}"
#   production_variants {
#     variant_name           = "primary"
#     model_name             = var.model_name
#     initial_instance_count = var.min_instances
#     instance_type          = var.instance_type
#     initial_variant_weight = 0.9
#   }
#   production_variants {
#     variant_name           = "canary"
#     model_name             = var.canary_model_name
#     initial_instance_count = 1
#     instance_type          = var.instance_type
#     initial_variant_weight = 0.1
#   }
#   data_capture_config {
#     enable_capture              = true
#     initial_sampling_percentage = 20
#     destination_s3_uri          = "s3://${aws_s3_bucket.ml_artifacts.bucket}/data-capture/"
#   }
# }
#
# resource "aws_sagemaker_endpoint" "fraud_prod" {
#   name                 = "fraud-detection-${var.environment}"
#   endpoint_config_name = aws_sagemaker_endpoint_configuration.fraud_model.name
#   tags = { Environment = var.environment, Team = "mlops" }
# }
#
# resource "aws_appautoscaling_target" "endpoint_scaling" {
#   max_capacity       = 20
#   min_capacity       = var.min_instances
#   resource_id        = "endpoint/${aws_sagemaker_endpoint.fraud_prod.name}/variant/primary"
#   scalable_dimension = "sagemaker:variant:DesiredInstanceCount"
#   service_namespace  = "sagemaker"
# }

# Python: call terraform via subprocess in CI
import subprocess

def terraform_apply(workspace: str, vars: dict) -> bool:
    var_args = [f"-var={k}={v}" for k, v in vars.items()]
    result = subprocess.run(
        ["terraform", "apply", "-auto-approve"] + var_args,
        cwd=f"infra/ml-serving",
        capture_output=True, text=True,
    )
    print(result.stdout)
    if result.returncode != 0:
        print(result.stderr)
        return False
    return True

# Deploy new model version
success = terraform_apply("production", {
    "model_version": "v3-1",
    "model_name": "fraud-detection-v3-1",
    "environment": "production",
    "min_instances": "2",
    "instance_type": "ml.c5.large",
})`,out:`# Terraform workflow:
# terraform init    → download providers
# terraform plan    → preview changes (never auto-apply without reviewing plan)
# terraform apply   → provision/update infrastructure
# terraform destroy → tear down (use with caution in prod!)
#
# CI/CD: PR triggers "terraform plan" (plan shown in PR comment)
#        Merge triggers "terraform apply" (changes applied after approval)`},
  { type:'tip', body:`Never run <code>terraform apply</code> directly on production from your laptop. Always run through CI/CD — this ensures the state file is locked (preventing concurrent runs), the plan is reviewed, and the apply is logged with the triggering user and commit SHA. Use Terraform Cloud or Atlantis for this.` },
  { type:'exercise', title:'Cost Calculator', body:`Write a Python function <code>estimate_monthly_cost(instance_type, hours_per_day, spot=False)</code> that estimates monthly SageMaker inference endpoint cost. Use this pricing table: <code>ml.c5.large</code>=$0.119/hr, <code>ml.c5.xlarge</code>=$0.238/hr, <code>ml.g4dn.xlarge</code>=$0.736/hr. Spot discount is 70%. Assume 30 days per month.`, hint:`<code>hourly_cost × (0.3 if spot else 1.0) × hours_per_day × 30</code>`, solution:`PRICING = {
    "ml.c5.large": 0.119,
    "ml.c5.xlarge": 0.238,
    "ml.g4dn.xlarge": 0.736,
}

def estimate_monthly_cost(instance_type: str, hours_per_day: float, spot: bool = False) -> float:
    hourly = PRICING[instance_type]
    if spot:
        hourly *= 0.30  # 70% discount
    return round(hourly * hours_per_day * 30, 2)

# Examples:
# estimate_monthly_cost("ml.c5.large", 24) → $85.68/mo
# estimate_monthly_cost("ml.g4dn.xlarge", 8) → $176.64/mo
# estimate_monthly_cost("ml.g4dn.xlarge", 8, spot=True) → $52.99/mo` }
]};

L['mlops-w6-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 6 Quiz</h2><p>Test your knowledge of AWS SageMaker, Google Vertex AI, Azure ML, Kubernetes/KServe, cloud cost optimisation, and infrastructure as code for ML.</p>` }
]};

/* ── MODULE 7: LLM Deployment & Serving ── */

L['mlops-w7-l1'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>High-Throughput LLM Serving: vLLM & TGI</h2><p>Deploying large language models in production is qualitatively different from deploying traditional ML models. LLMs are memory-bound (not compute-bound), stateful (each token depends on all previous tokens), and the inference process — autoregressive token generation — fundamentally constrains throughput. Naive serving (one request at a time, sequential decoding) is catastrophically inefficient.</p><p>Two tools have become the standard for production LLM serving:</p><ul><li><strong>vLLM</strong> (UC Berkeley): introduces PagedAttention — manages KV-cache memory like an OS manages virtual memory, enabling near-zero KV-cache waste and efficient continuous batching</li><li><strong>TGI (Text Generation Inference)</strong> (Hugging Face): production-grade server with tensor parallelism, quantisation, speculative decoding, and the OpenAI-compatible API</li></ul>` },
  { type:'code', lang:'python', src:`# vLLM: offline batched inference and online serving

from vllm import LLM, SamplingParams

# Offline batch inference (most efficient for batch jobs)
llm = LLM(
    model="meta-llama/Llama-3-8B-Instruct",
    tensor_parallel_size=2,          # Split model across 2 GPUs
    gpu_memory_utilization=0.90,     # Use 90% of GPU memory for KV cache
    max_model_len=8192,
    dtype="bfloat16",                # BF16 for Ampere+ GPUs
)

sampling_params = SamplingParams(
    temperature=0.0,                 # Greedy decoding (deterministic)
    max_tokens=512,
    stop=["</s>", "<|eot_id|>"],
)

prompts = [
    "Summarise the following document: ...",
    "Extract the key entities from: ...",
    "Classify the sentiment of: ...",
]

outputs = llm.generate(prompts, sampling_params)
for output in outputs:
    print(output.outputs[0].text)

# ── Online serving (OpenAI-compatible API) ──
# vllm serve meta-llama/Llama-3-8B-Instruct \\
#   --tensor-parallel-size 2 \\
#   --gpu-memory-utilization 0.90 \\
#   --max-model-len 8192 \\
#   --served-model-name llama3-8b \\
#   --host 0.0.0.0 --port 8000

# Client code (identical to OpenAI API)
from openai import OpenAI
client = OpenAI(base_url="http://localhost:8000/v1", api_key="token-abc")
response = client.chat.completions.create(
    model="llama3-8b",
    messages=[{"role": "user", "content": "Explain gradient descent in 3 sentences."}],
    max_tokens=200,
    temperature=0.7,
)
print(response.choices[0].message.content)`,out:`# vLLM performance vs naive serving:
# Naive: 1 request at a time, KV cache pre-allocated per sequence
# vLLM PagedAttention: continuous batching, paged KV-cache
# Throughput improvement: 2-24x depending on request mix
# Memory efficiency: <4% KV-cache waste vs 60-80% waste in naive serving`},
  { type:'code', lang:'python', src:`# TGI (Text Generation Inference) — Docker deployment
# docker run --gpus all --shm-size 1g -p 8080:80 \\
#   -v $PWD/models:/data \\
#   ghcr.io/huggingface/text-generation-inference:2.0 \\
#   --model-id meta-llama/Llama-3-8B-Instruct \\
#   --num-shard 2 \\                    # tensor parallelism
#   --quantize bitsandbytes-nf4 \\     # 4-bit quantisation
#   --max-concurrent-requests 128 \\
#   --max-batch-prefill-tokens 4096

# TGI client
import requests

def generate(prompt: str, max_new_tokens: int = 512) -> str:
    response = requests.post(
        "http://localhost:8080/generate",
        json={
            "inputs": prompt,
            "parameters": {
                "max_new_tokens": max_new_tokens,
                "temperature": 0.7,
                "do_sample": True,
                "return_full_text": False,
            },
        },
        timeout=30,
    )
    response.raise_for_status()
    return response.json()["generated_text"]

# Streaming (for user-facing applications)
response = requests.post(
    "http://localhost:8080/generate_stream",
    json={"inputs": prompt, "parameters": {"max_new_tokens": 512}},
    stream=True,
)
for chunk in response.iter_lines():
    if chunk:
        token = json.loads(chunk[6:])  # strip "data: " prefix
        print(token["token"]["text"], end="", flush=True)`,out:`# vLLM vs TGI comparison:
# vLLM: better continuous batching, PagedAttention, faster for throughput
# TGI: better quantisation support, streaming API, more HuggingFace integration
# Both: OpenAI-compatible API, tensor parallelism, production-ready
# Use vLLM for: maximum throughput, large-scale APIs
# Use TGI for: HuggingFace ecosystem, easier quantisation`},
  { type:'tip', body:`The single biggest LLM serving mistake is under-provisioning KV-cache memory. KV-cache grows linearly with sequence length × batch size. If you're serving 8K-token contexts with 32 concurrent users, your KV-cache alone can need 50–100GB of GPU memory. Set <code>gpu_memory_utilization=0.90</code> in vLLM and profile your P99 sequence lengths before provisioning hardware.` }
]};

L['mlops-w7-l2'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Model Quantisation: GGUF, GPTQ, AWQ</h2><p>LLM quantisation reduces model precision from 32-bit or 16-bit floats to lower bit-widths (8-bit, 4-bit, even 2-bit). The goal: reduce memory footprint (enabling larger models on smaller hardware) and increase throughput (smaller data types = faster matmul). The trade-off: some accuracy degradation, especially at very low bit widths.</p><p>Three dominant quantisation formats in 2024–2025:</p><ul><li><strong>GGUF:</strong> CPU-friendly format by llama.cpp; supports mixed precision (some layers in 8-bit, others in 4-bit); great for running on consumer hardware (Mac M-series, laptop)</li><li><strong>GPTQ:</strong> Post-training quantisation using calibration data; minimises quantisation error layer by layer; best for 4-bit GPU inference with ExLlamaV2</li><li><strong>AWQ (Activation-aware Weight Quantisation):</strong> Identifies and protects salient weights (those with large activations); better quality than GPTQ at same bit width; supported natively in vLLM and TGI</li></ul>` },
  { type:'code', lang:'python', src:`# AWQ quantisation (recommended for production GPU inference)
# pip install autoawq

from awq import AutoAWQForCausalLM
from transformers import AutoTokenizer

model_path = "meta-llama/Llama-3-8B-Instruct"
quant_path = "llama3-8b-awq-4bit"

# Load full precision model
model = AutoAWQForCausalLM.from_pretrained(model_path, device_map="auto")
tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)

# Quantise to 4-bit AWQ
quant_config = {
    "zero_point": True,
    "q_group_size": 128,     # Group size for quantisation (smaller = better quality, more overhead)
    "w_bit": 4,              # 4-bit weights
    "version": "GEMM",       # GEMM kernel (GEMV for single-token inference is faster)
}
model.quantize(tokenizer, quant_config=quant_config)
model.save_quantized(quant_path)
tokenizer.save_pretrained(quant_path)

# Load quantised model (vLLM with AWQ)
# vllm serve llama3-8b-awq-4bit --quantization awq

# GGUF (for CPU inference with llama.cpp)
# Convert using llama.cpp's convert.py:
# python convert.py models/llama3-8b --outtype q4_k_m --outfile llama3-8b-q4_k_m.gguf
# Naming: q4_k_m = 4-bit, k-quant, medium (Q4_K_M is best quality/speed tradeoff at 4-bit)

# Size comparison: Llama 3 8B
size_comparison = {
    "FP32 (full precision)": "32 GB",
    "BF16 (half precision)": "16 GB",
    "8-bit (GPTQ/AWQ)":     "8 GB",
    "4-bit AWQ/GPTQ":       "4.5 GB",       # Fits on a single 8GB GPU!
    "4-bit GGUF (Q4_K_M)":  "4.8 GB",       # CPU inference viable
    "2-bit (extreme)":       "2.5 GB",       # Significant quality loss
}`,out:`# Quantisation quality comparison at 4-bit (MMLU benchmark, Llama 3 8B):
# BF16 baseline:  65.3%
# AWQ 4-bit:      64.9%  (-0.4%, recommended)
# GPTQ 4-bit:     64.5%  (-0.8%)
# GGUF Q4_K_M:    64.7%  (-0.6%, best for CPU)
# GGUF Q2_K:      61.2%  (-4.1%, significant degradation)
#
# Memory savings enable: 8B model on 1×RTX 3090 (24GB), 70B on 2×A100 (80GB)`},
  { type:'text', body:`<h3>Speculative Decoding</h3><p>Speculative decoding uses a small "draft" model to propose multiple tokens, then the large "target" model verifies them in parallel — often accepting several tokens per forward pass instead of one. When the draft model's predictions are correct (which happens often for common phrases), throughput can increase 2–4× with zero quality loss.</p>` },
  { type:'code', lang:'python', src:`# vLLM speculative decoding
# vllm serve meta-llama/Llama-3-70B-Instruct \\
#   --speculative-model meta-llama/Llama-3-8B-Instruct \\
#   --num-speculative-tokens 5 \\
#   --speculative-draft-tensor-parallel-size 1

# Rule of thumb: use speculative decoding when:
# 1. Your target model is large (30B+) — larger gap = more draft throughput gain
# 2. Outputs are repetitive/predictable (code completion, document formatting)
# 3. You have spare GPU memory for the draft model (~10-20% of target model size)

# Benchmark before committing:
# Run with and without speculative decoding on your actual traffic mix
# Speculative decoding can HURT throughput if acceptance rate < 50%
# (each rejected token wastes both draft and verify compute)`,out:`# Speculative decoding acceptance rates (real-world):
# Code completion:       80-90% (very predictable syntax → high benefit)
# Document formatting:   70-80%
# General chat:          50-70% (acceptable benefit)
# Creative writing:      30-50% (unpredictable → low/neutral benefit)
# Mathematical reasoning: 40-60% (mixed benefit)`},
  { type:'tip', body:`Benchmark your quantised model thoroughly before deploying. Run your actual evaluation dataset (not just MMLU) — quantisation effects are task-specific. A 4-bit model may be perfectly acceptable for summarisation (measured output quality: 98% of FP16) but noticeably worse for multi-step mathematical reasoning (92% of FP16). Always measure on your specific task.` }
]};

L['mlops-w7-l3'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Prompt Caching & Semantic Caching</h2><p>LLM inference is expensive. A single GPT-4o request with a 4K-token context costs ~$0.01–$0.02. At 100K requests/day, that's $1,000–$2,000/day from inference alone. Two caching strategies can dramatically reduce this:</p><h3>Prompt Caching (Prefix Caching)</h3><p>Modern LLMs have to recompute KV-cache for every token in the prompt on every request. If many requests share a long common prefix (a system prompt, a document being queried, a code file), those KV-cache computations can be cached and reused. Anthropic, OpenAI, and vLLM all support this:</p><ul><li>Anthropic Claude: <code>cache_control: {type: "ephemeral"}</code> on message blocks — cache TTL 5 minutes</li><li>OpenAI GPT-4o: automatic prefix caching for prompts > 1024 tokens (no configuration needed)</li><li>vLLM: automatic prefix caching enabled by default</li></ul>` },
  { type:'code', lang:'python', src:`# Anthropic prompt caching (up to 90% cost reduction for cached prefix)
import anthropic

client = anthropic.Anthropic()

# Cache a large document — charge full price once, 90% discount for subsequent requests
SYSTEM_PROMPT = """You are an expert analyst. Analyse the following 50-page annual report:
[... 50,000 tokens of report content ...]
"""

def ask_about_report(question: str) -> str:
    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=1024,
        system=[{
            "type": "text",
            "text": SYSTEM_PROMPT,
            "cache_control": {"type": "ephemeral"},  # Cache this prefix
        }],
        messages=[{"role": "user", "content": question}],
    )
    # Check cache usage in response
    usage = response.usage
    print(f"Input tokens: {usage.input_tokens}, Cache read: {usage.cache_read_input_tokens}")
    return response.content[0].text

# First call: full cost (cache miss — populates cache)
answer1 = ask_about_report("What was the revenue growth in Q3?")
# Second call: 90% discount on cached prefix tokens
answer2 = ask_about_report("What are the key risk factors?")

# ── Semantic caching ──
# Exact caching misses when same question is phrased differently.
# Semantic caching embeds the question and finds semantically similar cached responses.

from sentence_transformers import SentenceTransformer
import numpy as np
import redis

model = SentenceTransformer("all-MiniLM-L6-v2")

class SemanticCache:
    def __init__(self, redis_url: str, similarity_threshold: float = 0.92):
        self.r = redis.from_url(redis_url)
        self.threshold = similarity_threshold

    def get(self, query: str) -> str | None:
        query_emb = model.encode(query)
        # Check all cached embeddings (use Redis vector search in production)
        for key in self.r.scan_iter("cache:*"):
            cached = json.loads(self.r.get(key))
            similarity = np.dot(query_emb, cached["embedding"]) / (
                np.linalg.norm(query_emb) * np.linalg.norm(cached["embedding"]))
            if similarity >= self.threshold:
                return cached["response"]
        return None

    def set(self, query: str, response: str, ttl: int = 3600):
        key = f"cache:{hashlib.md5(query.encode()).hexdigest()}"
        self.r.setex(key, ttl, json.dumps({
            "query": query,
            "response": response,
            "embedding": model.encode(query).tolist(),
        }))`,out:`# Semantic cache hit rates (typical production LLM apps):
# Exact match:    ~15% of requests (limited benefit)
# Semantic match (threshold=0.92): ~35-45% of requests
# Combined with prompt caching: 60-70% cost reduction common
#
# Redis Stack with vector search enables O(log n) ANN search
# Use HNSW index for production (not linear scan)`},
  { type:'tip', body:`Set your semantic similarity threshold carefully. Too high (>0.97) and you miss obvious rephrasing ("What's the revenue?" vs "What is the revenue?"). Too low (<0.85) and you return wrong cached answers for genuinely different questions. Start at 0.92 and measure precision/recall on a sample of your real queries before adjusting.` }
]};

L['mlops-w7-l4'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>LLM Observability: Costs, Latency, and Quality</h2><p>Traditional ML monitoring (input distribution drift, prediction distribution shift) is necessary but insufficient for LLM systems. LLMs add new failure modes that require new observability tools: prompt injection, hallucinations, toxic outputs, rising costs from prompt bloat, and latency degradation from context length growth.</p><h3>The Four LLM Observability Dimensions</h3><ol><li><strong>Cost:</strong> Token usage per request, per model, per user; cost trends; prompt efficiency (tokens/value)</li><li><strong>Latency:</strong> Time to first token (TTFT), time per output token (TPOT), total time; P50/P95/P99 broken down by context length</li><li><strong>Quality:</strong> LLM-as-judge scores, user feedback (thumbs up/down), task-specific metrics (ROUGE, accuracy on evals)</li><li><strong>Safety:</strong> Prompt injection attempts, jailbreak patterns, PII in inputs/outputs, toxic content rates</li></ol>` },
  { type:'code', lang:'python', src:`# LLM observability with LangSmith-style tracing
# (also works with Phoenix/Arize, Weights & Biases, custom)

import time
import json
from dataclasses import dataclass, field
from datetime import datetime
from prometheus_client import Counter, Histogram, Gauge

# Prometheus metrics for LLM serving
llm_requests_total = Counter("llm_requests_total", "Total LLM requests", ["model", "status"])
llm_tokens_used = Counter("llm_tokens_used", "Total tokens consumed", ["model", "token_type"])
llm_cost_usd = Counter("llm_cost_usd_total", "Total USD cost", ["model"])
llm_latency_seconds = Histogram("llm_latency_seconds", "Request latency", ["model"],
    buckets=[0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0, 30.0])
llm_ttft_seconds = Histogram("llm_ttft_seconds", "Time to first token", ["model"])

# Token cost table (USD per 1M tokens, as of mid-2025)
COST_PER_1M = {
    "claude-opus-4-7":  {"input": 15.0, "output": 75.0, "cache_read": 1.5},
    "claude-sonnet-4-6": {"input": 3.0,  "output": 15.0, "cache_read": 0.3},
    "gpt-4o":            {"input": 5.0,  "output": 15.0, "cache_read": 2.5},
    "gpt-4o-mini":       {"input": 0.15, "output": 0.60, "cache_read": 0.075},
}

@dataclass
class LLMTrace:
    request_id: str
    model: str
    prompt: str
    response: str = ""
    input_tokens: int = 0
    output_tokens: int = 0
    cache_read_tokens: int = 0
    latency_s: float = 0.0
    ttft_s: float = 0.0
    cost_usd: float = 0.0
    quality_score: float | None = None
    tags: dict = field(default_factory=dict)
    timestamp: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def calculate_cost(self) -> float:
        costs = COST_PER_1M.get(self.model, {"input": 5.0, "output": 15.0, "cache_read": 2.5})
        self.cost_usd = (
            self.input_tokens * costs["input"] / 1_000_000 +
            self.output_tokens * costs["output"] / 1_000_000 +
            self.cache_read_tokens * costs["cache_read"] / 1_000_000
        )
        return self.cost_usd

    def emit_metrics(self):
        llm_requests_total.labels(model=self.model, status="success").inc()
        llm_tokens_used.labels(model=self.model, token_type="input").inc(self.input_tokens)
        llm_tokens_used.labels(model=self.model, token_type="output").inc(self.output_tokens)
        llm_cost_usd.labels(model=self.model).inc(self.cost_usd)
        llm_latency_seconds.labels(model=self.model).observe(self.latency_s)
        if self.ttft_s > 0:
            llm_ttft_seconds.labels(model=self.model).observe(self.ttft_s)`,out:`# Grafana dashboard queries:
# Avg cost per request:  rate(llm_cost_usd_total[5m]) / rate(llm_requests_total[5m])
# P95 latency:           histogram_quantile(0.95, llm_latency_seconds_bucket)
# Token burn rate:       rate(llm_tokens_used_total{token_type="output"}[1h]) * 3600
# Cost projection:       (cost rate per hour) * 720 (hours/month)`},
  { type:'text', body:`<h3>LLM-as-Judge for Quality Monitoring</h3><p>Traditional accuracy metrics can't evaluate open-ended LLM outputs. The emerging standard: use a capable LLM (the "judge") to evaluate another LLM's output against a rubric. This can be run on a sample of production traffic (1–5%) to continuously monitor output quality without human annotation at scale.</p>` },
  { type:'code', lang:'python', src:`# LLM-as-judge quality scoring
def llm_judge(question: str, response: str, criteria: str = "accuracy,completeness,clarity") -> dict:
    judge_prompt = f"""Rate this AI response on a scale of 1-5 for each criterion.
Return JSON only: {{"accuracy": N, "completeness": N, "clarity": N, "overall": N, "reasoning": "..."}}

Question: {question}
Response: {response}
Criteria: {criteria}"""

    result = anthropic.Anthropic().messages.create(
        model="claude-haiku-4-5-20251001",   # Fast + cheap judge
        max_tokens=256,
        messages=[{"role": "user", "content": judge_prompt}],
    )
    return json.loads(result.content[0].text)

# Run on 2% of production traffic
import random
def maybe_evaluate(trace: LLMTrace):
    if random.random() < 0.02:
        scores = llm_judge(trace.prompt, trace.response)
        trace.quality_score = scores["overall"]
        # Store in time-series DB for trend analysis`,out:`# Quality monitoring alerts:
# Alert if 7-day rolling mean quality score drops > 0.3 points
# Alert if >5% of responses score <= 2 (poor quality)
# Compare quality scores across model versions (canary vs stable)`}
]};

L['mlops-w7-l5'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Building LLM-Powered Microservices</h2><p>LLM-powered features rarely exist in isolation. In production, they form chains: a retrieval step feeds a reranking step feeds a generation step, with caching, rate limiting, and fallbacks woven throughout. This pattern is called a <strong>RAG (Retrieval-Augmented Generation) pipeline</strong> — the dominant architecture for LLM applications that need to work with private or recent data.</p><h3>RAG Pipeline Architecture</h3><ol><li><strong>Ingestion:</strong> Chunk documents → embed chunks → store in vector database (offline)</li><li><strong>Retrieval:</strong> Embed user query → ANN search → return top-k chunks</li><li><strong>Reranking:</strong> Use a cross-encoder to rerank top-k chunks (more accurate than ANN retrieval alone)</li><li><strong>Generation:</strong> Inject retrieved chunks into prompt → call LLM → return answer</li></ol>` },
  { type:'code', lang:'python', src:`# Production RAG microservice with FastAPI
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
import anthropic
from sentence_transformers import SentenceTransformer, CrossEncoder
import chromadb
import asyncio

app = FastAPI(title="RAG Service", version="1.0.0")

# Initialise models (loaded once at startup, not per-request)
embedder = SentenceTransformer("all-MiniLM-L6-v2")
reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")
chroma = chromadb.HttpClient(host="chroma", port=8000)
collection = chroma.get_collection("knowledge_base")
claude = anthropic.Anthropic()

class QueryRequest(BaseModel):
    question: str
    top_k: int = 5
    rerank_top_n: int = 3

class QueryResponse(BaseModel):
    answer: str
    sources: list[str]
    input_tokens: int
    output_tokens: int
    cost_usd: float

@app.post("/query", response_model=QueryResponse)
async def query(req: QueryRequest, background: BackgroundTasks):
    # 1. Embed query
    query_emb = embedder.encode(req.question).tolist()

    # 2. ANN retrieval from vector store
    results = collection.query(
        query_embeddings=[query_emb],
        n_results=req.top_k,
        include=["documents", "metadatas"],
    )
    docs = results["documents"][0]
    metas = results["metadatas"][0]

    # 3. Rerank with cross-encoder (better relevance than cosine similarity)
    pairs = [(req.question, doc) for doc in docs]
    scores = reranker.predict(pairs)
    ranked = sorted(zip(scores, docs, metas), key=lambda x: x[0], reverse=True)
    top_docs = [doc for _, doc, _ in ranked[:req.rerank_top_n]]
    top_sources = [m.get("source", "unknown") for _, _, m in ranked[:req.rerank_top_n]]

    # 4. Generate answer with retrieved context
    context = "\\n\\n---\\n\\n".join(top_docs)
    prompt = f"""Answer the question using only the provided context.
If the context doesn't contain the answer, say "I don't have information about this."

Context:
{context}

Question: {req.question}"""

    response = claude.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )

    usage = response.usage
    cost = (usage.input_tokens * 3.0 + usage.output_tokens * 15.0) / 1_000_000

    # 5. Log trace in background (don't block response)
    background.add_task(log_trace, req.question, response.content[0].text, usage, cost)

    return QueryResponse(
        answer=response.content[0].text,
        sources=list(set(top_sources)),
        input_tokens=usage.input_tokens,
        output_tokens=usage.output_tokens,
        cost_usd=round(cost, 6),
    )

async def log_trace(question, answer, usage, cost):
    # Write to your observability backend (LangSmith, Phoenix, custom DB)
    pass`,out:`# RAG pipeline latency breakdown (typical):
# Embedding:  ~5ms (local model)
# ANN search: ~10ms (ChromaDB/Pinecone/Weaviate)
# Reranking:  ~30ms (cross-encoder, top-5 → top-3)
# LLM call:   ~800ms-3s (Claude Sonnet, 1K token output)
# Total:      ~850ms-3s (99% is LLM generation)
#
# Optimisation priority: reduce LLM latency first (caching, smaller model, quantisation)`},
  { type:'tip', body:`Always instrument your RAG pipeline's retrieval quality separately from generation quality. A bad answer from a good LLM usually means the retrieval failed (wrong chunks retrieved), not that the LLM hallucinated. Log which chunks were retrieved for each query — this lets you debug retrieval issues without touching the LLM. In practice, 70% of "hallucinations" in RAG systems are actually retrieval failures.` },
  { type:'exercise', title:'Add Rate Limiting to the RAG Service', body:`Extend the RAG service above to add per-user rate limiting: maximum 10 requests per minute per user. Use a <code>user_id</code> field in the request and Redis for the rate limit counter. Return HTTP 429 with a <code>Retry-After</code> header when the limit is exceeded.`, hint:`Use Redis INCR + EXPIRE: <code>r.incr(f"rate:{user_id}")</code>, <code>r.expire(f"rate:{user_id}", 60)</code>. Check count before calling the LLM.`, solution:`from fastapi import Header
import redis

r = redis.from_url("redis://localhost:6379")

@app.post("/query")
async def query(req: QueryRequest, x_user_id: str = Header(...)):
    key = f"rate:{x_user_id}"
    count = r.incr(key)
    if count == 1:
        r.expire(key, 60)  # Start 60s window on first request
    if count > 10:
        ttl = r.ttl(key)
        raise HTTPException(status_code=429,
            headers={"Retry-After": str(ttl)},
            detail=f"Rate limit exceeded. Retry after {ttl}s.")
    # ... rest of handler` }
]};

L['mlops-w7-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 7 Quiz</h2><p>Test your knowledge of vLLM, TGI, model quantisation (GGUF/GPTQ/AWQ), prompt caching, semantic caching, LLM observability, and RAG microservice architecture.</p>` }
]};

/* ── MODULE 8: Production ML Best Practices ── */

L['mlops-w8-l1'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>ML System Design Patterns</h2><p>Production ML systems are distributed systems with the added complexity of data dependencies and probabilistic outputs. The patterns that make distributed systems reliable — separation of concerns, loose coupling, explicit interfaces, graceful degradation — apply equally to ML systems, but require adaptation for the ML-specific concerns of model versioning, feature engineering, and output uncertainty.</p><h3>The Shadow Mode Pattern</h3><p>Before routing live traffic to a new model, run it in <strong>shadow mode</strong>: the old model serves production requests (its outputs reach users), and the new model runs in parallel on the same inputs (its outputs are logged but never shown to users). This lets you compare models on real production traffic without any user impact.</p>` },
  { type:'code', lang:'python', src:`# Shadow mode deployment pattern
import asyncio
from contextlib import suppress

class ShadowRouter:
    def __init__(self, production_model, shadow_model, logger):
        self.prod = production_model
        self.shadow = shadow_model
        self.logger = logger

    async def predict(self, features: dict) -> dict:
        # Always return production model output
        prod_result = await self.prod.predict(features)

        # Fire-and-forget shadow inference (don't await — don't block)
        asyncio.create_task(self._shadow_predict(features, prod_result))

        return prod_result

    async def _shadow_predict(self, features: dict, prod_result: dict):
        with suppress(Exception):  # Never let shadow failures affect production
            shadow_result = await self.shadow.predict(features)
            self.logger.log_comparison({
                "features": features,
                "prod_prediction": prod_result,
                "shadow_prediction": shadow_result,
                "prod_score": prod_result.get("score"),
                "shadow_score": shadow_result.get("score"),
                "agreement": prod_result.get("label") == shadow_result.get("label"),
            })

# ── Two-Phase Deployment: Shadow → Canary → Production ──
deployment_phases = {
    "Phase 1: Shadow":   "0% user traffic, 100% shadow traffic → monitor quality offline",
    "Phase 2: Canary":   "5-10% real user traffic → monitor latency, error rate, business metrics",
    "Phase 3: Ramp":     "25% → 50% → 75% → 100% → monitor at each step for 24h+",
    "Rollback trigger":  "Latency P99 +25%, error rate >1%, quality score drops >0.3 points",
}

# ── Strangler Fig Pattern for ML ──
# Gradually replace a legacy ML system with a new one without big-bang cutover
class StranglerFigRouter:
    def __init__(self, legacy_model, new_model, traffic_pct_to_new: float = 0.0):
        self.legacy = legacy_model
        self.new = new_model
        self.traffic_pct = traffic_pct_to_new  # Gradually increase

    def predict(self, features: dict, user_id: str) -> dict:
        # Deterministic routing: same user always gets same model
        use_new = (hash(user_id) % 100) < (self.traffic_pct * 100)
        model = self.new if use_new else self.legacy
        result = model.predict(features)
        result["_model_version"] = "new" if use_new else "legacy"
        return result`,out:`# Shadow mode outcomes:
# Agreement rate of 95%+ → safe to canary
# Agreement rate < 90%   → investigate disagreements before promoting
# Log all disagreements for manual review — these are your model's "interesting" cases
#
# Strangler fig: increase traffic_pct_to_new by 10% per day
# Monitor business metrics (conversion, fraud rate) at each increment`},
  { type:'text', body:`<h3>The Sidecar Pattern for ML</h3><p>A sidecar container runs alongside your model serving container in the same Kubernetes pod, handling cross-cutting concerns (logging, metrics, feature pre-fetching, request validation) without polluting the model code. This keeps your model container focused on inference and lets you update observability logic independently of the model.</p>` },
  { type:'tip', body:`The most common ML system design mistake is treating the model as the system. The model is a component. The system includes data pipelines, feature stores, serving infrastructure, monitoring, retraining triggers, and the feedback loop. Design each component for independent failure: if your feature store is down, serve with default/fallback features rather than returning errors. If your monitoring pipeline is down, your serving endpoint should still function.` }
]};

L['mlops-w8-l2'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Model Versioning & Rollback Strategies</h2><p>Every production model deployment must be reversible. Models degrade, bugs are discovered post-deployment, data pipelines produce unexpected inputs — rollback capability is not optional. A model versioning strategy defines: how models are named and stored, what metadata is captured, what triggers a rollback, and how quickly a rollback can be executed.</p><h3>Semantic Versioning for Models</h3><p>Adopt a three-part versioning scheme analogous to software semver:</p><ul><li><strong>Major version:</strong> Architecture change, input/output schema change, incompatible with previous version's feature pipeline</li><li><strong>Minor version:</strong> Retraining with more data, hyperparameter tuning, same architecture and schema</li><li><strong>Patch version:</strong> Bug fix in post-processing, threshold adjustment, monitoring-only change</li></ul><p>Example: <code>fraud-detection-2.3.1</code> — major architecture v2, third retraining cycle (minor 3), first patch.</p>` },
  { type:'code', lang:'python', src:`# Model version registry with rollback capability
import mlflow
from mlflow.tracking import MlflowClient
from datetime import datetime

client = MlflowClient()
MODEL_NAME = "fraud-detection"

def register_model_version(run_id: str, metrics: dict) -> str:
    """Register a trained model with full metadata for rollback."""
    model_uri = f"runs:/{run_id}/model"
    mv = mlflow.register_model(model_uri, MODEL_NAME)

    client.update_model_version(MODEL_NAME, mv.version, description=f"""
Model trained {datetime.utcnow().date()}
Metrics: AUC={metrics['auc']:.4f}, F1={metrics['f1']:.4f}, Precision={metrics['precision']:.4f}
Training data: {metrics['training_rows']} rows, {metrics['date_range']}
Feature schema: v{metrics['feature_schema_version']}
    """.strip())

    # Tag with deployment info
    client.set_model_version_tag(MODEL_NAME, mv.version, "feature_schema_version", metrics['feature_schema_version'])
    client.set_model_version_tag(MODEL_NAME, mv.version, "training_data_hash", metrics['data_hash'])
    client.set_model_version_tag(MODEL_NAME, mv.version, "approved_by", "mlops-bot")

    return mv.version

def promote_to_production(version: str, approved_by: str):
    """Promote model to production; archive current production version."""
    # Archive current production (keeping it for rollback)
    prod_versions = client.get_latest_versions(MODEL_NAME, stages=["Production"])
    for v in prod_versions:
        client.transition_model_version_stage(MODEL_NAME, v.version, "Archived")
        print(f"Archived v{v.version} (rollback available)")

    # Promote new version
    client.transition_model_version_stage(MODEL_NAME, version, "Production")
    client.set_model_version_tag(MODEL_NAME, version, "deployed_by", approved_by)
    client.set_model_version_tag(MODEL_NAME, version, "deployed_at", datetime.utcnow().isoformat())
    print(f"Promoted v{version} to Production")

def rollback(reason: str):
    """Rollback to most recent Archived version."""
    # Find most recent archived version
    archived = client.get_latest_versions(MODEL_NAME, stages=["Archived"])
    if not archived:
        raise RuntimeError("No archived version available for rollback!")

    # Sort by version number (descending)
    latest_archived = sorted(archived, key=lambda v: int(v.version), reverse=True)[0]

    # Archive current production
    current_prod = client.get_latest_versions(MODEL_NAME, stages=["Production"])[0]
    client.transition_model_version_stage(MODEL_NAME, current_prod.version, "Archived")

    # Restore archived version to production
    client.transition_model_version_stage(MODEL_NAME, latest_archived.version, "Production")
    client.set_model_version_tag(MODEL_NAME, latest_archived.version, "rollback_reason", reason)
    client.set_model_version_tag(MODEL_NAME, latest_archived.version, "rolled_back_at", datetime.utcnow().isoformat())
    print(f"Rolled back to v{latest_archived.version}. Reason: {reason}")`,out:`# Rollback checklist:
# 1. Trigger: automated (alert threshold breached) or manual (on-call decision)
# 2. Time to rollback: < 5 minutes (automated) or < 15 minutes (manual)
# 3. Rollback scope: model only, or model + feature pipeline?
# 4. Validate rollback: run smoke tests on restored version before declaring success
# 5. Post-mortem: what caused the regression? How do we prevent it?`},
  { type:'warn', body:`Never delete old model versions, even after months. Rollbacks sometimes need to go back several versions (e.g., discovering a data pipeline bug that affected the last 3 training cycles). Keep archived versions indefinitely for models in production, and at least 90 days for retired models. Storage is cheap; losing the ability to roll back is expensive.` }
]};

L['mlops-w8-l3'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Model Cards & ML Documentation</h2><p>A <strong>model card</strong> is structured documentation for a trained model — describing its intended use, performance characteristics, training data, limitations, and ethical considerations. Introduced by Google in 2019, model cards have become a standard expectation for models deployed in consequential applications (hiring, credit, healthcare, content moderation).</p><p>Model cards serve multiple audiences:</p><ul><li><strong>Developers integrating the model:</strong> input format, output schema, performance benchmarks</li><li><strong>Business stakeholders:</strong> use cases, limitations, deployment recommendations</li><li><strong>Regulators and auditors:</strong> training data provenance, fairness analysis, bias documentation</li><li><strong>End users (indirectly):</strong> transparency about automated decisions affecting them</li></ul>` },
  { type:'code', lang:'python', src:`# Model card as structured code (integrates with MLflow)
# model_card.py

from dataclasses import dataclass, field
from typing import Optional
import json
from datetime import date

@dataclass
class FairnessMetrics:
    protected_attributes: list[str]
    metrics_by_group: dict  # {"group": {"precision": ..., "recall": ...}}
    disparate_impact_ratio: float
    equal_opportunity_difference: float

@dataclass
class ModelCard:
    # Identity
    model_name: str
    version: str
    date: date
    authors: list[str]

    # Intended use
    primary_use_case: str
    intended_users: str
    out_of_scope_uses: list[str]

    # Training data
    training_dataset: str
    training_rows: int
    training_date_range: str
    known_data_limitations: list[str]

    # Performance
    evaluation_dataset: str
    evaluation_rows: int
    overall_metrics: dict   # {"auc": 0.934, "f1": 0.821, ...}
    performance_by_subgroup: dict  # {"age_group": {"18-30": {...}, "31-50": {...}}}

    # Fairness
    fairness: Optional[FairnessMetrics]

    # Ethical considerations
    risks: list[str]
    mitigations: list[str]
    human_oversight_required: bool
    human_oversight_description: str = ""

    # Deployment
    recommended_deployment: str
    input_schema: dict
    output_schema: dict
    inference_latency_p99_ms: float

    # Maintenance
    monitoring_plan: str
    retraining_trigger: str
    contact: str

    def to_markdown(self) -> str:
        return f"""# Model Card: {self.model_name} v{self.version}

**Date:** {self.date} | **Authors:** {', '.join(self.authors)}

## Intended Use
**Primary use:** {self.primary_use_case}
**Intended users:** {self.intended_users}
**Out-of-scope uses:**
{chr(10).join(f'- {u}' for u in self.out_of_scope_uses)}

## Training Data
- Dataset: {self.training_dataset} ({self.training_rows:,} rows)
- Date range: {self.training_date_range}
- Known limitations: {'; '.join(self.known_data_limitations)}

## Performance
**Evaluation set:** {self.evaluation_dataset} ({self.evaluation_rows:,} rows)
{json.dumps(self.overall_metrics, indent=2)}

## Ethical Considerations
**Risks:** {'; '.join(self.risks)}
**Mitigations:** {'; '.join(self.mitigations)}
**Human oversight required:** {'YES' if self.human_oversight_required else 'No'}
{f'**Oversight description:** {self.human_oversight_description}' if self.human_oversight_required else ''}

## Deployment
- Recommended use: {self.recommended_deployment}
- P99 latency: {self.inference_latency_p99_ms:.0f}ms
- Monitoring: {self.monitoring_plan}
- Retraining trigger: {self.retraining_trigger}
- Contact: {self.contact}
"""`,out:`# Model card outputs:
# - HTML rendered in MLflow UI (attach as artifact)
# - Markdown in model repository (auto-generated, version-controlled)
# - JSON for programmatic access (regulatory audits, API consumers)
#
# EU AI Act (2026+): high-risk AI systems MUST have technical documentation
# covering training data, performance metrics, and human oversight arrangements`},
  { type:'tip', body:`Fill in model cards <em>before</em> deployment, not after. Writing a model card forces the model developer to articulate intended use cases, out-of-scope uses, and known limitations — which often reveals gaps in evaluation (e.g., "I haven't tested performance on users over 65") that should be addressed before shipping. A model card written after deployment is documentation; a model card written before is a design review.` }
]};

L['mlops-w8-l4'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>ML Security: Adversarial Attacks & Data Poisoning</h2><p>ML models are software systems and inherit all software security concerns (injection, broken auth, insecure APIs). But they also face ML-specific attacks that exploit the probabilistic nature of model predictions. Security for ML systems is an emerging discipline — largely absent from traditional ML curricula but increasingly mandatory for production deployments.</p><h3>Attack Taxonomy</h3><ul><li><strong>Adversarial examples:</strong> Inputs crafted to fool a model (add imperceptible noise to an image → misclassification). White-box attacks (attacker knows the model) are stronger; black-box attacks work via repeated queries.</li><li><strong>Data poisoning:</strong> Attacker injects malicious training examples to degrade model performance or insert backdoors ("when this trigger phrase appears, classify as benign")</li><li><strong>Model inversion:</strong> Repeated queries reconstruct training data from model outputs — a privacy violation (PII leakage)</li><li><strong>Membership inference:</strong> Determine whether a specific record was in the training set (privacy violation)</li><li><strong>Prompt injection (LLMs):</strong> User input overrides system prompt instructions ("Ignore previous instructions and...")</li></ul>` },
  { type:'code', lang:'python', src:`# ML security: defences

# 1. Input validation (defend against adversarial inputs)
from pydantic import BaseModel, validator
import numpy as np

class ModelInput(BaseModel):
    features: list[float]

    @validator("features")
    def validate_features(cls, v):
        arr = np.array(v)
        if len(arr) != 10:
            raise ValueError("Expected 10 features")
        if np.any(np.isnan(arr)) or np.any(np.isinf(arr)):
            raise ValueError("Features contain NaN or Inf")
        # Statistical range check (trained on data with known bounds)
        feature_bounds = [(-5, 5)] * 10  # Example bounds per feature
        for i, (val, (lo, hi)) in enumerate(zip(arr, feature_bounds)):
            if not (lo <= val <= hi):
                raise ValueError(f"Feature {i} value {val:.2f} outside expected range [{lo}, {hi}]")
        return v

# 2. Prediction confidence thresholding
def predict_with_abstention(model, features, threshold: float = 0.7):
    """Abstain (refuse to predict) when confidence is low."""
    proba = model.predict_proba([features])[0]
    max_confidence = max(proba)
    if max_confidence < threshold:
        return {"prediction": None, "reason": f"Low confidence: {max_confidence:.2f}", "abstained": True}
    return {"prediction": int(np.argmax(proba)), "confidence": max_confidence, "abstained": False}

# 3. Prompt injection detection (LLMs)
INJECTION_PATTERNS = [
    r"ignore (previous|all|above) instructions",
    r"you are now",
    r"new system prompt",
    r"disregard your",
    r"act as (an?|the)",
    r"jailbreak",
]

import re
def detect_prompt_injection(user_input: str) -> bool:
    lower = user_input.lower()
    return any(re.search(p, lower) for p in INJECTION_PATTERNS)

# 4. Data poisoning detection during training
def check_training_data_integrity(df, reference_df):
    """Compare new training data against a known-good reference."""
    from scipy.stats import ks_2samp
    alerts = []
    for col in df.select_dtypes("number").columns:
        stat, p_value = ks_2samp(reference_df[col].dropna(), df[col].dropna())
        if p_value < 0.001:  # Highly significant distribution shift
            alerts.append(f"Column '{col}' shows significant distribution shift (KS p={p_value:.6f})")
    # Check label distribution
    label_dist = df["label"].value_counts(normalize=True)
    ref_label_dist = reference_df["label"].value_counts(normalize=True)
    if abs(label_dist[1] - ref_label_dist[1]) > 0.10:  # >10% positive rate change
        alerts.append(f"Label distribution shifted: {label_dist[1]:.2%} vs reference {ref_label_dist[1]:.2%}")
    return alerts`,out:`# Security hardening checklist for ML APIs:
# ✓ Input schema validation (Pydantic) — reject malformed inputs early
# ✓ Range checks per feature — catch out-of-distribution inputs
# ✓ Confidence thresholding — abstain rather than guess on uncertain inputs
# ✓ Prompt injection detection — log and flag suspicious LLM inputs
# ✓ Training data integrity checks — catch poisoning before training
# ✓ Rate limiting — prevent model extraction via repeated queries
# ✓ Output scrubbing — remove PII from LLM outputs before logging`},
  { type:'warn', body:`Never log raw LLM inputs and outputs to unprotected storage. LLM inputs often contain sensitive user data (medical records, financial information, personal conversations). LLM outputs can contain PII from training data (model inversion). Log to encrypted, access-controlled storage, apply PII scrubbing before writing to analytics systems, and establish retention limits (e.g., delete raw logs after 30 days).` }
]};

L['mlops-w8-l5'] = { duration_mins: 25, sections: [
  { type:'text', body:`<h2>Capstone: Building a Complete MLOps Pipeline</h2><p>This capstone brings together every concept from the course into a single end-to-end ML system. We'll build a production-grade fraud detection pipeline covering: data versioning (DVC), experiment tracking (MLflow), CI/CD (GitHub Actions), model serving (FastAPI + Docker), monitoring (Prometheus + Grafana), and automated retraining (Prefect). This is the reference architecture you can adapt to any real ML project.</p><h3>System Architecture</h3><pre>
Raw Data (S3/GCS)
    │
    ▼
DVC Data Pipeline ──► Great Expectations validation
    │
    ▼
Feature Engineering ──► Feast feature store
    │                        │
    ▼                        ▼ (online store)
MLflow Training ──────► Model Registry ──► FastAPI Serving ──► Users
    │                        │                   │
    ▼                        ▼                   ▼
GitHub Actions CI ──► Docker Build ──► Kubernetes (KServe)
                                            │
                                     Prometheus + Grafana
                                            │
                                     Drift Alerts ──► Prefect Retraining
</pre>` },
  { type:'code', lang:'python', src:`# Complete MLOps pipeline orchestrator
# orchestrate.py — the single entry point that wires everything together

import mlflow
import great_expectations as gx
from prefect import flow, task
from datetime import datetime

@task(retries=2, retry_delay_seconds=60)
def validate_data(data_path: str) -> str:
    """Great Expectations data quality check."""
    context = gx.get_context()
    result = context.run_checkpoint("training_data_checkpoint", batch_kwargs={"path": data_path})
    if not result["success"]:
        raise ValueError(f"Data quality failed: {result}")
    return data_path

@task
def engineer_features(data_path: str) -> str:
    """Feature engineering → upload to Feast offline store."""
    import pandas as pd
    from feast import FeatureStore
    df = pd.read_parquet(data_path)
    # ... feature engineering ...
    store = FeatureStore(".")
    store.push("customer_stats", df)
    return "features_ready"

@task
def train_and_track(data_path: str) -> tuple[str, float]:
    """Train model with full MLflow tracking."""
    with mlflow.start_run() as run:
        mlflow.log_params({"model": "xgboost", "n_estimators": 200, "max_depth": 8})
        # ... training ...
        auc = 0.934
        mlflow.log_metric("auc", auc)
        mlflow.xgboost.log_model(model, "model")
    return run.info.run_id, auc

@task
def validate_model(run_id: str, auc: float) -> bool:
    """Model quality gate: must beat threshold and previous production model."""
    if auc < 0.88:
        raise ValueError(f"Model AUC {auc:.4f} below minimum threshold 0.88")
    client = mlflow.tracking.MlflowClient()
    prod_versions = client.get_latest_versions("fraud-model", stages=["Production"])
    if prod_versions:
        prod_run = client.get_run(prod_versions[0].run_id)
        prod_auc = prod_run.data.metrics["auc"]
        if auc < prod_auc - 0.005:  # Allow 0.5% regression
            raise ValueError(f"New AUC {auc:.4f} regresses vs production {prod_auc:.4f}")
    return True

@task
def register_and_deploy(run_id: str, approved: bool):
    """Register model → promote to staging → trigger deployment."""
    if not approved:
        return
    client = mlflow.tracking.MlflowClient()
    mv = mlflow.register_model(f"runs:/{run_id}/model", "fraud-model")
    client.transition_model_version_stage("fraud-model", mv.version, "Staging")
    # Trigger Kubernetes deployment via kubectl or API
    deploy_to_kubernetes(model_version=mv.version, environment="staging")
    # After smoke tests pass (automated), promote to production
    client.transition_model_version_stage("fraud-model", mv.version, "Production")

@flow(name="fraud-model-retraining", log_prints=True)
def retraining_pipeline(data_path: str):
    print(f"Starting retraining pipeline at {datetime.utcnow()}")
    validated_path = validate_data(data_path)
    engineer_features(validated_path)
    run_id, auc = train_and_track(validated_path)
    approved = validate_model(run_id, auc)
    register_and_deploy(run_id, approved)
    print(f"Pipeline complete. AUC={auc:.4f}, deployed={approved}")

if __name__ == "__main__":
    retraining_pipeline.serve(
        name="fraud-retraining-deployment",
        cron="0 2 * * *",   # 2am daily
    )`,out:`# Full pipeline execution time: ~45-90 minutes end to end
# Data validation:    ~5min
# Feature engineering: ~15min
# Training:           ~20-40min (depends on data size)
# Model validation:   ~2min
# Registration:       ~1min
# Kubernetes deploy:  ~5min (rolling update)
#
# Everything logged in MLflow, orchestrated by Prefect, monitored by Prometheus
# Rollback: kubectl rollout undo deployment/fraud-model → < 2 minutes`},
  { type:'text', body:`<h3>MLOps Maturity Assessment</h3><p>Use this checklist to assess your team's MLOps maturity and identify the highest-value gaps to close:</p><table><thead><tr><th>Capability</th><th>L0 (Manual)</th><th>L1 (Automated Training)</th><th>L2 (Full CI/CD)</th></tr></thead><tbody><tr><td>Model training</td><td>Manual notebooks</td><td>Automated on schedule</td><td>Event-triggered, reproducible</td></tr><tr><td>Experiment tracking</td><td>Spreadsheets</td><td>MLflow/W&B</td><td>Full lineage: data+code+model</td></tr><tr><td>Model serving</td><td>Script/cron job</td><td>Managed endpoint</td><td>K8s, auto-scaling, canary</td></tr><tr><td>Monitoring</td><td>None</td><td>Basic error rate</td><td>Drift, quality, cost, latency</td></tr><tr><td>Data quality</td><td>Manual checks</td><td>Automated validation</td><td>Great Expectations in pipeline</td></tr><tr><td>Retraining</td><td>Ad hoc, manual</td><td>Scheduled</td><td>Drift-triggered, automated gate</td></tr><tr><td>Rollback</td><td>None (redeploy)</td><td>Manual (previous artifact)</td><td>One-command, < 5 min</td></tr></tbody></table>` },
  { type:'tip', body:`Don't try to achieve L2 maturity all at once. Pick the highest-impact gap and close it first. For most teams: model monitoring (you can't improve what you don't measure) → automated retraining trigger → rollback capability. The full pipeline (feature store, streaming, IaC, multi-cloud) can wait until you have a team of 5+ MLOps engineers and dozens of models in production.` },
  { type:'exercise', title:'Design Your MLOps Pipeline', body:`Map your current ML project (or a hypothetical fraud detection system) to the maturity table above. For each capability row: (1) identify your current maturity level, (2) identify the single highest-value upgrade, and (3) estimate the implementation effort in person-days. Then write a 6-month roadmap: which capabilities will you upgrade in which order, and why?`, hint:`Start with capabilities that unblock others: monitoring enables drift detection, which enables automated retraining. Rollback unblocks faster deployment cadence.`, solution:`Example 6-month roadmap:
Month 1: Experiment tracking (MLflow) — low effort, high value, unblocks model comparison
Month 2: Data validation (Great Expectations) — catches data issues before they cause silent failures
Month 3: Model monitoring (Prometheus + Grafana dashboards) — enables data-driven retraining decisions
Month 4: Automated canary deployment (GitHub Actions + K8s) — safer, faster releases
Month 5: Drift-triggered retraining (Prefect flow) — closes the automation loop
Month 6: Feature store (Feast) — enables feature reuse across models, reduces training-serving skew

Ordering rationale: each month's work makes the next month's work more impactful and easier to justify to stakeholders.` }
]};

L['mlops-w8-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 8 Quiz</h2><p>Test your knowledge of ML system design patterns, model versioning and rollback, model cards and documentation, ML security, and end-to-end MLOps pipeline architecture.</p>` }
]};

Object.assign(window.DSA_LESSON_CONTENT || (window.DSA_LESSON_CONTENT = {}), L);
})();
