import Notes from '../models/notes.model.js';
import UserModel from '../models/user.model.js';
import { generateGeminiResponse } from '../services/gemini.servicec.js';
import { buildPrompt } from '../utils/promptBuilder.js';

export const generateNotes = async (req, res) => {
  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeChart = false,
    } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: 'topic is required',
      });
    }

    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.credits < 5) {
      user.isCreditAvailable = false;
      await user.save();
      return res.status(400).json({
        success: false,
        message: 'Insufficient credits',
      });
    }

    user.credits -= 5;
    if (user.credits <= 0) {
      user.isCreditAvailable = false;
    }
    await user.save();

    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    // console.log('prompt: ' + prompt);
    const response = await generateGeminiResponse(prompt);
    // console.log(response);
    const notes = await Notes.create({
      user: user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
      content: response,
    });

    if (!Array.isArray(user.notes)) {
      user.notes = [];
    }

    user.notes.push(notes._id);
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'notes generated successfully',
      data: response,
      creditsLeft: user.credits,
    });
  } catch (err) {
    console.log(`generate notes error ${err}`);
    return res.status(500).json({
      success: false,
      message: `generate notes error ${err.message}`,
    });
  }
};
