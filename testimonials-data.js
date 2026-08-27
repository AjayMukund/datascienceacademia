/* ─────────────────────────────────────────────────────────
   DSA Intern Testimonials — Data
   `file` is the original testimonial card image; `quote` is the transcribed text
   (shown on the page for readers, search engines and screen readers).
   Edit here; then run  python tools/build.py  to regenerate testimonials.html
───────────────────────────────────────────────────────── */

const TESTIMONIALS = [
  {
    file: "Intern Testimonials/Intern Testimonial - Praiselin P.png",
    name: "Praiselin P",
    info: "BE Computer Science, St. Joseph's College of Engineering, Chennai",
    quote: "Meeting someone like Ajay Mukund Sir in this internship was beyond my expectations. His incredible energy and interactive approach are truly captivating. His unwavering optimism and willingness to listen and appreciate viewpoints make him a true inspiration to us all."
  },
  {
    file: "Intern Testimonials/Intern Testimonial - Kartik Gupta.png",
    name: "Kartik Gupta",
    info: "B.Tech, AI & ML, Jaypee Institute of Information Technology",
    quote: "I had the privilege of working with Ajay Mukund, a supervisor with a heart of gold and an amazing personality. The best part was witnessing his exceptional behavior, actively listening to everyone's doubts, ideas, and conversations, and consistently offering support. I genuinely hope to have the opportunity to meet Ajay Mukund Sir in person at least once in the future."
  },
  {
    file: "Intern Testimonials/Intern Testominal - Priya R.png",
    name: "Priya R",
    info: "B.Tech, Artificial Intelligence & ML, GITAM, Bangalore",
    quote: "Ajay Mukund S is a good supervisor and a great teacher who always tries to bring out the best in trainees and guides them to reach their goals. A highly skilled person who is always there to help the students. I highly recommend this Two Month Virtual Machine Learning Internship Program"
  },
  {
    file: "Intern Testimonials/Intern Testimonial - Divya Chougule.png",
    name: "Divya Chougule",
    info: "B.Tech, DKTE, Maharashtra",
    quote: "Ajay Sir was an exceptional supervisor. His friendly and approachable demeanor made the entire experience enjoyable and productive. From the very beginning, he fostered a positive and inclusive work environment, encouraging open communication and collaboration."
  },
  {
    file: "Intern Testimonials/Intern Testimonial - Gubiligari Sireesha.png",
    name: "Gubiligari Sireesha",
    info: "Student Intern, Data Science Academia",
    quote: "Ajay Sir is simply the best supervisor I've had. His guidance led us to learn and explore new horizons. With his support, we collaborated with external experts to shape our project brilliantly. This internship isn't just an opportunity; it's a thrilling journey of growth. Dive in, embrace the experience, and watch yourself thrive!"
  },
  {
    file: "Intern Testimonials/Intern Testimonial - Sai Kiran Pulla.png",
    name: "Sai Kiran Pulla",
    info: "B.Tech, CSE, JNTUA",
    quote: "Ajay Mukund Sir is a remarkably kind and talented individual with vast knowledge. He consistently supported me through difficulties, be it related to concepts or projects. As beginners, the project and documentation were new to us; his guidance was crucial. To those considering the internship, it's undoubtedly beneficial for learning and personal growth."
  },
  {
    file: "Intern Testimonials/Intern Testimonial - Jalakuru Ruthik.png",
    name: "Jalakuru Ruthik",
    info: "Student Intern, Data Science Academia",
    quote: "Ajay Sir's teaching is next-level awesome! Learning about machine learning has become a joyride. He's more than a supervisor — he's like a supportive sibling on this internship adventure. The guidance we got was like a GPS for success, and the team always had our backs when doubts crept in. We're hungry for knowledge, excited to make a real impact, and super grateful for his expert insights that cleared the fog of confusion."
  },
  {
    file: "Intern Testimonials/Intern Testimonial - Saravana Pandian K.png",
    name: "Saravana Pandian K",
    info: "M.Sc., Statistics",
    quote: "During the ML internship, I had the opportunity to expand my knowledge on various ML algorithms and hyperparameter tuning. Ajay Sir's teaching style was supportive, friendly, and highly effective in explaining ML concepts. I am grateful to him for clarifying our project's accuracy, which significantly improved to over 95 percent. I highly recommend joining this ML internship program for an enjoyable and enriching learning experience."
  },
  {
    file: "Intern Testimonials/Intern Testimonial - Kanakala Bhoomika.png",
    name: "Kanakala Bhoomika",
    info: "B.Tech, ECE, JNTUK, Rajahmundry",
    quote: "An amazing guide, comprehensively leading us through every aspect of the internship. Exceptional team lead support. Gained valuable experience. Highly recommended!"
  },
  {
    file: "Intern Testimonials/Intern Testimonial - Shaik Shahid.png",
    name: "Shaik Shahid",
    info: "Student Intern, Data Science Academia",
    quote: "The instructor's humility shines through. Tremendous support and clear doubt resolution. Effective use of examples for explanations. I received significant project support from Mukund Sir. Grateful for his guidance."
  },
  {
    file: "Intern Testimonials/Intern Testimonial - K Geethanjali.png",
    name: "K Geethanjali",
    info: "B.Tech, CSE, Madanapalle Institute of Technology and Science",
    quote: "I highly appreciate Mr. Ajay Mukund for his exceptional guidance during the machine learning internship. He is not only a wonderful person but also patiently addresses all our queries, providing thorough explanations. This internship has proven to be extremely beneficial for students, as it equips them with valuable knowledge and skills."
  },
  {
    file: "Intern Testimonials/Intern Testimonial - Sai Soumya Reddy.png",
    name: "Munireddygari Sai Soumya Reddy",
    info: "B.Tech, Computer Science & Technology, JNTUA",
    quote: "I highly recommend Ajay Sir as a truly inspiring trainer. He consistently provides support and guidance throughout the training, making himself available whenever needed. His teaching approach facilitates easy comprehension of topics with relevant examples for better clarity. Ajay Sir's calm and composed demeanor creates a positive learning environment. Choosing this internship under his guidance is undoubtedly a wise decision for personal and professional growth."
  },
  {
    file: "Intern Testimonials/Intern Testimonial - Vuttaradhi Vyshnavi.png",
    name: "Vuttaradhi Vyshnavi",
    info: "B.Tech, Madanapalle",
    quote: "Ajay Sir, our supervisor, was not only excellent in his support and guidance but also brought a touch of humor to our team. He transformed our flaws into strengths and motivated us to work hard towards our goals. Working with him was an absolute pleasure. I highly recommend this internship, where you can experience exceptional support, guidance, and even a good laugh!"
  },
  {
    file: "Intern Testimonials/Intern Testimonial - Shaik Shahul.png",
    name: "Shaik Shahul",
    info: "B.Tech, Computer Science & Technology, MITS",
    quote: "Ajay Sir's teaching approach and availability for students were exceptional. His real-life examples made machine learning understandable, even for someone like me with limited coding knowledge. The support from the student coordinator and team leads was invaluable. Joining this internship guarantees valuable skills in machine learning through active listening in classes."
  },
  {
    file: "Intern Testimonials/Intern Testominal - Botikhyala Krishna Mohan Yadav.png",
    name: "Botikhyala Krishna Mohan Yadav",
    info: "B.Tech, Jawaharlal Nehru Technological University (JNTUA)",
    quote: "My internship supervisor - Ajay Mukund S was incredibly well experienced and had excellent communication skills. To all fellow students, make the best use of the training and keep working hard."
  }
];
