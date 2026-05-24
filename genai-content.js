(()=>{
const L = window.DSA_LESSON_CONTENT || {};

/* ── MODULE 1: Generative AI Foundations ── */

L['genai-w1-l1'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Discriminative vs Generative Models</h2><p>Most ML courses focus on <strong>discriminative models</strong> — models that learn P(y|x): given an input x, predict a label y. A spam classifier, a cat vs dog detector, a sentiment model — all discriminative. They learn a decision boundary, not the underlying data structure.</p><p><strong>Generative models</strong> learn the joint distribution P(x, y) or, for unconditional generation, the data distribution P(x) itself. They understand what data looks like, not just how to classify it. This is a fundamentally harder task — and it enables fundamentally new capabilities.</p>` },
  { type:'text', body:`<h3>What Generative Models Can Do</h3><ul><li><strong>Synthesis:</strong> Generate new samples indistinguishable from real data (images, text, audio, video)</li><li><strong>Density estimation:</strong> Assign a probability score to any data point — useful for anomaly detection</li><li><strong>Completion/inpainting:</strong> Fill in missing parts of data consistent with the distribution</li><li><strong>Data augmentation:</strong> Generate additional training samples to combat data scarcity</li><li><strong>Compression:</strong> Encode data into compact latent representations</li><li><strong>Conditional generation:</strong> Generate data satisfying specified constraints (text prompt, class label, reference image)</li></ul>` },
  { type:'text', body:`<h3>The Core Challenge</h3><p>Real data (images, audio, text) lives in an astronomically high-dimensional space. A 256×256 RGB image has 196,608 dimensions. The set of natural images occupies a vanishingly small, highly structured manifold within this space. Generative models must learn to model this manifold — which is why they require so much data and compute.</p><p>Different model families approach this challenge differently, with different tradeoffs in training stability, sample quality, mode coverage, and generation speed.</p>` },
  { type:'code', lang:'python', src:`# The generative vs discriminative distinction in code
import torch
import torch.nn as nn

# Discriminative model: learns P(y | x)
class Discriminative(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(nn.Linear(784,256), nn.ReLU(), nn.Linear(256,10))
    def forward(self, x):
        return self.net(x)  # → logits over 10 classes
    # Can classify but cannot generate new images

# Generative model: learns P(x) or P(x,y)
class Generative(nn.Module):
    def __init__(self, z_dim=64):
        super().__init__()
        self.net = nn.Sequential(nn.Linear(z_dim,256), nn.ReLU(), nn.Linear(256,784), nn.Sigmoid())
    def forward(self, z):
        return self.net(z)  # → generated 28×28 image from random noise z
    def sample(self, n):
        z = torch.randn(n, 64)  # sample from prior distribution
        return self.forward(z)  # → n new generated images`},
  { type:'tip', body:`In practice, the line is blurring. Flow-based models and diffusion models can do both density estimation AND generation. And discriminative models fine-tuned as classifiers can be "inverted" for generation (though inefficiently). The distinction is primarily about the learning objective, not capability.` },
  { type:'text', body:`<h3>Why Now?</h3><p>Generative AI has existed for decades (Boltzmann Machines, 1985; VAEs, 2013; GANs, 2014). The explosion in 2022–2024 came from convergence of: (1) scale — massive compute and data, (2) Transformer architecture applied to images and audio, (3) diffusion models replacing GANs as the quality frontier, and (4) RLHF/instruction tuning making models followable by non-experts. The technology matured from research curiosity to commercial product.</p>` }
]};

L['genai-w1-l2'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Probability Density Estimation & Latent Spaces</h2><p>At the heart of every generative model is one core question: <em>what is the probability of this data point?</em> If you can answer this, you can generate new samples (sample from high-probability regions) and detect anomalies (flag low-probability inputs).</p>` },
  { type:'text', body:`<h3>The Density Estimation Problem</h3><p>Given a dataset D = {x₁, x₂, …, xₙ} drawn from an unknown distribution P_data(x), learn a model P_θ(x) that approximates P_data. Training maximises the log-likelihood of the observed data:</p><pre><code>max_θ Σᵢ log P_θ(xᵢ)</code></pre><p>For simple low-dimensional data this is tractable. For 512×512 images it is not — there's no closed-form parameterisation of the distribution over natural images. Generative model architectures are essentially different strategies for making this tractable.</p>` },
  { type:'text', body:`<h3>Latent Space</h3><p>Most generative models operate through a <strong>latent space</strong> — a lower-dimensional compressed representation of the data. The idea: while natural images have millions of pixels, the set of natural images is governed by far fewer degrees of freedom (style, content, lighting, perspective…). A 512-dimensional latent vector can describe an entire face image.</p><p>The latent space has remarkable properties when learned well:</p><ul><li><strong>Interpolation:</strong> Smoothly blend between two images by interpolating their latent vectors</li><li><strong>Arithmetic:</strong> In GAN latent spaces: z_king − z_man + z_woman ≈ z_queen</li><li><strong>Disentanglement:</strong> Independent dimensions control independent attributes (pose, lighting, age)</li></ul>` },
  { type:'code', lang:'python', src:`import torch
import matplotlib.pyplot as plt
import numpy as np

# Visualising latent space interpolation
def slerp(z1, z2, t):
    """Spherical linear interpolation between two latent vectors."""
    z1_norm = z1 / z1.norm()
    z2_norm = z2 / z2.norm()
    omega = torch.acos((z1_norm * z2_norm).sum().clamp(-1, 1))
    if omega.abs() < 1e-6:
        return (1-t)*z1 + t*z2
    return (torch.sin((1-t)*omega)/torch.sin(omega))*z1 + \
           (torch.sin(t*omega)/torch.sin(omega))*z2

# Sample two random latent vectors
z1 = torch.randn(512)
z2 = torch.randn(512)

# Create 8-step interpolation path
steps = torch.linspace(0, 1, 8)
interpolated = [slerp(z1, z2, t) for t in steps]

# In practice: pass each through decoder/generator to get images
print(f"Latent dim: {z1.shape[0]}")
print(f"Interpolation path: {len(interpolated)} steps from z1 to z2")
print(f"Step 0 === z1: {torch.allclose(interpolated[0], z1)}")
print(f"Step 7 ≈ z2:  {torch.allclose(interpolated[-1], z2)}")`},
  { type:'text', body:`<h3>The Manifold Hypothesis</h3><p>Natural data (images of faces, sentences in English, musical notes) lies on a low-dimensional manifold embedded in a high-dimensional space. A generative model that learns this manifold can generate valid samples by sampling a point on the manifold. The quality of generation depends on how well the model has learned the manifold's shape, and whether sampling from it covers the full diversity of the training data (good <em>recall</em>) without generating off-manifold points (good <em>precision</em>).</p>` },
  { type:'tip', body:`Slerp (spherical linear interpolation) produces more natural image interpolations than linear interpolation for high-dimensional Gaussian latent spaces — because the data in a Gaussian lives on a shell at radius ≈ √dim, not in the centre. Lerp passes through the low-density centre and can produce blurry intermediate images.` }
]};

L['genai-w1-l3'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Survey of Generative Model Families</h2><p>Five major families of generative models, each with a different strategy for making density estimation tractable. Understanding their tradeoffs will help you choose the right tool for each problem.</p>` },
  { type:'text', body:`<h3>1. Variational Autoencoders (VAEs)</h3><p>Learn a probabilistic encoder q(z|x) and decoder p(x|z). Maximise the Evidence Lower BOund (ELBO). Pros: stable training, explicit latent space, fast sampling. Cons: blurry outputs due to reconstruction loss averaging over possible decodings.</p><h3>2. Generative Adversarial Networks (GANs)</h3><p>Generator G produces samples; Discriminator D distinguishes real from fake. Trained adversarially — G tries to fool D, D tries to catch G. Pros: sharp, high-quality images at their best. Cons: training instability, mode collapse (generator ignores portions of the data distribution).</p>` },
  { type:'text', body:`<h3>3. Normalising Flows</h3><p>Learn a series of invertible transformations that map a simple distribution (Gaussian) to the data distribution. Exact density computation and exact sampling. Pros: exact likelihood, invertible encoding. Cons: constrained architecture (must be invertible), computationally expensive. Examples: RealNVP, Glow.</p><h3>4. Diffusion Models</h3><p>Gradually add Gaussian noise to data until it becomes pure noise (forward process). Learn to reverse this process (denoising). Pros: state-of-the-art image quality, stable training, excellent mode coverage. Cons: slow sampling (hundreds of denoising steps). Examples: DDPM, DDIM, Stable Diffusion.</p><h3>5. Autoregressive Models</h3><p>Model P(x) = ∏ P(xᵢ | x₁, …, xᵢ₋₁). Generate one element at a time. Exact likelihood. Pros: excellent for sequential data (text, audio), good diversity. Cons: slow generation (must generate sequentially). Examples: GPT for text, WaveNet for audio, PixelCNN for images.</p>` },
  { type:'text', body:`<h3>Comparison Table</h3><table style="width:100%;border-collapse:collapse;font-size:.83rem;"><tr style="background:rgba(255,255,255,.05)"><th style="padding:.5rem;text-align:left">Family</th><th>Image Quality</th><th>Training</th><th>Sampling Speed</th><th>Diversity</th></tr><tr><td style="padding:.4rem">VAE</td><td>Low-Medium</td><td>Stable</td><td>Fast</td><td>Good</td></tr><tr style="background:rgba(255,255,255,.03)"><td style="padding:.4rem">GAN</td><td>High</td><td>Unstable</td><td>Fast</td><td>Poor (mode collapse)</td></tr><tr><td style="padding:.4rem">Normalising Flow</td><td>Medium</td><td>Stable</td><td>Medium</td><td>Good</td></tr><tr style="background:rgba(255,255,255,.03)"><td style="padding:.4rem">Diffusion</td><td>Very High</td><td>Very Stable</td><td>Slow</td><td>Excellent</td></tr><tr><td style="padding:.4rem">Autoregressive</td><td>High (text/audio)</td><td>Stable</td><td>Slow</td><td>Good</td></tr></table>` },
  { type:'tip', body:`In 2024, diffusion models dominate image generation (Stable Diffusion, DALL-E, Midjourney), autoregressive models dominate text (GPT family), and a hybrid — autoregressive + diffusion — is emerging for video (Sora-style). GANs remain relevant for real-time applications (face reenactment, style transfer) where sampling speed matters more than quality.` }
]};

L['genai-w1-l4'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Evaluating Generative Models — FID, IS & CLIP Score</h2><p>Evaluating generative models is uniquely difficult. Unlike classification, there is no single ground-truth label to compare against. A generated image could be high quality but completely different from any training sample — is that good or bad? This has led to a range of automated metrics, each capturing a different aspect of generation quality.</p>` },
  { type:'text', body:`<h3>Fréchet Inception Distance (FID)</h3><p>FID is the most widely used image generation metric. It compares the distribution of generated images to the distribution of real images using features from an InceptionV3 network:</p><ol><li>Extract Inception features for real and generated images</li><li>Fit a multivariate Gaussian to each set of features (μ_r, Σ_r) and (μ_g, Σ_g)</li><li>Compute Fréchet distance between the two Gaussians</li></ol><pre><code>FID = ||μ_r - μ_g||² + Tr(Σ_r + Σ_g - 2(Σ_r·Σ_g)^½)</code></pre><p>Lower FID = better. FID captures both quality (are generated images realistic?) and diversity (do they cover the training distribution?). Weakness: requires 50K+ samples for reliable estimates.</p>` },
  { type:'code', lang:'python', src:`# Computing FID with the pytorch-fid library
# pip install pytorch-fid

import subprocess

# Method 1: Command line (easiest)
# python -m pytorch_fid /path/to/real_images /path/to/generated_images

# Method 2: Programmatic
from pytorch_fid import fid_score
import torch

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

fid_value = fid_score.calculate_fid_given_paths(
    paths=['./real_images/', './generated_images/'],
    batch_size=64,
    device=device,
    dims=2048    # InceptionV3 feature dimension
)
print(f"FID: {fid_value:.2f}")
# Reference values:
# < 10:  excellent (hard to achieve)
# 10-30: good
# 30-60: acceptable
# > 100: poor`},
  { type:'text', body:`<h3>Inception Score (IS)</h3><p>IS measures two properties simultaneously: (1) Quality — generated images should be classifiable with high confidence (sharp, recognisable). (2) Diversity — over the full generated set, the marginal class distribution p(y) should be uniform. IS = exp(𝔼[KL(p(y|x) || p(y))]). Higher IS = better. Weakness: only measures diversity across classes, not within a class. A model generating the same face 1000 different times might score high if faces are recognisable.</p>` },
  { type:'text', body:`<h3>CLIP Score</h3><p>For text-to-image models, FID doesn't capture alignment between the text prompt and the generated image. CLIP Score measures this: embed both the text prompt and generated image using CLIP, compute cosine similarity. Higher = better prompt adherence. CLIP Score can be combined with FID: a good text-to-image model should have both high CLIP Score (following the prompt) and low FID (realistic distribution).</p><h3>Human Evaluation</h3><p>All automated metrics are proxies. For production systems, blind human evaluation — raters compare pairs of images and indicate which is more realistic, more aligned with the prompt, or more aesthetically pleasing — remains the gold standard. Tools: ELO rating systems (similar to Chatbot Arena), Amazon Mechanical Turk, or internal annotation teams.</p>` },
  { type:'tip', body:`When comparing model versions, always report FID with the <strong>same number of generated samples</strong> (typically 50K). FID calculated on 1K samples vs 50K samples is not comparable — FID decreases as sample count increases, even for the same model.` }
]};

L['genai-w1-l5'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Generative AI Applications & the 2024 Landscape</h2><p>Generative AI is no longer a research curiosity — it's a production technology reshaping industries. Understanding the application landscape helps you identify where to apply the techniques you'll learn in this course.</p>` },
  { type:'text', body:`<h3>Image & Video</h3><ul><li><strong>Text-to-image:</strong> DALL-E 3, Stable Diffusion XL, Midjourney, Ideogram — marketing assets, concept art, product mockups</li><li><strong>Image editing:</strong> Adobe Firefly (inpainting, background removal, object replacement)</li><li><strong>Video generation:</strong> Sora, Runway Gen-3, Kling — advertising, short films, animation</li><li><strong>3D generation:</strong> Shap-E, Point-E, TripoSR — game assets, product visualization</li></ul>` },
  { type:'text', body:`<h3>Audio & Music</h3><ul><li><strong>Text-to-speech:</strong> ElevenLabs, Coqui XTTS, OpenAI TTS — podcasts, audiobooks, accessibility</li><li><strong>Voice cloning:</strong> 3-second voice clone from reference audio</li><li><strong>Music generation:</strong> Suno, Udio, MusicGen — background music, jingles, personalised playlists</li><li><strong>Audio effects:</strong> AudioCraft, Stable Audio — foley, sound design, game audio</li></ul>` },
  { type:'text', body:`<h3>Code, Text & Multimodal</h3><ul><li><strong>Code generation:</strong> GitHub Copilot, Cursor, Devin — code completion, refactoring, test generation</li><li><strong>Document generation:</strong> Legal drafts, medical reports, marketing copy at scale</li><li><strong>Multimodal:</strong> GPT-4V, Gemini — analyse images+text, generate slide decks, extract data from charts</li><li><strong>Drug discovery:</strong> AlphaFold 3, RFDiffusion — generating protein structures, molecular design</li></ul>` },
  { type:'text', body:`<h3>Responsible Generative AI</h3><p>The same technology that enables creative applications also enables harms:</p><ul><li><strong>Deepfakes:</strong> Realistic but fake videos of real people — misinformation, fraud</li><li><strong>Copyright:</strong> Models trained on copyrighted images; generated content may infringe</li><li><strong>Bias:</strong> Models reflect biases in training data — representation, stereotyping</li><li><strong>Synthetic media:</strong> AI-generated images indistinguishable from photos — erodes trust</li></ul><p>Mitigation: C2PA content provenance standard (watermarking), SafetyChecker in Stable Diffusion, NSFW filters, usage policies.</p>` },
  { type:'exercise', title:`Identify a Generative AI Application`, body:`<p>Pick one industry (healthcare, education, entertainment, e-commerce, or gaming) and identify: (1) three specific tasks where generative AI is currently used or could be used, (2) which model family (GAN, diffusion, autoregressive, etc.) would be most appropriate for each, and (3) what the main risks are for each application.</p>`, hint:`Think about what the input and output of each task is. Text input → image output suggests diffusion or autoregressive image models. Audio → audio suggests WaveNet-style or diffusion audio models. Be specific about the risk: patient data privacy for healthcare, age-appropriate content for education.`, solution:`Example — Education:
1. Generating personalised practice problems from a topic description → Autoregressive LLM (GPT-4). Risk: incorrect/misleading content presented as authoritative.
2. Converting text lessons to narrated audio → TTS (XTTS/ElevenLabs). Risk: voice cloning without consent if instructor voice is used.
3. Generating diagrams from topic descriptions (e.g., "draw a neural network") → Text-to-image (SD/DALL-E). Risk: scientifically incorrect diagrams presented as accurate.` }
]};

L['genai-w1-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 1 Quiz</h2><p>Test your understanding of generative AI foundations, model families, and evaluation metrics.</p>` }
]};

