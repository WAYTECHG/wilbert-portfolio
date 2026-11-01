<p align="center">
  <img src="assets/name-detection.gif" width="640" alt="Wilbert Andrew Yonathan — animated computer vision detection boxes around my name">
</p>

<p align="center">
  <strong>AI Engineering student · Computer Vision · Efficient Deep Learning · RAG</strong><br>
  Xiamen University Malaysia · Seeking an AI / ML internship from <strong>29 March 2027</strong>
</p>

<p align="center">
  <a href="https://wilbert-andrew-yonathan.vercel.app/">Portfolio</a> ·
  <a href="https://www.linkedin.com/in/wilbert-andrew-yonathan-85562326a/">LinkedIn</a> ·
  <a href="https://huggingface.co/Wizzas">Hugging Face</a> ·
  <a href="mailto:wilbertyonathan@gmail.com">Email</a>
</p>

---

## About

I build **computer vision, efficient deep learning and RAG-powered AI applications**: training and evaluating models, then turning them into working demos with a backend and a deployed UI. I care about reproducible experiments and honest reporting of model limitations.

| | |
|---|---|
| **Education** | B.Eng. Artificial Intelligence, Xiamen University Malaysia (Sep 2023 – Sep 2027, expected) |
| **Academic record** | CGPA **3.77 / 4.00** · Dean's List, 3 consecutive semesters · XMUM Merit Scholarship (2023–2027) |
| **Looking for** | AI/ML internship (computer vision, deep learning, generative AI) · **3–5 months from 29 March 2027** · also open to project-based collaboration |
| **Languages** | English, Mandarin, Indonesian, Malay, Hokkien |

## Featured projects

*Render-hosted demos can take about a minute to wake on first load.*

