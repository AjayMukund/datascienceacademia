(function(){
'use strict';
window.DSA_LESSON_CONTENT = window.DSA_LESSON_CONTENT || {};
const L = window.DSA_LESSON_CONTENT;

/* ─── WEEK 1 — Image Processing Foundations ─────────────────────────────── */

L['cv-w1-l1'] = {
  title: 'Introduction to Computer Vision & OpenCV',
  sections: [
    { type: 'text', body: `<h2>What is Computer Vision?</h2>
<p>Computer Vision (CV) is the field of enabling machines to interpret and understand visual information — images, video, and 3D data. It spans tasks from simple pixel manipulation to real-time object detection, medical diagnosis, and autonomous navigation.</p>
<p>Core task taxonomy:</p>
<ul>
  <li><strong>Classification</strong> — "What is this image of?"</li>
  <li><strong>Detection</strong> — "Where are the objects and what are they?"</li>
  <li><strong>Segmentation</strong> — "Which pixels belong to which object?"</li>
  <li><strong>Generation</strong> — "Synthesise or transform images."</li>
  <li><strong>3D understanding</strong> — Depth, pose, point clouds.</li>
</ul>
<p>The dominant library for classical CV is <strong>OpenCV</strong> (Open Source Computer Vision Library), with Python bindings via the <code>cv2</code> package. Deep learning workflows rely on <strong>PyTorch + torchvision</strong>.</p>` },
    { type: 'code', lang: 'bash', src: `pip install opencv-python-headless numpy matplotlib torch torchvision` },
    { type: 'code', lang: 'python', src: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Read an image from disk (returns a NumPy array, dtype=uint8)
img = cv2.imread('photo.jpg')          # shape: (H, W, 3) in BGR order
print(img.shape, img.dtype)            # e.g. (480, 640, 3) uint8

# OpenCV uses BGR; Matplotlib expects RGB — convert before displaying
rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
plt.imshow(rgb); plt.axis('off'); plt.title('Original'); plt.show()

# Save a processed image
cv2.imwrite('output.jpg', img)` },
    { type: 'tip', body: `OpenCV imread returns <strong>BGR</strong>, not RGB. Always convert with <code>cv2.cvtColor(img, cv2.COLOR_BGR2RGB)</code> before passing to Matplotlib, PIL, or PyTorch transforms — or you'll get colour artifacts without any error.` },
    { type: 'text', body: `<h3>OpenCV vs PIL vs scikit-image</h3>
<table>
  <tr><th>Library</th><th>Strengths</th><th>Typical Use</th></tr>
  <tr><td>OpenCV (cv2)</td><td>Speed, classical algorithms, video I/O</td><td>Real-time pipelines, feature detection</td></tr>
  <tr><td>Pillow (PIL)</td><td>Simple API, broad format support</td><td>Quick transforms, web apps</td></tr>
  <tr><td>scikit-image</td><td>Scientific algorithms, clean API</td><td>Research, morphology, registration</td></tr>
</table>
<p>For deep learning data pipelines, <strong>albumentations</strong> wraps these into fast, composable augmentation transforms (covered in Week 3).</p>` },
    { type: 'exercise', title: 'Load, inspect, and split channels', hint: 'Use cv2.split() to separate B, G, R channels', solution: `import cv2, numpy as np, matplotlib.pyplot as plt
img = cv2.imread('photo.jpg')
b, g, r = cv2.split(img)                        # each shape (H, W)
fig, axes = plt.subplots(1, 4, figsize=(14, 4))
for ax, ch, name in zip(axes, [cv2.cvtColor(img, cv2.COLOR_BGR2RGB), b, g, r],
                               ['Original', 'Blue', 'Green', 'Red']):
    ax.imshow(ch, cmap=None if name == 'Original' else 'gray')
    ax.set_title(name); ax.axis('off')
plt.tight_layout(); plt.show()` }
  ]
};

L['cv-w1-l2'] = {
  title: 'Image Representation — Pixels, Channels & Colour Spaces',
  sections: [
    { type: 'text', body: `<h2>Pixel Structure & Data Types</h2>
<p>A digital image is a 3-D NumPy array of shape <code>(H, W, C)</code> where H = height in pixels, W = width, and C = number of channels (3 for colour, 1 for grayscale). Standard dtype is <code>uint8</code> with values 0–255. Floating-point images (float32, range 0–1) are common inside neural networks.</p>
<h3>Key Colour Spaces</h3>
<ul>
  <li><strong>BGR/RGB</strong> — default for natural images; Red, Green, Blue intensities.</li>
  <li><strong>Grayscale</strong> — luminance only; Y ≈ 0.114B + 0.587G + 0.299R.</li>
  <li><strong>HSV</strong> — Hue (0–179), Saturation (0–255), Value (0–255). Hue encodes colour independently of brightness — ideal for colour-based segmentation.</li>
  <li><strong>LAB</strong> — L* (lightness), A* (green–red axis), B* (blue–yellow axis). Perceptually uniform; good for colour correction and skin detection.</li>
  <li><strong>YCrCb</strong> — luma (Y) + chroma (Cr, Cb); common in JPEG compression and skin detection.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import cv2, numpy as np

img_bgr = cv2.imread('photo.jpg')

# --- Colour space conversions ---
gray   = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)   # (H, W)
hsv    = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)     # (H, W, 3)
lab    = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2LAB)
ycrcb  = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2YCrCb)

# --- dtype conversion: uint8 ↔ float32 ---
f32 = img_bgr.astype(np.float32) / 255.0              # normalise to [0, 1]
u8  = (f32 * 255).clip(0, 255).astype(np.uint8)       # back to uint8

# --- Colour-based object mask in HSV (e.g. isolate red) ---
lower_red1 = np.array([0,   120, 70])
upper_red1 = np.array([10,  255, 255])
lower_red2 = np.array([170, 120, 70])
upper_red2 = np.array([180, 255, 255])
mask1 = cv2.inRange(hsv, lower_red1, upper_red1)
mask2 = cv2.inRange(hsv, lower_red2, upper_red2)
red_mask = cv2.bitwise_or(mask1, mask2)               # binary mask of red regions` },
    { type: 'tip', body: `In HSV, red wraps around 0°/180° — you need <em>two</em> range checks (0–10 and 170–180) to catch all reds. Use <code>cv2.inRange</code> + <code>cv2.bitwise_or</code> to merge both masks.` },
    { type: 'text', body: `<h3>Normalisation and Standardisation</h3>
<p>Neural networks expect input in a specific range. ImageNet-pretrained models use per-channel normalisation:</p>
<pre>mean = [0.485, 0.456, 0.406]   # R, G, B means (ImageNet)
std  = [0.229, 0.224, 0.225]   # R, G, B stds</pre>
<p>Always normalise in the same colour order your model was trained on. torchvision's <code>transforms.Normalize</code> applies this automatically.</p>` },
    { type: 'exercise', title: 'Isolate a colour object using HSV', hint: 'Convert to HSV, use cv2.inRange, apply mask with cv2.bitwise_and', solution: `import cv2, numpy as np
img = cv2.imread('orange_ball.jpg')
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
# Orange hue range
lower = np.array([10, 100, 100])
upper = np.array([25, 255, 255])
mask = cv2.inRange(hsv, lower, upper)
result = cv2.bitwise_and(img, img, mask=mask)
cv2.imshow('Isolated', result); cv2.waitKey(0); cv2.destroyAllWindows()` }
  ]
};

L['cv-w1-l3'] = {
  title: 'Geometric Transformations — Resize, Crop, Rotate & Affine',
  sections: [
    { type: 'text', body: `<h2>Why Geometric Transformations?</h2>
<p>Geometric transformations change the spatial layout of pixels without (necessarily) altering intensities. They underpin data augmentation, image registration, panorama stitching, and document rectification.</p>
<p>Transformation hierarchy (each is a special case of the next):</p>
<ol>
  <li><strong>Rigid (Euclidean)</strong> — rotation + translation. Preserves distances.</li>
  <li><strong>Similarity</strong> — rigid + uniform scale. Preserves angles and ratios.</li>
  <li><strong>Affine</strong> — similarity + shear + non-uniform scale. Preserves parallelism.</li>
  <li><strong>Projective (Homography)</strong> — affine + perspective. Maps any quad to any quad.</li>
</ol>` },
    { type: 'code', lang: 'python', src: `import cv2, numpy as np

img = cv2.imread('photo.jpg')
h, w = img.shape[:2]

# --- Resize ---
small = cv2.resize(img, (320, 240))                       # explicit WxH
half  = cv2.resize(img, None, fx=0.5, fy=0.5,
                    interpolation=cv2.INTER_AREA)          # INTER_AREA for shrinking

# --- Crop (NumPy slicing) ---
crop = img[100:300, 150:400]                              # [y1:y2, x1:x2]

# --- Flip ---
flipped_h = cv2.flip(img, 1)   # horizontal (mirror)
flipped_v = cv2.flip(img, 0)   # vertical
flipped_b = cv2.flip(img, -1)  # both

# --- Rotation via getRotationMatrix2D ---
cx, cy = w // 2, h // 2
M = cv2.getRotationMatrix2D((cx, cy), angle=30, scale=1.0)  # 30° CCW
rotated = cv2.warpAffine(img, M, (w, h))

# --- Affine transform (3-point map) ---
src_pts = np.float32([[0,0],[w-1,0],[0,h-1]])
dst_pts = np.float32([[50,50],[w-100,80],[30,h-50]])
A = cv2.getAffineTransform(src_pts, dst_pts)
affine_img = cv2.warpAffine(img, A, (w, h))` },
    { type: 'tip', body: `For upsampling (enlarging), use <code>cv2.INTER_CUBIC</code> or <code>cv2.INTER_LANCZOS4</code> for better quality. For downsampling, use <code>cv2.INTER_AREA</code> to avoid aliasing. <code>cv2.INTER_LINEAR</code> (bilinear) is the default and a good middle-ground.` },
    { type: 'code', lang: 'python', src: `# --- Perspective (homography) transform — e.g. document scan rectification ---
# Four corners of the document in the source image
src = np.float32([[120, 80], [620, 60], [650, 460], [90, 490]])
# Desired rectangle in the output
dst = np.float32([[0,   0 ], [500, 0 ], [500, 400], [0,   400]])
H = cv2.getPerspectiveTransform(src, dst)
warped = cv2.warpPerspective(img, H, (500, 400))` },
    { type: 'exercise', title: 'Build a rotation + pad pipeline', hint: 'warpAffine can place the result into a larger canvas to avoid clipping', solution: `import cv2, numpy as np
img = cv2.imread('photo.jpg')
h, w = img.shape[:2]
diagonal = int(np.sqrt(h**2 + w**2))
pad_y = (diagonal - h) // 2
pad_x = (diagonal - w) // 2
padded = cv2.copyMakeBorder(img, pad_y, pad_y, pad_x, pad_x,
                             cv2.BORDER_CONSTANT, value=0)
ph, pw = padded.shape[:2]
M = cv2.getRotationMatrix2D((pw//2, ph//2), 45, 1.0)
rotated = cv2.warpAffine(padded, M, (pw, ph))
cv2.imshow('Rotated (no clip)', rotated)
cv2.waitKey(0); cv2.destroyAllWindows()` }
  ]
};

L['cv-w1-l4'] = {
  title: 'Image Filtering — Convolution, Blurring & Sharpening',
  sections: [
    { type: 'text', body: `<h2>Convolution Fundamentals</h2>
<p>A 2-D convolution slides a small <em>kernel</em> (filter) across the image, computing a weighted sum at each position. The output pixel at (x, y) depends only on the neighbourhood defined by the kernel size.</p>
<ul>
  <li><strong>Box blur</strong> — all kernel weights equal 1/N²; fast but poor quality.</li>
  <li><strong>Gaussian blur</strong> — weights follow a 2-D Gaussian; reduces noise smoothly.</li>
  <li><strong>Median filter</strong> — replaces each pixel with the median of its neighbourhood; excellent for salt-and-pepper noise, non-linear.</li>
  <li><strong>Bilateral filter</strong> — Gaussian in space AND intensity; blurs noise while preserving edges.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import cv2, numpy as np

img = cv2.imread('noisy.jpg')

# Box blur
box = cv2.blur(img, (5, 5))

# Gaussian blur (kernel size must be odd)
gauss = cv2.GaussianBlur(img, (7, 7), sigmaX=1.5)

# Median filter (ksize must be odd; good for salt-and-pepper noise)
median = cv2.medianBlur(img, 5)

# Bilateral filter — preserves edges (slower)
bilateral = cv2.bilateralFilter(img, d=9, sigmaColor=75, sigmaSpace=75)` },
    { type: 'code', lang: 'python', src: `# --- Custom kernels with filter2D ---
# Sharpening kernel
sharpen = np.array([[ 0, -1,  0],
                    [-1,  5, -1],
                    [ 0, -1,  0]], dtype=np.float32)
sharpened = cv2.filter2D(img, -1, sharpen)

# Emboss effect
emboss = np.array([[-2, -1,  0],
                   [-1,  1,  1],
                   [ 0,  1,  2]], dtype=np.float32)
embossed = cv2.filter2D(img, -1, emboss)

# Unsharp masking (high-frequency boost)
blurred = cv2.GaussianBlur(img, (0, 0), 3)
unsharp = cv2.addWeighted(img, 1.5, blurred, -0.5, 0)` },
    { type: 'tip', body: `Always blur <em>before</em> edge detection or gradient computation. A 5×5 Gaussian with σ=1 removes most camera noise without destroying edges. Skipping this step causes spurious gradient responses at every pixel-level intensity fluctuation.` },
    { type: 'text', body: `<h3>Separable Filters</h3>
<p>A 2-D Gaussian kernel G(x,y) = G(x)·G(y) is <em>separable</em> — it can be applied as two 1-D convolutions (horizontal then vertical). OpenCV exploits this internally for <code>GaussianBlur</code>, making it much faster than the general <code>filter2D</code> path for large kernels.</p>` },
    { type: 'exercise', title: 'Remove noise and compare SNR', hint: 'Add noise with np.random.normal, apply different filters, measure PSNR with cv2.PSNR', solution: `import cv2, numpy as np
img = cv2.imread('clean.jpg')
noise = np.random.normal(0, 25, img.shape).astype(np.float32)
noisy = np.clip(img.astype(np.float32) + noise, 0, 255).astype(np.uint8)
gauss  = cv2.GaussianBlur(noisy, (5,5), 1.5)
median = cv2.medianBlur(noisy, 5)
bilat  = cv2.bilateralFilter(noisy, 9, 75, 75)
for name, filtered in [('Gaussian', gauss), ('Median', median), ('Bilateral', bilat)]:
    psnr = cv2.PSNR(img, filtered)
    print(f'{name}: PSNR = {psnr:.2f} dB')` }
  ]
};

L['cv-w1-l5'] = {
  title: 'Edge Detection — Sobel, Canny & Morphological Operations',
  sections: [
    { type: 'text', body: `<h2>Image Gradients & Edge Detection</h2>
<p>Edges are locations of rapid intensity change — they correspond to object boundaries, texture boundaries, and depth discontinuities. Edge detection computes the image gradient and thresholds it.</p>
<ul>
  <li><strong>Sobel operator</strong> — approximates the first-order derivative using 3×3 kernels; gives Gx, Gy, and magnitude = √(Gx²+Gy²).</li>
  <li><strong>Laplacian</strong> — second-order derivative; zero-crossings mark edges; noise-sensitive.</li>
  <li><strong>Canny</strong> — the gold standard: Gaussian blur → Sobel gradients → non-maximum suppression → hysteresis double-thresholding. Produces clean, thin edges.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import cv2, numpy as np

img  = cv2.imread('scene.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# --- Sobel gradients ---
Gx  = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)   # horizontal gradient
Gy  = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)   # vertical gradient
mag = np.sqrt(Gx**2 + Gy**2)
mag = np.clip(mag, 0, 255).astype(np.uint8)

# --- Laplacian ---
lap = cv2.Laplacian(gray, cv2.CV_64F, ksize=3)
lap_abs = np.uint8(np.absolute(lap))

# --- Canny (recommended) ---
blurred = cv2.GaussianBlur(gray, (5, 5), 1.4)
edges = cv2.Canny(blurred, threshold1=50, threshold2=150)` },
    { type: 'tip', body: `Canny's two thresholds control hysteresis: pixels above <code>threshold2</code> are definite edges; pixels between the thresholds are kept only if they connect to a definite edge; below <code>threshold1</code> they're discarded. A ratio of ~1:3 (low:high) works well for most natural images.` },
    { type: 'code', lang: 'python', src: `# --- Morphological operations ---
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))

# Dilation — expands bright regions (fills holes, connects components)
dilated = cv2.dilate(edges, kernel, iterations=1)

# Erosion — shrinks bright regions (removes small noise blobs)
eroded = cv2.erode(edges, kernel, iterations=1)

# Opening = erode → dilate  (removes small objects)
opened = cv2.morphologyEx(edges, cv2.MORPH_OPEN,  kernel)

# Closing = dilate → erode  (fills small holes)
closed = cv2.morphologyEx(edges, cv2.MORPH_CLOSE, kernel)

# Morphological gradient = dilate - erode  (outline)
gradient = cv2.morphologyEx(gray, cv2.MORPH_GRADIENT, kernel)` },
    { type: 'text', body: `<h3>Contour Detection</h3>
<p>After Canny or thresholding, use <code>cv2.findContours</code> to extract connected boundary curves. Each contour is a NumPy array of (x, y) points. <code>cv2.drawContours</code> renders them on the image.</p>` },
    { type: 'exercise', title: 'Count objects in a binary image', hint: 'Apply Canny → morphological close → findContours → filter by contourArea', solution: `import cv2, numpy as np
img  = cv2.imread('coins.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (5, 5), 1)
_, thresh = cv2.threshold(blur, 0, 255,
                           cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
cleaned = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)
contours, _ = cv2.findContours(cleaned, cv2.RETR_EXTERNAL,
                                cv2.CHAIN_APPROX_SIMPLE)
objects = [c for c in contours if cv2.contourArea(c) > 500]
print(f'Objects found: {len(objects)}')
cv2.drawContours(img, objects, -1, (0,255,0), 2)
cv2.imshow('Result', img); cv2.waitKey(0)` }
  ]
};

/* ─── WEEK 2 — Feature Detection & Classical CV ─────────────────────────── */

L['cv-w2-l1'] = {
  title: 'Histograms & Histogram Equalisation',
  sections: [
    { type: 'text', body: `<h2>Image Histograms</h2>
<p>A histogram counts the frequency of each pixel intensity (0–255) in an image. It is a fundamental tool for understanding image contrast, brightness, and exposure. A narrow histogram indicates low contrast; a wide, flat histogram indicates high contrast.</p>
<p>Applications include:</p>
<ul>
  <li>Exposure analysis and correction.</li>
  <li>Colour-based segmentation (per-channel histograms).</li>
  <li>Image similarity via histogram comparison (Bhattacharyya, correlation).</li>
  <li>Histogram backprojection for object localisation.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import cv2, numpy as np, matplotlib.pyplot as plt

img  = cv2.imread('photo.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# --- Compute histogram ---
hist = cv2.calcHist([gray], channels=[0], mask=None,
                    histSize=[256], ranges=[0, 256])
# hist shape: (256, 1)

# --- Plot grayscale histogram ---
plt.figure(figsize=(8, 3))
plt.plot(hist.flatten(), color='gray')
plt.xlabel('Pixel intensity'); plt.ylabel('Count')
plt.title('Grayscale histogram'); plt.show()

# --- Per-channel BGR histogram ---
for i, colour in enumerate(['b', 'g', 'r']):
    h = cv2.calcHist([img], [i], None, [256], [0, 256])
    plt.plot(h.flatten(), color=colour)
plt.title('BGR histograms'); plt.show()` },
    { type: 'code', lang: 'python', src: `# --- Histogram Equalisation (global) ---
eq = cv2.equalizeHist(gray)

# --- CLAHE (Contrast Limited Adaptive HE) — better for natural images ---
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
cl_img = clahe.apply(gray)

# Apply CLAHE to colour image via LAB space
lab   = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
l, a, b = cv2.split(lab)
l_clahe = clahe.apply(l)
lab_eq = cv2.merge([l_clahe, a, b])
result  = cv2.cvtColor(lab_eq, cv2.COLOR_LAB2BGR)` },
    { type: 'tip', body: `Apply CLAHE in <strong>LAB colour space</strong> (on the L channel only) rather than directly on BGR. This boosts local contrast while leaving hue and saturation unchanged, preventing colour distortion.` },
    { type: 'exercise', title: 'Compare equalisation methods on a dark image', hint: 'Load a dark image, apply globalHE and CLAHE, display side-by-side histograms', solution: `import cv2, numpy as np, matplotlib.pyplot as plt
img  = cv2.imread('dark.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
eq   = cv2.equalizeHist(gray)
clahe_obj = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
cl   = clahe_obj.apply(gray)
fig, axes = plt.subplots(2, 3, figsize=(14, 8))
for col, (name, arr) in enumerate(zip(['Original','Global HE','CLAHE'],
                                       [gray, eq, cl])):
    axes[0, col].imshow(arr, cmap='gray'); axes[0, col].set_title(name)
    axes[1, col].hist(arr.ravel(), 256, [0, 256], color='gray')
plt.tight_layout(); plt.show()` }
  ]
};

L['cv-w2-l2'] = {
  title: 'Corner & Keypoint Detection — Harris & Shi-Tomasi',
  sections: [
    { type: 'text', body: `<h2>Why Detect Corners?</h2>
<p>Corners are image points that can be localised precisely in both x and y directions. They are stable across viewpoint changes and form the basis for feature matching, tracking, and 3D reconstruction.</p>
<h3>Harris Corner Detector</h3>
<p>Harris uses the second-moment matrix (structure tensor) <strong>M</strong> computed from local image gradients. Eigenvalues λ₁ and λ₂ of M characterise the local neighbourhood:</p>
<ul>
  <li>Both small → flat region (no edges or corners).</li>
  <li>One large, one small → edge.</li>
  <li>Both large → corner — strong gradient variation in all directions.</li>
</ul>
<p>The Harris response score R = det(M) − k·trace(M)² avoids explicit eigenvalue decomposition. k ≈ 0.04–0.06.</p>` },
    { type: 'code', lang: 'python', src: `import cv2, numpy as np

img  = cv2.imread('checkerboard.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32)

# --- Harris corner detection ---
harris = cv2.cornerHarris(gray, blockSize=2, ksize=3, k=0.04)
harris = cv2.dilate(harris, None)     # dilate for visibility

# Threshold and mark corners on the original image
thresh = 0.01 * harris.max()
img_copy = img.copy()
img_copy[harris > thresh] = [0, 0, 255]   # mark in red

# --- Shi-Tomasi (better than Harris for tracking) ---
corners = cv2.goodFeaturesToTrack(
    gray.astype(np.uint8), maxCorners=100,
    qualityLevel=0.01, minDistance=10)
if corners is not None:
    for c in np.int0(corners):
        x, y = c.ravel()
        cv2.circle(img, (x, y), 4, (0, 255, 0), -1)` },
    { type: 'tip', body: `<code>cv2.goodFeaturesToTrack</code> (Shi-Tomasi) is preferred over Harris for tracking applications like Lucas-Kanade optical flow. It selects up to <em>N</em> of the best corners with a minimum distance constraint, avoiding clusters of detections on the same feature.` },
    { type: 'text', body: `<h3>Sub-pixel Corner Refinement</h3>
<p>For accurate measurements (camera calibration, stereo matching), sub-pixel accuracy matters. <code>cv2.cornerSubPix</code> refines corner positions to sub-pixel precision using a local gradient-based iterative method.</p>` },
    { type: 'code', lang: 'python', src: `# Sub-pixel refinement
corners = cv2.goodFeaturesToTrack(gray.astype(np.uint8), 50, 0.01, 10)
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)
refined  = cv2.cornerSubPix(gray.astype(np.uint8), corners, (11,11), (-1,-1), criteria)
print(f'Coarse: {corners[0].ravel()}, Refined: {refined[0].ravel()}')` },
    { type: 'exercise', title: 'Detect and count corners on a chessboard', hint: 'Use cv2.findChessboardCorners for a direct solution, then compare with Shi-Tomasi count', solution: `import cv2
img  = cv2.imread('chessboard.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
ret, corners = cv2.findChessboardCorners(gray, (7, 7), None)
if ret:
    img = cv2.drawChessboardCorners(img, (7, 7), corners, ret)
    print(f'Found {len(corners)} inner corners')
cv2.imshow('Corners', img); cv2.waitKey(0)` }
  ]
};

L['cv-w2-l3'] = {
  title: 'SIFT, ORB & Feature Descriptors',
  sections: [
    { type: 'text', body: `<h2>Feature Descriptors</h2>
<p>A <em>keypoint</em> is a detected location in the image (with scale and orientation). A <em>descriptor</em> is a compact vector (typically 64 or 128 floats, or 256 bits) that encodes the local appearance around a keypoint, enabling matching across images.</p>
<h3>SIFT — Scale-Invariant Feature Transform</h3>
<p>SIFT (Lowe 2004) achieves scale invariance by detecting keypoints as extrema in a Difference-of-Gaussian (DoG) scale-space pyramid. Each keypoint gets an orientation from local gradient histograms. The 128-D descriptor encodes gradient histograms in a 4×4 grid of cells around the keypoint. SIFT is highly robust but slow. The patent expired in 2020, making it freely usable.</p>
<h3>ORB — Oriented FAST and Rotated BRIEF</h3>
<p>ORB combines the FAST keypoint detector with a rotation-invariant version of the BRIEF binary descriptor. It is ~100× faster than SIFT and open-source, making it the default choice for real-time applications.</p>` },
    { type: 'code', lang: 'python', src: `import cv2

img  = cv2.imread('building.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# --- SIFT ---
sift = cv2.SIFT_create(nfeatures=500)
kp_sift, desc_sift = sift.detectAndCompute(gray, None)
print(f'SIFT: {len(kp_sift)} keypoints, descriptor shape: {desc_sift.shape}')
# descriptor shape: (N, 128) float32

# --- ORB ---
orb = cv2.ORB_create(nfeatures=500)
kp_orb, desc_orb = orb.detectAndCompute(gray, None)
print(f'ORB:  {len(kp_orb)} keypoints, descriptor shape: {desc_orb.shape}')
# descriptor shape: (N, 32) uint8 — 256-bit binary descriptor

# --- Visualise keypoints ---
img_kp = cv2.drawKeypoints(img, kp_sift, None,
                            flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)` },
    { type: 'tip', body: `ORB descriptors are <strong>binary</strong> (uint8, Hamming distance). SIFT descriptors are <strong>float</strong> (L2 distance). Never mix distance metrics — use <code>cv2.NORM_HAMMING</code> for ORB and <code>cv2.NORM_L2</code> for SIFT in your BFMatcher.` },
    { type: 'text', body: `<h3>Other Descriptors at a Glance</h3>
<table>
  <tr><th>Descriptor</th><th>Type</th><th>Dims</th><th>Speed</th><th>Best For</th></tr>
  <tr><td>SIFT</td><td>Float</td><td>128</td><td>Slow</td><td>Accuracy-critical matching</td></tr>
  <tr><td>ORB</td><td>Binary</td><td>32 bytes</td><td>Very fast</td><td>Real-time, embedded</td></tr>
  <tr><td>AKAZE</td><td>Binary</td><td>61 bytes</td><td>Fast</td><td>Good scale+rotation invariance</td></tr>
  <tr><td>BRIEF</td><td>Binary</td><td>32 bytes</td><td>Fastest</td><td>No rotation invariance</td></tr>
</table>` },
    { type: 'exercise', title: 'Compare keypoint counts: SIFT vs ORB vs AKAZE', hint: 'Create each detector, run detectAndCompute, print counts and time each with time.perf_counter', solution: `import cv2, time
img  = cv2.imread('scene.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
detectors = [('SIFT', cv2.SIFT_create(500)),
             ('ORB',  cv2.ORB_create(500)),
             ('AKAZE',cv2.AKAZE_create())]
for name, det in detectors:
    t0 = time.perf_counter()
    kp, des = det.detectAndCompute(gray, None)
    dt = (time.perf_counter() - t0) * 1000
    print(f'{name:6s}: {len(kp):4d} kp, desc {des.shape}, {dt:.1f} ms')` }
  ]
};

L['cv-w2-l4'] = {
  title: 'Feature Matching & Homography',
  sections: [
    { type: 'text', body: `<h2>Matching Descriptors Between Images</h2>
<p>Given descriptors from two images, matching finds the closest descriptor in image B for each descriptor in image A. Two matchers:</p>
<ul>
  <li><strong>BFMatcher (Brute Force)</strong> — compares every pair; exact; slow for large sets. Good for ≤1000 keypoints.</li>
  <li><strong>FLANN (Fast Library for Approximate Nearest Neighbours)</strong> — approximate; much faster for large sets; recommended for SIFT.</li>
</ul>
<p><strong>Lowe's ratio test</strong> filters bad matches: keep a match only if the best match distance is less than 75% of the second-best distance. This eliminates ambiguous matches.</p>` },
    { type: 'code', lang: 'python', src: `import cv2

img1 = cv2.imread('img1.jpg', cv2.IMREAD_GRAYSCALE)
img2 = cv2.imread('img2.jpg', cv2.IMREAD_GRAYSCALE)

sift = cv2.SIFT_create()
kp1, d1 = sift.detectAndCompute(img1, None)
kp2, d2 = sift.detectAndCompute(img2, None)

# --- BFMatcher with Lowe's ratio test ---
bf = cv2.BFMatcher(cv2.NORM_L2, crossCheck=False)
raw_matches = bf.knnMatch(d1, d2, k=2)            # top-2 for ratio test

good = []
for m, n in raw_matches:
    if m.distance < 0.75 * n.distance:            # Lowe ratio test
        good.append(m)

print(f'{len(raw_matches)} raw → {len(good)} good matches')

# Draw matches
matched_img = cv2.drawMatchesKnn(
    img1, kp1, img2, kp2,
    [[m] for m in good], None,
    flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS)` },
    { type: 'code', lang: 'python', src: `import numpy as np

# --- Homography via RANSAC ---
# Need ≥4 good matches to estimate the 3×3 homography matrix
if len(good) >= 4:
    src_pts = np.float32([kp1[m.queryIdx].pt for m in good]).reshape(-1,1,2)
    dst_pts = np.float32([kp2[m.trainIdx].pt for m in good]).reshape(-1,1,2)

    H, mask = cv2.findHomography(src_pts, dst_pts,
                                  method=cv2.RANSAC,
                                  ransacReprojThreshold=5.0)
    inliers = mask.ravel().sum()
    print(f'Homography found: {inliers}/{len(good)} inliers')

    # Warp img1 onto img2's plane
    h, w = img2.shape
    warped = cv2.warpPerspective(img1, H, (w, h))` },
    { type: 'tip', body: `RANSAC randomly samples minimal sets (4 point correspondences for homography) and counts <em>consensus</em> (inliers). The key parameter is <code>ransacReprojThreshold</code> — the pixel reprojection error threshold. Use 3–5 px for calibrated cameras, 5–10 px for approximate scene stitching.` },
    { type: 'exercise', title: 'Build a simple panorama from two images', hint: 'Match SIFT → Homography → warpPerspective onto a wider canvas', solution: `import cv2, numpy as np
img1 = cv2.imread('left.jpg'); img2 = cv2.imread('right.jpg')
g1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
g2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
sift = cv2.SIFT_create()
k1,d1 = sift.detectAndCompute(g1,None)
k2,d2 = sift.detectAndCompute(g2,None)
bf = cv2.BFMatcher(cv2.NORM_L2)
good = [m for m,n in bf.knnMatch(d1,d2,k=2) if m.distance < 0.75*n.distance]
src = np.float32([k1[m.queryIdx].pt for m in good]).reshape(-1,1,2)
dst = np.float32([k2[m.trainIdx].pt for m in good]).reshape(-1,1,2)
H,_ = cv2.findHomography(src, dst, cv2.RANSAC, 5)
h,w = img2.shape[:2]
panorama = cv2.warpPerspective(img1, H, (w*2, h))
panorama[0:h, 0:w] = img2
cv2.imshow('Panorama', panorama); cv2.waitKey(0)` }
  ]
};

L['cv-w2-l5'] = {
  title: 'Image Segmentation — Thresholding, K-Means & Watershed',
  sections: [
    { type: 'text', body: `<h2>Image Segmentation Overview</h2>
<p>Segmentation partitions an image into meaningful regions. Classical methods include thresholding (intensity-based), clustering (colour-based), and watershed (topology-based).</p>
<h3>Thresholding</h3>
<ul>
  <li><strong>Global (binary)</strong> — single threshold T; pixels above T → foreground.</li>
  <li><strong>Otsu's method</strong> — automatically finds T by maximising inter-class variance; optimal for bimodal histograms.</li>
  <li><strong>Adaptive</strong> — computes T locally per neighbourhood; handles uneven lighting.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import cv2, numpy as np

gray = cv2.cvtColor(cv2.imread('document.jpg'), cv2.COLOR_BGR2GRAY)

# Global threshold
_, bin_thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)

# Otsu's automatic threshold
_, otsu = cv2.threshold(gray, 0, 255,
                         cv2.THRESH_BINARY + cv2.THRESH_OTSU)

# Adaptive threshold — handles shadows and uneven lighting
adaptive = cv2.adaptiveThreshold(
    gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv2.THRESH_BINARY, blockSize=11, C=2)` },
    { type: 'code', lang: 'python', src: `# --- K-Means colour segmentation ---
img = cv2.imread('landscape.jpg')
pixels = img.reshape(-1, 3).astype(np.float32)    # (H*W, 3)

K = 4
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 1.0)
_, labels, centres = cv2.kmeans(pixels, K, None, criteria,
                                 attempts=10, flags=cv2.KMEANS_PP_CENTERS)

# Reconstruct segmented image
centres = np.uint8(centres)
segmented = centres[labels.flatten()].reshape(img.shape)` },
    { type: 'code', lang: 'python', src: `# --- Watershed segmentation ---
img   = cv2.imread('coins.jpg')
gray  = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, th = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

# Noise removal
kernel  = np.ones((3,3), np.uint8)
opening = cv2.morphologyEx(th, cv2.MORPH_OPEN, kernel, iterations=2)

# Sure background
bg = cv2.dilate(opening, kernel, iterations=3)

# Sure foreground via distance transform
dist  = cv2.distanceTransform(opening, cv2.DIST_L2, 5)
_, fg = cv2.threshold(dist, 0.7 * dist.max(), 255, 0)
fg    = np.uint8(fg)

# Unknown region
unknown = cv2.subtract(bg, fg)

# Markers
_, markers = cv2.connectedComponents(fg)
markers += 1
markers[unknown == 255] = 0

markers = cv2.watershed(img, markers)
img[markers == -1] = [0, 0, 255]    # boundaries in red` },
    { type: 'tip', body: `Watershed is powerful but requires good <em>seed markers</em>. The distance-transform approach (threshold the DT peak to get foreground seeds, dilate for background seeds) gives robust markers for coin/cell counting. Avoid over-segmentation by tuning the foreground threshold (typically 0.5–0.7 × dist.max()).` }
  ]
};

/* ─── WEEK 3 — CNNs & Transfer Learning ────────────────────────────────── */

L['cv-w3-l1'] = {
  title: 'Convolutional Neural Networks — Theory & Architecture',
  sections: [
    { type: 'text', body: `<h2>Why Convolutions for Images?</h2>
<p>Fully-connected layers applied to images are impractical: a 224×224×3 image has 150,528 inputs; one FC layer with 1024 units needs 154M parameters. Convolutional layers exploit three inductive biases:</p>
<ul>
  <li><strong>Local connectivity</strong> — each output depends only on a small kernel-sized patch of input.</li>
  <li><strong>Weight sharing</strong> — the same filter is applied at every spatial position; a horizontal-edge detector works everywhere in the image.</li>
  <li><strong>Translation equivariance</strong> — shifting the input shifts the output by the same amount.</li>
</ul>
<h3>Key Concepts</h3>
<ul>
  <li><strong>Kernel / filter</strong> — a small (typically 3×3 or 5×5) learnable weight matrix.</li>
  <li><strong>Feature map</strong> — output of applying one filter across the entire input; encodes "where is this feature?".</li>
  <li><strong>Channels</strong> — depth dimension; each filter produces one channel; 64 filters → 64 feature map channels.</li>
  <li><strong>Padding</strong> — zeros appended around input to control output spatial size (<code>same</code> keeps size; <code>valid</code> shrinks it).</li>
  <li><strong>Stride</strong> — step size of the filter sliding; stride 2 halves spatial resolution.</li>
  <li><strong>Receptive field</strong> — the region of input that influences one output unit; grows with depth.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import torch
import torch.nn as nn

# Single conv layer: 1 input channel → 16 filters of 3×3
conv = nn.Conv2d(in_channels=1, out_channels=16,
                  kernel_size=3, stride=1, padding=1)
print(f'Parameters: {sum(p.numel() for p in conv.parameters())}')
# 1 * 16 * 3 * 3 + 16 bias = 160 params (vs. millions for FC)

# Mini CNN for MNIST-style (1x28x28 input)
class SmallCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 32, 3, padding=1), nn.ReLU(),
            nn.MaxPool2d(2),                            # 14×14
            nn.Conv2d(32, 64, 3, padding=1), nn.ReLU(),
            nn.MaxPool2d(2),                            # 7×7
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64 * 7 * 7, 128), nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(128, num_classes)
        )
    def forward(self, x): return self.classifier(self.features(x))

model = SmallCNN()
x = torch.randn(8, 1, 28, 28)          # batch of 8
print(model(x).shape)                   # torch.Size([8, 10])` },
    { type: 'tip', body: `Two stacked 3×3 conv layers cover the same 5×5 receptive field as one 5×5 layer but use 2×(9C²) = 18C² parameters vs. 25C² parameters, and introduce an extra non-linearity. This is why modern architectures almost exclusively use 3×3 kernels.` },
    { type: 'text', body: `<h3>Activation Functions in CNNs</h3>
<p><strong>ReLU</strong> (max(0, x)) is the default — it is computationally cheap, does not saturate for positive inputs, and empirically accelerates convergence. Variants:</p>
<ul>
  <li><strong>LeakyReLU</strong> — small negative slope (0.01) prevents dying ReLU.</li>
  <li><strong>GELU</strong> — smooth, non-monotonic; used in transformers and modern ConvNets.</li>
  <li><strong>SiLU / Swish</strong> — x · σ(x); used in EfficientNet and YOLOv8.</li>
</ul>` },
    { type: 'exercise', title: 'Compute output shape by hand, then verify in PyTorch', hint: 'out_size = floor((in_size + 2*pad - kernel) / stride) + 1', solution: `import torch, torch.nn as nn
# Conv2d(1,32, k=3, s=2, p=1) applied to 1x64x64
x = torch.randn(1, 1, 64, 64)
conv = nn.Conv2d(1, 32, kernel_size=3, stride=2, padding=1)
y = conv(x)
print(y.shape)   # expected: (1, 32, 32, 32)
# formula: out = floor((64 + 2*1 - 3) / 2) + 1 = floor(63/2)+1 = 32` }
  ]
};

L['cv-w3-l2'] = {
  title: 'Classic Architectures — LeNet, AlexNet & VGGNet',
  sections: [
    { type: 'text', body: `<h2>The Evolution of CNN Architectures</h2>
<p>Understanding classic architectures reveals the design decisions that underpin modern networks.</p>
<h3>LeNet-5 (1998)</h3>
<p>LeCun's LeNet was the first practical CNN for digit recognition. Architecture: Conv(6) → Pool → Conv(16) → Pool → FC(120) → FC(84) → Softmax(10). Used 5×5 kernels and average pooling. ~60K parameters.</p>
<h3>AlexNet (2012)</h3>
<p>Won ImageNet (ILSVRC 2012) with top-5 error 15.3% vs. runner-up 26.2% — a watershed moment. Key innovations: ReLU activations (vs. tanh), dropout (0.5) for regularisation, data augmentation (random crops, flips), and GPU training.</p>
<h3>VGGNet (2014)</h3>
<p>Very Deep Convolutional Networks (Simonyan & Zisserman). VGG-16 and VGG-19 used only 3×3 conv layers stacked deeply (16–19 layers), showing that depth with small kernels outperforms shallower networks with large kernels. 138M parameters — large but easy to understand.</p>` },
    { type: 'code', lang: 'python', src: `import torch
import torchvision.models as models

# --- Pre-built models from torchvision ---
alexnet = models.alexnet(weights='IMAGENET1K_V1')
vgg16   = models.vgg16(weights='IMAGENET1K_V1')

# Count parameters
def count_params(m):
    return sum(p.numel() for p in m.parameters()) / 1e6
print(f'AlexNet: {count_params(alexnet):.1f}M params')
print(f'VGG-16:  {count_params(vgg16):.1f}M params')` },
    { type: 'code', lang: 'python', src: `import torch.nn as nn

# --- LeNet-5 from scratch ---
class LeNet5(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 6, 5), nn.Tanh(), nn.AvgPool2d(2, 2),
            nn.Conv2d(6, 16, 5), nn.Tanh(), nn.AvgPool2d(2, 2),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(16*5*5, 120), nn.Tanh(),
            nn.Linear(120, 84),      nn.Tanh(),
            nn.Linear(84, num_classes)
        )
    def forward(self, x): return self.classifier(self.features(x))

lenet = LeNet5()
x = torch.randn(4, 1, 32, 32)
print(lenet(x).shape)   # (4, 10)` },
    { type: 'tip', body: `VGG's uniform 3×3 design makes it easy to reason about feature map sizes: each conv with padding=1 preserves spatial size; each maxpool(2,2) halves it. The pattern is [conv → conv → pool] × 5 + FC × 3. This regularity made VGG a go-to feature extractor for years.` },
    { type: 'text', body: `<h3>The Vanishing Gradient Problem</h3>
<p>Both AlexNet and VGG struggled beyond ~19 layers. Adding more layers caused training accuracy to <em>degrade</em> — not from overfitting but because gradients vanished through many sigmoid/tanh activations during backpropagation. This motivated the ResNet residual connection (Week 3, Lesson 3).</p>` }
  ]
};

L['cv-w3-l3'] = {
  title: 'Modern Architectures — ResNet, Inception & EfficientNet',
  sections: [
    { type: 'text', body: `<h2>ResNet — Residual Networks (2015)</h2>
<p>He et al. introduced skip connections (shortcut connections) that add the input of a block directly to its output: <code>y = F(x) + x</code>. The network learns the <em>residual</em> F(x) = H(x) − x rather than the full mapping H(x). This allows:</p>
<ul>
  <li>Identity gradients to flow directly to early layers — no vanishing gradient.</li>
  <li>Training networks of 50, 101, even 152+ layers.</li>
  <li>If a block is not useful, F(x) → 0 and the block becomes an identity — graceful degradation.</li>
</ul>
<h3>Inception / GoogLeNet (2014)</h3>
<p>Inception modules use parallel branches (1×1, 3×3, 5×5 conv, and pooling) and concatenate their outputs. The key insight: 1×1 convolutions act as dimensionality reduction (<em>bottleneck</em>) before expensive 3×3/5×5 convolutions, drastically reducing parameters.</p>
<h3>EfficientNet (2019)</h3>
<p>Systematically scales width, depth, and resolution together via a <em>compound scaling coefficient</em> φ. EfficientNet-B0 through B7 cover a wide accuracy-efficiency tradeoff and dominated ImageNet leaderboards for several years.</p>` },
    { type: 'code', lang: 'python', src: `import torchvision.models as models, torch

# --- ResNet family ---
resnet50  = models.resnet50(weights='IMAGENET1K_V2')   # 25M params, 80.9% top-1
resnet18  = models.resnet18(weights='IMAGENET1K_V1')   # 11M params, 69.8% top-1

# Inspect the layer structure
print(resnet50.layer1)    # BasicBlock / Bottleneck stacks

# --- EfficientNet via timm (Py-Torch Image Models) ---
import timm
model = timm.create_model('efficientnet_b0', pretrained=True, num_classes=1000)
x = torch.randn(2, 3, 224, 224)
print(model(x).shape)    # (2, 1000)

# List all available timm models
all_models = timm.list_models('efficientnet*')
print(all_models[:5])` },
    { type: 'code', lang: 'python', src: `import torch.nn as nn

# --- Minimal ResNet bottleneck block ---
class Bottleneck(nn.Module):
    expansion = 4
    def __init__(self, in_ch, mid_ch):
        super().__init__()
        out_ch = mid_ch * self.expansion
        self.conv1 = nn.Conv2d(in_ch, mid_ch, 1, bias=False)
        self.bn1   = nn.BatchNorm2d(mid_ch)
        self.conv2 = nn.Conv2d(mid_ch, mid_ch, 3, padding=1, bias=False)
        self.bn2   = nn.BatchNorm2d(mid_ch)
        self.conv3 = nn.Conv2d(mid_ch, out_ch, 1, bias=False)
        self.bn3   = nn.BatchNorm2d(out_ch)
        self.relu  = nn.ReLU(inplace=True)
        self.skip  = (nn.Sequential(nn.Conv2d(in_ch, out_ch, 1, bias=False),
                                    nn.BatchNorm2d(out_ch))
                      if in_ch != out_ch else nn.Identity())

    def forward(self, x):
        out = self.relu(self.bn1(self.conv1(x)))
        out = self.relu(self.bn2(self.conv2(out)))
        out = self.bn3(self.conv3(out))
        return self.relu(out + self.skip(x))   # residual addition` },
    { type: 'tip', body: `For practical transfer learning, prefer <strong>ResNet-50</strong> as the default backbone — it balances accuracy (80.9% ImageNet top-1), parameter count (25M), and ecosystem support (torchvision, timm, detectron2, MMDetection all use it). Switch to EfficientNet-B4/B5 if you need better accuracy at similar compute, or ResNet-18 for edge devices.` }
  ]
};

L['cv-w3-l4'] = {
  title: 'Transfer Learning & Fine-Tuning with PyTorch',
  sections: [
    { type: 'text', body: `<h2>Transfer Learning Strategies</h2>
<p>A model pretrained on ImageNet (1.28M images, 1000 classes) has learned rich, general features: edges, textures, object parts. These transfer well to new tasks. The two main strategies:</p>
<ul>
  <li><strong>Feature extraction</strong> — Freeze all backbone weights; replace and train only the classification head. Fast; best when your dataset is small and similar to ImageNet.</li>
  <li><strong>Fine-tuning</strong> — Unfreeze some or all backbone layers and train end-to-end at a low learning rate. Better accuracy; needs more data; risk of catastrophic forgetting if LR is too high.</li>
</ul>
<p>Common heuristic: freeze early layers (generic features), fine-tune later layers (task-specific features).</p>` },
    { type: 'code', lang: 'python', src: `import torch
import torch.nn as nn
import torchvision.models as models

NUM_CLASSES = 5

# --- Feature extraction (frozen backbone) ---
model = models.resnet50(weights='IMAGENET1K_V2')
for param in model.parameters():
    param.requires_grad = False                     # freeze all

# Replace final FC layer
model.fc = nn.Linear(model.fc.in_features, NUM_CLASSES)
# Only model.fc params have requires_grad=True

trainable = [p for p in model.parameters() if p.requires_grad]
print(f'Trainable params: {sum(p.numel() for p in trainable):,}')  # ~2000` },
    { type: 'code', lang: 'python', src: `# --- Fine-tuning (unfreeze last block + FC) ---
model = models.resnet50(weights='IMAGENET1K_V2')
model.fc = nn.Linear(model.fc.in_features, NUM_CLASSES)

# Freeze all, then unfreeze layer4 + fc
for param in model.parameters():
    param.requires_grad = False
for param in model.layer4.parameters():
    param.requires_grad = True
for param in model.fc.parameters():
    param.requires_grad = True

# Differential learning rates: small LR for backbone, large for head
optimizer = torch.optim.AdamW([
    {'params': model.layer4.parameters(), 'lr': 1e-4},
    {'params': model.fc.parameters(),     'lr': 1e-3},
])` },
    { type: 'code', lang: 'python', src: `from torch.utils.data import DataLoader
import torchvision.transforms as T

transform_train = T.Compose([
    T.RandomResizedCrop(224), T.RandomHorizontalFlip(),
    T.ColorJitter(0.2, 0.2, 0.2),
    T.ToTensor(),
    T.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])
])
transform_val = T.Compose([
    T.Resize(256), T.CenterCrop(224), T.ToTensor(),
    T.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])
])

def train_epoch(model, loader, optimizer, criterion, device):
    model.train()
    total_loss, correct = 0, 0
    for imgs, labels in loader:
        imgs, labels = imgs.to(device), labels.to(device)
        optimizer.zero_grad()
        out  = model(imgs)
        loss = criterion(out, labels)
        loss.backward()
        optimizer.step()
        total_loss += loss.item() * imgs.size(0)
        correct    += (out.argmax(1) == labels).sum().item()
    return total_loss / len(loader.dataset), correct / len(loader.dataset)` },
    { type: 'tip', body: `Always train with a <strong>learning rate scheduler</strong>. <code>torch.optim.lr_scheduler.CosineAnnealingLR</code> is a strong default: the LR decreases smoothly from the initial value to near zero over the training budget, avoiding the need to manually tune LR decay steps.` },
    { type: 'exercise', title: 'Fine-tune ResNet-18 on a custom 3-class dataset', hint: 'Use torchvision.datasets.ImageFolder with train/val directories', solution: `import torch, torchvision
from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader
device = 'cuda' if torch.cuda.is_available() else 'cpu'
tf = transforms.Compose([transforms.Resize((224,224)),transforms.ToTensor(),
     transforms.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])])
train_ds = datasets.ImageFolder('data/train', transform=tf)
val_ds   = datasets.ImageFolder('data/val',   transform=tf)
train_dl = DataLoader(train_ds, 32, shuffle=True)
val_dl   = DataLoader(val_ds,   32)
model = models.resnet18(weights='IMAGENET1K_V1')
model.fc = torch.nn.Linear(512, len(train_ds.classes))
model = model.to(device)
opt = torch.optim.AdamW(model.parameters(), lr=1e-3)
crit = torch.nn.CrossEntropyLoss()
for epoch in range(5):
    model.train()
    for x,y in train_dl:
        x,y=x.to(device),y.to(device); opt.zero_grad()
        loss=crit(model(x),y); loss.backward(); opt.step()
    print(f'Epoch {epoch+1} done')` }
  ]
};

L['cv-w3-l5'] = {
  title: 'Data Augmentation Strategies',
  sections: [
    { type: 'text', body: `<h2>Why Augmentation?</h2>
<p>Deep CV models are data-hungry. Overfitting on small datasets is the rule, not the exception. Data augmentation artificially expands the training distribution by applying <em>label-preserving transformations</em> — transformations that change pixel values but do not change the class label (a flipped cat is still a cat).</p>
<p>Augmentation also acts as a regulariser: the model cannot memorise exact training images because it sees a different (randomly transformed) view each epoch.</p>
<h3>Standard Augmentations</h3>
<ul>
  <li><strong>Spatial</strong> — random crop, horizontal/vertical flip, rotation, shear, elastic distortion.</li>
  <li><strong>Colour</strong> — brightness, contrast, saturation, hue jitter; grayscale conversion; channel shuffle.</li>
  <li><strong>Regularisation</strong> — Cutout (random rectangle erased), Dropout on pixels.</li>
  <li><strong>Advanced mixing</strong> — MixUp (linear combination of two images and labels), CutMix (paste a random crop of image B into image A, mix labels proportionally to area).</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# pip install albumentations
import albumentations as A
from albumentations.pytorch import ToTensorV2
import cv2, numpy as np

train_transform = A.Compose([
    A.RandomResizedCrop(height=224, width=224, scale=(0.6, 1.0)),
    A.HorizontalFlip(p=0.5),
    A.ColorJitter(brightness=0.3, contrast=0.3,
                  saturation=0.3, hue=0.05, p=0.8),
    A.GaussNoise(var_limit=(5, 30), p=0.3),
    A.Blur(blur_limit=3, p=0.2),
    A.CoarseDropout(max_holes=8, max_height=32, max_width=32,
                    fill_value=0, p=0.4),      # Cutout
    A.Normalize(mean=(0.485,0.456,0.406), std=(0.229,0.224,0.225)),
    ToTensorV2()
])

# Apply to a single image (H,W,C) numpy uint8
image = cv2.cvtColor(cv2.imread('photo.jpg'), cv2.COLOR_BGR2RGB)
result = train_transform(image=image)
tensor = result['image']   # torch.Tensor (3, 224, 224)` },
    { type: 'code', lang: 'python', src: `# --- CutMix (mix two training examples) ---
import torch

def cutmix(images, labels, num_classes, alpha=1.0):
    lam = np.random.beta(alpha, alpha)
    b, c, h, w = images.shape
    idx = torch.randperm(b)
    cut_h = int(h * np.sqrt(1 - lam))
    cut_w = int(w * np.sqrt(1 - lam))
    cx = np.random.randint(w)
    cy = np.random.randint(h)
    x1, x2 = np.clip([cx - cut_w//2, cx + cut_w//2], 0, w)
    y1, y2 = np.clip([cy - cut_h//2, cy + cut_h//2], 0, h)
    images[:, :, y1:y2, x1:x2] = images[idx, :, y1:y2, x1:x2]
    lam_real = 1 - (x2-x1)*(y2-y1) / (h*w)
    labels_a = torch.nn.functional.one_hot(labels, num_classes).float()
    labels_b = torch.nn.functional.one_hot(labels[idx], num_classes).float()
    mixed_labels = lam_real * labels_a + (1 - lam_real) * labels_b
    return images, mixed_labels` },
    { type: 'tip', body: `For object detection, use albumentations' <code>BboxParams</code> to automatically transform bounding boxes alongside the image — flips, crops, and rotations update box coordinates correctly. This is a major advantage over torchvision transforms for detection pipelines.` },
    { type: 'exercise', title: 'Visualise 8 augmented views of one image', hint: 'Run the albumentations pipeline 8 times on the same image, plot with matplotlib', solution: `import albumentations as A, cv2, numpy as np, matplotlib.pyplot as plt
aug = A.Compose([A.RandomResizedCrop(224,224), A.HorizontalFlip(0.5),
                  A.ColorJitter(0.3,0.3,0.3,0.05,p=0.8),
                  A.CoarseDropout(4,32,32,p=0.5)])
img = cv2.cvtColor(cv2.imread('photo.jpg'), cv2.COLOR_BGR2RGB)
fig, axes = plt.subplots(2, 4, figsize=(14,7))
for ax in axes.flat:
    ax.imshow(aug(image=img)['image']); ax.axis('off')
plt.tight_layout(); plt.show()` }
  ]
};

/* ─── WEEK 4 — Object Detection ─────────────────────────────────────────── */

L['cv-w4-l1'] = {
  title: 'Object Detection Fundamentals — Bounding Boxes, IoU & NMS',
  sections: [
    { type: 'text', body: `<h2>From Classification to Detection</h2>
<p>Object detection simultaneously answers <em>what</em> objects are present and <em>where</em> they are, represented as axis-aligned bounding boxes (x₁, y₁, x₂, y₂) + class label + confidence score. Unlike classification, an image can contain multiple objects at various scales.</p>
<h3>Bounding Box Formats</h3>
<ul>
  <li><code>[x1, y1, x2, y2]</code> — corner format (COCO, torchvision).</li>
  <li><code>[cx, cy, w, h]</code> — centre format (YOLO). cx, cy are box centre; w, h are dimensions.</li>
  <li>Both can be normalised to [0, 1] by dividing by image width/height (YOLO default).</li>
</ul>
<h3>Intersection over Union (IoU)</h3>
<p>IoU measures overlap between a predicted box and a ground-truth box. IoU = Area(Intersection) / Area(Union). Perfect match = 1.0; no overlap = 0.0. Standard detection threshold: IoU ≥ 0.5 is a True Positive (PASCAL VOC), ≥ 0.5:0.95 (COCO mAP).</p>` },
    { type: 'code', lang: 'python', src: `import numpy as np

def iou(box1, box2):
    """box format: [x1, y1, x2, y2]"""
    xi1 = max(box1[0], box2[0]); yi1 = max(box1[1], box2[1])
    xi2 = min(box1[2], box2[2]); yi2 = min(box1[3], box2[3])
    inter = max(0, xi2 - xi1) * max(0, yi2 - yi1)
    area1 = (box1[2]-box1[0]) * (box1[3]-box1[1])
    area2 = (box2[2]-box2[0]) * (box2[3]-box2[1])
    return inter / (area1 + area2 - inter + 1e-6)

# Example
pred = [50, 80, 200, 220]
gt   = [60, 90, 210, 230]
print(f'IoU = {iou(pred, gt):.3f}')   # ≈ 0.77` },
    { type: 'code', lang: 'python', src: `def nms(boxes, scores, iou_threshold=0.5):
    """
    Greedy NMS — keep the highest-score box, suppress overlapping ones.
    boxes: (N, 4) numpy array [x1,y1,x2,y2]
    scores: (N,) numpy array of confidence scores
    """
    order = scores.argsort()[::-1]   # sort by descending score
    keep  = []
    while order.size > 0:
        i = order[0]
        keep.append(i)
        remaining = order[1:]
        if not remaining.size:
            break
        ious = np.array([iou(boxes[i], boxes[j]) for j in remaining])
        order = remaining[ious < iou_threshold]   # keep non-overlapping
    return keep

# Example: 4 overlapping boxes
boxes  = np.array([[10,10,50,50],[12,12,52,52],[11,11,51,51],[80,80,120,120]])
scores = np.array([0.9, 0.75, 0.6, 0.85])
kept   = nms(boxes, scores, 0.5)
print(f'Kept indices: {kept}')   # [0, 3]` },
    { type: 'tip', body: `Soft-NMS (Bodla et al. 2017) is a drop-in improvement over hard NMS: instead of suppressing overlapping boxes entirely, it decays their scores as a Gaussian function of IoU. This helps when two objects are genuinely close together (e.g. two pedestrians side by side) where hard NMS would incorrectly suppress the lower-score but real detection.` },
    { type: 'text', body: `<h3>Anchor Boxes</h3>
<p>Two-stage and single-stage detectors (RPN, SSD, YOLO v1-v5) use pre-defined <em>anchor boxes</em> — a set of reference boxes at each grid position with different aspect ratios and scales. The detector predicts offsets (Δx, Δy, Δw, Δh) from each anchor to the nearest ground-truth box, rather than predicting box coordinates from scratch. YOLOv8 and newer anchor-free detectors (FCOS, CenterNet) predict the box centre and size directly without anchors.</p>` }
  ]
};

L['cv-w4-l2'] = {
  title: 'Region-Based Detectors — R-CNN, Fast R-CNN & Faster R-CNN',
  sections: [
    { type: 'text', body: `<h2>The R-CNN Family</h2>
<p>Two-stage detectors first propose candidate regions, then classify each region. They traded speed for accuracy, dominating leaderboards from 2014–2017.</p>
<h3>R-CNN (2014)</h3>
<ol>
  <li>Selective Search proposes ~2000 region proposals per image.</li>
  <li>Each proposal is warped to 227×227 and passed through a CNN (AlexNet) independently.</li>
  <li>SVM classifies features; separate regressor refines box coordinates.</li>
</ol>
<p>Problem: 2000 forward passes per image → ~47 seconds per image at test time.</p>
<h3>Fast R-CNN (2015)</h3>
<p>Key insight: run the CNN <em>once</em> on the entire image to get a feature map, then project each proposal onto the feature map. <strong>RoI Pooling</strong> extracts a fixed-size feature vector per region. All components (classifier + regressor) share one CNN. Speed: ~0.3s per image.</p>
<h3>Faster R-CNN (2015)</h3>
<p>Replaces Selective Search with a <strong>Region Proposal Network (RPN)</strong> — a small CNN that slides over the backbone feature map and predicts objectness scores and bounding box offsets at each anchor. The RPN and detection head share the same backbone, making the entire pipeline end-to-end trainable. Speed: ~0.2s per image (VGG-16).</p>` },
    { type: 'code', lang: 'python', src: `import torch
import torchvision
from torchvision.models.detection import fasterrcnn_resnet50_fpn, FasterRCNN_ResNet50_FPN_Weights

# Load pretrained Faster R-CNN (ResNet-50 + FPN backbone, COCO-trained)
model = fasterrcnn_resnet50_fpn(
    weights=FasterRCNN_ResNet50_FPN_Weights.COCO_V1
)
model.eval()

# Inference on a single image
from torchvision.io import read_image
from torchvision.transforms.functional import to_dtype
img  = read_image('street.jpg')
img  = to_dtype(img, torch.float32, scale=True)   # (3, H, W) in [0,1]

with torch.no_grad():
    predictions = model([img])                     # list of dicts

pred = predictions[0]
print(pred.keys())     # boxes, labels, scores
high_conf = pred['scores'] > 0.7
print(f'Objects detected: {high_conf.sum().item()}')
print(pred['boxes'][high_conf])
print(pred['labels'][high_conf])` },
    { type: 'code', lang: 'python', src: `# --- Fine-tune Faster R-CNN on a custom dataset ---
import torchvision
from torchvision.models.detection import fasterrcnn_resnet50_fpn
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor

NUM_CLASSES = 3   # background + 2 object classes

model = fasterrcnn_resnet50_fpn(weights='COCO_V1')
# Replace the classifier head
in_features = model.roi_heads.box_predictor.cls_score.in_features
model.roi_heads.box_predictor = FastRCNNPredictor(in_features, NUM_CLASSES)

# Training setup
params = [p for p in model.parameters() if p.requires_grad]
optimizer = torch.optim.SGD(params, lr=0.005, momentum=0.9, weight_decay=5e-4)
scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=3, gamma=0.1)` },
    { type: 'tip', body: `Faster R-CNN expects images as a list of float tensors in [0, 1] and targets as a list of dicts with <code>'boxes'</code> (FloatTensor[N,4] in xyxy format) and <code>'labels'</code> (Int64Tensor[N]). Background is class 0 — your actual class indices start at 1.` }
  ]
};

L['cv-w4-l3'] = {
  title: 'YOLO — You Only Look Once (v5 to v8)',
  sections: [
    { type: 'text', body: `<h2>YOLO Architecture</h2>
<p>YOLO (Redmon et al. 2016) reframed detection as a single regression problem. Instead of proposing regions, it divides the image into an S×S grid and, for each cell, directly predicts B bounding boxes and C class probabilities in a single forward pass. This enables real-time speeds (45 FPS for YOLO v1 vs. ≤5 FPS for Faster R-CNN).</p>
<h3>Evolution of YOLO</h3>
<ul>
  <li><strong>v1–v3</strong> — Darknet-based, anchor boxes introduced in v2, multi-scale predictions in v3.</li>
  <li><strong>YOLOv5</strong> (Ultralytics, 2020) — PyTorch rewrite; fast training pipeline; CSP backbone; excellent documentation.</li>
  <li><strong>YOLOv8</strong> (Ultralytics, 2023) — anchor-free; decoupled head (separate classification and regression branches); C2f bottleneck; native support for detect, segment, pose, track, classify.</li>
</ul>
<p>YOLOv8 is the current Ultralytics recommendation and the focus of this lesson.</p>` },
    { type: 'code', lang: 'bash', src: `pip install ultralytics` },
    { type: 'code', lang: 'python', src: `from ultralytics import YOLO
import cv2

# --- Inference with pretrained YOLOv8n (nano) ---
model = YOLO('yolov8n.pt')        # downloads 6MB model automatically

results = model('street.jpg')     # can pass path, URL, numpy, tensor
for r in results:
    print(r.boxes.xyxy)           # (N, 4) bounding boxes
    print(r.boxes.cls)            # (N,)   class indices
    print(r.boxes.conf)           # (N,)   confidence scores
    annotated = r.plot()          # numpy BGR with boxes drawn
    cv2.imshow('YOLOv8', annotated); cv2.waitKey(0)

# Batch inference
results = model(['img1.jpg', 'img2.jpg', 'img3.jpg'])

# Video inference
results = model('video.mp4', stream=True)   # lazy generator
for r in results:
    cv2.imshow('Frame', r.plot()); cv2.waitKey(1)` },
    { type: 'code', lang: 'python', src: `# --- Training YOLOv8 on a custom dataset ---
# Dataset must be in YOLO format:
# dataset/
#   images/train/, images/val/
#   labels/train/, labels/val/    ← .txt files: cls cx cy w h (normalised)
# data.yaml: nc, names, train/val paths

model = YOLO('yolov8s.pt')    # start from pretrained small model

results = model.train(
    data='data.yaml',
    epochs=50,
    imgsz=640,
    batch=16,
    device=0,                  # GPU index, or 'cpu'
    workers=4,
    patience=10,               # early stopping
    project='runs/detect',
    name='custom_v1',
)

# Evaluate
metrics = model.val(data='data.yaml')
print(metrics.box.map)         # mAP@0.5:0.95
print(metrics.box.map50)       # mAP@0.5

# Export to ONNX for deployment
model.export(format='onnx', dynamic=True, simplify=True)` },
    { type: 'tip', body: `YOLOv8 model variants: <strong>n</strong> (nano, 3.2M params), <strong>s</strong> (small, 11M), <strong>m</strong> (medium, 25M), <strong>l</strong> (large, 43M), <strong>x</strong> (xlarge, 68M). Start with YOLOv8s for custom training — it provides a good accuracy/speed balance and overfits less than larger variants on small datasets.` }
  ]
};

L['cv-w4-l4'] = {
  title: 'SSD & RetinaNet — Focal Loss & Feature Pyramid Networks',
  sections: [
    { type: 'text', body: `<h2>SSD — Single Shot MultiBox Detector (2016)</h2>
<p>SSD produces detections from multiple feature maps at different scales within a single forward pass. Each feature map cell predicts boxes with multiple default (anchor) aspect ratios. The key improvement over YOLO v1: by using shallow feature maps for large objects and deep maps for small objects, SSD handles multi-scale objects better. Speed: ~59 FPS on a Titan X.</p>
<h3>The Class Imbalance Problem</h3>
<p>Single-stage detectors evaluate thousands of anchor boxes per image, but only a handful correspond to actual objects. The vast majority are "easy negatives" (background). Training on all anchors equally is dominated by these easy negatives — the model learns to predict background without learning to detect objects.</p>
<p>SSD addressed this with <em>Hard Negative Mining</em> (3:1 negative-to-positive ratio). RetinaNet (2017) solved it more elegantly with <strong>Focal Loss</strong>.</p>
<h3>Focal Loss</h3>
<p>FL(p_t) = −(1 − p_t)^γ · log(p_t), where γ (gamma, typically 2.0) is the focusing parameter. For well-classified easy examples p_t → 1, the factor (1 − p_t)^γ → 0, down-weighting their contribution. Hard examples remain near their standard cross-entropy loss. This automatically shifts training focus to hard examples without explicit sampling.</p>` },
    { type: 'code', lang: 'python', src: `import torch, torch.nn.functional as F

def focal_loss(logits, targets, gamma=2.0, alpha=0.25):
    """
    logits: (N, C) raw class scores
    targets: (N,) integer class labels
    """
    ce   = F.cross_entropy(logits, targets, reduction='none')  # (N,)
    p_t  = torch.exp(-ce)                                       # probability of correct class
    loss = alpha * (1 - p_t) ** gamma * ce
    return loss.mean()

# Quick test
logits  = torch.randn(32, 10)
targets = torch.randint(0, 10, (32,))
print(focal_loss(logits, targets).item())` },
    { type: 'text', body: `<h3>Feature Pyramid Network (FPN)</h3>
<p>FPN (Lin et al. 2017) adds a <em>top-down pathway</em> to a standard CNN backbone. High-level semantic feature maps (small, deep) are upsampled and merged with high-resolution spatial feature maps (large, shallow) via lateral connections. The result: multi-scale feature maps that are both semantically rich AND spatially precise — ideal for detecting objects at all sizes.</p>
<p>FPN is now used in almost every modern detector: Faster R-CNN + FPN, RetinaNet, YOLOv5/v8's neck (PANet variant of FPN), Mask R-CNN, DETR, and more.</p>` },
    { type: 'code', lang: 'python', src: `import torchvision
from torchvision.models.detection import retinanet_resnet50_fpn, RetinaNet_ResNet50_FPN_Weights

model = retinanet_resnet50_fpn(
    weights=RetinaNet_ResNet50_FPN_Weights.COCO_V1
)
model.eval()

from torchvision.io import read_image
from torchvision.transforms.functional import to_dtype
img = read_image('img.jpg')
img = to_dtype(img, torch.float32, scale=True)

import torch
with torch.no_grad():
    pred = model([img])[0]
print(pred['scores'][:5])` },
    { type: 'tip', body: `RetinaNet with a ResNet-50-FPN backbone achieves ~36.4 mAP on COCO at 5 FPS. It is a strong, well-understood baseline for custom detection projects when you need higher accuracy than YOLO and can tolerate slower inference. Use it via torchvision's <code>retinanet_resnet50_fpn</code> — the focal loss is built into the loss head automatically.` }
  ]
};

L['cv-w4-l5'] = {
  title: 'Evaluating Object Detectors — mAP & Precision-Recall Curves',
  sections: [
    { type: 'text', body: `<h2>Detection Evaluation Metrics</h2>
<p>Evaluating detection models is more complex than classification because both localisation accuracy and classification accuracy matter.</p>
<h3>Precision & Recall at a Threshold</h3>
<ul>
  <li>A detection is a <strong>True Positive (TP)</strong> if its IoU with a ground-truth box exceeds the threshold AND the class is correct AND that ground-truth box is not already matched.</li>
  <li>A detection with no matching GT box is a <strong>False Positive (FP)</strong>.</li>
  <li>A GT box with no matching detection is a <strong>False Negative (FN)</strong>.</li>
  <li>Precision = TP / (TP + FP); Recall = TP / (TP + FN).</li>
</ul>
<h3>Average Precision (AP)</h3>
<p>AP is the area under the Precision-Recall curve, computed by sorting detections by confidence score and sweeping the threshold. mAP = mean AP across all classes.</p>
<h3>COCO vs. VOC Metrics</h3>
<ul>
  <li><strong>PASCAL VOC</strong>: mAP@0.5 (IoU threshold = 0.5).</li>
  <li><strong>COCO</strong>: mAP@0.5:0.95 = average of mAP at IoU thresholds 0.5, 0.55, ..., 0.95. Harder — rewards precise localisation.</li>
  <li>COCO also reports AP_S, AP_M, AP_L (small/medium/large objects).</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# pip install torchmetrics
from torchmetrics.detection.mean_ap import MeanAveragePrecision
import torch

metric = MeanAveragePrecision(iou_type='bbox', iou_thresholds=[0.5, 0.75])

# predictions and targets must be lists of dicts
preds = [{'boxes':  torch.tensor([[10,20,80,90],[150,50,200,120]],dtype=torch.float),
           'scores': torch.tensor([0.9, 0.7]),
           'labels': torch.tensor([0, 1])}]
target = [{'boxes':  torch.tensor([[12,22,82,92],[155,55,205,125]],dtype=torch.float),
            'labels': torch.tensor([0, 1])}]

metric.update(preds, target)
result = metric.compute()
print(f"mAP@0.5:   {result['map_50']:.4f}")
print(f"mAP@0.75:  {result['map_75']:.4f}")
print(f"mAP@.5:.95:{result['map']:.4f}")` },
    { type: 'code', lang: 'python', src: `# --- Plot Precision-Recall curve manually ---
import numpy as np, matplotlib.pyplot as plt

def compute_pr_curve(all_scores, all_tp, total_gt):
    """Compute P-R curve across confidence thresholds."""
    order  = np.argsort(-all_scores)            # descending confidence
    tp_cum = np.cumsum(all_tp[order])
    fp_cum = np.cumsum(1 - all_tp[order])
    precision = tp_cum / (tp_cum + fp_cum + 1e-8)
    recall    = tp_cum / total_gt
    return precision, recall

# Example dummy data
scores = np.array([0.95, 0.87, 0.78, 0.65, 0.6, 0.5, 0.4])
tp     = np.array([1, 1, 0, 1, 0, 1, 0])
prec, rec = compute_pr_curve(scores, tp, total_gt=4)
ap = np.trapz(prec[::-1], rec[::-1])
plt.plot(rec, prec, marker='.'); plt.xlabel('Recall'); plt.ylabel('Precision')
plt.title(f'PR Curve — AP = {ap:.3f}'); plt.show()` },
    { type: 'tip', body: `When comparing detectors, always report the same metric on the same benchmark dataset (COCO val2017 is standard). mAP@0.5:0.95 on COCO is the hardest and most informative. If your application is time-sensitive, always plot the speed-accuracy tradeoff (mAP vs. FPS) rather than reporting accuracy alone.` },
    { type: 'exercise', title: 'Compute mAP on a YOLOv8 custom model', hint: 'Use model.val() with your data.yaml — it returns a Metrics object with .box.map, .box.map50', solution: `from ultralytics import YOLO
model = YOLO('runs/detect/custom_v1/weights/best.pt')
metrics = model.val(data='data.yaml', imgsz=640, batch=16, conf=0.001, iou=0.6)
print(f"mAP@0.5:     {metrics.box.map50:.4f}")
print(f"mAP@0.5:0.95:{metrics.box.map:.4f}")
print(f"Precision:   {metrics.box.mp:.4f}")
print(f"Recall:      {metrics.box.mr:.4f}")` }
  ]
};


/* ─── WEEK 5 — Segmentation ─────────────────────────────────────────────── */

L['cv-w5-l1'] = {
  title: 'Semantic Segmentation — FCN & U-Net',
  sections: [
    { type: 'text', body: `<h2>Semantic Segmentation</h2>
<p>Semantic segmentation assigns a class label to <em>every pixel</em> in the image. Unlike detection, it gives dense predictions with no notion of individual instances — two adjacent cars of the same class get the same label colour.</p>
<h3>Fully Convolutional Networks (FCN)</h3>
<p>Long et al. (2015) replaced the fully-connected layers of VGG with 1×1 convolutions and added transposed convolutions (deconvolutions) to upsample back to input resolution. Skip connections from earlier layers improved boundary sharpness (FCN-8s uses stride-8 predictions from pool3 + pool4 + fc7).</p>
<h3>U-Net</h3>
<p>Ronneberger et al. (2015) introduced U-Net for biomedical image segmentation. The architecture: a contracting path (encoder, standard conv+pool), a bottleneck, and an expansive path (decoder) that uses transposed convolutions. Crucially, each decoder stage <strong>concatenates</strong> the corresponding encoder feature map — recovering fine spatial detail lost during downsampling. U-Net trains well on very small datasets (tens to hundreds of images) with augmentation.</p>` },
    { type: 'code', lang: 'python', src: `import torch, torch.nn as nn, torch.nn.functional as F

class DoubleConv(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, padding=1, bias=False),
            nn.BatchNorm2d(out_ch), nn.ReLU(inplace=True),
            nn.Conv2d(out_ch, out_ch, 3, padding=1, bias=False),
            nn.BatchNorm2d(out_ch), nn.ReLU(inplace=True),
        )
    def forward(self, x): return self.net(x)

class UNet(nn.Module):
    def __init__(self, in_ch=3, num_classes=2, features=[64,128,256,512]):
        super().__init__()
        self.downs = nn.ModuleList([DoubleConv(i, o)
                                    for i, o in zip([in_ch]+features[:-1], features)])
        self.pool = nn.MaxPool2d(2)
        self.bottleneck = DoubleConv(features[-1], features[-1]*2)
        self.ups_t = nn.ModuleList([nn.ConvTranspose2d(features[-1]*2 // (2**i),
                                                        features[-1] // (2**i), 2, 2)
                                    for i in range(len(features))])
        self.ups_c = nn.ModuleList([DoubleConv(features[-1] // (2**i) * 2 + features[-1]*2 // (2**(i+1)),
                                               features[-1] // (2**i))
                                    for i in range(len(features))])
        # Simpler standard U-Net
        self.head = nn.Conv2d(features[0], num_classes, 1)

    def forward(self, x):
        skips = []
        for down in self.downs:
            x = down(x); skips.append(x); x = self.pool(x)
        x = self.bottleneck(x)
        for skip, t, c in zip(reversed(skips),
                               reversed(self.ups_t),
                               reversed(self.ups_c)):
            x = t(x)
            if x.shape != skip.shape:
                x = F.interpolate(x, skip.shape[2:])
            x = c(torch.cat([skip, x], dim=1))
        return self.head(x)` },
    { type: 'code', lang: 'python', src: `# --- Torchvision FCN / DeepLab ---
import torchvision
model = torchvision.models.segmentation.fcn_resnet50(
    weights='COCO_WITH_VOC_LABELS_V1')
model.eval()

from torchvision.io import read_image
from torchvision.transforms.functional import to_dtype, resize
import torch

img = read_image('street.jpg')
img = to_dtype(img, torch.float32, scale=True)
img = resize(img, [520, 520])

with torch.no_grad():
    out = model(img.unsqueeze(0))['out']   # (1, 21, H, W)
pred_mask = out.argmax(1).squeeze()        # (H, W) class indices
print(pred_mask.unique())` },
    { type: 'tip', body: `U-Net's concatenation skip connections carry <em>location information</em> from encoder to decoder, not just gradients. This is why U-Net produces sharp, pixel-precise boundaries despite only being trained on tens of annotated images — the encoder preserves spatial detail that the decoder re-uses for fine boundary prediction.` }
  ]
};

L['cv-w5-l2'] = {
  title: 'Instance Segmentation — Mask R-CNN',
  sections: [
    { type: 'text', body: `<h2>Instance vs Semantic Segmentation</h2>
<p>Semantic segmentation labels pixels with a class; it cannot distinguish two adjacent objects of the same class. <strong>Instance segmentation</strong> produces a separate binary mask for each detected object instance, combined with a class label and bounding box. Five cars → five distinct masks.</p>
<h3>Mask R-CNN (He et al. 2017)</h3>
<p>Mask R-CNN extends Faster R-CNN with a third parallel head that predicts a binary mask for each RoI. Architecture additions:</p>
<ul>
  <li><strong>RoI Align</strong> — replaces RoI Pooling; uses bilinear interpolation instead of quantisation, preserving precise spatial correspondence critical for mask prediction.</li>
  <li><strong>Mask head</strong> — a small fully-convolutional network (FCN) applied per RoI to predict a K×K binary mask for each of the C classes. The mask for the predicted class is selected at inference.</li>
</ul>
<p>Key insight: the mask head predicts masks for ALL classes, but only the class predicted by the classification head is used. This decouples mask and class predictions, improving both.</p>` },
    { type: 'code', lang: 'python', src: `import torch
from torchvision.models.detection import maskrcnn_resnet50_fpn, MaskRCNN_ResNet50_FPN_Weights
from torchvision.io import read_image
from torchvision.transforms.functional import to_dtype
import torchvision.transforms.functional as TF

model = maskrcnn_resnet50_fpn(weights=MaskRCNN_ResNet50_FPN_Weights.COCO_V1)
model.eval()

img = read_image('people.jpg')
img_f = to_dtype(img, torch.float32, scale=True)

with torch.no_grad():
    pred = model([img_f])[0]

# Filter by confidence
mask = pred['scores'] > 0.7
boxes  = pred['boxes'][mask]    # (N, 4)
labels = pred['labels'][mask]   # (N,)
masks  = pred['masks'][mask]    # (N, 1, H, W) — probabilities
binary_masks = (masks > 0.5).squeeze(1)   # (N, H, W) bool` },
    { type: 'code', lang: 'python', src: `import numpy as np, cv2

COCO_NAMES = [
    '__background__', 'person', 'bicycle', 'car', 'motorcycle',
    'airplane', 'bus', 'train', 'truck', 'boat',
    # ... 80 COCO classes
]

def draw_instances(image_np, boxes, labels, masks, scores):
    overlay = image_np.copy()
    colours = np.random.randint(0, 255, (len(masks), 3), dtype=np.uint8)
    for i, (box, lbl, msk, col) in enumerate(zip(boxes, labels, masks, colours)):
        # Colour the mask
        overlay[msk] = (overlay[msk] * 0.5 + col * 0.5).astype(np.uint8)
        x1,y1,x2,y2 = box.int().tolist()
        cv2.rectangle(image_np, (x1,y1),(x2,y2), col.tolist(), 2)
        cv2.putText(image_np, f'{COCO_NAMES[lbl]} {scores[i]:.2f}',
                    (x1,y1-5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, col.tolist(), 1)
    return cv2.addWeighted(image_np, 0.5, overlay, 0.5, 0)` },
    { type: 'tip', body: `RoI Align matters significantly for mask quality. With RoI Pooling, features are misaligned by up to half a cell due to quantisation — masks look blocky, especially for small objects. RoI Align fixes this at the cost of slightly more computation, improving mask AP by 3–4 points on COCO.` }
  ]
};

L['cv-w5-l3'] = {
  title: 'Panoptic Segmentation',
  sections: [
    { type: 'text', body: `<h2>Panoptic Segmentation</h2>
<p>Proposed by Kirillov et al. (2018), panoptic segmentation unifies semantic and instance segmentation into a single output format: every pixel gets both a <strong>semantic class</strong> and an <strong>instance ID</strong>.</p>
<ul>
  <li><strong>"Things"</strong> — countable objects (person, car, dog): assigned unique per-instance IDs.</li>
  <li><strong>"Stuff"</strong> — amorphous regions (sky, road, grass): assigned class label only, instance ID = 0.</li>
</ul>
<p>The evaluation metric is <strong>Panoptic Quality (PQ)</strong>:</p>
<pre>PQ = (TP / (TP + 0.5·FP + 0.5·FN)) × (Σ IoU(p,g) / |TP|)</pre>
<p>PQ = recognition quality × segmentation quality. It can be decomposed into PQ_Things and PQ_Stuff.</p>
<h3>Architectures</h3>
<ul>
  <li><strong>Panoptic FPN</strong> — Adds a semantic segmentation head to Mask R-CNN's FPN; merges instance and semantic predictions via a merge module.</li>
  <li><strong>Panoptic-DeepLab</strong> — Separate dual-ASPP encoder; instance branch uses object centre heatmap prediction, no region proposals.</li>
  <li><strong>Mask2Former</strong> (2022) — Transformer-based; unified query-based architecture handles semantic, instance, and panoptic with the same model by changing the output format.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# --- Detectron2 panoptic segmentation ---
# pip install detectron2 (see detectron2.readthedocs.io for install)
from detectron2 import model_zoo
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.utils.visualizer import Visualizer, ColorMode
from detectron2.data import MetadataCatalog
import cv2

cfg = get_cfg()
cfg.merge_from_file(model_zoo.get_config_file(
    "COCO-PanopticSegmentation/panoptic_fpn_R_101_3x.yaml"))
cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url(
    "COCO-PanopticSegmentation/panoptic_fpn_R_101_3x.yaml")
cfg.MODEL.DEVICE = 'cpu'    # use 'cuda' if available

predictor = DefaultPredictor(cfg)
img = cv2.imread('street.jpg')
outputs = predictor(img)

panoptic_seg, segments_info = outputs['panoptic_seg']
metadata = MetadataCatalog.get(cfg.DATASETS.TRAIN[0])
v = Visualizer(img[:,:,::-1], metadata, scale=1.2,
                instance_mode=ColorMode.IMAGE_BW)
out = v.draw_panoptic_seg_predictions(panoptic_seg.to('cpu'), segments_info)
cv2.imshow('Panoptic', out.get_image()[:,:,::-1]); cv2.waitKey(0)` },
    { type: 'tip', body: `Mask2Former is the current state-of-the-art for panoptic segmentation, achieving 57.8 PQ on COCO with a Swin-L backbone. If you need high accuracy and have GPU budget, use Mask2Former via the <code>transformers</code> library (HuggingFace). For faster inference, Panoptic-DeepLab is a good compromise.` }
  ]
};

L['cv-w5-l4'] = {
  title: 'Medical Image Analysis with U-Net',
  sections: [
    { type: 'text', body: `<h2>Medical Imaging Challenges</h2>
<p>Medical CV differs from natural image CV in several key ways:</p>
<ul>
  <li><strong>Small datasets</strong> — annotation requires expert radiologists; thousands of images is considered large.</li>
  <li><strong>Class imbalance</strong> — lesions and tumours are tiny relative to surrounding tissue; background overwhelmingly dominates.</li>
  <li><strong>3D data</strong> — CT/MRI scans are volumetric; 2D slice-by-slice or full 3D convolutions are both valid approaches.</li>
  <li><strong>Modalities</strong> — X-ray, CT (Hounsfield units), MRI (T1/T2 weighting), histopathology (H&E staining), ultrasound.</li>
  <li><strong>Regulatory constraints</strong> — model interpretability and uncertainty quantification are often required.</li>
</ul>
<h3>Common Tasks</h3>
<ul>
  <li>Organ segmentation (liver, lung, kidney) from CT.</li>
  <li>Tumour/lesion detection and segmentation.</li>
  <li>Cell counting from microscopy images.</li>
  <li>Retinal vessel segmentation from fundus images.</li>
  <li>Chest X-ray classification (pneumonia, COVID, nodules).</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import torch, torch.nn as nn

# --- Dice Loss (better than BCE for imbalanced segmentation) ---
class DiceLoss(nn.Module):
    def __init__(self, smooth=1.0):
        super().__init__()
        self.smooth = smooth

    def forward(self, logits, targets):
        probs = torch.sigmoid(logits)
        probs   = probs.view(-1)
        targets = targets.view(-1)
        intersection = (probs * targets).sum()
        return 1 - (2 * intersection + self.smooth) / \
                    (probs.sum() + targets.sum() + self.smooth)

# --- Combined BCE + Dice ---
class BCEDiceLoss(nn.Module):
    def __init__(self, alpha=0.5):
        super().__init__()
        self.alpha = alpha
        self.bce  = nn.BCEWithLogitsLoss()
        self.dice = DiceLoss()

    def forward(self, logits, targets):
        return self.alpha * self.bce(logits, targets.float()) + \
               (1 - self.alpha) * self.dice(logits, targets.float())` },
    { type: 'code', lang: 'python', src: `# --- Evaluation metrics for medical segmentation ---
def dice_coefficient(pred_mask, gt_mask, smooth=1e-6):
    pred_flat = pred_mask.flatten()
    gt_flat   = gt_mask.flatten()
    intersection = (pred_flat * gt_flat).sum()
    return (2 * intersection + smooth) / (pred_flat.sum() + gt_flat.sum() + smooth)

def hausdorff_distance_95(pred, gt):
    """95th percentile Hausdorff distance — standard medical seg metric."""
    from scipy.spatial.distance import directed_hausdorff
    import numpy as np
    pred_pts = np.argwhere(pred)
    gt_pts   = np.argwhere(gt)
    if not pred_pts.size or not gt_pts.size:
        return float('inf')
    d1 = directed_hausdorff(pred_pts, gt_pts)[0]
    d2 = directed_hausdorff(gt_pts, pred_pts)[0]
    return max(d1, d2)

# Binary segmentation output
pred = torch.sigmoid(torch.randn(1, 1, 256, 256)) > 0.5
gt   = torch.randint(0, 2, (1, 1, 256, 256)).bool()
print(f'Dice: {dice_coefficient(pred.float(), gt.float()):.4f}')` },
    { type: 'tip', body: `Always use <strong>Dice coefficient</strong> (not pixel accuracy) as your primary metric for medical segmentation. Pixel accuracy is misleading with severe class imbalance — a model predicting all-background achieves 99%+ accuracy on a dataset where lesions cover 1% of pixels, yet it is useless clinically.` }
  ]
};

L['cv-w5-l5'] = {
  title: 'Video Segmentation & Temporal Consistency',
  sections: [
    { type: 'text', body: `<h2>Segmenting Video</h2>
<p>Video segmentation extends image segmentation to temporal sequences. The added challenge: maintaining temporal consistency — the mask for an object should not flicker frame-to-frame.</p>
<h3>Task Taxonomy</h3>
<ul>
  <li><strong>Video Object Segmentation (VOS)</strong> — propagate a mask given in frame 1 through the rest of the video. Two subtypes: semi-supervised (mask provided at frame 1), unsupervised (discover objects automatically).</li>
  <li><strong>Video Instance Segmentation (VIS)</strong> — detect, segment, and track object instances simultaneously across frames. Benchmark: YouTube-VIS.</li>
  <li><strong>Streaming panoptic segmentation</strong> — dense, per-frame panoptic output with temporal consistency.</li>
</ul>
<h3>Approaches</h3>
<ul>
  <li><strong>Per-frame + tracking</strong> — run image segmentation per frame; match masks across frames by IoU or appearance embedding. Simple but flickers.</li>
  <li><strong>Feature-memory methods (STCN, XMem)</strong> — store a memory of past frame features; use attention to look up relevant memory features for current frame segmentation. State-of-the-art for VOS.</li>
  <li><strong>Optical flow warping</strong> — propagate the previous mask using estimated optical flow to initialise the current-frame segmentation.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import cv2
import torch
from torchvision.models.detection import maskrcnn_resnet50_fpn, MaskRCNN_ResNet50_FPN_Weights
from torchvision.transforms.functional import to_dtype

# --- Simple per-frame instance segmentation on a video ---
model = maskrcnn_resnet50_fpn(weights=MaskRCNN_ResNet50_FPN_Weights.COCO_V1)
model.eval()

cap = cv2.VideoCapture('video.mp4')
fps = cap.get(cv2.CAP_PROP_FPS)
out_writer = cv2.VideoWriter('output.mp4', cv2.VideoWriter_fourcc(*'mp4v'),
                              fps, (int(cap.get(3)), int(cap.get(4))))

while cap.isOpened():
    ret, frame = cap.read()
    if not ret: break
    img_t = to_dtype(torch.from_numpy(frame).permute(2,0,1), torch.float32, scale=True)
    with torch.no_grad():
        pred = model([img_t])[0]
    high = pred['scores'] > 0.6
    masks = pred['masks'][high].squeeze(1) > 0.5  # bool (N, H, W)
    # Colour each mask instance
    for mask in masks:
        colour = torch.randint(0, 255, (3,)).numpy()
        frame[mask.numpy()] = frame[mask.numpy()] * 0.5 + colour * 0.5
    out_writer.write(frame.astype('uint8'))

cap.release(); out_writer.release()` },
    { type: 'tip', body: `For production video segmentation requiring temporal consistency, use <strong>XMem</strong> (Cheng & Schwing 2022) — it maintains a hierarchical memory of past frames (sensory, working, long-term) and propagates masks with excellent consistency at 20+ FPS. Its inference code is available on GitHub and works well on GPU without full retraining.` }
  ]
};

/* ─── WEEK 6 — Generative Models & Vision Transformers ──────────────────── */

L['cv-w6-l1'] = {
  title: 'Autoencoders — Image Compression & Denoising',
  sections: [
    { type: 'text', body: `<h2>Autoencoders</h2>
<p>An autoencoder learns to compress an input into a low-dimensional <em>latent code</em> (encoder) and then reconstruct it back to the original size (decoder). By forcing information through a bottleneck, it learns a compact representation of the data distribution.</p>
<p><strong>Applications:</strong></p>
<ul>
  <li><strong>Dimensionality reduction</strong> — non-linear alternative to PCA.</li>
  <li><strong>Denoising</strong> — train on noisy→clean pairs; the bottleneck forces the model to learn noise-free structure.</li>
  <li><strong>Anomaly detection</strong> — train on normal images; high reconstruction error flags anomalies.</li>
  <li><strong>Pretraining</strong> — masked autoencoders (MAE, He et al. 2022) pretrain ViT at scale.</li>
</ul>
<h3>Variational Autoencoder (VAE)</h3>
<p>The encoder outputs parameters (μ, σ) of a Gaussian distribution instead of a single point. The latent code is sampled as z = μ + σ·ε (ε ~ N(0,I)) — the reparameterisation trick makes this differentiable. An <strong>KL divergence</strong> regularisation term keeps the latent space close to N(0,I), ensuring it is smooth and interpolatable for generation.</p>` },
    { type: 'code', lang: 'python', src: `import torch, torch.nn as nn, torch.nn.functional as F

class VAE(nn.Module):
    def __init__(self, latent_dim=128):
        super().__init__()
        # Encoder
        self.enc = nn.Sequential(
            nn.Conv2d(3, 32, 4, 2, 1), nn.ReLU(),   # /2
            nn.Conv2d(32, 64, 4, 2, 1), nn.ReLU(),  # /4
            nn.Conv2d(64, 128, 4, 2, 1), nn.ReLU(), # /8
            nn.Flatten()
        )
        self.fc_mu  = nn.Linear(128*28*28, latent_dim)
        self.fc_var = nn.Linear(128*28*28, latent_dim)

        # Decoder
        self.fc_d   = nn.Linear(latent_dim, 128*28*28)
        self.dec    = nn.Sequential(
            nn.Unflatten(1, (128, 28, 28)),
            nn.ConvTranspose2d(128, 64, 4, 2, 1), nn.ReLU(),
            nn.ConvTranspose2d(64, 32, 4, 2, 1),  nn.ReLU(),
            nn.ConvTranspose2d(32, 3,  4, 2, 1),  nn.Sigmoid(),
        )

    def encode(self, x):
        h = self.enc(x)
        return self.fc_mu(h), self.fc_var(h)

    def reparameterise(self, mu, logvar):
        std = torch.exp(0.5 * logvar)
        return mu + std * torch.randn_like(std)

    def forward(self, x):
        mu, logvar = self.encode(x)
        z   = self.reparameterise(mu, logvar)
        out = self.dec(self.fc_d(z))
        return out, mu, logvar

def vae_loss(recon, x, mu, logvar, beta=1.0):
    recon_loss = F.binary_cross_entropy(recon, x, reduction='sum')
    kl = -0.5 * torch.sum(1 + logvar - mu**2 - logvar.exp())
    return recon_loss + beta * kl` },
    { type: 'tip', body: `β-VAE (Higgins et al. 2017) uses β > 1 to up-weight the KL term, encouraging better disentanglement of latent factors. A β of 4–10 produces latent dimensions that each independently control interpretable factors (e.g. one dimension controls pose, another controls lighting). Start with β=1 (standard VAE) and increase if you need disentanglement.` }
  ]
};

L['cv-w6-l2'] = {
  title: 'Generative Adversarial Networks',
  sections: [
    { type: 'text', body: `<h2>GAN Framework</h2>
<p>Goodfellow et al. (2014) introduced GANs as a two-player minimax game:</p>
<ul>
  <li><strong>Generator G</strong> — takes random noise z ~ N(0,I) and produces a fake image G(z). Goal: fool D.</li>
  <li><strong>Discriminator D</strong> — binary classifier; outputs P(real | image). Goal: distinguish real from fake.</li>
</ul>
<p>Objective: min_G max_D [ E[log D(x)] + E[log(1 − D(G(z)))] ]</p>
<p>At Nash equilibrium, G produces samples indistinguishable from the real data distribution, and D outputs 0.5 everywhere.</p>
<h3>Key Challenges</h3>
<ul>
  <li><strong>Mode collapse</strong> — G finds a small set of outputs that fool D; drops diversity.</li>
  <li><strong>Training instability</strong> — adversarial loss can oscillate; both networks must advance together.</li>
  <li><strong>Vanishing gradient</strong> — when D is too strong early on, G's gradients vanish.</li>
</ul>
<h3>Improvements: DCGAN, WGAN, StyleGAN</h3>
<ul>
  <li><strong>DCGAN</strong> — BatchNorm in G and D; no pooling layers; ReLU in G, LeakyReLU in D; stabilises training significantly.</li>
  <li><strong>WGAN / WGAN-GP</strong> — replaces JS divergence with Wasserstein distance; gradient penalty enforces Lipschitz constraint; eliminates mode collapse risk.</li>
  <li><strong>StyleGAN2</strong> — state-of-the-art face synthesis; mapping network → style codes → adaptive instance normalisation; can generate 1024×1024 photo-realistic faces.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import torch, torch.nn as nn

# --- DCGAN Generator ---
class Generator(nn.Module):
    def __init__(self, latent_dim=100, img_ch=3, features=64):
        super().__init__()
        self.net = nn.Sequential(
            # (latent_dim) → (features*8, 4, 4)
            nn.ConvTranspose2d(latent_dim, features*8, 4, 1, 0, bias=False),
            nn.BatchNorm2d(features*8), nn.ReLU(True),
            nn.ConvTranspose2d(features*8, features*4, 4, 2, 1, bias=False),
            nn.BatchNorm2d(features*4), nn.ReLU(True),
            nn.ConvTranspose2d(features*4, features*2, 4, 2, 1, bias=False),
            nn.BatchNorm2d(features*2), nn.ReLU(True),
            nn.ConvTranspose2d(features*2, features, 4, 2, 1, bias=False),
            nn.BatchNorm2d(features), nn.ReLU(True),
            nn.ConvTranspose2d(features, img_ch, 4, 2, 1, bias=False),
            nn.Tanh()                        # output in [-1, 1]
        )
    def forward(self, z): return self.net(z)

# --- DCGAN Discriminator ---
class Discriminator(nn.Module):
    def __init__(self, img_ch=3, features=64):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(img_ch, features, 4, 2, 1, bias=False), nn.LeakyReLU(0.2, True),
            nn.Conv2d(features, features*2, 4, 2, 1, bias=False),
            nn.BatchNorm2d(features*2), nn.LeakyReLU(0.2, True),
            nn.Conv2d(features*2, features*4, 4, 2, 1, bias=False),
            nn.BatchNorm2d(features*4), nn.LeakyReLU(0.2, True),
            nn.Conv2d(features*4, 1, 4, 1, 0, bias=False),
            nn.Sigmoid()
        )
    def forward(self, x): return self.net(x)` },
    { type: 'tip', body: `Monitor <strong>FID (Fréchet Inception Distance)</strong> during GAN training, not just loss curves. GAN losses are adversarial and don't monotonically decrease — loss curves are misleading. FID measures the distance between the real and fake image distributions in Inception feature space; lower is better. A decreasing FID confirms the generator is improving even when loss curves look noisy.` }
  ]
};

L['cv-w6-l3'] = {
  title: 'Conditional GANs — Pix2Pix & CycleGAN',
  sections: [
    { type: 'text', body: `<h2>Conditional GANs</h2>
<p>Standard GANs generate samples from random noise — no control over output. Conditional GANs (cGAN) condition both G and D on additional information (class label, image, text), enabling controlled generation.</p>
<h3>Pix2Pix (Isola et al. 2017)</h3>
<p>Pix2Pix is an image-to-image translation framework using paired training data (e.g. semantic map → photo, sketch → photo, aerial → map). Generator: U-Net with skip connections. Discriminator: PatchGAN — classifies 70×70 overlapping patches as real/fake rather than the whole image, capturing local texture statistics. Loss = adversarial loss + λ·L1 loss (λ=100 ensures output is close to ground truth).</p>
<h3>CycleGAN (Zhu et al. 2017)</h3>
<p>CycleGAN enables unpaired image translation — no paired examples needed. Two generators (G: A→B, F: B→A) and two discriminators. The key is <strong>cycle-consistency loss</strong>: F(G(x)) ≈ x and G(F(y)) ≈ y. Without pairs, cycle-consistency acts as a self-supervision signal. Applications: horse ↔ zebra, summer ↔ winter, photo ↔ painting.</p>` },
    { type: 'code', lang: 'python', src: `import torch, torch.nn as nn

# --- PatchGAN Discriminator ---
class PatchGANDiscriminator(nn.Module):
    def __init__(self, in_ch=6):   # 6 = concatenated input + target (3+3)
        super().__init__()
        def block(in_f, out_f, norm=True):
            layers = [nn.Conv2d(in_f, out_f, 4, 2, 1, bias=not norm)]
            if norm: layers.append(nn.InstanceNorm2d(out_f))
            layers.append(nn.LeakyReLU(0.2, True))
            return layers

        self.net = nn.Sequential(
            *block(in_ch, 64, norm=False),
            *block(64, 128), *block(128, 256), *block(256, 512),
            nn.Conv2d(512, 1, 4, 1, 1)    # single channel map of patch scores
        )
    def forward(self, x, y): return self.net(torch.cat([x, y], dim=1))

# --- Cycle-consistency loss ---
def cycle_loss(real_A, fake_B, G_BA, real_B, fake_A, G_AB, lambda_cyc=10):
    cycled_A = G_BA(fake_B)
    cycled_B = G_AB(fake_A)
    return lambda_cyc * (nn.L1Loss()(real_A, cycled_A) +
                         nn.L1Loss()(real_B, cycled_B))` },
    { type: 'tip', body: `CycleGAN works best when the source and target domains have similar structure. It struggles with tasks requiring shape change (horse→zebra works because shape is similar; cat→dog is harder). Use <strong>InstanceNorm</strong> in CycleGAN (not BatchNorm) — InstanceNorm normalises per image, which preserves content while allowing style variation, critical for image translation.` }
  ]
};

L['cv-w6-l4'] = {
  title: 'Vision Transformers — ViT & Swin Transformer',
  sections: [
    { type: 'text', body: `<h2>From NLP Transformers to Vision</h2>
<p>The Transformer architecture (Vaswani et al. 2017) uses <strong>self-attention</strong> to model dependencies between all pairs of positions in a sequence — unlike convolutions, which have a fixed local receptive field. ViT (Dosovitskiy et al. 2020) adapted transformers for images:</p>
<ol>
  <li>Split image into fixed-size patches (e.g. 16×16 pixels each).</li>
  <li>Project each patch to a D-dimensional embedding (patch embedding).</li>
  <li>Prepend a learnable [CLS] token.</li>
  <li>Add learnable position embeddings.</li>
  <li>Feed the sequence of (N_patches + 1) tokens through standard Transformer encoder blocks.</li>
  <li>Use the [CLS] token output for classification.</li>
</ol>
<p>With large-scale pretraining (JFT-300M), ViT-L/16 achieves 88.5% top-1 on ImageNet — surpassing EfficientNet-B7. On smaller datasets, CNNs still win due to their translation equivariance inductive bias.</p>
<h3>Swin Transformer (2021)</h3>
<p>Swin replaces global self-attention (O(N²)) with <strong>shifted window attention</strong> — attention computed within local, non-overlapping windows of patches. Cross-window connections via shifted windows at alternate layers. Hierarchical design (patch merging) produces multi-scale feature maps, making Swin a drop-in backbone for dense prediction (detection, segmentation) tasks.</p>` },
    { type: 'code', lang: 'python', src: `import timm, torch

# --- ViT pretrained from timm ---
vit = timm.create_model('vit_base_patch16_224', pretrained=True)
vit.eval()
x = torch.randn(2, 3, 224, 224)
print(vit(x).shape)    # (2, 1000) — ImageNet logits

# --- Fine-tune ViT on custom dataset ---
vit_ft = timm.create_model('vit_small_patch16_224', pretrained=True,
                             num_classes=5)   # replace head automatically
# Freeze patch embeddings and positional embeddings
for name, param in vit_ft.named_parameters():
    if 'patch_embed' in name or 'pos_embed' in name:
        param.requires_grad = False

optimizer = torch.optim.AdamW(
    filter(lambda p: p.requires_grad, vit_ft.parameters()),
    lr=1e-4, weight_decay=0.05)

# --- Swin Transformer ---
swin = timm.create_model('swin_tiny_patch4_window7_224', pretrained=True)
print(sum(p.numel() for p in swin.parameters()) / 1e6, 'M params')  # ~28M` },
    { type: 'code', lang: 'python', src: `# --- Attention rollout: visualise which patches ViT attends to ---
import torch, torch.nn.functional as F, numpy as np

def get_attention_rollout(model, img_tensor):
    """Compute attention rollout for a ViT (timm model)."""
    attentions = []
    hooks = []
    for block in model.blocks:
        hook = block.attn.register_forward_hook(
            lambda m, inp, out: attentions.append(m.attn_weights.detach()))
        hooks.append(hook)

    model.eval()
    with torch.no_grad():
        _ = model(img_tensor.unsqueeze(0))
    for h in hooks: h.remove()

    # Rollout: multiply attention matrices through layers
    rollout = torch.eye(attentions[0].shape[-1])
    for attn in attentions:
        a = attn.mean(dim=1).squeeze()   # average over heads
        rollout = rollout @ (a + torch.eye(a.shape[0]))
        rollout /= rollout.sum(dim=-1, keepdim=True)
    return rollout[0, 1:]   # CLS row, skip CLS token` },
    { type: 'tip', body: `ViT requires large datasets or strong augmentation (RandAugment, Mixup, CutMix) + weight decay regularisation to match CNN accuracy. If you fine-tune ViT on fewer than ~5000 images, consider using DeiT (Data-efficient Image Transformers) which was designed for ImageNet-scale training only, or use a Swin-T with its CNN-like locality bias.` }
  ]
};

L['cv-w6-l5'] = {
  title: 'CLIP & Multimodal Vision-Language Models',
  sections: [
    { type: 'text', body: `<h2>CLIP — Contrastive Language-Image Pretraining</h2>
<p>Radford et al. (OpenAI, 2021) trained CLIP on 400M (image, text caption) pairs from the internet using contrastive learning. The model jointly trains an <strong>image encoder</strong> (ViT or ResNet) and a <strong>text encoder</strong> (Transformer) to maximise the cosine similarity of matching pairs while minimising similarity of non-matching pairs in a shared embedding space.</p>
<p><strong>Zero-shot classification</strong>: encode the image; encode text prompts like "a photo of a {class}"; find the text embedding with the highest cosine similarity to the image embedding. No fine-tuning needed on the new classes.</p>
<p>CLIP achieves ~76% top-1 on ImageNet zero-shot, rivalling supervised ResNet-50.</p>
<h3>Downstream Applications</h3>
<ul>
  <li><strong>DALL-E 2, Stable Diffusion</strong> — use CLIP encoders to guide image generation from text.</li>
  <li><strong>Grounding DINO</strong> — open-vocabulary object detection; detect any object described in text.</li>
  <li><strong>Segment Anything Model (SAM)</strong> — prompt-based segmentation.</li>
  <li><strong>LLaVA / GPT-4V</strong> — CLIP image encoder + large language model = vision-language chatbots.</li>
</ul>` },
    { type: 'code', lang: 'bash', src: `pip install git+https://github.com/openai/CLIP.git` },
    { type: 'code', lang: 'python', src: `import clip, torch
from PIL import Image

device = 'cuda' if torch.cuda.is_available() else 'cpu'

# Load CLIP model and preprocessor
model, preprocess = clip.load('ViT-B/32', device=device)

# --- Zero-shot image classification ---
image = preprocess(Image.open('photo.jpg')).unsqueeze(0).to(device)
labels = ['a dog playing fetch', 'a cat sleeping', 'a bird flying', 'a person running']
text_tokens = clip.tokenize(labels).to(device)

with torch.no_grad():
    img_features  = model.encode_image(image)       # (1, 512)
    text_features = model.encode_text(text_tokens)  # (4, 512)

    # Cosine similarity (CLIP normalises embeddings)
    img_features  = img_features  / img_features.norm(dim=-1, keepdim=True)
    text_features = text_features / text_features.norm(dim=-1, keepdim=True)
    sims = (100 * img_features @ text_features.T).softmax(dim=-1)

for label, score in zip(labels, sims[0]):
    print(f'{label}: {score:.3f}')` },
    { type: 'code', lang: 'python', src: `# --- CLIP for image similarity search ---
import torch, numpy as np

def embed_images(model, preprocess, image_paths, device):
    imgs = torch.stack([preprocess(Image.open(p)) for p in image_paths]).to(device)
    with torch.no_grad():
        feats = model.encode_image(imgs)
    return feats / feats.norm(dim=-1, keepdim=True)

def clip_search(query_text, db_features, labels, model, device, top_k=5):
    tokens = clip.tokenize([query_text]).to(device)
    with torch.no_grad():
        text_feat = model.encode_text(tokens)
    text_feat = text_feat / text_feat.norm(dim=-1, keepdim=True)
    sims = (text_feat @ db_features.T).squeeze(0)
    top_idx = sims.topk(top_k).indices
    return [(labels[i], sims[i].item()) for i in top_idx]` },
    { type: 'tip', body: `CLIP's zero-shot performance is highly sensitive to prompt engineering. "a photo of a {class}" outperforms just "{class}". Use prompt ensembling — average embeddings across multiple prompt templates ("a photo of a {}.", "an image showing a {}.", "a {} in the scene.") to improve accuracy by 3–5% on classification benchmarks.` }
  ]
};

/* ─── WEEK 7 — 3D Vision & Motion ───────────────────────────────────────── */

L['cv-w7-l1'] = {
  title: 'Depth Estimation — Stereo Vision & Monocular Depth',
  sections: [
    { type: 'text', body: `<h2>Recovering 3D from 2D</h2>
<p>Depth estimation recovers per-pixel distance from the camera, enabling 3D scene understanding. Two paradigms:</p>
<h3>Stereo Vision</h3>
<p>Uses two calibrated cameras separated by a known baseline B. By epipolar geometry, matching points in the left and right images differ only in their x-coordinate (after rectification). The <strong>disparity</strong> d = x_left − x_right encodes depth: depth Z = f·B/d, where f is the focal length.</p>
<p>Steps: stereo calibration → rectification (align image rows) → disparity computation (block matching or Semi-Global Matching) → depth from disparity.</p>
<h3>Monocular Depth Estimation</h3>
<p>Estimates depth from a single image using deep learning. Ill-posed problem — many 3D scenes project to the same 2D image. Deep networks learn prior knowledge about scene geometry. Key models: MiDaS (multi-dataset training, relative depth), DPT (Dense Prediction Transformer), Depth Anything (strongest zero-shot model, 2024).</p>` },
    { type: 'code', lang: 'python', src: `import cv2, numpy as np

# --- Stereo disparity with SGBM ---
img_left  = cv2.imread('left.jpg',  cv2.IMREAD_GRAYSCALE)
img_right = cv2.imread('right.jpg', cv2.IMREAD_GRAYSCALE)

stereo = cv2.StereoSGBM_create(
    minDisparity=0, numDisparities=128,  # must be divisible by 16
    blockSize=11,
    P1=8 * 3 * 11 ** 2,
    P2=32 * 3 * 11 ** 2,
    disp12MaxDiff=1, uniquenessRatio=15,
    speckleWindowSize=0, speckleRange=2
)

disparity = stereo.compute(img_left, img_right).astype(np.float32) / 16.0
# disparity == 0 where matching failed; convert to depth: Z = f*B/d
# (replace f_px and baseline_m with calibrated values)
f_px = 718.856; B_m = 0.537
depth = np.where(disparity > 0, f_px * B_m / disparity, 0)` },
    { type: 'code', lang: 'python', src: `# --- Monocular depth with MiDaS ---
import torch

model_type = "DPT_Large"          # or "DPT_Hybrid", "MiDaS_small"
midas = torch.hub.load("intel-isl/MiDaS", model_type)
midas.eval()

transforms = torch.hub.load("intel-isl/MiDaS", "transforms")
transform  = transforms.dpt_transform

import cv2, torch
img = cv2.cvtColor(cv2.imread('scene.jpg'), cv2.COLOR_BGR2RGB)
input_batch = transform(img)

with torch.no_grad():
    depth = midas(input_batch)
    depth = torch.nn.functional.interpolate(
        depth.unsqueeze(1), size=img.shape[:2],
        mode='bicubic', align_corners=False).squeeze()

depth_np = depth.cpu().numpy()
print(f'Relative depth range: {depth_np.min():.2f} – {depth_np.max():.2f}')` },
    { type: 'tip', body: `MiDaS produces <em>relative</em> (inverse) depth — higher values mean closer objects but units are arbitrary. To convert to metric depth, you need scale and shift alignment against sparse LIDAR or stereo ground truth. The <strong>Depth Anything</strong> model (released 2024) outperforms MiDaS out-of-the-box on most benchmarks and has a V2 with metric depth output.` }
  ]
};

L['cv-w7-l2'] = {
  title: '3D Point Clouds & LiDAR Processing',
  sections: [
    { type: 'text', body: `<h2>3D Point Clouds</h2>
<p>A point cloud is a set of (x, y, z) coordinates — and optionally colour, intensity, or surface normals — representing sampled surface points in 3D space. Point clouds are captured by:</p>
<ul>
  <li><strong>LiDAR</strong> — rotating laser scanner; automotive-grade (Velodyne HDL-64E) captures ~1.3M points/second at 100m range.</li>
  <li><strong>Depth cameras</strong> — Intel RealSense, Microsoft Kinect; structured-light or time-of-flight; shorter range.</li>
  <li><strong>Stereo reconstruction</strong> — dense stereo disparity converted to 3D via camera intrinsics.</li>
  <li><strong>Structure from Motion (SfM)</strong> — sparse 3D from multi-view images (COLMAP).</li>
</ul>
<h3>Processing Libraries</h3>
<ul>
  <li><strong>Open3D</strong> — comprehensive Python library for 3D data processing, visualisation, and registration.</li>
  <li><strong>PyTorch3D</strong> — differentiable 3D operators for deep learning.</li>
  <li><strong>PointNet / PointNet++</strong> — architectures for learning directly from unordered point sets.</li>
</ul>` },
    { type: 'code', lang: 'bash', src: `pip install open3d` },
    { type: 'code', lang: 'python', src: `import open3d as o3d
import numpy as np

# --- Load and visualise ---
pcd = o3d.io.read_point_cloud('scan.pcd')
print(f'Points: {len(pcd.points)}')
o3d.visualization.draw_geometries([pcd])

# --- Voxel downsampling (reduce density) ---
pcd_down = pcd.voxel_down_sample(voxel_size=0.05)
print(f'After downsampling: {len(pcd_down.points)}')

# --- Estimate normals ---
pcd_down.estimate_normals(
    search_param=o3d.geometry.KDTreeSearchParamHybrid(radius=0.1, max_nn=30))

# --- Statistical outlier removal ---
cl, ind = pcd.remove_statistical_outlier(nb_neighbors=20, std_ratio=2.0)
inlier_cloud = pcd.select_by_index(ind)

# --- DBSCAN clustering ---
labels = np.array(pcd_down.cluster_dbscan(eps=0.5, min_points=10, print_progress=False))
max_label = labels.max()
print(f'Found {max_label + 1} clusters')` },
    { type: 'code', lang: 'python', src: `# --- ICP (Iterative Closest Point) for point cloud registration ---
source = o3d.io.read_point_cloud('scan_t0.pcd')
target = o3d.io.read_point_cloud('scan_t1.pcd')

# Initial alignment via RANSAC feature matching
source.estimate_normals()
target.estimate_normals()
source_fpfh = o3d.pipelines.registration.compute_fpfh_feature(
    source, o3d.geometry.KDTreeSearchParamHybrid(radius=0.25, max_nn=100))
target_fpfh = o3d.pipelines.registration.compute_fpfh_feature(
    target, o3d.geometry.KDTreeSearchParamHybrid(radius=0.25, max_nn=100))

# Refine with ICP
result_icp = o3d.pipelines.registration.registration_icp(
    source, target, max_correspondence_distance=0.05,
    estimation_method=o3d.pipelines.registration.TransformationEstimationPointToPlane())
print('ICP fitness:', result_icp.fitness)
print('Transformation:\n', result_icp.transformation)` },
    { type: 'tip', body: `Always downsample before ICP (voxel size = 5–10% of the object size). ICP is O(N·k) per iteration where k is the KD-tree neighbourhood size — running it on raw LiDAR (millions of points) is prohibitively slow. Voxel downsampling to ~10K–50K points makes ICP run in under a second while preserving geometric fidelity.` }
  ]
};

L['cv-w7-l3'] = {
  title: 'Object Tracking — SORT, DeepSORT & ByteTrack',
  sections: [
    { type: 'text', body: `<h2>Multi-Object Tracking (MOT)</h2>
<p>MOT detects all objects in each frame and assigns consistent track IDs across time. The tracking-by-detection paradigm: (1) detect objects in each frame independently, (2) associate detections to existing tracks.</p>
<h3>SORT — Simple Online and Realtime Tracking (2016)</h3>
<p>SORT uses two components: a <strong>Kalman Filter</strong> per track (models motion as constant velocity) and the <strong>Hungarian Algorithm</strong> (optimal assignment of detections to tracks based on IoU cost matrix). Fast (~260 FPS), but uses only position information — fails on occlusions when two tracks temporarily merge.</p>
<h3>DeepSORT (2017)</h3>
<p>Adds a deep appearance descriptor (a small CNN re-ID network) to SORT. The assignment cost combines IoU distance + appearance distance (cosine distance of re-ID embeddings). Re-ID features allow maintaining a track through short occlusions by matching on appearance rather than position alone.</p>
<h3>ByteTrack (2022)</h3>
<p>Key insight: low-confidence detections (0.1 < score < 0.5) still contain useful information for tracking occluded objects. ByteTrack associates high-confidence detections first, then uses the leftover tracks to associate with low-confidence detections. Achieves state-of-the-art MOT17 performance without any re-ID network.</p>` },
    { type: 'code', lang: 'bash', src: `pip install lap ultralytics  # ultralytics includes ByteTrack` },
    { type: 'code', lang: 'python', src: `from ultralytics import YOLO
import cv2

# YOLOv8 + ByteTrack (built-in)
model = YOLO('yolov8n.pt')

cap = cv2.VideoCapture('pedestrians.mp4')
while cap.isOpened():
    ret, frame = cap.read()
    if not ret: break

    results = model.track(frame, persist=True,  # persist: keep track state across calls
                          tracker='bytetrack.yaml',
                          classes=[0],          # 0 = person in COCO
                          conf=0.3)

    if results[0].boxes.id is not None:
        boxes   = results[0].boxes.xyxy.cpu().numpy()
        track_ids = results[0].boxes.id.int().cpu().numpy()
        for box, tid in zip(boxes, track_ids):
            x1,y1,x2,y2 = map(int, box)
            cv2.rectangle(frame, (x1,y1),(x2,y2),(0,255,0),2)
            cv2.putText(frame, f'ID:{tid}', (x1,y1-5),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,255,0), 2)

    cv2.imshow('Tracking', frame); cv2.waitKey(1)
cap.release()` },
    { type: 'tip', body: `Set <code>persist=True</code> in YOLOv8's <code>model.track()</code> call — this tells the tracker to maintain state (Kalman filter predictions, track history) across successive frames. Without it, the tracker resets on each call and track IDs are not persistent across frames.` }
  ]
};

L['cv-w7-l4'] = {
  title: 'Optical Flow — Lucas-Kanade & Deep Methods',
  sections: [
    { type: 'text', body: `<h2>Optical Flow</h2>
<p>Optical flow estimates the apparent motion of pixels between consecutive frames — a vector field (u, v) per pixel indicating displacement. It enables action recognition, video stabilisation, object tracking, and autonomous driving.</p>
<h3>Lucas-Kanade (Sparse)</h3>
<p>Assumes local flow is constant within a small window. Uses the brightness constancy assumption (I(x,y,t) = I(x+u,y+v,t+1)) and solves a 2×2 linear system per window using least squares. Applied iteratively in an image pyramid (coarse-to-fine) for large motions. Tracks a sparse set of keypoints — not dense.</p>
<h3>Farneback (Dense)</h3>
<p>Approximates each pixel neighbourhood as a polynomial and estimates flow by comparing polynomial coefficients between frames. Gives a dense flow field (one vector per pixel) but is slower than LK.</p>
<h3>Deep Optical Flow</h3>
<ul>
  <li><strong>FlowNet</strong> (2015) — first end-to-end CNN for optical flow on synthetic data.</li>
  <li><strong>PWC-Net</strong> (2018) — lightweight, uses feature warping and coarse-to-fine estimation.</li>
  <li><strong>RAFT</strong> (2020) — iterative updates on a 4D correlation volume; state-of-the-art on Sintel/KITTI.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import cv2, numpy as np

cap = cv2.VideoCapture('video.mp4')
ret, prev = cap.read()
prev_gray  = cv2.cvtColor(prev, cv2.COLOR_BGR2GRAY)

# Shi-Tomasi corners to track
p0 = cv2.goodFeaturesToTrack(prev_gray, maxCorners=100, qualityLevel=0.01,
                              minDistance=10, blockSize=7)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret: break
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # --- Lucas-Kanade sparse tracking ---
    p1, status, err = cv2.calcOpticalFlowPyrLK(prev_gray, gray, p0, None,
                                                winSize=(21,21), maxLevel=3)
    good_new  = p1[status == 1]
    good_prev = p0[status == 1]

    for new, old in zip(good_new, good_prev):
        x0,y0 = old.ravel().astype(int)
        x1,y1 = new.ravel().astype(int)
        cv2.arrowedLine(frame, (x0,y0),(x1,y1),(0,255,0),2)

    prev_gray = gray.copy(); p0 = good_new.reshape(-1,1,2)
    cv2.imshow('LK Flow', frame)
    if cv2.waitKey(30) & 0xFF == ord('q'): break
cap.release()` },
    { type: 'code', lang: 'python', src: `# --- Farneback dense optical flow + HSV visualisation ---
import cv2, numpy as np

cap = cv2.VideoCapture('video.mp4')
ret, prev = cap.read()
prev_gray  = cv2.cvtColor(prev, cv2.COLOR_BGR2GRAY)
hsv = np.zeros_like(prev); hsv[..., 1] = 255

while cap.isOpened():
    ret, frame = cap.read()
    if not ret: break
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    flow = cv2.calcOpticalFlowFarneback(prev_gray, gray, None,
                                        pyr_scale=0.5, levels=3, winsize=15,
                                        iterations=3, poly_n=5, poly_sigma=1.2, flags=0)
    mag, ang = cv2.cartToPolar(flow[..., 0], flow[..., 1])
    hsv[..., 0] = ang * 180 / np.pi / 2   # hue encodes direction
    hsv[..., 2] = cv2.normalize(mag, None, 0, 255, cv2.NORM_MINMAX)
    bgr = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)
    cv2.imshow('Dense Flow', bgr); prev_gray = gray
    if cv2.waitKey(30) & 0xFF == ord('q'): break` },
    { type: 'tip', body: `For production video analytics, use <strong>RAFT</strong> optical flow (available via torchvision as <code>torchvision.models.optical_flow.raft_large</code>). It outperforms Farneback significantly on challenging scenes with fast motion, occlusions, and lighting changes — at the cost of GPU and ~50ms per frame pair.` }
  ]
};

L['cv-w7-l5'] = {
  title: 'Human Pose Estimation',
  sections: [
    { type: 'text', body: `<h2>Pose Estimation</h2>
<p>Human pose estimation localises anatomical keypoints (joints): shoulders, elbows, wrists, hips, knees, ankles, and facial landmarks. Applications include sports analytics, physical therapy, gesture control, animation retargeting, and action recognition.</p>
<h3>Approaches</h3>
<ul>
  <li><strong>Heatmap regression</strong> — predict a Gaussian heatmap per keypoint; peak location gives the keypoint coordinates. Output is robust and spatially precise. Used by HRNet, HigherHRNet.</li>
  <li><strong>Direct regression</strong> — directly regress (x, y) coordinates; simpler but less accurate.</li>
  <li><strong>Top-down</strong> — detect people first (object detector), then run single-person pose estimation in each crop. Higher accuracy; slower for crowded scenes.</li>
  <li><strong>Bottom-up</strong> — detect all keypoints, then group into people. Faster; better for many people.</li>
</ul>
<h3>MediaPipe BlazePose</h3>
<p>Google's BlazePose detects 33 body keypoints (including 3D z-coordinate) in real time on mobile devices using a two-stage pipeline: a fast body detector produces a tight crop, then a lightweight landmark regression network predicts 3D keypoints within that crop at 30+ FPS on mobile CPUs.</p>` },
    { type: 'code', lang: 'bash', src: `pip install mediapipe` },
    { type: 'code', lang: 'python', src: `import mediapipe as mp, cv2

mp_pose    = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)   # webcam; or replace with video path

with mp_pose.Pose(static_image_mode=False,
                  model_complexity=1,        # 0=Lite, 1=Full, 2=Heavy
                  min_detection_confidence=0.5,
                  min_tracking_confidence=0.5) as pose:
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret: break
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb)

        if results.pose_landmarks:
            mp_drawing.draw_landmarks(
                frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
            # Access specific landmark
            lm = results.pose_landmarks.landmark
            left_wrist = lm[mp_pose.PoseLandmark.LEFT_WRIST]
            print(f'Left wrist: ({left_wrist.x:.3f}, {left_wrist.y:.3f}, z={left_wrist.z:.3f})')

        cv2.imshow('Pose', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'): break
cap.release()` },
    { type: 'code', lang: 'python', src: `# --- Angle computation for rep counting (e.g. bicep curl) ---
import numpy as np

def angle_between(a, b, c):
    """Angle at point b in the triangle a-b-c. Returns degrees."""
    a, b, c = np.array(a), np.array(b), np.array(c)
    ba = a - b; bc = c - b
    cosine = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc) + 1e-8)
    return np.degrees(np.arccos(np.clip(cosine, -1, 1)))

# Example: elbow angle from shoulder, elbow, wrist landmarks
lm = results.pose_landmarks.landmark
shoulder = [lm[mp_pose.PoseLandmark.LEFT_SHOULDER].x,
            lm[mp_pose.PoseLandmark.LEFT_SHOULDER].y]
elbow    = [lm[mp_pose.PoseLandmark.LEFT_ELBOW].x,
            lm[mp_pose.PoseLandmark.LEFT_ELBOW].y]
wrist    = [lm[mp_pose.PoseLandmark.LEFT_WRIST].x,
            lm[mp_pose.PoseLandmark.LEFT_WRIST].y]
print(f'Elbow angle: {angle_between(shoulder, elbow, wrist):.1f}°')` },
    { type: 'tip', body: `For multi-person pose in sports or crowd analytics, use <strong>YOLOv8-pose</strong> (ultralytics) — it detects 17 COCO keypoints alongside bounding boxes in a single forward pass and runs at 30+ FPS on a modern GPU. Call <code>model = YOLO("yolov8n-pose.pt")</code> and use <code>results[0].keypoints</code> for keypoint access.` }
  ]
};

/* ─── WEEK 8 — Production CV & Capstone ─────────────────────────────────── */

L['cv-w8-l1'] = {
  title: 'Model Optimisation — Quantisation, ONNX & TensorRT',
  sections: [
    { type: 'text', body: `<h2>Why Optimise?</h2>
<p>A PyTorch model trained in FP32 may be too slow or too large for edge deployment. Optimisation reduces latency and memory without significant accuracy loss.</p>
<h3>Quantisation</h3>
<ul>
  <li><strong>Post-training INT8 quantisation</strong> — after training, convert weights and activations from FP32 to INT8 (or FP16). Reduces model size ~4× and enables integer arithmetic units for faster inference. Requires a small calibration dataset to estimate activation ranges.</li>
  <li><strong>Quantisation-aware training (QAT)</strong> — simulate quantisation during training; the model learns to compensate for quantisation error. Higher accuracy than PTQ, especially for harder tasks.</li>
</ul>
<h3>Export Formats</h3>
<ul>
  <li><strong>ONNX</strong> — hardware-agnostic intermediate format; export once, run anywhere via ONNX Runtime.</li>
  <li><strong>TensorRT</strong> — NVIDIA's high-performance inference engine; applies layer fusion, kernel auto-tuning, and INT8/FP16 precision for maximum GPU throughput.</li>
  <li><strong>CoreML</strong> — Apple ecosystem; runs on Apple Neural Engine on iPhone/Mac.</li>
  <li><strong>TFLite / OpenVINO</strong> — mobile (TFLite) and Intel edge devices (OpenVINO).</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import torch
from torchvision.models import resnet50, ResNet50_Weights

model = resnet50(weights=ResNet50_Weights.IMAGENET1K_V2).eval()

# --- Export to ONNX ---
dummy_input = torch.randn(1, 3, 224, 224)
torch.onnx.export(
    model, dummy_input, 'resnet50.onnx',
    input_names=['image'], output_names=['logits'],
    dynamic_axes={'image': {0: 'batch'}, 'logits': {0: 'batch'}},
    opset_version=17
)
print('ONNX export done')

# --- Run with ONNX Runtime (CPU) ---
import onnxruntime as ort, numpy as np
sess = ort.InferenceSession('resnet50.onnx',
                             providers=['CPUExecutionProvider'])
x_np  = np.random.randn(1, 3, 224, 224).astype(np.float32)
logits = sess.run(['logits'], {'image': x_np})[0]
print('Top-1:', logits.argmax())` },
    { type: 'code', lang: 'python', src: `# --- YOLOv8 INT8 export via ultralytics ---
from ultralytics import YOLO

model = YOLO('yolov8s.pt')

# Export to TensorRT INT8 with calibration
model.export(
    format='engine',       # TensorRT engine
    half=False,            # True for FP16
    int8=True,             # INT8 quantisation
    data='data.yaml',      # calibration dataset
    batch=8
)
# Generates yolov8s.engine

# Load and run the TensorRT engine
trt_model = YOLO('yolov8s.engine')
results = trt_model.predict('image.jpg')` },
    { type: 'code', lang: 'python', src: `# --- PyTorch post-training static quantisation ---
import torch
import torch.quantization as quant

model = resnet50(weights=ResNet50_Weights.IMAGENET1K_V2).eval()
model.qconfig = quant.get_default_qconfig('fbgemm')   # CPU backend
quant.prepare(model, inplace=True)

# Calibrate on representative data
with torch.no_grad():
    for img, _ in calib_loader:
        model(img)

quant.convert(model, inplace=True)
# Quantised model is now ~4x smaller and faster on CPU` },
    { type: 'tip', body: `FP16 (half precision) is the easiest win on NVIDIA GPUs — it halves memory bandwidth requirements and is natively accelerated by Tensor Cores. Enable it with <code>model.half()</code> + <code>img = img.half()</code>. INT8 gives a further 2× speedup but requires calibration and sometimes accuracy tuning. Start with FP16 and only move to INT8 if you need the extra speed.` }
  ]
};

L['cv-w8-l2'] = {
  title: 'Real-Time Inference with FastAPI & Video Streaming',
  sections: [
    { type: 'text', body: `<h2>Production CV Service Architecture</h2>
<p>A production CV service typically has:</p>
<ul>
  <li><strong>FastAPI</strong> endpoint — async HTTP API accepting image uploads or JSON payloads.</li>
  <li><strong>Model worker</strong> — loads model once on startup, serves predictions from a shared pool.</li>
  <li><strong>Video stream processor</strong> — decodes frames from RTSP/WebSocket, runs inference, streams annotated output.</li>
  <li><strong>Result store</strong> — Redis or database for async result retrieval in high-volume scenarios.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# requirements: fastapi uvicorn ultralytics pillow python-multipart
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from ultralytics import YOLO
from PIL import Image
import io, numpy as np
from contextlib import asynccontextmanager

model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    model = YOLO('yolov8s.pt')
    print('Model loaded')
    yield
    model = None

app = FastAPI(title='CV Detection API', lifespan=lifespan)

@app.post('/detect')
async def detect(file: UploadFile = File(...), conf: float = 0.5):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert('RGB')
    results = model(np.array(img), conf=conf)[0]
    detections = []
    for box in results.boxes:
        detections.append({
            'class':      int(box.cls),
            'label':      results.names[int(box.cls)],
            'confidence': round(float(box.conf), 4),
            'box':        box.xyxy[0].tolist()
        })
    return JSONResponse({'detections': detections, 'count': len(detections)})` },
    { type: 'code', lang: 'python', src: `# --- MJPEG video stream endpoint ---
from fastapi.responses import StreamingResponse
import cv2, asyncio

async def frame_generator(camera_id: int, conf: float):
    cap = cv2.VideoCapture(camera_id)
    try:
        while True:
            ret, frame = cap.read()
            if not ret: break
            results = model(frame, conf=conf, verbose=False)[0]
            annotated = results.plot()
            _, jpg = cv2.imencode('.jpg', annotated,
                                   [cv2.IMWRITE_JPEG_QUALITY, 75])
            yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n'
                   + jpg.tobytes() + b'\r\n')
            await asyncio.sleep(0)  # yield control to event loop
    finally:
        cap.release()

@app.get('/stream')
async def stream(camera: int = 0, conf: float = 0.5):
    return StreamingResponse(
        frame_generator(camera, conf),
        media_type='multipart/x-mixed-replace; boundary=frame')` },
    { type: 'code', lang: 'bash', src: `# Run the API
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Test with curl
curl -X POST http://localhost:8000/detect \
  -F "file=@photo.jpg" -F "conf=0.5"

# View live stream in browser
# Open: http://localhost:8000/stream?camera=0` },
    { type: 'tip', body: `Load the model <strong>once</strong> in the lifespan context (or at module import), not per request. Model loading takes 500ms–5s; per-request loading will make your API 100× slower than it needs to be. Use FastAPI's <code>lifespan</code> context manager (FastAPI 0.93+) rather than the deprecated <code>startup</code> event handler.` }
  ]
};

L['cv-w8-l3'] = {
  title: 'MLOps for Computer Vision — Data Versioning & Experiment Tracking',
  sections: [
    { type: 'text', body: `<h2>MLOps Challenges in CV</h2>
<p>CV models fail silently in production when the input distribution shifts — new lighting conditions, camera angles, or object appearances that weren't in training data. MLOps addresses systematic model lifecycle management.</p>
<h3>Key Practices</h3>
<ul>
  <li><strong>Data versioning</strong> — track which image + annotation versions produced each model. Large files (images) can't go in Git; DVC (Data Version Control) links them.</li>
  <li><strong>Experiment tracking</strong> — log hyperparameters, metrics, loss curves, and sample predictions per run. MLflow and Weights & Biases (W&B) are standard.</li>
  <li><strong>Model registry</strong> — version models with metadata; promote from staging → production with approval workflows.</li>
  <li><strong>Monitoring</strong> — track prediction confidence distributions and alert on distribution shift indicating model degradation.</li>
  <li><strong>Annotation pipelines</strong> — Label Studio, CVAT, Roboflow for managing labelling workflows and quality.</li>
</ul>` },
    { type: 'code', lang: 'bash', src: `pip install dvc mlflow wandb` },
    { type: 'code', lang: 'python', src: `# --- MLflow experiment tracking ---
import mlflow, mlflow.pytorch
from ultralytics import YOLO

mlflow.set_experiment('yolov8_detection')

with mlflow.start_run(run_name='yolov8s_baseline'):
    mlflow.log_params({
        'model': 'yolov8s', 'epochs': 50,
        'imgsz': 640, 'batch': 16, 'lr0': 0.01
    })

    model = YOLO('yolov8s.pt')
    results = model.train(data='data.yaml', epochs=50, imgsz=640,
                          batch=16, project='runs')

    # Log metrics
    metrics = model.val(data='data.yaml')
    mlflow.log_metrics({
        'mAP50':    float(metrics.box.map50),
        'mAP50_95': float(metrics.box.map),
        'precision':float(metrics.box.mp),
        'recall':   float(metrics.box.mr),
    })

    # Log the best weights as an artifact
    mlflow.log_artifact('runs/train/weights/best.pt')` },
    { type: 'code', lang: 'bash', src: `# --- DVC data versioning ---
# Initialise DVC in your project
dvc init
git add .dvc .gitignore && git commit -m "Initialise DVC"

# Track the dataset directory
dvc add data/images/
git add data/images.dvc data/.gitignore
git commit -m "Track image dataset v1"

# Push to remote storage (S3, GCS, Azure, SSH)
dvc remote add -d myremote s3://my-bucket/dvc-store
dvc push

# Reproduce the entire pipeline (data → train → evaluate)
dvc repro    # reads dvc.yaml pipeline definition` },
    { type: 'tip', body: `Set up a DVC pipeline (<code>dvc.yaml</code>) that defines stages: preprocess → train → evaluate. Each stage declares its dependencies (data, code) and outputs (model weights, metrics). Running <code>dvc repro</code> re-executes only the stages whose inputs have changed, making experiments fully reproducible and avoiding redundant computation.` }
  ]
};

L['cv-w8-l4'] = {
  title: 'CV in Industry — Retail, Healthcare & Autonomous Vehicles',
  sections: [
    { type: 'text', body: `<h2>Real-World CV Applications</h2>
<p>Computer Vision is deployed across industries with very different constraints on accuracy, latency, safety, and interpretability.</p>
<h3>Retail</h3>
<ul>
  <li><strong>Cashierless checkout</strong> (Amazon Go) — overhead cameras + weight sensors; detection + tracking + re-ID associate items with customers in real time.</li>
  <li><strong>Shelf monitoring</strong> — detect out-of-stock shelves, misplaced products; runs on edge cameras daily.</li>
  <li><strong>Customer analytics</strong> — foot traffic heatmaps (anonymised), queue length, dwell time.</li>
</ul>
<h3>Healthcare</h3>
<ul>
  <li><strong>Radiology AI</strong> — chest X-ray triage (pneumonia, COVID), CT lesion segmentation, mammography screening.</li>
  <li><strong>Pathology</strong> — whole-slide image (WSI) analysis; CNNs classify gigapixel H&E stained slides for cancer grading.</li>
  <li><strong>Regulatory</strong> — FDA/CE clearance required; model performance must be validated on external cohorts; uncertainty must be communicated to clinicians.</li>
</ul>
<h3>Autonomous Vehicles</h3>
<ul>
  <li><strong>Sensor fusion</strong> — camera + LiDAR + radar; camera provides colour/texture, LiDAR provides precise depth.</li>
  <li><strong>Perception stack</strong> — 3D object detection, lane detection, driveable surface segmentation, traffic sign recognition, depth estimation.</li>
  <li><strong>Safety requirements</strong> — ISO 26262 functional safety; the system must fail safely; redundancy and out-of-distribution detection are critical.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# --- Uncertainty estimation for medical CV (Monte Carlo Dropout) ---
import torch, torch.nn as nn

def enable_dropout(model):
    """Enable dropout layers at inference for MC Dropout."""
    for m in model.modules():
        if isinstance(m, nn.Dropout):
            m.train()

def mc_predict(model, img_tensor, n_samples=30):
    model.eval()
    enable_dropout(model)
    preds = []
    with torch.no_grad():
        for _ in range(n_samples):
            preds.append(torch.sigmoid(model(img_tensor)))
    preds = torch.stack(preds)              # (n_samples, B, C, H, W)
    mean  = preds.mean(0)                   # mean prediction
    std   = preds.std(0)                    # aleatoric + epistemic uncertainty
    return mean, std

# High std → model is uncertain → flag for human review
mean, uncertainty = mc_predict(seg_model, ct_slice.unsqueeze(0))
print(f'Mean dice: {compute_dice(mean > 0.5, gt):.3f}')
print(f'Max uncertainty: {uncertainty.max():.3f}')` },
    { type: 'tip', body: `In healthcare and autonomous vehicles, knowing <em>when the model doesn't know</em> is as important as the prediction itself. Always include an uncertainty or confidence estimate in production CV systems for safety-critical applications. Reject-on-uncertainty (route uncertain cases to human review) is a pragmatic strategy that maintains high accuracy where the model is confident.` }
  ]
};

L['cv-w8-l5'] = {
  title: 'Capstone — End-to-End Object Detection Pipeline',
  sections: [
    { type: 'text', body: `<h2>Capstone Project: End-to-End CV Pipeline</h2>
<p>This capstone integrates everything from Weeks 1–8 into a production-ready object detection system. The system detects and tracks objects in real-time video, exposes a REST API, and logs metrics to an experiment tracker.</p>
<h3>Architecture</h3>
<ol>
  <li><strong>Data preparation</strong> — annotate images with Roboflow, export in YOLO format, version with DVC.</li>
  <li><strong>Training</strong> — fine-tune YOLOv8s with albumentations augmentation, log to W&B.</li>
  <li><strong>Optimisation</strong> — export to ONNX; optionally TensorRT INT8.</li>
  <li><strong>Service</strong> — FastAPI with detection + tracking endpoints, MJPEG stream.</li>
  <li><strong>Monitoring</strong> — log confidence distributions; alert on drift.</li>
</ol>` },
    { type: 'code', lang: 'python', src: `# pipeline.py — Complete end-to-end pipeline
import cv2, numpy as np, torch, time, json
from ultralytics import YOLO
from collections import deque, defaultdict

class DetectionTracker:
    """End-to-end real-time detection + tracking + analytics."""

    def __init__(self, model_path: str, conf: float = 0.4, iou: float = 0.5):
        self.model = YOLO(model_path)
        self.conf  = conf
        self.iou   = iou
        self.track_history: dict[int, deque] = defaultdict(lambda: deque(maxlen=30))
        self.class_counts: dict[str, int]    = defaultdict(int)
        self.frame_latencies: list[float]    = []

    def process_frame(self, frame: np.ndarray) -> tuple[np.ndarray, dict]:
        t0 = time.perf_counter()
        results = self.model.track(frame, conf=self.conf, iou=self.iou,
                                   persist=True, verbose=False)[0]
        latency_ms = (time.perf_counter() - t0) * 1000
        self.frame_latencies.append(latency_ms)

        annotations = []
        if results.boxes.id is not None:
            for box, cls, tid, conf in zip(
                    results.boxes.xyxy, results.boxes.cls,
                    results.boxes.id, results.boxes.conf):
                class_name = results.names[int(cls)]
                track_id   = int(tid)
                x1,y1,x2,y2 = map(int, box.tolist())
                cx, cy = (x1+x2)//2, (y1+y2)//2
                self.track_history[track_id].append((cx, cy))
                self.class_counts[class_name] += 1
                annotations.append({
                    'id': track_id, 'class': class_name,
                    'conf': round(float(conf), 3), 'box': [x1,y1,x2,y2]
                })
                # Draw track trail
                pts = list(self.track_history[track_id])
                for i in range(1, len(pts)):
                    cv2.line(frame, pts[i-1], pts[i], (0,255,255), 2)
                cv2.rectangle(frame, (x1,y1),(x2,y2),(0,200,0),2)
                cv2.putText(frame, f'{class_name} #{track_id} {conf:.2f}',
                            (x1, y1-6), cv2.FONT_HERSHEY_SIMPLEX, 0.55, (0,200,0), 1)

        # HUD overlay
        cv2.putText(frame, f'FPS: {1000/latency_ms:.1f}  Latency: {latency_ms:.0f}ms',
                    (10,25), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255,255,255), 2)
        return frame, {'latency_ms': latency_ms, 'detections': annotations}

    def analytics(self) -> dict:
        lats = self.frame_latencies
        return {
            'total_frames': len(lats),
            'avg_latency_ms': float(np.mean(lats)) if lats else 0,
            'p95_latency_ms': float(np.percentile(lats, 95)) if lats else 0,
            'class_counts': dict(self.class_counts),
        }` },
    { type: 'code', lang: 'python', src: `# main.py — FastAPI service wrapping DetectionTracker
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse, StreamingResponse
from pipeline import DetectionTracker
import numpy as np, cv2, io, asyncio
from PIL import Image
from contextlib import asynccontextmanager

tracker = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global tracker
    tracker = DetectionTracker('yolov8s.pt', conf=0.4)
    yield

app = FastAPI(title='CV Capstone Pipeline', lifespan=lifespan)

@app.post('/detect')
async def detect_image(file: UploadFile = File(...)):
    data  = await file.read()
    img   = np.array(Image.open(io.BytesIO(data)).convert('RGB'))[:,:,::-1]
    frame, meta = tracker.process_frame(img.copy())
    return JSONResponse(meta)

@app.get('/analytics')
async def get_analytics():
    return JSONResponse(tracker.analytics())

@app.get('/stream')
async def live_stream(source: str = '0'):
    async def generate():
        src = int(source) if source.isdigit() else source
        cap = cv2.VideoCapture(src)
        try:
            while True:
                ret, frame = cap.read()
                if not ret: break
                annotated, _ = tracker.process_frame(frame)
                _, jpg = cv2.imencode('.jpg', annotated,
                                       [cv2.IMWRITE_JPEG_QUALITY, 80])
                yield b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + jpg.tobytes() + b'\r\n'
                await asyncio.sleep(0)
        finally:
            cap.release()
    return StreamingResponse(generate(),
                              media_type='multipart/x-mixed-replace; boundary=frame')` },
    { type: 'tip', body: `Package the capstone as a Docker container for reproducible deployment: <code>FROM python:3.11-slim</code> + install requirements + <code>COPY</code> model weights + <code>CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]</code>. This ensures the same environment on your laptop, CI server, and production GPU instance.` },
    { type: 'exercise', title: 'Extend the pipeline with a zone alert', hint: 'Define a polygon zone in frame coordinates; count objects inside it per frame; trigger an alert if count exceeds a threshold', solution: `import cv2, numpy as np
from pipeline import DetectionTracker

tracker = DetectionTracker('yolov8s.pt')

# Define a restricted zone as a polygon (normalised coords 0-1)
ZONE = np.array([[0.2, 0.3],[0.6, 0.3],[0.6, 0.8],[0.2, 0.8]], dtype=np.float32)

cap = cv2.VideoCapture('video.mp4')
while cap.isOpened():
    ret, frame = cap.read()
    if not ret: break
    h, w = frame.shape[:2]
    zone_px = (ZONE * [w, h]).astype(np.int32)

    annotated, meta = tracker.process_frame(frame)
    count_in_zone = 0
    for det in meta['detections']:
        cx = (det['box'][0] + det['box'][2]) // 2
        cy = (det['box'][1] + det['box'][3]) // 2
        if cv2.pointPolygonTest(zone_px, (cx, cy), False) >= 0:
            count_in_zone += 1

    colour = (0,0,255) if count_in_zone > 2 else (0,255,0)
    cv2.polylines(annotated, [zone_px], True, colour, 2)
    if count_in_zone > 2:
        cv2.putText(annotated, f'ALERT: {count_in_zone} in zone',
                    (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0,0,255), 3)

    cv2.imshow('Zone Alert', annotated)
    if cv2.waitKey(1) & 0xFF == ord('q'): break
cap.release()` }
  ]
};

})();