/* ── MODULE 2: Autoencoders & Variational Autoencoders ── */

L['genai-w2-l1'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Autoencoders — Architecture & Reconstruction</h2><p>An autoencoder is the simplest generative architecture: learn to compress data into a compact representation and then reconstruct it. By forcing data through a bottleneck, the model must learn the most important features to preserve.</p>` },
  { type:'text', body:`<h3>Architecture</h3><p>An autoencoder has two components:</p><ul><li><strong>Encoder</strong> f: x → z — maps input x to a latent code z (bottleneck)</li><li><strong>Decoder</strong> g: z → x̂ — reconstructs the input from z</li></ul><p>Trained by minimising reconstruction loss: L = ||x − g(f(x))||². The bottleneck dimension forces the encoder to discard irrelevant information and retain the most informative features. This is <em>unsupervised</em> — no labels required.</p>` },
  { type:'code', lang:'python', src:`import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

class Autoencoder(nn.Module):
    def __init__(self, latent_dim=32):
        super().__init__()
        self.encoder = nn.Sequential(
            nn.Linear(784, 256), nn.ReLU(),
            nn.Linear(256, 64),  nn.ReLU(),
            nn.Linear(64, latent_dim)
        )
        self.decoder = nn.Sequential(
            nn.Linear(latent_dim, 64),  nn.ReLU(),
            nn.Linear(64, 256),         nn.ReLU(),
            nn.Linear(256, 784),        nn.Sigmoid()
        )
    def encode(self, x):   return self.encoder(x.view(-1, 784))
    def decode(self, z):   return self.decoder(z).view(-1, 1, 28, 28)
    def forward(self, x):  return self.decode(self.encode(x))

# Training
model = Autoencoder(latent_dim=32)
optimizer = optim.Adam(model.parameters(), lr=1e-3)
criterion = nn.MSELoss()

transform = transforms.Compose([transforms.ToTensor()])
loader = DataLoader(datasets.MNIST('./data', download=True, transform=transform), batch_size=128, shuffle=True)

for epoch in range(10):
    total_loss = 0
    for x, _ in loader:  # note: labels _ are not used
        recon = model(x)
        loss = criterion(recon, x)
        optimizer.zero_grad(); loss.backward(); optimizer.step()
        total_loss += loss.item()
    print(f"Epoch {epoch+1}: loss={total_loss/len(loader):.4f}")`},
  { type:'text', body:`<h3>Undercomplete vs Overcomplete</h3><p><strong>Undercomplete:</strong> Bottleneck dimension &lt; input dimension. Forces compression — the model must learn meaningful structure. Common for most applications.<br><br><strong>Overcomplete:</strong> Bottleneck dimension ≥ input dimension. Risk: the model learns an identity mapping (copy input to output), ignoring the bottleneck. Requires regularisation (dropout, sparsity constraints) to be useful. Sparse autoencoders (used in feature analysis of LLMs) are overcomplete with L1 sparsity penalties.</p>` },
  { type:'tip', body:`Standard autoencoders have a major flaw: the latent space is not necessarily continuous or structured. Nearby latent points may decode to completely different images. This makes standard autoencoders poor at generation — sampling a random z often produces nonsense. VAEs fix this.` }
]};

L['genai-w2-l2'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Denoising Autoencoders & Sparse Autoencoders</h2><p>Standard autoencoders can cheat: with a large bottleneck and a powerful enough encoder/decoder, they can memorise training data without learning meaningful features. Regularised autoencoders prevent this by adding constraints that force the model to learn structured representations.</p>` },
  { type:'text', body:`<h3>Denoising Autoencoders (DAE)</h3><p>Train the model to reconstruct clean data from corrupted input. Corruption can be Gaussian noise addition, random masking (dropout on inputs), or salt-and-pepper noise. The reconstruction objective becomes: L = ||x − g(f(x̃))||² where x̃ is the corrupted version of x.</p><p>By forcing reconstruction from noisy inputs, the model learns the local structure of the data manifold — it must understand what "correct" data looks like, not just memorise pixel values. This makes the learned representations more robust and more useful for downstream tasks.</p>` },
  { type:'code', lang:'python', src:`class DenoisingAutoencoder(Autoencoder):
    def corrupt(self, x, noise_factor=0.3):
        noise = torch.randn_like(x) * noise_factor
        return (x + noise).clamp(0, 1)

    def forward(self, x):
        corrupted = self.corrupt(x)
        z = self.encode(corrupted)
        return self.decode(z)  # reconstruct CLEAN x from noisy input

# Training: input is corrupted, target is clean
dae = DenoisingAutoencoder(latent_dim=32)
optimizer = optim.Adam(dae.parameters(), lr=1e-3)

for epoch in range(10):
    for x, _ in loader:
        recon = dae(x)
        loss = criterion(recon, x)  # compare to CLEAN x
        optimizer.zero_grad(); loss.backward(); optimizer.step()`},
  { type:'text', body:`<h3>Sparse Autoencoders (SAE)</h3><p>Sparse autoencoders add an L1 regularisation penalty on the latent activations, encouraging most units to be zero at any given time:</p><pre><code>L = ||x − g(f(x))||² + λ||f(x)||₁</code></pre><p>This forces the model to represent each input using only a few active features — a "sparse code." Sparse codes are interpretable: each active dimension corresponds to a specific detected feature. In 2024, sparse autoencoders became a key tool in <strong>mechanistic interpretability</strong> — Anthropic and others train SAEs on intermediate LLM activations to find human-interpretable features encoded in model weights (colours, emotions, grammar concepts, safety-relevant patterns).</p>` },
  { type:'tip', body:`Masked Autoencoders (MAE, He et al. 2022) mask 75% of image patches and train a Vision Transformer to reconstruct them. This is essentially a denoising autoencoder at the patch level — and it produces excellent visual representations while being far more computationally efficient than contrastive learning methods like DINO.` }
]};

L['genai-w2-l3'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Variational Autoencoders — ELBO & Reparameterisation</h2><p>VAEs (Kingma & Welling, 2013) solve the generative limitation of standard autoencoders. Instead of encoding x to a single point z, the encoder outputs a distribution q(z|x) = N(μ, σ²). This ensures the latent space is continuous and structured — enabling true generation by sampling from it.</p>` },
  { type:'text', body:`<h3>The VAE Objective — ELBO</h3><p>VAEs maximise the Evidence Lower BOund (ELBO), which has two terms:</p><pre><code>ELBO = 𝔼[log p(x|z)]  −  KL(q(z|x) || p(z))
       ↑ Reconstruction    ↑ Regularisation
       (be faithful to x)   (keep latent space organised)</code></pre><p>The <strong>KL divergence term</strong> penalises the encoder distribution q(z|x) for diverging from the prior p(z) = N(0,I). This forces the latent space to be approximately standard normal — enabling generation by sampling z ~ N(0,I) and decoding.</p>` },
  { type:'text', body:`<h3>The Reparameterisation Trick</h3><p>Sampling z ~ N(μ, σ²) is not differentiable — gradients can't flow through a random sample. The reparameterisation trick rewrites the sample as:</p><pre><code>z = μ + σ · ε,   where ε ~ N(0, I)</code></pre><p>Now the randomness (ε) is separated from the parameters (μ, σ). Gradients flow through μ and σ during backprop while ε remains a fixed sample. This is the central technical innovation that makes VAE training with gradient descent possible.</p>` },
  { type:'code', lang:'python', src:`import torch
import torch.nn as nn
import torch.nn.functional as F

class VAE(nn.Module):
    def __init__(self, latent_dim=20):
        super().__init__()
        self.latent_dim = latent_dim
        # Encoder outputs mean and log-variance
        self.enc_shared = nn.Sequential(nn.Linear(784,512), nn.ReLU())
        self.enc_mu     = nn.Linear(512, latent_dim)
        self.enc_logvar = nn.Linear(512, latent_dim)
        # Decoder
        self.decoder = nn.Sequential(
            nn.Linear(latent_dim, 512), nn.ReLU(),
            nn.Linear(512, 784), nn.Sigmoid()
        )

    def encode(self, x):
        h = self.enc_shared(x.view(-1, 784))
        return self.enc_mu(h), self.enc_logvar(h)

    def reparameterise(self, mu, logvar):
        std = torch.exp(0.5 * logvar)      # σ = exp(0.5 * log σ²)
        eps = torch.randn_like(std)        # ε ~ N(0, I)
        return mu + eps * std              # z = μ + σ·ε

    def decode(self, z):
        return self.decoder(z).view(-1, 1, 28, 28)

    def forward(self, x):
        mu, logvar = self.encode(x)
        z = self.reparameterise(mu, logvar)
        return self.decode(z), mu, logvar

    def loss(self, recon_x, x, mu, logvar, beta=1.0):
        # Reconstruction: binary cross-entropy over pixels
        bce = F.binary_cross_entropy(recon_x, x, reduction='sum')
        # KL divergence: closed form for N(mu, sigma) vs N(0,1)
        kl = -0.5 * torch.sum(1 + logvar - mu.pow(2) - logvar.exp())
        return bce + beta * kl

vae = VAE(latent_dim=20)
optimiser = torch.optim.Adam(vae.parameters(), lr=1e-3)

for epoch in range(20):
    for x, _ in loader:
        recon, mu, logvar = vae(x)
        loss = vae.loss(recon, x, mu, logvar, beta=1.0)
        optimiser.zero_grad(); loss.backward(); optimiser.step()`},
  { type:'tip', body:`The β-VAE variant uses β > 1 in front of the KL term. Higher β forces stronger disentanglement (each latent dimension controls an independent generative factor) at the cost of reconstruction quality. β=4 is a common value for disentangled representations on MNIST and CelebA.` }
]};

L['genai-w2-l4'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Sampling & Interpolating in the VAE Latent Space</h2><p>The whole point of a VAE over a standard autoencoder is a well-organised latent space. Once trained, you can sample new images, interpolate between existing ones, and perform latent arithmetic — all impossible with a standard AE.</p>` },
  { type:'code', lang:'python', src:`import torch
import matplotlib.pyplot as plt
import numpy as np

# Assume 'vae' is a trained VAE on MNIST (latent_dim=20)
vae.eval()

# 1. Unconditional generation — sample from prior N(0,I)
with torch.no_grad():
    z = torch.randn(16, 20)        # 16 random latent vectors
    generated = vae.decode(z)      # → 16 generated digits

# 2. Latent interpolation between two real images
def interpolate(img1, img2, steps=8):
    with torch.no_grad():
        mu1, _ = vae.encode(img1)
        mu2, _ = vae.encode(img2)
        # Linear interpolation in latent space
        alphas = torch.linspace(0, 1, steps)
        interps = [vae.decode((1-a)*mu1 + a*mu2) for a in alphas]
    return interps

# Get two MNIST samples
dataset = datasets.MNIST('./data', transform=transforms.ToTensor())
img1, label1 = dataset[0]   # digit 5
img2, label2 = dataset[10]  # digit 7
frames = interpolate(img1.unsqueeze(0), img2.unsqueeze(0))
print(f"Interpolation: {len(frames)} frames from digit {label1} to {label2}")`},
  { type:'text', body:`<h3>Visualising the Latent Space</h3><p>For 2D latent VAEs trained on MNIST, you can visualise the entire latent space by sampling a grid of (z₁, z₂) values and decoding each. This reveals the structure: different digits occupy different regions, with smooth transitions between them. The KL term's regularisation ensures the digit regions are roughly concentric around the origin, with no "holes" of low density.</p>` },
  { type:'code', lang:'python', src:`# 2D latent space grid visualisation (requires latent_dim=2)
def plot_latent_grid(vae_2d, n=20, fig_size=10):
    grid_x = np.linspace(-3, 3, n)
    grid_y = np.linspace(-3, 3, n)
    canvas = np.zeros((28*n, 28*n))

    with torch.no_grad():
        for i, yi in enumerate(grid_y):
            for j, xj in enumerate(grid_x):
                z = torch.tensor([[xj, yi]], dtype=torch.float32)
                img = vae_2d.decode(z).squeeze().numpy()
                canvas[i*28:(i+1)*28, j*28:(j+1)*28] = img

    plt.figure(figsize=(fig_size, fig_size))
    plt.imshow(canvas, cmap='gray')
    plt.title('VAE 2D Latent Space — MNIST')
    plt.axis('off')
    plt.savefig('vae_latent_grid.png', dpi=150, bbox_inches='tight')
    plt.show()`},
  { type:'tip', body:`In practice, use t-SNE or UMAP to visualise high-dimensional VAE latent spaces (e.g., latent_dim=64) — they project to 2D while preserving cluster structure. Colour the points by class label to see whether the VAE has learned class-separable representations without any supervision.` }
]};

L['genai-w2-l5'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Conditional VAEs & VQ-VAE</h2><p>Standard VAEs generate from the full learned distribution. Conditional VAEs (CVAE) allow you to control what is generated. VQ-VAE replaces the continuous latent space with a discrete codebook — enabling crisp latent codes used as the foundation for modern image generation systems.</p>` },
  { type:'text', body:`<h3>Conditional VAE (CVAE)</h3><p>Feed the class label (or any conditioning signal) to both encoder and decoder. The encoder learns q(z|x, c), the decoder learns p(x|z, c). At generation time, specify c to control what class is generated, then sample z ~ N(0,I) for diversity within that class.</p>` },
  { type:'code', lang:'python', src:`class CVAE(nn.Module):
    def __init__(self, latent_dim=20, num_classes=10):
        super().__init__()
        # Condition: one-hot encode class label and concatenate
        self.enc_shared = nn.Sequential(nn.Linear(784+num_classes, 512), nn.ReLU())
        self.enc_mu     = nn.Linear(512, latent_dim)
        self.enc_logvar = nn.Linear(512, latent_dim)
        self.decoder    = nn.Sequential(
            nn.Linear(latent_dim+num_classes, 512), nn.ReLU(),
            nn.Linear(512, 784), nn.Sigmoid()
        )
        self.num_classes = num_classes

    def forward(self, x, c):
        c_onehot = torch.zeros(x.size(0), self.num_classes)
        c_onehot.scatter_(1, c.unsqueeze(1), 1)
        xc = torch.cat([x.view(-1,784), c_onehot], dim=1)
        h = self.enc_shared(xc)
        mu, logvar = self.enc_mu(h), self.enc_logvar(h)
        z = mu + torch.exp(0.5*logvar)*torch.randn_like(mu)
        zc = torch.cat([z, c_onehot], dim=1)
        return self.decoder(zc).view(-1,1,28,28), mu, logvar

# Generate a specific digit class
cvae = CVAE()
# cvae.load_state_dict(...)  # load trained weights
with torch.no_grad():
    target_digit = 3
    c = torch.tensor([target_digit])
    c_onehot = torch.zeros(1, 10); c_onehot[0, target_digit] = 1
    z = torch.randn(1, 20)
    zc = torch.cat([z, c_onehot], dim=1)
    generated = cvae.decoder(zc).view(1, 1, 28, 28)
    print(f"Generated digit {target_digit}: shape {generated.shape}")`},
  { type:'text', body:`<h3>VQ-VAE — Vector Quantised VAE</h3><p>VQ-VAE (van den Oord et al. 2017) replaces the continuous latent distribution with a discrete codebook. The encoder outputs a continuous vector, which is then <em>snapped</em> to the nearest entry in a learned codebook of K embedding vectors. The decoder reconstructs from the quantised code.</p><p>Why discrete? Discrete codes are more interpretable, can be modelled with autoregressive models (like GPT), and avoid the blurriness that plagues continuous VAEs. VQ-VAE 2 (2019) demonstrated that a hierarchy of VQ-VAE codebooks + an autoregressive prior over the codes could generate ImageNet images at 1024×1024 — competitive with GANs at the time. Today, the VQ-VAE idea lives on in the "tokeniser" of image generation systems: VQGAN tokens are what autoregressive image models like DALL-E 1 predicted.</p>` },
  { type:'tip', body:`Stable Diffusion's VAE is a continuous latent diffusion model — not VQ-VAE — but it uses a similar idea: compress 512×512 images to 64×64 latent maps (8× compression) before diffusion. This makes diffusion tractable on consumer GPUs by operating in the compressed latent space.` }
]};

L['genai-w2-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 2 Quiz</h2><p>Test your understanding of autoencoders, VAEs, and latent space properties.</p>` }
]};

/* ── MODULE 3: Generative Adversarial Networks ── */

L['genai-w3-l1'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>GAN Architecture — Generator vs Discriminator</h2><p>GANs (Goodfellow et al. 2014) introduced a completely different approach to generative modelling: instead of maximising likelihood, train two networks against each other. The result: dramatically sharper images than anything achievable with VAEs at the time.</p>` },
  { type:'text', body:`<h3>The Adversarial Game</h3><p>A GAN has two components trained simultaneously:</p><ul><li><strong>Generator G:</strong> Takes random noise z ~ p(z) and produces a fake sample G(z). Goal: make G(z) indistinguishable from real data.</li><li><strong>Discriminator D:</strong> Takes an input (real x or fake G(z)) and outputs a probability that it's real. Goal: correctly identify real vs fake.</li></ul><p>They play a minimax game: G tries to fool D; D tries to not be fooled. At equilibrium (Nash equilibrium), G produces samples from the true data distribution and D outputs 0.5 for everything (can't tell real from fake).</p>` },
  { type:'code', lang:'python', src:`import torch
