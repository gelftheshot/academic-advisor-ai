export default function handler(req, res) {
  const { interests, strengths, careerGoals } = req.body;

  // Simulate a recommendation based on the inputs
  const recommendation = `Based on your interests in ${interests}, strengths in ${strengths}, and career goals of ${careerGoals}, we recommend pursuing a major in Computer Science with a career path in Software Development.`;

  res.status(200).json({ recommendation });
}
