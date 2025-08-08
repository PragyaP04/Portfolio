document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio Loaded Successfully with Scroll-Nav!");

  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".side-nav a");

  const onScroll = () => {
    let currentSection = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 100) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === currentSection) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", onScroll);

  // --- Chatbot Elements ---
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotWindow = document.getElementById("chatbot-window");
  const chatbotClose = document.getElementById("chatbot-close");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotSend = document.getElementById("chatbot-send");

  // --- Predefined Responses ---
  const responses = {
    "hello": "Hi there! I'm Pragya's AI Assistant. Ask me anything about her skills, projects, or education.",
    "who is pragya": "Pragya Pandey is a B.Tech student specializing in AI and Data Science. She's skilled in full-stack development, ML, and has multiple certifications.",
    "skills": "Pragya is skilled in C, C++, Python, HTML, CSS, JavaScript, NumPy, Pandas, Scikit-learn, and more.",
    "projects": "She has built projects like House Price Prediction, Plant Disease Detection, Diabetes Prediction, and a Chatbot with IBM Watsonx.",
    "education": "She is currently pursuing B.Tech in CST from UEM Kolkata (2022–2026).",
    "contact": "You can reach her at pragyapandey801@gmail.com or via the contact form on the site.",
    "default": "I'm still learning! Try asking about Pragya's skills, projects, or education."
  };

  // --- Helper: Clean & Normalize Input ---
  function cleanInput(input) {
    return input
      .toLowerCase()
      .replace(/[^\w\s]/gi, "") // remove punctuation
      .replace(/\s+/g, " ")     // collapse whitespace
      .trim();
  }

  // --- Main Bot Logic ---
  function getResponse(input) {
    const lowerInput = cleanInput(input);
    let reply = "";

    if (["project", "application", "built", "developed", "made"].some(word => lowerInput.includes(word))) {
      reply += responses["projects"] + "\n\n";
    }

    if (["skill", "skills", "tech", "tools", "language", "languages"].some(word => lowerInput.includes(word))) {
      reply += responses["skills"] + "\n\n";
    }

    if (["education", "study", "studied", "school", "college", "university"].some(word => lowerInput.includes(word))) {
      reply += responses["education"] + "\n\n";
    }

    if (["contact", "email", "reach", "connect", "social"].some(word => lowerInput.includes(word))) {
      reply += responses["contact"] + "\n\n";
    }

    if (["certification", "certifications", "course", "courses"].some(word => lowerInput.includes(word))) {
      reply += "Pragya has completed certifications in Data Analytics, Generative AI, and Cybersecurity with companies like Deloitte, TATA, and AWS.\n\n";
    }

    if (["internship", "experience", "training"].some(word => lowerInput.includes(word))) {
      reply += "Pragya has done internships with IBM SkillsBuild, AICTE Edunet, and PwC Launchpad, focusing on AI, ML, and cybersecurity.\n\n";
    }

    if (["hello", "hi", "hey"].some(word => lowerInput.includes(word))) {
      reply += responses["hello"] + "\n\n";
    }

    return reply.trim() || responses["default"];
  }

  // --- Add Message to Chat Window ---
  function addMessage(msg, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chatbot-msg ${sender}`;
    msgDiv.textContent = msg;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // --- Typing Effect + Bot Response ---
  function handleUserInput() {
    const input = chatbotInput.value.trim();
    if (input === "") return;

    addMessage(input, "user");
    chatbotInput.value = "";

    // Simulate bot typing
    setTimeout(() => {
      addMessage("...", "bot"); // Typing dots
      setTimeout(() => {
        chatbotMessages.lastChild.remove(); // remove "..."
        const reply = getResponse(input);
        addMessage(reply, "bot");
      }, 600);
    }, 300);
  }

  // --- Event Listeners ---
  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener("click", () => {
      chatbotWindow.classList.toggle("hidden");

      // Optional: Greet the user when opening chatbot
      if (!chatbotWindow.classList.contains("hidden")) {
        addMessage("Hi! You can ask me about Pragya’s skills, projects, education, or contact.", "bot");
      }
    });
  }

  if (chatbotClose) {
    chatbotClose.addEventListener("click", () => {
      chatbotWindow.classList.add("hidden");
    });
  }

  if (chatbotSend) {
    chatbotSend.addEventListener("click", handleUserInput);
  }

  if (chatbotInput) {
    chatbotInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleUserInput();
    });
  }
});