import torch.nn as nn
import torch.optim as optim

# Simple GAN on MNIST
class Generator(nn.Module):
    def __init__(self, z_dim=100, img_dim=784):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(z_dim, 256), nn.LeakyReLU(0.2),
            nn.Linear(256, 512),   nn.LeakyReLU(0.2),
            nn.Linear(512, img_dim), nn.Tanh()  # output in [-1, 1]
        )
    def forward(self, z): return self.net(z)

class Discriminator(nn.Module):
    def __init__(self, img_dim=784):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(img_dim, 512), nn.LeakyReLU(0.2), nn.Dropout(0.3),
            nn.Linear(512, 256),     nn.LeakyReLU(0.2), nn.Dropout(0.3),
            nn.Linear(256, 1),       nn.Sigmoid()        # probability of real
        )
    def forward(self, x): return self.net(x)

G = Generator(z_dim=100)
D = Discriminator()
g_opt = optim.Adam(G.parameters(), lr=2e-4, betas=(0.5, 0.999))
d_opt = optim.Adam(D.parameters(), lr=2e-4, betas=(0.5, 0.999))
criterion = nn.BCELoss()`},
  { type:'text', body:`<h3>Why LeakyReLU in the Discriminator?</h3><p>Standard ReLU kills all negative activations. In the discriminator, this can prevent gradients from flowing to the generator for certain inputs. LeakyReLU (slope 0.2 for negative inputs) maintains a small gradient everywhere, stabilising training. The generator typically uses ReLU or Tanh in its final layer.</p>` },
  { type:'tip', body:`The betas=(0.5, 0.999) for Adam in GAN training are a well-established empirical finding from DCGAN. The default β₁=0.9 makes the optimizer too "momentum-heavy" and causes training instability. β₁=0.5 makes it more reactive to recent gradients, which helps during the adversarial back-and-forth.` }
]};

L['genai-w3-l2'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>GAN Loss Functions & Training Dynamics</h2><p>The loss functions define the adversarial game and are the most important design choice in GAN training. Different loss formulations lead to dramatically different training stability.</p>` },
  { type:'text', body:`<h3>Original Minimax Loss</h3><p>The original GAN objective:</p><pre><code>min_G max_D  𝔼[log D(x)] + 𝔼[log(1 − D(G(z)))]</code></pre><p>D maximises: correctly classifying real (log D(x) → 0) and fake (log(1−D(G(z))) → 0). G minimises: making D output high probability for fakes (log(1−D(G(z))) → −∞).</p><p><strong>The saturation problem:</strong> Early in training, D easily rejects fake samples (D(G(z)) ≈ 0). The generator's gradient ∂/∂G log(1−D(G(z))) vanishes near D(G(z))=0 — exactly when the generator needs the strongest learning signal. This is the vanishing gradient problem specific to GAN training.</p>` },
  { type:'code', lang:'python', src:`def train_one_epoch(G, D, loader, g_opt, d_opt, z_dim=100, device='cpu'):
    G.train(); D.train()
    for real_imgs, _ in loader:
        real_imgs = real_imgs.view(-1, 784).to(device)
        batch_size = real_imgs.size(0)
        real_labels = torch.ones(batch_size, 1).to(device)
        fake_labels = torch.zeros(batch_size, 1).to(device)

        # ── Train Discriminator ──
        z = torch.randn(batch_size, z_dim).to(device)
        fake_imgs = G(z).detach()  # detach: don't update G here
        d_real = D(real_imgs)
        d_fake = D(fake_imgs)
        d_loss = criterion(d_real, real_labels) + criterion(d_fake, fake_labels)
        d_opt.zero_grad(); d_loss.backward(); d_opt.step()

        # ── Train Generator (non-saturating) ──
        z = torch.randn(batch_size, z_dim).to(device)
        fake_imgs = G(z)
        d_fake_for_g = D(fake_imgs)
        # Non-saturating: flip labels — G tries to make D output 1 (real)
        g_loss = criterion(d_fake_for_g, real_labels)
        g_opt.zero_grad(); g_loss.backward(); g_opt.step()

    return d_loss.item(), g_loss.item()`},
  { type:'text', body:`<h3>Non-Saturating Generator Loss</h3><p>Instead of minimising log(1−D(G(z))), the generator maximises log(D(G(z))). Mathematically equivalent at the optimum, but provides much stronger gradients early in training when D(G(z)) is near 0. This is the standard choice in almost all practical GAN implementations.</p><h3>Training Balance</h3><p>GAN training is notoriously sensitive. Rules of thumb:</p><ul><li>Train D for k=1 steps per G step (k>1 can help if G is far ahead of D)</li><li>Monitor D(real) ≈ 0.7-0.8 and D(fake) ≈ 0.2-0.3 — if D(real) → 1 and D(fake) → 0, discriminator is winning; reduce its LR</li><li>If G and D losses collapse to the same value early, training likely has diverged</li></ul>` },
  { type:'tip', body:`Label smoothing in the discriminator (use 0.9 instead of 1.0 for real labels) prevents D from becoming overconfident and provides softer gradients for G. Instance noise (adding small Gaussian noise to both real and fake images fed to D) also stabilises early training.` }
]};

L['genai-w3-l3'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>DCGAN — Deep Convolutional GAN</h2><p>DCGAN (Radford et al. 2015) was the first paper to make GAN training reliably stable for image generation, by establishing a set of architectural guidelines that have become standard practice.</p>` },
  { type:'text', body:`<h3>DCGAN Architectural Guidelines</h3><ul><li><strong>No pooling layers:</strong> Use strided convolutions in D (downsampling) and transposed convolutions in G (upsampling). Pooling discards spatial information; learned downsampling preserves it.</li><li><strong>Batch normalisation everywhere except:</strong> Final layer of G (so it can saturate appropriately), first layer of D (to avoid mode collapse)</li><li><strong>ReLU in G, LeakyReLU in D</strong></li><li><strong>Tanh output in G</strong> (produces values in [-1,1], matching data normalised to this range)</li><li><strong>No fully connected layers</strong> in the deep parts of G and D — all convolutions</li></ul>` },
  { type:'code', lang:'python', src:`class DCGANGenerator(nn.Module):
    def __init__(self, z_dim=100, ngf=64):
        super().__init__()
        self.net = nn.Sequential(
            # Input: z_dim × 1 × 1
            nn.ConvTranspose2d(z_dim, ngf*8, 4, 1, 0, bias=False),
            nn.BatchNorm2d(ngf*8), nn.ReLU(True),           # → 512 × 4 × 4
            nn.ConvTranspose2d(ngf*8, ngf*4, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf*4), nn.ReLU(True),           # → 256 × 8 × 8
            nn.ConvTranspose2d(ngf*4, ngf*2, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf*2), nn.ReLU(True),           # → 128 × 16 × 16
            nn.ConvTranspose2d(ngf*2, ngf,   4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf),   nn.ReLU(True),           # → 64 × 32 × 32
            nn.ConvTranspose2d(ngf, 3,       4, 2, 1, bias=False),
            nn.Tanh()                                        # → 3 × 64 × 64
        )
    def forward(self, z): return self.net(z.view(-1, 100, 1, 1))

class DCGANDiscriminator(nn.Module):
    def __init__(self, ndf=64):
        super().__init__()
        self.net = nn.Sequential(
            # Input: 3 × 64 × 64
            nn.Conv2d(3, ndf,   4, 2, 1, bias=False), nn.LeakyReLU(0.2, True),
            nn.Conv2d(ndf, ndf*2, 4, 2, 1, bias=False), nn.BatchNorm2d(ndf*2), nn.LeakyReLU(0.2, True),
            nn.Conv2d(ndf*2, ndf*4, 4, 2, 1, bias=False), nn.BatchNorm2d(ndf*4), nn.LeakyReLU(0.2, True),
            nn.Conv2d(ndf*4, ndf*8, 4, 2, 1, bias=False), nn.BatchNorm2d(ndf*8), nn.LeakyReLU(0.2, True),
            nn.Conv2d(ndf*8, 1, 4, 1, 0, bias=False), nn.Sigmoid()  # → 1 × 1 × 1
        )
    def forward(self, x): return self.net(x).view(-1, 1)`},
  { type:'text', body:`<h3>Generating 64×64 Images</h3><p>DCGAN could generate convincing 64×64 bedroom images (LSUN dataset), faces (CelebA), and CIFAR-10 images with FID scores far below anything achievable with VAEs or earlier approaches. It established the visual benchmark that subsequent GAN work would try to surpass.</p>` },
  { type:'tip', body:`Initialise DCGAN weights from N(0, 0.02) for all conv and transposed-conv layers. The 0.02 standard deviation is critical — too large and early activations saturate; too small and training is slow. BatchNorm layers should be initialised with weight=1 (gamma) and bias=0 (beta).` }
]};

L['genai-w3-l4'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Wasserstein GAN — Better Gradients with Earth Mover Distance</h2><p>Standard GAN training is notoriously unstable. WGAN (Arjovsky et al. 2017) provides a principled fix by replacing the JS divergence with the Wasserstein-1 (Earth Mover) distance, which provides meaningful gradients even when the real and generated distributions don't overlap.</p>` },
  { type:'text', body:`<h3>The Problem with JS Divergence</h3><p>The original GAN minimises the Jensen-Shannon (JS) divergence between real and generated distributions. When the two distributions have disjoint support (no overlapping regions) — which is common early in training — the JS divergence is constant (log 2) everywhere. This means the gradient vanishes: the generator receives no learning signal about which direction to move. This causes training to collapse or oscillate.</p>` },
  { type:'text', body:`<h3>Wasserstein Distance</h3><p>The Wasserstein-1 distance (W₁) measures the "minimum work" needed to transform one distribution into another — the Earth Mover distance. Unlike JS divergence, W₁ provides a continuous, meaningful signal even for disjoint distributions. WGAN replaces the discriminator with a <strong>critic</strong> (no sigmoid output) and trains it to maximise:</p><pre><code>W₁ ≈ 𝔼[critic(x_real)] − 𝔼[critic(G(z))]</code></pre><p>The critic must be 1-Lipschitz (constrained to not vary too rapidly). Original WGAN achieves this by clipping weights to [-0.01, 0.01] — crude but effective. WGAN-GP (Gulrajani et al. 2017) improves this with a gradient penalty instead.</p>` },
  { type:'code', lang:'python', src:`def wgan_gp_loss(critic, real_imgs, fake_imgs, lambda_gp=10):
    """Gradient penalty for WGAN-GP."""
    batch_size = real_imgs.size(0)
    # Random interpolation between real and fake
    alpha = torch.rand(batch_size, 1, 1, 1, device=real_imgs.device)
    interpolated = (alpha * real_imgs + (1 - alpha) * fake_imgs).requires_grad_(True)
    d_interp = critic(interpolated)
    # Compute gradients of critic output w.r.t. interpolated inputs
    grads = torch.autograd.grad(
        outputs=d_interp, inputs=interpolated,
        grad_outputs=torch.ones_like(d_interp),
        create_graph=True, retain_graph=True
    )[0]
    gp = ((grads.norm(2, dim=1) - 1)**2).mean()
    return lambda_gp * gp

def train_wgan_gp_step(G, critic, real_imgs, g_opt, c_opt, z_dim=100, n_critic=5):
    # Train critic n_critic times per generator step
    for _ in range(n_critic):
        z = torch.randn(real_imgs.size(0), z_dim, 1, 1)
        fake_imgs = G(z).detach()
        gp = wgan_gp_loss(critic, real_imgs, fake_imgs)
        c_loss = critic(fake_imgs).mean() - critic(real_imgs).mean() + gp
        c_opt.zero_grad(); c_loss.backward(); c_opt.step()
    # Train generator once
    z = torch.randn(real_imgs.size(0), z_dim, 1, 1)
    g_loss = -critic(G(z)).mean()
    g_opt.zero_grad(); g_loss.backward(); g_opt.step()
    return g_loss.item(), c_loss.item()`},
  { type:'tip', body:`In WGAN-GP, use RMSprop (not Adam) for the critic — as specified in the original WGAN paper. Adam's momentum can interact badly with the critic's weight constraints. For WGAN-GP, Adam with lr=1e-4 and betas=(0, 0.9) works well. Also: remove BatchNorm from the critic (use LayerNorm or InstanceNorm instead) as BatchNorm breaks the Lipschitz constraint.` }
]};

L['genai-w3-l5'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>GAN Failure Modes & Remedies</h2><p>GAN training is a two-player game seeking a Nash equilibrium — but in practice, gradient descent dynamics don't guarantee convergence to it. Understanding the failure modes lets you diagnose and fix them quickly.</p>` },
  { type:'text', body:`<h3>Mode Collapse</h3><p>The generator learns to produce only a small subset of the possible outputs — all generated images look similar, ignoring large parts of the data distribution. Example: a GAN trained on MNIST generates only "1"s and "7"s because those are the easiest to fool D with. Diagnosis: loss curves look healthy but generated samples are repetitive.</p><p><strong>Remedies:</strong></p><ul><li><strong>Minibatch discrimination:</strong> D receives statistics about the full batch (how similar the current sample is to other samples in the batch). Makes it harder to collapse — D detects low diversity.</li><li><strong>WGAN-GP:</strong> Principled loss that reduces mode collapse by design.</li><li><strong>Mode seeking regularisation:</strong> Penalise G for producing similar outputs for different z inputs.</li></ul>` },
  { type:'text', body:`<h3>Training Instability — Oscillation & Divergence</h3><p>GAN losses oscillate or diverge without converging. G and D losses cycle without decreasing. Diagnosis: loss curves that spike repeatedly or show no improvement after many epochs.</p><p><strong>Remedies:</strong></p><ul><li><strong>Gradient clipping:</strong> Limit the magnitude of gradients to prevent explosive updates</li><li><strong>Lower learning rate for D:</strong> A too-powerful D gives G no gradient to learn from</li><li><strong>Spectral normalisation:</strong> Constrain weight matrices so the critic's Lipschitz constant is bounded — smooths the training landscape (used in SN-GAN)</li><li><strong>Two-timescale update rule (TTUR):</strong> Different learning rates for G and D (e.g., 4e-4 for D, 1e-4 for G)</li></ul>` },
  { type:'text', body:`<h3>Training Checklist</h3><ul><li>Monitor D(real) and D(fake) separately — not just combined loss</li><li>Save generated samples every N steps to visually track progress</li><li>Use FID computed on a held-out set every 5 epochs as the ground-truth quality metric</li><li>If D(fake) → 0 and D(real) → 1: discriminator winning, lower D learning rate</li><li>If D(real) ≈ D(fake) ≈ 0.5 from step 1: discriminator underfit, increase capacity or LR</li></ul>` },
  { type:'exercise', title:`Train a DCGAN on MNIST`, body:`<p>Implement and train a DCGAN on the MNIST dataset for 50 epochs. At the end of training:</p><ol><li>Generate a 4×4 grid of random samples and display them</li><li>Calculate the FID score on 10,000 generated vs 10,000 real images</li><li>Plot the generator and discriminator loss curves over training</li><li>Identify whether you see any mode collapse (hint: do you see all 10 digits represented?)</li></ol>`, hint:`Use the DCGAN architecture from Lesson 3. Normalise MNIST images to [-1, 1] (Tanh output range). If FID > 30 after 50 epochs, check: Are you using the non-saturating generator loss? Is the discriminator BatchNorm disabled on the first layer? Is the learning rate 2e-4 with Adam betas=(0.5, 0.999)?`, solution:`# Key training points:
# 1. Normalise: transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,),(0.5,))])
# 2. Architecture: Use 1-channel (grayscale) version of DCGAN
# 3. Non-saturating G loss: -log(D(G(z))) → criterion(D(G(z)), real_labels)
# 4. Expected FID: ~15-25 after 50 epochs on MNIST with correct architecture
# 5. To detect mode collapse: generate 1000 images, classify with pretrained MNIST classifier
#    — all 10 classes should appear with roughly equal frequency` }
]};

L['genai-w3-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 3 Quiz</h2><p>Test your understanding of GAN architecture, training dynamics, and failure modes.</p>` }
]};

/* ── MODULE 4: Advanced GANs & Conditional Generation ── */

