'use strict';
window.PORTFOLIO_PROJECTS = [
  {
    "id": "defectrag",
    "title": "DefectRAG · visual anomaly inspection & RAG",
    "short": "DefectRAG",
    "category": "application",
    "year": "Aug 2026 – Oct 2026",
    "status": "Personal project · live cloud demo",
    "kicker": "COMPUTER VISION / GENERATIVE AI / APPLICATION ENGINEERING",
    "description": "Built a visual inspection application combining DINOv2 heatmaps, cited RAG, shared reviews and corrective-action tracking, with n8n workflows hosted on AWS Lightsail.",
    "tags": [
      "DINOv2",
      "LangGraph",
      "LangChain",
      "RAG",
      "PyTorch",
      "React",
      "Supabase",
      "FastAPI",
      "ZeroGPU",
      "n8n",
      "Docker",
      "AWS Lightsail",
      "Docker Compose",
      "Caddy",
      "HTTPS"
    ],
    "metrics": [
      [
        "95.13%",
        "Mean image AUROC"
      ],
      [
        "98.60%",
        "Mean pixel AUROC"
      ],
      [
        "12",
        "VisA product categories"
      ]
    ],
    "summary": "DefectRAG connects nearest-normal visual inspection to saved measurements, attributed reference documents and a React review interface. The application extends human review into corrective-action tracking using Supabase and n8n workflows for event validation, supervisor notifications and delivery receipts. I deployed n8n on AWS Lightsail with Docker Compose and a Caddy reverse proxy providing HTTPS. Visual inference, cited explanations and business workflows retain separate roles.",
    "contributions": [
      "Implemented frozen DINOv2 features, category-specific normal-reference banks, anomaly scoring and coarse patch-distance heatmaps.",
      "Compared the original DINOv3 profile with a higher-resolution DINOv2 profile across all 12 VisA products, and examined threshold sensitivity and false-alarm trade-offs.",
      "Integrated LangChain document processing, BGE retrieval, LangGraph routing and Qwen generation with citation, quote and numeric checks.",
      "Built React/FastAPI inspection and review workflows, including batch history, staff notes, review alerts and reports.",
      "Connected Supabase authentication and private shared records, and deployed queued model inference on Hugging Face ZeroGPU.",
      "Packaged the application locally with Docker and deployed the Hugging Face ZeroGPU demo while retaining the React.js/FastAPI application workflow.",
      "Built corrective-action tracking using Supabase and n8n workflows for case-event validation, authorization checks, supervisor notifications and delivery receipts.",
      "Deployed n8n on AWS Lightsail using Docker Compose and a Caddy reverse proxy with HTTPS."
    ],
    "outcome": "The retrospective comparison reports mean image AUROC of 95.13%, versus 85.38% for the original DINOv3 profile, and mean pixel AUROC of 98.60%. The comparison covers 12 VisA products, 8,659 training-normal images, 2,162 test images and three seeds. Earlier test results informed development, so these are retrospective development results, not an untouched external validation. Normal-only threshold calibration improves sensitivity at the cost of more false alarms. Model scores are distances rather than defect probabilities; heatmaps are coarse localization, and the assistant does not diagnose defect types, causes or repairs.",
    "learning": "A useful inspection application needs model evaluation, evidence-grounded explanations and traceable human review. I learned to separate ranking metrics from operating thresholds, validate retrieved citations, and connect reviews to corrective-action workflows. Deploying n8n on AWS Lightsail extended that work into container deployment and HTTPS reverse-proxy configuration.",
    "credit": "DINOv2, DINOv3, BGE, Qwen, LangChain and LangGraph are established upstream models and tools. My work combines their integration, comparative evaluation, threshold calibration, evidence validation and review workflows. The visual encoders remain frozen; normal images populate memory banks rather than fine-tuning the backbone. n8n orchestrates case-event handling and notifications; it does not perform the visual inspection or replace the RAG pipeline. Supabase stores case and review records; AWS Lightsail hosts the n8n deployment, with Docker Compose for container configuration and Caddy for HTTPS reverse proxying.",
    "repository": "https://github.com/WAYTECHG/DefectRAG",
    "demo": "https://huggingface.co/spaces/Wizzas/DefectRAG",
    "evidence": "https://github.com/WAYTECHG/DefectRAG/blob/main/docs/ACCURACY_RESULTS.md",
    "evidenceLabel": "Retrospective evaluation",
    "tableCaption": "Retrospective macro means over 12 VisA products; three seeds; official train/test identities",
    "table": [
      [
        "Metric",
        "Original DINOv3",
        "DINOv2 high resolution"
      ],
      [
        "Image AUROC",
        "85.38%",
        "95.13%"
      ],
      [
        "Image AU-PR",
        "86.47%",
        "95.74%"
      ],
      [
        "Pixel AUROC",
        "92.96%",
        "98.60%"
      ],
      [
        "Pixel AU-PR",
        "33.29%",
        "43.04%"
      ]
    ],
    "searchTerms": [
      "anomaly detection",
      "visual inspection",
      "generative AI",
      "LLM",
      "LangChain",
      "BGE",
      "Qwen",
      "embeddings",
      "retrieval",
      "citations",
      "VisA",
      "memory bank",
      "heatmaps",
      "normal reference",
      "Python",
      "NumPy",
      "SQLite",
      "Docker",
      "Git",
      "GitHub",
      "Hugging Face",
      "Gradio",
      "JavaScript",
      "Vite",
      "RLS",
      "SQL",
      "cloud deployment",
      "Computer Vision",
      "Deep Learning",
      "evaluation",
      "visual anomaly detection",
      "generative AI",
      "n8n",
      "workflow automation",
      "case events",
      "notifications",
      "authorization",
      "Docker",
      "AWS",
      "Lightsail",
      "Docker Compose",
      "Caddy",
      "HTTPS",
      "corrective actions",
      "corrective-action tracking",
      "webhooks",
      "Ubuntu"
    ]
  },
  {
    "id": "paddy",
    "title": "PaddyLiteX · paddy disease detection",
    "short": "PaddyLiteX",
    "category": "research",
    "year": "Apr 2026 – Present",
    "status": "Final-year thesis · reported test results",
    "kicker": "FINAL-YEAR PROJECT / AGRICULTURAL AI",
    "description": "Built a YOLOv8n baseline with a DenseNet-121 backbone, then developed the lighter DenseLiteX backbone with SPPF and C2PSA for nine-class paddy disease detection.",
    "tags": [
      "YOLOv8n",
      "DenseLiteX",
      "SPPF",
      "C2PSA",
      "PyTorch",
      "Ablations"
    ],
    "metrics": [
      [
        "81.67%",
        "Reported mAP@0.5"
      ],
      [
        "55.83%",
        "mAP@0.5:0.95"
      ],
      [
        "2.88M",
        "Parameters"
      ]
    ],
    "summary": "The research asks how to improve paddy disease detection without retaining the larger DenseNet-121 backbone. I established a DenseNet-121-based YOLOv8n baseline, then developed DenseLiteX with SPPF and C2PSA while retaining the detector neck. The updated held-out test evaluation covers 803 images, 2,466 objects and nine classes, with one experimental run per model.",
    "contributions": [
      "Prepared and cleaned agricultural image data, with attention to duplicates and leakage-free evaluation.",
      "Developed the custom DenseLiteX backbone and integrated SPPF and C2PSA into the YOLOv8n backbone path.",
      "Kept the detector neck unchanged so comparisons focus on backbone modifications.",
      "Compared default YOLOv8n, DenseNet121, and the proposed backbone, plus component ablations; built an interactive detection demo."
    ],
    "outcome": "PaddyLiteX achieves 81.67% mAP@0.5, 55.83% mAP@0.5:0.95, 2,879,917 parameters and 14.2 reported GFLOPs. Compared with the DenseNet-121-based baseline, mAP@0.5 rises from 80.69% to 81.67%, with 68.01% fewer parameters and 72.59% lower reported GFLOPs. Compared with original YOLOv8n, mAP@0.5 improves by 0.88 percentage points and parameters decrease by 4.24%; GFLOPs increase from 8.1 to 14.2. The stricter mAP@0.5:0.95 remains 0.25 percentage points below the DenseNet-121 baseline. These are single-run results; the reported FLOP profiling convention awaits confirmation.",
    "learning": "A fair architecture comparison depends on more than a promising model: consistent training, clean splits, and clearly scoped ablations are essential.",
    "credit": "YOLOv8 and DenseNet are established architectures. My contribution is the DenseLiteX backbone and its SPPF/C2PSA integration, supported by baseline comparisons and ablations. Updated figures are published in PaddyLiteX_HF_Static/results.json in my PaddyLiteX repository.",
    "repository": "https://github.com/WAYTECHG/PaddyLiteX",
    "demo": "https://paddylitex.onrender.com/",
    "tableCaption": "Updated held-out test evaluation: 803 images, 2,466 objects, nine classes; one run per model",
    "table": [
      [
        "Metric",
        "YOLOv8n",
        "DenseNet-121 backbone",
        "PaddyLiteX"
      ],
      [
        "mAP@0.5",
        "80.79%",
        "80.69%",
        "81.67%"
      ],
      [
        "mAP@0.5:0.95",
        "54.66%",
        "56.08%",
        "55.83%"
      ],
      [
        "Parameters",
        "3,007,403",
        "9,002,123",
        "2,879,917"
      ],
      [
        "GFLOPs",
        "8.1",
        "51.8",
        "14.2"
      ],
      [
        "Precision",
        "83.68%",
        "84.71%",
        "83.29%"
      ],
      [
        "Recall",
        "76.61%",
        "74.79%",
        "75.67%"
      ]
    ],
    "evidence": "https://github.com/WAYTECHG/PaddyLiteX/blob/main/PaddyLiteX_HF_Static/results.json",
    "searchTerms": [
      "Git",
      "GitHub",
      "Python",
      "OpenCV",
      "NumPy",
      "Matplotlib",
      "Gradio",
      "Hugging Face",
      "DenseNet"
    ]
  },
  {
    "id": "marine",
    "title": "Marine organism detection",
    "short": "Marine detection",
    "category": "research",
    "year": "Jun 2026 – Jul 2026",
    "status": "Completed research · demo available",
    "kicker": "FEATURED / LIGHTWEIGHT OBJECT DETECTION",
    "description": "Adapting DU-MobileYOLO with GhostConv and SimSPPF to detect underwater organisms with a better accuracy–complexity trade-off.",
    "tags": [
      "PyTorch",
      "GhostConv",
      "SimSPPF",
      "URPC2020"
    ],
    "metrics": [
      [
        "75.36%",
        "mAP@0.5"
      ],
      [
        "4.37M",
        "Parameters"
      ],
      [
        "11.5",
        "GFLOPs"
      ]
    ],
    "demo": "https://marine-object-detection.onrender.com",
    "summary": "Underwater imagery makes detection challenging, and an efficient detector needs to balance accuracy with model complexity. I adapted an existing lightweight detector and tested the effects of selected architectural changes on the URPC2020 split.",
    "contributions": [
      "Integrated GhostConv into selected 3×3 convolutions in Multi-Concat blocks and replaced the original pooling structure with SimSPPF.",
      "Preserved the original Deformable Upsampling mechanism from DU-MobileYOLO.",
      "Compared retrained baselines and ablation variants, documenting accuracy, precision, recall, parameters, and GFLOPs.",
      "Prepared an interactive marine detection demonstration hosted on Render."
    ],
    "outcome": "Compared with the retrained DU-MobileYOLO baseline, the final variant increased mAP@0.5 by 1.13 percentage points and reduced parameters from 4.70M to 4.37M (about 7.0%). Precision and mAP@0.5:0.95 decreased slightly; the experiment shows a trade-off rather than improvement on every metric.",
    "learning": "Small, targeted changes can improve an efficiency–accuracy balance. Ablations matter: the strongest mAP@0.5 result is not necessarily the strongest result under stricter localization criteria.",
    "credit": "Base detector and Deformable Upsampling: DU-MobileYOLO by its original authors. GhostConv and SimSPPF are established components; my work is their integration, adaptation, evaluation, and demonstration.",
    "upstream": "https://github.com/ZERO-SPACE-X/DU-MobileYOLO",
    "table": [
      [
        "Metric",
        "DU-MobileYOLO",
        "GhostConv + SimSPPF"
      ],
      [
        "mAP@0.5",
        "74.23%",
        "75.36%"
      ],
      [
        "mAP@0.5:0.95",
        "41.01%",
        "40.71%"
      ],
      [
        "Parameters",
        "4.70M",
        "4.37M"
      ],
      [
        "GFLOPs",
        "12.1",
        "11.5"
      ],
      [
        "Precision",
        "80.95%",
        "79.16%"
      ],
      [
        "Recall",
        "66.34%",
        "67.18%"
      ]
    ],
    "repository": "https://github.com/WAYTECHG/GhostConv-and-SimSPPF-Integration-for-Marine-Organism-Detection",
    "searchTerms": [
      "Git",
      "GitHub",
      "Python",
      "YOLO",
      "NumPy",
      "Matplotlib",
      "Gradio",
      "Docker",
      "Render"
    ]
  },
  {
    "id": "dpickleball",
    "title": "dPickleball reinforcement learning agent",
    "short": "dPickleball",
    "category": "research",
    "year": "May 2026 – Jul 2026",
    "status": "Completed coursework · team competition",
    "kicker": "REINFORCEMENT LEARNING / COMPETITIVE GAMEPLAY",
    "description": "PPO agents trained with curriculum learning, reward shaping and league self-play in the Unity dPickleBall environment.",
    "tags": [
      "PPO",
      "PyTorch",
      "Reinforcement learning",
      "Unity ML-Agents",
      "Python",
      "Self-play"
    ],
    "metrics": [
      [
        "2nd / 13",
        "Team competition finish"
      ],
      [
        "PPO",
        "Policy optimization"
      ],
      [
        "Self-play",
        "Competitive training"
      ]
    ],
    "summary": "A group project for AIT306 Deep Reinforcement Learning at Xiamen University Malaysia. Agents learn movement and paddle rotation in the supplied dPickleBall simulation, progressing from wall-based curriculum training to competitive league self-play.",
    "contributions": [
      "Trained and optimized an independent PPO-based agent.",
      "Experimented with reward and penalty configurations to improve gameplay behavior.",
      "Contributed candidate policies and compared their performance through iterative testing and team evaluation.",
      "Participated in selecting the strongest candidate for the final team submission."
    ],
    "outcome": "The team placed second among 13 competing teams, as reported in the project repository. RealFT was selected as the final competition agent after internal round-robin evaluation; my independently trained agent was one of the evaluated candidates.",
    "learning": "Reward design, curriculum difficulty and opponent diversity shape the behaviors an agent learns. Candidate policies need competitive evaluation alongside training rewards.",
    "credit": "Collaborative XMUM coursework. The environment is provided by the original dPickleBall project; my contribution focused on agent training, experimentation and evaluation.",
    "upstream": "https://github.com/dPickleball/dPickleBallEnv",
    "repository": "https://github.com/WAYTECHG/dpickleball-reinforcement-learning-agent",
    "video": "https://www.youtube.com/live/CitFn9FK12s",
    "searchTerms": [
      "Git",
      "GitHub",
      "NumPy",
      "Conda",
      "Reward shaping",
      "Curriculum learning",
      "Policy evaluation"
    ]
  },
  {
    "id": "resucn",
    "title": "Res UCN",
    "short": "Res UCN",
    "category": "research",
    "year": "Oct 2025 – Dec 2025",
    "status": "Completed coursework · group project",
    "kicker": "ARCHITECTURE EXPERIMENT / IMAGE CLASSIFICATION",
    "description": "Group research exploring compact image classification with dynamic gated convolutions, channel importance, weighted normalization, and a learnable Quinsh activation.",
    "tags": [
      "PyTorch",
      "CIFAR-10",
      "Quinsh",
      "ADSGC",
      "CIAC"
    ],
    "metrics": [
      [
        "91.45%",
        "Classification accuracy"
      ],
      [
        "69%",
        "Fewer parameters"
      ],
      [
        "CIFAR-10",
        "Dataset"
      ]
    ],
    "summary": "A group coursework project inspired by residual-network design. The repository documents dynamic-scale gated convolution (ADSGC), channel importance assignment (CIAC), weighted BatchNorm, Quinsh activation, and an energy–entropy stopping mechanism.",
    "contributions": [
      "Contributed to the group’s compact convolutional architecture experiments and comparisons.",
      "Worked on the custom Quinsh activation and its integration into image classification.",
      "Participated in training and analysis of the CIFAR-10 results."
    ],
    "outcome": "The project reported 91.45% classification accuracy on CIFAR-10 and a 69% reduction in model parameters relative to the ResNet-18 baseline used in the coursework.",
    "learning": "Compression needs to be evaluated alongside predictive performance. Architectural changes should be supported by controlled comparisons and clear reporting.",
    "credit": "Group authors: Wilbert Andrew Yonathan, Chua Kian Hoong, Edward Ooi Wee Xue, Derol Chong Chung Kit, Wang Xinyi, and Siah Jieh Sheng. Outcomes are reported in the group repository, building on established residual-network ideas.",
    "repository": "https://github.com/WAYTECHG/Res_UCN-Resnet-Unified-Convolution-Network",
    "searchTerms": [
      "Git",
      "GitHub",
      "Python",
      "CNN",
      "ResNet",
      "Matplotlib",
      "NumPy"
    ],
    "demo": "https://res-ucn.onrender.com/"
  },
  {
    "id": "fer",
    "title": "FER2013 — Facial expression recognition",
    "short": "FER2013",
    "category": "application",
    "year": "May 2025 – Jul 2025",
    "status": "Completed coursework · web demo",
    "kicker": "REAL-TIME VISION / EMOTION CLASSIFICATION",
    "description": "A custom TensorFlow/Keras CNN compared with VGG16, MobileNetV2 and ResNet50 on FER2013, with Grad-CAM and an OpenCV inference workflow.",
    "tags": [
      "TensorFlow",
      "Keras",
      "CNN",
      "FER2013",
      "OpenCV",
      "Grad-CAM"
    ],
    "metrics": [
      [
        "65.62%",
        "Recorded CNN test accuracy"
      ],
      [
        "4",
        "Compared classifiers"
      ],
      [
        "OpenCV",
        "Face detection"
      ]
    ],
    "summary": "This project connects facial expression classification to live camera input. A custom CNN was trained on FER2013 and integrated with OpenCV Haar Cascade face detection for a real-time webcam workflow.",
    "contributions": [
      "Developed and trained a custom CNN for facial expression classification.",
      "Compared the classifier with ResNet50, MobileNetV2, and VGG16 under the project’s evaluation settings.",
      "Integrated face detection, preprocessing, and emotion prediction into a webcam inference pipeline."
    ],
    "outcome": "The committed test_results_CNN.json records test accuracy of 0.6561716, or 65.62%. Confusion matrices, class reports and Grad-CAM artifacts support a closer look at class-level behavior.",
    "learning": "Model comparisons need consistent preprocessing and class-level analysis. Live input also makes cropping and image handling part of the prediction pipeline.",
    "credit": "FER2013 is the established dataset used for the coursework. Predictions describe dataset expression categories; they are not a reliable reading of a person’s internal emotional state.",
    "repository": "https://github.com/WAYTECHG/FER2013-Project",
    "evidence": "https://github.com/WAYTECHG/FER2013-Project/blob/main/json_files/test_results_CNN.json",
    "searchTerms": [
      "Git",
      "GitHub",
      "Python",
      "CNNs",
      "ResNet",
      "Matplotlib",
      "NumPy"
    ],
    "demo": "https://fer2013-project.onrender.com/"
  },
  {
    "id": "mri",
    "title": "NeuroInsight · Alzheimer’s MRI & Clinical Classification",
    "short": "NeuroInsight",
    "category": "application",
    "year": "Oct 2024 – Dec 2024",
    "status": "Educational prototype · further validation needed",
    "kicker": "APPLIED MACHINE LEARNING / CLASSIFICATION",
    "description": "Developed the MRI prediction and Streamlit interface for a team project combining VGG16 image classification with clinical-data machine learning; the presentation reports 91% MRI test accuracy.",
    "tags": [
      "VGG16",
      "TensorFlow",
      "Streamlit",
      "scikit-learn",
      "GPyOpt"
    ],
    "metrics": [
      [
        "91%",
        "Reported MRI accuracy"
      ],
      [
        "92%",
        "Reported MRI F1"
      ],
      [
        "72%",
        "Reported clinical accuracy"
      ]
    ],
    "summary": "Two complementary classification workflows bring brain MRI images and structured clinical features into one Streamlit application. The team compared nine clinical classifier families on ADNI data and explored VGG16 for a Kaggle MRI dataset containing more than 6,400 images. My contribution focused on MRI prediction and interface development.",
    "contributions": [
      "Contributed MRI prediction using VGG16, with image resizing, normalization and augmentation explored in the training workflow.",
      "Explored MRI hyperparameter tuning with Bayesian optimization using GPyOpt, alongside Adam-based training.",
      "Developed the Streamlit interface to present MRI uploads, predictions and project information.",
      "Collaborated on a team application combining clinical-data classification, MRI prediction, explanatory pages and a chatbot."
    ],
    "outcome": "The project presentation reports VGG16 MRI test accuracy of 91%, precision of 92%, recall of 92% and F1 of 92%. Clinical Logistic Regression reports 72% accuracy, 72% precision, 71% recall and 71% F1. GridSearchCV tuning reduced clinical accuracy from 72% to 69%, so tuning is not presented as an improvement. These are recorded coursework results, not independently reproduced scores. The clinical notebook applies SMOTE before its train/test split and needs evaluation with training-only resampling. The current MRI application preprocessing also needs correction and validation before its predictions can be considered reliable.",
    "learning": "Model selection requires checking the evaluation pipeline as carefully as the classifier. Resampling should stay within training data, cross-validation and held-out scores should be distinguished, and an interface should clearly communicate its educational scope.",
    "credit": "Team coursework. The presentation credits Wilbert Andrew Yonathan with MRI prediction and interface development. Clinical experiments and other team contributions are distinguished from my personal work.",
    "repository": "https://github.com/WAYTECHG/alzheimer-classification",
    "searchTerms": [
      "Git",
      "GitHub",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Random Forest",
      "Logistic Regression",
      "XGBoost",
      "SMOTE",
      "LDA",
      "SVM",
      "MLP",
      "NeuroInsight",
      "VGG16",
      "MRI",
      "Bayesian optimization"
    ],
    "evidence": "https://canva.link/xng3za0us10hzki",
    "evidenceLabel": "Project presentation",
    "demo": "https://alzheimer-classification-l7s2.onrender.com/#home"
  }
];
