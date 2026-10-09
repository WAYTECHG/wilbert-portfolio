'use strict';
window.PORTFOLIO_PROJECTS = [
  {
    "id": "paddy",
    "title": "PaddyLiteX · paddy disease detection",
    "short": "PaddyLiteX",
    "category": "research",
    "year": "Apr 2026 – Present",
    "status": "Final-year thesis · reported test results",
    "kicker": "FINAL-YEAR PROJECT / AGRICULTURAL AI",
    "description": "A custom DenseLiteX backbone with SPPF and C2PSA in YOLOv8n, evaluated against default YOLOv8n and a DenseNet121 backbone.",
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
        "82.26%",
        "Reported mAP@0.5"
      ],
      [
        "58.54%",
        "mAP@0.5:0.95"
      ],
      [
        "3.91M",
        "Parameters"
      ]
    ],
    "summary": "My final-year project moved from DenseNet image classification toward efficient paddy disease object detection. The published demo repository records a held-out test evaluation of 803 images, 2,466 objects and nine classes on 30 September 2026, with one experimental run per model.",
    "contributions": [
      "Prepared and cleaned agricultural image data, with attention to duplicates and leakage-free evaluation.",
      "Developed the custom DenseLiteX backbone and integrated SPPF and C2PSA into the YOLOv8n backbone path.",
      "Kept the detector neck unchanged so comparisons focus on backbone modifications.",
      "Compared default YOLOv8n, DenseNet121, and the proposed backbone, plus component ablations; built an interactive detection demo."
    ],
    "outcome": "The proposed model reports 82.26% mAP@0.5 and 58.54% mAP@0.5:0.95 with 3,905,069 parameters. It uses 61.1% fewer parameters than the DenseNet121-backed detector and improves its mAP@0.5 by 1.02 percentage points. Against default YOLOv8n, mAP@0.5 improves by 1.47 points, but parameters and GFLOPs increase. Results come from one run per model; they do not establish repeated-run variance.",
    "learning": "A fair architecture comparison depends on more than a promising model: consistent training, clean splits, and clearly scoped ablations are essential.",
    "credit": "YOLOv8 and DenseNet are established architectures. My work adapts their backbone path with DenseLiteX, SPPF, and C2PSA for paddy detection. Figures are recorded in config/models.json in my demo repository; research and documentation continue.",
    "repository": "https://github.com/WAYTECHG/PaddyLiteX-demo",
    "demo": "https://huggingface.co/spaces/Wizzas/PaddyLiteX",
    "tableCaption": "PaddyLiteX held-out test results, 803 images and nine classes; one run per model",
    "table": [
      [
        "Metric",
        "YOLOv8n",
        "DenseNet121 backbone",
        "PaddyLiteX"
      ],
      [
        "mAP@0.5",
        "80.79%",
        "81.24%",
        "82.26%"
      ],
      [
        "mAP@0.5:0.95",
        "54.66%",
        "57.13%",
        "58.54%"
      ],
      [
        "Parameters",
        "3.01M",
        "10.03M",
        "3.91M"
      ],
      [
        "GFLOPs",
        "8.1",
        "53.9",
        "16.3"
      ],
      [
        "Precision",
        "83.68%",
        "85.10%",
        "82.73%"
      ],
      [
        "Recall",
        "76.61%",
        "75.81%",
        "79.23%"
      ]
    ],
    "evidence": "https://github.com/WAYTECHG/PaddyLiteX-demo/blob/main/config/models.json",
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
    ]
  },
  {
    "id": "fer",
    "title": "Facial expression recognition",
    "short": "Expression recognition",
    "category": "application",
    "year": "May 2025 – Jul 2025",
    "status": "Completed coursework · webcam pipeline",
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
    ]
  },
  {
    "id": "mri",
    "title": "Alzheimer classification prototype",
    "short": "MRI application",
    "category": "application",
    "year": "Oct 2024 – Dec 2024",
    "status": "Educational prototype · further validation needed",
    "kicker": "AI APPLICATION / INTERACTIVE VISUALIZATION",
    "description": "A multi-page Streamlit learning project combining structured-data model comparisons, an MRI upload interface, and exploratory visualizations.",
    "tags": [
      "Streamlit",
      "scikit-learn",
      "MRI",
      "Python",
      "Classification"
    ],
    "metrics": [
      [
        "Streamlit",
        "User interface"
      ],
      [
        "MRI",
        "Image input"
      ],
      [
        "Prototype",
        "Educational scope"
      ]
    ],
    "summary": "The GitHub repository documents a Streamlit prototype with separate structured-data and MRI pages, a chatbot page, and model-comparison notebooks. It is an educational interface project, with further validation needed before presenting the inference flow as reliable.",
    "contributions": [
      "Built a multi-page Streamlit interface for structured data, MRI upload and explanatory views.",
      "Compared classical machine-learning classifiers and documented evaluation workflows.",
      "Connected saved model artifacts to application pages as a learning exercise."
    ],
    "outcome": "An educational prototype and model-comparison repository. The MRI input path needs further implementation validation; this portfolio does not present it as a clinically validated or deployment-ready diagnostic tool.",
    "learning": "A clear input and output flow helps people inspect a model’s behavior, but a usable interface does not establish clinical reliability.",
    "credit": "Educational machine-learning coursework and interface work. Clinical validation and real medical use are outside its scope.",
    "repository": "https://github.com/WAYTECHG/Alzheimer-Detection",
    "searchTerms": [
      "Git",
      "GitHub",
      "NumPy",
      "Pandas",
      "Matplotlib"
    ]
  }
];