L['genai-w4-l1'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Conditional GAN (cGAN) — Class-Conditioned Synthesis</h2><p>Standard GANs generate random samples from the learned distribution. Conditional GANs (cGANs) allow you to specify <em>what</em> to generate by conditioning both G and D on additional information — class labels, text, or any other conditioning signal.</p>` },
  { type:'text', body:`<h3>cGAN Architecture</h3><p>The conditioning signal y (e.g., a class label) is fed to both the generator and discriminator:</p><ul><li><strong>Generator:</strong> G(z, y) — concatenate z and the label embedding, then generate</li><li><strong>Discriminator:</strong> D(x, y) — the discriminator must judge whether x is a realistic sample <em>for class y</em>, not just realistic in general</li></ul><p>This is crucial: a discriminator that ignores y would accept any realistic image regardless of class, failing to punish the generator for generating the wrong class.</p>` },
  { type:'code', lang:'python', src:`class ConditionalGenerator(nn.Module):
    def __init__(self, z_dim=100, n_classes=10, embed_dim=50, img_size=28):
        super().__init__()
        self.label_embed = nn.Embedding(n_classes, embed_dim)
        self.net = nn.Sequential(
            nn.Linear(z_dim + embed_dim, 256), nn.LeakyReLU(0.2),
            nn.Linear(256, 512),               nn.LeakyReLU(0.2),
            nn.Linear(512, img_size*img_size), nn.Tanh()
        )
    def forward(self, z, labels):
        label_emb = self.label_embed(labels)
        x = torch.cat([z, label_emb], dim=1)
        return self.net(x).view(-1, 1, 28, 28)

class ConditionalDiscriminator(nn.Module):
    def __init__(self, n_classes=10, embed_dim=50, img_size=28):
        super().__init__()
        self.label_embed = nn.Embedding(n_classes, embed_dim)
        self.net = nn.Sequential(
            nn.Linear(img_size*img_size + embed_dim, 512), nn.LeakyReLU(0.2),
            nn.Linear(512, 256), nn.LeakyReLU(0.2),
            nn.Linear(256, 1),   nn.Sigmoid()
        )
    def forward(self, x, labels):
        label_emb = self.label_embed(labels)
        x_flat = x.view(x.size(0), -1)
        return self.net(torch.cat([x_flat, label_emb], dim=1))

# Generate a specific digit at inference
cG = ConditionalGenerator()
z = torch.randn(10, 100)
labels = torch.arange(10)        # generate one of each digit
generated = cG(z, labels)        # → 10 images, one per class
print(generated.shape)           # (10, 1, 28, 28)`},
  { type:'text', body:`<h3>Projection Discriminator</h3><p>A more principled conditioning approach: instead of concatenating the label embedding to the discriminator input, project the label embedding and take a dot product with the discriminator's feature vector. This has a better probabilistic motivation and produces higher quality conditioned images in practice (used in BigGAN).</p>` },
  { type:'tip', body:`cGANs trained on ImageNet (1000 classes, 128×128) — BigGAN — achieved FID ~7.4 in 2018, better than the best unconditional GANs of the time. Class conditioning provides a strong structural signal that helps the generator avoid mode collapse.` }
]};

L['genai-w4-l2'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Pix2Pix — Image-to-Image Translation</h2><p>Pix2Pix (Isola et al. 2017) generalises cGAN to image-to-image translation: given a paired dataset of {input image, target image} pairs, learn a mapping from one image domain to another. The conditioning signal is now the full input image, not a class label.</p>` },
  { type:'text', body:`<h3>Applications</h3><ul><li>Semantic map → photo-realistic image (aerial maps → satellite photos)</li><li>Sketch → coloured rendering</li><li>Daytime photo → nighttime photo</li><li>Black-and-white → colourised</li><li>Edges → realistic product photo</li></ul>` },
  { type:'text', body:`<h3>Architecture</h3><p><strong>Generator:</strong> U-Net with skip connections — encoder compresses input to bottleneck, decoder generates output. Skip connections pass spatial structure from encoder to decoder, preserving fine details. Critical for tasks like sketch-to-image where fine lines must be preserved.<br><br><strong>Discriminator:</strong> PatchGAN — instead of classifying the full image as real/fake, classify overlapping N×N patches. This focuses the discriminator on local texture quality rather than global structure, and can be applied to images of any size. Typical patch size: 70×70.</p>` },
  { type:'code', lang:'python', src:`import torch.nn as nn

class UNetBlock(nn.Module):
    """Basic U-Net encoder/decoder block with optional skip connection."""
    def __init__(self, in_ch, out_ch, down=True, use_bn=True, dropout=False):
        super().__init__()
        layers = [nn.Conv2d(in_ch,out_ch,4,2,1,bias=False) if down
                  else nn.ConvTranspose2d(in_ch,out_ch,4,2,1,bias=False)]
        if use_bn: layers.append(nn.BatchNorm2d(out_ch))
        layers.append(nn.LeakyReLU(0.2) if down else nn.ReLU())
        if dropout: layers.append(nn.Dropout(0.5))
        self.net = nn.Sequential(*layers)
    def forward(self, x): return self.net(x)

class PatchGANDiscriminator(nn.Module):
    """70×70 PatchGAN discriminator."""
    def __init__(self, in_channels=6):  # input+target concatenated
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(in_channels, 64, 4, 2, 1),  nn.LeakyReLU(0.2),
            nn.Conv2d(64, 128, 4, 2, 1, bias=False), nn.BatchNorm2d(128), nn.LeakyReLU(0.2),
            nn.Conv2d(128, 256, 4, 2, 1, bias=False), nn.BatchNorm2d(256), nn.LeakyReLU(0.2),
            nn.Conv2d(256, 512, 4, 1, 1, bias=False), nn.BatchNorm2d(512), nn.LeakyReLU(0.2),
            nn.Conv2d(512, 1, 4, 1, 1)              # patch-level output
        )
    def forward(self, input_img, target_img):
        x = torch.cat([input_img, target_img], dim=1)  # D sees both
        return self.net(x)`},
  { type:'text', body:`<h3>Pix2Pix Loss</h3><p>Pix2Pix combines adversarial loss with L1 reconstruction loss: <code>L = L_GAN + λ · L_L1</code> where λ=100. The L1 loss ensures the output is globally similar to the target image; the GAN loss adds local sharpness that L1 alone would blur. This combination produces results far better than either loss alone.</p>` },
  { type:'tip', body:`Pix2Pix requires <em>paired</em> training data — each input must have a corresponding ground-truth output. For many tasks, paired data is expensive or impossible to collect. CycleGAN (next lesson) solves this with <em>unpaired</em> training.` }
]};

L['genai-w4-l3'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>CycleGAN — Unpaired Domain Translation</h2><p>CycleGAN (Zhu et al. 2017) extends image-to-image translation to the unpaired setting: you have a collection of images from domain A (e.g., horses) and a separate collection from domain B (e.g., zebras), but no paired correspondences. The model must learn the translation without ever seeing horse-zebra pairs.</p>` },
  { type:'text', body:`<h3>Cycle Consistency Loss</h3><p>Without paired data, we can't measure reconstruction accuracy directly. CycleGAN uses a beautiful constraint: if you translate a horse to zebra and back to horse, you should recover the original horse. This <strong>cycle consistency</strong> loss constrains the translation to be meaningful without pairing:</p><pre><code>L_cycle = ||G_BA(G_AB(x_A)) − x_A||₁   +   ||G_AB(G_BA(x_B)) − x_B||₁</code></pre><p>The full CycleGAN loss combines two adversarial losses (one per direction) and two cycle consistency losses, with an optional identity loss to preserve colour when no translation is needed.</p>` },
  { type:'code', lang:'python', src:`# CycleGAN training step (simplified)
def cycle_gan_step(G_AB, G_BA, D_A, D_B, real_A, real_B,
                   g_opt, d_A_opt, d_B_opt, lambda_cycle=10):

    # Generate translated images
    fake_B = G_AB(real_A)        # A → B
    fake_A = G_BA(real_B)        # B → A
    rec_A  = G_BA(fake_B)        # A → B → A (cycle)
    rec_B  = G_AB(fake_A)        # B → A → B (cycle)

    # Generator losses
    g_loss_AB = criterion(D_B(fake_B), torch.ones_like(D_B(fake_B)))
    g_loss_BA = criterion(D_A(fake_A), torch.ones_like(D_A(fake_A)))
    cycle_loss = (torch.mean(torch.abs(rec_A - real_A)) +
                  torch.mean(torch.abs(rec_B - real_B)))
    g_loss = g_loss_AB + g_loss_BA + lambda_cycle * cycle_loss
    g_opt.zero_grad(); g_loss.backward(); g_opt.step()

    # Discriminator A losses
    d_A_real = criterion(D_A(real_A), torch.ones_like(D_A(real_A)))
    d_A_fake = criterion(D_A(fake_A.detach()), torch.zeros_like(D_A(fake_A)))
    d_A_loss = (d_A_real + d_A_fake) * 0.5
    d_A_opt.zero_grad(); d_A_loss.backward(); d_A_opt.step()

    # Similar for D_B...
    return g_loss.item(), cycle_loss.item()`},
  { type:'text', body:`<h3>Famous Applications</h3><ul><li><strong>Horse ↔ Zebra:</strong> The canonical demo — texture transfer preserving structure</li><li><strong>Summer ↔ Winter:</strong> Scene-level lighting and colour transformation</li><li><strong>Apple ↔ Orange:</strong> Shape-preserving style transfer</li><li><strong>Photo ↔ Monet painting:</strong> Artistic style transfer</li></ul><p>CycleGAN doesn't always work perfectly — it can fail for paired structural changes (e.g., translating a dog to a cat changes shape, not just texture). It works best for texture/style changes where the underlying structure is preserved.</p>` },
  { type:'tip', body:`CycleGAN uses a buffer of previously generated fake images (size 50) to update the discriminators, rather than always using the latest G output. This reduces model oscillation — the discriminator doesn't overfit to the very latest generator's style.` }
]};

L['genai-w4-l4'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>StyleGAN — Style-Based Generator Architecture</h2><p>StyleGAN (Karras et al. 2019, NVIDIA) represented a major advance in image quality and controllability, introducing a generator architecture based on style transfer concepts that enables unprecedented control over generated image attributes.</p>` },
  { type:'text', body:`<h3>The Style-Based Generator</h3><p>Standard GAN generators feed z directly into the network. StyleGAN introduces a separate <strong>mapping network</strong> that maps z to an intermediate latent space W: f: Z → W. The W space is designed to be more disentangled than Z. Style vectors from W are injected at each resolution level of the synthesis network via <strong>Adaptive Instance Normalisation (AdaIN)</strong>:</p><pre><code>AdaIN(x, y) = y_s · (x − μ(x))/σ(x) + y_b</code></pre><p>where y_s and y_b (scale and bias) come from learned linear projections of the W vector. This means: different levels of the network are controlled by different aspects of the W vector, naturally separating coarse structure (early layers) from fine details (later layers).</p>` },
  { type:'text', body:`<h3>Key Features</h3><ul><li><strong>Style mixing:</strong> Use w₁ for coarse layers (pose, shape) and w₂ for fine layers (colour, texture) — combine style from two images</li><li><strong>Stochastic variation:</strong> Add noise at each layer for fine-grained stochastic details (hair wisps, skin pores) without affecting overall style</li><li><strong>Progressive growing:</strong> Train at 4×4, then upsample to 8×8, 16×16… up to 1024×1024 — inherited from ProGAN</li><li><strong>Truncation trick:</strong> At inference, truncate W toward the mean W̄: w' = W̄ + ψ(w−W̄). ψ&lt;1 reduces diversity but improves average quality</li></ul>` },
  { type:'code', lang:'python', src:`# Using StyleGAN2 via the stylegan3 repository (NVIDIA)
# Alternative: HuggingFace diffusers has pre-trained models

import torch
from torchvision.utils import save_image

# Load pre-trained StyleGAN2 (faces, 256x256)
# Download from: https://catalog.ngc.nvidia.com/orgs/nvidia/teams/research/models/stylegan3
# Then use the legacy loading:

import legacy, dnnlib
network_pkl = "https://api.ngc.nvidia.com/v2/models/.../stylegan2-ffhq-256x256.pkl"
with dnnlib.util.open_url(network_pkl) as f:
    G = legacy.load_network_pkl(f)['G_ema'].cuda()

# Unconditional generation
z = torch.randn([4, G.z_dim]).cuda()
w = G.mapping(z, None, truncation_psi=0.7)  # W latent with truncation
imgs = G.synthesis(w, noise_mode='const')   # 4 × 3 × 256 × 256

# Style mixing: coarse from z1, fine from z2
z1, z2 = torch.randn([1, G.z_dim]).cuda(), torch.randn([1, G.z_dim]).cuda()
w1 = G.mapping(z1, None)
w2 = G.mapping(z2, None)
# Use w1 for layers 0-6 (coarse), w2 for 7+ (fine)
mixed_w = w1.clone()
mixed_w[:, 7:] = w2[:, 7:]
mixed_img = G.synthesis(mixed_w, noise_mode='const')`},
  { type:'tip', body:`StyleGAN3 (2021) fixed the "texture sticking" artefact in StyleGAN2 where textures appeared fixed to screen coordinates rather than object surfaces. StyleGAN3 uses alias-free operations that are equivariant to translation and rotation — textures move naturally with the generated object.` }
]};

L['genai-w4-l5'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Super-Resolution & Image Restoration GANs</h2><p>GANs produce their most practical impact not just in generation from scratch, but in image enhancement — upscaling low-resolution images to high resolution with perceptually realistic detail that simple upsampling algorithms cannot provide.</p>` },
  { type:'text', body:`<h3>SRGAN — Photo-Realistic Super-Resolution</h3><p>SRGAN (Ledig et al. 2017) was the first method to produce 4× super-resolution with perceptually convincing texture and detail. Key innovations:</p><ul><li><strong>Perceptual loss:</strong> Instead of MSE on pixel values (which causes blur), compute MSE on VGG feature maps. This encourages perceptual similarity — the upsampled image should look like the high-res version in feature space, not match pixel-by-pixel.</li><li><strong>Adversarial loss:</strong> The discriminator ensures the output looks like a natural high-resolution image, adding realistic textures.</li><li><strong>ResNet generator:</strong> Deep residual network for stable training of the upsampling network.</li></ul>` },
  { type:'code', lang:'python', src:`# Using Real-ESRGAN for 4x super-resolution (pre-trained)
# pip install realesrgan

from realesrgan import RealESRGANer
from basicsr.archs.rrdbnet_arch import RRDBNet
from PIL import Image
import numpy as np

# Load pre-trained Real-ESRGAN model
model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64,
                num_block=23, num_grow_ch=32, scale=4)
upsampler = RealESRGANer(
    scale=4,
    model_path='RealESRGAN_x4plus.pth',
    model=model,
    tile=400,          # process in tiles for large images
    tile_pad=10,
    pre_pad=0,
    half=True          # fp16 for speed
)

# Upscale an image
img = Image.open('low_res_photo.jpg').convert('RGB')
img_array = np.array(img)
output_array, _ = upsampler.enhance(img_array, outscale=4)
output_img = Image.fromarray(output_array)
output_img.save('high_res_photo.jpg')
print(f"Input: {img.size} → Output: {output_img.size}")`},
  { type:'text', body:`<h3>ESRGAN & Real-ESRGAN</h3><p><strong>ESRGAN</strong> (2018) improves SRGAN with a denser residual architecture (RRDB blocks), removes BatchNorm (which introduces artefacts in SR), and uses a relativistic discriminator that considers whether the real image looks more realistic than the fake, not just whether each is real/fake independently.<br><br><strong>Real-ESRGAN</strong> (2021) extends ESRGAN to handle real-world degradations (noise, compression artefacts, blur) rather than just clean downsampling. It uses a complex degradation pipeline during training to simulate real-world damage, making it the go-to model for practical photo enhancement.</p>` },
  { type:'text', body:`<h3>Other GAN-Based Restoration Tasks</h3><ul><li><strong>Inpainting:</strong> Fill missing regions (removed objects, damaged areas) — DeepFill, LaMa</li><li><strong>Denoising:</strong> Remove camera noise while preserving texture detail</li><li><strong>Deblurring:</strong> Restore motion blur from video frames</li><li><strong>Face restoration:</strong> GFPGAN, CodeFormer — restore old or degraded face photos using a GAN + pre-trained face prior</li></ul>` },
  { type:'tip', body:`For practical photo enhancement in 2024: use Real-ESRGAN for 4× upscaling, GFPGAN/CodeFormer for face restoration, and LaMa for object removal. All are available as pre-trained models — no training required for most use cases.` }
]};

L['genai-w4-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 4 Quiz</h2><p>Test your knowledge of conditional GANs, image translation, StyleGAN, and super-resolution.</p>` }
]};

/* ── MODULE 5: Diffusion Models ── */

