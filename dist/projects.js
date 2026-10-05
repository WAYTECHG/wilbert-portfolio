'use strict';
window.PORTFOLIO_PROJECTS = [
  {
    "id": "marine",
    "title": "Marine organism detection",
    "short": "Marine detection",
    "category": "research",
    "year": "2026",
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
    "demo": "https://huggingface.co/spaces/Wizzas/Marine-Object-Detection",
    "summary": "Underwater imagery makes detection challenging, and an efficient detector needs to balance accuracy with model complexity. I adapted an existing lightweight detector and tested the effects of selected architectural changes on the URPC2020 split.",
    "contributions": [
      "Integrated GhostConv into selected 3×3 convolutions in Multi-Concat blocks and replaced the original pooling structure with SimSPPF.",
      "Preserved the original Deformable Upsampling mechanism from DU-MobileYOLO.",
      "Compared retrained baselines and ablation variants, documenting accuracy, precision, recall, parameters, and GFLOPs.",
      "Prepared an interactive marine detection demonstration on Hugging Face Spaces."
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
    "repository": "https://github.com/WAYTECHG/GhostConv-and-SimSPPF-Integration-for-Marine-Organism-Detection"
  },
  {
    "id": "paddy",
    "title": "PaddyLiteX · paddy disease detection",
    "short": "PaddyLiteX",
    "category": "research",
    "year": "2026–present",
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
    "evidence": "https://github.com/WAYTECHG/PaddyLiteX-demo/blob/main/config/models.json"
  },
  {
    "id": "defectrag",
    "title": "DefectRAG",
    "short": "DefectRAG",
    "category": "application",
    "year": "2026–present",
    "status": "Application · in development",
    "kicker": "APPLIED AI / VISUAL INSPECTION + MEMORY",
    "description": "Industrial visual inspection combining DINOv3 patch comparisons, anomaly localization, normal references, and hybrid retrieval for grounded explanations.",
    "tags": [
      "DINOv3",
      "FastAPI",
      "RAG",
      "FAISS",
      "BM25",
      "Neo4j",
      "Docker"
    ],
    "metrics": [
      [
        "5",
        "LOCO categories"
      ],
      [
        "Vision",
        "Anomaly localization"
      ],
      [
        "RAG",
        "Reference memory"
      ]
    ],
    "summary": "DefectRAG connects uploaded product images to normal-reference features, anomaly overlays, visual observations, and evidence-supported inspection reports for five MVTec LOCO AD categories. Its GitHub README documents both local and cloud paths; deployment reliability is still being refined.",
    "contributions": [
      "Built feature extraction and normal-reference memory workflows for five MVTec LOCO AD categories.",
      "Experimented with a frozen DINOv3 encoder, compact nearest-normal baseline, trained anomaly heads and fusion.",
      "Integrated visual observations with FAISS + BM25 retrieval and grounded explanation workflows.",
      "Built FastAPI and web interfaces; worked on cloud inspection records with Neo4j and image overlays with Cloudinary."
    ],
    "outcome": "The repository contains image-inspection workflows, evaluation artifacts, and a cloud demonstration entry point. I am still refining deployment and evidence coverage. Anomaly scores are research outputs, and a polished interface alone does not establish production reliability.",
    "learning": "A working AI application requires the full path to behave consistently: image handling, model inference, retrieved context, API responses, and the visitor interface.",
    "credit": "Uses established DINOv3 features and MVTec LOCO AD data. Visual localization and explanation quality depend on the completed model and reference-memory pipeline.",
    "repository": "https://github.com/WAYTECHG/DefectRAG",
    "demo": "https://huggingface.co/spaces/Wizzas/defectrag-inference"
  },
  {
    "id": "resucn",
    "title": "Res UCN",
    "short": "Res UCN",
    "category": "research",
    "year": "2025–2026",
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
    "repository": "https://github.com/WAYTECHG/Res_UCN-Resnet-Unified-Convolution-Network"
  },
  {
    "id": "fer",
    "title": "Facial expression recognition",
    "short": "Expression recognition",
    "category": "application",
    "year": "2025",
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
    "evidence": "https://github.com/WAYTECHG/FER2013-Project/blob/main/json_files/test_results_CNN.json"
  },
  {
    "id": "mri",
    "title": "Alzheimer classification prototype",
    "short": "MRI application",
    "category": "application",
    "year": "2024",
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
    "repository": "https://github.com/WAYTECHG/Alzheimer-Detection"
  }
];
window.projectIllustration = function(id, suffix='') {
  const u=id+suffix;
  const open=`<svg class="project-art" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustrative ${id==='marine'?'underwater detection':id==='paddy'?'paddy leaf detection':id==='defectrag'?'anomaly reference pipeline':id==='resucn'?'neural network':id==='fer'?'face analysis':'MRI interface'} schematic"><defs><linearGradient id="g${u}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#4c93ff"/><stop offset="1" stop-color="#83e9fa"/></linearGradient><radialGradient id="r${u}"><stop stop-color="#3269a3" stop-opacity=".22"/><stop offset="1" stop-color="#193454" stop-opacity="0"/></radialGradient></defs><ellipse cx="250" cy="155" rx="200" ry="135" fill="url(#r${u})"/>`;
  let body='';
  if(id==='marine') body=`<path d="M20 225Q80 194 135 218T265 210T405 223T500 213" fill="none" stroke="#487eb9" stroke-opacity=".3"/><path d="M20 245Q80 217 135 239T265 234T405 244T500 236" fill="none" stroke="#487eb9" stroke-opacity=".17"/><g fill="none" stroke="#6ca9e0" stroke-width="1.7"><path d="M105 140l14 27 29-8-17 25 21 24-31-8-18 28 1-34-31-13 32-8Z" fill="#213c63"/><ellipse cx="263" cy="191" rx="40" ry="21" transform="rotate(-15 263 191)" fill="#1b3a53"/><path d="M335 114q26-40 51 0l-5 34h-41Z" fill="#18384b"/><path d="M345 115v30m10-32v32m10-32v32m10-32v32" stroke-opacity=".45"/></g><g fill="none" stroke="url(#g${u})" stroke-width="1.2"><rect x="69" y="124" width="89" height="110" rx="4"/><rect x="211" y="159" width="103" height="63" rx="4"/><rect x="326" y="78" width="70" height="79" rx="4"/></g><g fill="#95ceff" font-family="monospace" font-size="9"><text x="69" y="117">STARFISH</text><text x="211" y="153">HOLOTHURIAN</text><text x="326" y="71">SCALLOP</text></g><g stroke="#82c6ff" stroke-opacity=".13" fill="none"><circle cx="403" cy="199" r="9"/><circle cx="190" cy="91" r="5"/><circle cx="82" cy="79" r="3"/><circle cx="285" cy="105" r="7"/></g><path class="scan-line" d="M35 150H465" stroke="#75d6ff" stroke-opacity=".35"/>`;
  if(id==='paddy') body=`<g stroke="url(#g${u})" fill="none"><path d="M245 255q-16-85 45-199-76 14-89 87-10 52 44 112Z" stroke-width="1.5" fill="#23574435"/><path d="M245 255q-4-94 45-199M237 206l-28-35m34 15 26-35m-31 5-18-27m27 3 24-30" stroke-opacity=".7"/><path d="M307 252q-12-56 41-138-61 8-71 65-8 39 30 73Z" stroke-opacity=".4"/><rect x="188" y="43" width="114" height="219" rx="4" stroke-opacity=".7"/></g><g fill="#659bef55"><ellipse cx="228" cy="141" rx="7" ry="11" transform="rotate(28 228 141)"/><ellipse cx="244" cy="172" rx="5" ry="9" transform="rotate(28 244 172)"/><ellipse cx="259" cy="118" rx="4" ry="8"/></g><g font-family="monospace" font-size="9" fill="#9dd5f8"><text x="188" y="35">PADDY LEAF / REGION OF INTEREST</text></g><path d="M307 96h61v84h-32" fill="none" stroke="#569cff66" stroke-dasharray="4 4"/><g fill="#113049" stroke="#5591c455"><rect x="348" y="91" width="78" height="22" rx="4"/><rect x="348" y="127" width="78" height="22" rx="4"/><rect x="348" y="163" width="78" height="22" rx="4"/></g><g fill="#a2c2e6" font-family="monospace" font-size="8"><text x="359" y="106">BACKBONE</text><text x="369" y="142">NECK</text><text x="369" y="178">HEAD</text></g>`;
  if(id==='defectrag') body=`<g fill="#111f33" stroke="#517fad77"><rect x="28" y="92" width="135" height="127" rx="10"/><rect x="199" y="105" width="111" height="102" rx="10"/><rect x="347" y="78" width="125" height="155" rx="10"/></g><g stroke="#78beff" fill="none"><path d="M52 143h84v50H52Z" stroke-opacity=".6"/><path d="M67 142v-19h53v19" stroke-opacity=".4"/><rect x="103" y="160" width="23" height="22" rx="2" stroke="#f6b880"/><path d="M164 155h34m112 0h36"/><path d="M185 151l5 4-5 4m148-8 5 4-5 4"/><circle cx="254" cy="151" r="23"/><circle cx="254" cy="151" r="8"/><path d="M247 129v-8m15 55v8m15-38h8m-62 11h8"/></g><g font-family="monospace" font-size="8" fill="#a3c9ee"><text x="54" y="83">INSPECT IMAGE</text><text x="216" y="96">FEATURE MEMORY</text><text x="371" y="68">REFERENCES</text></g><g fill="#193a58" stroke="#5d94c44d"><rect x="361" y="96" width="40" height="38" rx="4"/><rect x="412" y="96" width="40" height="38" rx="4"/></g><g stroke="#6ba0ce" stroke-opacity=".4"><path d="M363 158h82m-82 14h65m-65 14h75m-75 14h58"/></g><text x="216" y="194" fill="#85a7c6" font-family="monospace" font-size="8">RETRIEVE</text>`;
  if(id==='resucn') {body=`<g stroke="#4f8ac1" stroke-opacity=".25">`;for(let a=0;a<4;a++)for(let b=0;b<4;b++)body+=`<path d="M${115} ${76+a*48}L245 ${76+b*48}M245 ${76+a*48}L375 ${76+b*48}"/>`;body+='</g>';for(let x=0;x<3;x++)for(let y=0;y<4;y++)body+=`<circle class="float-node" cx="${115+x*130}" cy="${76+y*48}" r="${x===1?12:8}" fill="#173b60" stroke="#79bfff" stroke-opacity="${x===1?'.9':'.5'}"/>`;body+=`<path d="M115 38Q245-8 375 38" stroke="#8cbcfb" fill="none" stroke-opacity=".5" stroke-dasharray="4 4"/><text x="211" y="25" fill="#7aabe5" font-size="8" font-family="monospace">RESIDUAL</text><text x="169" y="272" fill="#96c4f4" font-family="monospace" font-size="10">UNIFIED CONVOLUTION</text>`;}
  if(id==='fer') body=`<g fill="none" stroke="url(#g${u})"><path d="M176 99q1-67 74-67t74 67v66q-5 70-74 88-69-18-74-88Z" fill="#18335644" stroke-opacity=".6"/><path d="M204 125q15-12 28 0m36 0q15-12 28 0m-46 3-8 37h18m-42 28q32 27 64 0" stroke-opacity=".6"/><path d="M154 60v-22h25m142 0h25v22m0 167v25h-25m-142 0h-25v-25" stroke-width="2"/></g><g fill="#9bd8ff">${[[212,125],[225,127],[275,127],[289,125],[250,158],[221,194],[250,207],[278,194]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2"/>`).join('')}</g><path d="M354 115h44v73h-44" stroke="#5591c466" stroke-dasharray="4 4" fill="none"/><text x="163" y="285" fill="#8ac9fb" font-family="monospace" font-size="10">FACE → CROP → CLASSIFY</text>`;
  if(id==='mri') body=`<rect x="77" y="39" width="346" height="221" rx="10" fill="#0c192b" stroke="#5187c366"/><path d="M78 69H422M279 70v189" stroke="#5187c344"/><g fill="#547aa7"><circle cx="92" cy="54" r="3"/><circle cx="103" cy="54" r="3"/><circle cx="114" cy="54" r="3"/></g><ellipse cx="180" cy="159" rx="68" ry="77" fill="#264363" stroke="#82b5e366"/><path d="M180 86v146M175 103q-35-28-37 18-34 11-16 40-21 39 13 44 8 37 38 18M185 103q35-28 37 18 34 11 16 40 21 39-13 44-8 37-38 18" fill="none" stroke="#7dace4" stroke-opacity=".6"/><g fill="#162e4c"><rect x="297" y="94" width="105" height="21" rx="4"/><rect x="297" y="139" width="105" height="7" rx="3"/><rect x="297" y="160" width="105" height="7" rx="3"/><rect x="297" y="181" width="105" height="7" rx="3"/></g><path d="M301 142h65m-65 21h41m-41 21h23" stroke="#62aff5" stroke-width="3" stroke-linecap="round"/><text x="303" y="108" fill="#99c4f5" font-family="monospace" font-size="8">MODEL OUTPUT</text><text x="307" y="224" fill="#829bbc" font-family="monospace" font-size="8">PROTOTYPE</text>`;
  return open+body+'</svg>';
};
