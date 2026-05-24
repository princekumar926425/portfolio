import { useState } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, Send, X, ExternalLink } from "lucide-react";

type Msg = {
  id: number;
  text: string;
  sender: "user" | "bot";
  link?: string;
  image?: string;
  linkLabel?: string;
};

const data = {
  name: "Prince Kumar Ray",
  skills:
    "React, TypeScript, JavaScript, Tailwind CSS, C++, Java, Data Structures & Algorithms",

  links: {
    leetcode: "https://leetcode.com/u/PrinceKumarRay/",
    github: "https://github.com/princekumar926425",
    linkedin: "https://www.linkedin.com/in/prince-kumar-4a4665320/",
    resume: "/resume.pdf",
    email: "mprincekumar926425@gmail.com",
    portfolio: "http://localhost:5173",
  },

  image: "/prince.png",
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 1,
      text: "Hi! I’m Prince’s assistant. Ask me about skills, GitHub, LeetCode, LinkedIn, resume, projects, contact, or my photo.",
      sender: "bot",
    },
  ]);

  const getReply = (text: string) => {
    const q = text.toLowerCase().trim();

    const wantsLink =
      q.includes("link") ||
      q.includes("send link") ||
      q.includes("share link") ||
      q.includes("paste link") ||
      q.includes("profile link");

    const asksLeetCode =
      q.includes("leetcode") ||
      q.includes("leet code") ||
      q.includes("leddcode") ||
      q.includes("leet") ||
      q.includes("lc");

    const asksGithub =
      q.includes("github") ||
      q.includes("git hub") ||
      q.includes("gh");

    const asksLinkedin =
      q.includes("linkedin") ||
      q.includes("linked in");

    const asksResume =
      q.includes("resume") ||
      q.includes("cv");

    const asksProjects =
      q.includes("project") ||
      q.includes("projects") ||
      q.includes("repo") ||
      q.includes("repositories");

    const asksSkills =
      q.includes("skill") ||
      q.includes("skills") ||
      q.includes("tech stack") ||
      q.includes("technology");

    const asksPhoto =
      q.includes("photo") ||
      q.includes("pic") ||
      q.includes("picture") ||
      q.includes("image");

    const asksContact =
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("mail") ||
      q.includes("hire");

    const asksPortfolio =
      q.includes("portfolio") ||
      q.includes("website");

    const asksAbout =
      q.includes("about") ||
      q.includes("who are you") ||
      q.includes("who r u") ||
      q.includes("yourself");

    if (asksLeetCode) {
      return {
        text: "Here is my LeetCode profile 👇",
        link: data.links.leetcode,
        linkLabel: "Open LeetCode",
      };
    }

    if (asksGithub) {
      return {
        text: "Here is my GitHub profile 👇",
        link: data.links.github,
        linkLabel: "Open GitHub",
      };
    }

    if (asksLinkedin) {
      return {
        text: "Here is my LinkedIn profile 👇",
        link: data.links.linkedin,
        linkLabel: "Open LinkedIn",
      };
    }

    if (asksResume) {
      return {
        text: "Here is my resume 👇",
        link: data.links.resume,
        linkLabel: "View Resume",
      };
    }

    if (asksProjects) {
      return {
        text: "Here are my projects 👇",
        link: data.links.github,
        linkLabel: "View Projects",
      };
    }

    if (asksSkills) {
      return {
        text: `My skills are: ${data.skills}`,
      };
    }

    if (asksPhoto) {
      return {
        text: "Here is my profile picture 👇",
        image: data.image,
      };
    }

    if (asksContact) {
      return {
        text: "You can contact me here 👇",
        link: data.links.email,
        linkLabel: "Send Email",
      };
    }

    if (asksPortfolio) {
      return {
        text: "Here is my portfolio 👇",
        link: data.links.portfolio,
        linkLabel: "Open Portfolio",
      };
    }

    if (asksAbout) {
      return {
        text: `${data.name} is a creative developer and DSA problem solver who builds modern web experiences 🚀`,
      };
    }

    if (wantsLink) {
      return {
        text: "Tell me which link you want: LeetCode, GitHub, LinkedIn, Resume, Portfolio, or Projects.",
      };
    }

    if (q === "hi" || q === "hello" || q === "hey") {
      return {
        text: "Hello! Ask me for LeetCode, GitHub, LinkedIn, resume, projects, contact, skills, or photo.",
      };
    }

    return {
      text: "Ask me about skills, GitHub, LeetCode, LinkedIn, resume, projects, contact, portfolio, or photo 😎",
    };
  };

  const sendMessage = () => {
    const value = input.trim();
    if (!value) return;

    const userMsg: Msg = {
      id: Date.now(),
      text: value,
      sender: "user",
    };

    const reply = getReply(value);

    const botMsg: Msg = {
      id: Date.now() + 1,
      text: reply.text,
      sender: "bot",
      link: reply.link,
      image: reply.image,
      linkLabel: reply.linkLabel,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-[999999] w-[340px] overflow-hidden rounded-3xl border border-yellow-400/30 bg-[#0d0818]/95 shadow-[0_0_35px_rgba(255,196,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-yellow-400/60 hover:shadow-[0_0_45px_rgba(255,196,0,0.28)]">
          <div className="flex items-center justify-between rounded-t-3xl border-b border-yellow-400/20 px-4 py-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Chat Assistant</h3>
              <p className="text-sm text-yellow-100/60">Ask anything about Prince</p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-yellow-300/80 transition hover:bg-yellow-400/10 hover:text-yellow-200"
            >
              <X size={18} />
            </button>
          </div>

          <div className="h-[360px] space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 text-black shadow-[0_0_18px_rgba(255,196,0,0.22)]"
                      : "border border-yellow-400/15 bg-white/10 text-white"
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Profile"
                      className="mt-3 w-full rounded-xl border border-yellow-400/20"
                    />
                  )}

                  {msg.link && (
                    <div className="mt-3">
                      <a
                        href={msg.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-yellow-400/20 bg-yellow-400/10 px-3 py-2 text-xs font-medium text-yellow-300 transition hover:bg-yellow-400/20"
                      >
                        {msg.linkLabel || "Open Link"}
                        <ExternalLink size={14} />
                      </a>

                      <p className="mt-2 break-all text-[11px] text-white/50">
                        {msg.link}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-yellow-400/15 p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Type..."
                className="h-12 flex-1 rounded-2xl border border-yellow-400/20 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
              />

              <button
                onClick={sendMessage}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 text-black shadow-[0_0_20px_rgba(255,196,0,0.28)] transition hover:scale-105"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-[999999] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 text-black shadow-[0_0_30px_rgba(255,196,0,0.35)] transition hover:scale-105"
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </button>
    </>,
    document.body
  );
};

export default ChatWidget;