L['genai-w5-l1'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>The Forward Process: Adding Noise</h2><p><strong>Diffusion models</strong> are a class of generative models inspired by non-equilibrium thermodynamics. The key insight: gradually add Gaussian noise to data until it becomes pure noise, then train a neural network to reverse this process. Remarkably simple in concept; state-of-the-art in practice.</p><p>The forward diffusion process q(x_t | x_{t-1}) is defined as a Markov chain that gradually adds small amounts of Gaussian noise over T steps (typically T = 1000). At each step t, the noised sample x_t is:</p><pre><code>x_t = √(1 − β_t) · x_{t-1} + √β_t · ε,  where ε ~ N(0, I)</code></pre><p>β_t is a small noise schedule (e.g. linear from 0.0001 to 0.02). After enough steps, x_T is approximately N(0, I) — pure Gaussian noise, regardless of what x_0 was.</p>` },
  { type:'text', body:`<h3>The Nice Reparameterisation</h3><p>A key mathematical property: you can jump directly from x_0 to any noised x_t without iterating through all t steps. Defining α_t = 1 − β_t and ᾱ_t = ∏ᵢ₌₁ᵗ αᵢ (the cumulative product):</p><pre><code>x_t = √ᾱ_t · x_0 + √(1 − ᾱ_t) · ε,  where ε ~ N(0, I)</code></pre><p>This means during training you can sample any timestep t, compute x_t directly, and train the model to predict ε (the noise added). No need to iterate forward — enormously efficient.</p>` },
  { type:'code', lang:'python', src:`import torch
import numpy as np

# Define the noise schedule
T = 1000
betas = torch.linspace(1e-4, 0.02, T)  # linear schedule
alphas = 1.0 - betas
alpha_bars = torch.cumprod(alphas, dim=0)  # ᾱ_t for all t

def forward_noising(x0, t, alpha_bars):
    """Jump directly to noised version at timestep t."""
    ab = alpha_bars[t].view(-1, 1, 1, 1)   # shape for broadcasting
    noise = torch.randn_like(x0)
    xt = ab.sqrt() * x0 + (1 - ab).sqrt() * noise
    return xt, noise  # return noised image and the noise added

# Example: noise a batch at random timesteps
x0 = torch.randn(4, 3, 64, 64)   # batch of 4 images
t = torch.randint(0, T, (4,))    # random timesteps
xt, noise = forward_noising(x0, t, alpha_bars)
print(f"x0 std: {x0.std():.3f}, xt std: {xt.std():.3f}")
# As t → T, xt approaches unit Gaussian noise`},
  { type:'tip', body:`There are many noise schedules beyond linear: cosine schedule (Improved DDPM, 2021) gives better sample quality by avoiding too-rapid signal destruction at the start. Newer schedules (sigmoid, sqrt) further improve performance. The schedule is a hyperparameter worth tuning.` },
  { type:'text', body:`<h3>Why This Works for Generation</h3><p>The forward process is fixed and has no learnable parameters. Its sole purpose is to define a training curriculum: at timestep t, the model sees a noised image and must predict the original clean signal. By training across all timesteps from 1 to T, the model learns to denoise at every noise level — from slight denoising (large t) to fine detail recovery (small t). Generation then just runs this denoising backwards from pure noise.</p>` }
]};

L['genai-w5-l2'] = { duration_mins: 25, sections: [
  { type:'text', body:`<h2>The Reverse Process & U-Net Architecture</h2><p>The <strong>reverse process</strong> is where learning happens. We want to learn p_θ(x_{t-1} | x_t) — given a noisy image at step t, predict the slightly less noisy image at step t-1. If we can do this accurately at every step, we can start from pure Gaussian noise x_T and iteratively denoise to get a clean sample x_0.</p><p>DDPM (Ho et al., 2020) parameterises the reverse process as a Gaussian: p_θ(x_{t-1} | x_t) = N(x_{t-1}; μ_θ(x_t, t), Σ_θ(x_t, t)). The neural network predicts the mean (and optionally variance) of this Gaussian at each step.</p>` },
  { type:'text', body:`<h3>The Training Objective</h3><p>DDPM simplifies the learning objective: instead of predicting x_{t-1} directly, the network ε_θ predicts the noise ε that was added to x_0 to produce x_t. The loss is simply:</p><pre><code>L_simple = E_{t, x_0, ε} [ ‖ε − ε_θ(x_t, t)‖² ]</code></pre><p>Sample a timestep t uniformly, noise x_0 to x_t, run the network to predict the noise, compute MSE. That's it. At inference, given x_t, we rearrange to compute x_{t-1} using the predicted noise.</p>` },
  { type:'text', body:`<h3>The U-Net Architecture</h3><p>The noise prediction network ε_θ is a <strong>time-conditioned U-Net</strong> — originally developed for biomedical image segmentation, repurposed brilliantly for diffusion. Architecture:</p><ul><li><strong>Encoder path:</strong> Downsampling blocks (ResNet + self-attention) compress the spatial resolution while building rich feature maps</li><li><strong>Bottleneck:</strong> Full self-attention at the smallest spatial resolution — global context</li><li><strong>Decoder path:</strong> Upsampling blocks with skip connections from the encoder — preserves fine-grained spatial detail</li><li><strong>Time conditioning:</strong> Timestep t is embedded (sinusoidal + MLP) and injected into every ResNet block via FiLM conditioning (scale + shift of activations)</li></ul>` },
  { type:'code', lang:'python', src:`import torch
import torch.nn as nn
import math

class SinusoidalTimeEmbedding(nn.Module):
    def __init__(self, dim):
        super().__init__()
        self.dim = dim
    def forward(self, t):
        half = self.dim // 2
        freqs = torch.exp(-math.log(10000) * torch.arange(half, device=t.device) / half)
        args = t[:, None] * freqs[None]
        return torch.cat([args.sin(), args.cos()], dim=-1)

class ResBlock(nn.Module):
    def __init__(self, ch, time_dim):
        super().__init__()
        self.conv1 = nn.Conv2d(ch, ch, 3, padding=1)
        self.conv2 = nn.Conv2d(ch, ch, 3, padding=1)
        self.time_proj = nn.Linear(time_dim, ch * 2)  # scale + shift (FiLM)
        self.norm = nn.GroupNorm(8, ch)
    def forward(self, x, t_emb):
        scale, shift = self.time_proj(t_emb).chunk(2, dim=-1)
        h = self.norm(x)
        h = h * (1 + scale[..., None, None]) + shift[..., None, None]  # FiLM
        h = torch.relu(self.conv1(h))
        return x + self.conv2(h)  # residual connection`},
  { type:'tip', body:`Attention in U-Nets is applied at resolutions 16×16, 8×8, and 4×4 — not at full resolution (too expensive). Higher-resolution U-Nets (for HD images) use flash attention or windowed attention to manage memory. The Stable Diffusion U-Net also adds cross-attention for text conditioning (CLIP embeddings).` }
]};

L['genai-w5-l3'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Score Matching & NCSN</h2><p>Parallel to DDPM, a different mathematical framework leads to the same destination: <strong>score matching</strong>. The score function is the gradient of the log-probability with respect to the data: s(x) = ∇_x log p(x). If you know the score at every point x, you can generate samples using <strong>Langevin dynamics</strong> — just follow the gradient of the log-probability with noise added.</p><p>Song & Ermon (2019) proposed <strong>Noise-Conditioned Score Networks (NCSN)</strong>: train a network s_θ(x, σ) to estimate ∇_x log p_σ(x) at multiple noise levels σ. At high noise, the score landscape is smooth (easy to learn). At low noise, it's sharp and complex. Learn it at all levels.</p>` },
  { type:'text', body:`<h3>Denoising Score Matching</h3><p>A key insight from Vincent (2011): instead of estimating the score of the clean data distribution (which requires normalisation constants), estimate the score of the noisy distribution. The denoising score matching objective becomes:</p><pre><code>L_DSM = E_{x, ε, σ} [ ‖ s_θ(x + σε, σ) + ε/σ ‖² ]</code></pre><p>This is equivalent to DDPM's noise prediction: predicting ε/σ is the same as predicting the score (scaled). Song et al. (2020) unified these frameworks under a <strong>stochastic differential equation (SDE)</strong> perspective — both DDPM and NCSN are special cases of a general continuous-time diffusion SDE.</p>` },
  { type:'code', lang:'python', src:`import torch

# Langevin dynamics sampling (after training NCSN)
def langevin_sampling(score_net, x, sigma, n_steps=100, lr=0.1):
    """
    Given a score network, sample using Langevin MCMC.
    score_net(x, sigma) → score estimate s_θ(x, σ)
    """
    for _ in range(n_steps):
        # noise level
        s = score_net(x, sigma)          # estimated score
        noise = torch.randn_like(x)
        x = x + 0.5 * lr * s + (lr**0.5) * noise  # Langevin step
    return x

# Annealed Langevin: start at high σ, gradually reduce
sigmas = torch.geomspace(1.0, 0.01, 10)  # 10 noise levels
x = torch.randn(4, 3, 64, 64)           # start from noise

for sigma in sigmas:
    x = langevin_sampling(score_net, x, sigma, n_steps=100, lr=0.01)
    # Each outer step uses the previous x as warm start for lower σ
    x = x.detach()`,out:`# Annealed Langevin dynamics generates coherent samples
# by gradually refining from coarse structure to fine detail.`},
  { type:'text', body:`<h3>Score vs Noise Prediction</h3><p>DDPM predicts ε (the noise); NCSN/Score matching predicts ∇_x log p (the score). These are related by:<br><br>ε_θ(x_t, t) ≈ −σ_t · s_θ(x_t, t)<br><br>Both parameterisations work; in practice many modern implementations switch to predicting x_0 directly (rather than ε) at some timesteps, as this can give better sample quality at low noise levels.</p>` },
  { type:'tip', body:`The SDE framework (Song et al., 2021) is the cleanest unification: the forward process is an SDE (stochastic differential equation), the reverse is also an SDE (or ODE) that can be solved with standard numerical solvers. This view makes it easy to plug in better ODE solvers (like DPM-Solver) for faster sampling.` }
]};

L['genai-w5-l4'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>DDIM & Fast Sampling</h2><p>DDPM's main weakness: sampling requires T = 1000 sequential denoising steps — each requires a neural network forward pass. At ~50ms per pass on a GPU, generating one image takes ~50 seconds. This is unusable for real applications. <strong>DDIM</strong> (Denoising Diffusion Implicit Models, Song et al., 2020) solves this without any retraining.</p><p>DDPM's reverse process is <em>stochastic</em> — it adds noise at each step. DDIM derives a <em>deterministic</em> reverse process that achieves the same marginals (same x_t distribution) without the noise. This enables arbitrary step skipping: instead of stepping t = 1000→999→998→…→0, skip to t = 1000→900→800→…→0 (100 steps) or fewer.</p>` },
  { type:'text', body:`<h3>The DDIM Update Rule</h3><p>Given x_t and the predicted noise ε_θ(x_t, t), DDIM computes x_{t-1} as:</p><pre><code>x_{t-1} = √ᾱ_{t-1} · ( (x_t − √(1−ᾱ_t)·ε_θ) / √ᾱ_t )  +  √(1−ᾱ_{t-1}) · ε_θ</code></pre><p>The first term is the predicted x_0 rescaled to timestep t-1; the second term "re-noises" to match the noise level at t-1. When η = 0, no stochastic noise is added and the process is fully deterministic — same initial noise gives same final image.</p>` },
  { type:'code', lang:'python', src:`import torch

@torch.no_grad()
def ddim_sample(model, shape, T=1000, steps=50, device='cuda'):
    """DDIM sampling with 'steps' denoising steps instead of T."""
    # Create a subset of timesteps (evenly spaced)
    timesteps = torch.linspace(T-1, 0, steps, dtype=torch.long, device=device)

    x = torch.randn(*shape, device=device)  # start from noise

    for i in range(len(timesteps)-1):
        t     = timesteps[i]
        t_prev = timesteps[i+1]

        t_batch = t.expand(shape[0])
        eps = model(x, t_batch)  # predict noise

        ab_t     = alpha_bars[t]
        ab_prev  = alpha_bars[t_prev]

        # Predict x0 from xt and eps
        x0_pred = (x - (1-ab_t).sqrt() * eps) / ab_t.sqrt()
        x0_pred = x0_pred.clamp(-1, 1)  # clip predicted x0

        # DDIM step: re-noise to t_prev level
        x = ab_prev.sqrt() * x0_pred + (1-ab_prev).sqrt() * eps

    return x  # final sample`,out:`# With steps=50 instead of T=1000: 20× speedup, minimal quality loss
# With steps=20: still very good quality for most use cases`},
  { type:'text', body:`<h3>Later Improvements</h3><p>DDIM sparked a line of faster samplers: <strong>DPM-Solver</strong> uses high-order ODE solvers (converges faster), <strong>DPM-Solver++</strong> further improves by solving in x-prediction space. <strong>PNDM</strong> uses pseudo-numerical methods from traditional ODE literature. All achieve high-quality samples in 10–25 steps compared to DDPM's 1000 — a 40–100× speedup without model changes.</p>` }
]};

L['genai-w5-l5'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Classifier-Free Guidance</h2><p>Unconditional diffusion models generate diverse samples — but for applications you want <em>conditional</em> generation: "generate a photo of a cat" or "generate an image matching this style." <strong>Classifier guidance</strong> (Dhariwal & Nichol, 2021) showed you could steer generation using the gradient of a classifier's output — but it requires training a separate noise-robust classifier. <strong>Classifier-free guidance (CFG)</strong> (Ho & Salimans, 2022) achieves the same without any classifier.</p>` },
  { type:'text', body:`<h3>How CFG Works</h3><p>Train a single conditional model ε_θ(x_t, t, c) that accepts a condition c (e.g. a text embedding). During training, randomly drop the condition (replace c with a null token ∅) ~10–20% of the time — this teaches the model to handle both conditioned and unconditioned generation.</p><p>At inference, run the model twice per step: once with the condition, once without. Interpolate the predicted noises:</p><pre><code>ε̃ = ε_θ(x_t, t, ∅) + γ · (ε_θ(x_t, t, c) − ε_θ(x_t, t, ∅))</code></pre><p>γ is the <strong>guidance scale</strong> (typically 7–15 for text-to-image). γ = 1 gives conditional generation. γ > 1 amplifies the conditioning signal — pushing generated images toward more "classically" conditioned outputs, trading diversity for prompt fidelity.</p>` },
  { type:'code', lang:'python', src:`@torch.no_grad()
def cfg_ddim_sample(model, shape, text_emb, guidance_scale=7.5, steps=50, device='cuda'):
    """Classifier-free guided sampling."""
    null_emb = torch.zeros_like(text_emb)  # null (unconditional) token

    # Stack conditional and unconditional — run model once with doubled batch
    emb_combined = torch.cat([null_emb, text_emb], dim=0)  # [2B, emb_dim]

    timesteps = torch.linspace(T-1, 0, steps, dtype=torch.long, device=device)
    x = torch.randn(*shape, device=device)

    for i in range(len(timesteps)-1):
        t = timesteps[i].expand(shape[0])
        x_doubled = x.repeat(2, 1, 1, 1)  # duplicate for cfg
        t_doubled = t.repeat(2)

        eps_both = model(x_doubled, t_doubled, emb_combined)
        eps_uncond, eps_cond = eps_both.chunk(2, dim=0)

        # Apply CFG: amplify conditional signal
        eps_guided = eps_uncond + guidance_scale * (eps_cond - eps_uncond)

        # DDIM step with guided noise prediction
        ab_t    = alpha_bars[timesteps[i]]
        ab_prev = alpha_bars[timesteps[i+1]]
        x0_pred = (x - (1-ab_t).sqrt() * eps_guided) / ab_t.sqrt()
        x = ab_prev.sqrt() * x0_pred + (1-ab_prev).sqrt() * eps_guided

    return x`,out:`# guidance_scale=1.0  → plain conditional generation (diverse)
# guidance_scale=7.5  → strong prompt adherence (typical for SD)
# guidance_scale=15+  → over-saturated, unnatural — often too much`},
  { type:'tip', body:`CFG is why Stable Diffusion has a "CFG scale" slider. Higher values = more literal prompt interpretation but more saturated/unnatural images. Most users find 6–9 optimal for photorealism; anime/illustration styles often use 5–7. Values above 12 cause artefacts (oversaturation, unnatural lighting).` },
  { type:'exercise', title:'Implement a Minimal DDPM Training Loop', body:`Write a training loop for a small DDPM on a toy dataset (e.g. MNIST or a 2D Gaussian mixture). The loop should: (1) sample a random timestep t for each example, (2) compute x_t using the closed-form formula, (3) predict the noise with a simple MLP, (4) compute MSE loss and update. Train for 100 iterations and verify the loss decreases.`, hint:`Use T=100 steps and a simple 3-layer MLP for fast iteration. The time embedding can just be a learned lookup table (nn.Embedding(T, 64)) for a toy model.`, solution:`import torch, torch.nn as nn

T=100; betas=torch.linspace(1e-4,0.02,T); alphas=1-betas; abars=torch.cumprod(alphas,0)
class ToyDDPM(nn.Module):
    def __init__(self): super().__init__(); self.te=nn.Embedding(T,64); self.net=nn.Sequential(nn.Linear(2+64,128),nn.ReLU(),nn.Linear(128,2))
    def forward(self,x,t): return self.net(torch.cat([x,self.te(t)],dim=-1))

model=ToyDDPM(); opt=torch.optim.Adam(model.parameters(),lr=1e-3)
for step in range(200):
    x0=torch.randn(256,2)  # toy 2D data
    t=torch.randint(0,T,(256,))
    ab=abars[t].unsqueeze(1); noise=torch.randn_like(x0)
    xt=ab.sqrt()*x0+(1-ab).sqrt()*noise
    pred=model(xt,t); loss=((pred-noise)**2).mean()
    opt.zero_grad(); loss.backward(); opt.step()
    if step%50==0: print(f"Step {step}: loss={loss.item():.4f}")` }
]};

L['genai-w5-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 5 Quiz</h2><p>Test your knowledge of diffusion models, score matching, and fast sampling techniques.</p>` }
]};

/* ── MODULE 6: Stable Diffusion & ControlNet ── */