| Project | What it does | Key result | Links |
|---|---|---|---|
| **PaddyLiteX**<br>*Final-year thesis* | Lightweight YOLOv8n paddy disease detector (DenseLiteX backbone, SPPF, C2PSA), 9 classes | **81.67% mAP@0.5** on 803 test images; **−68.01% params, −72.59% GFLOPs** vs. the initial YOLOv8n-DenseNet121 proposal | [Code](https://github.com/WAYTECHG/paddylitex-disease-detection) · [Demo](https://paddylitex.onrender.com/) · [HF Space](https://huggingface.co/spaces/Wizzas/PaddyLiteX) |
| **DefectRAG** | Visual anomaly inspection across 12 VisA categories (frozen DINOv2 + normal-reference scoring + heatmaps) with cited RAG explanations and a review dashboard | **95.13% mean image AUROC** (retrospective development evaluation, not external validation) | [Code](https://github.com/WAYTECHG/DefectRAG) · [Demo](https://huggingface.co/spaces/Wizzas/DefectRAG) |
| **MarineLite** | Marine organism detection: GhostConv + SimSPPF integrated into DU-MobileYOLO on URPC2020 | mAP@0.5 **74.23% → 75.36%**, params **4.70M → 4.37M** | [Code](https://github.com/WAYTECHG/marinelite-organism-detection) · [Demo](https://marine-object-detection.onrender.com/) |
| **dPickleball** | PPO agents in Unity ML-Agents: 6-level wall-training curriculum, then league self-play | Team of 6 placed **2nd of 13** in the class competition | [Code](https://github.com/WAYTECHG/dpickleball-rl-agent) · [Video](https://www.youtube.com/live/CitFn9FK12s) |

<details>
<summary><strong>Project details, stacks and my contribution</strong></summary>

<br>

**PaddyLiteX** · Python, PyTorch, Ultralytics YOLO, OpenCV
Ran ablation studies and deployed an interactive three-model comparison demo.

**DefectRAG** · Python, PyTorch, DINOv2, LangChain, LangGraph, Qwen, BGE embeddings, React.js, FastAPI, Supabase (PostgreSQL), SQLite, n8n, AWS Lightsail, Hugging Face ZeroGPU
Cited RAG explanations; dashboard for inspection history, reports and review workflows; Supabase (Auth, row-level security, TOTP MFA) for cloud collaboration, SQLite locally, ZeroGPU for queued cloud inference; corrective-action emails via n8n self-hosted on AWS Lightsail.

**MarineLite** · Python, PyTorch, YOLO, OpenCV
Baseline and ablation experiments on the accuracy–complexity trade-off; demo with bounding-box visualisation and model comparison. The repository credits the original DU-MobileYOLO work.

**dPickleball** · Python, PyTorch, Unity ML-Agents, PPO
Experimented with reward and penalty configurations for movement, paddle rotation and ball return. My contribution: candidate policies and round-robin evaluation. Built on the [original dPickleBall environment](https://github.com/dPickleball/dPickleBallEnv).

</details>

## Tech stack

| | |
|---|---|
| **Languages** | <img src="https://img.shields.io/badge/Python-0F172A?style=flat-square&logo=python&logoColor=3776AB" alt="Python"> <img src="https://img.shields.io/badge/C-0F172A?style=flat-square&logo=c&logoColor=A8B9CC" alt="C"> <img src="https://img.shields.io/badge/C++-0F172A?style=flat-square&logo=cplusplus&logoColor=00599C" alt="C++"> <img src="https://img.shields.io/badge/JavaScript-0F172A?style=flat-square&logo=javascript&logoColor=F7DF1E" alt="JavaScript"> <img src="https://img.shields.io/badge/SQL-0F172A?style=flat-square" alt="SQL"> |
| **Machine learning** | <img src="https://img.shields.io/badge/PyTorch-0F172A?style=flat-square&logo=pytorch&logoColor=EE4C2C" alt="PyTorch"> <img src="https://img.shields.io/badge/TensorFlow-0F172A?style=flat-square&logo=tensorflow&logoColor=FF6F00" alt="TensorFlow"> <img src="https://img.shields.io/badge/Keras-0F172A?style=flat-square&logo=keras&logoColor=D00000" alt="Keras"> <img src="https://img.shields.io/badge/scikit--learn-0F172A?style=flat-square&logo=scikitlearn&logoColor=F7931E" alt="scikit-learn"> <img src="https://img.shields.io/badge/LightGBM-0F172A?style=flat-square" alt="LightGBM"> <img src="https://img.shields.io/badge/Ultralytics-0F172A?style=flat-square" alt="Ultralytics"> |
| **Computer vision** | <img src="https://img.shields.io/badge/OpenCV-0F172A?style=flat-square&logo=opencv&logoColor=5C3EE8" alt="OpenCV"> <img src="https://img.shields.io/badge/YOLOv8-0F172A?style=flat-square" alt="YOLOv8"> <img src="https://img.shields.io/badge/DINOv2-0F172A?style=flat-square" alt="DINOv2"> |
| **GenAI & NLP** | <img src="https://img.shields.io/badge/LangChain-0F172A?style=flat-square&logo=langchain&logoColor=2DD4BF" alt="LangChain"> <img src="https://img.shields.io/badge/LangGraph-0F172A?style=flat-square" alt="LangGraph"> <img src="https://img.shields.io/badge/Hugging_Face-0F172A?style=flat-square&logo=huggingface&logoColor=FFD21E" alt="Hugging Face"> <img src="https://img.shields.io/badge/Qwen-0F172A?style=flat-square" alt="Qwen"> <img src="https://img.shields.io/badge/BGE_Embeddings-0F172A?style=flat-square" alt="BGE Embeddings"> |
| **Data** | <img src="https://img.shields.io/badge/NumPy-0F172A?style=flat-square&logo=numpy&logoColor=4DABCF" alt="NumPy"> <img src="https://img.shields.io/badge/pandas-0F172A?style=flat-square&logo=pandas&logoColor=8B7CF6" alt="pandas"> <img src="https://img.shields.io/badge/SQLite-0F172A?style=flat-square&logo=sqlite&logoColor=38BDF8" alt="SQLite"> <img src="https://img.shields.io/badge/PostgreSQL-0F172A?style=flat-square&logo=postgresql&logoColor=4169E1" alt="PostgreSQL"> <img src="https://img.shields.io/badge/Supabase-0F172A?style=flat-square&logo=supabase&logoColor=3FCF8E" alt="Supabase"> |
| **Backend & UI** | <img src="https://img.shields.io/badge/FastAPI-0F172A?style=flat-square&logo=fastapi&logoColor=009688" alt="FastAPI"> <img src="https://img.shields.io/badge/Flask-0F172A?style=flat-square&logo=flask&logoColor=white" alt="Flask"> <img src="https://img.shields.io/badge/React-0F172A?style=flat-square&logo=react&logoColor=61DAFB" alt="React"> <img src="https://img.shields.io/badge/Gradio-0F172A?style=flat-square&logo=gradio&logoColor=FF7C00" alt="Gradio"> <img src="https://img.shields.io/badge/Streamlit-0F172A?style=flat-square&logo=streamlit&logoColor=FF4B4B" alt="Streamlit"> |
| **Cloud & DevOps** | <img src="https://img.shields.io/badge/AWS-0F172A?style=flat-square" alt="AWS"> <img src="https://img.shields.io/badge/Docker-0F172A?style=flat-square&logo=docker&logoColor=2496ED" alt="Docker"> <img src="https://img.shields.io/badge/Linux-0F172A?style=flat-square&logo=ubuntu&logoColor=E95420" alt="Linux"> <img src="https://img.shields.io/badge/Git-0F172A?style=flat-square&logo=git&logoColor=F05032" alt="Git"> <img src="https://img.shields.io/badge/GitHub-0F172A?style=flat-square&logo=github&logoColor=white" alt="GitHub"> <img src="https://img.shields.io/badge/Hugging_Face_Spaces-0F172A?style=flat-square&logo=huggingface&logoColor=FFD21E" alt="Hugging Face Spaces"> <img src="https://img.shields.io/badge/Render-0F172A?style=flat-square&logo=render&logoColor=white" alt="Render"> <img src="https://img.shields.io/badge/Vercel-0F172A?style=flat-square&logo=vercel&logoColor=white" alt="Vercel"> |
| **Automation** | <img src="https://img.shields.io/badge/n8n-0F172A?style=flat-square&logo=n8n&logoColor=EA4B71" alt="n8n"> <img src="https://img.shields.io/badge/Resend-0F172A?style=flat-square&logo=resend&logoColor=white" alt="Resend"> <img src="https://img.shields.io/badge/Formspree-0F172A?style=flat-square&logo=formspree&logoColor=E5122E" alt="Formspree"> |

**Focus areas:** object detection · image classification · visual anomaly detection · RAG · reinforcement learning (PPO, curriculum learning, reward shaping, league self-play)  
**AWS used:** Lightsail, EC2, Lambda, CloudWatch, Budgets  
**Evaluation:** dataset preparation, baselines, ablation studies, image AUROC, precision/recall, mAP

## Experience & leadership

- **Head of Photography & Videography**, Love in Action (Feb – Mar 2026): coordinated media coverage and edited outreach materials.
- **Head of General Affairs**, XMUM AI Club (Apr – Oct 2025): coordinated logistics and external partners for a national-level AI event.
- **Student Registration & Operations Assistant**, Xiamen University Malaysia (Apr 2025): supported registration and event logistics for 800+ students.

<p align="center">
  <img src="https://raw.githubusercontent.com/WAYTECHG/WAYTECHG/output/streak.svg" alt="WAYTECHG's total contributions, current streak, and longest streak">
</p>
<!-- Generated from my contributions by .github/workflows/snake.yml. -->
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/WAYTECHG/WAYTECHG/output/github-snake-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/WAYTECHG/WAYTECHG/output/github-snake.svg">
    <img src="https://raw.githubusercontent.com/WAYTECHG/WAYTECHG/output/github-snake.svg" alt="Animated snake following my GitHub contribution graph">
  </picture>
</p>

## Contact

Hiring for **computer vision, efficient deep learning or RAG-based AI**? Reach me at [wilbertyonathan@gmail.com](mailto:wilbertyonathan@gmail.com) or on [LinkedIn](https://www.linkedin.com/in/wilbert-andrew-yonathan-85562326a/).
