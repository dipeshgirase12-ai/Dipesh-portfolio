// ==========================================
// "Ask My Portfolio" — Vercel Serverless Function
// Keeps ANTHROPIC_API_KEY on the server — never exposed to the browser.
// Works for a plain static site, no Next.js or build step required.
// ==========================================

module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { question } = req.body || {};
  if (!question || typeof question !== 'string' || !question.trim()) {
    res.status(400).json({ error: 'Missing question' });
    return;
  }

  // ---- Edit this block with your real info ----
  const RESUME_CONTEXT = `
You are answering questions from recruiters visiting Dipesh Girase's portfolio site,
speaking about Dipesh in the third person. Be concise (max 3 sentences), friendly,
and professional. Only use the facts below. If something isn't covered, say you
don't have that info and suggest using the Contact section.

BIO: Computer Science Engineering student at SVKM's College of Engineering, Shirpur.
Building scalable web systems and AI-powered apps. Based in Surat, Gujarat, India.

SKILLS: HTML, CSS, JavaScript, React, Vue, TypeScript, Node.js, APIs, Firebase,
Git/GitHub, UI/UX Design, AI Basics, Prompt Engineering.

PROJECTS:
- Salary Manager Pro: Salary-management web app for organizing salary-related
  information. Status: LIVE.
- Weather Genius AI: Real-time weather forecasting web app with clean UI and API
  integration. Status: LIVE.
- Bio Generator: AI-powered tool that generates professional bios instantly.
  Status: LIVE.
- NeuroCalc Pro: Smart calculator web app with clean UI and advanced logic.
  Status: IN DEVELOPMENT.

CERTIFICATIONS: Full Stack Development (2026), Prompt Engineering (LaunchEd Global,
2026), Product Management (LaunchEd Global, 2026), AI for All (Intel/Skill India,
2025), AI Tools Workshop (ULSA, 2025), Foundational Skills Program â€“ Retail
(Intel/Skill India, 2025), Deloitte Australia Technology Job Simulation
(Forage, 2026), EY Techathon 6.0 participation (2026), Foundations for Machine Learning (Dartmouth / Coursera, 2026).

EXPERIENCE: Building real projects like Weather Genius AI and Bio Generator.
Participated in EY Techathon 6.0 and Deloitte Australia Technology Job Simulation.

AVAILABILITY: Open to opportunities. Contact via email dipesh.girase12@gmail.com
or WhatsApp +91 7218090993.
`;
  // ---- End editable block ----

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        system: RESUME_CONTEXT,
        messages: [{ role: 'user', content: question }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      res.status(502).json({ error: 'AI service error' });
      return;
    }

    const data = await response.json();
    const answer = data?.content?.find(b => b.type === 'text')?.text
      || "Sorry, I couldn't generate an answer just now.";

    res.status(200).json({ answer });
  } catch (err) {
    console.error('Ask API failed:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