L['genai-w6-l1'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Latent Diffusion Models</h2><p>Standard pixel-space diffusion models (DDPM, NCSN) operate directly on raw images — an 512×512 image is a 786,432-dimensional vector. Running 1000 denoising steps in this space is enormously expensive. <strong>Latent Diffusion Models (LDM)</strong> (Rombach et al., 2022) solve this by running the diffusion process in a compressed <em>latent space</em> instead of pixel space.</p><p>The key insight: most of the information in an image can be compressed into a much smaller latent code without losing perceptual quality. An 8× spatial compression (factor 8 in each dimension) reduces a 512×512 image to a 64×64 latent — a 64× reduction in the number of elements. Diffusion in this compressed space is 64× cheaper without significant quality loss.</p>` },
  { type:'text', body:`<h3>The Two-Stage Architecture</h3><p><strong>Stage 1 — Autoencoder pre-training:</strong> Train a VQ-GAN or KL-regularised autoencoder (E, D) to encode images into compact latent codes: z = E(x), x̂ = D(z). Train this separately until reconstruction quality is high. Then freeze it.<br><br><strong>Stage 2 — Diffusion in latent space:</strong> Run standard DDPM/DDIM on z (the latent codes), not on x (pixels). The denoising U-Net operates entirely in the z space. At inference, denoise z_T → z_0, then decode: x = D(z_0).</p>` },
  { type:'code', lang:'python', src:`# Latent Diffusion workflow
import torch

# Stage 1: Encode image to latent space
def encode(encoder, image):
    with torch.no_grad():
        latent = encoder(image)       # [B, 4, 64, 64] for SD 1.5
        latent = latent * 0.18215     # SD's learned scale factor
    return latent

def decode(decoder, latent):
    with torch.no_grad():
        latent = latent / 0.18215     # undo scale factor
        image = decoder(latent)       # [B, 3, 512, 512]
    return image

# Stage 2: Diffuse/denoise in latent space only
# The U-Net never sees raw pixels — only 4×64×64 latent codes
# Inference:
noise = torch.randn(1, 4, 64, 64)           # start from latent noise
latent_denoised = ddim_sample(unet, noise)   # ~50 steps in latent space
image = decode(vae_decoder, latent_denoised) # decode to pixels once`,out:`# Compared to pixel-space diffusion on 512×512:
# Memory: ~8× less (64×64 vs 512×512 feature maps in U-Net)
# Speed: ~50× faster (smaller U-Net + no high-res operations)`},
  { type:'text', body:`<h3>Why KL or VQ Regularisation?</h3><p>A plain autoencoder might learn arbitrarily scaled, discontinuous latent spaces — diffusion would struggle. Two approaches fix this:</p><ul><li><strong>KL regularisation:</strong> Add a small KL penalty to push the latent distribution toward N(0, I). SD 1.x uses this ("KL-VAE"). The latent space is continuous and roughly unit-Gaussian — diffusion's native noise.</li><li><strong>VQ (vector quantisation):</strong> Quantise latents to a discrete codebook — forces a clean, bounded representation. Better for highly structured domains but less flexible for conditioning.</li></ul>` },
  { type:'tip', body:`Stable Diffusion 1.x uses a KL-VAE with 4 latent channels (vs 3 for images) — the extra channel captures structural/depth information. SDXL uses a fine-tuned version with the same architecture. The VAE is kept frozen during diffusion training; only the U-Net and text encoder are trained.` }
]};

L['genai-w6-l2'] = { duration_mins: 25, sections: [
  { type:'text', body:`<h2>Stable Diffusion Architecture</h2><p>Stable Diffusion (SD) is an LDM trained at scale on LAION-5B (5 billion image-text pairs). Three neural networks work together to enable text-to-image generation.</p><h3>Component 1: VAE (Variational Autoencoder)</h3><p>Encoder maps 512×512×3 images to 64×64×4 latents. Decoder maps back. The VAE is pre-trained on images and frozen during the main diffusion training. Inference: only the decoder runs (we only need to go latent → pixel at the end).</p>` },
  { type:'text', body:`<h3>Component 2: CLIP Text Encoder</h3><p>OpenAI's CLIP model encodes the text prompt into a sequence of 77 token embeddings (each 768-dimensional for SD 1.x, 1024 for SD 2.x). These embeddings capture the semantic meaning of the prompt. The text encoder is also frozen during diffusion training — only the U-Net learns to attend to its outputs.</p><h3>Component 3: The Diffusion U-Net</h3><p>The only part that is actually trained for the text-to-image task. Accepts: (1) noisy latent x_t, (2) timestep t, (3) CLIP text embeddings. Outputs: predicted noise ε. Architecture additions vs standard U-Net:</p><ul><li><strong>Cross-attention layers:</strong> In every transformer block in the U-Net, spatial features attend to CLIP text tokens. This is how the prompt steers generation — the visual features literally attend to the words.</li><li><strong>Spatial transformers:</strong> Each resolution level has residual blocks interleaved with spatial transformer blocks (self-attention + cross-attention + FFN).</li></ul>` },
  { type:'code', lang:'python', src:`# Simplified cross-attention for text conditioning in U-Net
import torch.nn as nn
import torch

class CrossAttention(nn.Module):
    """Spatial features attend to text token embeddings."""
    def __init__(self, spatial_dim, text_dim, heads=8):
        super().__init__()
        self.heads = heads
        self.q = nn.Linear(spatial_dim, spatial_dim, bias=False)
        self.k = nn.Linear(text_dim, spatial_dim, bias=False)
        self.v = nn.Linear(text_dim, spatial_dim, bias=False)
        self.out = nn.Linear(spatial_dim, spatial_dim)

    def forward(self, x, context):
        # x: [B, HW, spatial_dim] — flattened spatial features
        # context: [B, 77, text_dim] — CLIP token embeddings
        B, N, C = x.shape
        H = self.heads; D = C // H

        Q = self.q(x).reshape(B, N, H, D).transpose(1,2)      # image queries
        K = self.k(context).reshape(B,77,H,D).transpose(1,2)  # text keys
        V = self.v(context).reshape(B,77,H,D).transpose(1,2)  # text values

        attn = (Q @ K.transpose(-2,-1)) / D**0.5  # [B,H,N,77]
        attn = attn.softmax(-1)
        out = (attn @ V).transpose(1,2).reshape(B,N,C)
        return self.out(out)
# Each spatial patch attends to all 77 text tokens — learns which words
# are relevant for which spatial region (e.g. "red" → objects in red areas).`},
  { type:'text', body:`<h3>Full Inference Pipeline</h3><pre><code>1. Encode prompt → CLIP text embeddings (77 × 768)
2. Optionally encode negative prompt for CFG
3. Sample noise: z_T ~ N(0,I) in 64×64×4 latent space
4. Loop 50 DDIM steps:
   a. Predict ε_uncond = U-Net(z_t, t, null_emb)
   b. Predict ε_cond   = U-Net(z_t, t, text_emb)
   c. ε_guided = ε_uncond + 7.5 * (ε_cond − ε_uncond)  [CFG]
   d. DDIM step → z_{t-1}
5. VAE decode: z_0 → 512×512×3 image</code></pre>` },
  { type:'tip', body:`SDXL (Stable Diffusion XL) adds a second text encoder (OpenCLIP ViT-G), trains at native 1024×1024, uses a refiner model for the last 200 denoising steps, and doubles the U-Net depth. SD 3.x replaces the U-Net with a Diffusion Transformer (DiT) and uses three separate text encoders (CLIP-L, CLIP-G, T5-XXL).` }
]};

L['genai-w6-l3'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>DreamBooth Fine-Tuning</h2><p>Stable Diffusion is trained on billions of images — it knows what "a dog" looks like in general. But what if you want to generate <em>your specific dog</em> (Fluffy, a golden retriever) in new scenes? <strong>DreamBooth</strong> (Ruiz et al., 2022) fine-tunes the entire diffusion model on just 3–30 photos of a specific subject, binding it to a special token like [V].</p><p>After training: "a [V] dog in Paris" generates Fluffy in front of the Eiffel Tower. The subject identity is preserved; the scene is generated.</p>` },
  { type:'text', body:`<h3>The Training Setup</h3><p>Fine-tune the full U-Net (and optionally the text encoder) on: (1) subject images paired with the prompt "a [V] dog", and (2) a small set of regularisation images ("a dog") to prevent catastrophic forgetting of what generic dogs look like. The special token [V] is initialised to a rare token unlikely to be in the training data.</p><p><strong>Prior preservation loss:</strong> Half the training batch uses real generated samples of the class ("a dog") with normal captions. This prevents the model from forgetting its original priors while it learns the specific subject.</p>` },
  { type:'code', lang:'python', src:`# DreamBooth training loop (simplified)
from torch.utils.data import DataLoader

# Subject images: ~10 photos of your subject
subject_dataset = SubjectDataset(images=my_dog_photos, prompt="a [V] dog")

# Regularisation images: generated by the frozen model
reg_dataset = RegDataset(generated_images=gen_images, prompt="a dog")

optimizer = torch.optim.AdamW(unet.parameters(), lr=1e-6)

for batch_sub, batch_reg in zip(subject_loader, reg_loader):
    # Subject loss: learn specific appearance
    xt_sub, noise_sub, t_sub, text_emb_sub = batch_sub
    pred_sub = unet(xt_sub, t_sub, text_emb_sub)
    loss_sub = F.mse_loss(pred_sub, noise_sub)

    # Prior preservation loss: don't forget generic class
    xt_reg, noise_reg, t_reg, text_emb_reg = batch_reg
    pred_reg = unet(xt_reg, t_reg, text_emb_reg)
    loss_reg = F.mse_loss(pred_reg, noise_reg)

    loss = loss_sub + 1.0 * loss_reg  # prior weight = 1.0
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()`,out:`# Training: ~800–1000 steps, ~15 min on A100 for 20 images
# Output: fine-tuned UNet weights (~3.4 GB for SD 1.5)
# Usage: load fine-tuned weights, prompt with "a [V] dog at the beach"`},
  { type:'text', body:`<h3>DreamBooth Limitations</h3><ul><li><strong>Full model fine-tune:</strong> One DreamBooth model per subject — can't easily combine two subjects or share models</li><li><strong>Identity drift:</strong> Without careful regularisation, the model forgets how to generate other subjects of the same class</li><li><strong>Compute:</strong> Fine-tuning 3.4B parameters takes hours/minutes per subject even with modern GPUs</li></ul><p>These limitations motivated LoRA (smaller adapters) and Textual Inversion (only learn the token embedding). Modern workflows often use LoRA instead of full DreamBooth.</p>` },
  { type:'tip', body:`For portrait photography: use DreamBooth with 10–15 close-up face photos, diverse lighting. Enable face restoration (GFPGAN) post-processing. Use "a [V] person" not "a [V] [firstname]" — the model doesn't know your name. Avoid blur, occlusions, or accessories that change across shots.` }
]};

L['genai-w6-l4'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>LoRA for Image Style Adaptation</h2><p><strong>LoRA</strong> (Low-Rank Adaptation) was introduced for LLMs (Hu et al., 2021) and rapidly adopted for diffusion models. Instead of fine-tuning all 3.4B parameters (DreamBooth), LoRA adds tiny trainable rank-decomposition matrices to the existing weight matrices and trains only these — typically 0.1–1% of the original parameters.</p><p>For a weight matrix W ∈ ℝ^{m×n}, LoRA adds: W + ΔW = W + A·B, where A ∈ ℝ^{m×r} and B ∈ ℝ^{r×n} with rank r ≪ min(m,n). Only A and B are trained. Typical r = 4, 8, 16, or 32.</p>` },
  { type:'code', lang:'python', src:`import torch
import torch.nn as nn

class LoRALinear(nn.Module):
    """Drop-in replacement for nn.Linear with LoRA adaptation."""
    def __init__(self, linear: nn.Linear, rank: int = 8, alpha: float = 16.0):
        super().__init__()
        self.linear = linear        # frozen original weights
        self.rank = rank
        self.scale = alpha / rank   # scaling factor (alpha/r)

        in_f, out_f = linear.in_features, linear.out_features
        self.lora_A = nn.Linear(in_f, rank, bias=False)
        self.lora_B = nn.Linear(rank, out_f, bias=False)

        # Initialise: A random, B zero → ΔW = 0 at start
        nn.init.kaiming_uniform_(self.lora_A.weight)
        nn.init.zeros_(self.lora_B.weight)

        linear.weight.requires_grad_(False)  # freeze original

    def forward(self, x):
        return self.linear(x) + self.scale * self.lora_B(self.lora_A(x))

# Apply LoRA to all attention projection layers in the U-Net
def add_lora(unet, rank=8):
    for name, module in unet.named_modules():
        if isinstance(module, nn.Linear) and 'attn' in name:
            parent = get_parent(unet, name)
            attr = name.split('.')[-1]
            setattr(parent, attr, LoRALinear(module, rank=rank))
    # Only LoRA params are trainable: ~2–5M params vs 860M in full U-Net`,out:`# File size: SD LoRA ~8–50 MB vs full model 3.4 GB
# Training time: 30 min vs 2+ hours for DreamBooth
# Composability: stack multiple LoRAs with different weights`},
  { type:'text', body:`<h3>LoRA Composability</h3><p>One killer feature: multiple LoRAs can be merged at inference time with user-defined weights. A character LoRA + style LoRA + lighting LoRA can be combined:</p><pre><code>W_final = W_base + α₁·A₁B₁ + α₂·A₂B₂ + α₃·A₃B₃</code></pre><p>This enables creative combinations unavailable in any single fine-tuned model. The thriving <a href="#">CivitAI</a> community hosts thousands of LoRAs for SD — styles, characters, concepts — all composable with each other.</p>` },
  { type:'tip', body:`For training LoRAs: use kohya-ss (GUI + script) or Diffusers' LoRA training script. Key hyperparameters: rank (r=8 typical for styles, r=16–32 for complex subjects), alpha (usually = rank), learning rate (1e-4 for U-Net LoRA), and training steps (1000–3000 for a style, 500–1500 for a character).` }
]};

L['genai-w6-l5'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>ControlNet</h2><p>Text prompts alone are imprecise control signals. You might write "a person standing with arms raised" but can't guarantee the exact pose. <strong>ControlNet</strong> (Zhang et al., 2023) adds spatial conditioning to Stable Diffusion: instead of (or in addition to) text, you provide an image condition — a pose skeleton, depth map, edge map, segmentation mask, or line drawing — and the model generates an image that respects this spatial structure while following the text prompt.</p>` },
  { type:'text', body:`<h3>Architecture</h3><p>ControlNet works by cloning the encoder half of the SD U-Net and adding it as a trainable side network, connected to the original frozen decoder via "zero convolution" layers (1×1 convolutions initialised to zero). The encoder processes the condition image; its activations are added to the corresponding decoder layers in the frozen U-Net.</p><p>Zero initialisation is critical: at the start of training, ControlNet adds exactly zero to the frozen U-Net — the model begins from the pre-trained distribution. As training progresses, the zero convolution weights grow to inject increasingly meaningful conditioning signal.</p>` },
  { type:'code', lang:'python', src:`# Using ControlNet with diffusers
from diffusers import ControlNetModel, StableDiffusionControlNetPipeline
from diffusers.utils import load_image
from PIL import Image
import numpy as np
import cv2

# Load a ControlNet for pose estimation
controlnet = ControlNetModel.from_pretrained(
    "lllyasviel/sd-controlnet-openpose",
    torch_dtype=torch.float16
)
pipe = StableDiffusionControlNetPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    controlnet=controlnet,
    torch_dtype=torch.float16
).to("cuda")

# Extract pose from a reference image
reference_image = load_image("person_photo.jpg")
# (In practice use DWPose or OpenPose to extract skeleton)
pose_image = extract_openpose(reference_image)  # returns skeleton image

# Generate with pose control
result = pipe(
    prompt="a ballet dancer in a red dress, studio lighting, 4k",
    negative_prompt="blurry, low quality, deformed",
    image=pose_image,          # the pose skeleton
    num_inference_steps=30,
    guidance_scale=7.5,
    controlnet_conditioning_scale=1.0  # how strongly to follow the pose
).images[0]`,out:`# Result: image matching the extracted pose from the reference photo
# but with the appearance described in the text prompt.`},
  { type:'text', body:`<h3>ControlNet Variants</h3><p>Multiple ControlNet models exist for different condition types, all trained on the same SD backbone:</p><ul><li><strong>Canny edges:</strong> Follow the edges of a sketch or line drawing</li><li><strong>Depth map:</strong> Respect 3D spatial structure (from MiDaS depth estimation)</li><li><strong>OpenPose / DWPose:</strong> Control human body pose precisely</li><li><strong>Segmentation mask:</strong> Control which objects appear where (ADE20K classes)</li><li><strong>Scribble:</strong> Loose hand-drawn control — fills in detail from rough strokes</li><li><strong>Normal map:</strong> Control surface normals for architectural/product imagery</li></ul><p>Multiple ControlNets can be stacked simultaneously (e.g. pose + depth + canny) with individual conditioning weights.</p>` },
  { type:'tip', body:`ControlNet v1.1 is the most widely deployed. For SDXL, T2I-Adapter is an alternative that's smaller and composable. In practice: use ControlNet for precise spatial layout (architecture, product photography, consistent character poses); use LoRA for style adaptation; combine both for full creative control.` }
]};

L['genai-w6-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 6 Quiz</h2><p>Test your understanding of latent diffusion models, Stable Diffusion architecture, DreamBooth, LoRA, and ControlNet.</p>` }
]};

/* ── MODULE 7: Multimodal AI & Audio Generation ── */

L['genai-w7-l1'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Text-to-Image APIs: DALL-E 3, SDXL & Stability AI</h2><p>State-of-the-art text-to-image generation is accessible through several production APIs — no GPU required. Understanding their differences helps you choose the right tool for your application.</p><h3>DALL-E 3 (OpenAI)</h3><p>DALL-E 3 was the first major model to dramatically improve prompt adherence by rewriting user prompts with a caption model before feeding to the diffusion model. Key characteristics: excellent text rendering in images, strong prompt following, photorealistic and artistic styles, built-in content filtering. Available via OpenAI API and ChatGPT.</p>` },
  { type:'code', lang:'python', src:`from openai import OpenAI
from pathlib import Path
import base64, requests

client = OpenAI()  # uses OPENAI_API_KEY env var

# Text-to-image with DALL-E 3
response = client.images.generate(
    model="dall-e-3",
    prompt="A photorealistic image of a red panda coding on a laptop in a cosy library, warm lighting",
    size="1024x1024",        # 1024×1024, 1024×1792, or 1792×1024
    quality="hd",            # "standard" or "hd" (more detail, 2× cost)
    n=1,                     # DALL-E 3 only supports n=1
    response_format="url"    # or "b64_json"
)
image_url = response.data[0].url
print(f"Generated: {image_url}")
print(f"Revised prompt: {response.data[0].revised_prompt}")

# Download and save
img_data = requests.get(image_url).content
Path("output.png").write_bytes(img_data)`,out:`# Generated: https://oaidalleapiprodscus.blob.core.windows.net/...
# Revised prompt: "A photorealistic high-resolution photograph of a red
# panda sitting at a wooden desk in a cosy library with bookshelves..."
# DALL-E 3 rewrites your prompt to improve generation quality`},
  { type:'text', body:`<h3>Stability AI (SDXL / SD3)</h3><p>Stability AI offers the Stable Diffusion model family via their Stability AI Platform API. Advantages: more artistic styles, higher community ecosystem (thousands of LoRAs/ControlNets), lower cost per generation, can fine-tune. SD3 Medium (2024) introduced a Diffusion Transformer architecture and three text encoders for significantly improved text rendering.</p>` },
  { type:'code', lang:'python', src:`import anthropic, base64, httpx
from pathlib import Path

# Stability AI API for image generation
import stability_sdk
from stability_sdk import client as stability_client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation

stability_api = stability_client.StabilityInference(
    key="your-api-key",
    engine="stable-diffusion-xl-1024-v1-0"
)

answers = stability_api.generate(
    prompt="A data scientist presenting to executives, modern boardroom, professional photography",
    seed=42,
    steps=50,
    cfg_scale=7.5,
    width=1024, height=1024,
    samples=1
)
for resp in answers:
    for artifact in resp.artifacts:
        if artifact.finish_reason == generation.FILTER:
            print("Content filtered")
        elif artifact.type == generation.ARTIFACT_IMAGE:
            Path("sdxl_output.png").write_bytes(artifact.binary)
            print("Saved sdxl_output.png")`},
  { type:'tip', body:`For production apps: DALL-E 3 for highest quality + reliability + simplest API; Stability AI for cost efficiency at scale (10× cheaper) + style diversity; Replicate for open-source model access (Flux, SDXL, SD3, custom fine-tunes) with pay-per-prediction pricing.` }
]};

L['genai-w7-l2'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>ComfyUI: Node-Based Workflows</h2><p><strong>ComfyUI</strong> is an open-source, node-based interface for building Stable Diffusion pipelines without writing code. Instead of a single-page interface (like AUTOMATIC1111), you connect nodes representing model loaders, samplers, encoders, decoders, and post-processors into a visual graph — like Blender's shader editor but for image generation.</p><p>Why this matters: ComfyUI makes complex pipelines (img2img + ControlNet + LoRA + upscaling + face restoration) inspectable, shareable as JSON, and reproducible. The entire SD community now shares ComfyUI workflows as JSON files rather than scripts.</p>` },
  { type:'text', body:`<h3>Core Node Types</h3><ul><li><strong>CheckpointLoaderSimple:</strong> Loads a .safetensors model (base model)</li><li><strong>CLIPTextEncode:</strong> Encodes a text prompt using the model's text encoder</li><li><strong>KSampler:</strong> Runs the denoising loop (sampler algorithm, steps, CFG, seed)</li><li><strong>VAEDecode / VAEEncode:</strong> Convert between pixel and latent space</li><li><strong>LoraLoader:</strong> Applies a LoRA adapter with a given strength</li><li><strong>ControlNetLoader + ControlNetApply:</strong> Apply ControlNet conditioning</li><li><strong>UpscaleModelLoader + ImageUpscaleWithModel:</strong> Real-ESRGAN upscaling</li></ul>` },
  { type:'code', lang:'python', src:`# ComfyUI also has a Python API (for programmatic workflow control)
import json, urllib.request, urllib.parse

COMFYUI_URL = "http://127.0.0.1:8188"

def queue_prompt(workflow: dict) -> str:
    """Queue a workflow JSON and return the prompt_id."""
    payload = json.dumps({"prompt": workflow}).encode()
    req = urllib.request.Request(f"{COMFYUI_URL}/prompt",
                                  data=payload,
                                  headers={"Content-Type":"application/json"})
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())["prompt_id"]

# Load a saved workflow JSON
with open("my_workflow.json") as f:
    workflow = json.load(f)

# Modify specific node values programmatically
workflow["6"]["inputs"]["text"] = "a futuristic city at sunset"  # prompt node
workflow["3"]["inputs"]["seed"] = 42                               # sampler node
workflow["3"]["inputs"]["steps"] = 30

prompt_id = queue_prompt(workflow)
print(f"Queued: {prompt_id}")

# Poll for completion
import time
def wait_for_result(prompt_id):
    while True:
        with urllib.request.urlopen(f"{COMFYUI_URL}/history/{prompt_id}") as r:
            history = json.loads(r.read())
            if prompt_id in history:
                return history[prompt_id]["outputs"]
        time.sleep(1)`,out:`# ComfyUI runs as a local server; API allows headless batch generation.
# The workflow JSON captures the entire pipeline — shareable and reproducible.`},
  { type:'tip', body:`ComfyUI Manager (plugin) makes it easy to install custom nodes for: AnimateDiff (video generation), IPAdapter (image-to-image style transfer), FaceID (consistent face generation), InstantID (face identity transfer), and more. Most new research gets a ComfyUI custom node before an official Diffusers integration.` }
]};

L['genai-w7-l3'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>CLIP: Contrastive Language-Image Pre-training</h2><p><strong>CLIP</strong> (Radford et al., OpenAI 2021) is arguably the most influential component in modern generative AI — it's the bridge between language and vision. CLIP is trained to align images and text in a shared embedding space: similar image-text pairs should have high cosine similarity; unrelated pairs should have low similarity.</p><p>Training: 400 million image-text pairs scraped from the web. For a batch of N image-text pairs, compute all N² similarity scores and train with contrastive loss to maximise the N matching pairs and minimise the N²-N non-matching pairs. Simple loss, massive scale, profound effect.</p>` },
  { type:'code', lang:'python', src:`from PIL import Image
import torch
import open_clip

# Load a CLIP model
model, _, preprocess = open_clip.create_model_and_transforms('ViT-B-32', pretrained='openai')
tokenizer = open_clip.get_tokenizer('ViT-B-32')

image = preprocess(Image.open("cat.jpg")).unsqueeze(0)
texts = tokenizer(["a cat", "a dog", "a car", "a landscape photo"])

with torch.no_grad():
    image_features = model.encode_image(image)     # [1, 512]
    text_features  = model.encode_text(texts)      # [4, 512]

    # Normalise to unit sphere
    image_features /= image_features.norm(dim=-1, keepdim=True)
    text_features  /= text_features.norm(dim=-1, keepdim=True)

    # Cosine similarities (higher = more similar)
    similarities = (image_features @ text_features.T).squeeze(0)
    probs = similarities.softmax(dim=-1)

for text, p in zip(["cat","dog","car","landscape"], probs):
    print(f"{text}: {p:.3f}")`,out:`cat: 0.872
dog: 0.098
car: 0.019
landscape: 0.011
# CLIP "knows" the image is a cat without any fine-tuning on cats.`},
  { type:'text', body:`<h3>How CLIP Enables Stable Diffusion</h3><p>CLIP's text encoder (a Transformer) converts prompts into 512–1024 dimensional vectors that capture rich semantic meaning. The SD U-Net's cross-attention layers learn to map from these text vectors to visual features — teaching the model what "impressionist painting" or "cyberpunk cityscape" should look like spatially.</p><p>CLIP is also used in evaluation: <strong>CLIP score</strong> measures prompt-image alignment by computing the cosine similarity between the CLIP embeddings of the generated image and the prompt. A CLIP score of 0.35+ is generally considered good prompt adherence.</p>` },
  { type:'text', body:`<h3>CLIP for Other Tasks</h3><ul><li><strong>Zero-shot classification:</strong> Compute similarity between image and "a photo of [class]" for all classes — no fine-tuning needed</li><li><strong>Image retrieval:</strong> Embed a query text and retrieve the closest images in a CLIP embedding database</li><li><strong>Semantic search:</strong> Find images by description across large photo libraries</li><li><strong>Content moderation:</strong> Flag images similar to "explicit content" or "violence" embeddings</li></ul>` },
  { type:'tip', body:`OpenCLIP (LAION) is an open-source CLIP reimplementation with models trained on LAION-400M and LAION-2B — often surpassing OpenAI's original. SDXL uses OpenCLIP ViT-G (1.8B params) as its primary text encoder. SigLIP (Google, 2023) improves on CLIP with a sigmoid loss and stronger zero-shot performance.` }
]};

L['genai-w7-l4'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Multimodal Vision-Language Models</h2><p>CLIP aligns images and text in a shared space but doesn't generate text about images. <strong>Vision-language models (VLMs)</strong> extend LLMs to understand images as inputs — enabling image captioning, visual question answering, document understanding, and multimodal reasoning.</p><h3>BLIP & BLIP-2</h3><p><strong>BLIP</strong> (2022): unified model for image captioning and VQA. Introduces a "Multimodal Mixture of Encoder-Decoder" — the same model handles both understanding and generation depending on which heads are active.<br><br><strong>BLIP-2</strong> (2023): adds a Q-Former (Querying Transformer) between a frozen CLIP image encoder and a frozen LLM. The Q-Former learns to extract the most task-relevant visual features via learned query tokens — 32 query tokens summarise an entire image into a compact representation the LLM can process. Achieves strong VQA performance while only training the lightweight Q-Former (~188M params) rather than the full image encoder or LLM.</p>` },
  { type:'code', lang:'python', src:`from transformers import Blip2Processor, Blip2ForConditionalGeneration
from PIL import Image
import torch, requests

processor = Blip2Processor.from_pretrained("Salesforce/blip2-opt-2.7b")
model = Blip2ForConditionalGeneration.from_pretrained(
    "Salesforce/blip2-opt-2.7b", torch_dtype=torch.float16
).to("cuda")

image = Image.open("chart.png")

# Image captioning
inputs = processor(image, return_tensors="pt").to("cuda", torch.float16)
caption_ids = model.generate(**inputs, max_new_tokens=50)
caption = processor.decode(caption_ids[0], skip_special_tokens=True)
print("Caption:", caption)

# Visual question answering
question = "What is the trend shown in this chart?"
inputs = processor(image, question, return_tensors="pt").to("cuda", torch.float16)
answer_ids = model.generate(**inputs, max_new_tokens=100)
answer = processor.decode(answer_ids[0], skip_special_tokens=True)
print("Answer:", answer)`,out:`Caption: A line chart showing monthly revenue growth from Q1 2022 to Q4 2023
Answer: The chart shows a consistent upward trend in revenue, with a
notable acceleration in growth starting from Q3 2023.`},
  { type:'text', body:`<h3>GPT-4V, Claude Vision & Gemini Vision</h3><p>Modern frontier LLMs are natively multimodal: GPT-4V/4o, Claude 3/3.5 (image inputs), and Gemini 1.5/2.0 all accept images as context. These are not separate VLMs — vision understanding is integrated into the core model. Claude 3.5 Sonnet can read charts, parse PDFs with figures, understand UI screenshots, and reason about complex multi-figure diagrams. The pattern is: image → tokenise as visual patches → process in the same attention mechanism as text tokens.</p>` },
  { type:'tip', body:`For production multimodal apps: GPT-4o or Claude 3.5 Sonnet for complex reasoning + image understanding (cost: ~$3–15/million tokens); Gemini 1.5 Flash for high-volume, lower-cost vision tasks (~$0.075/million); open-source Llava-1.6 or InternVL2 for on-premise deployment. BLIP-2 / InstructBLIP for lightweight, GPU-only VQA pipelines.` }
]};

L['genai-w7-l5'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Audio Generation: TTS, MusicGen & AudioCraft</h2><p>Generative AI has extended beyond images and text to audio — speech synthesis, music generation, and sound effect creation are now possible from text prompts or reference audio.</p><h3>Text-to-Speech (TTS)</h3><p>Modern TTS systems are near-indistinguishable from human speech in quality. Key models:</p><ul><li><strong>XTTS-2 (Coqui):</strong> Zero-shot voice cloning — provide 6 seconds of reference audio and the model clones that voice for any new text. Open-source. ~17 languages.</li><li><strong>OpenAI TTS:</strong> Production API, 6 preset voices, fast, ~$15/million characters</li><li><strong>ElevenLabs:</strong> Best quality voice cloning, emotion control, multi-speaker dialogue. Commercial.</li><li><strong>Bark (Suno):</strong> Generates speech with non-verbal sounds (laughter, sighs), different languages, even simple singing</li></ul>` },
  { type:'code', lang:'python', src:`# OpenAI TTS API
from openai import OpenAI
from pathlib import Path

client = OpenAI()

# Standard TTS
speech = client.audio.speech.create(
    model="tts-1-hd",       # "tts-1" (faster) or "tts-1-hd" (higher quality)
    voice="alloy",          # alloy, echo, fable, onyx, nova, shimmer
    input="Welcome to Data Science Academia. Today we'll explore neural networks.",
    response_format="mp3"
)
Path("lecture_intro.mp3").write_bytes(speech.content)

# --- MusicGen (Meta / Hugging Face) ---
from transformers import pipeline
import scipy.io.wavfile as wav

music_gen = pipeline("text-to-audio", model="facebook/musicgen-small", device=0)

music = music_gen(
    "upbeat lo-fi hip hop with piano and soft drums, 120 BPM, chill study music",
    forward_params={"do_sample": True, "max_new_tokens": 512}
)
wav.write("background_music.wav", rate=music["sampling_rate"], data=music["audio"][0].T)`,out:`# MusicGen outputs: 8 seconds of audio at 32kHz from the text prompt.
# musicgen-small: 300M params, ~3s generation on GPU
# musicgen-large: 3.3B params, higher quality, ~15s generation`},
  { type:'text', body:`<h3>AudioCraft & Sound FX Generation</h3><p>Meta's <strong>AudioCraft</strong> framework (2023) includes:</p><ul><li><strong>MusicGen:</strong> Text-to-music with melody conditioning (hum or reference audio → stylistically similar music)</li><li><strong>AudioGen:</strong> Text-to-sound-effects ("footsteps on gravel", "thunderstorm with rain")</li><li><strong>EnCodec:</strong> Neural audio codec — compress audio at 24kHz into discrete tokens at 1.5 kbps (key for using audio in LLMs)</li></ul><p><strong>Suno AI</strong> and <strong>Udio</strong> (2024) take music generation further — full songs with lyrics, vocals, and professional mastering from a text prompt. These use a similar architecture to image diffusion but in the audio token domain.</p>` },
  { type:'text', body:`<h3>Speech-to-Text: Whisper</h3><p>The reverse direction — transcribing speech to text — is solved by OpenAI's <strong>Whisper</strong>. Trained on 680,000 hours of multilingual audio, it achieves near-human accuracy in 99 languages and handles diverse accents, background noise, and technical vocabulary. Available as an open-source model and via the OpenAI API ($0.006/minute).</p>` },
  { type:'tip', body:`For a data science course platform: auto-generate TTS narrations for lessons (OpenAI TTS, ~$1.50 for 100,000 characters ≈ 10 typical lessons), use Whisper to transcribe uploaded video lectures for searchable captions, generate background music for focus timers with MusicGen. These integrations are practical and cost-effective at small scale.` }
]};

L['genai-w7-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 7 Quiz</h2><p>Test your knowledge of text-to-image APIs, CLIP, vision-language models, and audio generation.</p>` }
]};

/* ── MODULE 8: Building & Deploying GenAI Applications ── */

L['genai-w8-l1'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Building a Gradio Image Generation App</h2><p><strong>Gradio</strong> is the fastest way to turn a GenAI model into an interactive web app — no frontend experience needed. A typical Stable Diffusion demo goes from model to running web app in ~20 lines of Python. Gradio handles the UI, queueing, GPU management, and even provides free public sharing links via Hugging Face Spaces.</p>` },
  { type:'code', lang:'python', src:`import gradio as gr
import torch
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler

# Load model once at startup (not per request)
pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
pipe.enable_attention_slicing()  # reduce VRAM usage

def generate_image(prompt, negative_prompt, steps, cfg_scale, seed, width, height):
    generator = torch.Generator("cuda").manual_seed(int(seed))
    result = pipe(
        prompt=prompt,
        negative_prompt=negative_prompt or None,
        num_inference_steps=int(steps),
        guidance_scale=cfg_scale,
        width=width,
        height=height,
        generator=generator
    )
    return result.images[0]

with gr.Blocks(title="Image Generator") as app:
    gr.Markdown("## Stable Diffusion Image Generator")
    with gr.Row():
        with gr.Column():
            prompt = gr.Textbox(label="Prompt", lines=3)
            neg    = gr.Textbox(label="Negative prompt", lines=2)
            steps  = gr.Slider(10, 50, value=25, label="Steps")
            cfg    = gr.Slider(1, 15, value=7.5, label="CFG Scale")
            seed   = gr.Number(value=42, label="Seed")
            with gr.Row():
                w = gr.Slider(512, 1024, value=512, step=64, label="Width")
                h = gr.Slider(512, 1024, value=512, step=64, label="Height")
            btn = gr.Button("Generate", variant="primary")
        output = gr.Image(label="Generated Image", height=512)
    btn.click(generate_image, [prompt,neg,steps,cfg,seed,w,h], output)

app.launch(share=True)  # share=True gives a public URL`,out:`# Running on local URL:  http://127.0.0.1:7860
# Running on public URL: https://xxxxx.gradio.live (valid for 72h)`},
  { type:'text', body:`<h3>Adding a LoRA Selector</h3><p>Real apps need model selection, LoRA loading, and result history. Gradio makes these straightforward:</p><pre><code>lora_dropdown = gr.Dropdown(choices=list_lora_files(), label="LoRA")
strength = gr.Slider(0, 1, value=0.8, label="LoRA Strength")

# In generate_image():
if lora_path:
    pipe.load_lora_weights(lora_path)
    pipe.fuse_lora(lora_scale=strength)
result = pipe(...)
pipe.unfuse_lora()  # unfuse before next call with different LoRA</code></pre>` },
  { type:'tip', body:`Deploy on Hugging Face Spaces for free (CPU, or GPU with credits). Spaces auto-deploys from a GitHub repo or HF repo — push your app.py and requirements.txt. For production: use a T4 GPU Space (~$0.40/hr when active) or self-host on a cloud VM with an A10G (~$1.50/hr). Enable queuing (pipe.enable_sequential_cpu_offload() for VRAM < 8GB).` }
]};

L['genai-w8-l2'] = { duration_mins: 22, sections: [
  { type:'text', body:`<h2>Multimodal Document Processing Pipeline</h2><p>A practical enterprise application: a pipeline that processes PDFs and documents containing both text and images, using GenAI to understand and summarise the visual content alongside the text. This is increasingly valuable for annual reports, research papers, technical manuals, and slide decks.</p>` },
  { type:'code', lang:'python', src:`import anthropic, base64, pdfplumber
from pathlib import Path
from PIL import Image
import io

client = anthropic.Anthropic()

def extract_pages_with_images(pdf_path: str) -> list[dict]:
    """Extract text and page images from a PDF."""
    pages = []
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            # Render page as image
            img = page.to_image(resolution=150).original
            buf = io.BytesIO()
            img.save(buf, format="PNG")
            img_b64 = base64.b64encode(buf.getvalue()).decode()
            pages.append({"page": i+1, "text": text, "image_b64": img_b64})
    return pages

def analyse_page(page: dict) -> str:
    """Use Claude to analyse a page with both text and visual understanding."""
    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {"type": "base64", "media_type": "image/png",
                               "data": page["image_b64"]}
                },
                {
                    "type": "text",
                    "text": f"""Analyse this document page (page {page['page']}).
Extracted text: {page['text'][:2000]}

Tasks:
1. Summarise the main content of this page
2. Describe any charts, diagrams, or figures and what they show
3. Extract key statistics or data points visible in charts
4. Note any important tables with their structure
Return a structured analysis."""
                }
            ]
        }]
    )
    return response.content[0].text

def process_document(pdf_path: str) -> str:
    """Full pipeline: extract → analyse → summarise."""
    pages = extract_pages_with_images(pdf_path)
    analyses = [analyse_page(p) for p in pages[:10]]  # first 10 pages

    # Final synthesis
    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=2048,
        messages=[{"role":"user","content": f"Synthesise these page analyses into a coherent executive summary:\\n\\n" + "\\n---\\n".join(analyses)}]
    )
    return response.content[0].text`,out:`# Practical application: quarterly report analysis, research paper extraction,
# technical documentation understanding, due diligence document review.`},
  { type:'text', body:`<h3>Document Processing at Scale</h3><p>For high-volume document processing: use a queue (Celery + Redis) to process documents asynchronously; cache results in a vector database (Supabase pgvector) for semantic search; add a Gradio or Streamlit frontend for non-technical users to upload and query documents. This architecture handles hundreds of documents per hour on modest infrastructure.</p>` },
  { type:'tip', body:`For cost efficiency in document pipelines: use a smaller/faster model (Claude Haiku, GPT-4o mini) for page-by-page extraction, then a more capable model (Claude Sonnet, GPT-4o) only for the final synthesis. This tiered approach cuts cost by 10–20× while maintaining output quality.` }
]};

L['genai-w8-l3'] = { duration_mins: 18, sections: [
  { type:'text', body:`<h2>Responsible AI: Watermarking & C2PA</h2><p>As generated images become indistinguishable from photographs, establishing provenance — "did a human take this photo or did AI generate it?" — has become critical. Two approaches are emerging as standards.</p><h3>Invisible Watermarking</h3><p>Embed an imperceptible signal into generated images that survives JPEG compression, resizing, and minor editing. Detection requires the watermark key — users can verify origin without visible marks. Key implementations:</p><ul><li><strong>Google SynthID:</strong> Watermarks applied during the diffusion sampling process (at the noise level), extremely robust to post-processing. Used in Imagen. Freely available for Stable Diffusion via a Hugging Face library.</li><li><strong>TreeRing:</strong> Research approach embedding watermarks in the initial noise vector — robust to image transformations.</li><li><strong>Stable Signature:</strong> Fine-tunes the VAE decoder to embed a unique watermark in every generated image — model-specific, robust.</li></ul>` },
  { type:'code', lang:'python', src:`# SynthID watermarking with diffusers
from diffusers import AutoPipelineForText2Image
from diffusers.utils import load_image
import torch

from imwatermark import WatermarkEncoder, WatermarkDecoder

pipe = AutoPipelineForText2Image.from_pretrained(
    "stabilityai/stable-diffusion-xl-base-1.0",
    torch_dtype=torch.float16
).to("cuda")

def generate_with_watermark(prompt: str, watermark_text: str = "DSA-GENAI"):
    image = pipe(prompt, num_inference_steps=25).images[0]

    # Embed invisible watermark
    encoder = WatermarkEncoder()
    encoder.set_watermark('bytes', watermark_text.encode('utf-8'))

    import numpy as np
    img_array = np.array(image)
    watermarked = encoder.encode(img_array, 'dwtDct')  # DWT-DCT method

    from PIL import Image
    return Image.fromarray(watermarked)

def verify_watermark(image_path: str) -> str:
    decoder = WatermarkDecoder('bytes', 32)
    img = np.array(load_image(image_path))
    watermark = decoder.decode(img, 'dwtDct')
    return watermark.decode('utf-8', errors='ignore')`,out:`# verified watermark: 'DSA-GENAI'
# Invisible watermarks survive JPEG compression and moderate resizing`},
  { type:'text', body:`<h3>C2PA (Coalition for Content Provenance and Authenticity)</h3><p>C2PA is an open standard for cryptographic content credentials — metadata attached to files that records who created it, when, with what tools, and how it was modified. Adobe, Microsoft, Google, OpenAI, and camera manufacturers all participate. The "Content Credentials" badge (a stylised CR icon) is beginning to appear in software and on web platforms.</p><p>For AI-generated content: add a C2PA assertion: <code>"c2pa.ai_generative"</code> with model name, prompt hash, and timestamp. This is cryptographically signed and tamper-evident — editing the image without updating the manifest invalidates the signature. Content credentials persist across social media uploads (where platform support exists) and can be verified at contentcredentials.org.</p>` },
  { type:'tip', body:`Ethical responsibilities when deploying generative AI: (1) disclose when content is AI-generated (use C2PA or visible labels), (2) implement content filtering to prevent harmful/CSAM/deepfake generation, (3) respect copyright in training data (check licensing — don't fine-tune on scraped images without checking), (4) provide opt-out for people who don't want their data used in training, (5) store audit logs of what was generated when.` }
]};

L['genai-w8-l4'] = { duration_mins: 20, sections: [
  { type:'text', body:`<h2>Production Serving for GenAI Models</h2><p>Moving from a Gradio demo to a production system that serves thousands of users requires attention to throughput, latency, cost, and reliability. Image generation is compute-intensive (typically 3–30 GPU-seconds per image) — naive deployment doesn't scale.</p><h3>Key Production Challenges</h3><ul><li><strong>GPU cold starts:</strong> Loading a 3.4GB model takes 10–30 seconds — users can't wait for this per-request</li><li><strong>Concurrency:</strong> One GPU can serve one inference at a time — parallelism requires multiple GPUs or careful batching</li><li><strong>Cost:</strong> An A100 GPU costs ~$3/hr; serving 100 images/hr costs ~$0.03/image — pricing must cover this</li><li><strong>Queuing:</strong> Requests arrive faster than they're served — need a job queue with status updates</li></ul>` },
  { type:'code', lang:'python', src:`# Production serving with FastAPI + Celery + Redis
from fastapi import FastAPI, BackgroundTasks
from celery import Celery
from pydantic import BaseModel
import uuid, torch
from diffusers import StableDiffusionPipeline

app = FastAPI()
celery_app = Celery('tasks', broker='redis://localhost:6379/0',
                              backend='redis://localhost:6379/1')

class GenerationRequest(BaseModel):
    prompt: str
    negative_prompt: str = ""
    steps: int = 25
    cfg_scale: float = 7.5

@app.post("/generate")
async def submit_generation(req: GenerationRequest):
    """Submit job and return immediately with a job ID."""
    job_id = str(uuid.uuid4())
    generate_image_task.delay(job_id, req.dict())
    return {"job_id": job_id, "status": "queued"}

@app.get("/status/{job_id}")
async def get_status(job_id: str):
    result = celery_app.AsyncResult(job_id)
    if result.ready():
        return {"status": "complete", "image_url": result.get()["url"]}
    return {"status": result.state.lower()}  # queued/started/pending

@celery_app.task(name='generate_image_task')
def generate_image_task(job_id: str, params: dict):
    """Runs in a worker process that keeps the model warm."""
    # pipe is loaded once at worker startup (not per task)
    image = pipe(params['prompt'], num_inference_steps=params['steps']).images[0]
    url = upload_to_storage(image, job_id)  # S3 or Supabase Storage
    return {"url": url}`,out:`# Worker keeps model loaded: zero cold starts after first request.
# Multiple workers = parallel generation.
# Client polls /status/{job_id} until "complete".`},
  { type:'text', body:`<h3>Managed GPU Inference Options</h3><p>For teams without GPU infrastructure:</p><ul><li><strong>Replicate:</strong> Deploy any model via Cog container; pay per prediction second ($0.00055/s on A40). Good for burst workloads.</li><li><strong>Modal:</strong> Serverless GPU functions with fast cold starts (model cached to volume); pay per second of GPU use. Best for production Python apps.</li><li><strong>RunPod Serverless:</strong> Deploy your Docker image as a serverless GPU endpoint. Cheaper than Replicate for high volume.</li><li><strong>AWS SageMaker / GCP Vertex:</strong> Managed ML serving with auto-scaling. More setup but better enterprise SLAs and compliance.</li></ul>` },
  { type:'tip', body:`For a student-facing platform at moderate scale (hundreds of generations/day): Modal or Replicate is most cost-effective (no idle GPU cost). At thousands/day: a dedicated GPU instance (RunPod, Lambda Labs) with a Celery queue beats per-second pricing. At hundreds of thousands/day: multi-region auto-scaling on cloud (SageMaker Inference).` }
]};

L['genai-w8-l5'] = { duration_mins: 25, sections: [
  { type:'text', body:`<h2>Capstone Project: Full GenAI Application</h2><p>In this capstone, you'll build a complete, production-ready generative AI application that combines multiple techniques from this course. This project demonstrates mastery of the full GenAI stack: model integration, API design, UI, and responsible deployment.</p><h3>Project Options</h3><p>Choose one (or design your own with instructor approval):</p><ol><li><strong>Multimodal Story Generator:</strong> User provides a theme + style reference image → generate illustrated short story with matching images and TTS narration for each paragraph</li><li><strong>Document Intelligence System:</strong> Upload PDF reports → extract text + visual content → semantic search + Q&A + auto-generated executive summary</li><li><strong>Creative Portfolio Generator:</strong> Input: CV/resume text + professional headshot → output: portfolio website with AI-generated profile photo variants, bio, and project descriptions</li><li><strong>Brand Asset Creator:</strong> Input: company name + brand brief → output: logo variations (with background removal), social media templates, and product mockups</li></ol>` },
  { type:'text', body:`<h3>Required Components</h3><p>Whatever project you choose must include:</p><ul><li><strong>At least two GenAI modalities:</strong> e.g., text generation + image generation, or image understanding + TTS, or text-to-image + document analysis</li><li><strong>Streaming or async response:</strong> The UI must not freeze during generation — show progress or stream results</li><li><strong>Error handling:</strong> Graceful handling of content filter blocks, API rate limits, model timeouts, and invalid inputs</li><li><strong>Responsible AI features:</strong> Either invisible watermarking OR C2PA metadata OR an explicit AI disclosure label on all generated content</li><li><strong>Cost tracking:</strong> Log API calls and estimate cost per generation so you understand the economics</li></ul>` },
  { type:'code', lang:'python', src:`# Starter template: Multimodal Story Generator
import anthropic, openai, gradio as gr
from pathlib import Path

claude = anthropic.Anthropic()
oai = openai.OpenAI()

def generate_story_with_images(theme: str, style_desc: str, num_paragraphs: int = 3):
    """Generate a short story with matching illustrations."""
    results = []

    # 1. Generate story text
    story_resp = claude.messages.create(
        model="claude-opus-4-7",
        max_tokens=1000,
        messages=[{"role":"user","content":f"Write a {num_paragraphs}-paragraph short story about: {theme}. Make each paragraph self-contained with vivid visual imagery. Return as JSON: {{\\"paragraphs\\": [...]}}"}]
    )
    import json
    story = json.loads(story_resp.content[0].text)

    for i, para in enumerate(story["paragraphs"]):
        # 2. Generate image for each paragraph
        img_prompt = f"{para[:200]}. Art style: {style_desc}. Cinematic composition."
        img_resp = oai.images.generate(model="dall-e-3", prompt=img_prompt, size="1024x1024")

        # 3. Generate TTS narration
        audio = oai.audio.speech.create(model="tts-1", voice="nova", input=para)
        audio_path = f"/tmp/story_p{i+1}.mp3"
        Path(audio_path).write_bytes(audio.content)

        results.append({"text": para, "image_url": img_resp.data[0].url, "audio": audio_path})
        yield results  # stream results as they're ready

    # Log cost estimate
    cost = num_paragraphs * (0.04 + 0.015)  # DALL-E 3 HD + TTS estimate
    print(f"Estimated cost: \${cost:.3f}")`,out:`# Each paragraph generates in ~10-15 seconds (image + TTS in parallel)
# Stream results to Gradio UI so user sees progress immediately
# Full story (3 paragraphs): ~$0.17 per generation`},
  { type:'exercise', title:'Build Your Capstone: Week-by-Week Plan', body:`Create a 4-week implementation plan for your chosen capstone project. Week 1: design the system architecture (what models, what APIs, what data flow); Week 2: build the core generation pipeline with error handling; Week 3: build the Gradio UI with streaming and add responsible AI features; Week 4: deploy to Hugging Face Spaces, document API costs, conduct user testing with 3 classmates.`, hint:`Start with the simplest possible version that works end-to-end (even if slow/ugly), then add features. Never spend more than 2 days on any single component before having an end-to-end demo.`, solution:`# Architecture template (adapt for your project):
#
# Frontend: Gradio with gr.Blocks (streaming via yield)
# Orchestration: Python service that calls model APIs in sequence/parallel
# Storage: Supabase Storage for generated assets, Postgres for job logs
# Cost tracking: log each API call with model, tokens, estimated cost
#
# Responsible AI checklist:
# □ Add "Generated by AI" watermark or label to all outputs
# □ Log all prompts (for abuse detection)
# □ Implement content filtering (OpenAI's moderation endpoint for free)
# □ Add rate limiting (max 5 generations/user/hour)
# □ Store generation metadata (timestamp, model, prompt hash) for audit` }
]};

L['genai-w8-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Module 8 Quiz</h2><p>Test your understanding of production GenAI deployment, responsible AI practices, and multimodal application architecture.</p>` }
]};

Object.assign(window.DSA_LESSON_CONTENT || (window.DSA_LESSON_CONTENT = {}), L);
})();
